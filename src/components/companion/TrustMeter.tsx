import { girlShort } from "@/lib/companion/cast";
import { sceneOrder } from "@/lib/companion/scene";
import { bondLabel } from "@/lib/companion/trust";
import { useCompanion } from "@/lib/companion/store";
import type { Bond, GirlId } from "@/lib/companion/types";
import { cn } from "@/lib/utils";

function Bar({
  label,
  value,
  max,
  min = 0,
  tone,
}: {
  label: string;
  value: number;
  max: number;
  min?: number;
  tone: "trust" | "bond";
}) {
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
  const low = value < 0;
  return (
    <div className="min-w-0">
      <div className="mb-0.5 flex items-baseline justify-between gap-2">
        <p className="text-[10px] uppercase tracking-[0.14em] text-subtle">{label}</p>
        <p className="text-[11px] tabular-nums text-muted">{Math.round(value)}</p>
      </div>
      <div
        className="relative h-1.5 overflow-hidden rounded-full bg-elevated"
        role="meter"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Math.round(value)}
        aria-label={label}
      >
        <div
          className={cn(
            "absolute inset-y-0 left-0 rounded-full transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
            low ? "bg-danger" : tone === "bond" ? "bg-accent" : value >= 100 ? "bg-accent" : "bg-trust",
          )}
          style={{ width: `${low ? 8 : pct}%` }}
        />
      </div>
    </div>
  );
}

function Block({
  name,
  trust,
  bonding,
  bond,
  dates,
  slow,
  attention,
}: {
  name: string;
  trust: number;
  bonding: number;
  bond: Bond;
  dates: number;
  slow: boolean;
  attention?: string | null;
}) {
  return (
    <div className="min-w-0 space-y-1.5">
      <p className="font-display text-sm tracking-tight text-fg">
        {name}
        <span className="ml-2 text-[10px] uppercase tracking-[0.14em] text-subtle">{bondLabel(bond)}</span>
      </p>
      <Bar label="Trust" value={trust} min={0} max={100} tone="trust" />
      <Bar label="Bonding" value={bonding} min={0} max={100} tone="bond" />
      {attention ? <p className="text-[10px] uppercase tracking-[0.12em] text-subtle">{attention}</p> : null}
      {slow ? (
        <p className="text-[10px] uppercase tracking-[0.14em] text-subtle">Dates: {Math.min(3, dates)}/3</p>
      ) : null}
    </div>
  );
}

export function TrustMeter() {
  const trust = useCompanion((s) => s.trust);
  const bonding = useCompanion((s) => s.bonding);
  const bond = useCompanion((s) => s.bond);
  const mode = useCompanion((s) => s.gameMode);
  const dates = useCompanion((s) => s.dates);
  const focus = useCompanion((s) => s.focus ?? "izzy");
  const present = useCompanion((s) => s.present);
  const roster = useCompanion((s) => s.roster);
  const order: GirlId[] = sceneOrder(present ?? []);
  const slow = mode === "slow";
  const attention = useCompanion((s) => s.attention);
  const day = useCompanion((s) => s.daySerial ?? 0);
  const attentionLine = (id: GirlId, cardBond: Bond, accepted: boolean) => {
    if (id !== "mira") return null;
    if (cardBond !== "romantic" && !accepted) return null;
    const n = attention?.day === day ? attention.mira : 0;
    const word = n >= 10 ? "kept" : n >= 6 ? "noticed" : n >= 3 ? "thin" : "starving";
    return `Attention ${n}/10 · ${word}`;
  };

  if (order.length < 2) {
    const card = roster?.[focus];
    return (
      <Block
        name={girlShort(focus)}
        trust={trust}
        bonding={bonding}
        bond={bond}
        dates={dates ?? 0}
        slow={slow}
        attention={attentionLine(focus, bond, Boolean(card?.romanceAccepted))}
      />
    );
  }

  return (
    <div className={cn("grid gap-3", order.length >= 3 ? "grid-cols-3" : "grid-cols-2")}>
      {order.map((id) => {
        const card = roster?.[id];
        const live = id === focus;
        const shownBond = live ? bond : (card?.bond ?? "stranger");
        return (
          <Block
            key={id}
            name={girlShort(id)}
            trust={live ? trust : (card?.trust ?? 0)}
            bonding={live ? bonding : (card?.bonding ?? 0)}
            bond={shownBond}
            dates={live ? (dates ?? 0) : (card?.dates ?? 0)}
            slow={slow}
            attention={attentionLine(id, shownBond, Boolean(card?.romanceAccepted))}
          />
        );
      })}
    </div>
  );
}
