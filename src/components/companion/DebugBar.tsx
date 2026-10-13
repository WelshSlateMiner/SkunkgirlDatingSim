import { DEBUG_TIPS } from "@/lib/companion/debug";
import { useCompanion } from "@/lib/companion/store";

export function DebugBar() {
  const debug = useCompanion((s) => s.debug);
  const setDraft = useCompanion((s) => s.setDraft);
  const outfit = useCompanion((s) => s.outfit);
  const expression = useCompanion((s) => s.expression);
  const sprayKind = useCompanion((s) => s.sprayKind);
  const focus = useCompanion((s) => s.focus ?? "izzy");
  const present = useCompanion((s) => s.present);
  if (!debug) return null;
  const both = (present ?? []).includes("izzy") && (present ?? []).includes("victoria");
  const who = focus === "victoria" ? "Victoria" : "Izzy";

  return (
    <div className="rounded-lg border border-cream/40 bg-bg/70 px-3 py-2 backdrop-blur-sm">
      <p className="text-[10px] uppercase tracking-[0.16em] text-cream/70">
        {who}
        {both ? " · both" : ""} · {outfit} · {expression}
        {sprayKind !== "none" ? ` · ${sprayKind}` : ""}
      </p>
      <div className="-mx-1 mt-2 flex gap-1 overflow-x-auto px-1">
        {DEBUG_TIPS.map((tip) => (
          <button
            key={tip}
            type="button"
            onClick={() => setDraft(tip)}
            className="h-7 shrink-0 rounded-full border border-cream/30 bg-cream/10 px-2 text-[10px] text-cream hover:bg-cream/20"
          >
            {tip}
          </button>
        ))}
      </div>
    </div>
  );
}
