@echo off
echo Starting SmartPlace Database and Backend...

:: Check if postgres is running, if not it will gracefully fall back to SQLite as coded in database.py
start cmd /k "python -m uvicorn app.main:app --host 127.0.0.1 --port 8000"

echo Starting Frontend Server...
cd frontend
start cmd /k "python -m http.server 5500"

echo Servers started successfully!
echo Backend: http://127.0.0.1:8000/docs
echo Frontend: http://127.0.0.1:5500/index.html
pause
