"use client";
import React, { useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [devLink, setDevLink] = useState<string | null>(null);

  const submit = async () => {
    setMsg(null); setDevLink(null);
    const res = await fetch("/api/auth/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (data.ok) {
      setMsg("Check your email for the magic link.");
      if (data.devLink) setDevLink(data.devLink);
    } else {
      setMsg(data.error || "Failed to send link.");
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-4">
      <h1>Sign in</h1>
      <p className="opacity-80">Enter your email and we’ll send you a magic link.</p>
      <input className="w-full rounded-xl border border-black/20 px-3 py-2" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
      <button className="btn btn-primary w-full" onClick={submit}>Send magic link</button>
      {msg && <p className="text-sm">{msg}</p>}
      {devLink && <p className="text-xs break-all">Dev link: <a className="underline" href={devLink}>{devLink}</a></p>}
    </div>
  );
}
