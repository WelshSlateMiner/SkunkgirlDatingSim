import { MapPin, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { GIRLS, girlName } from "@/lib/companion/cast";
import { LOCATION_GROUPS, LOCATIONS, openTonight } from "@/lib/companion/locations";
import { girlAt, playerAlone } from "@/lib/companion/outing";
import { inviteToken } from "@/lib/companion/parse-input";
import { useCompanion } from "@/lib/companion/store";
import type { LocationId } from "@/lib/companion/types";
import { cn } from "@/lib/utils";

export function LocationSheet() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState<LocationId | null>(null);
  const current = useCompanion((s) => s.location);
  const insertDraft = useCompanion((s) => s.insertDraft);
  const goAlone = useCompanion((s) => s.goAlone);
  const depart = useCompanion((s) => s.depart);
  const present = useCompanion((s) => s.present);
  const izzyHere = useCompanion((s) => s.izzyHere);
  const game = useCompanion();
  const timeOfDay = useCompanion((s) => s.timeOfDay);
  const showPlaces = useCompanion((s) => s.showPlaces);
  const dismissPlaces = useCompanion((s) => s.dismissPlaces);
  const locations = Object.values(LOCATIONS);
  const alone = playerAlone({ izzyHere, present });
  const night = timeOfDay === "Night";

  useEffect(() => {
    if (showPlaces) setOpen(true);
  }, [showPlaces]);

  const sheet = open ? (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3">
      <div className="mb-8 w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="font-display text-lg text-fg">Places</p>
            <p className="text-xs text-muted">
              {night
                ? "Night. Closed places stay shut. Open ones are marked."
                : "Where they are. Invite fills the box. Travel goes there yourself."}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setOpen(false);
              dismissPlaces();
            }}
            aria-label="Close"
          >
            <X />
          </Button>
        </div>
        <div className="max-h-[min(70dvh,600px)] space-y-5 overflow-y-auto px-5 pb-5">
          {LOCATION_GROUPS.map((group) => {
            const items = locations.filter((l) => l.group === group.id);
            if (!items.length) return null;
            return (
              <section key={group.id}>
                <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-subtle">{group.label}</p>
                <div className="grid gap-2">
                  {items.map((loc) => {
                    const active = loc.id === current;
                    const openNow = openTonight(loc.id, timeOfDay);
                    const found = GIRLS.filter((girl) => girlAt(game, girl) === loc.id);
                    const whoLine = found.length
                      ? `${found.map(girlName).join(" and ")} ${found.length > 1 ? "are" : "is"} here.`
                      : "";
                    const hint = whoLine || (active ? "You're here." : loc.what);
                    return (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setChoice(loc.id as LocationId)}
                        className={cn(
                          "rounded-[var(--radius-md)] border border-border px-3 py-3 text-left hover:bg-elevated",
                          active && "bg-elevated",
                          night && !openNow && "opacity-60",
                        )}
                      >
                        <p className="flex items-center justify-between gap-2 text-sm text-fg">
                          <span>{loc.name}</span>
                          {night ? (
                            <span className={cn("text-[11px] uppercase tracking-[0.12em]", openNow ? "text-fg" : "text-muted")}>
                              {openNow ? "Open" : "Closed"}
                            </span>
                          ) : null}
                        </p>
                        <p className="mt-0.5 text-xs text-muted">{hint}</p>
                        {whoLine && !active ? <p className="mt-0.5 text-xs text-subtle">{loc.what}</p> : null}
                      </button>
                    );
                  })}
                </div>
              </section>
            );
          })}
        </div>
        {choice ? (
          <div className="border-t border-border px-5 py-4">
            <p className="text-sm text-fg">{LOCATIONS[choice].name}</p>
            <p className="mt-1 text-xs text-muted">
              {night && !openTonight(choice, timeOfDay)
                ? "Closed for the night."
                : "Invite fills the box. Nothing sends yet. Travel goes there yourself."}
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                disabled={night && !openTonight(choice, timeOfDay)}
                onClick={() => {
                  insertDraft(inviteToken(choice));
                  setChoice(null);
                  setOpen(false);
                  dismissPlaces();
                }}
              >
                Invite
              </Button>
              <Button
                variant="outline"
                disabled={night && !openTonight(choice, timeOfDay)}
                onClick={() => {
                  if (alone) goAlone(choice);
                  else depart(choice);
                  setChoice(null);
                  setOpen(false);
                  dismissPlaces();
                }}
              >
                Travel
              </Button>
              <Button variant="ghost" onClick={() => setChoice(null)}>
                Back
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  ) : null;

  return (
    <>
      <Button variant="outline" size="icon" onClick={() => setOpen(true)} aria-label="Places" title="Places">
        <MapPin />
      </Button>
      {typeof document !== "undefined" && sheet ? createPortal(sheet, document.body) : null}
    </>
  );
}
