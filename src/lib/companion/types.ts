import type { SceneGirl, SceneVoice } from "./scene";
export type Expression =
  | "embarrassed"
  | "happy"
  | "flirty"
  | "laughing"
  | "suspicious"
  | "shy"
  | "angry"
  | "infodump"
  | "aroused"
  | "thinking"
  | "scheming"
  | "spray"
  | "idle";

export type OutfitId =
  | "casual"
  | "lounge"
  | "campus"
  | "work"
  | "dress"
  | "sleep"
  | "lingerie"
  | "asuka"
  | "mymy";

export type LocationId =
  | "library"
  | "dorm"
  | "cafe"
  | "classroom"
  | "studyHall"
  | "campus"
  | "trail"
  | "mexican"
  | "burger"
  | "mall"
  | "gameStore"
  | "foodCourt"
  | "fashion"
  | "makeup"
  | "collectibles"
  | "trendy"
  | "perfume"
  | "theater"
  | "animeStore"
  | "tabletop"
  | "grocery"
  | "naturalFoods"
  | "sportingGoods"
  | "apartment"
  | "vickyLiving"
  | "vickyBedroom"
  | "craftStore"
  | "italian"
  | "furniture"
  | "firm"
  | "gym"
  | "yogaStudio"
  | "field"
  | "ronnieDorm";

export type PlayerGender = "male" | "female";
export type PlayerFartRole = "into" | "not";
export type GameMode = "slow" | "casual";
export type GirlId = "izzy" | "victoria" | "ronnie";
export type RelationshipType = "mono" | "harem";

export interface GirlCard {
  met: boolean;
  trust: number;
  bonding: number;
  bond: Bond;
  romanceOffered: boolean;
  romanceAccepted: boolean;
  knowsAboutSpray: boolean;
  scentInterest: boolean;
  dates: number;
  dateSpots: LocationId[];
  expression: Expression;
  outfit: OutfitId;
  /** Her own scent glands. Every spray spends one. Not shared with the other woman. */
  glandCap: number;
  glandShots: number;
  turnsSinceIntimateSpray: number;
  glandDry: number;
  /** How many numbers this reply's fart window sits below today's max. 0 is the full range. */
  fartDebt: number;
  /** Unique food places she has visited today. A repeat does not widen the window again. */
  fedStops: LocationId[];
}

export type Roster = Record<GirlId, GirlCard>;

export interface QueuedMeet {
  girl: GirlId;
  place: LocationId;
  time: TimeOfDay;
  nextDay: boolean;
}

export type Bond = "stranger" | "acquaintance" | "friend" | "close" | "romantic";

export type FxEvent = "none" | "fart" | "spray" | "blush" | "hearts" | "laugh";

export type SprayKind = "none" | "angry" | "consensual" | "defensive" | "dominant";

export type SprayChoice = "apologize" | "reset" | "embrace" | "overwhelm" | "submit" | "resist" | "surrender" | "aroused";

/** One girl's spray is waiting on the player. Two can be open at once. */
export interface SprayPrompt {
  girl: GirlId;
  kind: Exclude<SprayKind, "none">;
}

export type Weekday = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export type TimeOfDay = "Morning" | "Afternoon" | "Evening" | "Night";
export type DayPhase = "playing" | "planning" | "summary" | "meet" | "morning" | "handoff";
export type ThreatLevel = "none" | "scare" | "attack";
export type SprayTally = { angry: number; defensive: number; consensual: number; dominant: number };
export type SprayYield = "none" | "submit" | "resist";
export type SmellStance = "welcome" | "neutral" | "flinch";

export interface DateDraft {
  girl: GirlId;
  nth: number;
  time: TimeOfDay | null;
  place: LocationId | null;
  day: Weekday | null;
  giftId: string | null;
}

export interface ScheduledDate {
  girl: GirlId;
  nth: number;
  time: TimeOfDay;
  place: LocationId;
  day: Weekday;
  giftId: string;
  /** True once this copy has already left the bag. */
  giftHeld?: boolean;
}

export interface ActiveDate {
  girl: GirlId;
  nth: number;
  place: LocationId;
  giftId: string;
  cyclesLeft: number;
  startTrust: number;
  startBonding: number;
  farts: number;
  presented: boolean;
  smell: SmellStance;
  /** True once this copy has already left the bag. */
  giftHeld?: boolean;
}

export interface DateReview {
  girl: GirlId;
  nth: number;
  trustBefore: number;
  trustAfter: number;
  bondBefore: number;
  bondAfter: number;
  nextChance: "likely" | "uncertain" | "no";
  farts: number;
  smell: string;
  gift: string;
  askNext: boolean;
}

