import type { Expression, GameFlags, GirlId, OutfitId, SprayKind } from "./types";

const CASUAL: Record<Expression, string> = {
  embarrassed: "/art/izzy/embarrassed.webp",
  happy: "/art/izzy/happy.webp",
  idle: "/art/izzy/happy.webp",
  flirty: "/art/izzy/flirty.webp",
  laughing: "/art/izzy/laughing.webp",
  suspicious: "/art/izzy/suspicious.webp",
  shy: "/art/izzy/shy.webp",
  angry: "/art/izzy/angry.webp",
  infodump: "/art/izzy/infodump.webp",
  aroused: "/art/izzy/aroused.webp",
  thinking: "/art/izzy/thinking.webp",
  scheming: "/art/izzy/scheming.webp",
  spray: "/art/izzy/spray-angry-casual.webp",
};

const OUTFIT_IDLE: Record<OutfitId, string> = {
  casual: "/art/izzy/happy.webp",
  lounge: "/art/izzy/lounge.webp",
  campus: "/art/izzy/campus.webp",
  work: "/art/izzy/work.webp",
  dress: "/art/izzy/dress.webp",
  sleep: "/art/izzy/sleep.webp",
  lingerie: "/art/izzy/lingerie.webp",
  asuka: "/art/izzy/asuka.webp",
  mymy: "/art/izzy/mymy.webp",
};

const SPRAY_ANGRY: Record<OutfitId, string> = {
  casual: "/art/izzy/spray-angry-casual.webp",
  lounge: "/art/izzy/spray-angry-lounge.webp",
  campus: "/art/izzy/spray-angry-campus.webp",
  work: "/art/izzy/spray-angry-work.webp",
  dress: "/art/izzy/spray-angry-dress.webp",
  sleep: "/art/izzy/spray-angry-sleep.webp",
  lingerie: "/art/izzy/spray-angry-lingerie.webp",
  asuka: "/art/izzy/asuka-flirty.webp",
  mymy: "/art/izzy/mymy-flirty.webp",
};

const SPRAY_CONSENT: Record<OutfitId, string> = {
  casual: "/art/izzy/spray-consent-casual.webp",
  lounge: "/art/izzy/spray-consent-lounge.webp",
  campus: "/art/izzy/spray-consent-campus.webp",
  work: "/art/izzy/spray-consent-work.webp",
  dress: "/art/izzy/spray-consent-dress.webp",
  sleep: "/art/izzy/spray-consent-sleep.webp",
  lingerie: "/art/izzy/spray-consent-lingerie.webp",
  asuka: "/art/izzy/asuka-flirty.webp",
  mymy: "/art/izzy/mymy-flirty.webp",
};

const SPRAY_DEFENSIVE: Record<OutfitId, string> = {
  casual: "/art/izzy/spray-defensive-casual.webp",
  lounge: "/art/izzy/spray-defensive-lounge.webp",
  campus: "/art/izzy/spray-defensive-campus.webp",
  work: "/art/izzy/spray-defensive-work.webp",
  dress: "/art/izzy/spray-defensive-dress.webp",
  sleep: "/art/izzy/spray-defensive-sleep.webp",
  lingerie: "/art/izzy/spray-defensive-lingerie.webp",
  asuka: "/art/izzy/spray-defensive-asuka.webp",
  mymy: "/art/izzy/mymy-flirty.webp",
};

const SPRAY_DOMINANT = "/art/izzy/spray-dominant.webp";

export function sprayPortraitSrc(outfit: OutfitId, kind: SprayKind) {
  if (kind === "dominant") return SPRAY_DOMINANT;
  if (kind === "consensual") return SPRAY_CONSENT[outfit] ?? SPRAY_CONSENT.casual;
  if (kind === "defensive") return SPRAY_DEFENSIVE[outfit] ?? SPRAY_DEFENSIVE.casual;
  return SPRAY_ANGRY[outfit] ?? SPRAY_ANGRY.casual;
}

