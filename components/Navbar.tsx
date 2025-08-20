"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import classNames from "classnames";
import { useLang } from "./LanguageProvider";

const routes = [
  { href: "/", key: "nav_home" },
  { href: "/meditations", key: "nav_meditations" },
  { href: "/plans", key: "nav_plans" },
  { href: "/shop", key: "nav_shop" },
  { href: "/corporate", key: "nav_corporate" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { t, lang, setLang } = useLang();
  const toggleLang = () => setLang(lang === "en" ? "ar" : "en");
  return (
    <header className="border-b border-black/10 bg-white/60 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <Link href="/" className="font-bold text-lg">{t("brand")}</Link>
        <nav className="flex items-center gap-4">
          {routes.map(r => (
            <Link key={r.href} href={r.href} className={classNames("text-sm md:text-base px-2 py-1 rounded",
              pathname === r.href ? "bg-ink text-white" : "hover:underline")}>
              {t(r.key as any)}
            </Link>
          ))}
          <button onClick={toggleLang} className="btn btn-outline text-xs md:text-sm">{t("lang")}</button>
        </nav>
      </div>
    </header>
  );
}
