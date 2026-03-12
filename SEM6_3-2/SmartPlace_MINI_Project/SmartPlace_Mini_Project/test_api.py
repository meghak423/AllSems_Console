import requests
import json

base_url = "http://127.0.0.1:8000/api"

# Login as admin
login_res = requests.post(
    base_url + "/auth/login", 
    data={"username": "admin@example.com", "password": "password"}
)

print("Login:", login_res.status_code, login_res.text)

if login_res.status_code == 200:
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    
    payload = {
        "title": "Frontend Dev",
        "description": "Company - Some cool frontend stuff",
        "min_cgpa": 7.5,
        "required_skills": [{"skill": "React", "proficiency": "Intermediate"}, {"skill": "HTML", "proficiency": "Intermediate"}]
    }

    res = requests.post(base_url + "/admin/job", json=payload, headers=headers)
    print("Post Job:", res.status_code, res.text)
