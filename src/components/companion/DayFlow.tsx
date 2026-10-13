import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { TurnControls } from "@/components/companion/ChatComposer";
import { girlName, morningSpots, otherGirl } from "@/lib/companion/cast";
import { placeOf } from "@/lib/companion/locations";
import { useCompanion } from "@/lib/companion/store";
import type { LocationId } from "@/lib/companion/types";

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex items-end justify-center p-4 sm:items-center">
      <div className="pointer-events-auto w-full max-w-md rounded-xl border border-border bg-surface/95 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
        {children}
      </div>
    </div>
  );
}

export function DayFlow() {
  const phase = useCompanion((s) => s.dayPhase);
  const trust = useCompanion((s) => s.trust);
  const bonding = useCompanion((s) => s.bonding);
  const startTrust = useCompanion((s) => s.dayStartTrust);
  const startBond = useCompanion((s) => s.dayStartBonding);
  const farts = useCompanion((s) => s.dayFarts);
  const sprays = useCompanion((s) => s.daySprays);
  const topics = useCompanion((s) => s.dayTopics);
  const planPlace = useCompanion((s) => s.planPlace);
  const planTime = useCompanion((s) => s.planTime);
  const planGirl = useCompanion((s) => s.planGirl);
  const focus = useCompanion((s) => s.focus);
  const accepted = useCompanion((s) => s.planAccepted);
  const meetKind = useCompanion((s) => s.meetKind);
  const queued = useCompanion((s) => s.queuedMeet);
  const wake = useCompanion((s) => s.wake);
  const confirmMeet = useCompanion((s) => s.confirmMeet);
  const beginMorning = useCompanion((s) => s.beginMorning);
  const resolveHandoff = useCompanion((s) => s.resolveHandoff);

  if (phase === "summary") {
    const trustDelta = trust - startTrust;
    const bondDelta = bonding - startBond;
    const sprayBits = [
      sprays.angry ? `${sprays.angry} angry` : "",
      sprays.defensive ? `${sprays.defensive} defensive` : "",
      sprays.consensual ? `${sprays.consensual} intimate` : "",
      sprays.dominant ? `${sprays.dominant} dominant` : "",
    ].filter(Boolean);
    const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);
    const who = girlName(focus ?? "izzy");
    return (
      <Card>
        <p className="font-display text-2xl text-fg">Today</p>
        <p className="mt-2 text-sm text-muted">
          {who}: Trust {sign(trustDelta)} · Bonding {sign(bondDelta)}
        </p>
        <p className="mt-3 text-sm text-fg">
          {topics.length ? `You talked about ${topics.join(", ")}.` : "Not much got said out loud."}
        </p>
        <p className="mt-2 text-sm text-fg">
          {who} farted {farts} time{farts === 1 ? "" : "s"}.
          {sprayBits.length ? ` Sprays: ${sprayBits.join(", ")}.` : " No sprays."}
        </p>
        <Button className="mt-5 w-full" onClick={wake}>
          Continue
        </Button>
      </Card>
    );
  }

  if (phase === "morning") {
    const scheduled = planGirl ?? focus ?? "izzy";
    const other = otherGirl(scheduled);
    const spots = morningSpots(other, planPlace);
    const choices: LocationId[] = spots.length ? spots : ["library"];
    const where = planPlace ? placeOf(planPlace).name : "the plan";
    return (
      <Card>
        <p className="font-display text-2xl text-fg">Morning</p>
        <p className="mt-2 text-sm leading-relaxed text-fg">
          You wake up before {planTime ?? "later"}, when you're meant to meet {girlName(scheduled)} at {where}.
          These places are likely to have {girlName(other)}.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-2">
          {choices.map((id) => (
            <Button key={id} variant="outline" className="justify-start" onClick={() => beginMorning(id)}>
              {placeOf(id).name}
            </Button>
          ))}
        </div>
      </Card>
    );
  }

  if (phase === "handoff") {
    const detour = focus ?? "izzy";
    const host = planGirl ?? otherGirl(detour);
    const where = placeOf(planPlace ?? "library");
    return (
      <Card>
        <p className="font-display text-2xl text-fg">{planTime ?? "Now"}</p>
        <p className="mt-2 text-sm leading-relaxed text-fg">
          It's time to meet {girlName(host)} at {where.name}. You can make a later plan with {girlName(detour)}
          before you go. Planning one raises Bonding with her. Leaving it open lowers it.
        </p>
        <Button className="mt-4 w-full" onClick={() => resolveHandoff(true)}>
          Plan to see {girlName(detour)} later
        </Button>
        <Button className="mt-2 w-full" variant="outline" onClick={() => resolveHandoff(false)}>
          Don't make another plan
        </Button>
      </Card>
    );
  }

  if (phase !== "meet") return null;
  const host = meetKind === "queue" ? (queued?.girl ?? planGirl ?? focus ?? "izzy") : (planGirl ?? focus ?? "izzy");
  const dest = meetKind === "queue" ? (queued?.place ?? planPlace) : planPlace;
  const where = placeOf(dest ?? "library");
  return (
    <Card>
      <p className="text-sm leading-relaxed text-fg">
        {accepted || meetKind === "queue"
          ? `Travel to ${where.name} to meet ${girlName(host)}.`
          : `${girlName(host)} didn't agree to meet. Go to ${where.name} anyway.`}
      </p>
      <Button className="mt-4 w-full" onClick={confirmMeet}>
        OK
      </Button>
      <TurnControls className="mt-3" />
    </Card>
  );
}
