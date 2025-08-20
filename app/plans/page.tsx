import { PlanQuiz } from "../../components/PlanQuiz";

export default function Page() {
  return (
    <div className="space-y-6">
      <h1>Personalized Wellness Plans</h1>
      <p className="opacity-80">Take a 10‑second quiz and get a culturally‑aware routine for the next 30 days.</p>
      <PlanQuiz />
    </div>
  );
}
