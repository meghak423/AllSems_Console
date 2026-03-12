import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Search, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";

const levelColors: Record<string, string> = {
  advanced: "bg-match-excellent/10 text-match-excellent",
  intermediate: "bg-match-good/10 text-match-good",
  beginner: "bg-match-average/10 text-match-average",
};

export default function AllStudents() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [resumes, setResumes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("all");

  useEffect(() => {
    const load = async () => {
      const [p, s, r] = await Promise.all([
        supabase.from("profiles").select("*").order("full_name"),
        supabase.from("student_skills").select("*"),
        supabase.from("resumes").select("user_id, parsed"),
      ]);
      setProfiles(p.data || []);
      setSkills(s.data || []);
      setResumes(r.data || []);
      setLoading(false);
    };
    load();
  }, []);

  const getStudentSkills = (userId: string) => skills.filter((s) => s.user_id === userId);
  const hasResume = (userId: string) => resumes.some((r) => r.user_id === userId);

  const filtered = profiles.filter((p) => {
    const matchesSearch = !search || p.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      p.department?.toLowerCase().includes(search.toLowerCase()) ||
      getStudentSkills(p.user_id).some((s: any) => s.skill_name.toLowerCase().includes(search.toLowerCase()));

    const matchesFilter = filterLevel === "all" ||
      getStudentSkills(p.user_id).some((s: any) => s.proficiency === filterLevel);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container max-w-5xl">
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">All Students</h1>
        <p className="text-sm text-muted-foreground mb-6">View all registered students and their skill profiles</p>

        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search by name, department, or skill..." value={search}
              onChange={(e) => setSearch(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterLevel} onValueChange={setFilterLevel}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-1.5" /><SelectValue placeholder="Filter by level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="advanced">Advanced</SelectItem>
              <SelectItem value="intermediate">Intermediate</SelectItem>
              <SelectItem value="beginner">Beginner</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full" /></div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-border bg-card">
            <Users className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">No students found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((profile, i) => {
              const studentSkills = getStudentSkills(profile.user_id);
              return (
                <motion.div key={profile.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="p-5 rounded-xl border border-border bg-card shadow-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-display font-semibold text-foreground">{profile.full_name || "—"}</h3>
                        {profile.department && <Badge variant="outline" className="text-xs">{profile.department}</Badge>}
                        {profile.year && <span className="text-xs text-muted-foreground">{profile.year}</span>}
                        {hasResume(profile.user_id) && (
                          <Badge className="text-xs bg-match-excellent/10 text-match-excellent border-0">Resume ✓</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{profile.email}</p>
                      {studentSkills.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {studentSkills.map((s: any) => (
                            <Badge key={s.id} className={`text-xs border-0 ${levelColors[s.proficiency]}`}>
                              {s.skill_name} <span className="opacity-60 ml-0.5">• {s.proficiency}</span>
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-muted-foreground">No skills extracted yet</p>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-display font-bold text-foreground">{studentSkills.length}</div>
                      <div className="text-xs text-muted-foreground">Skills</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
