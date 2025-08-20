import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest) {
  try {
    const { text, voice = "alloy", format = "mp3" } = await req.json();
    if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    // Using OpenAI TTS. If your account doesn't have 'gpt-4o-mini-tts', switch to 'tts-1'.
    // @ts-ignore
    const speech = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice,
      input: text,
      format,
    });
    const arrayBuffer = await speech.arrayBuffer();
    return new NextResponse(Buffer.from(arrayBuffer), {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "no-store"
      }
    });
  } catch (e:any) {
    return NextResponse.json({ error: e.message || "TTS failed" }, { status: 500 });
  }
}
