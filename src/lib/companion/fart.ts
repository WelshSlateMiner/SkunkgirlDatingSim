import type { Expression, FxEvent, GameState, GirlCard, GirlId, IzzyTurn, LocationId, Roster, TurnInput } from "./types";
import { isPrivatePlace } from "./cast";
import { intimacyCall } from "./intimacy";
import { placeOf } from "./locations";
import { ronnieInstructing } from "./yoga";

const FART_RE =
  /\b(fart(?:ed|ing|s)?|toot(?:ed|ing|s)?|poot(?:ed|ing|s)?|flatulence|flatu(?:s|lent)|passed (?:gas|wind)|passing gas|rips? (?:one|it|a)|ripped (?:one|it|a)|let(?:s|ting)?(?: one| it)? (?:rip|go|slip|out)|a (?:quiet |wet |little |soft |short |unbothered )?(?:puff|toot|brap)\b|puffs?\b|puffed\b|lift(?:s|ed|ing)? (?:a |her )?cheek|unclench(?:ed|es|ing)?|couldn'?t hold it|hold it in|from (?:her )?behind|digestive tract|stomach (?:voted|joined|won|made)|beans? (?:hit|landed|won)|season(?:ed)? .{0,24}(?:aisle|shelf|store)|gassed (?:the |this )?|that one had architecture|aisle will never recover|open a window for the civilians|lean(?:s|ed)? .{0,40}(?:cheek|rip|toot|fart))\b|p+f+t+|br+a+p+|thbb?t+|pbb+t+|\*+[^*]{0,40}(fart|toot|poot|pfft|brap|puff)[^*]{0,40}\*+/i;

export function mentionsFart(text: string) {
  return FART_RE.test(text);
}

export function resolveFx(
  turn: Pick<IzzyTurn, "fx" | "sprayed" | "dialogue" | "narration" | "expression" | "inner" | "pendingIntimateSpray">,
): FxEvent {
  const winding = Boolean(turn.pendingIntimateSpray) && !turn.sprayed && turn.fx !== "spray";
  if (!winding && (turn.sprayed || turn.fx === "spray" || turn.expression === "spray")) return "spray";
  const blob = `${turn.dialogue ?? ""} ${turn.narration ?? ""} ${turn.inner ?? ""}`;
  if (turn.fx === "fart" || mentionsFart(blob)) return "fart";
  return turn.fx ?? "none";
}

const SEXUAL =
  /\b(sex|fuck|cock|dick|pussy|clit|cum|moan|orgasm|naked|nude|kiss|lap|thigh|inside|hump|ride|suck|rim|masturb|jerk|stroke|penetrat|good boy|good girl|spank|ass|butt)\b/i;

/** Moan-tailed clips only when the fart is part of an intimate fetish beat, not a public or teasing toot. */
export function intimateFetishFart(state: GameState, input: TurnInput, turn: IzzyTurn) {
  const blob = `${input.say} ${input.action} ${turn.dialogue ?? ""} ${turn.narration ?? ""}`;
  const sexual = SEXUAL.test(blob);
  const privatePlace = state.location === "dorm" || state.location === "apartment";
  const romantic = state.flags.romanceAccepted || state.bond === "romantic";
  const fetishOn =
    state.playerFartRole === "into" ||
    state.flags.fartConverted ||
    state.flags.sprayYield === "submit" ||
    state.flags.sprayYield === "resist";
  if (sexual && (privatePlace || romantic || (state.trust >= 55 && state.bonding >= 45))) return true;
  if (fetishOn && privatePlace && (romantic || state.bond === "close")) return true;
  return false;
}

/** Places that sell food. Each unique visit today widens her window by one. Casa Luna is two. Repeats do not stack. */
const FOOD_STORE = new Set<LocationId>(["cafe", "burger", "foodCourt", "grocery", "naturalFoods"]);

export function foodBonus(place: LocationId): number {
  if (place === "mexican") return 2;
  if (place === "italian" || FOOD_STORE.has(place)) return 1;
  return 0;
}

export function readStops(card: Partial<GirlCard> | null | undefined): LocationId[] {
  if (!Array.isArray(card?.fedStops)) return [];
  return card.fedStops.filter((place): place is LocationId => foodBonus(place) > 0);
}

export function readDebt(card: Partial<GirlCard> | null | undefined): number {
  return typeof card?.fartDebt === "number" && card.fartDebt > 0 ? Math.round(card.fartDebt) : 0;
}

export function withStop(stops: LocationId[], place: LocationId): LocationId[] {
  if (foodBonus(place) <= 0 || stops.includes(place)) return stops;
  return [...stops, place];
}

/** Izzy starts at 2. Victoria starts at 1. Trust above 20 opens one more number. Intimacy adds two. */
export function baseRange(girl: GirlId, trust: number): number {
  const trusted = trust > 20;
  if (girl === "victoria") return trusted ? 2 : 1;
  return trusted ? 3 : 2;
}

/** classBonus is the yoga-class +1 (see yoga.ts). It is 0 unless Ronnie is teaching the class the player is in. */
export function rangeMax(girl: GirlId, trust: number, stops: LocationId[], intimate = false, classBonus = 0): number {
  const bonus = stops.reduce((sum, place) => sum + foodBonus(place), 0);
  return baseRange(girl, trust) + bonus + (intimate ? 2 : 0) + classBonus;
}

/** Upper end of 1–N for this reply. Debt is how many farts in a row have narrowed it. */
export function rangeSpan(
  girl: GirlId,
  trust: number,
  stops: LocationId[],
  debt: number,
  place: LocationId,
  intimate = false,
  classBonus = 0,
): number {
  const max = rangeMax(girl, trust, withStop(stops, place), intimate, classBonus);
  return Math.max(0, max - Math.max(0, debt));
}

const FART_PROMPT =
  /\b(?:fart (?:for|on|in) (?:me|us|my)|let one (?:go|rip|out|slip)|rip one|toot for me|pass gas|another fart|keep farting|don'?t hold it|do not hold it|cut one)\b/i;
const FART_WORD = /\b(?:farts?|farting|toots?|poots?|pass gas|let one|rip one|cut one)\b/i;
const ASK_WORD =
  /\b(?:please|can you|could you|will you|would you|i want you to|for me|i dare|dare you|come on|c'mon|go on|do it|right now)\b/i;
const FART_PROMPT_NO =
  /\b(?:stop fart|no more fart|don'?t fart|do not fart|don't you fart|eww|\bew\b|gross|disgusting)\b/i;

/** A direct request for a fart this turn. Not a mention, and not a request to stop. */
export function playerAskedFart(text: string) {
  if (FART_PROMPT_NO.test(text)) return false;
  if (FART_PROMPT.test(text)) return true;
  return FART_WORD.test(text) && ASK_WORD.test(text);
}

/** Applied once, for this roll only. Never stored. Izzy +1. Victoria −2 in public, otherwise none. Ronnie +2 anywhere. */
export function promptModifier(girl: GirlId | "ronnie", place: LocationId): number {
  if (girl === "izzy") return 1;
  if (girl === "ronnie") return 2;
  if (girl === "victoria" && !isPrivatePlace(place)) return -2;
  return 0;
}

export function sceneIsIntimate(state: GameState, input: TurnInput) {
  const call = intimacyCall(state, input);
  return Boolean(call.scene && !call.blocked && !call.concluded);
}

function pickLine<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)]!;
}

