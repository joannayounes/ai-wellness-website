"use client";
import React, { useEffect, useState } from "react";

const products = [
  { id: "gratitude", title: "Gratitude Journal (EN/AR)", price: 49, desc: "30 printable pages to build a daily gratitude habit." },
  { id: "stress", title: "Stress & Mood Tracker", price: 59, desc: "Identify triggers and track your mood over time." },
  { id: "ramadan", title: "Ramadan Reflection Journal", price: 69, desc: "Mindful reflections and balanced routines for the holy month." },
  { id: "workplace", title: "Workplace Wellness Kit", price: 79, desc: "Desk stretches, mini breaks, and mindfulness tips." },
];

export default function Page() {
  const [loading, setLoading] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const e = localStorage.getItem("email") || "";
    setEmail(e);
  }, []);

  const checkout = async (productId: string) => {
    if (!email) { alert("Please enter your email to receive your download."); return; }
    localStorage.setItem("email", email);
    setLoading(productId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, email })
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Checkout error: " + (data.error || "unknown"));
    } catch (e:any) {
      alert("Checkout failed.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="space-y-6">
      <h1>Printable Workbooks & Trackers</h1>
      <div className="card">
        <label className="text-sm">Email for receipt & access
          <input className="w-full mt-1 rounded-xl border border-black/20 px-3 py-2" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </label>
        <p className="text-xs opacity-70 mt-1">Use the same email to sign in and download from your dashboard.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {products.map(p => (
          <div key={p.id} className="card">
            <h3>{p.title}</h3>
            <p className="opacity-80 text-sm mt-2">{p.desc}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="font-semibold">{p.price} AED</span>
              <button onClick={()=>checkout(p.id)} className="btn btn-primary" disabled={loading===p.id}>
                {loading===p.id ? "..." : "Buy now"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-sm opacity-70">After payment, sign in via <a className="underline" href="/login">magic link</a> and download from your <a className="underline" href="/dashboard">dashboard</a>.</p>
    </div>
  );
}
