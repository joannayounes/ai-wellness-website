import Link from "next/link";
import { ChatWidget } from "../components/ChatWidget";
import { useLang } from "../components/LanguageProvider";

export default function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <section className="grid md:grid-cols-3 gap-6">
        <div className="card"><h3>Guided Meditations</h3><p className="opacity-80 text-sm mt-2">Stress relief, sleep stories, and morning affirmations.</p></div>
        <div className="card"><h3>Personal Plans</h3><p className="opacity-80 text-sm mt-2">Answer a quick quiz to get your custom 30‑day routine.</p></div>
        <div className="card"><h3>Printable Journals</h3><p className="opacity-80 text-sm mt-2">Bilingual gratitude & reflection packs for download.</p></div>
      </section>
      <Dubai />
      <ChatWidget />
    </div>
  );
}

function Hero() {
  const { t } = useLang();
  return (
    <section className="text-center space-y-6">
      <h1>{t("home_hero")}</h1>
      <p className="text-lg opacity-80 max-w-2xl mx-auto">
        Stream calming meditations, generate personalized 30‑day plans, and download printable journals.
        No app needed — 100% web.
      </p>
      <div className="flex gap-3 justify-center">
        <Link href="/meditations" className="btn btn-primary">{t("explore_meditations")}</Link>
        <Link href="/plans" className="btn btn-outline">{t("build_plan")}</Link>
      </div>
    </section>
  );
}

function Dubai() {
  const { t } = useLang();
  return (
    <section className="text-center">
      <h2>{t("built_for_dubai")}</h2>
      <p className="opacity-80 max-w-3xl mx-auto mt-3">
        Ramadan‑friendly routines, Arabic‑English resources, and corporate wellness options.
      </p>
    </section>
  );
}
