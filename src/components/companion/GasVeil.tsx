import { useCompanion } from "@/lib/companion/store";
import type { GasPuff } from "@/lib/companion/types";

const BAND = { 1: 14, 2: 26, 3: 40 } as const;
const NONE: GasPuff[] = [];

/** Wispy gas pooled at the bottom. Each fart adds a band. They stack until the air is thick. */
export function GasVeil() {
  const gas = useCompanion((s) => s.gas) ?? NONE;
  const height = Math.min(
    100,
    gas.reduce((sum, puff) => sum + BAND[puff.size], 0),
  );
  if (height <= 0) return null;
  const thick = height >= 58;
  return (
    <div className="gas-veil" style={{ height: `${height}%` }} data-thick={thick ? "true" : "false"} aria-hidden>
      {gas.map((puff, index) => (
        <span
          key={puff.id}
          className={`gas-wisp gas-wisp-${puff.size}`}
          style={{
            left: `${(index * 23) % 70}%`,
            bottom: `${(index * 17) % 48}%`,
            animationDelay: `${index * -1.4}s`,
          }}
        />
      ))}
    </div>
  );
}
