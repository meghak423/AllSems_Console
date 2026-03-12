from pydantic import BaseModel, EmailStr
from typing import Optional, List, Any

# Token
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    role: str

class UserCreate(UserBase):
    password: str
    roll_number: Optional[str] = None # required for students
    full_name: Optional[str] = None

class UserResponse(UserBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# Skills
class SkillBase(BaseModel):
    skill_name: str
    proficiency: str # Beginner, Intermediate, Advanced

class SkillCreate(SkillBase):
    source: str = "Manual_Entry"

class SkillResponse(SkillBase):
    id: int
    source: str

    class Config:
        from_attributes = True

# Projects
class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    tech_stack: Optional[List[str]] = []

class ProjectCreate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int

    class Config:
        from_attributes = True

# Student Profile
class StudentProfileBase(BaseModel):
    full_name: str
    roll_number: str
    cgpa: Optional[float] = None
    department: Optional[str] = None
    year: Optional[str] = None
    phone_number: Optional[str] = None

class StudentProfileUpdate(BaseModel):
    department: Optional[str] = None
    cgpa: Optional[float] = None
    year: Optional[str] = None
    phone_number: Optional[str] = None
    roll_number: Optional[str] = None

class StudentProfileResponse(StudentProfileBase):
    id: int
    resume_pdf_path: Optional[str] = None
    skills: List[SkillResponse] = []
    projects: List[ProjectResponse] = []
    role: str = "student"

    class Config:
        from_attributes = True

# Job Post
class JobPostBase(BaseModel):
    title: str
    description: str
    min_cgpa: Optional[float] = None
    required_skills: List[dict] # Example: [{"skill": "Python", "proficiency": "Intermediate"}]

class JobPostCreate(JobPostBase):
    pass

class JobPostResponse(JobPostBase):
    id: int
    admin_id: int

    class Config:
        from_attributes = True

# Job Match 
class JobMatchResponse(BaseModel):
    id: int
    job_id: int
    student_id: int
    overall_match_percentage: float
    semantic_skill_score: float
    cgpa_score: float
    project_score: float
    missing_skills: List[str]
    matched_skills: List[str] = []

    job: Optional[JobPostResponse] = None
    student: Optional[StudentProfileBase] = None

    class Config:
        from_attributes = True