const VICTORIA: Record<Expression, string> = {
  embarrassed: "/art/victoria/embarrassed.webp",
  happy: "/art/victoria/happy.webp",
  idle: "/art/victoria/idle.webp",
  flirty: "/art/victoria/flirty.webp",
  laughing: "/art/victoria/laughing.webp",
  suspicious: "/art/victoria/suspicious.webp",
  shy: "/art/victoria/shy.webp",
  angry: "/art/victoria/angry.webp",
  infodump: "/art/victoria/infodump.webp",
  aroused: "/art/victoria/aroused.webp",
  thinking: "/art/victoria/thinking.webp",
  scheming: "/art/victoria/scheming.webp",
  spray: "/art/victoria/spray.webp",
};

const VICTORIA_LINGERIE: Record<Expression, string> = {
  embarrassed: "/art/victoria/lingerie/embarrassed.webp",
  happy: "/art/victoria/lingerie/happy.webp",
  idle: "/art/victoria/lingerie/idle.webp",
  flirty: "/art/victoria/lingerie/flirty.webp",
  laughing: "/art/victoria/lingerie/laughing.webp",
  suspicious: "/art/victoria/lingerie/suspicious.webp",
  shy: "/art/victoria/lingerie/shy.webp",
  angry: "/art/victoria/lingerie/angry.webp",
  infodump: "/art/victoria/lingerie/infodump.webp",
  aroused: "/art/victoria/lingerie/aroused.webp",
  thinking: "/art/victoria/lingerie/thinking.webp",
  scheming: "/art/victoria/lingerie/scheming.webp",
  spray: "/art/victoria/lingerie/spray.webp",
};

const VICTORIA_LINGERIE_SPRAY: Record<Exclude<SprayKind, "none">, string> = {
  angry: "/art/victoria/lingerie/spray-angry.webp",
  consensual: "/art/victoria/lingerie/spray-consent.webp",
  defensive: "/art/victoria/lingerie/spray-defensive.webp",
  dominant: "/art/victoria/lingerie/spray-dominant.webp",
};

/** Home, the player's apartment, or any intimate scene. Not the office. */
export function victoriaLingerieOn(locationId: string, intimate: boolean) {
  return (
    intimate ||
    locationId === "vickyLiving" ||
    locationId === "vickyBedroom" ||
    locationId === "apartment"
  );
}
const VICTORIA_SPRAY: Record<Exclude<SprayKind, "none">, string> = {
  angry: "/art/victoria/spray-angry.webp",
  consensual: "/art/victoria/spray-consent.webp",
  defensive: "/art/victoria/spray-defensive.webp",
  dominant: "/art/victoria/spray-dominant.webp",
};

export function portraitSrc(
  outfit: OutfitId,
  expression: Expression,
  sprayKind: SprayKind = "none",
  girl: GirlId = "izzy",
  lingerie = false,
) {
  if (girl === "victoria") {
    if (lingerie) {
      if (sprayKind !== "none") return VICTORIA_LINGERIE_SPRAY[sprayKind];
      if (expression === "spray") return VICTORIA_LINGERIE.spray;
      return VICTORIA_LINGERIE[expression] ?? VICTORIA_LINGERIE.idle;
    }
    if (sprayKind !== "none") return VICTORIA_SPRAY[sprayKind];
    if (expression === "spray") return VICTORIA.spray;
    return VICTORIA[expression] ?? VICTORIA.happy;
  }
  if (sprayKind !== "none") return sprayPortraitSrc(outfit, sprayKind);
  if (expression === "spray") return sprayPortraitSrc(outfit, "angry");
  if (outfit === "asuka" || outfit === "mymy") {
    const file = outfit === "asuka" ? "asuka" : "mymy";
    if (
      expression === "flirty" ||
      expression === "laughing" ||
      expression === "aroused" ||
      expression === "scheming"
    ) {
      return `/art/izzy/${file}-flirty.webp`;
    }
    return `/art/izzy/${file}.webp`;
  }
  if (outfit === "casual") return CASUAL[expression] ?? CASUAL.happy;
  if (expression !== "happy" && expression !== "idle") {
    return `/art/izzy/${outfit}-${expression}.webp`;
  }
  return OUTFIT_IDLE[outfit] ?? CASUAL.happy;
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
