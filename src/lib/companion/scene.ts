import type { Expression, FxEvent, GameState, GirlId } from "./types";

/**
 * Scene infrastructure for up to three skunkgirls at once.
 * "ronnie" is a valid SceneGirl so the plumbing is ready for her, but nothing can put her
 * in `present` yet (that is GirlId only), so she never appears in game.
 * Izzy and Victoria keep using the existing two-girl focus/other fields; these helpers work for any count.
 */

export type SceneGirl = GirlId | "ronnie";

export const MAX_SCENE_GIRLS = 3;

/** Left-to-right order on screen. */
export const SCENE_ORDER: readonly SceneGirl[] = ["izzy", "victoria", "ronnie"];

export const SCENE_NAMES: Record<SceneGirl, string> = {
  izzy: "Izzy",
  victoria: "Victoria",
  ronnie: "Ronnie",
};

/** Unique, sorted by SCENE_ORDER, capped at MAX_SCENE_GIRLS. */
export function sceneOrder<T extends SceneGirl>(ids: readonly T[]): T[] {
  const unique = ids.filter((id, i, all) => all.indexOf(id) === i);
  const rank = (id: SceneGirl) => {
    const i = SCENE_ORDER.indexOf(id);
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
export function sceneOthers<T extends SceneGirl>(present: readonly T[], girl: SceneGirl): T[] {
  return sceneOrder(present).filter((id) => id !== girl);
}

export function sceneNames(ids: readonly SceneGirl[]): string {
  const names = sceneOrder(ids).map((id) => SCENE_NAMES[id]);
  if (names.length <= 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

/** Portrait sizes per head count. Same classes the two-girl layout already used. */
export function sceneLayout(count: number) {
  const n = Math.max(1, Math.min(MAX_SCENE_GIRLS, count));
  if (n >= 3) return { width: "w-1/3", height: "h-[min(68dvh,760px)] max-w-full" };
  if (n === 2) return { width: "w-1/2", height: "h-[min(78dvh,860px)] max-w-full" };
  return { width: "w-full", height: "h-[min(92dvh,980px)] max-w-[min(100%,640px)]" };
}

/**
 * Who has farted since the scene's girls last changed to just one.
 * Used for "another skunkgirl farted in the scene" bonuses (Ronnie's +1 rival modifier).
 */
export type SceneFartLog = SceneGirl[];

export function logSceneFarts(log: SceneFartLog, present: readonly SceneGirl[], farted: readonly SceneGirl[]): SceneFartLog {
  const here = sceneOrder(present);
  if (here.length <= 1) return [];
  return sceneOrder([...log.filter((id) => here.includes(id)), ...farted.filter((id) => here.includes(id))]);
}

export function anotherGirlFarted(log: SceneFartLog, girl: SceneGirl): boolean {
  return log.some((id) => id !== girl);
}

/** One extra speaker's part of a reply, for a third girl beyond the focus/other fields. */
export interface SceneVoice {
  girl: SceneGirl;
  dialogue: string;
  expression?: Expression;
  fx?: FxEvent;
  trustDelta?: number;
  bondingDelta?: number;
}

/** Keep only voices for girls actually in the scene, excluding the ones already covered. */
export function sceneVoices(voices: readonly SceneVoice[] | undefined, present: readonly SceneGirl[], covered: readonly SceneGirl[]): SceneVoice[] {
  if (!voices?.length) return [];
  const here = sceneOrder(present);
  const seen = new Set<SceneGirl>(covered);
  const out: SceneVoice[] = [];
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
