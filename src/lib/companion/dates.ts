import { parseMeetPlace, parseTimeOfDay } from "./time";
import type { GameMode, LocationId } from "./types";

export function slowCeiling(dates: number) {
  if (dates >= 3) return 100;
  if (dates === 2) return 75;
  if (dates === 1) return 50;
  return 25;
}

export function scaleSlowGain(delta: number) {
  if (delta <= 0) return delta;
  return Math.max(1, Math.round(delta * 0.5));
}

const DATE_WORD =
  /\b(on a date|a date|date me|date night|take you out|ask you out|go out with me|this is a date|be a date)\b/i;

const TOMORROW = /\b(tomorrow|next day|the next morning|day after)\b/i;

const HIGH = new Set<LocationId>(["theater", "mexican", "trail", "perfume", "campus", "burger"]);
const MID = new Set<LocationId>([
  "animeStore",
  "tabletop",
  "gameStore",
  "fashion",
  "collectibles",
  "dorm",
  "apartment",
]);

export function isDateAsk(text: string) {
  return DATE_WORD.test(text);
}

export function dateScore(spots: LocationId[]) {
  if (!spots.length) return 0;
  const sum = spots.reduce((n, id) => n + (HIGH.has(id) ? 3 : MID.has(id) ? 2 : 1), 0);
  return sum / spots.length;
}

export function romanceGate(mode: GameMode, dates: number, spots: LocationId[]) {
  if (mode !== "slow") return { trust: 100, bonding: 70 };
  if (dates < 3) return { trust: 101, bonding: 101 };
  const q = dateScore(spots);
  if (q >= 2.4) return { trust: 85, bonding: 60 };
  if (q >= 1.8) return { trust: 92, bonding: 65 };
  return { trust: 100, bonding: 70 };
}

export function readDatePlan(text: string, invite: LocationId | null) {
  const when = parseTimeOfDay(text);
  const where = invite ?? parseMeetPlace(text);
  const tomorrow = TOMORROW.test(text);
  return { when, where, tomorrow };
}
