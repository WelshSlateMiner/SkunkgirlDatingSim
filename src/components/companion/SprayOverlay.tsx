import { useState } from "react";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TurnControls } from "@/components/companion/ChatComposer";
import { girlName } from "@/lib/companion/cast";
import { useCompanion } from "@/lib/companion/store";
import type { GirlId, SprayChoice, SprayPrompt } from "@/lib/companion/types";
import { cn } from "@/lib/utils";

function copyFor(prompt: SprayPrompt) {
  const name = girlName(prompt.girl);
  const vicky = prompt.girl === "victoria";
  if (prompt.kind === "dominant") {
    return {
      title: `${name}'s got you.`,
      compact: `${name}. Dominant spray. Submit or resist.`,
      body: vicky
        ? `${name} has her skirt up in both hands and her tail aimed, and the look on her face is not a question. The spray is a leash. She wants to know if you'll take it.`
        : `${name} has her bottoms down and her tail up, and the look on her face is not a question. The spray is a leash. She wants to know if you'll take it.`,
    };
  }
  if (prompt.kind === "consensual") {
    return {
      title: `${name} marked you.`,
      compact: `${name} sprayed you. On purpose. Together.`,
      body: vicky
        ? `${name} turned, skirt lifted, tail high, and let it go because you asked for the real her. The musk is chemical, sweet, and intimate. This is not a fight. How do you meet it?`
        : `${name} turned, tail high, and let it go because you asked for the real her. The musk is chemical, sweet, and intimate. This is not a fight. How do you meet it?`,
    };
  }
  if (prompt.kind === "defensive") {
    return {
      title: `${name} sprayed you. Scared.`,
      compact: `${name}. Defensive spray. She thought you were a threat.`,
      body: `${name} warned you, or she didn't have time. The spray was fear, not a game. You can give in to it, or you can find out you wanted it.`,
    };
  }
  return {
    title: `${name} sprayed you.`,
    compact: `${name} sprayed you.`,
    body: vicky
      ? `${name} turned, skirt up, tail aimed, and emptied the magazine. The musk is chemical, sweet, and absolutely personal. You can wait it out and try to make this right — or walk away for good.`
      : `${name} turned, tail up, and emptied the magazine. The musk is chemical, sweet, and absolutely personal. You can wait it out and try to make this right — or walk away for good.`,
  };
}

function choicesFor(kind: SprayPrompt["kind"]): [SprayChoice, string][] {
  if (kind === "dominant") return [["submit", "Submit"], ["resist", "Resist"]];
  if (kind === "consensual") return [["embrace", "Embrace it"], ["overwhelm", "Become overwhelmed"]];
  if (kind === "defensive") return [["surrender", "Surrender"], ["aroused", "Be aroused"]];
  return [["apologize", "Stay and apologize"], ["reset", "Start over"]];
}

function SprayCard({ prompt, stacked }: { prompt: SprayPrompt; stacked: boolean }) {
  const dismiss = useCompanion((s) => s.dismissSpray);
  const [compact, setCompact] = useState(stacked);
  const text = copyFor(prompt);
  const choices = choicesFor(prompt.kind);
  return (
    <div
      className={cn(
        "pointer-events-auto w-full rounded-xl border border-border bg-surface/92 shadow-[0_16px_50px_rgba(0,0,0,0.4)]",
        compact ? "px-3 py-2" : "p-5 sm:p-6",
      )}
    >
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          {compact ? (
            <p className="line-clamp-2 text-sm text-fg">{text.compact}</p>
          ) : (
            <>
              <p className="font-display text-2xl tracking-tight text-fg text-balance">{text.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted text-pretty">{text.body}</p>
            </>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 shrink-0 gap-1 px-2 text-xs text-muted"
          onClick={() => setCompact((v) => !v)}
          aria-label={compact ? `Expand ${girlName(prompt.girl)}'s spray reaction` : `Minimize ${girlName(prompt.girl)}'s spray reaction`}
          aria-pressed={compact}
        >
          {compact ? <ChevronsUpDown /> : <ChevronsDownUp />}
          <span>{compact ? "Expand" : "Minimize"}</span>
        </Button>
      </div>
      <div className={cn("flex gap-2", compact ? "mt-2" : "mt-5 flex-col sm:flex-row")}>
        {choices.map(([mode, label], index) => (
          <Button
            key={mode}
            variant={index === 0 ? "default" : "outline"}
            className={compact ? "h-9 flex-1 text-xs" : "flex-1"}
            onClick={() => dismiss(mode, prompt.girl)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

export function SprayOverlay() {
  const sprayed = useCompanion((s) => s.sprayed);
  const spotlight = useCompanion((s) => s.spraySpotlight);
  const kind = useCompanion((s) => s.sprayKind);
  const focus = useCompanion((s) => (s.focus ?? "izzy") as GirlId);
  const stored = useCompanion((s) => s.sprayPrompts);

  if (spotlight) return null;
  const prompts: SprayPrompt[] =
    stored?.length
      ? stored
      : sprayed && kind !== "none"
        ? [{ girl: focus, kind }]
        : [];
  if (!prompts.length) return null;
  const stacked = prompts.length > 1;

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-end overflow-y-auto p-3 pb-4 sm:p-5 lg:max-w-[54%]">
      <div className="flex w-full flex-col gap-2">
        {stacked ? (
          <p className="pointer-events-none text-xs text-cream/80">Answer each of them. You can't talk until both are chosen.</p>
        ) : null}
        {prompts.map((prompt) => (
          <SprayCard key={prompt.girl} prompt={prompt} stacked={stacked} />
        ))}
        <div className="pointer-events-auto">
          <TurnControls />
        </div>
      </div>
    </div>
  );
}
