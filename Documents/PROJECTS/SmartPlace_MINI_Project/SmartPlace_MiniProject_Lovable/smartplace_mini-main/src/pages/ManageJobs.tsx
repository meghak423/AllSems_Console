import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

export default function ManageJobs() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("Full-time");
  const [skillsInput, setSkillsInput] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const loadJobs = async () => {
    const { data } = await supabase.from("jobs").select("*").order("created_at", { ascending: false });
    setJobs(data || []);
    setLoading(false);
  };

  useEffect(() => { loadJobs(); }, []);

  const resetForm = () => {
    setTitle(""); setCompany(""); setDescription(""); setLocation(""); setType("Full-time"); setSkillsInput(""); setEditId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim()) { toast.error("Title and company are required"); return; }
    setSubmitting(true);

    const requiredSkills = skillsInput.split(",").map((s) => s.trim()).filter(Boolean).map((s) => {
      const parts = s.split(":");
      return parts.length === 2
        ? { name: parts[0].trim(), level: parts[1].trim().toLowerCase() }
        : { name: s, level: "intermediate" };
    });

    const jobData = {
      title: title.trim(),
      company: company.trim(),
      description: description.trim(),
      location: location.trim(),
      type,
      required_skills: requiredSkills,
      posted_by: user!.id,
    };

    try {
      if (editId) {
        const { error } = await supabase.from("jobs").update(jobData).eq("id", editId);
        if (error) throw error;
        toast.success("Job updated!");
      } else {
        const { error } = await supabase.from("jobs").insert(jobData);
        if (error) throw error;
        toast.success("Job posted!");
      }
      resetForm();
      setDialogOpen(false);
      loadJobs();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const editJob = (job: any) => {
    setEditId(job.id);
    setTitle(job.title);
    setCompany(job.company);
    setDescription(job.description || "");
    setLocation(job.location || "");
    setType(job.type || "Full-time");
    const skills = Array.isArray(job.required_skills) ? job.required_skills : [];
    setSkillsInput(skills.map((s: any) => typeof s === "string" ? s : `${s.name}:${s.level}`).join(", "));
    setDialogOpen(true);
  };

  const deleteJob = async (id: string) => {
    if (!confirm("Delete this job posting?")) return;
    const { error } = await supabase.from("jobs").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Job deleted"); loadJobs(); }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Manage Job Postings</h1>
            <p className="text-sm text-muted-foreground">Create and manage job listings for students</p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(o) => { setDialogOpen(o); if (!o) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="bg-hero-gradient text-primary-foreground hover:opacity-90">
                <Plus className="w-4 h-4 mr-1.5" /> Add Job
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editId ? "Edit Job" : "Post New Job"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Job Title</Label>
                    <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="ML Engineer" className="mt-1" />
                  </div>
                  <div>
                    <Label>Company</Label>
                    <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="TechCorp AI" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Job description..." rows={3} className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Location</Label>
                    <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Bangalore" className="mt-1" />
                  </div>
                  <div>
                    <Label>Type</Label>
                    <Select value={type} onValueChange={setType}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                        <SelectItem value="Contract">Contract</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Required Skills</Label>
                  <Input value={skillsInput} onChange={(e) => setSkillsInput(e.target.value)}
                    placeholder="Python:advanced, Docker:intermediate, SQL:beginner" className="mt-1" />
                  <p className="text-xs text-muted-foreground mt-1">Comma-separated. Use skill:level format (e.g., Python:advanced)</p>
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting && <Loader2 className="w-4 h-4 animate-spin mr-1.5" />}
                  {editId ? "Update Job" : "Post Job"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><div className="animate-spin w-8 h-8 border-2 border-secondary border-t-transparent rounded-full" /></div>
        ) : jobs.length === 0 ? (
          <div className="p-8 text-center rounded-xl border border-border bg-card">
            <Briefcase className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-foreground font-medium">No jobs posted yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl border border-border bg-card shadow-card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-display font-semibold text-foreground">{job.title}</h3>
                      <Badge variant="outline" className="text-xs">{job.type}</Badge>
                      {!job.is_active && <Badge variant="destructive" className="text-xs">Inactive</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{job.company} • {job.location}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {(Array.isArray(job.required_skills) ? job.required_skills : []).map((s: any) => {
                        const name = typeof s === "string" ? s : s.name;
                        const level = typeof s === "string" ? "" : s.level;
                        return (
                          <Badge key={name} variant="secondary" className="text-xs">
                            {name}{level && <span className="opacity-60 ml-0.5">• {level}</span>}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    <Button variant="ghost" size="icon" onClick={() => editJob(job)}><Edit2 className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteJob(job.id)} className="text-destructive hover:text-destructive"><Trash2 className="w-4 h-4" /></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