/** Spoken only when a prompted roll misses. Ronnie's lines wait until she can speak. */
export function promptedFartMiss(girl: GirlId | "ronnie"): {
  narration: string;
  dialogue: string;
  expression: Expression;
} {
  if (girl === "victoria") {
    return pickLine([
      {
        narration: "She sets a hand on her stomach, checks, and takes it away. The smile is small and not sorry.",
        dialogue: "No. I am not going to strain for one I don't have. Ask when there's actually something there.",
        expression: "thinking",
      },
      {
        narration: "She almost laughs, then doesn't give them the show.",
        dialogue: "Cute. The tank is empty. That's the answer, not a negotiation.",
        expression: "suspicious",
      },
      {
        narration: "One brow lifts. She does not shift her weight or try again.",
        dialogue: "I checked. Nothing queued. I don't fake a fart to be polite.",
        expression: "shy",
      },
    ]);
  }
  if (girl === "ronnie") {
    return pickLine([
      {
        narration: "She braces, tries, and nothing comes. The grin drops into a real frown.",
        dialogue: "I tried. I actually tried. There's nothing in there. That's annoying.",
        expression: "embarrassed",
      },
      {
        narration: "She pushes, waits, and lets her shoulders fall.",
        dialogue: "Ugh. I wanted that one. I'm out of gas. Don't look at me like I chickened out.",
        expression: "shy",
      },
      {
        narration: "A second try. Still nothing. She clicks her tongue and looks off.",
        dialogue: "Failed. Not a refusal. My stomach just doesn't have it. Disappointing.",
        expression: "thinking",
      },
    ]);
  }
  return pickLine([
    {
      narration: "She grins, gives it a real try, and comes up empty. Ears twitch.",
      dialogue: "Heh. I pushed. Nothing's queued. My guts declined the invitation.",
      expression: "laughing",
    },
    {
      narration: "She pats her stomach like it betrayed her and shrugs, still playful.",
      dialogue: "You asked nice. I'm out of gas. That's the whole scandal.",
      expression: "embarrassed",
    },
    {
      narration: "She leans in like she's going to, then snorts and straightens up.",
      dialogue: "Tank's empty. I'd toot on command if I had one. Rude of my own body.",
      expression: "shy",
    },
  ]);
}

