import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HowToPlay } from "@/components/companion/HowToPlay";
import { ChatLogLibrary } from "@/components/companion/ChatLogLibrary";
import { unlockAudio } from "@/lib/companion/audio";
import { FIRST_MEETS, LOCATIONS } from "@/lib/companion/locations";
import { useCompanion } from "@/lib/companion/store";
import type { GameMode, LocationId, PlayerFartRole, PlayerGender, RelationshipType } from "@/lib/companion/types";
import { cn } from "@/lib/utils";

const MEET_HOOK: Record<string, string> = {
  library: "Even odds. Design books, or the history aisle.",
  studyHall: "Usually a student. Sometimes a woman studying for a promotion.",
  trail: "Izzy knows these woods. Victoria only comes here to stop holding it in.",
  animeStore: "Neko Shelf is Izzy's. Victoria is rarely here, and only for her daughter.",
  craftStore: "Fabric and frames. This is Victoria's store. Izzy almost never walks in.",
};

export function StartScreen() {
  const start = useCompanion((s) => s.start);
  const hydrated = useCompanion((s) => s.hydrated);
  const hasSave = useCompanion((s) => Boolean(s.playerName && s.messages.length));
  const resume = useCompanion((s) => s.resume);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<PlayerGender | null>(null);
  const [fartRole, setFartRole] = useState<PlayerFartRole | null>(null);
  const [mode, setMode] = useState<GameMode | null>(null);
  const [rel, setRel] = useState<RelationshipType | null>(null);
  const [meet, setMeet] = useState<LocationId>("library");

  const ready =
    Boolean(name.trim()) && gender !== null && fartRole !== null && mode !== null && rel !== null && hydrated;
  const place = LOCATIONS[meet];

  return (
    <div className="relative min-h-dvh overflow-hidden bg-bg text-fg">
      <img
        src={place.image}
        alt=""
        className="absolute inset-0 size-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/25" />
      <div className="relative z-10 mx-auto flex min-h-dvh max-w-xl flex-col justify-end px-5 pb-24 pt-16 sm:justify-center sm:pb-28">
        <p className="text-[11px] uppercase tracking-[0.22em] text-cream/70">
          A skunkgirl dating sim
        </p>
        <h1 className="mt-3 font-display text-6xl leading-none tracking-tight text-cream text-balance sm:text-7xl">
          Skunkgirls
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/80 text-pretty sm:text-base">
          {MEET_HOOK[meet] ?? "Someone is already here."} You don't get to choose which of them you find first.
        </p>
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!ready) return;
            unlockAudio();
            start(name, meet, gender ?? "male", fartRole ?? "into", mode ?? "casual", rel ?? "mono");
          }}
        >
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-[0.16em] text-subtle">You are:</span>
            {(
              [
                ["male", "Male"],
                ["female", "Female"],
              ] as const
            ).map(([id, label]) => {
              const on = gender === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setGender(id)}
                  aria-pressed={on}
                  className={cn(
                    "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                    on
                      ? "border-cream/70 bg-cream/15 text-cream"
                      : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-[0.16em] text-subtle">
              What Role Will You Play? You Are:
            </span>
            {(
              [
                ["into", "Into Farts"],
                ["not", "Not Into Farts"],
              ] as const
            ).map(([id, label]) => {
              const on = fartRole === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setFartRole(id)}
                  aria-pressed={on}
                  className={cn(
                    "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                    on
                      ? "border-cream/70 bg-cream/15 text-cream"
                      : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-[0.16em] text-subtle">Gamemode:</span>
            {(
              [
                ["slow", "Slow Romance"],
                ["casual", "Casual"],
              ] as const
            ).map(([id, label]) => {
              const on = mode === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setMode(id)}
                  aria-pressed={on}
                  className={cn(
                    "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                    on
                      ? "border-cream/70 bg-cream/15 text-cream"
                      : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-[0.16em] text-subtle">Relationship Type:</span>
            {(
              [
                ["mono", "Monogamous"],
                ["harem", "Skunkgirl Harem"],
              ] as const
            ).map(([id, label]) => {
              const on = rel === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setRel(id)}
                  aria-pressed={on}
                  className={cn(
                    "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                    on
                      ? "border-cream/70 bg-cream/15 text-cream"
                      : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60",
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <label className="block text-xs uppercase tracking-[0.16em] text-subtle">
            What should she call you?
            <Input
              className="mt-2 bg-bg/50"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              autoComplete="off"
              autoFocus
              name="player-name"
              maxLength={40}
              disabled={!hydrated}
            />
          </label>
          <fieldset>
            <legend className="text-xs uppercase tracking-[0.16em] text-subtle">
              Where do you start?
            </legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {FIRST_MEETS.map((id) => {
                const loc = LOCATIONS[id];
                const on = meet === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setMeet(id)}
                    aria-pressed={on}
                    className={cn(
                      "rounded-md border px-3 py-2 text-left transition-colors",
                      on
                        ? "border-cream/70 bg-cream/15 text-cream"
                        : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60",
                    )}
                  >
                    <span className="block text-sm font-medium">{loc.name}</span>
                    <span className="mt-0.5 block text-[11px] leading-snug text-cream/65">
                      {loc.blurb}
                    </span>
                  </button>
                );
              })}
            </div>
          </fieldset>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button type="submit" variant="cream" className="flex-1" disabled={!ready}>
              Meet her
            </Button>
            {hasSave ? (
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => {
                  unlockAudio();
                  resume();
                }}
              >
                Continue
              </Button>
            ) : null}
          </div>
          <div className="flex items-center gap-4 pt-1">
            <HowToPlay tone="title" />
            <ChatLogLibrary />
          </div>
        </form>
      </div>
    </div>
  );
}
