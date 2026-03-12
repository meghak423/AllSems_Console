// Mock data for the SmartPlace platform

export interface Student {
  id: string;
  name: string;
  email: string;
  skills: string[];
  matchPercentage?: number;
  missingSkills?: string[];
  resumeUploaded: boolean;
  department: string;
  year: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requiredSkills: string[];
  location: string;
  type: string;
  postedDate: string;
}

export interface MatchResult {
  studentId: string;
  jobId: string;
  matchPercentage: number;
  missingSkills: string[];
  matchedSkills: string[];
}

export const mockStudents: Student[] = [
  { id: "s1", name: "Aarav Sharma", email: "aarav@univ.edu", skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Data Analysis"], resumeUploaded: true, department: "CSE", year: "Final Year" },
  { id: "s2", name: "Priya Patel", email: "priya@univ.edu", skills: ["Java", "Spring Boot", "REST API", "MySQL", "Docker"], resumeUploaded: true, department: "CSE", year: "Final Year" },
  { id: "s3", name: "Rohan Gupta", email: "rohan@univ.edu", skills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS"], resumeUploaded: true, department: "IT", year: "Final Year" },
  { id: "s4", name: "Sneha Reddy", email: "sneha@univ.edu", skills: ["Python", "NLP", "PyTorch", "Deep Learning", "Computer Vision"], resumeUploaded: true, department: "CSE", year: "Final Year" },
  { id: "s5", name: "Vikram Singh", email: "vikram@univ.edu", skills: ["JavaScript", "React", "CSS", "HTML", "Git"], resumeUploaded: true, department: "IT", year: "Final Year" },
  { id: "s6", name: "Ananya Das", email: "ananya@univ.edu", skills: ["C++", "Data Structures", "Algorithms", "System Design", "Linux"], resumeUploaded: true, department: "CSE", year: "Final Year" },
];

export const mockJobs: Job[] = [
  { id: "j1", title: "ML Engineer", company: "TechCorp AI", description: "Build and deploy machine learning models for production systems. Work with large-scale data pipelines and model optimization.", requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Docker", "AWS", "SQL"], location: "Bangalore", type: "Full-time", postedDate: "2026-02-20" },
  { id: "j2", title: "Backend Developer", company: "InnovateSoft", description: "Design and develop scalable backend services using Java and Spring Boot. Build RESTful APIs and microservices.", requiredSkills: ["Java", "Spring Boot", "REST API", "MySQL", "Docker", "Kubernetes"], location: "Hyderabad", type: "Full-time", postedDate: "2026-02-18" },
  { id: "j3", title: "Full Stack Developer", company: "WebScale Inc", description: "Develop end-to-end web applications using modern frameworks. Work on both frontend and backend components.", requiredSkills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS", "GraphQL"], location: "Pune", type: "Full-time", postedDate: "2026-02-15" },
  { id: "j4", title: "NLP Research Engineer", company: "LangTech Labs", description: "Research and develop NLP models for text understanding and generation. Work with transformer architectures.", requiredSkills: ["Python", "NLP", "PyTorch", "Transformers", "Deep Learning", "BERT"], location: "Chennai", type: "Full-time", postedDate: "2026-02-22" },
];

export const mockMatches: MatchResult[] = [
  { studentId: "s1", jobId: "j1", matchPercentage: 83, matchedSkills: ["Python", "Machine Learning", "TensorFlow", "SQL"], missingSkills: ["Docker", "AWS"] },
  { studentId: "s2", jobId: "j2", matchPercentage: 83, matchedSkills: ["Java", "Spring Boot", "REST API", "MySQL", "Docker"], missingSkills: ["Kubernetes"] },
  { studentId: "s3", jobId: "j3", matchPercentage: 83, matchedSkills: ["React", "TypeScript", "Node.js", "MongoDB", "AWS"], missingSkills: ["GraphQL"] },
  { studentId: "s4", jobId: "j4", matchPercentage: 83, matchedSkills: ["Python", "NLP", "PyTorch", "Deep Learning"], missingSkills: ["Transformers", "BERT"] },
  { studentId: "s4", jobId: "j1", matchPercentage: 50, matchedSkills: ["Python"], missingSkills: ["Machine Learning", "TensorFlow", "Docker", "AWS", "SQL"] },
  { studentId: "s1", jobId: "j4", matchPercentage: 33, matchedSkills: ["Python"], missingSkills: ["NLP", "PyTorch", "Transformers", "Deep Learning", "BERT"] },
  { studentId: "s5", jobId: "j3", matchPercentage: 33, matchedSkills: ["React"], missingSkills: ["TypeScript", "Node.js", "MongoDB", "AWS", "GraphQL"] },
  { studentId: "s6", jobId: "j2", matchPercentage: 0, matchedSkills: [], missingSkills: ["Java", "Spring Boot", "REST API", "MySQL", "Docker", "Kubernetes"] },
];

export function getMatchColor(percentage: number): string {
  if (percentage >= 80) return "text-match-excellent";
  if (percentage >= 60) return "text-match-good";
  if (percentage >= 40) return "text-match-average";
  return "text-match-low";
}

export function getMatchBgColor(percentage: number): string {
  if (percentage >= 80) return "bg-match-excellent";
  if (percentage >= 60) return "bg-match-good";
  if (percentage >= 40) return "bg-match-average";
  return "bg-match-low";
}
