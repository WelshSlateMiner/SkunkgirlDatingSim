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

function set(folder: "casual" | "athletic" | "home"): Record<Expression, string> {
  const out = {} as Record<Expression, string>;
  for (const expression of EXPRESSIONS) {
    out[expression] = `/art/ronnie/${folder}/${expression}.webp`;
  }
  out.spray = `/art/ronnie/${folder}/spray-angry.webp`;
  return out;
}

export const RONNIE_CASUAL = set("casual");
export const RONNIE_ATHLETIC = set("athletic");
export const RONNIE_HOME = set("home");

export const RONNIE_POSES = {
  squat: "/art/ronnie/athletic/squat.webp",
  yoga: "/art/ronnie/athletic/yoga.webp",
} as const;

/** Gym, studio, field, and trail get the track kit. Her dorm and the apartment get the black sleep set. Everywhere else is the cargo-pants look. */
const ATHLETIC_AT = new Set<LocationId>(["gym", "yogaStudio", "field", "trail"]);
const HOME_AT = new Set<LocationId>(["ronnieDorm", "apartment"]);

export function ronnieOutfit(place: LocationId | undefined): "casual" | "athletic" | "home" {
  if (place && HOME_AT.has(place)) return "home";
  return place && ATHLETIC_AT.has(place) ? "athletic" : "casual";
}

/** Header name for the kit she is actually wearing. */
export function ronnieOutfitName(place: LocationId | undefined, dating = false): string {
  if (dating) return "Night Out";
  const kit = ronnieOutfit(place);
  if (kit === "athletic") return "Workout Gear";
  if (kit === "home") return "Dorm Set";
  return "Tomboy Chic";
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
  dating = false,
): string {
  if (dating) {
    const face = expression === "spray" || sprayKind !== "none" ? "angry" : expression;
    return `/art/ronnie/dress/${face}.webp`;
  }
  const folder = ronnieOutfit(place);
  if (sprayKind !== "none") return `/art/ronnie/${folder}/${SPRAY_FILE[sprayKind]}.webp`;
  const pose = folder === "home" ? null : ronniePose(place, expression, instructing);
  if (pose) return RONNIE_POSES[pose];
  const setFor = folder === "athletic" ? RONNIE_ATHLETIC : folder === "home" ? RONNIE_HOME : RONNIE_CASUAL;
  return setFor[expression] ?? setFor.idle;
}
