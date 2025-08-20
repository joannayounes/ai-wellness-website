"use client";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type Lang = "en" | "ar";
type Dict = Record<string, { en: string; ar: string }>;

const dict: Dict = {
  brand: { en: "CalmClick", ar: "كالم كليك" },
  home_hero: { en: "Your AI‑powered wellness coach — in Arabic & English, just a click away.", ar: "مدرّب الرفاهية المدعوم بالذكاء الاصطناعي — بالعربية والإنجليزية، بنقرة واحدة فقط." },
  explore_meditations: { en: "Explore Meditations", ar: "استكشف التأملات" },
  build_plan: { en: "Build Your Plan", ar: "أنشئ خطتك" },
  built_for_dubai: { en: "Built for Dubai — culturally aware & bilingual", ar: "مصمم لدبي — واعٍ ثقافياً وباللغتين" },
  nav_home: { en: "Home", ar: "الرئيسية" },
  nav_meditations: { en: "Meditations", ar: "تأملات" },
  nav_plans: { en: "Wellness Plans", ar: "الخطط" },
  nav_shop: { en: "Shop", ar: "المتجر" },
  nav_corporate: { en: "Corporate", ar: "الشركات" },
  lang: { en: "العربية", ar: "English" }
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang)=>void; t:(k:keyof typeof dict)=>string }|null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang) || "en" : "en"));
  useEffect(() => {
    localStorage.setItem("lang", lang);
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", lang);
      document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    }
  }, [lang]);

  const t = (k: keyof typeof dict) => dict[k]?.[lang] ?? k;
  const value = useMemo(()=>({ lang, setLang, t }), [lang]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
