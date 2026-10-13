import { cn } from "@/lib/utils";

const SQUIGGLES = [
  "M12 96 C10 78 22 70 16 52 C10 34 24 26 18 8",
  "M28 98 C32 80 20 72 26 50 C32 30 18 22 24 4",
  "M44 94 C40 76 52 68 46 46 C40 28 54 18 48 2",
  "M8 90 C18 74 6 60 14 42 C22 24 8 14 12 0",
  "M36 92 C28 74 40 62 32 44 C24 26 38 14 30 2",
];

function Line({
  i,
  className,
}: {
  i: number;
  className?: string;
}) {
  const d = SQUIGGLES[i % SQUIGGLES.length];
  return (
    <svg
      className={cn("stink-float", className)}
      viewBox="0 0 56 100"
      aria-hidden
    >
      <path d={d} />
      <path d={d} className="stink-ghost" />
    </svg>
  );
}

export function StinkLines({ variant }: { variant: "body" | "screen" }) {
  if (variant === "screen") {
    return (
      <div className="stink-screen" aria-hidden>
        <div className="stink-mist" />
        {Array.from({ length: 12 }, (_, i) => (
          <Line
            key={i}
            i={i}
            className={`stink-screen-n${i}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="stink-body" aria-hidden>
      {Array.from({ length: 7 }, (_, i) => (
        <Line key={i} i={i} className={`stink-body-n${i}`} />
      ))}
      <span className="stink-puff stink-puff-a" />
      <span className="stink-puff stink-puff-b" />
      <span className="stink-puff stink-puff-c" />
    </div>
  );
}
