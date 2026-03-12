from fastapi import APIRouter, Depends, status, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import database, schemas, models
from .auth import get_current_user
from ..services import nlp

router = APIRouter(prefix="/api/admin", tags=["Admin Control Panel"])

@router.post("/job", response_model=schemas.JobPostResponse)
def post_job(job: schemas.JobPostCreate, 
             db: Session = Depends(database.get_db), 
             current_user: models.User = Depends(get_current_user)):
             
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized as admin")

    new_job = models.JobPost(
        admin_id=current_user.id,
        title=job.title,
        description=job.description,
        min_cgpa=job.min_cgpa,
        required_skills=job.required_skills
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    
    # Auto-Calculate matches for all students immediately
    _calculate_matches_for_job(new_job, db)
    
    return new_job

def _calculate_matches_for_job(job: models.JobPost, db: Session):
    students = db.query(models.StudentProfile).all()
    import json
    req_skills = job.required_skills if isinstance(job.required_skills, list) else json.loads(job.required_skills) if job.required_skills else []
    
    job_req_text = job.description + " " + " ".join([s.get("skill", "") for s in req_skills])
    
    for student in students:
        # Build student's technical text summary by sorting to ensure deterministic embedding input
        skills_text = " ".join(sorted([f"{s.skill_name} ({s.proficiency})" for s in student.skills]))
        projects_text = " ".join(sorted([p.title + " " + (p.description or "") for p in student.projects]))
        
        student_text = f"Skills: {skills_text}. Projects: {projects_text}"
        
        # Calculate scores
        semantic_score = nlp.calculate_semantic_match(student_text, job_req_text)
        
        # CGPA Check 
        # For simplicity, if they meet min_cgpa, 100%, otherwise scaled
        cgpa_score = 100.0
        if job.min_cgpa and student.cgpa:
            if student.cgpa < job.min_cgpa:
                cgpa_score = max(0, (student.cgpa / job.min_cgpa) * 100)
        elif job.min_cgpa and not student.cgpa:
            cgpa_score = 0.0
            
        project_score = min(len(student.projects) * 20, 100) # Simple metric for having projects
        
        # Weighting: 70% semantic skills, 20% CGPA, 10% Projects
        overall = (semantic_score * 0.70) + (cgpa_score * 0.20) + (project_score * 0.10)
        
        # Identify missing skills using a robust substring check
        required_skill_names = [s.get("skill", "").lower() for s in req_skills]
        student_skill_string = " ".join([s.skill_name.lower() for s in student.skills])
        
        missing = []
        for req_skill in required_skill_names:
            # Check if the required skill (e.g. 'react') is anywhere in the student's combined skills string
            # This handles cases where required is 'react.js' but student has 'react', or vice versa.
            # We strip common suffixes like .js to make it even more robust
            core_req = req_skill.replace('.js', '').strip()
            if core_req not in student_skill_string:
                missing.append(req_skill.title())
                
        
        match_record = db.query(models.JobMatch).filter(
            models.JobMatch.job_id == job.id,
            models.JobMatch.student_id == student.id
        ).first()
        
        if not match_record:
            match_record = models.JobMatch(job_id=job.id, student_id=student.id)
            db.add(match_record)
            
        match_record.overall_match_percentage = round(overall, 2)
        match_record.semantic_skill_score = semantic_score
        match_record.cgpa_score = cgpa_score
        match_record.project_score = project_score
        match_record.missing_skills = missing
        
    db.commit()


@router.get("/job/{job_id}/candidates", response_model=List[schemas.JobMatchResponse])
def get_job_candidates(job_id: int, 
                       min_match_pct: Optional[float] = Query(0.0),
                       min_cgpa_filter: Optional[float] = Query(None),
                       skill_proficiency_filter: Optional[str] = Query(None), # e.g. "Advanced"
                       db: Session = Depends(database.get_db),
                       current_user: models.User = Depends(get_current_user)):
                       
    if current_user.role != "admin": raise HTTPException(status_code=403, detail="Unauthorized")
    
    query = db.query(models.JobMatch).filter(
        models.JobMatch.job_id == job_id,
        models.JobMatch.overall_match_percentage >= min_match_pct
    )
    
    if min_cgpa_filter:
        query = query.join(models.StudentProfile).filter(models.StudentProfile.cgpa >= min_cgpa_filter)
        
    if skill_proficiency_filter:
        # Check if they have at least one skill at this level
        query = query.join(models.StudentProfile).join(models.StudentSkill).filter(
            models.StudentSkill.proficiency == skill_proficiency_filter
        )
        
    # Order by highest match
    matches = query.order_by(models.JobMatch.overall_match_percentage.desc()).all()
    return matches

@router.get("/students", response_model=List[schemas.StudentProfileResponse])
def get_all_students(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Unauthorized")
    return db.query(models.StudentProfile).all()

@router.get("/jobs", response_model=List[schemas.JobPostResponse])
def get_all_jobs(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Unauthorized")
    return db.query(models.JobPost).all()

@router.get("/matches", response_model=List[schemas.JobMatchResponse])
def get_all_matches(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Unauthorized")
    return db.query(models.JobMatch).all()

@router.post("/recompute-matches")
def recompute_all_matches(db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    jobs = db.query(models.JobPost).all()
    for job in jobs:
        _calculate_matches_for_job(job, db)
        
    return {"message": "Matches recomputed successfully"}
@router.put("/job/{job_id}", response_model=schemas.JobPostResponse)
def update_job(job_id: int, job_update: schemas.JobPostCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Unauthorized")
    
    job = db.query(models.JobPost).filter(models.JobPost.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    job.title = job_update.title
    job.description = job_update.description
    job.min_cgpa = job_update.min_cgpa
    job.required_skills = job_update.required_skills
    db.commit()
    db.refresh(job)
    
    # Recompute matches for this job specifically
    _calculate_matches_for_job(job, db)
    return job

@router.delete("/job/{job_id}")
def delete_job(job_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Unauthorized")
        
    job = db.query(models.JobPost).filter(models.JobPost.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    # Delete associated matches first
    db.query(models.JobMatch).filter(models.JobMatch.job_id == job_id).delete()
    db.delete(job)
    db.commit()
    return {"detail": "Job deleted successfully"}
