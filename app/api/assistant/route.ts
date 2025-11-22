import { NextResponse } from "next/server";
import { client as sanity } from "@/sanity/lib/client";

export async function POST (req:Request){
  try {
    const {message} = await req.json()

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

     const sanityData = await sanity.fetch(`
       {
        "projects": *[_type == "project"]{
          title,
          tagline,
          category,
          technologies[]->{name},
          liveDemo,
          githubUrl
        },
        "skills": *[_type == "skill"]{
          name,
          category,
          proficiency,
          yearsOfExperience
        },
        "experience": *[_type == "experience"]{
          company,
          position,
          startDate,
          endDate,
          responsibilities
        }
      }
      
      `)


      const resp = await fetch("https://openrouter.ai/api/v1/chat/completions",{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat",
          messages: [
             {
              role:"system",
              content:`You are an AI assistant for a developer portfolio website.

Here is the REAL data about the portfolio owner. 
Use ONLY this data to answer user questions accurately.
---
PROJECTS:
${JSON.stringify(sanityData.projects, null, 2)}

---
SKILLS:
${JSON.stringify(sanityData.skills, null, 2)}

---
EXPERIENCE:
${JSON.stringify(sanityData.experience, null, 2)}

IMPORTANT RULES:
- Do NOT fabricate new projects or skills.
- Only answer based on the data above.
- If information doesn't exist, say it is not available.
`,
             },
             {
              role:"user",
              content: message,
             }
          ]
        })
      })


      const data = await resp.json()
      const reply = data.choices?.[0]?.message?.content || "No response"

      return NextResponse.json({ reply });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}