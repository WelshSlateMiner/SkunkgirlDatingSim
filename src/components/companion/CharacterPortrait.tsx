import { useEffect, useState } from "react";
import { StinkLines } from "@/components/companion/StinkLines";
import { portraitSrc, victoriaLingerieOn } from "@/lib/companion/portraits";
import { useCompanion } from "@/lib/companion/store";
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
        count >= 3 ? "w-1/3" : count === 2 ? "w-1/2" : "w-full",
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
            : count >= 3
              ? "h-[min(68dvh,760px)] max-w-full"
              : count === 2
                ? "h-[min(78dvh,860px)] max-w-full"
                : "h-[min(92dvh,980px)] max-w-[min(100%,640px)]",
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
  const ids = (present?.length ? present : [focus]).filter((id, i, all) => all.indexOf(id) === i);
  const count = Math.min(3, ids.length || 1);
  const order: GirlId[] = ids.includes("izzy") && ids.includes("victoria") ? ["izzy", "victoria"] : ids;

  return (
    <div className="pointer-events-none relative flex h-full w-full items-end justify-center">
      {order.map((id) => (
        <GirlSprite key={id} girl={id} count={count} />
      ))}
    </div>
  );
}
