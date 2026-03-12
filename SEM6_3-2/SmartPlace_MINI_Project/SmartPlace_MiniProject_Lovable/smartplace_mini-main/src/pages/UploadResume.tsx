import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileText, Loader2, CheckCircle2, AlertCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const levelColors: Record<string, string> = {
  advanced: "bg-match-excellent/10 text-match-excellent",
  intermediate: "bg-match-good/10 text-match-good",
  beginner: "bg-match-average/10 text-match-average",
};

export default function UploadResume() {
  const { user } = useAuth();
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parsedSkills, setParsedSkills] = useState<Array<{ name: string; level: string }> | null>(null);
  const [parsedSummary, setParsedSummary] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  const handleFile = useCallback(async (file: File) => {
    if (!user) return;
    if (!file.name.endsWith(".pdf") && !file.name.endsWith(".txt") && !file.name.endsWith(".docx")) {
      toast.error("Please upload a PDF, TXT, or DOCX file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }

    setUploading(true);
    setProgress(20);
    setParsedSkills(null);

    try {
      // Upload to storage
      const filePath = `${user.id}/${Date.now()}_${file.name}`;
      const { error: uploadErr } = await supabase.storage.from("resumes").upload(filePath, file);
      if (uploadErr) throw uploadErr;

      setProgress(40);

      // Save resume record
      const { data: resumeRecord, error: recordErr } = await supabase
        .from("resumes")
        .insert({ user_id: user.id, file_url: filePath, file_name: file.name })
        .select()
        .single();
      if (recordErr) throw recordErr;

      setProgress(50);

      // Read text content (for PDFs we send the name, AI handles it)
      let textContent = "";
      if (file.name.endsWith(".txt")) {
        textContent = await file.text();
      } else {
        // For PDF/DOCX, we'll read as text (basic extraction)
        textContent = await file.text();
      }

      setUploading(false);
      setParsing(true);
      setProgress(60);

      // Call AI parsing
      const { data, error } = await supabase.functions.invoke("parse-resume", {
        body: { resumeText: textContent, resumeId: resumeRecord.id },
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      setProgress(90);
      setParsedSkills(data.skills);
      setParsedSummary(data.summary);

      // Compute matches after parsing
      await supabase.functions.invoke("compute-matches", {
        body: { userId: user.id },
      });

      setProgress(100);
      toast.success(`Resume parsed! Found ${data.skills?.length || 0} skills.`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to process resume");
    } finally {
      setUploading(false);
      setParsing(false);
    }
  }, [user]);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 container max-w-3xl">
        <h1 className="text-2xl font-display font-bold text-foreground mb-2">Upload Resume</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Upload your resume and our AI will extract your skills with proficiency levels automatically.
        </p>

        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
            dragOver ? "border-secondary bg-secondary/5" : "border-border bg-card"
          }`}
        >
          {uploading || parsing ? (
            <div className="space-y-4">
              <Loader2 className="w-10 h-10 text-secondary mx-auto animate-spin" />
              <p className="text-foreground font-medium">
                {uploading ? "Uploading resume..." : "AI is analyzing your resume..."}
              </p>
              <Progress value={progress} className="max-w-xs mx-auto" />
              <p className="text-xs text-muted-foreground">
                {parsing && "Extracting skills, projects, education, and proficiency levels"}
              </p>
            </div>
          ) : (
            <>
              <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-4" />
              <p className="text-foreground font-medium mb-1">Drop your resume here</p>
              <p className="text-sm text-muted-foreground mb-4">PDF, TXT, or DOCX (max 5MB)</p>
              <label>
                <input type="file" accept=".pdf,.txt,.docx" onChange={onFileSelect} className="hidden" />
                <Button variant="outline" asChild><span>Browse Files</span></Button>
              </label>
            </>
          )}
        </motion.div>

        {/* Parsed Results */}
        {parsedSkills && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            <div className="flex items-center gap-2 text-match-excellent">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-display font-semibold">Resume Parsed Successfully!</span>
            </div>

            {/* Summary */}
            {parsedSummary && (
              <div className="p-5 rounded-xl border border-border bg-card shadow-card">
                <h3 className="font-display font-semibold text-foreground mb-3">Profile Summary</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {parsedSummary.name && <div><span className="text-muted-foreground">Name:</span> <span className="text-foreground">{parsedSummary.name}</span></div>}
                  {parsedSummary.email && <div><span className="text-muted-foreground">Email:</span> <span className="text-foreground">{parsedSummary.email}</span></div>}
                  {parsedSummary.department && <div><span className="text-muted-foreground">Department:</span> <span className="text-foreground">{parsedSummary.department}</span></div>}
                  {parsedSummary.education && <div className="col-span-2"><span className="text-muted-foreground">Education:</span> <span className="text-foreground">{parsedSummary.education}</span></div>}
                </div>
                {parsedSummary.projects?.length > 0 && (
                  <div className="mt-3">
                    <span className="text-xs font-medium text-muted-foreground">Projects:</span>
                    <ul className="list-disc list-inside text-sm text-foreground mt-1">
                      {parsedSummary.projects.map((p: string, i: number) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Skills */}
            <div className="p-5 rounded-xl border border-border bg-card shadow-card">
              <h3 className="font-display font-semibold text-foreground mb-3">
                Extracted Skills ({parsedSkills.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {parsedSkills.map((skill) => (
                  <Badge key={skill.name} className={`${levelColors[skill.level] || ""} border-0 text-xs`}>
                    {skill.name}
                    <span className="ml-1 opacity-70">• {skill.level}</span>
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-match-excellent" /> Advanced</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-match-good" /> Intermediate</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-match-average" /> Beginner</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
