import sys
import os

sys.path.append('c:\\Users\\kantayapalem\\Downloads\\Mini_project')
from app.database import SessionLocal
from app import models

db = SessionLocal()

print("--- JOBS ---")
for job in db.query(models.JobPost).all():
    print(f"ID={job.id}, Title={job.title}, Skills={repr(job.required_skills)}")

print("\n--- MATCHES ---")
for match in db.query(models.JobMatch).all():
    print(f"MatchID={match.id}, JobID={match.job_id}, StudentID={match.student_id}, Score={match.overall_match_percentage}")
