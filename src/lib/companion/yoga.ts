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

/** Prompt guidance for her while teaching. Empty when she is not teaching. */
export function instructorBrief(state: Parameters<typeof ronnieInstructing>[0]): string {
  if (!ronnieInstructing(state)) return "";
  return [
    "RONNIE ON THE CLOCK:",
    RONNIE_INSTRUCTOR.role,
    RONNIE_INSTRUCTOR.player,
    RONNIE_INSTRUCTOR.farts,
    RONNIE_INSTRUCTOR.limits,
    "Every skunkgirl in this class gets +1 on her fart window.",
  ].join(" ");
}
