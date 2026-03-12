import sys
sys.path.append('c:\\Users\\kantayapalem\\Downloads\\Mini_project')
from app.database import SessionLocal
from app import models
from app.routers.admin import _calculate_matches_for_job

db = SessionLocal()

print("Profiles:")
profiles = db.query(models.StudentProfile).all()
for p in profiles:
    print(f"ID={p.id}, Name={p.full_name}, UserID={p.user_id}")

profile = db.query(models.StudentProfile).filter(models.StudentProfile.full_name == "Thanusha Mangisetti").first()
if not profile:
    print("Could not find Thanusha")
    sys.exit()

print(f"\nFound Profile: {profile.full_name} (ID: {profile.id})")
matches = db.query(models.JobMatch).filter(models.JobMatch.student_id == profile.id).order_by(models.JobMatch.overall_match_percentage.desc()).all()
existing_job_ids = {m.job_id for m in matches}
print(f"Existing match job IDs: {existing_job_ids}")

all_jobs = db.query(models.JobPost).all()
missing_jobs = [j for j in all_jobs if j.id not in existing_job_ids]
print(f"Missing jobs: {[j.id for j in missing_jobs]}")

if missing_jobs:
    for j in missing_jobs:
        print(f"Calculating match for job {j.id}")
        _calculate_matches_for_job(j, db)
        
    matches = db.query(models.JobMatch).filter(models.JobMatch.student_id == profile.id).order_by(models.JobMatch.overall_match_percentage.desc()).all()

print(f"\nFinal matches for student {profile.id}:")
for m in matches:
    print(f"Job ID={m.job_id}, Score={m.overall_match_percentage}")
