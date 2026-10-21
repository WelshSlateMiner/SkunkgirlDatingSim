import type { Expression, FxEvent, GameState, GirlId } from "./types";

/**
 * Scene infrastructure for up to three skunkgirls at once.
 * Izzy, Victoria, Ronnie, and Mira can all be in `present`. A scene never holds more than three.
 */

export type SceneGirl = GirlId | "ronnie";

export const MAX_SCENE_GIRLS = 3;

/** Left-to-right order on screen. */
export const SCENE_ORDER: readonly SceneGirl[] = ["izzy", "victoria", "ronnie", "mira"];

export const SCENE_NAMES: Record<SceneGirl, string> = {
  izzy: "Izzy",
  victoria: "Victoria",
  ronnie: "Ronnie",
  mira: "Mira",
};

/**
 * Standing height in inches. Vicky is 5'8". Izzy's bio says average and gives no number,
 * so she is the US adult-woman average, 5'4". Mira is 5'3". Ronnie is 5'2".
 */
export const GIRL_INCHES: Record<GirlId, number> = {
  victoria: 68,
  izzy: 64,
  mira: 63,
  ronnie: 62,
};

/** 1 when she is alone. In a group, a fraction of the tallest girl present. Feet stay aligned. */
export function spriteScale(girl: GirlId, present: readonly GirlId[]) {
  const here = present.filter((id, i, all) => all.indexOf(id) === i);
  if (here.length < 2) return 1;
  const tallest = Math.max(...here.map((id) => GIRL_INCHES[id] ?? GIRL_INCHES.izzy));
  return (GIRL_INCHES[girl] ?? GIRL_INCHES.izzy) / tallest;
}

/** Unique, sorted by SCENE_ORDER (unknown ids last, in given order), capped at MAX_SCENE_GIRLS. */
export function sceneOrder<T extends string>(ids: readonly T[]): T[] {
  const unique = ids.filter((id, i, all) => all.indexOf(id) === i);
  const rank = (id: string) => {
    const i = (SCENE_ORDER as readonly string[]).indexOf(id);
    return i < 0 ? SCENE_ORDER.length : i;
  };
  return [...unique].sort((a, b) => rank(a) - rank(b)).slice(0, MAX_SCENE_GIRLS);
}

export function sceneGirls(state: Pick<GameState, "present" | "izzyHere">): SceneGirl[] {
  if (state.izzyHere === false) return [];
  return sceneOrder((state.present ?? []) as SceneGirl[]);
}

export function sceneHas(state: Pick<GameState, "present" | "izzyHere">, girl: SceneGirl): boolean {
  return sceneGirls(state).includes(girl);
}

/** Every girl in the scene except this one. The general form of otherGirl. */
export function sceneOthers<T extends string>(present: readonly T[], girl: string): T[] {
  return sceneOrder(present).filter((id) => id !== girl);
}

