import type { Expression, LocationId, SprayKind } from "./types";

/** Ronnie's art. Transparent WebP keyed from the JPGs by scripts/ronnie_portraits.py. Bio is in ronnie-bio.ts. */
export const RONNIE_ACTIVE = true;

const EXPRESSIONS: Expression[] = [
  "embarrassed",
  "happy",
  "idle",
  "flirty",
  "laughing",
  "suspicious",
  "shy",
  "angry",
  "infodump",
  "aroused",
  "thinking",
  "scheming",
];

function set(folder: "casual" | "athletic"): Record<Expression, string> {
  const out = {} as Record<Expression, string>;
  for (const expression of EXPRESSIONS) {
    out[expression] = `/art/ronnie/${folder}/${expression}.webp`;
  }
  out.spray = `/art/ronnie/${folder}/spray-angry.webp`;
  return out;
}

export const RONNIE_CASUAL = set("casual");
export const RONNIE_ATHLETIC = set("athletic");

export const RONNIE_POSES = {
  squat: "/art/ronnie/athletic/squat.webp",
  yoga: "/art/ronnie/athletic/yoga.webp",
} as const;

/** Gym, studio, field, and trail get the track kit. Everywhere else is the cargo-pants look. No lingerie art yet. */
const ATHLETIC_AT = new Set<LocationId>(["gym", "yogaStudio", "field", "trail"]);

export function ronnieOutfit(place: LocationId | undefined): "casual" | "athletic" {
  return place && ATHLETIC_AT.has(place) ? "athletic" : "casual";
}

const SPRAY_FILE: Record<Exclude<SprayKind, "none">, string> = {
  angry: "spray-angry",
  consensual: "spray-consent",
  defensive: "spray-defensive",
  dominant: "spray-dominant",
};

export type RonniePose = "squat" | "yoga" | null;

/**
 * Squat: in the gym, on her idle/showing-off faces. Yoga: only while she is instructing at the studio.
 */
export function ronniePose(place: LocationId | undefined, expression: Expression, instructing: boolean): RonniePose {
  if (place === "yogaStudio" && instructing && (expression === "idle" || expression === "happy")) return "yoga";
  if (place === "gym" && (expression === "idle" || expression === "scheming")) return "squat";
  return null;
}

export function ronnieSrc(
  expression: Expression,
  sprayKind: SprayKind,
  place: LocationId | undefined,
  instructing = false,
): string {
  const folder = ronnieOutfit(place);
  if (sprayKind !== "none") return `/art/ronnie/${folder}/${SPRAY_FILE[sprayKind]}.webp`;
  const pose = ronniePose(place, expression, instructing);
  if (pose) return RONNIE_POSES[pose];
  const set = folder === "athletic" ? RONNIE_ATHLETIC : RONNIE_CASUAL;
  return set[expression] ?? set.idle;
}
