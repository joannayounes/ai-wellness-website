"use client";
import React, { useRef, useState } from "react";

export function AudioCard({ title, minutes, src, text }: { title: string; minutes: number; src?: string; text?: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      if (!res.ok) throw new Error("TTS failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    } catch (e) {
      alert("Audio generation failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="mb-1">{title}</h3>
          <p className="text-sm opacity-70">{minutes} min</p>
        </div>
        {!src && text && (
          <button onClick={generate} className="btn btn-outline text-xs">
            {loading ? "Generating..." : "Generate audio"}
          </button>
        )}
      </div>
      <audio ref={audioRef} controls className="mt-3 w-full">
        {src ? <source src={src} type="audio/mpeg" /> : null}
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
