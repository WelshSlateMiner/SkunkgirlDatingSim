import { Timer, X } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { dateIsDue } from "@/lib/companion/outing";
import { useCompanion } from "@/lib/companion/store";

export function PassTime() {
  const [open, setOpen] = useState(false);
  const location = useCompanion((s) => s.location);
  const timeOfDay = useCompanion((s) => s.timeOfDay);
  const workedToday = useCompanion((s) => s.workedToday);
  const phase = useCompanion((s) => s.dayPhase);
  const due = useCompanion((s) => dateIsDue(s));
  const goToWork = useCompanion((s) => s.goToWork);
  const readTime = useCompanion((s) => s.readTime);
  const studyTime = useCompanion((s) => s.studyTime);
  const home = location === "apartment";
  const slot = timeOfDay === "Morning" || timeOfDay === "Afternoon" || timeOfDay === "Evening";
  const playing = phase === "playing" && !due;
  const ready = home && slot && !workedToday && playing;
  const reason = !playing
    ? "Not while something else is waiting."
    : !home
      ? "You have to travel to the Apartment first."
      : !slot
        ? "You can only go to work in the Morning, Afternoon, or Evening."
        : workedToday
          ? "You already worked today."
          : "";
  const canRead = playing && location === "library" && timeOfDay !== "Night";
  const canStudy = playing && location === "studyHall" && timeOfDay !== "Night";
  const readReason = !playing
    ? "Not while something else is waiting."
    : location !== "library"
      ? "Reading is at the Campus Library."
      : timeOfDay === "Night"
        ? "The library is closed."
        : "";
  const studyReason = !playing
    ? "Not while something else is waiting."
    : location !== "studyHall"
      ? "Studying is at the Study Hall."
      : timeOfDay === "Night"
        ? "The study hall is closed."
        : "";

  const sheet = open ? (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3">
      <div className="mb-8 w-full max-w-sm rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-lg text-fg">Time Skips And Work</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Go to Work skips ahead from your apartment and banks $20. Once a day. Not at night. Reading and Studying each move the clock one period, and you can do them again.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
            <X />
          </Button>
        </div>
        <Button
          className="mt-4 w-full"
          disabled={!ready}
          onClick={() => {
            goToWork();
            setOpen(false);
          }}
        >
          Go to Work
        </Button>
        {reason ? <p className="mt-2 text-sm text-red-400">{reason}</p> : null}
        <Button
          className="mt-3 w-full"
          variant="outline"
          disabled={!canRead}
          onClick={() => {
            readTime();
            setOpen(false);
          }}
        >
          Reading
        </Button>
        {readReason ? <p className="mt-2 text-sm text-muted">{readReason}</p> : null}
        <Button
          className="mt-3 w-full"
          variant="outline"
          disabled={!canStudy}
          onClick={() => {
            studyTime();
            setOpen(false);
          }}
        >
          Studying
        </Button>
        {studyReason ? <p className="mt-2 text-sm text-muted">{studyReason}</p> : null}
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Time Skips And Work" title="Time Skips And Work">
        <Timer />
      </Button>
      {typeof document !== "undefined" && sheet ? createPortal(sheet, document.body) : null}
    </>
  );
}