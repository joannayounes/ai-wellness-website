"use client";
import React, { useState } from "react";

export function PlanQuiz() {
  const [goal, setGoal] = useState("stress");
  const [minutes, setMinutes] = useState(10);
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    setPlan(null);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal, minutes })
      });
      const data = await res.json();
      setPlan(data.plan);
    } catch (e) {
      setPlan("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h3 className="mb-3">Create your 30‑day plan</h3>
      <div className="grid md:grid-cols-3 gap-3">
        <label className="text-sm">
          Goal
          <select className="w-full mt-1 rounded-xl border border-black/20 px-3 py-2"
            value={goal} onChange={(e)=>setGoal(e.target.value)}>
            <option value="stress">Reduce Stress</option>
            <option value="sleep">Better Sleep</option>
            <option value="ramadan">Ramadan Balance</option>
            <option value="focus">Productivity & Focus</option>
          </select>
        </label>
        <label className="text-sm">
          Daily minutes
          <input type="number" min={5} max={30} step={5}
            className="w-full mt-1 rounded-xl border border-black/20 px-3 py-2"
            value={minutes} onChange={(e)=>setMinutes(parseInt(e.target.value)||10)} />
        </label>
        <div className="flex items-end">
          <button onClick={generate} className="btn btn-primary w-full">{loading?"Generating...":"Generate plan"}</button>
        </div>
      </div>
      {plan && (
        <div className="mt-4 whitespace-pre-wrap bg-white rounded-xl p-4 text-sm">
          {plan}
        </div>
      )}
    </div>
  );
}
