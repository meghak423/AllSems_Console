import sys
import json
from app import database, models
from app.routers.admin import _calculate_matches_for_job

db = database.SessionLocal()
try:
    admin = db.query(models.User).filter(models.User.role == "admin").first()
    if not admin:
        print("No admin found")
        sys.exit(1)

    # create a mock JobPost
    new_job = models.JobPost(
        admin_id=admin.id,
        title="Test Job",
        description="Company - Test",
        min_cgpa=0.0,
        required_skills=[{"skill": "React", "proficiency": "Intermediate"}, {"skill": "HTML", "proficiency": "Intermediate"}]
    )
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    
    print("Job inserted.")
    
    _calculate_matches_for_job(new_job, db)
    print("Matches calculated.")

except Exception as e:
    import traceback
    traceback.print_exc()
finally:
    db.close()
