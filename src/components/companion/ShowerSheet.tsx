import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { giftById } from "@/lib/companion/gifts";
import { FRESHEN, freshenRating, showerCut } from "@/lib/companion/stink";
import { useCompanion } from "@/lib/companion/store";

const NONE: string[] = [];

export function ShowerSheet({ onClose }: { onClose: () => void }) {
  const inventory = useCompanion((s) => s.inventory) ?? NONE;
  const showersToday = useCompanion((s) => s.showersToday ?? 0);
  const stink = useCompanion((s) => s.stink ?? 0);
  const takeShower = useCompanion((s) => s.takeShower);
  const [open, setOpen] = useState(false);
  const [picked, setPicked] = useState<string[]>([]);
  const owned = [...new Set(inventory)].filter((id) => freshenRating(id) > 0);
  const left = Math.max(0, 2 - showersToday);
  const cut = showerCut(picked.filter((id) => owned.includes(id)));

  function toggle(id: string) {
    setPicked((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-3 sm:items-center">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xl text-fg">Shower</p>
            <p className="mt-1 text-sm text-muted">
              Twice a day. Water alone takes 10 off the stink. Soap, spray, and whatever else you check off is used up, and can take it as high as 75. {left} left today. Stink is {Math.round(stink)}.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X />
          </Button>
        </div>
        <Button className="mt-4 w-full" disabled={left <= 0} onClick={() => setOpen(true)}>
          Take Shower
        </Button>
        {left <= 0 ? <p className="mt-2 text-sm text-muted">You've already showered twice today.</p> : null}
        {open && left > 0 ? (
          <div className="mt-4 rounded-md border border-border p-3">
            <p className="text-xs uppercase tracking-[0.14em] text-subtle">Sanitary items</p>
            {owned.length ? (
              <ul className="mt-2 grid gap-2">
                {owned.map((id) => {
                  const gift = giftById(id);
                  const on = picked.includes(id);
                  return (
                    <li key={id}>
                      <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm">
                        <span className="flex items-center gap-2 text-fg">
                          <input type="checkbox" checked={on} onChange={() => toggle(id)} />
                          {gift?.name ?? id}
                        </span>
                        <span className="font-mono text-muted">Freshening {FRESHEN[id]}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="mt-2 text-sm text-muted">Nothing in the bag that helps. The shower still counts for 10.</p>
            )}
            <p className="mt-3 text-sm text-fg">This shower takes {picked.length ? cut : 10} off the stink.</p>
            <Button
              className="mt-3 w-full"
              onClick={() => {
                takeShower(picked);
                onClose();
              }}
            >
              Wash
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
