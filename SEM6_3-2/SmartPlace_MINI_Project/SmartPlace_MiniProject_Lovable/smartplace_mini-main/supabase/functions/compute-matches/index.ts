import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Semantic skill mapping - related technologies that should match
const SKILL_FAMILIES: Record<string, string[]> = {
  java: ["spring", "spring boot", "springboot", "hibernate", "maven", "gradle", "j2ee", "jee", "jsp", "servlets", "jpa", "jdbc", "junit", "tomcat", "microservices"],
  python: ["django", "flask", "fastapi", "pandas", "numpy", "scipy", "pytorch", "tensorflow", "keras", "scikit-learn", "matplotlib", "jupyter"],
  javascript: ["react", "reactjs", "react.js", "angular", "angularjs", "vue", "vuejs", "vue.js", "node", "nodejs", "node.js", "express", "expressjs", "next.js", "nextjs", "typescript", "jquery", "svelte"],
  "web development": ["html", "css", "javascript", "react", "angular", "vue", "bootstrap", "tailwind", "sass", "scss", "webpack", "vite"],
  sql: ["mysql", "postgresql", "postgres", "oracle", "sql server", "mssql", "sqlite", "mariadb", "plsql", "tsql"],
  "database": ["sql", "mysql", "postgresql", "mongodb", "redis", "cassandra", "dynamodb", "firebase", "neo4j", "elasticsearch"],
  "cloud": ["aws", "azure", "gcp", "google cloud", "amazon web services", "microsoft azure", "heroku", "digitalocean", "cloudflare"],
  "devops": ["docker", "kubernetes", "k8s", "jenkins", "ci/cd", "terraform", "ansible", "github actions", "gitlab ci", "circleci"],
  "machine learning": ["ml", "deep learning", "neural networks", "nlp", "computer vision", "tensorflow", "pytorch", "scikit-learn", "keras", "ai", "artificial intelligence"],
  "mobile": ["android", "ios", "react native", "flutter", "swift", "kotlin", "xamarin", "ionic"],
  "c++": ["c", "c programming", "cpp", "stl", "qt", "opencv"],
  ".net": ["c#", "csharp", "asp.net", "entity framework", "blazor", "wpf", "xamarin"],
  "data science": ["pandas", "numpy", "matplotlib", "seaborn", "jupyter", "r", "statistics", "data analysis", "data visualization", "tableau", "power bi"],
};

