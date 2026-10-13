import { resolvePlace } from "./locations";
import type { GameState, LocationId, SprayKind, TimeOfDay, Weekday } from "./types";

export const WEEKDAYS: Weekday[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const TIMES: TimeOfDay[] = ["Morning", "Afternoon", "Evening", "Night"];

export function isCouple(state: Pick<GameState, "flags" | "bond">) {
  return state.flags.romanceAccepted || state.bond === "romantic";
}

export function advanceTime(time: TimeOfDay): { time: TimeOfDay; dayRoll: boolean } {
  if (time === "Morning") return { time: "Afternoon", dayRoll: false };
  if (time === "Afternoon") return { time: "Evening", dayRoll: false };
  if (time === "Evening") return { time: "Night", dayRoll: false };
  return { time: "Morning", dayRoll: true };
}

export function nextWeekday(day: Weekday): Weekday {
  const i = WEEKDAYS.indexOf(day);
  return WEEKDAYS[(i + 1) % WEEKDAYS.length] ?? "Monday";
}

export function emptySprays(): GameState["daySprays"] {
  return { angry: 0, defensive: 0, consensual: 0, dominant: 0 };
}

const TOPIC_RULES: [RegExp, string][] = [
  [/evangelion|\beva\b|asuka|anime|mymy|ongezellig|neko/, "anime"],
  [/axis|allies|board game|tabletop|hex/, "board games"],
  [/hoi4|jak|daxter|ratchet|war thunder|video game|bionicle/, "video games"],
  [/history|rome|war|logistics|treaty/, "history"],
  [/taco|burrito|mexican|burger|shake|food|hungry|beans|eat/, "food"],
  [/tether|chvrch|sabrina|chappell|music|song|playlist/, "music"],
  [/forest|trail|hike|woods|moss|skunk biology|scent gland/, "the woods"],
  [/dorm|apartment|home|room/, "going home"],
  [/fart|gas|spray|stink|musk|gassy/, "her skunk side"],
  [/childhood|foster|appalach|family|growing up|adopt/, "her past"],
];

export function topicsFrom(text: string, existing: string[]) {
  const next = [...existing];
  for (const [re, label] of TOPIC_RULES) {
    if (next.includes(label)) continue;
    if (re.test(text)) next.push(label);
  }
  return next.slice(0, 8);
}

export function parseTimeOfDay(text: string): TimeOfDay | null {
  const t = text.toLowerCase();
  if (/\bmorning\b|\bam\b|before class|breakfast/.test(t)) return "Morning";
  if (/\bafternoon\b|after class|lunch/.test(t)) return "Afternoon";
  if (/\bevening\b|sunset|dinner|dusk/.test(t)) return "Evening";
  if (/\bnight\b|tonight|late\b/.test(t)) return "Night";
  return null;
}

export function parseMeetPlace(text: string): LocationId | null {
  return resolvePlace(text);
}

export function likesPlayer(state: Pick<GameState, "trust" | "bonding">) {
  return state.trust >= 18 && state.bonding >= 12;
}

export function bumpSpray(tally: GameState["daySprays"], kind: SprayKind) {
  if (kind === "none") return tally;
  return { ...tally, [kind]: tally[kind] + 1 };
}
