import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Plus, Trash2, Save, Loader2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type SkillLevel = Database["public"]["Enums"]["skill_level"];

interface Skill {
  id?: string;
  skill_name: string;
  proficiency: SkillLevel;
  source: string;
  isNew?: boolean;
}

const levelColors: Record<string, string> = {
  advanced: "bg-match-excellent/10 text-match-excellent",
  intermediate: "bg-match-good/10 text-match-good",
  beginner: "bg-match-average/10 text-match-average",
};

export default function EditProfile() {
  const { user, profile, refreshProfile } = useAuth();
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [phone, setPhone] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [skills, setSkills] = useState<Skill[]>([]);
  const [newSkill, setNewSkill] = useState("");
  const [newLevel, setNewLevel] = useState<SkillLevel>("beginner");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      if (profile) {
        setFullName(profile.full_name || "");
        setDepartment(profile.department || "");
        setYear(profile.year || "");
        setPhone(profile.phone || "");
        setCgpa(profile.cgpa !== null && profile.cgpa !== undefined ? String(profile.cgpa) : "");
      }
      const { data } = await supabase
        .from("student_skills")
        .select("*")
        .eq("user_id", user.id)
        .order("skill_name");
      setSkills((data || []).map((s) => ({ ...s, source: s.source || "manual" })));
      setLoading(false);
    };
    load();
  }, [user, profile]);

  const addSkill = () => {
    const name = newSkill.trim();
    if (!name) return;
    if (skills.some((s) => s.skill_name.toLowerCase() === name.toLowerCase())) {
      toast.error("Skill already exists");
      return;
    }
    setSkills([...skills, { skill_name: name, proficiency: newLevel, source: "manual", isNew: true }]);
    setNewSkill("");
    setNewLevel("beginner");
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const updateSkillLevel = (index: number, level: SkillLevel) => {
    setSkills(skills.map((s, i) => (i === index ? { ...s, proficiency: level } : s)));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      // Update profile
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: fullName.trim(),
          department: department.trim(),
          year: year.trim(),
          phone: phone.trim(),
          cgpa: cgpa.trim() ? parseFloat(cgpa.trim()) : null,
        })
        .eq("user_id", user.id);
      if (profileError) throw profileError;

      // Delete all existing skills and re-insert
      await supabase.from("student_skills").delete().eq("user_id", user.id);

      if (skills.length > 0) {
        const { error: skillsError } = await supabase.from("student_skills").insert(
          skills.map((s) => ({
            user_id: user.id,
            skill_name: s.skill_name,
            proficiency: s.proficiency,
            source: s.source || "manual",
          }))
        );
        if (skillsError) throw skillsError;
      }

      await refreshProfile();
      toast.success("Profile updated successfully!");
    } catch (err: any) {
      toast.error(err.message || "Failed to save");
    } finally {
      setSaving(false);
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-2xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-secondary" /> Edit Profile
          </h1>

          {/* Profile Info */}
          <div className="p-6 rounded-xl border border-border bg-card shadow-card mb-6 space-y-4">
            <h2 className="text-lg font-display font-semibold text-foreground flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-secondary" /> Personal Info
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Input id="department" value={department} onChange={(e) => setDepartment(e.target.value)} placeholder="e.g. Computer Science" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input id="year" value={year} onChange={(e) => setYear(e.target.value)} placeholder="e.g. 3rd Year" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91 9876543210" className="mt-1.5" />
              </div>
              <div>
                <Label htmlFor="cgpa">CGPA / GPA</Label>
                <Input id="cgpa" type="number" step="0.01" min="0" max="10" value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="e.g. 8.5" className="mt-1.5" />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="p-6 rounded-xl border border-border bg-card shadow-card mb-6">
            <h2 className="text-lg font-display font-semibold text-foreground mb-4">Skills & Proficiency</h2>

            {/* Add new skill */}
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <Input
                placeholder="Add a skill (e.g. Python, React, SQL)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addSkill()}
                className="flex-1"
              />
              <Select value={newLevel} onValueChange={(v) => setNewLevel(v as SkillLevel)}>
                <SelectTrigger className="w-full sm:w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={addSkill} size="icon" variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Skills list */}
            {skills.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">No skills added yet. Add skills manually or upload your resume.</p>
            ) : (
              <div className="space-y-2">
                {skills.map((skill, i) => (
                  <div key={`${skill.skill_name}-${i}`} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-foreground">{skill.skill_name}</span>
                      <Badge variant="outline" className="text-[10px]">{skill.source === "ai_parsed" ? "AI" : "Manual"}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select value={skill.proficiency} onValueChange={(v) => updateSkillLevel(i, v as SkillLevel)}>
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Beginner</SelectItem>
                          <SelectItem value="intermediate">Intermediate</SelectItem>
                          <SelectItem value="advanced">Advanced</SelectItem>
                        </SelectContent>
                      </Select>
                      <Badge className={`text-xs border-0 ${levelColors[skill.proficiency]}`}>{skill.proficiency}</Badge>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => removeSkill(i)}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button onClick={handleSave} className="w-full bg-hero-gradient text-primary-foreground hover:opacity-90" disabled={saving}>
            {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Save Profile
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
