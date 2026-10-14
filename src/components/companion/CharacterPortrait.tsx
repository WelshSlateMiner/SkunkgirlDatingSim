import { useEffect, useState } from "react";
import { StinkLines } from "@/components/companion/StinkLines";
import { portraitSrc, victoriaLingerieOn } from "@/lib/companion/portraits";
import { useCompanion } from "@/lib/companion/store";
import { MAX_SCENE_GIRLS, sceneLayout, sceneOrder, sceneOthers } from "@/lib/companion/scene";
import type { GirlId } from "@/lib/companion/types";
import { ronniePose } from "@/lib/companion/ronnie-art";
import { ronnieInstructing } from "@/lib/companion/yoga";
import { cn } from "@/lib/utils";

function GirlSprite({ girl, count, extra }: { girl: GirlId; count: number; extra: boolean }) {
  const focus = useCompanion((s) => s.focus ?? "izzy");
  const liveOutfit = useCompanion((s) => s.outfit);
  const liveExpression = useCompanion((s) => s.expression);
  const liveSpray = useCompanion((s) => s.sprayKind);
  const otherSpray = useCompanion((s) => s.otherSprayKind ?? "none");
  const card = useCompanion((s) => s.roster?.[girl]);
  const spotlight = useCompanion((s) => s.spraySpotlight);
  const busy = useCompanion((s) => s.busy);
  const pulse = useCompanion((s) => s.fxPulse);
  const location = useCompanion((s) => s.location);
  const intimate = useCompanion((s) => Boolean(s.flags.intimateScene));
  const [stinkUntil, setStinkUntil] = useState(0);

  const mine = girl === focus;
  const outfit = mine ? liveOutfit : (card?.outfit ?? (girl === "victoria" ? "work" : "casual"));
  // An "extra" is a third-or-later girl. She reads her own pulse instead of the shared "other" one.
  const extraKind = extra ? pulse.extraKinds?.[girl] : undefined;
  const joinedSpray = extra ? extraKind === "spray" : !mine && otherSpray !== "none";
  const joinedFart = extra ? extraKind === "fart" : !mine && pulse.otherKind === "fart";
  const expression = joinedSpray ? "spray" : mine ? liveExpression : (card?.expression ?? "idle");
  const sprayKind = mine ? liveSpray : joinedSpray ? (extra ? (pulse.extraSprayKinds?.[girl] ?? "defensive") : otherSpray) : "none";
  const lingerie = girl === "victoria" && victoriaLingerieOn(location, intimate);
  const instructing = useCompanion((s) => girl === "ronnie" && ronnieInstructing(s));
  const src = portraitSrc(outfit, expression, sprayKind, girl, lingerie, location, instructing);
  // The squat and yoga poses keep a bit of floor from the painting. Fade the edges so it sits in the scene.
  const pose = girl === "ronnie" && sprayKind === "none" ? ronniePose(location, expression, instructing) : null;
  const gas = mine ? pulse.kind === "fart" || pulse.kind === "spray" : joinedFart || joinedSpray;
  const stink = gas && stinkUntil !== pulse.key;
  const fullSpray = mine
    ? pulse.kind === "spray" || (spotlight && liveSpray !== "none")
    : extra
      ? extraKind === "spray"
      : pulse.otherKind === "spray" || (spotlight && joinedSpray);
  const spraying = fullSpray;
  const duetSpray = liveSpray !== "none" && otherSpray !== "none";
  const showSpot = mine && spotlight && pulse.kind === "spray" && !duetSpray;

  useEffect(() => {
    if (!gas && !mine) return;
    if (
      pulse.kind !== "fart" &&
      pulse.kind !== "spray" &&
      pulse.otherKind !== "fart" &&
      pulse.otherKind !== "spray" &&
      !extraKind
    )
      return;
    if (!gas) return;
    const t = window.setTimeout(
      () => setStinkUntil(pulse.key),
      pulse.kind === "spray" || pulse.otherKind === "spray" ? 4200 : pulse.intimate ? 6800 : 3600,
    );
    return () => window.clearTimeout(t);
  }, [pulse, mine, gas, extraKind]);

  return (
    <div
      className={cn(
        "pointer-events-none relative flex h-full items-end justify-center",
        sceneLayout(count).width,
        "izzy-idle",
        expression === "embarrassed" && "izzy-embarrassed",
        expression === "laughing" && "izzy-laugh",
        expression === "angry" && "izzy-mad",
        spraying && "izzy-spray-pose",
        expression === "infodump" && "izzy-talk",
        stink && "izzy-fart",
        showSpot && "izzy-spotlight",
        busy && mine && "opacity-95",
        // Three on screen: the girl being talked to stands forward, the others ease back a touch.
        count >= 3 && (mine ? "z-10" : "scale-[0.94] opacity-90"),
      )}
    >
      <img
        key={src}
        src={src}
        style={
          pose
            ? { maskImage: "radial-gradient(ellipse 70% 75% at 50% 50%, black 70%, transparent 100%)", WebkitMaskImage: "radial-gradient(ellipse 70% 75% at 50% 50%, black 70%, transparent 100%)" }
            : undefined
        }
        alt={girl === "victoria" ? "Victoria" : girl === "ronnie" ? "Veronica" : "Isabella"}
        className={cn(
          "w-auto object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]",
          showSpot
            ? "h-[min(98dvh,1080px)] max-w-[min(100%,720px)]"
            : sceneLayout(count).height,
          spraying || stink
            ? "transition-none"
            : "transition-[height,opacity,filter] duration-[var(--motion-slow)] ease-[var(--ease-smooth-out)]",
        )}
      />
      {stink ? <StinkLines variant="body" /> : null}
      {showSpot || (duetSpray && spraying) ? <div className="spray-jets" aria-hidden /> : null}
    </div>
  );
}

export function CharacterPortrait() {
  const present = useCompanion((s) => s.present);
  const focus = useCompanion((s) => s.focus ?? "izzy");
  const order: GirlId[] = sceneOrder(present?.length ? present : [focus]);
  const count = Math.min(MAX_SCENE_GIRLS, order.length || 1);
  // The first non-focus girl uses the existing "other" fields. Anyone after her is an extra.
  const others = sceneOthers(order, focus);

  return (
    <div className="pointer-events-none relative flex h-full w-full items-end justify-center">
      {order.map((id) => (
        <GirlSprite key={id} girl={id} count={count} extra={id !== focus && id !== others[0]} />
      ))}
    </div>
  );
}