export function rollD12(): number {
  return 1 + Math.floor(Math.random() * 12);
}

export function dieHits(span: number, roll: number): boolean {
  return span > 0 && roll >= 1 && roll <= span;
}

/** A fart narrows the next reply by one. A quiet reply opens the next one by one, back toward today's max. */
export function nextDebt(debt: number, farted: boolean): number {
  const current = Math.max(0, Math.round(debt));
  if (farted) return current + 1;
  return current > 0 ? current - 1 : 0;
}

export function clearFed(roster: Roster): Roster {
  const next = { ...roster };
  for (const girl of ["izzy", "victoria"] as const) {
    const card = next[girl];
    if (!card) continue;
    if (!card.fartDebt && !(card.fedStops?.length)) continue;
    next[girl] = { ...card, fartDebt: 0, fedStops: [] };
  }
  return next;
}

export function settleGuts(
  roster: Roster,
  present: GirlId[],
  place: LocationId,
  farted: GirlId[],
  dayReset: boolean,
): Roster {
  let next = dayReset ? clearFed(roster) : { ...roster };
  const here = new Set(present);
  const did = new Set(farted);
  for (const girl of ["izzy", "victoria"] as const) {
    const card = next[girl];
    if (!card) continue;
    if (dayReset && !here.has(girl) && !did.has(girl)) continue;
    if (!here.has(girl) && !did.has(girl)) continue;
    const stops = withStop(readStops(card), place);
    next = {
      ...next,
      [girl]: {
        ...card,
        fedStops: stops,
        fartDebt: nextDebt(readDebt(card), did.has(girl)),
      },
    };
  }
  return next;
}

function slipSentence(girl: GirlId): string {
  return girl === "victoria"
    ? "A short one slips out. She does not stop the sentence."
    : "One gets out on the way through the sentence. She keeps going.";
}

function withSlip(girl: GirlId, narration: string, dialogue: string) {
  if (mentionsFart(`${narration} ${dialogue}`)) return { narration, dialogue };
  const slip = slipSentence(girl);
  return { narration: narration.trim() ? `${narration.trim()} ${slip}` : slip, dialogue };
}

/**
 * Unasked farts come from a d12. A prompt is the same die with a one-turn modifier.
 * Force is only for the scripted fart test.
 */
export function shapeSpontaneousFart(
  girl: GirlId,
  trust: number,
  place: LocationId,
  stops: LocationId[],
  debt: number,
  fx: FxEvent,
  narration: string,
  dialogue: string,
  mode: "force" | "roll" | "prompt",
  roll?: number,
  intimate = false,
): { fx: FxEvent; narration: string; dialogue: string; expression?: Expression } {
  if (fx === "spray") return { fx, narration, dialogue };
  if (mode === "force") {
    return { fx: "fart", ...withSlip(girl, narration, dialogue) };
  }
  let span = rangeSpan(girl, trust, stops, debt, place, intimate);
  if (mode === "prompt") span = Math.max(0, span + promptModifier(girl, place));
  const face = roll ?? rollD12();
  if (dieHits(span, face)) return { fx: "fart", ...withSlip(girl, narration, dialogue) };
  if (mode === "prompt") {
    const miss = promptedFartMiss(girl);
    const scrubbed = dropFartProse(girl, narration, dialogue);
    const kept = scrubbed.dialogue.trim();
    return {
      fx: "none",
      narration: miss.narration,
      dialogue: kept ? `${kept} ${miss.dialogue}` : miss.dialogue,
      expression: miss.expression,
    };
  }
  if (fx === "fart" || mentionsFart(`${narration} ${dialogue}`)) {
    const scrubbed = dropFartProse(girl, narration, dialogue);
    return { fx: "none", narration: scrubbed.narration, dialogue: scrubbed.dialogue };
  }
  return { fx, narration, dialogue };
}

