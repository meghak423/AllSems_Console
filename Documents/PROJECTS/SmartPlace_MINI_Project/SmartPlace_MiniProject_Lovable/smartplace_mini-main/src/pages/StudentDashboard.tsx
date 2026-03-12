import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Briefcase, TrendingUp, CheckCircle2, Upload, FileText, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

const levelColors: Record<string, string> = {
  advanced: "bg-match-excellent/10 text-match-excellent",
  intermediate: "bg-match-good/10 text-match-good",
  beginner: "bg-match-average/10 text-match-average",
};

function getMatchColor(p: number) {
  if (p >= 80) return "text-match-excellent";
  if (p >= 60) return "text-match-good";
  if (p >= 40) return "text-match-average";
  return "text-match-low";
}

export default function StudentDashboard() {
  const { user, profile } = useAuth();
  const [skills, setSkills] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [skillsRes, matchesRes, jobsRes, resumesRes] = await Promise.all([
        supabase.from("student_skills").select("*").eq("user_id", user.id).order("proficiency"),
        supabase.from("match_results").select("*").eq("user_id", user.id).order("match_percentage", { ascending: false }),
        supabase.from("jobs").select("*").eq("is_active", true),
        supabase.from("resumes").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1),
      ]);
      setSkills(skillsRes.data || []);
      setMatches(matchesRes.data || []);
      setJobs(jobsRes.data || []);
      setResumes(resumesRes.data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  const getJob = (jobId: string) => jobs.find((j) => j.id === jobId);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center">
          <div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container max-w-5xl">
        {/* Profile Summary */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-border bg-card shadow-card mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">{profile?.full_name || "Student"}</h1>
              <p className="text-muted-foreground text-sm">
                {profile?.department && `${profile.department} • `}{profile?.year || ""}
              </p>
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {skills.slice(0, 8).map((s) => (
                    <Badge key={s.id} className={`text-xs border-0 ${levelColors[s.proficiency]}`}>
                      {s.skill_name} <span className="opacity-60 ml-1">• {s.proficiency}</span>
                    </Badge>
                  ))}
                  {skills.length > 8 && <Badge variant="outline" className="text-xs">+{skills.length - 8} more</Badge>}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {resumes.length > 0 ? (
                <div className="flex items-center gap-1.5 text-sm text-match-excellent">
                  <CheckCircle2 className="w-4 h-4" />
                  Resume Uploaded
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-sm text-match-average">
                  <FileText className="w-4 h-4" />
                  No Resume
                </div>
              )}
              <Button size="sm" variant="outline" asChild>
                <Link to="/upload-resume"><Upload className="w-4 h-4 mr-1.5" /> {resumes.length > 0 ? "Update" : "Upload"} Resume</Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: BarChart3, label: "Skills Found", value: skills.length },
            { icon: Briefcase, label: "Job Matches", value: matches.length },
            { icon: TrendingUp, label: "Top Match", value: matches.length > 0 ? `${matches[0].match_percentage}%` : "N/A" },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl border border-border bg-card shadow-card text-center">
              <stat.icon className="w-5 h-5 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Job Matches */}
        {matches.length > 0 ? (
          <>
            <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-secondary" /> Your Job Matches
            </h2>
            <div className="space-y-4 mb-12">
              {matches.map((match, i) => {
                const job = getJob(match.job_id);
                if (!job) return null;
                const matchedSkills = Array.isArray(match.matched_skills) ? match.matched_skills : [];
                const missingSkills = Array.isArray(match.missing_skills) ? match.missing_skills : [];
                return (
                  <motion.div key={match.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="p-6 rounded-xl border border-border bg-card shadow-card">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-display font-semibold text-foreground text-lg">{job.title}</h3>
                          <Badge variant="outline" className="text-xs">{job.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{job.company} • {job.location}</p>
                        <p className="text-sm text-muted-foreground mb-4">{job.description}</p>
                        {matchedSkills.length > 0 && (
                          <div className="mb-3">
                            <span className="text-xs font-medium text-muted-foreground block mb-1.5">Matched Skills</span>
                            <div className="flex flex-wrap gap-1.5">
                              {matchedSkills.map((s: string) => (
                                <Badge key={s} className="text-xs bg-match-excellent/10 text-match-excellent border-0">{s}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                        {missingSkills.length > 0 && (
                          <div>
                            <span className="text-xs font-medium text-muted-foreground block mb-1.5">Skills to Learn</span>
                            <div className="flex flex-wrap gap-1.5">
                              {missingSkills.map((s: string) => (
                                <Badge key={s} variant="outline" className="text-xs border-match-average/30 text-match-average">{s}</Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-center min-w-[100px]">
                        <div className={`text-4xl font-display font-bold ${getMatchColor(match.match_percentage)}`}>
                          {match.match_percentage}%
                        </div>
                        <span className="text-xs text-muted-foreground mb-2">Match Score</span>
                        <Progress value={match.match_percentage} className="h-2 w-full" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="p-8 text-center rounded-xl border border-border bg-card mb-8">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium mb-1">No job matches yet</p>
            <p className="text-sm text-muted-foreground mb-4">Upload your resume to get AI-powered job matching</p>
            <Button asChild><Link to="/upload-resume">Upload Resume</Link></Button>
          </div>
        )}

        {/* Skills Overview */}
        {skills.length > 0 && (
          <>
            <h2 className="text-xl font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-secondary" /> Your Skills
            </h2>
            <div className="p-5 rounded-xl border border-border bg-card shadow-card">
              <div className="space-y-2">
                {skills.map((s) => (
                  <div key={s.id} className="flex items-center justify-between py-1.5">
                    <span className="text-sm text-foreground font-medium">{s.skill_name}</span>
                    <Badge className={`text-xs border-0 ${levelColors[s.proficiency]}`}>{s.proficiency}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
