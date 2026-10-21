import { girlIsOfficial, girlName, herHome } from "./cast";
import { giftById, giftSpeech, giftSummary, presentLine, receptionDelta, receptionOf, type GiftReception } from "./gifts";
import { LOCATIONS } from "./locations";
import { nextWeekday, parseMeetPlace, parseTimeOfDay, TIMES, WEEKDAYS } from "./time";
import { SCENE_NAME_RE, SCENE_ORDER, MAX_SCENE_GIRLS } from "./scene";
import { MIRA_DATES, MIRA_SCHEDULE } from "./mira-bio";
import { RONNIE_DATE_RULES, RONNIE_SCHEDULE } from "./ronnie-bio";
import type {
  ActiveDate,
  DateDraft,
  DateReview,
  Departure,
  Expression,
  GameState,
  GasPuff,
  GirlId,
  Grudge,
  LocationId,
  ScheduledDate,
  SmellStance,
  SprayKind,
  SprayPrompt,
  TimeOfDay,
  Weekday,
} from "./types";

const PRIVATE_DATES = new Set<LocationId>(["dorm", "apartment", "vickyLiving", "vickyBedroom", "miraDorm", "ronnieDorm"]);
const AWKWARD_DATES = new Set<LocationId>(["classroom", "studyHall", "sportingGoods", "firm"]);

const HANGOUT: Record<GirlId, Record<TimeOfDay, LocationId[]>> = {
  izzy: {
    Morning: ["library", "cafe", "campus", "trail", "animeStore"],
    Afternoon: ["library", "cafe", "animeStore", "mexican", "mall", "tabletop", "trail"],
    Evening: ["mexican", "tabletop", "burger", "trail", "mall"],
    Night: ["campus", "trail", "burger"],
  },
  victoria: {
    Morning: ["craftStore", "grocery", "cafe", "furniture"],
    Afternoon: ["craftStore", "furniture", "perfume", "italian", "mall"],
    Evening: ["italian", "mall", "furniture", "perfume"],
    Night: ["italian", "perfume"],
  },
  ronnie: {
    Morning: ["gym", "field", "cafe", "trail"],
    Afternoon: ["gym", "naturalFoods", "sportingGoods", "trail", "field", "trendy"],
    Evening: ["gym", "theater", "field", "cafe", "trendy"],
    Night: ["field", "trail", "theater"],
  },
  mira: {
    Morning: ["library", "cafe", "studyHall", "gym", "makeup"],
    Afternoon: ["theater", "animeStore", "perfume", "makeup", "gym", "yogaStudio"],
    Evening: ["theater", "italian", "mexican", "perfume", "animeStore"],
    Night: ["theater", "campus"],
  },
};

export function economySeed() {
  return {
    money: 100,
    inventory: [] as string[],
    dateDraft: null as DateDraft | null,
    scheduledDate: null as ScheduledDate | null,
    activeDate: null as ActiveDate | null,
    dateReview: null as DateReview | null,
    confronting: null as GirlId | null,
    grudge: {} as Partial<Record<GirlId, Grudge>>,
    dateTipOff: {} as Partial<Record<GirlId, boolean>>,
    gas: [] as GasPuff[],
    departure: null as Departure | null,
    trailStreak: 0,
    trailGirl: null as GirlId | null,
    sceneTurns: 0,
    shiftsWorked: 0,
    workedToday: false,
    pressedDuty: null as GirlId | null,
    otherSprayKind: "none" as SprayKind,
    sprayPrompts: [] as SprayPrompt[],
    stink: 0,
    scentFrom: { izzy: 0, victoria: 0, ronnie: 0, mira: 0 },
    stinkAsked: {} as Partial<Record<GirlId, number>>,
    stinkTalk: null as GameState["stinkTalk"],
    showersToday: 0,
    daySerial: 0,
    dutyNotice: [] as GameState["dutyNotice"],
    flauntDay: {} as Partial<Record<GirlId, number>>,
    markAffair: null as GameState["markAffair"],
  };
}

