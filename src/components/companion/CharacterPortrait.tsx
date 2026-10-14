import { useEffect, useState } from "react";
import { StinkLines } from "@/components/companion/StinkLines";
import { portraitSrc, victoriaLingerieOn } from "@/lib/companion/portraits";
import { useCompanion } from "@/lib/companion/store";
import { MAX_SCENE_GIRLS, sceneLayout, sceneOrder } from "@/lib/companion/scene";
import type { GirlId } from "@/lib/companion/types";
import { cn } from "@/lib/utils";

function GirlSprite({ girl, count }: { girl: GirlId; count: number }) {
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
  const joinedSpray = !mine && otherSpray !== "none";
  const joinedFart = !mine && pulse.otherKind === "fart";
  const expression = joinedSpray ? "spray" : mine ? liveExpression : (card?.expression ?? "idle");
  const sprayKind = mine ? liveSpray : joinedSpray ? otherSpray : "none";
  const lingerie = girl === "victoria" && victoriaLingerieOn(location, intimate);
  const src = portraitSrc(outfit, expression, sprayKind, girl, lingerie);
  const gas = mine ? pulse.kind === "fart" || pulse.kind === "spray" : joinedFart || joinedSpray;
  const stink = gas && stinkUntil !== pulse.key;
  const fullSpray = mine
    ? pulse.kind === "spray" || (spotlight && liveSpray !== "none")
    : pulse.otherKind === "spray" || (spotlight && joinedSpray);
  const spraying = fullSpray;
  const duetSpray = liveSpray !== "none" && otherSpray !== "none";
  const showSpot = mine && spotlight && pulse.kind === "spray" && !duetSpray;

  useEffect(() => {
    if (!gas && !mine) return;
    if (pulse.kind !== "fart" && pulse.kind !== "spray" && pulse.otherKind !== "fart" && pulse.otherKind !== "spray") return;
    if (!gas) return;
    const t = window.setTimeout(
      () => setStinkUntil(pulse.key),
      pulse.kind === "spray" || pulse.otherKind === "spray" ? 4200 : pulse.intimate ? 6800 : 3600,
    );
    return () => window.clearTimeout(t);
  }, [pulse, mine, gas]);

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
      )}
    >
      <img
        key={src}
        src={src}
        alt={girl === "victoria" ? "Victoria" : "Isabella"}
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

  return (
    <div className="pointer-events-none relative flex h-full w-full items-end justify-center">
      {order.map((id) => (
        <GirlSprite key={id} girl={id} count={count} />
      ))}
    </div>
  );
}
