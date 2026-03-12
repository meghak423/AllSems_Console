import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const { studentSkills, jobTitle, jobDescription, requiredSkills, matchedSkills, missingSkills, matchPercentage } = await req.json();

    const prompt = `You are a career advisor for a student placement platform.

A student has the following skills: ${JSON.stringify(studentSkills)}

They are looking at this job:
- Title: ${jobTitle}
- Description: ${jobDescription}
- Required Skills: ${JSON.stringify(requiredSkills)}
- Their Match: ${matchPercentage}%
- Matched Skills: ${JSON.stringify(matchedSkills)}
- Missing Skills: ${JSON.stringify(missingSkills)}

Please provide:
1. **Skill Gap Analysis**: For each missing skill, explain what it is and suggest specific resources (courses, projects) to learn it. Be specific about free resources.
2. **Improvement Plan**: A prioritized 4-week learning roadmap to improve their match percentage.
3. **Interview Preparation**: 8-10 likely interview questions for this role, covering both technical and behavioral aspects. Include brief answer hints.
4. **Pro Tips**: 3-4 actionable tips to stand out as a candidate for this specific role.

Format your response in clear markdown with headers.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "You are an expert career counselor specializing in tech placements. Provide actionable, specific advice." },
          { role: "user", content: prompt },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("job-recommendations error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