export interface Grudge {
  place: LocationId;
  day: Weekday;
  time: TimeOfDay;
}

/** Where she went after she walked out. She did not tell the player. */
export interface Departure {
  girl: GirlId;
  place: LocationId;
}

/** She already said she has class or work. The next reply is the last, then she goes. */
export interface DutyNotice {
  girl: GirlId;
  duty: "class" | "work";
  place: LocationId;
}

/** How much of the current stink still belongs to each skunkgirl. */
export interface ScentFrom {
  izzy: number;
  victoria: number;
  ronnie: number;
}

/** She asked about the smell and may press once. */
export interface StinkTalk {
  girl: GirlId;
  presses: number;
}

/** Girlfriend reacting to another skunkgirl's mark. */
export type AffairPhase = "wait" | "hint" | "demand" | "warn" | "reclaim" | "spent" | "known";

export interface MarkAffair {
  girl: GirlId;
  marker: GirlId;
  phase: AffairPhase;
  waits: number;
}

/** One fart's worth of gas. Size is how many turns it lingers, and how much it adds. */
export interface GasPuff {
  id: string;
  size: 1 | 2 | 3;
  turns: number;
}

export type InviteReply = "accept" | "decline";

export type ChatRole = "player" | SceneGirl | "narrator" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  say?: string;
  action?: string;
  /** Player beat that is not spoken. Act is visible. Think is private. */
  aside?: "act" | "think";
  expression?: Expression;
  trustDelta?: number;
  bondingDelta?: number;
  /** Set on a third-or-later girl's spray line. */
  sprayKind?: SprayKind;
  fx?: FxEvent;
  at: number;
}

export interface GameFlags {
  invitedMexican: boolean;
  invitedDorm: boolean;
  visitedDorm: boolean;
  knowsAboutSpray: boolean;
  romanceOffered: boolean;
  romanceAccepted: boolean;
  workShift: boolean;
  firstFartTest: boolean;
  firstInfodumpTest: boolean;
  sprayRepair: boolean;
  intimateSprayResolved: boolean;
  evaInterest: boolean;
  mymyInterest: boolean;
  /** Not-into player started enjoying her gas. She may test spray next. */
  fartConverted: boolean;
  /** Submit switches later sprays to intimate. Resist keeps dominant mind-break. */
  sprayYield: SprayYield;
  /** After a defensive spray: she is gloating, or confused that it aroused them. */
  defenseAftermath: "none" | "surrender" | "aroused";
  /** They asked her to stop shortening their name. */
  nicknamesOff: boolean;
  /** They have shown they want her farts and/or spray, not just her. */
  scentInterest: boolean;
  /** A sexual scene is in progress. Night will not cut it off. */
  intimateScene: boolean;
}