export function playerAlone(state: Pick<GameState, "izzyHere" | "present">) {
  return state.izzyHere === false || !state.present?.length;
}

export function prefillDate(text: string, invite: LocationId | null, today: Weekday) {
  let day: Weekday | null = null;
  for (const name of WEEKDAYS) {
    if (new RegExp(`\\b${name}\\b`, "i").test(text)) day = name;
  }
  if (!day && /\btomorrow\b/i.test(text)) day = nextWeekday(today);
  if (!day && /\btoday\b/i.test(text)) day = today;
  return {
    time: parseTimeOfDay(text),
    place: invite ?? parseMeetPlace(text),
    day,
  };
}

export function datePlaces(nth: number, girl?: GirlId): LocationId[] {
  return (Object.keys(LOCATIONS) as LocationId[]).filter(
    (id) => !isAwkwardPlace(id, girl) && (nth >= 3 || !PRIVATE_DATES.has(id)),
  );
}

export function slotOpen(today: Weekday, now: TimeOfDay, day: Weekday, time: TimeOfDay) {
  const days = WEEKDAYS.indexOf(day) - WEEKDAYS.indexOf(today);
  const ahead = days < 0 ? days + 7 : days;
  if (ahead === 0) return TIMES.indexOf(time) >= TIMES.indexOf(now);
  return true;
}

export function dateIsDue(state: Pick<GameState, "scheduledDate" | "activeDate" | "weekday" | "timeOfDay">) {
  const plan = state.scheduledDate;
  if (!plan || state.activeDate) return false;
  return plan.day === state.weekday && plan.time === state.timeOfDay;
}

/** Ronnie's own poor-date list adds her workplace. Izzy and Vicky share the global list. */
const GIRL_AWKWARD: Partial<Record<GirlId, ReadonlySet<LocationId>>> = {
  ronnie: new Set<LocationId>(RONNIE_DATE_RULES.poorDatePlaces),
  mira: new Set<LocationId>(MIRA_DATES.poor),
};

export function isAwkwardPlace(id: LocationId, girl?: GirlId) {
  return AWKWARD_DATES.has(id) || Boolean(girl && GIRL_AWKWARD[girl]?.has(id));
}

/** Awkward for any of these girls. */
export function awkwardForAny(id: LocationId, girls: readonly GirlId[]) {
  return isAwkwardPlace(id) || girls.some((girl) => isAwkwardPlace(id, girl));
}

export type Duty = "class" | "work" | "free";

const CLASS_PLACES = {
  izzy: ["library", "cafe", "campus", "studyHall", "classroom"],
  ronnie: ["library", "cafe", "campus", "studyHall", "classroom"],
  mira: ["library", "studyHall", "cafe", "classroom", "campus"],
} as const satisfies Record<"izzy" | "ronnie" | "mira", readonly LocationId[]>;

const CLASS_SHIFT = { izzy: 0, ronnie: 3, mira: 1 } as const;

function classSpot(girl: "izzy" | "ronnie" | "mira", weekday: Weekday): LocationId {
  const places = CLASS_PLACES[girl];
  return places[(WEEKDAYS.indexOf(weekday) + CLASS_SHIFT[girl]) % places.length] ?? "library";
}

/** Where her schedule puts her, ignoring whoever is currently walking with the player. */
export function placeOnSchedule(girl: GirlId, weekday: Weekday, time: TimeOfDay, daySerial = 0): LocationId {
  const duty = dutyOf(girl, weekday, time);
  if (girl === "mira" && duty === "class" && miraSkipsClass(daySerial)) {
    const spots = ["yogaStudio", "gym", "makeup", "perfume"] as const;
    return spots[Math.max(0, daySerial) % spots.length] ?? "gym";
  }
  if (duty === "class" && girl !== "victoria") return classSpot(girl, weekday);
  if (duty === "work") return dutyPlace(girl);
  if (girl === "mira") {
    if (weekday === "Saturday" && time === "Afternoon") return "yogaStudio";
    if (weekday === "Sunday" && time === "Morning") return "gym";
    if (weekday === "Tuesday" && time === "Afternoon") return "gym";
  }
  const list = HANGOUT[girl][time];
  const index = (WEEKDAYS.indexOf(weekday) + TIMES.indexOf(time)) % list.length;
  return list[index] ?? "library";
}

