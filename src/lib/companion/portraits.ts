import type { Expression, GameFlags, GirlId, LocationId, OutfitId, SprayKind } from "./types";
import { ronnieSrc } from "./ronnie-art";
import { miraSrc } from "./mira-art";

const IZZY_OUTFITS: OutfitId[] = ["casual", "lounge", "campus", "work", "dress", "sleep", "lingerie", "asuka", "mymy"];

const SPRAY_FILE: Record<Exclude<SprayKind, "none">, string> = {
  angry: "spray-angry",
  consensual: "spray-consent",
  defensive: "spray-defensive",
  dominant: "spray-dominant",
};

function izzyFile(outfit: OutfitId, expression: Expression) {
  return `/art/izzy/${outfit}/${expression}.webp`;
}

export function sprayPortraitSrc(outfit: OutfitId, kind: SprayKind) {
  const file = kind === "none" ? "spray-angry" : SPRAY_FILE[kind];
  const folder = IZZY_OUTFITS.includes(outfit) ? outfit : "casual";
  return `/art/izzy/${folder}/${file}.webp`;
}

function victoriaFile(folder: "office" | "lingerie" | "gown", expression: Expression) {
  return `/art/victoria/${folder}/${expression}.webp`;
}

/** Home, the player's apartment, or any intimate scene. Not the office. */
export function victoriaLingerieOn(locationId: string, intimate: boolean) {
  return (
    intimate ||
    locationId === "vickyLiving" ||
    locationId === "vickyBedroom" ||
    locationId === "apartment"
  );
}

/** Osteria Vale is the table worth dressing for. */
export function victoriaGownOn(locationId: string | undefined) {
  return locationId === "italian";
}

export function portraitSrc(
  outfit: OutfitId,
  expression: Expression,
  sprayKind: SprayKind = "none",
  girl: GirlId = "izzy",
  lingerie = false,
  place?: LocationId,
  instructing = false,
  dating = false,
) {
  if (girl === "ronnie") return ronnieSrc(expression, sprayKind, place, instructing, dating);
  if (girl === "mira") return miraSrc(expression, sprayKind, place, dating);
  if (girl === "victoria") {
    if (lingerie && !dating) {
      if (sprayKind !== "none") return `/art/victoria/lingerie/${SPRAY_FILE[sprayKind]}.webp`;
      return victoriaFile("lingerie", expression);
    }
    if (dating || victoriaGownOn(place)) {
      // The gown set has no spray drawings. The angry face is the fallback.
      if (sprayKind !== "none" || expression === "spray") return victoriaFile("gown", "angry");
      return victoriaFile("gown", expression);
    }
    if (sprayKind !== "none") return `/art/victoria/office/${SPRAY_FILE[sprayKind]}.webp`;
    if (expression === "spray") return "/art/victoria/office/spray.webp";
    return victoriaFile("office", expression);
  }
  if (sprayKind !== "none") return sprayPortraitSrc(outfit, sprayKind);
  if (expression === "spray") return sprayPortraitSrc(outfit, "angry");
  return izzyFile(outfit, expression);
}

export const OUTFIT_LABEL: Record<OutfitId, string> = {
  casual: "Lil' Stinker set",
  lounge: "Lounge hoodie",
  campus: "Campus hoodie",
  work: "Trailhead vest",
  dress: "Red date dress",
  sleep: "Sleep shirt",
  lingerie: "After hours",
  asuka: "Unit-02 night",
  mymy: "Mymy cosplay",
};

const OUTFITS = new Set<OutfitId>(Object.keys(OUTFIT_LABEL) as OutfitId[]);

export function asOutfitId(value: unknown): OutfitId | null {
  const raw = String(value ?? "").trim();
  return OUTFITS.has(raw as OutfitId) ? (raw as OutfitId) : null;
}

export function autoOutfit(
  locationDefault: OutfitId,
  trust: number,
  bond: string,
  locationId: string,
  flags?: Pick<GameFlags, "evaInterest" | "mymyInterest" | "romanceAccepted">,
): OutfitId {
  if (locationId === "vickyLiving" || locationId === "vickyBedroom") return "work";
  if (locationId === "dorm") {
    const intimate = bond === "romantic" || Boolean(flags?.romanceAccepted);
    if (intimate && flags?.evaInterest && trust >= 70) return "asuka";
    if (intimate && trust >= 92) return "lingerie";
    if (trust >= 70) return "sleep";
    return "lounge";
  }
  if (locationId === "sportingGoods") return "work";
  if (locationId === "theater" && trust >= 55) return "dress";
  if ((locationId === "mexican" || locationId === "burger") && trust >= 70) {
    return "dress";
  }
  if (locationId === "perfume" && trust >= 50) return "dress";
  return locationDefault;
}