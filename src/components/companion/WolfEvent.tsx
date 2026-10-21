import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { sceneNames } from "@/lib/companion/scene";
import { useCompanion } from "@/lib/companion/store";
import type { SkunkChoice } from "@/lib/companion/events";
import { cn } from "@/lib/utils";

const WOLF_SRC = {
  snarl: "/art/events/wolf-snarl.png",
  sprayed: "/art/events/wolf-sprayed.png",
} as const;

/** The wolf stands on the right. Sprayed, it holds, then slides off. A retreat leaves immediately. */
export function WolfSprite() {
  const incident = useCompanion((s) => s.incident);
  const settle = useCompanion((s) => s.settleWolf);
  const wolf = incident?.wolf;
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!incident || wolf === "off" || !wolf) {
      setLeaving(false);
      return;
    }
    if (wolf === "snarl") {
      setLeaving(false);
      return;
    }
    if (wolf === "retreat") {
      setLeaving(true);
      const gone = window.setTimeout(() => settle(), 700);
      return () => window.clearTimeout(gone);
    }
    setLeaving(false);
    const hold = window.setTimeout(() => setLeaving(true), 3000);
    const gone = window.setTimeout(() => settle(), 3700);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(gone);
    };
  }, [incident, wolf, settle]);

  if (!incident || !wolf || wolf === "off") return null;
  const src = wolf === "sprayed" ? WOLF_SRC.sprayed : WOLF_SRC.snarl;

  return (
    <img
      src={src}
      alt=""
      className={cn(
        "pointer-events-none absolute bottom-0 right-0 z-20 h-[min(62dvh,760px)] w-auto max-w-[46vw] object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)] wolf-enter",
        leaving && "wolf-leave",
      )}
    />
  );
}

const CHOICES: [SkunkChoice, string][] = [
  ["disgusted", "Be Disgusted"],
  ["understanding", "Be Understanding"],
  ["aroused", "Be Aroused"],
];

/** Heat of the moment. She hit the wolf, and she hit you. Not the usual spray window. */
export function AccidentallySkunked() {
  const incident = useCompanion((s) => s.incident);
  const spotlight = useCompanion((s) => s.spraySpotlight);
  const answer = useCompanion((s) => s.answerSkunk);

  if (spotlight || incident?.phase !== "skunked" || !incident.sprayers.length) return null;
  const who = sceneNames(incident.sprayers);
  const accident = incident.cause === "accident";
  const many = incident.sprayers.length > 1;

  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-end overflow-y-auto p-3 pb-4 sm:p-5 lg:max-w-[54%]">
      <div className="pointer-events-auto w-full rounded-xl border border-border bg-surface/92 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.4)] sm:p-6">
        <p className="font-display text-2xl tracking-tight text-fg text-balance">Accidentally Skunked</p>
        <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">
          {accident
            ? `${who} sprayed before ${many ? "they" : "she"} meant to. The cloud found you. Nobody was aiming at you — there wasn't time to pick a target. How do you take it?`
            : `${who} caught the wolf. The edge of it caught you. Nobody was aiming at you — it was the teeth, the spray, and no time to pick a target. How do you take it?`}
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          {CHOICES.map(([choice, label], index) => (
            <Button
              key={choice}
              variant={index === 0 ? "default" : "outline"}
              className="h-11 flex-1"
              onClick={() => answer(choice)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
