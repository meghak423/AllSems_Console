import requests
import json

payload = {
    "title": "Frontend Developer",
    "description": "XYZ - Developing Web Pages",
    "min_cgpa": 8.5,
    "required_skills": [{"skill": "HTML5", "proficiency": "Intermediate"}]
}
# First login
r = requests.post("http://127.0.0.1:8000/api/auth/login", data={"username": "kmegha9505@gmail.com", "password": "bangaramK2005@"})
print(r.status_code, r.text)
if r.status_code == 200:
    token = r.json().get("access_token")
    headers = {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}
    r2 = requests.post("http://127.0.0.1:8000/api/admin/job", json=payload, headers=headers)
    print("Post Job:", r2.status_code, r2.text)