export function sceneNames(ids: readonly SceneGirl[]): string {
  const names = sceneOrder(ids).map((id) => SCENE_NAMES[id]);
  if (names.length <= 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

/** Solo and group share one height class. A group then scales each girl with --sprite. Mobile is shorter so the header does not cover her head. */
export function sceneLayout(count: number) {
  const n = Math.max(1, Math.min(MAX_SCENE_GIRLS, count));
  const height =
    "h-[calc((100dvh-22rem)*var(--sprite,1))] sm:h-[calc(min(92dvh,980px)*var(--sprite,1))] w-auto max-w-none";
  if (n >= 3) return { width: "w-auto shrink-0 -mx-[16%]", height };
  if (n === 2) return { width: "w-auto shrink-0 -mx-[8%]", height };
  return { width: "w-full", height: "h-[calc((100dvh-22rem)*var(--sprite,1))] sm:h-[calc(min(92dvh,980px)*var(--sprite,1))] max-w-[min(100%,640px)]" };
}

/**
 * Who has farted since the scene's girls last changed to just one.
 * Used for "another skunkgirl farted in the scene" bonuses (Ronnie's +1 rival modifier).
 */
export type SceneFartLog = string[];

export function logSceneFarts(log: readonly string[], present: readonly string[], farted: readonly string[]): string[] {
  const here = sceneOrder(present);
  if (here.length <= 1) return [];
  return sceneOrder([...log.filter((id) => here.includes(id)), ...farted.filter((id) => here.includes(id))]);
}

export function anotherGirlFarted(log: readonly string[], girl: string): boolean {
  return log.some((id) => id !== girl);
}

export function readSceneFarts(raw: unknown): string[] {
  return Array.isArray(raw) ? raw.filter((id): id is string => typeof id === "string").slice(0, MAX_SCENE_GIRLS) : [];
}

/** One extra speaker's part of a reply, for a third girl beyond the focus/other fields. */
export interface SceneVoice<G extends string = SceneGirl> {
  girl: G;
  dialogue: string;
  expression?: Expression;
  fx?: FxEvent;
  sprayKind?: "angry" | "consensual" | "defensive" | "dominant";
  trustDelta?: number;
  bondingDelta?: number;
}

/** Keep only voices for girls actually in the scene, excluding the ones already covered. */
export function sceneVoices<G extends string>(
  voices: readonly SceneVoice<G>[] | undefined,
  present: readonly G[],
  covered: readonly G[],
): SceneVoice<G>[] {
  if (!voices?.length) return [];
  const here = sceneOrder(present);
  const seen = new Set<G>(covered);
  const out: SceneVoice<G>[] = [];
  for (const voice of voices) {
    if (!here.includes(voice.girl) || seen.has(voice.girl)) continue;
    seen.add(voice.girl);
    out.push(voice);
  }
  return out;
}

/** Prompt line naming who is in the scene and who speaks in which field. */
export function sceneCastBrief(present: readonly SceneGirl[], focus: SceneGirl): string {
  const here = sceneOrder(present);
  if (here.length <= 2) return "";
  const extras = sceneOthers(here, focus).slice(1);
  return `SCENE: ${sceneNames(here)} are all here. ${SCENE_NAMES[focus]} answers in dialogue. ${SCENE_NAMES[sceneOthers(here, focus)[0]!]} uses the other fields. ${extras.map((id) => SCENE_NAMES[id]).join(", ")} speak through extras, one entry each.`;
}

const SPRAYS = new Set(["angry", "consensual", "defensive", "dominant"]);
const FX = new Set(["none", "fart", "spray", "blush", "hearts", "laugh"]);
const EXPR = new Set([
  "idle", "happy", "flirty", "laughing", "suspicious", "shy", "angry", "embarrassed",
  "infodump", "aroused", "thinking", "scheming", "spray",
]);

/** Parse the model's `extras` array. Unknown girls are kept as strings; the scene filter drops them later. */
export function parseExtras(raw: unknown): SceneVoice<string>[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const out: SceneVoice<string>[] = [];
  for (const item of raw.slice(0, MAX_SCENE_GIRLS)) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    if (typeof o.girl !== "string") continue;
    const clip = (n: unknown) => Math.max(-12, Math.min(8, Math.round(Number(n ?? 0) || 0)));
    out.push({
      girl: o.girl.toLowerCase(),
      dialogue: typeof o.dialogue === "string" ? o.dialogue.slice(0, 900) : "",
      expression: EXPR.has(String(o.expression)) ? (o.expression as Expression) : undefined,
      fx: FX.has(String(o.fx)) ? (o.fx as FxEvent) : "none",
      sprayKind: SPRAYS.has(String(o.sprayKind)) ? (o.sprayKind as SceneVoice["sprayKind"]) : undefined,
      trustDelta: clip(o.trustDelta),
      bondingDelta: clip(o.bondingDelta),
    });
  }
  return out.length ? out : undefined;
}

export interface ExtraOutcome<G extends string> {
  girl: G;
  text: string;
  expression: Expression;
  fx: "fart" | "spray" | undefined;
  sprayKind: "angry" | "consensual" | "defensive" | "dominant" | undefined;
  trustDelta: number;
  bondingDelta: number;
  blocked: boolean;
}

/**
 * Third-and-later speakers for one turn. Same rules the store applies to the "other" girl:
 * held gas drops a fart (and a line about it), a dry gland blocks a spray, silence stays silent.
 */
export function resolveSceneExtras<G extends string>(opts: {
  voices: readonly SceneVoice<G>[] | undefined;
  present: readonly G[];
  covered: readonly G[];
  holdGas: boolean;
  dry: (girl: G) => boolean;
  mentionsFart: (text: string) => boolean;
  dryLine: (girl: G) => string;
}): ExtraOutcome<G>[] {
  const out: ExtraOutcome<G>[] = [];
  for (const voice of sceneVoices(opts.voices, opts.present, opts.covered)) {
    let fx = voice.fx === "fart" || voice.fx === "spray" ? voice.fx : undefined;
    let line = voice.dialogue.trim();
    let blocked = false;
    if (fx === "fart" && opts.holdGas) {
      fx = undefined;
      if (opts.mentionsFart(line)) line = "";
    }
    if (fx === "spray" && opts.dry(voice.girl)) {
      fx = undefined;
      blocked = true;
    } else if (fx === "spray" && opts.holdGas) fx = undefined;
    if (!line && !fx && !blocked) continue;
    out.push({
      girl: voice.girl,
      text: blocked ? opts.dryLine(voice.girl) : line || "Mm.",
      expression: blocked ? "shy" : fx === "spray" ? "spray" : (voice.expression ?? "idle"),
      fx,
      sprayKind: fx === "spray" ? (voice.sprayKind ?? "defensive") : undefined,
      trustDelta: voice.trustDelta ?? 0,
      bondingDelta: voice.bondingDelta ?? 0,
      blocked,
    });
  }
  return out;
}

/** Name and text color for a speaker role. */
export const SCENE_STYLE: Record<SceneGirl, string> = {
  izzy: "text-accent",
  victoria: "text-cream",
  ronnie: "text-sky-300",
  mira: "text-rose-300",
};

export function isGirlRole(role: string): role is SceneGirl {
  return role in SCENE_NAMES;
}

export function roleName(role: SceneGirl): string {
  return role === "izzy" ? "Izzy" : SCENE_NAMES[role];
}

/** JSON contract line for the prompt when 3+ girls are here. */
export function extrasContract(present: readonly SceneGirl[], focus: SceneGirl): string {
  const here = sceneOrder(present);
  if (here.length <= 2) return "";
  const extra = sceneOthers(here, focus).slice(1);
  return `EXTRAS JSON: add "extras": [{"girl": "${extra.join('" | "')}", "dialogue": string, "expression": string, "fx": "none"|"fart"|"spray", "sprayKind": "angry"|"consensual"|"defensive"|"dominant"|null, "trustDelta": number, "bondingDelta": number}], one per extra girl who speaks. Leave a girl out to keep her quiet. Do not set fx fart unless she actually lets one go; the game rolls.`;
}

/** Names the player can use for each girl. */
export const SCENE_NAME_RE: Record<SceneGirl, RegExp> = {
  izzy: /\b(izzy|isabella)\b/i,
  victoria: /\b(vicky|victoria)\b/i,
  ronnie: /\b(ronnie|veronica)\b/i,
  mira: /\b(mira)\b/i,
};

/** Short offline lines for a girl who is in the scene but not the focus or the first other. */
const EXTRA_FILLER: Record<SceneGirl, string[]> = {
  izzy: ["Hey. Still here. Still listening.", "Okay, I have opinions, but go on."],
  victoria: ["I'm listening. Go on.", "Mm. Noted."],
  ronnie: ["Yeah, I heard that. Keep up.", "Ha. Okay. I'm in."],
  mira: ["I'm still here.", "Hm. Go on."],
};

/**
 * Offline fallback for third-and-later girls. Only the ones who were named or addressed as a group speak.
 * Returns undefined with two or fewer girls, so 1- and 2-girl scenes are untouched.
 */
export function localSceneExtras<G extends string>(
  present: readonly G[],
  focus: G,
  text: string,
  filler: (girl: G) => string[] = (girl) => EXTRA_FILLER[girl as SceneGirl] ?? ["Mm."],
  nameRe: (girl: G) => RegExp | undefined = (girl) => SCENE_NAME_RE[girl as SceneGirl],
  group = /\b(you guys|you two|both of you|you both|ladies|all of you|everyone|y'?all|you all|you girls|all three)\b/i,
): SceneVoice<G>[] | undefined {
  const here = sceneOrder(present);
  if (here.length <= 2) return undefined;
  const extra = sceneOthers(here, focus).slice(1);
  const everyone = group.test(text);
  const out = extra
    .filter((girl) => everyone || Boolean(nameRe(girl)?.test(text)))
    .map((girl) => {
      const lines = filler(girl);
      return { girl, dialogue: lines[text.length % lines.length] ?? "Mm.", fx: "none" as FxEvent, expression: "idle" as Expression };
    });
  return out.length ? out : undefined;
}
