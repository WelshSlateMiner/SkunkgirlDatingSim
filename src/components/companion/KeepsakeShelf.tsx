import { useEffect, useMemo, useRef, useState } from "react";
import { APARTMENT_PX, keepsakeById, shelfCubbies } from "@/lib/companion/keepsakes";
import { useCompanion } from "@/lib/companion/store";

const CUBBIES = shelfCubbies();

function place(box: { w: number; h: number }, rect: { x: number; y: number; w: number; h: number }) {
  const scale = Math.max(box.w / APARTMENT_PX.w, box.h / APARTMENT_PX.h);
  const ox = (box.w - APARTMENT_PX.w * scale) / 2;
  const oy = (box.h - APARTMENT_PX.h * scale) / 2;
  return {
    left: ox + rect.x * scale,
    top: oy + rect.y * scale,
    width: rect.w * scale,
    height: rect.h * scale,
  };
}

/** Gifts sitting in the cabinet painted on the apartment wall. Twelve spots, filled in the order they were given. */
export function KeepsakeShelf({ stage }: { stage: HTMLElement | null }) {
  const location = useCompanion((s) => s.location);
  const owned = useCompanion((s) => s.keepsakes);
  const [box, setBox] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!stage) return;
    const measure = () => {
      const rect = stage.getBoundingClientRect();
      setBox({ w: rect.width, h: rect.height });
    };
    measure();
    const watcher = new ResizeObserver(measure);
    watcher.observe(stage);
    return () => watcher.disconnect();
  }, [stage]);

  if (location !== "apartment" || !box.w || !owned?.length) return null;
  return (
    <div className="pointer-events-none absolute inset-0 z-[8]">
      {owned.slice(0, CUBBIES.length).map((id, index) => {
        const item = keepsakeById(id);
        const cubby = CUBBIES[index];
        if (!item || !cubby) return null;
        const spot = place(box, cubby);
        const inset = Math.min(spot.width, spot.height) * 0.1;
        return (
          <img
            key={id}
            src={item.image}
            alt={item.name}
            title={item.name}
            className="pointer-events-auto absolute object-contain"
            style={{
              left: spot.left + inset,
              top: spot.top + inset,
              width: Math.max(1, spot.width - inset * 2),
              height: Math.max(1, spot.height - inset * 2),
            }}
          />
        );
      })}
    </div>
  );
}

const SPARKS = [
  { left: "18%", top: "22%", dx: "-36px", dy: "-48px", delay: "0s" },
  { left: "78%", top: "18%", dx: "42px", dy: "-40px", delay: "0.15s" },
  { left: "12%", top: "62%", dx: "-48px", dy: "16px", delay: "0.4s" },
  { left: "84%", top: "58%", dx: "46px", dy: "22px", delay: "0.25s" },
  { left: "30%", top: "12%", dx: "-12px", dy: "-52px", delay: "0.55s" },
  { left: "64%", top: "10%", dx: "18px", dy: "-56px", delay: "0.05s" },
  { left: "22%", top: "78%", dx: "-28px", dy: "36px", delay: "0.7s" },
  { left: "74%", top: "80%", dx: "30px", dy: "40px", delay: "0.35s" },
  { left: "48%", top: "8%", dx: "0px", dy: "-60px", delay: "0.45s" },
  { left: "50%", top: "86%", dx: "8px", dy: "48px", delay: "0.2s" },
  { left: "8%", top: "40%", dx: "-52px", dy: "-8px", delay: "0.6s" },
  { left: "90%", top: "38%", dx: "54px", dy: "-6px", delay: "0.1s" },
];

/** RPG item-get: the gift holds the screen for three seconds, then shrinks away. */
export function KeepsakeReveal() {
  const queue = useCompanion((s) => s.keepsakeQueue);
  const shift = useCompanion((s) => s.shiftKeepsake);
  const id = queue?.[0] ?? null;
  const item = keepsakeById(id);
  const [leaving, setLeaving] = useState(false);
  const token = useRef(id);

  const sparks = useMemo(() => SPARKS, []);

  useEffect(() => {
    if (!id) return;
    token.current = id;
    setLeaving(false);
    const hold = window.setTimeout(() => {
      if (token.current === id) setLeaving(true);
    }, 3000);
    const done = window.setTimeout(() => {
      if (token.current === id) shift();
    }, 3600);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
    };
  }, [id, shift]);

  if (!item) return null;
  const from = item.girl === "victoria" ? "Victoria" : item.girl === "ronnie" ? "Ronnie" : item.girl === "mira" ? "Mira" : "Izzy";
  return (
    <div className="fixed inset-0 z-[88] flex items-center justify-center bg-black/55 px-6" role="status" aria-live="polite">
      <div className={leaving ? "keepsake-leave relative flex max-w-sm flex-col items-center" : "relative flex max-w-sm flex-col items-center"}>
        {sparks.map((spark, index) => (
          <span
            key={index}
            className="keepsake-spark pointer-events-none absolute size-2 rounded-full bg-cream shadow-[0_0_10px_2px_rgba(243,234,220,0.85)]"
            style={{
              left: spark.left,
              top: spark.top,
              animationDelay: spark.delay,
              ["--dx" as string]: spark.dx,
              ["--dy" as string]: spark.dy,
            }}
          />
        ))}
        <p className="font-display text-xs uppercase tracking-[0.28em] text-cream">Item acquired</p>
        <img src={item.image} alt="" className="mt-4 h-[min(46dvh,420px)] w-auto max-w-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.45)]" />
        <p className="mt-4 text-center font-display text-2xl text-cream">{item.name}</p>
        <p className="mt-1 text-center text-sm text-cream/80">From {from}</p>
      </div>
    </div>
  );
}
