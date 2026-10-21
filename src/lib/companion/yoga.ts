import { MIRA_INSTRUCTOR, MIRA_SCHEDULE } from "./mira-bio";
import { RONNIE_INSTRUCTOR, RONNIE_SCHEDULE } from "./ronnie-bio";
import type { GameState, TimeOfDay, Weekday } from "./types";
import { sceneHas } from "./scene";

/**
 * Ronnie on the clock at Second Wind.
 * Dormant: Ronnie can never be in `present` yet, so ronnieInstructing is always false today
 * and the class bonus never applies to Izzy or Victoria.
 */

/** Her teaching block from the schedule. */
export function ronnieOnClock(weekday: Weekday, time: TimeOfDay): boolean {
  return RONNIE_SCHEDULE.work.days.includes(weekday) && time === RONNIE_SCHEDULE.work.time;
}

/** She is at the studio, on the clock, and in this scene. */
export function ronnieInstructing(
  state: Pick<GameState, "location" | "weekday" | "timeOfDay" | "present" | "izzyHere">,
): boolean {
  if (state.location !== RONNIE_SCHEDULE.work.place) return false;
  if (!ronnieOnClock(state.weekday, state.timeOfDay)) return false;
  return sceneHas(state, "ronnie");
}

export function miraOnClock(weekday: Weekday, time: TimeOfDay): boolean {
  return (MIRA_SCHEDULE.work.days as readonly Weekday[]).includes(weekday) && time === MIRA_SCHEDULE.work.time;
}

export function miraInstructing(
  state: Pick<GameState, "location" | "weekday" | "timeOfDay" | "present" | "izzyHere">,
): boolean {
  if (state.location !== MIRA_SCHEDULE.work.place) return false;
  if (!miraOnClock(state.weekday, state.timeOfDay)) return false;
  return sceneHas(state, "mira");
}

/** At most one class bonus in a scene. Ronnie's yoga and Mira's dance do not stack. */
export function cappedClassBonus(parts: readonly number[]) {
  const on = parts.reduce((sum, n) => sum + (n > 0 ? 1 : 0), 0);
  return Math.min(1, on);
}

export function sceneClassBonus(state: Parameters<typeof ronnieInstructing>[0]) {
  return cappedClassBonus([ronnieInstructing(state) ? 1 : 0, miraInstructing(state) ? 1 : 0]);
}
export function instructorBrief(state: Parameters<typeof ronnieInstructing>[0]): string {
  if (miraInstructing(state)) {
    return [
      "MIRA ON THE CLOCK:",
      MIRA_INSTRUCTOR.role,
      MIRA_INSTRUCTOR.player,
      MIRA_INSTRUCTOR.farts,
      MIRA_INSTRUCTOR.limits,
      "Every skunkgirl in this class gets +1 on her fart window. If Ronnie's yoga bonus would also apply, the room still only gets one +1.",
    ].join(" ");
  }
  if (!ronnieInstructing(state)) return "";
  return [
    "RONNIE ON THE CLOCK:",
    RONNIE_INSTRUCTOR.role,
    RONNIE_INSTRUCTOR.player,
    RONNIE_INSTRUCTOR.farts,
    RONNIE_INSTRUCTOR.limits,
    "Every skunkgirl in this class gets +1 on her fart window. If another class is in the same scene, the room still only gets one +1.",
  ].join(" ");
}
