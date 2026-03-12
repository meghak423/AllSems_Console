from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .database import engine

# Create tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="SmartPlace API")

# Setup CORS
origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:5500",
    "http://127.0.0.1",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Welcome to SmartPlace API"}

from .routers import auth, student, admin
app.include_router(auth.router)
app.include_router(student.router)
app.include_router(admin.router)