export interface GameState {
  version: number;
  playerName: string;
  playerGender: PlayerGender;
  playerFartRole: PlayerFartRole;
  gameMode: GameMode;
  relationshipType: RelationshipType;
  /** Who the live trust / bonding meters belong to. */
  focus: GirlId;
  /** Who is physically in the scene. */
  present: GirlId[];
  /** Girls who have farted in this scene since it was down to one. See scene.ts. */
  sceneFarts?: string[];
  roster: Roster;
  /** The girl the current plan is with. */
  planGirl: GirlId;
  /** Morning was spent with someone else before a later appointment. */
  morningDetour: boolean;
  queuedMeet: QueuedMeet | null;
  /** Which appointment the travel card is taking you to. */
  meetKind: "plan" | "queue";
  /** Monogamous official partner, if any. */
  partner: GirlId | null;
  /** She already caught this scene. Don't bill it twice. */
  affairKnown: boolean;
  /** Completed dates in Slow Romance. Casual ignores this. */
  dates: number;
  dateSpots: LocationId[];
  /** A date is underway; the next turn at this place counts it. */
  dateOpen: LocationId | null;
  /** Next wake-up meeting is a planned date. */
  plannedDate: boolean;
  started: boolean;
  trust: number;
  bonding: number;
  location: LocationId;
  outfit: OutfitId;
  expression: Expression;
  bond: Bond;
  messages: ChatMessage[];
  sprayed: boolean;
  sprayKind: SprayKind;
  /** The other woman, if she sprayed on this same beat. Independent of sprayKind. */
  otherSprayKind: SprayKind;
  /** Unanswered spray reactions. One per girl. Input stays locked until this is empty. */
  sprayPrompts: SprayPrompt[];
  sprayCount: number;
  testsDone: string[];
  flags: GameFlags;
  pendingTest: string | null;
  pendingInvite: LocationId | null;
  pendingIntimateSpray: boolean;
  /** Shots in the focus girl's current session. Any spray spends one. 0 = no session open. */
  glandCap: number;
  glandShots: number;
  /** Turns since her last spray. Three quiet turns end the session. */
  turnsSinceIntimateSpray: number;
  /** Turns left before her emptied glands refill. */
  glandDry: number;
  weekday: Weekday;
  timeOfDay: TimeOfDay;
  /** Turns Izzy must let a fart or spray land before another. 0 = clear. */
  scentHold: number;
  /** Skunkgirl replies left before the clock moves. Her goodbye does not spend the last one. */
  turnsUntilTime: number;
  dayPhase: DayPhase;
  izzyHere: boolean;
  pendingDefensive: boolean;
  threatLevel: ThreatLevel;
  planTime: TimeOfDay | null;
  planPlace: LocationId | null;
  planAccepted: boolean;
  dayStartTrust: number;
  dayStartBonding: number;
  dayFarts: number;
  daySprays: SprayTally;
  dayTopics: string[];
  debug: boolean;
  debugOutfitLock: boolean;
  money: number;
  inventory: string[];
  dateDraft: DateDraft | null;
  scheduledDate: ScheduledDate | null;
  activeDate: ActiveDate | null;
  dateReview: DateReview | null;
  confronting: GirlId | null;
  grudge: Partial<Record<GirlId, Grudge>>;
  dateTipOff: Partial<Record<GirlId, boolean>>;
  /** Lingering fart gas. New farts stack. Each puff lasts `size` turns. */
  gas: GasPuff[];
  /** She just left for this place. Following her there is noticeable. */
  departure: Departure | null;
  /** How many times in a row the player went where she had just gone. */
  trailStreak: number;
  trailGirl: GirlId | null;
  /** Turns spent in the current scene. She won't walk out on the first hello. */
  sceneTurns: number;
  /** Shifts banked since last Monday. Payday is $20 each. */
  shiftsWorked: number;
  /** Already used Go to Work in this calendar day. */
  workedToday: boolean;
  /** She just refused to leave class or work. A rude follow-up is what costs Izzy. */
  pressedDuty: GirlId | null;
  /** Current stink on the player, 0–100. */
  stink: number;
  /** Remaining stink attributed to each skunkgirl. */
  scentFrom: ScentFrom;
  /** daySerial when that girl last brought up the player's smell. */
  stinkAsked: Partial<Record<GirlId, number>>;
  /** Smell question still open. Null once the subject changes. */
  stinkTalk: StinkTalk | null;
  /** Showers already taken today. Two is the cap. */
  showersToday: number;
  /** Increments each calendar day. */
  daySerial: number;
  /** Girls who have warned they must leave for class or work. */
  dutyNotice: DutyNotice[];
  /** daySerial when she last showed the player off for smelling like her. */
  flauntDay: Partial<Record<GirlId, number>>;
  /** A girlfriend's ongoing reaction to being marked by the other skunkgirl. */
  markAffair: MarkAffair | null;
}

export interface IzzyTurn {
  narration?: string;
  dialogue: string;
  expression: Expression;
  trustDelta: number;
  bondingDelta: number;
  fx: FxEvent;
  suggestLocation?: LocationId | null;
  outfit?: OutfitId | null;
  inner?: string;
  testId?: string | null;
  romanceOffer?: boolean;
  sprayed?: boolean;
  sprayKind?: SprayKind | null;
  pendingIntimateSpray?: boolean;
  /** The other woman, when both are in the scene. */
  otherDialogue?: string;
  otherExpression?: Expression;
  otherTrustDelta?: number;
  otherBondingDelta?: number;
  otherFx?: FxEvent;
  /** Hers alone. She can dominant-spray while the other intimate-sprays. */
  otherSprayKind?: SprayKind | null;
  /** A third girl and beyond (see scene.ts). */
  extras?: SceneVoice<string>[];
  /** Ronnie only: how the player took gas this turn. Scales her trust (RONNIE_FART_REACTIONS). */
  fartReaction?: FartReaction;
}

export type FartReaction = "none" | "playful" | "cool" | "attracted" | "negative" | "bigIssue";

export interface PlayerBeat {
  kind: "say" | "act" | "think";
  /** What the player wrote, in place. */
  text: string;
  /** Physical part of an action. Empty when the beat is only a thought. */
  seen?: string;
}

export interface TurnInput {
  say: string;
  action: string;
  /** Private. She cannot hear this. Not for her to answer. */
  thought?: string;
  beats?: PlayerBeat[];
  invite?: LocationId | null;
  inviteReply?: InviteReply | null;
}
