import { useState } from "react";
import { Button } from "@/components/ui/button";
import { girlName } from "@/lib/companion/cast";
import { giftById } from "@/lib/companion/gifts";
import { placeOf } from "@/lib/companion/locations";
import { datePlaces, slotOpen } from "@/lib/companion/outing";
import { useCompanion } from "@/lib/companion/store";
import { TIMES, WEEKDAYS } from "@/lib/companion/time";
import type { DateDraft, LocationId, TimeOfDay, Weekday } from "@/lib/companion/types";

function PlanForm({ draft }: { draft: DateDraft }) {
  const inventory = useCompanion((s) => s.inventory);
  const weekday = useCompanion((s) => s.weekday);
  const timeOfDay = useCompanion((s) => s.timeOfDay);
  const confirmDate = useCompanion((s) => s.confirmDate);
  const postponeDate = useCompanion((s) => s.postponeDate);
  const [time, setTime] = useState<TimeOfDay | "">(draft.time ?? "");
  const [place, setPlace] = useState<LocationId | "">(() => {
    const allowed = datePlaces(draft.nth, draft.girl);
    return draft.place && allowed.includes(draft.place) ? draft.place : "";
  });
  const [day, setDay] = useState<Weekday | "">(draft.day ?? "");
  const [giftId, setGiftId] = useState(draft.giftId ?? "");
  const places = datePlaces(draft.nth, draft.girl);
  const uniqueGifts = [...new Set(inventory)];
  const open = Boolean(time && place && day && slotOpen(weekday, timeOfDay, day, time));
  const late = Boolean(time && day && !slotOpen(weekday, timeOfDay, day, time));

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-3 sm:items-center">
      <div className="max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <p className="font-display text-xl text-fg">Plan the date</p>
        <p className="mt-1 text-sm text-muted">
          {girlName(draft.girl)} said yes. Date {draft.nth} needs a day, a time, and a place. A gift is welcome. It is not required.
          {draft.nth < 3 ? " Home isn't an option until the third date." : " Her home and your apartment are open."}
        </p>
        <label className="mt-4 block text-xs uppercase tracking-[0.14em] text-subtle">
          Day
          <select
            className="mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg"
            value={day}
            onChange={(e) => setDay(e.target.value as Weekday)}
          >
            <option value="">Choose</option>
            {WEEKDAYS.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-subtle">
          Time
          <select
            className="mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg"
            value={time}
            onChange={(e) => setTime(e.target.value as TimeOfDay)}
          >
            <option value="">Choose</option>
            {TIMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-subtle">
          Location
          <select
            className="mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg"
            value={place}
            onChange={(e) => setPlace(e.target.value as LocationId)}
          >
            <option value="">Choose</option>
            {places.map((id) => (
              <option key={id} value={id}>
                {placeOf(id).name}
              </option>
            ))}
          </select>
        </label>
        <label className="mt-3 block text-xs uppercase tracking-[0.14em] text-subtle">
          Gift
          <select
            className="mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg"
            value={giftId}
            onChange={(e) => setGiftId(e.target.value)}
          >
            <option value="">No gift</option>
            {uniqueGifts.map((id) => (
              <option key={id} value={id}>
                {giftById(id)?.name ?? id}
              </option>
            ))}
          </select>
        </label>
        {late ? <p className="mt-3 text-sm text-muted">That time has already passed today. Pick a later slot.</p> : null}
        <Button
          className="mt-4 w-full"
          disabled={!open}
          onClick={() => {
            if (!time || !place || !day) return;
            confirmDate({ time, place, day, giftId });
          }}
        >
          Set the date
        </Button>
        <Button className="mt-2 w-full" variant="outline" onClick={postponeDate}>
          Not yet
        </Button>
      </div>
    </div>
  );
}

export function DatePlanner() {
  const draft = useCompanion((s) => s.dateDraft);
  if (!draft) return null;
  return <PlanForm key={`${draft.girl}-${draft.nth}`} draft={draft} />;
}
