import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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

    const { resumeText, resumeId } = await req.json();
    if (!resumeText) throw new Error("No resume text provided");

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `You are an expert resume parser. Extract ONLY information that is EXPLICITLY mentioned in the resume text. Do NOT infer or guess skills that aren't stated.

Rules:
- Only extract skills/technologies that are explicitly written in the resume
- Extract CGPA/GPA if mentioned (as a number like 8.5 or 3.7)
- Extract projects with their title, description, and the specific technologies used IN that project
- For proficiency: "advanced" = extensive professional use or 2+ projects; "intermediate" = used in projects; "beginner" = coursework/mentioned briefly
- Do NOT add skills like "Problem Solving", "Communication" unless explicitly listed
- Extract education details accurately`
          },
          { role: "user", content: `Parse this resume. Only extract what is explicitly written:\n\n${resumeText.substring(0, 8000)}` }
        ],
        tools: [{
          type: "function",
          function: {
            name: "extract_resume_data",
            description: "Extract structured data from resume - only explicitly mentioned information",
            parameters: {
              type: "object",
              properties: {
                skills: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: { type: "string", description: "Exact skill/technology name as written in resume" },
                      level: { type: "string", enum: ["beginner", "intermediate", "advanced"] }
                    },
                    required: ["name", "level"],
                    additionalProperties: false
                  }
                },
                summary: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                    department: { type: "string" },
                    year: { type: "string" },
                    cgpa: { type: "number", description: "CGPA or GPA if mentioned, e.g. 8.5 or 3.7" },
                    education: { type: "string" },
                    projects: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          description: { type: "string" },
                          technologies: { type: "array", items: { type: "string" } }
                        },
                        required: ["title", "description", "technologies"],
                        additionalProperties: false
                      }
                    },
                    certifications: { type: "array", items: { type: "string" } },
                    languages: { type: "array", items: { type: "string" } }
                  },
                  additionalProperties: false
                }
              },
              required: ["skills", "summary"],
              additionalProperties: false
            }
          }
        }],
        tool_choice: { type: "function", function: { name: "extract_resume_data" } }
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI error:", aiResponse.status, errText);
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" }
        });
      }
      throw new Error("AI parsing failed");
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No tool call response from AI");

    const parsed = JSON.parse(toolCall.function.arguments);
    const { skills, summary } = parsed;

    // Delete existing skills for this user, then insert new ones
    await supabase.from("student_skills").delete().eq("user_id", user.id);

    if (skills && skills.length > 0) {
      const skillRows = skills.map((s: any) => ({
        user_id: user.id,
        skill_name: s.name,
        proficiency: s.level,
        source: "ai_parsed",
      }));
      await supabase.from("student_skills").insert(skillRows);
    }

    // Update profile with extracted info including CGPA and projects
    const profileUpdate: any = {};
    if (summary?.name) profileUpdate.full_name = summary.name;
    if (summary?.phone) profileUpdate.phone = summary.phone;
    if (summary?.department) profileUpdate.department = summary.department;
    if (summary?.year) profileUpdate.year = summary.year;
    if (summary?.cgpa !== undefined && summary?.cgpa !== null) profileUpdate.cgpa = summary.cgpa;
    if (summary?.projects && summary.projects.length > 0) profileUpdate.projects = summary.projects;
    
    if (Object.keys(profileUpdate).length > 0) {
      await supabase.from("profiles").update(profileUpdate).eq("user_id", user.id);
    }

    // Mark resume as parsed
    if (resumeId) {
      await supabase.from("resumes").update({ parsed: true }).eq("id", resumeId);
    }

    return new Response(JSON.stringify({ skills, summary, success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("parse-resume error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
