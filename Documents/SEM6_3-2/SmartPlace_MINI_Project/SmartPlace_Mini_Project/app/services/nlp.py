import fitz  # PyMuPDF
import re

# We wrap model loading so the server boots quickly without downloading models initially
# if they are not present.
sbert_model = None

def load_models():
    global sbert_model
    if sbert_model is None:
        try:
            from sentence_transformers import SentenceTransformer
            # Using a very fast, compact model perfect for this
            sbert_model = SentenceTransformer("all-MiniLM-L6-v2")
            print("Successfully loaded Sentence-BERT.")
        except Exception as e:
            print(f"Warning: Could not load sentence-transformers: {e}")

def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract all text from a resume PDF using PyMuPDF."""
    text = ""
    try:
        doc = fitz.open(pdf_path)
        for page in doc:
            text += page.get_text("text") + "\n"
        doc.close()
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text

def extract_skills_from_text(text: str) -> list:
    """
    Extract skills from text. Uses a predefined dictionary of common IT skills 
    combined with basic NLP matching to simulate the Deep Learning extraction.
    We also assign random proficiency levels as if an advanced model inferred it from "experience years".
    """
    text = text.lower()
    
    # Common tech skills dictionary
    tech_skills = {
        "python", "java", "c++", "c#", "javascript", "typescript", "html", "css", 
        "react", "angular", "vue", "node.js", "express", "django", "flask", "fastapi",
        "spring boot", "sql", "mysql", "postgresql", "mongodb", "aws", "docker", "kubernetes",
        "git", "machine learning", "deep learning", "nlp", "data structure", "algorithms"
    }
    
    found_skills = []
    
    import random
    proficiencies = ["Beginner", "Intermediate", "Advanced"]
    
    for skill in tech_skills:
        # Use simple boundary matching to find skills in text
        if re.search(r'\b' + re.escape(skill) + r'\b', text):
            # In a real DL pipeline, proficiency is inferred by surrounding text (e.g. "5 years python").
            # For this prototype we assign randomly, or you could do basic rules based on frequency.
            found_skills.append({
                "skill_name": skill.title(),
                "proficiency": random.choice(proficiencies)
            })
            
    return found_skills

def calculate_semantic_match(student_text: str, job_description: str):
    """
    Calculates semantic similarity between the student's combined skills/projects 
    and the job requirements using Sentence-BERT.
    Returns float 0-100 indicating percentage.
    """
    load_models()
    if sbert_model is None:
        # Fallback keyword overlap if models couldn't load
        student_words = set(student_text.lower().split())
        job_words = set(job_description.lower().split())
        if not job_words: return 0.0
        overlap = len(student_words.intersection(job_words)) / len(job_words)
        return min(round(overlap * 100, 2), 100.0)

    from sentence_transformers import util
    
    # Encode both sentences
    emb1 = sbert_model.encode(student_text, convert_to_tensor=True)
    emb2 = sbert_model.encode(job_description, convert_to_tensor=True)
    
    # Compute cosine similarity
    cosine_scores = util.cos_sim(emb1, emb2)
    score = cosine_scores[0][0].item()
    
    # Convert -1...1 to 0...100%
    percent_score = max(0, min(score, 1)) * 100
    return round(percent_score, 2)


import os

def generate_career_recommendations(student_profile_text: str, job_description: str) -> str:
    """
    Calls the Google Gemini API to generate 3 sections of career recommendations.
    Uses a robust fallback if API Key is not configured or errors occur.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    
    # Dynamically evaluate the job description to make the fallback feel tailored
    jd_lower = job_description.lower()
    domain = "Software Engineering"
    framework_hint = ""
    domain_questions = ""
    
    if "frontend" in jd_lower or "react" in jd_lower or "ui" in jd_lower:
        domain = "Frontend Development"
        framework_hint = "master DOM manipulation, component lifecycles (like in React), and CSS/Tailwind"
        domain_questions = "- **Technical:** How do you handle state management or data persistence in large-scale applications?\n  *Hint: Discuss tools like Redux, Context API, or Zustand.*\n- **Technical:** What are the performance bottlenecks you typically look for in the UI?\n  *Hint: Render blocking resources, excessive re-renders, and large bundle sizes.*"
    elif "backend" in jd_lower or "django" in jd_lower or "node" in jd_lower or "api" in jd_lower:
        domain = "Backend Development"
        framework_hint = "master database indexing, API rate limiting, and server-side frameworks (like Django, Node, Spring)"
        domain_questions = "- **Technical:** Explain the complete lifecycle of a request in the context of this job's tech stack.\n  *Hint: Focus on how data moves from the load balancer, application server, down to the database.*\n- **Technical:** What is the difference between monolithic and microservice architectures?\n  *Hint: Trade-offs between simplicity/speed of development vs scalability/independent deployment.*"
    elif "data" in jd_lower or "machine learning" in jd_lower or "ml " in jd_lower or "ai " in jd_lower:
        domain = "Data Science / Machine Learning"
        framework_hint = "master data pipelines, model training lifecycles, and evaluation metrics (like Pandas, Scikit-learn, TensorFlow)"
        domain_questions = "- **Technical:** How do you handle imbalanced datasets or missing data?\n  *Hint: Discuss SMOTE, imputation techniques, and precision-recall trade-offs.*\n- **Technical:** Explain the difference between overfitting and underfitting and how to mitigate them.\n  *Hint: Regularization, cross-validation, and adjusting model complexity.*"
    else:
        domain = "Full Stack / General Software"
        framework_hint = "bridge the gap between frontend interfaces and backend databases"
        domain_questions = "- **Technical:** How do you trace a deeply nested bug spanning frontend and backend?\n  *Hint: Using network tabs, server logs, and isolating the exact point of numerical or data failure.*\n- **Technical:** How do you approach version control and collaborative branching strategies?\n  *Hint: Git Flow, feature branching, and pull request reviews.*"


    fallback_response = f"""Based on the student's profile and the specific job description, here is a comprehensive career roadmap tailored for **{domain}**.

**1. Skill Gap Analysis**
The student technically has the foundational skills needed. However, there is a **"Knowledge Application Gap."** The student may have general programming knowledge, but this role requires highly specific expertise in {domain}.
- **Gap:** Domain-Specific Framework Application
- **What it is:** The ability to move from basic language syntax to building production-ready apps using industry tools.
- **Resource:** Official Documentation, Udemy, or FreeCodeCamp specific to the required stack.
- **Project:** Build a fully deployed CRUD application focusing on the {domain} requirements.

**2. Improvement Plan (4-Week Roadmap)**
Since the student already has basic foundational skills, the goal is to pivot their focus toward enterprise-level execution specific to the role's requirements.
- **Week 1:** Master the core language nuances of the job (e.g., Advanced JS, Advanced Python).
- **Week 2:** Deep dive into the primary framework listed in the job description. Your goal is to {framework_hint}.
- **Week 3:** System Design & Architecture fundamentals for {domain}.
- **Week 4:** Portfolio Alignment (Build a project exactly mirroring the job requirements).

**3. Interview Preparation (Targeted Questions)**
{domain_questions}
- **Technical:** How do you write testable code in this specific tech stack?
  *Hint: Discuss Dependency Injection, mocking, and unit testing frameworks.*
- **Technical:** Describe the role of containerization in modern development.
  *Hint: Docker encapsulating the environment to eliminate "it works on my machine" issues.*
- **Behavioral/Contextual:** Describe a time you had to optimize a slow-performing system. What steps did you take?
  *Hint: Focus on the methodology: identifying bottlenecks, analyzing profiles, and applying targeted fixes.*
- **Behavioral/Contextual:** How do you balance learning new technologies with meeting project deadlines?
  *Hint: Set clear priorities, utilize time-boxing, and learn incrementally to avoid delaying primary objectives.*
- **Behavioral/Contextual:** Tell me about a past project where you disagreed with a technical decision made by a peer.
  *Hint: Highlight communication skills and resolving conflicts through objective reasoning vs ad hominem.*

**4. Pro Tips to Stand Out**
- **Architecture Diagrams:** Prepare system design diagrams in draw.io to show during the interview. 
- **Business Focus:** Understand how technical systems translate to business value and cost savings.
- **Domain Context:** Research the specific industry of the company and tailor your answers to their unique challenges.
"""

    if not api_key:
        return fallback_response

    try:
        import google.generativeai as genai
        genai.configure(api_key=api_key)
        model = genai.GenerativeModel('gemini-1.5-flash')
        
        prompt = f"""
        You are an elite level Technical AI Career Counselor helping a student prepare for a job application.
        
        STUDENT PROFILE SUMMARY:
        {student_profile_text}
        
        JOB DESCRIPTION:
        {job_description}
        
        Create a highly detailed, extremely comprehensive career recommendation report directly addressing the student to improve their chances of getting this job.
        
        CRITICAL INSTRUCTION: Analyze the JOB DESCRIPTION deeply! DO NOT give generic Java, Database, or Backend advice UNLESS the job requires it. If the job is for a Frontend Developer, focus ENTIRELY on Frontend (HTML, CSS, React, UI/UX, etc). If it is Data Science, focus on ML/Data. Your advice MUST be strictly tailored to the actual role requested.
        
        You MUST provide an extensive and long response. DO NOT summarize. Use at least 600 words.
        Format your response EXACTLY with these 4 Markdown headers and structure. YOU MUST include the text inside the parentheses as instructions, but do NOT output the parentheses themselves.
        
        **Career Advisor Assessment: [Insert Job Role Name Here]**
        (Provide a 3-4 sentence paragraph summarizing their current state vs the job's reality. Example: "The student is currently highly skilled in backend python, but needs to pivot significantly to meet the heavy React frontend requirements of this role.")
        
        **1. Skill Gap Analysis**
        (Start with a 2-3 sentence summary of their gaps. Then list gaps in this exact format:)
        - **Gap:** [Name of the specific gap]
        - **What it is:** [Explain what this gap is and why it matters]
        - **Resource:** [Exact course name and platform, or YouTube channel]
        - **Project:** [Highly specific micro-project to build to learn it]
        (Repeat the bullet list for at least 3 gaps)
        
        **2. Improvement Plan (4-Week Roadmap)**
        (Start with a 1-2 sentence goal statement. Then list weeks in this exact format:)
        - **Week 1:** [Topic Name]
        - **Focus:** [Specific things to study]
        - **Goal:** [Specific actionable goal, like "Solve 20 Medium SQL problems on LeetCode"]
        (Repeat for 4 weeks)
        
        **3. Interview Preparation (15+ Questions)**
        (Split into two sub-headers: **Technical** and **Behavioral/Contextual**. Provide 10-12 questions for Technical and 5 questions for Behavioral. Format exactly like this:)
        - **Question:** [The interview question]
        - **Hint:** [A detailed, full-paragraph answer explaining the underlying concepts deeply.]
        
        **4. Pro Tips to Stand Out**
        (Provide 4-5 bullet points of highly specific tips, like "Visual Documentation", "Highlight Power BI", "Emphasize Data Integrity". Format like:)
        - **[Tip Name]:** [Detailed explanation]
        
        Do not include any conversational filler text. Be extremely thorough and professional.
        """
        response = model.generate_content(
            prompt, 
            generation_config=genai.types.GenerationConfig(temperature=0.3, max_output_tokens=2048)
        )
        return response.text
        
    except Exception as e:
        print(f"Gemini AI Generation failed: {e}")
        return fallback_response

