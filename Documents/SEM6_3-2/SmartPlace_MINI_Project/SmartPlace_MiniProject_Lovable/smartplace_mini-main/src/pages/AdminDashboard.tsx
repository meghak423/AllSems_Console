import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Briefcase, BarChart3, RefreshCw, Loader2, GraduationCap, FolderKanban, Sparkles, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

function getMatchColor(p: number) {
  if (p >= 80) return "text-match-excellent";
  if (p >= 60) return "text-match-good";
  if (p >= 40) return "text-match-average";
  return "text-match-low";
}

function getMatchBg(p: number) {
  if (p >= 80) return "bg-match-excellent/10 border-match-excellent/20";
  if (p >= 60) return "bg-match-good/10 border-match-good/20";
  if (p >= 40) return "bg-match-average/10 border-match-average/20";
  return "bg-match-low/10 border-match-low/20";
}

const levelColors: Record<string, string> = {
  advanced: "bg-match-excellent/10 text-match-excellent",
  intermediate: "bg-match-good/10 text-match-good",
  beginner: "bg-match-average/10 text-match-average",
};

export default function AdminDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [computing, setComputing] = useState(false);
  const [filterCgpa, setFilterCgpa] = useState("all");
  const [filterProficiency, setFilterProficiency] = useState("all");
  const [filterProjects, setFilterProjects] = useState("all");

  const load = async () => {
    const [jobsRes, profilesRes, matchesRes, skillsRes] = await Promise.all([
      supabase.from("jobs").select("*").order("created_at", { ascending: false }),
      supabase.from("profiles").select("*"),
      supabase.from("match_results").select("*"),
      supabase.from("student_skills").select("*"),
    ]);
    setJobs(jobsRes.data || []);
    setProfiles(profilesRes.data || []);
    setMatches(matchesRes.data || []);
    setSkills(skillsRes.data || []);
    if (!selectedJobId && jobsRes.data && jobsRes.data.length > 0) {
      setSelectedJobId(jobsRes.data[0].id);
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const recomputeAll = async () => {
    setComputing(true);
    try {
      const { data, error } = await supabase.functions.invoke("compute-matches", { body: {} });
      if (error) throw error;
      toast.success(`Computed ${data?.matches?.length || 0} matches`);
      await load();
    } catch (e: any) {
      toast.error(e.message || "Failed to compute matches");
    } finally {
      setComputing(false);
    }
  };

  const selectedJob = jobs.find((j) => j.id === selectedJobId);

  const rankedCandidates = matches
    .filter((m) => m.job_id === selectedJobId)
    .sort((a, b) => b.match_percentage - a.match_percentage)
    .map((match) => {
      const profile = profiles.find((p) => p.user_id === match.user_id);
      const studentSkills = skills.filter((s) => s.user_id === match.user_id);
      const projects: any[] = Array.isArray(profile?.projects) ? profile.projects : [];
      
      // Find relevant projects for this job
      const requiredSkills: any[] = selectedJob ? (Array.isArray(selectedJob.required_skills) ? selectedJob.required_skills : []) : [];
      const reqNames = requiredSkills.map((r: any) => (typeof r === "string" ? r : r.name).toLowerCase());
      
      const relevantProjects = projects.filter((p: any) =>
        p.technologies?.some((t: string) => 
          reqNames.some((rn: string) => t.toLowerCase().includes(rn) || rn.includes(t.toLowerCase()))
        )
      );

      return { ...match, profile, studentSkills, projects, relevantProjects };
    })
    .filter((c) => {
      // CGPA filter
      if (filterCgpa !== "all") {
        const cgpa = c.profile?.cgpa;
        if (!cgpa) return false;
        if (filterCgpa === "9+" && cgpa < 9) return false;
        if (filterCgpa === "8+" && cgpa < 8) return false;
        if (filterCgpa === "7+" && cgpa < 7) return false;
        if (filterCgpa === "6+" && cgpa < 6) return false;
      }
      // Proficiency filter
      if (filterProficiency !== "all") {
        const hasLevel = c.studentSkills.some((sk: any) => sk.proficiency === filterProficiency);
        if (!hasLevel) return false;
      }
      // Projects filter
      if (filterProjects !== "all") {
        if (filterProjects === "has-relevant" && c.relevantProjects.length === 0) return false;
        if (filterProjects === "3+" && c.projects.length < 3) return false;
        if (filterProjects === "1+" && c.projects.length < 1) return false;
      }
      return true;
    });

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
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: Users, label: "Total Students", value: profiles.length },
            { icon: Briefcase, label: "Active Jobs", value: jobs.filter((j) => j.is_active).length },
            { icon: BarChart3, label: "Total Matches", value: matches.length },
          ].map((stat) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              className="p-5 rounded-xl border border-border bg-card shadow-card text-center">
              <stat.icon className="w-5 h-5 text-secondary mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-foreground">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-foreground">Select Job Posting</h2>
          <Button variant="outline" size="sm" onClick={recomputeAll} disabled={computing}>
            {computing ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <RefreshCw className="w-4 h-4 mr-1.5" />}
            Recompute All Matches
          </Button>
        </div>

        {jobs.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-border bg-card mb-8">
            <Briefcase className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">No jobs posted yet</p>
            <p className="text-sm text-muted-foreground">Go to Manage Jobs to create job postings</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-3 mb-8">
              {jobs.map((job) => (
                <button key={job.id} onClick={() => setSelectedJobId(job.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    selectedJobId === job.id ? "border-secondary bg-secondary/5 shadow-card" : "border-border bg-card hover:border-secondary/30"
                  }`}>
                  <div className="font-display font-semibold text-foreground">{job.title}</div>
                  <div className="text-sm text-muted-foreground">{job.company} • {job.location}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(Array.isArray(job.required_skills) ? job.required_skills : []).slice(0, 3).map((s: any) => {
                      const name = typeof s === "string" ? s : s.name;
                      return <Badge key={name} variant="secondary" className="text-xs">{name}</Badge>;
                    })}
                  </div>
                </button>
              ))}
            </div>

            {/* Ranked Candidates */}
            {selectedJob && (
              <>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
                  <h2 className="text-xl font-display font-bold text-foreground flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-secondary" />
                    Ranked Candidates — {selectedJob.title}
                  </h2>
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap items-center gap-3 mb-4 p-3 rounded-xl border border-border bg-card">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Filters:</span>
                  
                  <Select value={filterCgpa} onValueChange={setFilterCgpa}>
                    <SelectTrigger className="h-8 w-[130px] text-xs">
                      <SelectValue placeholder="CGPA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All CGPA</SelectItem>
                      <SelectItem value="9+">CGPA ≥ 9</SelectItem>
                      <SelectItem value="8+">CGPA ≥ 8</SelectItem>
                      <SelectItem value="7+">CGPA ≥ 7</SelectItem>
                      <SelectItem value="6+">CGPA ≥ 6</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterProficiency} onValueChange={setFilterProficiency}>
                    <SelectTrigger className="h-8 w-[160px] text-xs">
                      <SelectValue placeholder="Skill Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="beginner">Beginner</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterProjects} onValueChange={setFilterProjects}>
                    <SelectTrigger className="h-8 w-[170px] text-xs">
                      <SelectValue placeholder="Projects" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Projects</SelectItem>
                      <SelectItem value="has-relevant">Has Relevant Projects</SelectItem>
                      <SelectItem value="3+">3+ Projects</SelectItem>
                      <SelectItem value="1+">1+ Projects</SelectItem>
                    </SelectContent>
                  </Select>

                  {(filterCgpa !== "all" || filterProficiency !== "all" || filterProjects !== "all") && (
                    <Button variant="ghost" size="sm" className="h-8 text-xs" onClick={() => { setFilterCgpa("all"); setFilterProficiency("all"); setFilterProjects("all"); }}>
                      Clear Filters
                    </Button>
                  )}
                </div>

                {rankedCandidates.length === 0 ? (
                  <div className="p-8 text-center rounded-xl border border-border bg-card">
                    <p className="text-muted-foreground">No matching candidates found. Click "Recompute All Matches" to generate matches.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rankedCandidates.map((candidate, i) => {
                      const matchedSkills = Array.isArray(candidate.matched_skills) ? candidate.matched_skills : [];
                      const missingSkills = Array.isArray(candidate.missing_skills) ? candidate.missing_skills : [];
                      return (
                        <motion.div key={candidate.id} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="p-5 rounded-xl border border-border bg-card shadow-card">
                          {/* Header Row */}
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3 flex-1">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm border ${getMatchBg(candidate.match_percentage)}`}>
                                #{i + 1}
                              </div>
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-display font-semibold text-foreground">{candidate.profile?.full_name || "Unknown"}</h3>
                                  {candidate.profile?.department && <Badge variant="outline" className="text-xs">{candidate.profile.department}</Badge>}
                                  {candidate.profile?.year && <span className="text-xs text-muted-foreground">{candidate.profile.year}</span>}
                                </div>
                                {/* CGPA & Project count */}
                                <div className="flex items-center gap-3 mt-0.5">
                                  {candidate.profile?.cgpa && (
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <GraduationCap className="w-3 h-3" /> CGPA: <strong className="text-foreground">{candidate.profile.cgpa}</strong>
                                    </span>
                                  )}
                                  {candidate.projects.length > 0 && (
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                      <FolderKanban className="w-3 h-3" /> {candidate.relevantProjects.length}/{candidate.projects.length} relevant projects
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="text-right min-w-[80px]">
                              <div className={`text-3xl font-display font-bold ${getMatchColor(candidate.match_percentage)}`}>
                                {candidate.match_percentage}%
                              </div>
                              <Progress value={candidate.match_percentage} className="h-1.5 mt-1" />
                              <span className="text-[10px] text-muted-foreground">70% skills · 15% CGPA · 15% projects</span>
                            </div>
                          </div>

                          {/* Matched Skills with proficiency */}
                          {matchedSkills.length > 0 && (
                            <div className="mb-2">
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Matched Skills</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {matchedSkills.map((s: string) => {
                                  const skill = candidate.studentSkills.find((sk: any) => sk.skill_name.toLowerCase() === s.toLowerCase());
                                  // Check for semantic match (student has related skill, not exact)
                                  const semanticSkill = !skill ? candidate.studentSkills.find((sk: any) => {
                                    const sn = sk.skill_name.toLowerCase();
                                    const rn = s.toLowerCase();
                                    return sn.includes(rn) || rn.includes(sn);
                                  }) : null;
                                  const displaySkill = skill || semanticSkill;
                                  return (
                                    <Badge key={s} className={`text-xs border-0 ${levelColors[displaySkill?.proficiency || "intermediate"]}`}>
                                      {s}
                                      {displaySkill && <span className="opacity-60 ml-0.5">• {displaySkill.proficiency}</span>}
                                      {semanticSkill && (
                                        <span className="ml-0.5 opacity-50" title={`Matched via ${semanticSkill.skill_name}`}>
                                          <Sparkles className="w-3 h-3 inline" />
                                        </span>
                                      )}
                                    </Badge>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {/* Missing Skills */}
                          {missingSkills.length > 0 && (
                            <div className="mb-2">
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Missing Skills</span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {missingSkills.map((s: string) => (
                                  <Badge key={s} variant="outline" className="text-xs border-match-average/30 text-match-average">{s}</Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Relevant Projects */}
                          {candidate.relevantProjects.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-border">
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1">
                                <FolderKanban className="w-3 h-3" /> Relevant Projects
                              </span>
                              <div className="mt-1 space-y-1">
                                {candidate.relevantProjects.slice(0, 3).map((proj: any, pi: number) => (
                                  <div key={pi} className="text-xs text-muted-foreground">
                                    <span className="text-foreground font-medium">{proj.title}</span>
                                    {proj.technologies?.length > 0 && (
                                      <span className="ml-1">
                                        — {proj.technologies.slice(0, 5).join(", ")}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