function getSemanticScore(studentSkill: string, requiredSkill: string): number {
  const s = studentSkill.toLowerCase().trim();
  const r = requiredSkill.toLowerCase().trim();
  
  // Exact match
  if (s === r) return 1.0;
  
  // Substring match (e.g., "react" matches "reactjs")
  if (s.includes(r) || r.includes(s)) return 0.9;
  
  // Check if they belong to the same skill family
  for (const [family, members] of Object.entries(SKILL_FAMILIES)) {
    const allInFamily = [family, ...members];
    const studentInFamily = allInFamily.some(m => m === s || s.includes(m) || m.includes(s));
    const requiredInFamily = allInFamily.some(m => m === r || r.includes(m) || m.includes(r));
    
    if (studentInFamily && requiredInFamily) {
      // Direct family member match (e.g., Spring Boot for Java)
      if (s === family || r === family) return 0.85;
      // Both are members of same family
      return 0.7;
    }
  }
  
  return 0;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header");

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error("Unauthorized");

    const { userId, jobId } = await req.json();

    const serviceClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    if (userId && jobId) {
      const match = await computeMatch(serviceClient, userId, jobId);
      return new Response(JSON.stringify({ match }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (userId) {
      const { data: jobs } = await serviceClient.from("jobs").select("id").eq("is_active", true);
      const matches = [];
      for (const job of jobs || []) {
        const match = await computeMatch(serviceClient, userId, job.id);
        if (match) matches.push(match);
      }
      return new Response(JSON.stringify({ matches }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (jobId) {
      const { data: profiles } = await serviceClient.from("profiles").select("user_id");
      const matches = [];
      for (const p of profiles || []) {
        const match = await computeMatch(serviceClient, p.user_id, jobId);
        if (match) matches.push(match);
      }
      return new Response(JSON.stringify({ matches }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Compute all
    const { data: jobs } = await serviceClient.from("jobs").select("id").eq("is_active", true);
    const { data: profiles } = await serviceClient.from("profiles").select("user_id");
    const allMatches = [];
    for (const p of profiles || []) {
      for (const job of jobs || []) {
        const match = await computeMatch(serviceClient, p.user_id, job.id);
        if (match) allMatches.push(match);
      }
    }

    return new Response(JSON.stringify({ matches: allMatches }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("compute-matches error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function computeMatch(supabase: any, userId: string, jobId: string) {
  // Get student skills
  const { data: skills } = await supabase
    .from("student_skills")
    .select("skill_name, proficiency")
    .eq("user_id", userId);

  // Get student profile for CGPA and projects
  const { data: profile } = await supabase
    .from("profiles")
    .select("cgpa, projects")
    .eq("user_id", userId)
    .single();

  if (!skills || skills.length === 0) return null;

  // Get job
  const { data: job } = await supabase
    .from("jobs")
    .select("required_skills")
    .eq("id", jobId)
    .single();

  if (!job) return null;

  const requiredSkills: Array<{ name: string; level?: string; weight?: number }> = 
    Array.isArray(job.required_skills) ? job.required_skills : [];

  if (requiredSkills.length === 0) return null;

  const levelScore: Record<string, number> = { beginner: 0.4, intermediate: 0.7, advanced: 1.0 };

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];
  const semanticMatches: Array<{ required: string; matched: string; similarity: number }> = [];
  let totalWeight = 0;
  let matchedWeight = 0;

  for (const req of requiredSkills) {
    const reqName = typeof req === "string" ? req : req.name;
    const reqLevel = typeof req === "string" ? "intermediate" : (req.level || "intermediate");
    const weight = typeof req === "string" ? 1 : (req.weight || 1);
    
    totalWeight += weight;

    // Find best semantic match across all student skills
    let bestScore = 0;
    let bestSkill = "";
    let bestProficiency = "beginner";

    for (const s of skills) {
      const semanticScore = getSemanticScore(s.skill_name, reqName);
      if (semanticScore > bestScore) {
        bestScore = semanticScore;
        bestSkill = s.skill_name;
        bestProficiency = s.proficiency;
      }
    }

    if (bestScore >= 0.5) {
      matchedSkills.push(reqName);
      const studentScore = levelScore[bestProficiency] || 0.5;
      const reqScore = levelScore[reqLevel] || 0.7;
      // Factor in semantic similarity and proficiency
      matchedWeight += weight * Math.min(studentScore / reqScore, 1) * bestScore;
      
      if (bestScore < 1.0) {
        semanticMatches.push({ required: reqName, matched: bestSkill, similarity: Math.round(bestScore * 100) });
      }
    } else {
      // Check if any project uses this technology
      const projects: any[] = profile?.projects || [];
      const projectMatch = projects.some((p: any) => 
        p.technologies?.some((t: string) => getSemanticScore(t, reqName) >= 0.5)
      );
      
      if (projectMatch) {
        matchedSkills.push(reqName);
        matchedWeight += weight * 0.5; // 50% credit for project-only match
        semanticMatches.push({ required: reqName, matched: "project experience", similarity: 50 });
      } else {
        missingSkills.push(reqName);
      }
    }
  }

  // Skill match percentage (70% weight)
  const skillScore = totalWeight > 0 ? (matchedWeight / totalWeight) * 100 : 0;
  
  // CGPA bonus (15% weight) - normalize to 0-100
  let cgpaScore = 50; // default if no CGPA
  if (profile?.cgpa) {
    // Assume 10-point scale if > 4, otherwise 4-point
    const maxGpa = profile.cgpa > 4 ? 10 : 4;
    cgpaScore = Math.min((profile.cgpa / maxGpa) * 100, 100);
  }
  
  // Project relevance bonus (15% weight)
  const projects: any[] = profile?.projects || [];
  let projectScore = 0;
  if (projects.length > 0) {
    let relevantProjects = 0;
    for (const proj of projects) {
      const techs: string[] = proj.technologies || [];
      for (const req of requiredSkills) {
        const reqName = typeof req === "string" ? req : req.name;
        if (techs.some(t => getSemanticScore(t, reqName) >= 0.5)) {
          relevantProjects++;
          break;
        }
      }
    }
    projectScore = Math.min((relevantProjects / Math.max(requiredSkills.length, 1)) * 100, 100);
  }

  const matchPercentage = Math.round(skillScore * 0.70 + cgpaScore * 0.15 + projectScore * 0.15);

  // Upsert match result
  const { data: existing } = await supabase
    .from("match_results")
    .select("id")
    .eq("user_id", userId)
    .eq("job_id", jobId)
    .maybeSingle();

  const matchData = {
    match_percentage: matchPercentage,
    matched_skills: matchedSkills,
    missing_skills: missingSkills,
    computed_at: new Date().toISOString(),
  };

  if (existing) {
    await supabase.from("match_results").update(matchData).eq("id", existing.id);
  } else {
    await supabase.from("match_results").insert({ user_id: userId, job_id: jobId, ...matchData });
  }

  return {
    userId,
    jobId,
    matchPercentage,
    matchedSkills,
    missingSkills,
    semanticMatches,
    cgpa: profile?.cgpa || null,
    projectCount: projects.length,
    relevantProjects: projects.filter((p: any) => 
      p.technologies?.some((t: string) => 
        requiredSkills.some(req => getSemanticScore(t, typeof req === "string" ? req : req.name) >= 0.5)
      )
    ).length,
  };
}
