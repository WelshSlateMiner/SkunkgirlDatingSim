import { useEffect, useState } from "react";
import { useCompanion } from "@/lib/companion/store";
import { cn } from "@/lib/utils";

const SPLATS = [
  { left: "2%", top: "0%", w: 280, h: 200, clip: "polygon(48% 4%, 70% 0%, 86% 14%, 78% 28%, 98% 34%, 84% 52%, 96% 74%, 70% 68%, 62% 92%, 40% 78%, 28% 98%, 12% 76%, 0% 54%, 14% 36%, 4% 16%, 26% 12%)" },
  { left: "28%", top: "-4%", w: 340, h: 220, clip: "polygon(40% 0%, 62% 6%, 78% 2%, 92% 22%, 74% 30%, 100% 48%, 82% 58%, 90% 86%, 64% 74%, 52% 100%, 30% 80%, 22% 96%, 6% 70%, 0% 42%, 16% 28%, 8% 8%)" },
  { left: "58%", top: "2%", w: 260, h: 190, clip: "polygon(36% 8%, 58% 0%, 80% 12%, 70% 26%, 96% 32%, 78% 48%, 92% 72%, 60% 64%, 54% 94%, 28% 76%, 16% 90%, 4% 62%, 0% 38%, 18% 24%, 8% 10%)" },
  { left: "8%", top: "22%", w: 360, h: 240, clip: "polygon(44% 2%, 66% 8%, 84% 0%, 96% 24%, 78% 34%, 100% 52%, 80% 62%, 88% 90%, 58% 74%, 46% 100%, 24% 82%, 14% 96%, 0% 68%, 8% 44%, 0% 22%, 22% 16%)" },
  { left: "48%", top: "18%", w: 320, h: 260, clip: "polygon(30% 6%, 52% 0%, 74% 10%, 66% 24%, 92% 20%, 100% 46%, 78% 42%, 88% 70%, 64% 62%, 70% 96%, 42% 78%, 34% 100%, 12% 74%, 0% 48%, 16% 36%, 6% 14%)" },
  { left: "0%", top: "46%", w: 240, h: 180, clip: "polygon(42% 8%, 68% 0%, 90% 18%, 76% 32%, 98% 48%, 74% 58%, 86% 88%, 52% 72%, 40% 98%, 18% 76%, 4% 84%, 0% 52%, 14% 34%, 6% 12%)" },
  { left: "32%", top: "40%", w: 380, h: 250, clip: "polygon(38% 0%, 60% 8%, 82% 2%, 94% 26%, 76% 34%, 100% 56%, 82% 66%, 90% 94%, 62% 78%, 50% 100%, 28% 84%, 18% 96%, 2% 70%, 10% 46%, 0% 24%, 24% 14%)" },
  { left: "70%", top: "38%", w: 220, h: 200, clip: "polygon(46% 6%, 72% 0%, 94% 20%, 80% 34%, 100% 58%, 74% 52%, 86% 86%, 54% 70%, 48% 98%, 22% 78%, 8% 88%, 0% 56%, 16% 32%, 4% 14%)" },
  { left: "6%", top: "64%", w: 300, h: 200, clip: "polygon(34% 4%, 58% 0%, 80% 16%, 68% 28%, 96% 36%, 78% 54%, 90% 84%, 58% 68%, 50% 100%, 24% 80%, 10% 94%, 0% 64%, 12% 40%, 2% 18%, 22% 12%)" },
  { left: "40%", top: "66%", w: 340, h: 210, clip: "polygon(40% 2%, 64% 10%, 86% 0%, 98% 28%, 76% 36%, 100% 60%, 80% 70%, 86% 98%, 56% 80%, 44% 100%, 20% 78%, 8% 90%, 0% 58%, 14% 36%, 4% 16%)" },
];

const DROPS = [
  { left: "18%", top: "14%", s: 18 },
  { left: "74%", top: "12%", s: 12 },
  { left: "88%", top: "28%", s: 22 },
  { left: "12%", top: "40%", s: 14 },
  { left: "92%", top: "58%", s: 16 },
  { left: "24%", top: "72%", s: 20 },
  { left: "64%", top: "84%", s: 14 },
  { left: "46%", top: "8%", s: 10 },
  { left: "6%", top: "88%", s: 16 },
  { left: "80%", top: "76%", s: 11 },
];

/** Oily ink on the lens. The pose stays clear, then the spray hits the glass and drips off. */
export function LensCoat() {
  const pulse = useCompanion((s) => s.fxPulse);
  const spray = pulse.kind === "spray" || pulse.otherKind === "spray";
  const [phase, setPhase] = useState<"off" | "coat" | "drip">("off");

  useEffect(() => {
    if (!spray) return;
    setPhase("off");
    const hit = window.setTimeout(() => setPhase("coat"), 1300);
    const drip = window.setTimeout(() => setPhase("drip"), 2300);
    const done = window.setTimeout(() => setPhase("off"), 5200);
    return () => {
      window.clearTimeout(hit);
      window.clearTimeout(drip);
      window.clearTimeout(done);
    };
  }, [pulse.key, spray]);

  if (phase === "off") return null;

  return (
    <div className={cn("lens-coat", phase === "drip" && "lens-drip")} aria-hidden>
      <div className="lens-film" />
      {SPLATS.map((blob) => (
        <span
          key={`${blob.left}-${blob.top}`}
          className="lens-blob"
          style={{
            left: blob.left,
            top: blob.top,
            width: blob.w,
            height: blob.h,
            clipPath: blob.clip,
          }}
        />
      ))}
      {DROPS.map((drop) => (
        <span
          key={`${drop.left}-${drop.top}`}
          className="lens-drop"
          style={{ left: drop.left, top: drop.top, width: drop.s, height: drop.s }}
        />
      ))}
      <span className="lens-streak lens-streak-a" />
      <span className="lens-streak lens-streak-b" />
      <span className="lens-streak lens-streak-c" />
      <span className="lens-streak lens-streak-d" />
    </div>
  );
}
