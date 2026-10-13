import type { FxEvent, GameState, GirlCard, GirlId, IzzyTurn, LocationId, Roster, TurnInput } from "./types";
import { placeOf } from "./locations";

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

/** Izzy starts at 2. Victoria starts at 1. Trust above 20 opens one more number. */
export function baseRange(girl: GirlId, trust: number): number {
  const trusted = trust > 20;
  if (girl === "victoria") return trusted ? 2 : 1;
  return trusted ? 3 : 2;
}

export function rangeMax(girl: GirlId, trust: number, stops: LocationId[]): number {
  const bonus = stops.reduce((sum, place) => sum + foodBonus(place), 0);
  return baseRange(girl, trust) + bonus;
}

/** Upper end of 1–N for this reply. Debt is how many farts in a row have narrowed it. */
export function rangeSpan(girl: GirlId, trust: number, stops: LocationId[], debt: number, place: LocationId): number {
  const max = rangeMax(girl, trust, withStop(stops, place));
  return Math.max(0, max - Math.max(0, debt));
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
 * Unasked farts come from a d12. Force keeps a fart the player asked for.
 * A miss strips a fart the model wrote on its own.
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
  mode: "force" | "roll",
  roll?: number,
): { fx: FxEvent; narration: string; dialogue: string } {
  if (fx === "spray") return { fx, narration, dialogue };
  if (mode === "force") {
    return { fx: "fart", ...withSlip(girl, narration, dialogue) };
  }
  const span = rangeSpan(girl, trust, stops, debt, place);
  const face = roll ?? rollD12();
  if (dieHits(span, face)) return { fx: "fart", ...withSlip(girl, narration, dialogue) };
  if (fx === "fart" || mentionsFart(`${narration} ${dialogue}`)) {
    const scrubbed = dropFartProse(girl, narration, dialogue);
    return { fx: "none", narration: scrubbed.narration, dialogue: scrubbed.dialogue };
  }
  return { fx, narration, dialogue };
}

export function gutBrief(state: GameState): string {
  const present = state.izzyHere === false ? [] : (state.present ?? []);
  const girls = (present.length ? present : [state.focus ?? "izzy"]) as GirlId[];
  return girls
    .map((girl) => {
      const card = state.roster?.[girl];
      const trust = girl === (state.focus ?? "izzy") ? state.trust : (card?.trust ?? 0);
      const stops = withStop(readStops(card), state.location);
      const max = rangeMax(girl, trust, stops);
      const span = Math.max(0, max - readDebt(card));
      const window = span > 0 ? `This reply hits on 1-${span}.` : "This reply's window is closed, so an unasked fart cannot hit.";
      const who = girl === "victoria" ? "Victoria" : "Izzy";
      const meals = stops.length ? stops.map((id) => placeOf(id).name).join(", ") : "no food stop yet today";
      const table =
        state.location === "mexican"
          ? " A fart in this restaurant uses a large clip with no moan."
          : "";
      return `GUT ${who}: d12. ${window} Today's max is 1-${max}. Do not set fx fart and do not describe letting one go unless they directly asked you to fart right now. The game rolls and adds the fart when it hits. After a fart, the next reply's window is one number smaller. A quiet reply opens the next window by one, back toward the max. Food today: ${meals}. Each different place that sells food is +1 once. Osteria Vale is +1. Casa Luna is +2. Repeats do not stack.${table}`;
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