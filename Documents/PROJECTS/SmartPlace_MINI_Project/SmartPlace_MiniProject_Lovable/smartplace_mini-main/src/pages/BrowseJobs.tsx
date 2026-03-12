import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Briefcase, MapPin, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

function getMatchColor(p: number) {
  if (p >= 80) return "text-match-excellent";
  if (p >= 60) return "text-match-good";
  if (p >= 40) return "text-match-average";
  return "text-match-low";
}

export default function BrowseJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const [jobsRes, matchesRes] = await Promise.all([
        supabase.from("jobs").select("*").eq("is_active", true).order("created_at", { ascending: false }),
        user ? supabase.from("match_results").select("*").eq("user_id", user.id) : Promise.resolve({ data: [] }),
      ]);
      setJobs(jobsRes.data || []);
      setMatches(matchesRes.data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  const getMatch = (jobId: string) => matches.find((m) => m.job_id === jobId);

  const filtered = jobs.filter((j) =>
    !search || j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.company.toLowerCase().includes(search.toLowerCase()) ||
    j.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container max-w-4xl">
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">Browse Jobs</h1>
        <p className="text-sm text-muted-foreground mb-6">Explore available job postings and see your match scores</p>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search jobs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-border bg-card">
            <Briefcase className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">No jobs available</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((job, i) => {
              const match = getMatch(job.id);
              const skills = Array.isArray(job.required_skills) ? job.required_skills : [];
              return (
                <Link to={`/jobs/${job.id}`} key={job.id} className="block">
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="p-6 rounded-xl border border-border bg-card shadow-card hover:border-secondary/30 transition-colors cursor-pointer">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-display font-semibold text-foreground text-lg">{job.title}</h3>
                        <Badge variant="outline" className="text-xs">{job.type}</Badge>
                      </div>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                        <span>{job.company}</span>
                        {job.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{job.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {skills.map((s: any) => {
                          const name = typeof s === "string" ? s : s.name;
                          const level = typeof s === "string" ? "" : s.level;
                          const isMatched = match && Array.isArray(match.matched_skills) && match.matched_skills.includes(name);
                          return (
                            <Badge key={name} className={`text-xs border-0 ${isMatched ? "bg-match-excellent/10 text-match-excellent" : "bg-muted text-muted-foreground"}`}>
                              {name}{level && <span className="opacity-60 ml-0.5">• {level}</span>}
                            </Badge>
                          );
                        })}
                      </div>
                    </div>
                    {match && (
                      <div className="flex flex-col items-center min-w-[90px]">
                        <div className={`text-3xl font-display font-bold ${getMatchColor(match.match_percentage)}`}>
                          {match.match_percentage}%
                        </div>
                        <span className="text-xs text-muted-foreground mb-1.5">Match</span>
                        <Progress value={match.match_percentage} className="h-1.5 w-full" />
                      </div>
                    )}
                  </div>
                </motion.div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
