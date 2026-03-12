from fastapi import APIRouter, Depends, status, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from .. import database, schemas, models
from .auth import get_current_user
from ..services import nlp
import os
import shutil

router = APIRouter(prefix="/api/student", tags=["Student Profile"])

UPLOAD_DIR = "uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload_resume", response_model=schemas.StudentProfileResponse)
def upload_resume(file: UploadFile = File(...), 
                  db: Session = Depends(database.get_db),
                  current_user: models.User = Depends(get_current_user)):
    
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Not authorized as student")

    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Student profile not found")

    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")

    # Rename file mapping Student Roll Number structure (e.g. 20BCE001_resume.pdf)
    safe_roll_number = str(profile.roll_number).replace("/", "_").replace("\\", "_")
    new_filename = f"{safe_roll_number}_resume.pdf"
    file_path = os.path.join(UPLOAD_DIR, new_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    profile.resume_pdf_path = file_path
    
    # NLP Extraction
    extracted_text = nlp.extract_text_from_pdf(file_path)
    profile.raw_resume_text = extracted_text
    db.commit()

    # Clear old AI skills
    db.query(models.StudentSkill).filter(
        models.StudentSkill.student_id == profile.id, 
        models.StudentSkill.source == "AI_Extracted"
    ).delete()

    skills_found = nlp.extract_skills_from_text(extracted_text)
    
    for skill_data in skills_found:
        # Check if they already added it manually to avoid duplicates
        existing = db.query(models.StudentSkill).filter(
            models.StudentSkill.student_id == profile.id,
            models.StudentSkill.skill_name == skill_data["skill_name"]
        ).first()
        
        if not existing:
            new_skill = models.StudentSkill(
                student_id=profile.id,
                skill_name=skill_data["skill_name"],
                proficiency=skill_data["proficiency"],
                source="AI_Extracted"
            )
            db.add(new_skill)
            
    db.commit()
    db.refresh(profile)
    return profile

@router.get("/profile", response_model=schemas.StudentProfileResponse)
def get_profile(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Not authorized")
        
    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    return profile

@router.put("/profile", response_model=schemas.StudentProfileResponse)
def update_profile(profile_update: schemas.StudentProfileUpdate,
                   db: Session = Depends(database.get_db),
                   current_user: models.User = Depends(get_current_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Not authorized")
        
    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    if profile_update.department is not None:
        profile.department = profile_update.department
    if profile_update.cgpa is not None:
        profile.cgpa = profile_update.cgpa
    if profile_update.year is not None:
        profile.year = profile_update.year
    if profile_update.phone_number is not None:
        profile.phone_number = profile_update.phone_number
    if profile_update.roll_number is not None:
        profile.roll_number = profile_update.roll_number
    
    db.commit()
    db.refresh(profile)
    return profile

@router.post("/profile/skills", response_model=schemas.SkillResponse)
def add_manual_skill(skill: schemas.SkillCreate, 
                     db: Session = Depends(database.get_db),
                     current_user: models.User = Depends(get_current_user)):
                     
    if current_user.role != "student": raise HTTPException(status_code=403, detail="Unauthorized")
    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    
    # Check if skill exists manually or AI-extracted
    existing = db.query(models.StudentSkill).filter(
        models.StudentSkill.student_id == profile.id,
        models.StudentSkill.skill_name.ilike(skill.skill_name)
    ).first()
    
    if existing:
        existing.proficiency = skill.proficiency
        existing.source = "Manual_Entry"
        db.commit()
        db.refresh(existing)
        return existing
        
    new_skill = models.StudentSkill(
        student_id=profile.id,
        skill_name=skill.skill_name,
        proficiency=skill.proficiency,
        source="Manual_Entry"
    )
    db.add(new_skill)
    db.commit()
    db.refresh(new_skill)
    return new_skill

@router.put("/profile/skills/{skill_id}", response_model=schemas.SkillResponse)
def update_skill(skill_id: int, proficiency: str, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "student": raise HTTPException(status_code=403, detail="Unauthorized")
    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    
    skill = db.query(models.StudentSkill).filter(models.StudentSkill.id == skill_id, models.StudentSkill.student_id == profile.id).first()
    if not skill: raise HTTPException(status_code=404, detail="Skill not found")
    
    skill.proficiency = proficiency
    db.commit()
    db.refresh(skill)
    return skill

@router.delete("/profile/skills/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "student": raise HTTPException(status_code=403, detail="Unauthorized")
    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    
    skill = db.query(models.StudentSkill).filter(models.StudentSkill.id == skill_id, models.StudentSkill.student_id == profile.id).first()
    if not skill: raise HTTPException(status_code=404, detail="Skill not found")
    
    db.delete(skill)
    db.commit()
    return {"detail": "Skill deleted"}

@router.post("/profile/projects", response_model=schemas.ProjectResponse)
def add_project(project: schemas.ProjectCreate, 
                db: Session = Depends(database.get_db),
                current_user: models.User = Depends(get_current_user)):
                
    if current_user.role != "student": raise HTTPException(status_code=403)
    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    
    new_proj = models.StudentProject(
        student_id=profile.id,
        title=project.title,
        description=project.description,
        tech_stack=project.tech_stack
    )
    db.add(new_proj)
    db.commit()
    db.refresh(new_proj)
    return new_proj

from typing import List

@router.get("/jobs", response_model=List[schemas.JobMatchResponse])
def get_student_jobs(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Not authorized")
        
    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    if not profile:
        return []
        
    matches = db.query(models.JobMatch).filter(models.JobMatch.student_id == profile.id).order_by(models.JobMatch.overall_match_percentage.desc()).all()
    
    # Check if there are jobs that have no match calculated for this student yet
    all_jobs = db.query(models.JobPost).all()
    existing_job_ids = {m.job_id for m in matches}
    missing_jobs = [j for j in all_jobs if j.id not in existing_job_ids]
    
    if missing_jobs:
        from .admin import _calculate_matches_for_job
        for j in missing_jobs:
            _calculate_matches_for_job(j, db)
            
        # Refetch matches after calculating
        matches = db.query(models.JobMatch).filter(models.JobMatch.student_id == profile.id).order_by(models.JobMatch.overall_match_percentage.desc()).all()
        
    return matches

from .admin import _calculate_matches_for_job

@router.post("/jobs/{job_id}/recompute", response_model=schemas.JobMatchResponse)
def recompute_job_match(job_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Not authorized")
        
    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    job = db.query(models.JobPost).filter(models.JobPost.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    _calculate_matches_for_job(job, db)
    
    match = db.query(models.JobMatch).filter(
        models.JobMatch.student_id == profile.id,
        models.JobMatch.job_id == job_id
    ).first()
    
    return match


@router.get("/jobs/{job_id}/recommendations")
def get_job_recommendations(job_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Not authorized")
        
    profile = db.query(models.StudentProfile).filter(models.StudentProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Student profile not found")
        
    job = db.query(models.JobPost).filter(models.JobPost.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    match = db.query(models.JobMatch).filter(
        models.JobMatch.student_id == profile.id,
        models.JobMatch.job_id == job_id
    ).first()

    student_text = f"Student '{profile.full_name}' studying '{profile.department}'. "
    
    if match:
        student_text += f"Matched Skills: {', '.join(match.matched_skills)}. "
        missing = match.missing_skills or []
        if missing:
            student_text += f"Missing Skills: {', '.join(missing)}. "
            
    student_text += f"Overall Match Score: {match.overall_match_percentage}%" if match else ""
    
    job_req_text = job.description + " Required: " + ", ".join([s.get("skill", "") for s in job.required_skills])

    recommendations = nlp.generate_career_recommendations(student_text, job_req_text)
    
    return {"recommendations": recommendations}


