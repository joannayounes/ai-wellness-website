import { AudioCard } from "../../components/AudioCard";

const items = [
  { title: "Stress Relief (Calm Breath)", minutes: 10, src: "/audio/sample.mp3" },
  { title: "Better Sleep (Body Scan)", minutes: 15, src: "/audio/sample.mp3" },
  { title: "Morning Affirmations", minutes: 5, src: "/audio/sample.mp3" },
  { title: "Ramadan Mindfulness", minutes: 12, src: "/audio/sample.mp3" },
];

export default function Page() {
  return (
    <div className="space-y-6">
      <h1>Guided Meditations</h1>
      <p className="opacity-80">New tracks are added every month. Below is also a live demo that uses AI to generate audio on the fly.</p>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((i, idx) => <AudioCard key={idx} {...i} />)}
        <AudioCard title="Live Demo: Arabic Sleep Intro" minutes={1} text="مرحباً بك. خذ نفساً عميقاً ببطء، ودع كتفيك يسترخيَان. سنبدأ الآن رحلة قصيرة نحو نوم هادئ." />
      </div>
    </div>
  );
}
