# AI Wellness Website (Web-Only)

An AI-powered, bilingual (EN/AR) wellness site with:
- Guided meditation audio library (AI-generated, streamed on web)
- Mood companion chatbot (web widget)
- Custom 30-day wellness plan generator (PDF/text)
- Printable workbooks shop (digital downloads)

## Stack
- Next.js 14 (App Router) + TypeScript
- TailwindCSS
- OpenAI API (text + optional TTS)
- Deployed on Vercel (recommended)

## Quick Start
```bash
pnpm i # or npm i / yarn
cp .env.example .env.local  # add keys
pnpm dev
```
Go to http://localhost:3000

## Notes
- API routes are in `app/api`. They expect `OPENAI_API_KEY` in env.
- TTS/audio generation is mocked. Replace with your preferred provider if needed.
