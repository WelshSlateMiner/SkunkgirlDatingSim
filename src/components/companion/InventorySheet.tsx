import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { giftById } from "@/lib/companion/gifts";
import { keepsakeById } from "@/lib/companion/keepsakes";
import { useCompanion } from "@/lib/companion/store";

export function InventorySheet({ onClose }: { onClose: () => void }) {
  const inventory = useCompanion((s) => s.inventory);
  const keepsakes = useCompanion((s) => s.keepsakes);
  const money = useCompanion((s) => s.money);
  const [tab, setTab] = useState<"bag" | "keepsakes">("bag");
  const counts = new Map<string, number>();
  for (const id of inventory) counts.set(id, (counts.get(id) ?? 0) + 1);
  const rows = [...counts.entries()];
  const owned = (keepsakes ?? []).map((id) => keepsakeById(id)).filter((item) => item != null);
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-3 sm:items-center">
      <div className="max-h-[min(86dvh,720px)] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xl text-fg">Inventory</p>
            <p className="mt-1 text-sm text-muted">
              {tab === "bag"
                ? `${rows.length ? `${inventory.length} gift${inventory.length === 1 ? "" : "s"} in the bag.` : "The bag is empty."} $${money} on you.`
                : owned.length
                  ? `${owned.length} on the shelf.`
                  : "Nothing on the shelf yet."}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X />
          </Button>
        </div>
        <div className="mt-4 flex gap-2" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "bag"}
            className={tab === "bag" ? "rounded-md bg-elevated px-3 py-2 text-sm text-fg" : "rounded-md px-3 py-2 text-sm text-muted"}
            onClick={() => setTab("bag")}
          >
            Bag
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "keepsakes"}
            className={tab === "keepsakes" ? "rounded-md bg-elevated px-3 py-2 text-sm text-fg" : "rounded-md px-3 py-2 text-sm text-muted"}
            onClick={() => setTab("keepsakes")}
          >
            Collectibles
          </button>
        </div>
        {tab === "bag" ? (
          rows.length ? (
            <ul className="mt-4 grid gap-2">
              {rows.map(([id, count]) => {
                const gift = giftById(id);
                return (
                  <li key={id} className="flex items-center justify-between rounded-md border border-border px-3 py-3">
                    <span className="text-sm text-fg">{gift?.name ?? id}</span>
                    {count > 1 ? <span className="font-mono text-sm text-muted">×{count}</span> : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-4 text-sm text-muted">Buy something at a shop if you want to bring a gift. A date does not require one.</p>
          )
        ) : owned.length ? (
          <ul className="mt-4 grid gap-3">
            {owned.map((item) => (
              <li key={item.id} className="flex gap-3 rounded-md border border-border p-3">
                <img src={item.image} alt="" className="size-16 shrink-0 object-contain" />
                <div className="min-w-0">
                  <p className="text-sm text-fg">{item.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{item.blurb}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 text-sm text-muted">
            They give these away. They do not sell them. Once Trust and Bonding are both high enough, the first time you see her in a day she might hand you something of hers.
          </p>
        )}
      </div>
    </div>
  );
}
