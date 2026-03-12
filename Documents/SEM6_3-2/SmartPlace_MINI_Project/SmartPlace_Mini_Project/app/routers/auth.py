from fastapi import APIRouter, Depends, status, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import database, schemas, models
from datetime import datetime, timedelta
from jose import jwt, JWTError
from typing import Optional
from fastapi import APIRouter

router = APIRouter(prefix="/api/auth", tags=["Authentication"])
SECRET_KEY = "super_secret_smartplace_key_for_mini_project"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24 # 1 day

import bcrypt

def verify_password(plain_password, hashed_password):
    return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))

def get_password_hash(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/register", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(database.get_db)):
    
    # Check email exists
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
        
    # Check roll number if student
    if user.role == "student":
        if not user.roll_number:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Students must provide a roll number")
        existing_profile = db.query(models.StudentProfile).filter(models.StudentProfile.roll_number == user.roll_number).first()
        if existing_profile:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Roll number already registered")

    hashed_password = get_password_hash(user.password)
    # create new user (auto-confirmed for easy testing)
    new_user = models.User(email=user.email, password_hash=hashed_password, role=user.role, is_active=True)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    # if student, create profile
    if user.role == "student":
        new_profile = models.StudentProfile(
            user_id=new_user.id,
            roll_number=user.roll_number,
            full_name=user.full_name or "Student"
        )
        db.add(new_profile)
        db.commit()

    return new_user

@router.post("/login")
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == user_credentials.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

    if not verify_password(user_credentials.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")
        
    access_token = create_access_token(data={"user_id": user.id, "role": user.role})
    
    return {"access_token": access_token, "token_type": "bearer", "role": user.role}

# dependency to get current user
from fastapi.security import OAuth2PasswordBearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("user_id")
        if user_id is None:
            raise credentials_exception
        token_data = schemas.TokenData(email=str(user_id))
    except JWTError:
        raise credentials_exception
    user = db.query(models.User).filter(models.User.id == token_data.email).first()
    if user is None:
        raise credentials_exception
    return user

@router.get("/me")
def get_current_user_profile(current_user: models.User = Depends(get_current_user)):
    name = current_user.email.split("@")[0].title()
    if current_user.role == "student" and current_user.profile:
        name = current_user.profile.full_name
    return {
        "id": current_user.id,
        "email": current_user.email,
        "role": current_user.role,
        "name": name
    }
