import { GIRLS } from "./cast";
import { SCENE_NAME_RE } from "./scene";
import type { GirlId } from "./types";

/** Each girl keeps a 1–10 opinion of each other girl. 5 is the floor for sharing a harem. */
export const OPINION_MIN = 1;
export const OPINION_MAX = 10;
export const OPINION_START = 5;
export const HAREM_OPINION = 5;
/** Positive shifts stop here, per directed pair, per calendar day. */
export const OPINION_DAILY_GAIN = 2;

export type OpinionMap = Record<GirlId, Record<GirlId, number>>;
export type OpinionGain = Record<string, number>;

export function opinionKey(from: GirlId, toward: GirlId) {
  return `${from}>${toward}`;
}

/** Familiarity at a new game. Not whether they like each other. */
const STARTING: Record<GirlId, Partial<Record<GirlId, number>>> = {
  izzy: { ronnie: 4, victoria: 2, mira: 3 },
  victoria: { ronnie: 8, izzy: 5, mira: 3 },
  ronnie: { victoria: 8, izzy: 4, mira: 5 },
  mira: { ronnie: 5, victoria: 3, izzy: 2 },
};

export function blankOpinions(): OpinionMap {
  const out = {} as OpinionMap;
  for (const from of GIRLS) {
    out[from] = {} as Record<GirlId, number>;
    for (const toward of GIRLS) {
      if (from === toward) continue;
      out[from][toward] = STARTING[from][toward] ?? OPINION_START;
    }
  }
  return out;
}

/** An old three-girl save still on the flat 5s. New games use the familiarity table, including Mira. */
export function isFlatFive(raw: unknown) {
  if (!raw || typeof raw !== "object") return false;
  const table = raw as Record<string, unknown>;
  if (table.mira) return false;
  const legacy: [GirlId, GirlId][] = [
    ["izzy", "victoria"],
    ["izzy", "ronnie"],
    ["victoria", "izzy"],
    ["victoria", "ronnie"],
    ["ronnie", "izzy"],
    ["ronnie", "victoria"],
  ];
  for (const [from, toward] of legacy) {
    const row = table[from];
    const value = row && typeof row === "object" ? (row as Record<string, unknown>)[toward] : undefined;
    if (value !== 5) return false;
  }
  return true;
}

function clamp(n: number) {
  return Math.max(OPINION_MIN, Math.min(OPINION_MAX, Math.round(n)));
}

export function readOpinions(raw: unknown): OpinionMap {
  const base = blankOpinions();
  if (!raw || typeof raw !== "object") return base;
  const table = raw as Record<string, unknown>;
  for (const from of GIRLS) {
    const row = table[from];
    if (!row || typeof row !== "object") continue;
    for (const toward of GIRLS) {
      if (from === toward) continue;
      const value = (row as Record<string, unknown>)[toward];
      if (typeof value === "number" && Number.isFinite(value)) base[from][toward] = clamp(value);
    }
  }
  return base;
}

export function readOpinionGain(raw: unknown): OpinionGain {
  if (!raw || typeof raw !== "object") return {};
  const out: OpinionGain = {};
  for (const [key, value] of Object.entries(raw)) {
    if (typeof value === "number" && value > 0) out[key] = Math.min(OPINION_DAILY_GAIN, Math.round(value));
  }
  return out;
}

export function opinionOf(map: OpinionMap, from: GirlId, toward: GirlId) {
  if (from === toward) return OPINION_MAX;
  return map[from]?.[toward] ?? OPINION_START;
}

/** Negative shifts are not capped by the daily gain. Positive shifts are. */
export function shiftOpinion(
  map: OpinionMap,
  gain: OpinionGain,
  from: GirlId,
  toward: GirlId,
  delta: number,
): { map: OpinionMap; gain: OpinionGain; applied: number } {
  if (from === toward || !delta) return { map, gain, applied: 0 };
  const current = opinionOf(map, from, toward);
  let applied = Math.round(delta);
  if (applied > 0) {
    const key = opinionKey(from, toward);
    const used = gain[key] ?? 0;
    const room = Math.max(0, OPINION_DAILY_GAIN - used);
    applied = Math.min(applied, room);
    if (applied <= 0) return { map, gain, applied: 0 };
    gain = { ...gain, [key]: used + applied };
  }
  const next = clamp(current + applied);
  applied = next - current;
  if (!applied) return { map, gain, applied: 0 };
  return {
    map: { ...map, [from]: { ...map[from], [toward]: next } },
    gain,
    applied,
  };
}

/** A calm shared scene. +1 each way, still inside the daily cap. */
export function warmScene(map: OpinionMap, gain: OpinionGain, present: readonly GirlId[]) {
  const here = present.filter((id, i, all) => all.indexOf(id) === i);
  let next = map;
  let earned = gain;
  if (here.length < 2) return { map: next, gain: earned };
  for (const from of here) {
    for (const toward of here) {
      if (from === toward) continue;
      const step = shiftOpinion(next, earned, from, toward, 1);
      next = step.map;
      earned = step.gain;
    }
  }
  return { map: next, gain: earned };
}

/** Walk-in on someone else's date, or catching them together. The steep drop. */
export const WALK_IN_DROP = 5;
/** A petty remark or a small misunderstanding. */
export const PETTY_DROP = 1;

/** Every directed pair in the set is at least 5. */
export function haremOpinionsOk(map: OpinionMap, involved: readonly GirlId[]) {
  const group = involved.filter((id, i, all) => all.indexOf(id) === i);
  for (const from of group) {
    for (const toward of group) {
      if (from === toward) continue;
      if (opinionOf(map, from, toward) < HAREM_OPINION) return false;
    }
  }
  return true;
}

/**
 * A proper group invitation names the arrangement and who is already in it.
 * "Be my girlfriend" with none of that is not this.
 */
export function disclosedHarem(text: string, others: readonly GirlId[]) {
  if (!others.length) return true;
  const group =
    /\b(harem|both of you|all of you|join us|with us|the others|not only you|not just you|already (?:with|together)|relationship with (?:us|them|both)|we(?:'re| are) together)\b/i.test(
      text,
    );
  if (!group) return false;
  if (others.length === 1 && /\b(both|the other|her|she)\b/i.test(text)) return true;
  return others.every((id) => SCENE_NAME_RE[id].test(text));
}

export function opinionBrief(map: OpinionMap) {
  const bits: string[] = [];
  for (const from of GIRLS) {
    for (const toward of GIRLS) {
      if (from === toward) continue;
      bits.push(`${from}→${toward} ${opinionOf(map, from, toward)}`);
    }
  }
  return bits.join(", ");
}
