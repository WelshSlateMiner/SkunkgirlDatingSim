import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { canSleepNow } from "@/lib/companion/locations";
import { dateIsDue } from "@/lib/companion/outing";
import { useCompanion } from "@/lib/companion/store";

export function SleepButton() {
  const [open, setOpen] = useState(false);
  const location = useCompanion((s) => s.location);
  const timeOfDay = useCompanion((s) => s.timeOfDay);
  const phase = useCompanion((s) => s.dayPhase);
  const busy = useCompanion((s) => s.busy);
  const sprayed = useCompanion((s) => s.sprayed);
  const due = useCompanion((s) => Boolean(dateIsDue(s) || s.dateDraft || s.dateReview));
  const sleep = useCompanion((s) => s.sleep);
  const ready = phase === "playing" && canSleepNow(location, timeOfDay) && !busy && !sprayed && !due;
  const why = ready
    ? ""
    : phase !== "playing"
      ? "Not right now."
      : timeOfDay === "Morning" || timeOfDay === "Afternoon"
        ? "Sleep is from Evening on."
        : "Sleep is only at your apartment, Izzy's dorm, Vicky's bedroom, or Ronnie's dorm.";

  const sheet = open ? (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3">
      <div className="mb-8 w-full max-w-sm rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between gap-3">
          <p className="font-display text-lg text-fg">Sleep</p>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
            <X />
          </Button>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Sleeping will open a Day Recap window and progress time to the next Morning, while removing some Stink Level.
        </p>
        <Button
          className="mt-4 w-full"
          onClick={() => {
            sleep();
            setOpen(false);
          }}
        >
          Sleep
        </Button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        disabled={!ready}
        onClick={() => setOpen(true)}
        aria-label="Sleep"
        title={ready ? "Sleep" : why}
      >
        <span className="font-display text-[13px] leading-none tracking-tight">Zzz</span>
      </Button>
      {typeof document !== "undefined" && sheet ? createPortal(sheet, document.body) : null}
    </>
  );
}