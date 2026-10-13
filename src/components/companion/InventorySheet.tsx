import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { giftById } from "@/lib/companion/gifts";
import { useCompanion } from "@/lib/companion/store";

export function InventorySheet({ onClose }: { onClose: () => void }) {
  const inventory = useCompanion((s) => s.inventory);
  const money = useCompanion((s) => s.money);
  const counts = new Map<string, number>();
  for (const id of inventory) counts.set(id, (counts.get(id) ?? 0) + 1);
  const rows = [...counts.entries()];
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-3 sm:items-center">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xl text-fg">Inventory</p>
            <p className="mt-1 text-sm text-muted">
              {rows.length ? `${inventory.length} gift${inventory.length === 1 ? "" : "s"} in the bag.` : "The bag is empty."} ${money} on you.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X />
          </Button>
        </div>
        {rows.length ? (
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
          <p className="mt-4 text-sm text-muted">Buy something at a shop. A date needs a gift from this bag.</p>
        )}
      </div>
    </div>
  );
}
