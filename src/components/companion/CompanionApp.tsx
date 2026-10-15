import { useEffect, useRef, useState, type PointerEvent } from "react";
import { sceneNames, sceneOrder } from "@/lib/companion/scene";
import { Backpack, ChevronsDownUp, ChevronsUpDown, DollarSign, Download, GripHorizontal, RotateCcw, ShowerHead, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CharacterPortrait } from "@/components/companion/CharacterPortrait";
import { ChatComposer } from "@/components/companion/ChatComposer";
import { DatePlanner } from "@/components/companion/DatePlanner";
import { DateDue, DateReviewCard } from "@/components/companion/DateWindows";
import { DayFlow } from "@/components/companion/DayFlow";
import { GiftShop } from "@/components/companion/GiftShop";
import { DebugBar } from "@/components/companion/DebugBar";
import { DialoguePanel } from "@/components/companion/DialoguePanel";
import { FxLayer } from "@/components/companion/FxLayer";
import { GasVeil } from "@/components/companion/GasVeil";
import { HowToPlay } from "@/components/companion/HowToPlay";
import { PassTime } from "@/components/companion/PassTime";
import { SleepButton } from "@/components/companion/SleepButton";
import { InventorySheet } from "@/components/companion/InventorySheet";
import { KeepsakeReveal, KeepsakeShelf } from "@/components/companion/KeepsakeShelf";
import { ShowerSheet } from "@/components/companion/ShowerSheet";
import { StinkMeter } from "@/components/companion/StinkMeter";
import { SaveChatButton } from "@/components/companion/SaveChatButton";
import { InviteDecision } from "@/components/companion/InviteDecision";
import { LensCoat } from "@/components/companion/LensCoat";
import { LocationSheet } from "@/components/companion/LocationSheet";
import { SprayOverlay } from "@/components/companion/SprayOverlay";
import { StartScreen } from "@/components/companion/StartScreen";
import { TrustMeter } from "@/components/companion/TrustMeter";
import { romanceGate } from "@/lib/companion/dates";
import { isStore } from "@/lib/companion/gifts";
import { SHOWER_PLACES } from "@/lib/companion/stink";
import { dateIsDue } from "@/lib/companion/outing";
import { romanceBlocked, girlName } from "@/lib/companion/cast";
import { isMuted, setMuted, unlockAudio } from "@/lib/companion/audio";
import { placeOf } from "@/lib/companion/locations";
import { OUTFIT_LABEL, asOutfitId, victoriaGownOn, victoriaLingerieOn } from "@/lib/companion/portraits";
import { ronnieOutfitName } from "@/lib/companion/ronnie-art";
import { writeSave, downloadSave } from "@/lib/companion/save";
import { useCompanion } from "@/lib/companion/store";
import { cn } from "@/lib/utils";