export function miraSkipsClass(daySerial: number) {
  return ((Math.max(0, daySerial) * 17 + 3) % 20) === 0;
}

export function dutyOf(girl: GirlId, weekday: Weekday, time: TimeOfDay): Duty {
  const weekend = weekday === "Saturday" || weekday === "Sunday";
  if (girl === "mira") {
    if (!weekend && time === "Morning") return "class";
    if (time === "Afternoon" && (MIRA_SCHEDULE.work.days as readonly Weekday[]).includes(weekday)) return "work";
    return "free";
  }
  if (girl === "ronnie") {
    if (!weekend && time === "Morning") return "class";
    if (time === "Afternoon" && RONNIE_SCHEDULE.work.days.includes(weekday)) return "work";
    return "free";
  }
  if (girl === "izzy") {
    if (!weekend && time === "Morning") return "class";
    if (!weekend && time === "Afternoon" && (weekday === "Monday" || weekday === "Wednesday" || weekday === "Friday")) {
      return "work";
    }
    return "free";
  }
  if (!weekend && time === "Afternoon") return "work";
  return "free";
}

export function dutyPlace(girl: GirlId): LocationId {
  if (girl === "ronnie" || girl === "mira") return "yogaStudio";
  return girl === "victoria" ? "firm" : "sportingGoods";
}

export function dutyStop(girl: GirlId, weekday: Weekday, time: TimeOfDay, daySerial = 0): LocationId | null {
  if (dutyOf(girl, weekday, time) === "free") return null;
  return placeOnSchedule(girl, weekday, time, daySerial);
}

export function dutyWarn(girl: GirlId, duty: Exclude<Duty, "free">) {
  if (girl === "mira") {
    return duty === "class"
      ? "Class. I have to go. The name can wait. This conversation can't have the rest of the morning."
      : "Second Wind. I'm on the count. Last thing, then I'm teaching.";
  }
  if (girl === "ronnie") {
    return duty === "class"
      ? "Clock's ticking. I've got class and I'm not getting marked late. Last thing, go."
      : "I've got a class to teach at Second Wind. Say it quick, then I'm out.";
  }
  if (girl === "victoria") {
    return "The desk is open and it is mine. I'll hear you out once more. Then I have to go to Line & Lumen.";
  }
  if (duty === "class") return "That's the block. I have class. Say what you wanted to say — then I have to actually go.";
  return "Trailhead just started without me. One more thing, then I have to clock in.";
}

export function dutyFarewell(girl: GirlId, duty: Exclude<Duty, "free">) {
  if (girl === "mira") {
    return duty === "class" ? "That's the morning. I'll be on campus. Don't follow me into a lecture." : "I'm teaching. Take the class or don't. I'm not hanging around the door.";
  }
  if (girl === "ronnie") {
    return duty === "class" ? "Okay, class. Later. Try to keep up next time." : "Shift time. Come take a class if you want. I'll make you sweat.";
  }
  if (girl === "victoria") return "That's the end of it. Line & Lumen. I'll be at the desk.";
  if (duty === "class") return "Okay. That's me. Class. I'll see you when I'm not late.";
  return "I'm clocking in. If you need a pack, you know where the floor is. If you need me, later.";
}

export function dutyExitNarration(girl: GirlId, duty: Exclude<Duty, "free">) {
  const name = girlName(girl);
  return duty === "class" ? `${name} leaves for class.` : `${name} leaves for her shift.`;
}

