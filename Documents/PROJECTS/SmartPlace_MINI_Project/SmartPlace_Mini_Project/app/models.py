from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, Text, JSON
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    role = Column(String) # "admin" or "student"
    is_active = Column(Boolean, default=True)

    profile = relationship("StudentProfile", back_populates="user", uselist=False)

class StudentProfile(Base):
    __tablename__ = "student_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    full_name = Column(String)
    roll_number = Column(String, unique=True, index=True)
    department = Column(String, nullable=True)
    year = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    cgpa = Column(Float, nullable=True)
    resume_pdf_path = Column(String, nullable=True)
    raw_resume_text = Column(Text, nullable=True)

    user = relationship("User", back_populates="profile")
    skills = relationship("StudentSkill", back_populates="student")
    projects = relationship("StudentProject", back_populates="student")
    job_matches = relationship("JobMatch", back_populates="student")

    @property
    def role(self):
        return self.user.role if self.user else "student"

class StudentSkill(Base):
    __tablename__ = "student_skills"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("student_profiles.id"))
    skill_name = Column(String, index=True)
    proficiency = Column(String) # "Beginner", "Intermediate", "Advanced"
    source = Column(String) # "AI_Extracted", "Manual_Entry"

    student = relationship("StudentProfile", back_populates="skills")

class StudentProject(Base):
    __tablename__ = "student_projects"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("student_profiles.id"))
    title = Column(String)
    description = Column(Text, nullable=True)
    tech_stack = Column(JSON, nullable=True) # list of skills

    student = relationship("StudentProfile", back_populates="projects")

class JobPost(Base):
    __tablename__ = "job_posts"

    id = Column(Integer, primary_key=True, index=True)
    admin_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    description = Column(Text)
    min_cgpa = Column(Float, nullable=True)
    required_skills = Column(JSON) # e.g. [{"skill": "Python", "proficiency": "Intermediate"}]
    
    matches = relationship("JobMatch", back_populates="job")

class JobMatch(Base):
    __tablename__ = "job_matches"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("student_profiles.id"))
    job_id = Column(Integer, ForeignKey("job_posts.id"))
    
    overall_match_percentage = Column(Float)
    semantic_skill_score = Column(Float)
    cgpa_score = Column(Float)
    project_score = Column(Float)
    missing_skills = Column(JSON, nullable=True) # list of text

    student = relationship("StudentProfile", back_populates="job_matches")
    job = relationship("JobPost", back_populates="matches")

    @property
    def matched_skills(self):
        if not self.job or not self.student: return []
        import json
        req_skills = self.job.required_skills if isinstance(self.job.required_skills, list) else json.loads(self.job.required_skills) if self.job.required_skills else []
        req = {s.get("skill", "").lower() for s in req_skills}
        stud_prof = {s.skill_name.lower(): s.proficiency for s in self.student.skills} if self.student.skills else {}
        matched_lower = req.intersection(set(stud_prof.keys()))
        original_req_names = {s.get("skill", "").lower(): s.get("skill", "") for s in req_skills}
        return [f"{original_req_names[m]} ({stud_prof[m]})" for m in matched_lower]
