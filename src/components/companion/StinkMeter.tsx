import { markedLabel } from "@/lib/companion/stink";
import { useCompanion } from "@/lib/companion/store";

const TICKS = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

export function StinkMeter() {
  const stink = useCompanion((s) => Math.max(0, Math.min(100, Math.round(s.stink ?? 0))));
  const izzy = useCompanion((s) => (typeof s.scentFrom?.izzy === "number" ? s.scentFrom.izzy : 0));
  const victoria = useCompanion((s) => (typeof s.scentFrom?.victoria === "number" ? s.scentFrom.victoria : 0));
  const ronnie = useCompanion((s) => (typeof s.scentFrom?.ronnie === "number" ? s.scentFrom.ronnie : 0));
  const mira = useCompanion((s) => (typeof s.scentFrom?.mira === "number" ? s.scentFrom.mira : 0));
  const who = markedLabel(stink, { izzy, victoria, ronnie, mira });
  return (
    <aside className="stink-meter" aria-label={`Stink meter ${stink}. Currently marked by ${who}.`}>
      <p className="stink-meter-label">
        Currently Marked By:
        <span className="stink-meter-who">{who}</span>
      </p>
      <div className="stink-tube">
        <div className="stink-fill" style={{ height: `${stink}%` }} />
        <div className="stink-ticks">
          {TICKS.map((tick) => (
            <span key={tick} className="stink-tick" style={{ bottom: `${tick}%` }}>
              <span>{tick}</span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
}