const GROUP_ADDR =
  /\b(you guys|you two|both of you|you both|the two of you|ladies|all of you|everyone here|y'all|yall|you all|both girls|you girls)\b/i;

export function isGroupAddress(text: string) {
  return GROUP_ADDR.test(text);
}

export function addressedGirls(text: string, present: GirlId[]): GirlId[] {
  if (isGroupAddress(text)) return present.filter((id, i, all) => all.indexOf(id) === i);
  const named = SCENE_ORDER.filter((id) => SCENE_NAME_RE[id].test(text));
  return named.filter((id): id is GirlId => (present as string[]).includes(id));
}

export function goodbyeSaid(text: string) {
  return /\b(bye|goodbye|good-bye|see you|see ya|later|heading out|take care|i(?:'m| am) (?:going|leaving|off)|gotta go|i should go|i have to go|good night|goodnight)\b/i.test(
    text,
  );
}

/** 10 harsh, 6 pushy, 1 polite, 3 ordinary. */
export function rudeness(text: string) {
  if (
    /\b(shut up|fuck you|fuck off|i don't care|i dont care|just come|stop making excuses|not that busy|skip (?:class|work)|blow (?:it|this) off|ditch (?:class|work)|get over it|worthless)\b/i.test(
      text,
    )
  ) {
    return 10;
  }
  if (
    /\b(come on|seriously|just this once|please just|you can leave|won't take long|wont take long|don't be like that|dont be like that|right now)\b/i.test(
      text,
    )
  ) {
    return 6;
  }
  if (
    /\b(sorry|no rush|when you(?:'re| are) free|after work|after class|whenever|another time|that(?:'s| is) fine|no worries|i can wait)\b/i.test(
      text,
    )
  ) {
    return 1;
  }
  return 3;
}

export function wasOffended(text: string, swing: number) {
  return swing <= -4 || /\b(gross|freak|monster|shut up|i hate you|go away|get lost|disgusting)\b/i.test(text);
}

export function awkwardMention(text: string, invite: LocationId | null): LocationId | null {
  if (invite && isAwkwardPlace(invite)) return invite;
  if (/\b(lecture halls?|classrooms?)\b/i.test(text)) return "classroom";
  if (/\bstudy halls?\b/i.test(text)) return "studyHall";
  if (/\b(trailhead|sporting goods)\b/i.test(text)) return "sportingGoods";
  if (/\b(line (?:and|&) lumen|consulting firm|the firm|reception desk)\b/i.test(text)) return "firm";
  return null;
}

export interface InviteRefusal {
  girl: GirlId;
  bondingDelta: number;
  line: string;
  expression: Expression;
}

export interface InvitePlan {
  dest: LocationId;
  going: GirlId[];
  blocked: InviteRefusal[];
  press: GirlId | null;
  /** A group date where only some girls find the place awkward: they decline, the rest still go on the date. */
  dateGoes?: boolean;
}

function busyLine(girl: GirlId, duty: Duty, insist: boolean, loss: number) {
  if (girl === "mira") {
    if (loss >= 8) return duty === "class" ? "Skip class? No. My parents already fought me on that once. Don't be the second person." : "Walk out on my own class? No. They paid for the hour.";
    return duty === "class"
      ? "I have class this morning. I'm not skipping it for a hangout."
      : "I'm on the count at Second Wind. Take the class or wait. I'm not leaving.";
  }
  // Like Vicky, not Izzy: skipping is nuts to her. Work and class come first; no pressing.
  if (girl === "ronnie") {
    if (loss >= 8) return duty === "class" ? "Skip class? Are you nuts? No. And don't talk to me like that." : "Walk out on a class I'm teaching? Are you nuts? No. Work comes first.";
    return duty === "class"
      ? "Skip class? That's nuts. No way. Catch me after. I'm usually at the gym."
      : "Ditch my own class at Second Wind? That's nuts. Work comes first. Grab a mat or catch me after.";
  }
  if (girl === "victoria") {
    if (loss >= 8) return "I said I am working. The desk is not optional. No. I am not leaving.";
    if (loss <= 1) return "I can't leave the desk. If this is a design question, ask it here. Otherwise I will see you when the afternoon is over.";
    return "No. I am at Line & Lumen until this afternoon is done. I am not walking out because you thought that made sense.";
  }
  if (insist) {
    return duty === "class"
      ? "I already said I have class. Pushing it doesn't move the lecture. Stop."
      : "I already said I'm on the clock. Asking again doesn't clock me out. Stop.";
  }
  return duty === "class"
    ? "I have class this morning. I can't walk off. Ask me when I'm actually free."
    : "I'm on the floor at Trailhead this afternoon. I can talk if you're shopping. I can't leave.";
}

function awkwardLine(girl: GirlId, place: LocationId, loss: number) {
  if (girl === "mira") {
    if (place === "yogaStudio") return "Second Wind is where I teach. That is not a date. Pick a room where I am the one being looked at.";
    if (place === "burger" || place === "foodCourt") return "I don't date over fast food. No.";
    if (place === "classroom" || place === "studyHall") return "A date in a classroom is a distraction I already have too many of. No.";
    return "That place is not a date. Not for me. Pick something else.";
  }
  if (girl === "ronnie") {
    if (place === "yogaStudio") {
      return loss >= 8 ? "A date at my job? While I'm teaching? No. Hard no." : "Second Wind is where I work. That's not a date, that's you watching me teach. Pick somewhere else.";
    }
    if (place === "classroom" || place === "studyHall") return "A date in a lecture hall? Lame. I can do better than that and so can you.";
    if (place === "sportingGoods") return "Trailhead's a store. I'll shop there with you. It's not a date.";
    return "Line & Lumen is my mom's office. Absolutely not.";
  }
  if (girl === "victoria") {
    if (place === "firm") {
      return loss >= 8
        ? "A date at my own desk. No. And don't ask it like the chair is a table."
        : "You want a date at my reception desk. That is not a date. No.";
    }
    if (place === "classroom" || place === "studyHall") {
      return "A lecture hall is not dinner. I am not sitting in the back of a class for a date. No.";
    }
    return loss >= 8
      ? "Her job is not a date, and asking it like that doesn't help. No."
      : "Trailhead is where she works. I am not having a date between the backpacks. No.";
  }
  if (place === "classroom") {
    return loss >= 8 ? "A date in the lecture hall? That's weird, and a little rude. No." : "A date in the lecture hall is just class with extra steps. No.";
  }
  if (place === "studyHall") return "Study hall is where I pretend to do homework. It is not a date. Pick somewhere else.";
  if (place === "sportingGoods") {
    return loss >= 8 ? "A date at my job, while I'm in the vest. No." : "Trailhead is work. I sell packs there. I don't date across the counter. No.";
  }
  return "Line & Lumen is her office. I'm not taking a date to Vicky's desk. No.";
}

export function classifyInvite(
  state: Pick<GameState, "location" | "focus" | "present" | "izzyHere" | "weekday" | "timeOfDay" | "pressedDuty">,
  text: string,
  dest: LocationId | null,
  dating: boolean,
): InvitePlan | null {
  if (!dest || dest === state.location) return null;
  const present = state.izzyHere === false || !state.present?.length ? [] : state.present;
  if (!present.length) return null;
  const named = addressedGirls(text, present);
  const group = isGroupAddress(text) || named.length > 1;
  const focus = state.focus ?? present[0]!;
  const targets = (group ? present : named.length === 1 ? named : [focus]).filter((id, i, all) => all.indexOf(id) === i);
  const loss = rudeness(text);
  if (dating && awkwardForAny(dest, targets)) {
    const willing = targets.filter((girl) => !isAwkwardPlace(dest, girl));
    return {
      dest,
      going: willing,
      dateGoes: willing.length > 0,
      blocked: targets.filter((girl) => isAwkwardPlace(dest, girl)).map((girl) => ({
        girl,
        bondingDelta: -(girl === "mira" ? loss + MIRA_DATES.poorBondShift : loss),
        line: awkwardLine(girl, dest, loss),
        expression: loss >= 8 ? "angry" : "suspicious",
      })),
      press: null,
    };
  }
  const blocked: InviteRefusal[] = [];
  const going: GirlId[] = [];
  let press: GirlId | null = null;
  for (const girl of targets) {
    const duty = dutyOf(girl, state.weekday, state.timeOfDay);
    if (duty === "free") {
      going.push(girl);
      continue;
    }
    if (girl === "izzy") {
      const insist = state.pressedDuty === girl;
      blocked.push({
        girl,
        bondingDelta: insist ? -loss : 0,
        line: busyLine(girl, duty, insist, loss),
        expression: insist && loss >= 6 ? "angry" : "thinking",
      });
      press = girl;
    } else {
      blocked.push({
        girl,
        bondingDelta: -loss,
        line: busyLine(girl, "work", true, loss),
        expression: loss >= 8 ? "angry" : "suspicious",
      });
    }
  }
  if (!blocked.length) return null;
  return { dest, going, blocked, press };
}

export function inviteParty(state: GameState, text: string, dest: LocationId): GirlId[] {
  const present = state.izzyHere === false || !state.present?.length ? [] : [...state.present];
  const focus = state.focus ?? present[0] ?? "izzy";
  const named = addressedGirls(text, present);
  const group = isGroupAddress(text) || named.length > 1;
  const party = (group ? present.slice() : named.length === 1 ? [...named] : [focus]).filter(
    (id, i, all) => all.indexOf(id) === i,
  );
  for (const girl of ["izzy", "victoria", "ronnie", "mira"] as GirlId[]) {
    if (party.includes(girl) || present.includes(girl)) continue;
    if (girlAt(state, girl) !== dest) continue;
    party.push(girl);
  }
  const capped = (party.length ? party : [focus]).slice(0, MAX_SCENE_GIRLS);
  return capped.length ? capped : [focus];
}

export function girlAt(state: GameState, girl: GirlId): LocationId {
  if (state.present?.includes(girl) && state.izzyHere !== false) return state.location;
  const hurt = state.grudge?.[girl];
  if (hurt) return hurt.place;
  const plan = state.scheduledDate;
  if (plan?.girl === girl && dateIsDue(state)) return plan.place;
  if (state.timeOfDay === "Night" && girlIsOfficial(state, girl)) {
    return herHome(girl);
  }
  if (state.departure?.girl === girl) return state.departure.place;
  return placeOnSchedule(girl, state.weekday, state.timeOfDay, state.daySerial ?? 0);
}

export function cyclesFor(nth: number) {
  return nth <= 1 ? 1 : 2;
}

const WELCOME = /don't mind|dont mind|i (like|love) (it|your|the smell|when you)|smell(s)? (good|great|fine)|stay|didn't flinch|didnt flinch|it's (fine|okay|ok)|its (fine|okay|ok)/i;
const FLINCH = /gross|eww|\bew\b|gag|nasty|too (strong|much)|hold your|cover it|spray (perfume|deo)|you stink|disgust/i;

export function nextSmell(current: SmellStance, text: string): SmellStance {
  if (FLINCH.test(text)) return "flinch";
  if (current === "flinch") return current;
  if (WELCOME.test(text)) return "welcome";
  return current;
}

export function smellSummary(stance: SmellStance) {
  if (stance === "welcome") return "She believes you can live with the smell. You didn't flinch, and you said so.";
  if (stance === "flinch") return "You pulled back from the smell. That stayed with her longer than the gift.";
  return "You didn't make the smell a problem, and you didn't say you wanted it.";
}

export function chanceOf(kind: GiftReception, stance: SmellStance, trustDelta: number, bondDelta: number) {
  if (kind === "insult" || (stance === "flinch" && trustDelta < 0) || (trustDelta <= -8 && bondDelta < 0)) return "no" as const;
  if ((kind === "love" || kind === "like") && stance !== "flinch" && bondDelta >= 0) return "likely" as const;
  if (bondDelta >= 4 && stance === "welcome") return "likely" as const;
  return "uncertain" as const;
}

export function closingLine(girl: GirlId, chance: DateReview["nextChance"]) {
  if (girl === "victoria") {
    if (chance === "likely") return "I had a good time. I don't say that to be polite. If you ask again, I'll listen.";
    if (chance === "no") return "I came. I won't pretend the night was what I wanted. Don't ask me to dress it up.";
    return "It wasn't nothing. I'm not ready to call it a habit. Ask me properly if you want another.";
  }
  if (chance === "likely") return "Okay. That was a date. A real one. I would do it again. Don't get weird about it.";
  if (chance === "no") return "I showed up. That's the nicest thing I can say about it. I'm going.";
  return "It was... a date. I didn't hate it. I also didn't float home. We'll see.";
}

export function buildReview(date: ActiveDate, trustAfter: number, bondAfter: number): DateReview {
  const gift = giftById(date.giftId);
  const kind = gift ? receptionOf(gift, date.girl) : "ok";
  const trustDelta = trustAfter - date.startTrust;
  const bondDelta = bondAfter - date.startBonding;
  const nextChance = chanceOf(kind, date.smell, trustDelta, bondDelta);
  return {
    girl: date.girl,
    nth: date.nth,
    trustBefore: date.startTrust,
    trustAfter,
    bondBefore: date.startBonding,
    bondAfter,
    nextChance,
    farts: date.farts,
    smell: smellSummary(date.smell),
    gift: gift ? giftSummary(date.girl, gift) : "No gift. She didn't need one.",
    askNext: date.nth < 3 && nextChance !== "no",
  };
}

export function giftReaction(date: ActiveDate) {
  const gift = giftById(date.giftId);
  if (!gift) return null;
  return {
    line: presentLine(gift, girlName(date.girl)),
    speech: giftSpeech(date.girl, gift),
    delta: receptionDelta(receptionOf(gift, date.girl)),
  };
}

export const APOLOGY = /sorry|i messed up|i should have|i forgot|forgive|i was wrong|didn'?t mean|let me explain|i got (scared|busy|lost)|i'?ll make it up|you didn'?t deserve|that was on me|i stood you up/i;
export const CRUEL = /whatever|don'?t care|dont care|shut up|get over it|not a big deal|your fault|too sensitive|so what|not my problem/i;

const ELSEWHERE: Record<GirlId, LocationId[]> = {
  izzy: ["library", "cafe", "campus", "studyHall", "mexican", "burger", "animeStore", "tabletop", "trail", "gameStore"],
  victoria: ["cafe", "grocery", "italian", "furniture", "craftStore", "mall", "perfume", "library"],
  ronnie: ["gym", "field", "trail", "naturalFoods", "cafe", "library", "sportingGoods", "trendy", "theater", "collectibles"],
  mira: ["library", "theater", "animeStore", "cafe", "perfume", "makeup", "fashion", "gym", "naturalFoods", "collectibles"],
};

export function ageGas(gas: GasPuff[] | undefined): GasPuff[] {
  return (gas ?? []).map((puff) => ({ ...puff, turns: puff.turns - 1 })).filter((puff) => puff.turns > 0);
}

export function nextStop(girl: GirlId, time: TimeOfDay, avoid: LocationId, weekday?: Weekday): LocationId {
  if (weekday) {
    const duty = dutyOf(girl, weekday, time);
    if (duty === "work") return dutyPlace(girl);
    if (duty === "class" && girl !== "victoria") return classSpot(girl, weekday);
  }
  const near = HANGOUT[girl][time].filter((id) => id !== avoid);
  const pool = near.length ? near : ELSEWHERE[girl].filter((id) => id !== avoid);
  return pool[Math.floor(Math.random() * pool.length)] ?? "cafe";
}

export type LeaveReason = "class" | "office" | "daughter" | "night" | "errand" | "bored" | "shift";

export function leaveChance(state: GameState, girl: GirlId, engaged: boolean, bored: boolean) {
  const official = girlIsOfficial(state, girl);
  const weekend = state.weekday === "Saturday" || state.weekday === "Sunday";
  const t = state.timeOfDay;
  let p = 0.05;
  if (girl === "izzy") {
    if (!weekend && (t === "Morning" || t === "Afternoon")) p = 0.28;
    else if (t === "Night" && !official) p = 0.18;
    else p = 0.06;
  } else if (!weekend && (t === "Morning" || t === "Afternoon")) p = 0.26;
  else if (t === "Evening" || t === "Night") p = official ? 0.12 : 0.22;
  else p = 0.06;
  if (engaged) p *= 0.22;
  if (bored) p *= 1.65;
  const card = state.roster?.[girl];
  const trust = card?.trust ?? state.trust;
  const bonding = card?.bonding ?? state.bonding;
  if (trust < 18 && bonding < 18) p *= 1.3;
  if (official) p *= 0.55;
  return Math.min(0.62, p);
}

export function leaveReason(state: GameState, girl: GirlId, bored: boolean): LeaveReason {
  const t = state.timeOfDay;
  const duty = dutyOf(girl, state.weekday, t);
  if (girl === "victoria") {
    if (duty === "work") return "office";
    if (t === "Evening" || t === "Night") return "daughter";
    return bored ? "bored" : "errand";
  }
  if (duty === "class") return "class";
  if (duty === "work") return "shift";
  if (t === "Night") return "night";
  return bored ? "bored" : "errand";
}

export function leaveCopy(girl: GirlId, reason: LeaveReason) {
  if (girl === "victoria") {
    if (reason === "office") return "I have a meeting. It will not move because I'm enjoying this. I have to get back.";
    if (reason === "daughter") return "Veronica's waiting on me. I liked this. I still have to go.";
    if (reason === "bored") return "I think we're done for now. I have a house that doesn't run itself.";
    return "I have errands that will not do themselves. This was good.";
  }
  if (reason === "class") return "I have class. If I skip, the professor notices the empty chair, and I already know how that ends. I have to go.";
  if (reason === "shift") {
    if (girl === "mira") return "The dance block at Second Wind just started. I have to be on the floor.";
    if (girl === "ronnie") return "Second Wind's starting. I teach that block. I have to go.";
    return "My shift at Trailhead. If I don't clock in, the manager notices. I have to go.";
  }
  if (reason === "night") return "I'm heading back. It's late, and I still have reading I was pretending I didn't.";
  if (reason === "bored") return "I'm gonna go. This isn't going anywhere and I can tell. Bye.";
  return "I'm gonna walk. My brain's full. I'll be around.";
}

export function followLines(girl: GirlId, streak: number): {
  expression: Expression;
  trust: number;
  bonding: number;
  text: string;
} {
  if (streak >= 2) {
    if (girl === "victoria") {
      return {
        expression: "angry",
        trust: -8,
        bonding: -5,
        text: "Once, I can call unlucky. Twice is you deciding where I go. I didn't tell you. Don't follow me.",
      };
    }
    return {
      expression: "angry",
      trust: -10,
      bonding: -8,
      text: "You did it again. I left, and you showed up. I didn't tell you where I was going. That's not cute. Don't follow me.",
    };
  }
  if (girl === "victoria") {
    return {
      expression: "suspicious",
      trust: -3,
      bonding: -1,
      text: "I didn't tell you I was coming here. Explain how you knew, and make it good.",
    };
  }
  return {
    expression: "suspicious",
    trust: -4,
    bonding: -2,
    text: "How are you here. I didn't tell you where I was going.",
  };
}

export function dateCrashLine(girl: GirlId): {
  expression: Expression;
  trust: number;
  bonding: number;
  text: string;
} {
  if (girl === "izzy") {
    return {
      expression: "suspicious",
      trust: -12,
      bonding: -6,
      text: "You stood her up. Then you sat down with me. I saw how you treat someone who was waiting. I don't know what that makes me.",
    };
  }
  return {
    expression: "scheming",
    trust: -4,
    bonding: 4,
    text: "She was waiting, and you were here. That's cold. I make cold calls for a living. I'm not going to pretend I'm not a little glad it was my table. Don't make me watch it twice.",
  };
}
