import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, MapPin, Loader2, Sparkles, Brain, BookOpen, MessageSquare, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import ReactMarkdown from "react-markdown";

function getMatchColor(p: number) {
  if (p >= 80) return "text-match-excellent";
  if (p >= 60) return "text-match-good";
  if (p >= 40) return "text-match-average";
  return "text-match-low";
}

export default function JobDetail() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [job, setJob] = useState<any>(null);
  const [match, setMatch] = useState<any>(null);
  const [skills, setSkills] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [computing, setComputing] = useState(false);
  const [aiContent, setAiContent] = useState("");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    if (!id || !user) return;
    const load = async () => {
      const [jobRes, matchRes, skillsRes] = await Promise.all([
        supabase.from("jobs").select("*").eq("id", id).single(),
        supabase.from("match_results").select("*").eq("user_id", user.id).eq("job_id", id).maybeSingle(),
        supabase.from("student_skills").select("*").eq("user_id", user.id),
      ]);
      setJob(jobRes.data);
      setMatch(matchRes.data);
      setSkills(skillsRes.data || []);
      setLoading(false);
    };
    load();
  }, [id, user]);

  const computeMatch = async () => {
    if (!user || !id) return;
    setComputing(true);
    try {
      const { data, error } = await supabase.functions.invoke("compute-matches", {
        body: { userId: user.id, jobId: id },
      });
      if (error) throw error;
      // Reload match
      const { data: updated } = await supabase.from("match_results").select("*").eq("user_id", user.id).eq("job_id", id).maybeSingle();
      setMatch(updated);
    } catch (e: any) {
      console.error(e);
    } finally {
      setComputing(false);
    }
  };

  const getRecommendations = async () => {
    if (!job || !user) return;
    setAiLoading(true);
    setAiContent("");

    const requiredSkills = Array.isArray(job.required_skills) ? job.required_skills : [];
    const matchedSkills = match ? (Array.isArray(match.matched_skills) ? match.matched_skills : []) : [];
    const missingSkills = match ? (Array.isArray(match.missing_skills) ? match.missing_skills : []) : [];
    const studentSkills = skills.map((s) => ({ name: s.skill_name, level: s.proficiency }));

    try {
      const resp = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/job-recommendations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          studentSkills,
          jobTitle: job.title,
          jobDescription: job.description,
          requiredSkills,
          matchedSkills,
          missingSkills,
          matchPercentage: match?.match_percentage || 0,
        }),
      });

      if (!resp.ok || !resp.body) throw new Error("Failed to get recommendations");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let content = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        let newlineIdx: number;
        while ((newlineIdx = buffer.indexOf("\n")) !== -1) {
          let line = buffer.slice(0, newlineIdx);
          buffer = buffer.slice(newlineIdx + 1);
          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (!line.startsWith("data: ")) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") break;
          try {
            const parsed = JSON.parse(jsonStr);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              content += delta;
              setAiContent(content);
            }
          } catch {}
        }
      }
    } catch (e: any) {
      console.error(e);
      setAiContent("Failed to load recommendations. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

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

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 container max-w-4xl text-center">
          <p className="text-foreground">Job not found</p>
          <Button asChild className="mt-4"><Link to="/jobs">Back to Jobs</Link></Button>
        </div>
      </div>
    );
  }

  const requiredSkills = Array.isArray(job.required_skills) ? job.required_skills : [];
  const matchedSkills = match ? (Array.isArray(match.matched_skills) ? match.matched_skills : []) : [];
  const missingSkills = match ? (Array.isArray(match.missing_skills) ? match.missing_skills : []) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container max-w-4xl">
        <Link to="/jobs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Jobs
        </Link>

        {/* Job Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="p-6 rounded-xl border border-border bg-card shadow-card mb-6">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-secondary" />
                <h1 className="text-2xl font-display font-bold text-foreground">{job.title}</h1>
                <Badge variant="outline">{job.type}</Badge>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <span>{job.company}</span>
                {job.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>}
              </div>
              <p className="text-sm text-muted-foreground">{job.description}</p>
            </div>
            {match && (
              <div className="flex flex-col items-center min-w-[120px] p-4 rounded-lg bg-muted/50">
                <div className={`text-4xl font-display font-bold ${getMatchColor(match.match_percentage)}`}>
                  {match.match_percentage}%
                </div>
                <span className="text-xs text-muted-foreground mb-2">Your Match</span>
                <Progress value={match.match_percentage} className="h-2 w-full" />
              </div>
            )}
          </div>
        </motion.div>

        {/* Skills Breakdown */}
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="p-6 rounded-xl border border-border bg-card shadow-card mb-6">
          <h2 className="text-lg font-display font-bold text-foreground mb-4">Required Skills</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {requiredSkills.map((s: any) => {
              const name = typeof s === "string" ? s : s.name;
              const level = typeof s === "string" ? "" : s.level;
              const isMatched = matchedSkills.includes(name);
              return (
                <Badge key={name} className={`text-xs border-0 ${isMatched ? "bg-match-excellent/10 text-match-excellent" : "bg-match-low/10 text-match-low"}`}>
                  {isMatched ? "✓" : "✗"} {name}{level && <span className="opacity-60 ml-0.5">• {level}</span>}
                </Badge>
              );
            })}
          </div>

          {missingSkills.length > 0 && (
            <div className="p-3 rounded-lg bg-match-average/5 border border-match-average/20">
              <p className="text-sm font-medium text-match-average mb-1">Skills to Develop ({missingSkills.length})</p>
              <p className="text-xs text-muted-foreground">{missingSkills.join(", ")}</p>
            </div>
          )}

          <div className="flex gap-2 mt-4">
            <Button onClick={computeMatch} disabled={computing} variant="outline" size="sm">
              {computing ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Brain className="w-4 h-4 mr-1.5" />}
              {match ? "Recompute Match" : "Test My Match"}
            </Button>
            <Button onClick={getRecommendations} disabled={aiLoading} size="sm" className="bg-hero-gradient text-primary-foreground hover:opacity-90">
              {aiLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Sparkles className="w-4 h-4 mr-1.5" />}
              Get AI Recommendations
            </Button>
          </div>
        </motion.div>

        {/* AI Recommendations */}
        {(aiContent || aiLoading) && (
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-xl border border-border bg-card shadow-card">
            <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-secondary" /> AI Career Recommendations
            </h2>
            {aiLoading && !aiContent && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" /> Generating personalized recommendations...
              </div>
            )}
            {aiContent && (
              <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-headings:font-display prose-strong:text-foreground prose-a:text-secondary">
                <ReactMarkdown>{aiContent}</ReactMarkdown>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
