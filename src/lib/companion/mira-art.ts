import type { Expression, LocationId, SprayKind } from "./types";

/** Mira's drawn sets. Plaid-plus is the idol look. Private is the Calvin Klein set. */
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

function set(folder: "plaid" | "private"): Record<Expression, string> {
  const out = {} as Record<Expression, string>;
  for (const expression of EXPRESSIONS) {
    out[expression] = `/art/mira/${folder}/${expression}.png`;
  }
  out.spray = `/art/mira/${folder}/spray-angry.png`;
  return out;
}

export const MIRA_PLAID = set("plaid");
export const MIRA_PRIVATE = set("private");

const SPRAY_FILE: Record<Exclude<SprayKind, "none">, string> = {
  angry: "spray-angry",
  consensual: "spray-consent",
  defensive: "spray-defensive",
  dominant: "spray-dominant",
};

/** Dorm and the apartment, unless she is on a date. Dates stay in the idol set. */
const PRIVATE_AT = new Set<LocationId>(["miraDorm", "apartment"]);

export function miraPrivateOn(place: LocationId | undefined, dating = false) {
  return Boolean(place && !dating && PRIVATE_AT.has(place));
}

export function miraOutfitName(place: LocationId | undefined, dating = false) {
  return miraPrivateOn(place, dating) ? "Calvin Klein set" : "JPOP Idol";
}

export function miraSrc(
  expression: Expression,
  sprayKind: SprayKind = "none",
  place?: LocationId,
  dating = false,
) {
  const folder = miraPrivateOn(place, dating) ? "private" : "plaid";
  if (sprayKind !== "none") return `/art/mira/${folder}/${SPRAY_FILE[sprayKind]}.png`;
  const sheet = folder === "private" ? MIRA_PRIVATE : MIRA_PLAID;
  return sheet[expression] ?? sheet.idle;
}
