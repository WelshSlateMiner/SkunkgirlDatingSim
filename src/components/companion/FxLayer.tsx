import { useLayoutEffect, useState } from "react";
import { StinkLines } from "@/components/companion/StinkLines";
import { playFart, playFartAt, playFartPair, playFartSrc, playSpray, playSprayPair } from "@/lib/companion/audio";
import { useCompanion } from "@/lib/companion/store";
import { cn } from "@/lib/utils";
import type { FxEvent } from "@/lib/companion/types";

const HOLD: Record<FxEvent, number> = {
  none: 0,
  fart: 2800,
  spray: 4200,
  blush: 1800,
  hearts: 2200,
  laugh: 1400,
};

export function FxLayer() {
  const pulse = useCompanion((s) => s.fxPulse);
  const [hiddenKey, setHiddenKey] = useState<number | null>(null);
  const extras = Object.values(pulse.extraKinds ?? {});
  const extraGas = extras.some((kind) => kind === "fart" || kind === "spray");
  const active =
    pulse.kind !== "none" || pulse.otherKind === "fart" || pulse.otherKind === "spray" || extraGas;
  const visible = active && hiddenKey !== pulse.key;

  useLayoutEffect(() => {
    if (!active) return;
    const twoFarts = pulse.kind === "fart" && pulse.otherKind === "fart";
    const twoSprays = pulse.kind === "spray" && pulse.otherKind === "spray";
    if (twoFarts) {
      if (pulse.fartSrc) playFartSrc(pulse.fartSrc);
      if (pulse.otherFartSrc) playFartSrc(pulse.otherFartSrc);
      if (!pulse.fartSrc && !pulse.otherFartSrc) playFartPair(Boolean(pulse.intimate));
    } else if (pulse.kind === "fart" || pulse.otherKind === "fart") {
      const src = pulse.fartSrc || pulse.otherFartSrc;
      if (src) playFartSrc(src);
      else if (typeof pulse.fartIndex === "number" && pulse.kind === "fart") playFartAt(pulse.fartIndex);
      else playFart(Boolean(pulse.intimate));
    }
    for (const src of Object.values(pulse.extraFartSrcs ?? {})) if (src) playFartSrc(src);
    if (twoSprays) playSprayPair();
    else if (pulse.kind === "spray" || pulse.otherKind === "spray") playSpray();
    else if (Object.values(pulse.extraKinds ?? {}).includes("spray")) playSpray();
    const hold = pulse.kind === "fart" && pulse.intimate ? 6800 : HOLD[pulse.kind] || 2800;
    const t = window.setTimeout(() => setHiddenKey(pulse.key), hold);
    return () => window.clearTimeout(t);
  }, [pulse, active]);

  if (!visible) return null;

  const stink =
    pulse.kind === "fart" || pulse.kind === "spray" || pulse.otherKind === "fart" || pulse.otherKind === "spray" || extraGas;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {stink ? (
        <div className={cn("haze", pulse.kind === "spray" && "haze-spray")} />
      ) : null}
      {stink ? <StinkLines variant="screen" /> : null}
      {pulse.kind === "blush" ? <div className="blush-wash" /> : null}
      {pulse.kind === "hearts" ? (
        <div className="hearts">
          <span />
          <span />
          <span />
        </div>
      ) : null}
      {pulse.kind === "laugh" ? <div className="laugh-shim" /> : null}
    </div>
  );
}
