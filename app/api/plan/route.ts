import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { goal, minutes } = await req.json();
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `Create a 30-day wellness plan for someone in Dubai. Goal: ${goal}. Daily minutes: ${minutes}. 
Provide concise daily bullets (Day 1-30), mix of meditation, journaling, light movement.
Culturally adapt for the UAE. Keep it bilingual section headers (English + Arabic).`;
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    const plan = completion.choices[0]?.message?.content ?? "Plan unavailable.";
    return NextResponse.json({ plan });
  } catch (e) {
    return NextResponse.json({ plan: "Sorry, something went wrong." }, { status: 200 });
  }
}
