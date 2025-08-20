import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body?.messages ?? [];
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a kind, culturally-aware mindfulness companion for people living in the UAE. Keep advice practical and supportive. Avoid medical claims; you are not a therapist." },
        ...messages.map((m: any) => ({ role: m.role, content: m.content }))
      ],
      temperature: 0.7,
    });
    const reply = completion.choices[0]?.message?.content ?? "I'm here for you.";
    return NextResponse.json({ reply });
  } catch (e) {
    return NextResponse.json({ reply: "Sorry, something went wrong." }, { status: 200 });
  }
}