export function gutBrief(state: GameState): string {
  const present = state.izzyHere === false ? [] : (state.present ?? []);
  const girls = (present.length ? present : [state.focus ?? "izzy"]) as GirlId[];
  const intimate = Boolean(state.flags.intimateScene);
  const yoga = yogaClassBonus(state.location, ronnieInstructing(state));
  return girls
    .map((girl) => {
      const card = state.roster?.[girl];
      const trust = girl === (state.focus ?? "izzy") ? state.trust : (card?.trust ?? 0);
      const stops = withStop(readStops(card), state.location);
      const max = rangeMax(girl, trust, stops, intimate, yoga);
      const span = Math.max(0, max - readDebt(card));
      const window = span > 0 ? `This reply hits on 1-${span}.` : "This reply's window is closed, so an unasked fart cannot hit.";
      const who = girl === "victoria" ? "Victoria" : "Izzy";
      const meals = stops.length ? stops.map((id) => placeOf(id).name).join(", ") : "no food stop yet today";
      const table =
        state.location === "mexican"
          ? " A fart in this restaurant uses a large clip with no moan."
          : "";
      const room = intimate ? " Intimacy is raising today's max by two. That bonus leaves when the scene does." : "";
      return `GUT ${who}: d12. ${window} Today's max is 1-${max}.${room} Do not set fx fart and do not describe letting one go, even if they just asked. The game rolls. A direct ask uses this same window for one roll only, then the modifier is gone: Izzy +1, Victoria -2 if the place is public. Prompts do not stack. A hit still narrows the next reply by one. A miss does not fart, and she explains in her own voice. A quiet reply opens the next window by one, back toward the max. Food today: ${meals}. Each different place that sells food is +1 once. Osteria Vale is +1. Casa Luna is +2. Repeats do not stack.${table}`;
    })
    .join("\n");
}

/** Drop a fart the body did not actually release, without claiming the tank is empty. */
export function dropFartProse(girl: GirlId, narration: string, dialogue: string) {
  const narr = mentionsFart(narration) ? "" : narration;
  if (!mentionsFart(dialogue)) return { narration: narr, dialogue };
  const kept = dialogue
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence && !mentionsFart(sentence))
    .join(" ")
    .trim();
  return {
    narration: narr,
    dialogue: kept || (girl === "victoria" ? "I'm listening. Go on." : "I'm here. Keep going."),
  };
}
/*
 * Ronnie's gut. Dormant: she is not a GirlId yet, so nothing in a turn calls these.
 * They are the rules from the dev doc, ready to wire in when she joins the roster.
 */

/** Her default window is 1-3. Same food, intimacy, and yoga bonuses as the other girls. */
export const RONNIE_BASE_RANGE = 3;

/** Each fart in a row narrows her next window by two, not one. Each quiet reply opens it back by one. */
export const RONNIE_STREAK_STEP = 2;
export const RONNIE_QUIET_STEP = 1;

export function ronnieNextDebt(debt: number, farted: boolean): number {
  const current = Math.max(0, Math.round(debt));
  if (farted) return current + RONNIE_STREAK_STEP;
  return Math.max(0, current - RONNIE_QUIET_STEP);
}

/**
 * +1 once another skunkgirl farts in the scene with her. It stays until she is the only skunkgirl in a scene.
 * Returns the new held flag.
 */
export function ronnieRivalHeld(held: boolean, otherGirlsPresent: number, otherGirlFarted: boolean): boolean {
  if (otherGirlsPresent <= 0) return false;
  return held || otherGirlFarted;
}

/** +1 for every girl when the player attends a yoga class Ronnie is teaching. */
export function yogaClassBonus(place: LocationId, instructing: boolean): number {
  return place === "yogaStudio" && instructing ? 1 : 0;
}

export function ronnieRangeSpan(opts: {
  stops: LocationId[];
  debt: number;
  place: LocationId;
  intimate?: boolean;
  rivalHeld?: boolean;
  instructing?: boolean;
  prompted?: boolean;
}): number {
  const stops = withStop(opts.stops, opts.place);
  const food = stops.reduce((sum, place) => sum + foodBonus(place), 0);
  const max =
    RONNIE_BASE_RANGE +
    food +
    (opts.intimate ? 2 : 0) +
    (opts.rivalHeld ? 1 : 0) +
    yogaClassBonus(opts.place, Boolean(opts.instructing));
  const span = max - Math.max(0, opts.debt) + (opts.prompted ? promptModifier("ronnie", opts.place) : 0);
  return Math.max(0, span);
}

export type RonnieFartKind = "casual" | "intimate";

/**
 * Public: every casual fart, plus intimate farts with no moan up to size 2.
 * Semi-private and private: anything goes, and she laughs after. Strangers do not change this.
 */
export function ronnieFartAllowed(place: LocationId, kind: RonnieFartKind, size: number, moan: boolean): boolean {
  if (isPrivatePlace(place)) return true;
  if (kind === "casual") return true;
  return !moan && size <= 2;
}

/** Fart play outside a relationship opens above 50 on both. */
export function ronnieFartPlayOpen(trust: number, bonding: number): boolean {
  return trust > 50 && bonding > 50;
}
