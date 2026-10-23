import type { Bond, GameMode } from "./types";
import { clamp } from "@/lib/utils";
import { scaleSlowGain, slowCeiling } from "./dates";

export const TRUST_MIN = -25;
export const TRUST_MAX = 100;
export const BONDING_MIN = 0;
export const BONDING_MAX = 100;
/** One reply can move a side character's meters this far. */
export const REPLY_DELTA_MIN = -12;
export const REPLY_DELTA_MAX = 8;

export type Pace = { mode: GameMode; dates: number };

function paced(current: number, delta: number, min: number, max: number, pace?: Pace) {
  const d = pace?.mode === "slow" ? scaleSlowGain(delta) : delta;
  let next = clamp(current + d, min, max);
  if (pace?.mode === "slow" && next > current) next = Math.min(next, slowCeiling(pace.dates));
  return next;
}

export function applyTrust(current: number, delta: number, pace?: Pace) {
  return paced(current, delta, TRUST_MIN, TRUST_MAX, pace);
}

export function applyBonding(current: number, delta: number, pace?: Pace) {
  return paced(current, delta, BONDING_MIN, BONDING_MAX, pace);
}

export function bondFromScores(trust: number, bonding: number, romantic: boolean): Bond {
  if (romantic) return "romantic";
  if (bonding >= 80 && trust >= 50) return "close";
  if (bonding >= 55 && trust >= 28) return "friend";
  if (bonding >= 28) return "acquaintance";
  return "stranger";
}

/** @deprecated use bondFromScores */
export function bondFromTrust(trust: number, romantic: boolean, bonding = trust): Bond {
  return bondFromScores(trust, bonding, romantic);
}

export function bondLabel(bond: Bond) {
  switch (bond) {
    case "stranger":
      return "Stranger";
    case "acquaintance":
      return "Getting there";
    case "friend":
      return "Friend";
    case "close":
      return "Close";
    case "romantic":
      return "Together";
  }
}

export function trustTone(trust: number) {
  if (trust < 0) return "danger";
  if (trust >= 100) return "romance";
  if (trust >= 55) return "warm";
  return "neutral";
}