export function CompanionApp() {
  const hydrate = useCompanion((s) => s.hydrate);
  const hydrated = useCompanion((s) => s.hydrated);
  const started = useCompanion((s) => s.started);
  const location = useCompanion((s) => s.location);
  const outfit = useCompanion((s) => s.outfit);
  const reset = useCompanion((s) => s.reset);
  const flags = useCompanion((s) => s.flags);
  const acceptRomance = useCompanion((s) => s.acceptRomance);
  const bond = useCompanion((s) => s.bond);
  const trust = useCompanion((s) => s.trust);
  const bonding = useCompanion((s) => s.bonding);
  const debug = useCompanion((s) => s.debug);
  const weekday = useCompanion((s) => s.weekday);
  const timeOfDay = useCompanion((s) => s.timeOfDay);
  const izzyHere = useCompanion((s) => s.izzyHere);
  const dayPhase = useCompanion((s) => s.dayPhase);
  const fading = useCompanion((s) => s.fading);
  const fadeMs = useCompanion((s) => s.fadeMs ?? 700);
  const spotlight = useCompanion((s) => s.spraySpotlight);
  const endSpotlight = useCompanion((s) => s.endSpotlight);
  const mode = useCompanion((s) => s.gameMode);
  const focus = useCompanion((s) => s.focus);
  const present = useCompanion((s) => s.present);
  const relationshipType = useCompanion((s) => s.relationshipType);
  const roster = useCompanion((s) => s.roster);
  const dates = useCompanion((s) => s.dates);
  const activeDate = useCompanion((s) => s.activeDate);
  const dateSpots = useCompanion((s) => s.dateSpots);
  const dateDraft = useCompanion((s) => s.dateDraft);
  const dateReview = useCompanion((s) => s.dateReview);
  const due = useCompanion(dateIsDue);
  const tipOff = useCompanion((s) => s.dateTipOff);
  const dismissDateTip = useCompanion((s) => s.dismissDateTip);
  const [shop, setShop] = useState(false);
  const [bag, setBag] = useState(false);
  const [shower, setShower] = useState(false);
  const [compact, setCompact] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<HTMLDivElement | null>(null);
  const dragRef = useRef<{ dx: number; dy: number; w: number } | null>(null);
  const [spot, setSpot] = useState<{ x: number; y: number; w: number } | null>(null);

  function startDrag(e: PointerEvent<HTMLDivElement>) {
    if ((e.target as HTMLElement).closest("button, a, input, textarea, select")) return;
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    dragRef.current = { dx: e.clientX - r.left, dy: e.clientY - r.top, w: r.width };
    setSpot({ x: r.left, y: r.top, w: r.width });
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function moveDrag(e: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;
    if (!drag) return;
    const x = Math.min(window.innerWidth - 64, Math.max(64 - drag.w, e.clientX - drag.dx));
    const y = Math.min(window.innerHeight - 48, Math.max(8, e.clientY - drag.dy));
    setSpot({ x, y, w: drag.w });
  }

  function endDrag() {
    dragRef.current = null;
  }
  const [muted, setMutedUi] = useState(false);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    setMutedUi(isMuted());
    const unlock = () => unlockAudio();
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    const onVis = () => {
      if (document.visibilityState === "visible") unlockAudio();
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  useEffect(() => {
    const flush = () => {
      const s = useCompanion.getState();
      if (s.started) writeSave(s);
    };
    const onHide = () => {
      if (document.visibilityState === "hidden") flush();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", flush);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", flush);
    };
  }, []);

  useEffect(() => {
    if (!spotlight) return;
    const t = window.setTimeout(() => endSpotlight(), 5400);
    return () => window.clearTimeout(t);
  }, [spotlight, endSpotlight]);

  if (!hydrated || !started) return <StartScreen />;

  const place = placeOf(location);
  const together = sceneOrder(present ?? []);
  const who = focus ?? "izzy";
  const dateGirl = activeDate?.girl;
  const outfitLabel = together.length >= 2
    ? sceneNames(together)
    : who === "victoria"
      ? dateGirl === "victoria" || (victoriaGownOn(location) && !victoriaLingerieOn(location, Boolean(flags.intimateScene)))
        ? "Royal blue gown"
        : victoriaLingerieOn(location, Boolean(flags.intimateScene))
          ? "Black blazer set"
          : "Office blouse"
      : who === "ronnie"
        ? ronnieOutfitName(location, dateGirl === "ronnie")
        : dateGirl === "izzy"
          ? OUTFIT_LABEL.dress
          : OUTFIT_LABEL[asOutfitId(outfit) ?? "casual"];
  const gate = romanceGate(mode, dates ?? 0, dateSpots ?? []);
  const blocked = romanceBlocked(
    { focus: focus ?? "izzy", relationshipType: relationshipType ?? "mono", roster, gameMode: mode },
    trust,
    bonding,
    dates ?? 0,
  );
  const showRomance =
    flags.romanceOffered &&
    !flags.romanceAccepted &&
    !blocked &&
    (mode === "slow"
      ? (dates ?? 0) >= 3 && trust >= gate.trust && bonding >= gate.bonding
      : trust >= 90 && bonding >= 60);

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-bg text-fg">
      <div ref={setStage} className="absolute inset-0">
        <img src={place.image} alt="" className="size-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-bg/35" />
      <KeepsakeShelf stage={stage} />
      <FxLayer />
      <GasVeil />
      <StinkMeter />

      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 bottom-0 top-16 flex items-end justify-center lg:justify-end lg:pr-8",
          spotlight ? "z-50" : "z-10",
        )}
      >
        {izzyHere ? <CharacterPortrait /> : null}
      </div>

      <header className="relative z-20 flex flex-wrap items-center gap-2 px-3 py-3 sm:px-5">
        <div className="rounded-lg border border-border bg-bg/55 px-3 py-2 backdrop-blur-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">{weekday}</p>
          <p className="font-display text-lg leading-none text-fg">{timeOfDay}</p>
        </div>
        <div className="rounded-lg border border-border bg-bg/55 px-3 py-2 backdrop-blur-sm">
          <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">{place.name}</p>
          <p className="text-xs text-muted">{outfitLabel}</p>
        </div>
        <div className="min-w-[12rem] flex-1 rounded-lg border border-border bg-bg/55 px-3 py-2 backdrop-blur-sm">
          <TrustMeter />
        </div>
        <div className="flex w-full min-w-0 flex-wrap items-center gap-1 [&_button]:size-9 [&_button]:shrink-0">
          <Button variant="ghost" size="icon" onClick={() => downloadSave(useCompanion.getState())} aria-label="Save to file" title="Save to file">
            <Download />
          </Button>
          <LocationSheet />
          {isStore(location) ? (
            <Button variant="ghost" size="icon" onClick={() => setShop(true)} aria-label="Buy A Gift" title="Buy A Gift">
              <DollarSign />
            </Button>
          ) : null}
          <Button variant="ghost" size="icon" onClick={() => setBag(true)} aria-label="Inventory" title="Inventory">
            <Backpack />
          </Button>
          {SHOWER_PLACES.has(location) ? (
            <Button variant="ghost" size="icon" onClick={() => setShower(true)} aria-label="Shower" title="Shower">
              <ShowerHead />
            </Button>
          ) : null}
          <HowToPlay />
          <SleepButton />
          <PassTime />
          <SaveChatButton />
          <Button
            variant="ghost"
            size="icon"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={() => {
              const next = !muted;
              setMuted(next);
              setMutedUi(next);
              unlockAudio();
            }}
          >
            {muted ? <VolumeX /> : <Volume2 />}
          </Button>
          <Button variant="ghost" size="icon" onClick={reset} aria-label="Reset">
            <RotateCcw />
          </Button>
        </div>
      </header>

      <div
        className={cn(
          "relative z-20 flex min-h-0 flex-1 items-end overflow-hidden p-3 sm:p-5 lg:max-w-[54%]",
          compact ? "pb-16 sm:pb-20" : "pb-20 sm:pb-24",
        )}
      >
        <div
          ref={cardRef}
          style={spot ? { left: spot.x, top: spot.y, width: spot.w } : undefined}
          className={cn(
            "max-h-full w-full overflow-y-auto rounded-xl border border-border bg-bg/78 shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-md",
            "transition-[padding] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]",
            compact ? "px-3 py-2" : "p-4 sm:p-5",
            spot && "fixed z-30",
          )}
        >
          <div
            className="mb-2 flex cursor-grab touch-none items-center gap-2 active:cursor-grabbing"
            onPointerDown={startDrag}
            onPointerMove={moveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            aria-label="Drag chat"
          >
            <GripHorizontal className="size-4 shrink-0 text-muted" />
            {compact ? <DialoguePanel compact /> : <div className="min-w-0 flex-1" />}
            <Button
              variant="ghost"
              size="sm"
              className="h-9 shrink-0 gap-1 px-2 text-xs text-muted"
              onClick={() => setCompact((v) => !v)}
              aria-label={compact ? "Expand dialogue" : "Minimize dialogue"}
              aria-pressed={compact}
            >
              {compact ? <ChevronsUpDown /> : <ChevronsDownUp />}
              <span>{compact ? "Expand" : "Minimize"}</span>
            </Button>
          </div>
          {compact ? null : (
            <>
              {showRomance ? (
                <div className="mb-3 rounded-md border border-accent/40 bg-accent/10 px-3 py-2">
                  <p className="text-sm text-fg">{girlName(focus ?? "izzy")} asked. This is the door.</p>
                  <Button size="sm" className="mt-2" onClick={acceptRomance}>
                    Be with {girlName(focus ?? "izzy")}
                  </Button>
                </div>
              ) : null}
              {bond === "romantic" ? (
                <p className="mb-2 text-[11px] uppercase tracking-[0.16em] text-accent">
                  Together
                </p>
              ) : null}
              <DialoguePanel />
              {present.includes(focus ?? "izzy") &&
              trust >= 20 &&
              bonding >= 20 &&
              (dates ?? 0) < 3 &&
              !tipOff?.[focus ?? "izzy"] &&
              !dateDraft &&
              !dateReview &&
              !due ? (
                <div className="mt-3 flex items-start justify-between gap-3 rounded-md border border-accent/40 bg-accent/10 px-3 py-2">
                  <p className="text-sm text-fg">You could ask {girlName(focus ?? "izzy")} on a date.</p>
                  <button type="button" className="text-xs text-muted" onClick={dismissDateTip}>
                    Hide
                  </button>
                </div>
              ) : null}
            </>
          )}
          <InviteDecision />
          {debug ? <div className="mb-2"><DebugBar /></div> : null}
          {(dayPhase === "playing" || dayPhase === "planning") && !dateDraft && !dateReview && !due ? (
            <ChatComposer compact={compact} />
          ) : null}
        </div>
      </div>
      <SprayOverlay />
      <DayFlow />
      <DatePlanner />
      <DateDue />
      <DateReviewCard />
      {shop && isStore(location) ? <GiftShop place={location} onClose={() => setShop(false)} /> : null}
      {bag ? <InventorySheet onClose={() => setBag(false)} /> : null}
      {shower ? <ShowerSheet onClose={() => setShower(false)} /> : null}
      <KeepsakeReveal />
      <LensCoat />
      <div
        data-fade
        aria-hidden
        className={cn(
          "fixed inset-0 z-[90] bg-black transition-opacity",
          fading ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{ transitionDuration: `${fadeMs}ms` }}
      />
    </div>
  );
}
