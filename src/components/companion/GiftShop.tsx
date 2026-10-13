import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { giftsAt } from "@/lib/companion/gifts";
import { placeOf } from "@/lib/companion/locations";
import { useCompanion } from "@/lib/companion/store";
import type { LocationId } from "@/lib/companion/types";

export function GiftShop({ place, onClose }: { place: LocationId; onClose: () => void }) {
  const money = useCompanion((s) => s.money);
  const buyGift = useCompanion((s) => s.buyGift);
  const items = giftsAt(place);
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-3 sm:items-center">
      <div className="w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-display text-xl text-fg">Buy a gift</p>
            <p className="mt-1 text-sm text-muted">
              {placeOf(place).name}. You have ${money}.
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close">
            <X />
          </Button>
        </div>
        <div className="mt-4 grid gap-2">
          {items.map((item) => {
            const short = money < item.price;
            return (
              <button
                key={item.id}
                type="button"
                disabled={short}
                onClick={() => buyGift(item.id)}
                className="flex items-center justify-between rounded-md border border-border px-3 py-3 text-left hover:bg-elevated disabled:opacity-40"
              >
                <span className="text-sm text-fg">{item.name}</span>
                <span className="font-mono text-sm text-muted">${item.price}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
