import { create } from "zustand";
import { askIzzy } from "./api";
import {
  FART_COUNT,
  OUTFIT_CYCLE,
  nextIndex,
  parseDebugCommand,
  parseDebugName,
  posesFor,
  type DebugCommand,
} from "./debug";
import { fartClipAt, fartSizeFor, pickFartSrc } from "./audio";
import { ronnieReactionTrust } from "./ronnie-bio";
import { clearFed, intimateFetishFart, mentionsFart, playerAskedFart, readDebt, readStops, resolveFx, sceneIsIntimate, settleGuts, shapeSpontaneousFart, windowBonus } from "./fart";
import {
  holdCopy,
  indulgesPublicFart,
  intimacyCall,
  playfulPublicAsk,
  publicFartNo,
  publicFartYes,
  recentLines,
  redirectCopy,
  refusalCopy,
  scentRelentless,
  showedScentInterest,
} from "./intimacy";
import { isDateAsk, romanceGate } from "./dates";
import { giftById, isStore } from "./gifts";
import {
  APOLOGY,
  CRUEL,
  addressedGirls,
  ageGas,
  awkwardMention,
  buildReview,
  classifyInvite,
  closingLine,
  cyclesFor,
  dateCrashLine,
  dateIsDue,
  dutyOf,
  dutyPlace,
  dutyExitNarration,
  dutyFarewell,
  dutyStop,
  dutyWarn,
  followLines,
  giftReaction,
  girlAt,
  goodbyeSaid,
  inviteParty,
  isAwkwardPlace,
  awkwardForAny,
  leaveChance,
  leaveCopy,
  leaveReason,
  nextSmell,
  nextStop,
  playerAlone,
  prefillDate,
  rudeness,
  slotOpen,
  wasOffended,
  type InvitePlan,
} from "./outing";
import {
  bothHere,
  cardCouple,
  companionChance,
  describeArrival,
  fidelityHit,
  GIRLS,
  girlIsOfficial,
  girlName,
  herHome,
  initialCast,
  isPrivatePlace,
  laterSlot,
  morningSpots,
  otherGirl,
  ownsHome,
  oneGreeting,
  pullFocus,
  pushFocus,
  romanceBlocked,
  seedMeeting,
  speakerRole,
  victoriaDropIn,
  victoriaOpening,
  ronnieOpening,
  ronnieDropIn,
  ronnieMorningDropIn,
  nextGirl,
  absentGirl,
  suitedPlace,
  withGirl,
} from "./cast";
import { inviteAccepted, inviteVerdict, isNo, isYes, scoreInviteReply } from "./invite";
import { localIzzyTurn } from "./local-brain";
import { asLocationId, canSleepNow, openTonight, placeOf } from "./locations";
import { nightClose } from "./night";
import { chosenNickname } from "./nicknames";
import { inviteToken } from "./parse-input";
import { asOutfitId, autoOutfit } from "./portraits";
import {
  blankState,
  clearSave,
  loadSave,
  openingState,
  parseMarkAffair,
  writeSave,
} from "./save";
import { defensiveSprayCopy, dominantSprayMode, finishTanks, madeContact, readTank, resolveSprayEvent, spendTank, talkedDown, threatKind, type GlandTank } from "./spray";
import {
  clampStink,
  displaceScent,
  expose,
  flauntLine,
  freshenRating,
  judgeSmell,
  markBond,
  markLine,
  markedBy,
  normalizeScent,
  reduceStink,
  resolveAffair,
  sameDay,
  SHOWER_PLACES,
  showerCut,
  smellAskLine,
  smellThought,
  smellVerdict,
  type ScentEvent,
} from "./stink";
import { advanceTime, bumpSpray, emptySprays, isCouple, likesPlayer, nextWeekday, parseMeetPlace, parseTimeOfDay, topicsFrom } from "./time";
import { applyBonding, applyTrust, bondFromScores, type Pace } from "./trust";
import type {
  FxEvent,
  GameState,
  InviteReply,
  IzzyTurn,
  LocationId,
  SprayChoice,
  SprayKind,
  SprayPrompt,
  TurnInput,
  PlayerGender,
  PlayerFartRole,
  GameMode,
  GirlId,
  RelationshipType,
  TimeOfDay,
  Weekday,
  Bond,
  Expression,
  GameFlags,
  OutfitId,
  Roster,
  ChatMessage,
} from "./types";
import { clamp, uid } from "@/lib/utils";
import { topScent } from "./stink";
import { logSceneFarts, readSceneFarts, resolveSceneExtras, sceneGirls, sceneOthers, type SceneVoice } from "./scene";

interface CompanionStore extends GameState {
  hydrated: boolean;
  busy: boolean;
  spraySpotlight: boolean;
  draft: string;
  inviteReply: InviteReply | null;
  fxPulse: {
    kind: FxEvent;
    key: number;
    fartIndex?: number;
    fartSrc?: string;
    otherFartSrc?: string;
    intimate?: boolean;
    otherKind?: FxEvent;
    /** Third and later girls in the scene, by id. */
    extraKinds?: Partial<Record<string, FxEvent>>;
    extraFartSrcs?: Partial<Record<string, string>>;
    extraSprayKinds?: Partial<Record<string, SprayKind>>;
  };
  debugFartIndex: number;
  debugPoseIndex: number;
  debugOutfitIndex: number;
  hydrate: () => void;
  start: (name: string, meet?: LocationId, gender?: PlayerGender, fartRole?: PlayerFartRole, mode?: GameMode, relationship?: RelationshipType) => void;
  resume: () => void;
  reset: () => void;
  send: (turn: TurnInput) => Promise<void>;
  travel: (id: LocationId) => void;
  goAlone: (id: LocationId) => void;
  depart: (id: LocationId) => void;
  goToWork: () => void;
  buyGift: (id: string) => void;
  confirmDate: (draft: { time: TimeOfDay; place: LocationId; day: Weekday; giftId: string }) => void;
  postponeDate: () => void;
  attendDate: () => void;
  standUp: () => void;
  dismissDateTip: () => void;
  closeReview: (askAgain: boolean) => void;
  setDraft: (value: string) => void;
  insertDraft: (chunk: string) => void;
  setInviteReply: (value: InviteReply | null) => void;
  dismissSpray: (mode: SprayChoice, girl?: GirlId) => void;
  endSpotlight: () => void;
  acceptRomance: () => void;
  sleep: () => void;
  wake: () => void;
  readTime: () => void;
  studyTime: () => void;
  showPlaces: boolean;
  dismissPlaces: () => void;
  takeShower: (ids: string[]) => void;
  confirmMeet: () => void;
  beginMorning: (place: LocationId) => void;
  resolveHandoff: (planAgain: boolean) => void;
  fading: boolean;
  fadeMs: number;
  /** State from before the player's latest message. Not saved. */
  lastTurn: { state: GameState; turn: TurnInput } | null;
  reroll: () => Promise<void>;
  rollBack: () => void;
}

function asGameState(s: CompanionStore): GameState {
  return {
    version: s.version,
    playerName: s.playerName,
    playerGender: s.playerGender === "female" ? "female" : "male",
    playerFartRole: s.playerFartRole === "not" ? "not" : "into",
    gameMode: s.gameMode === "slow" ? "slow" : "casual",
    dates: s.dates ?? 0,
    dateSpots: s.dateSpots ?? [],
    dateOpen: asLocationId(s.dateOpen),
    plannedDate: Boolean(s.plannedDate),
    started: s.started,
    trust: s.trust,
    bonding: s.bonding,
    location: asLocationId(s.location) ?? "library",
    outfit: asOutfitId(s.outfit) ?? "casual",
    expression: s.expression,
    bond: s.bond,
    messages: s.messages,
    sprayed: s.sprayed,
    sprayKind: s.sprayKind,
    otherSprayKind:
      s.otherSprayKind === "angry" ||
      s.otherSprayKind === "consensual" ||
      s.otherSprayKind === "defensive" ||
      s.otherSprayKind === "dominant"
        ? s.otherSprayKind
        : "none",
    sprayPrompts: Array.isArray(s.sprayPrompts) ? s.sprayPrompts : [],
    sprayCount: s.sprayCount,
    testsDone: s.testsDone,
    flags: s.flags,
    pendingTest: s.pendingTest,
    pendingInvite: asLocationId(s.pendingInvite),
    pendingIntimateSpray: s.pendingIntimateSpray,
    glandCap: s.glandCap ?? 0,
    glandShots: s.glandShots ?? 0,
    turnsSinceIntimateSpray: s.turnsSinceIntimateSpray ?? 0,
    glandDry: s.glandDry ?? 0,
    scentHold: s.scentHold ?? 0,
    weekday: s.weekday ?? "Monday",
    timeOfDay: s.timeOfDay ?? "Afternoon",
    turnsUntilTime: s.turnsUntilTime ?? 10,
    dayPhase: s.dayPhase ?? "playing",
    izzyHere: s.izzyHere !== false,
    pendingDefensive: Boolean(s.pendingDefensive),
    threatLevel: s.threatLevel ?? "none",
    planTime: s.planTime ?? null,
    planPlace: asLocationId(s.planPlace),
    planAccepted: Boolean(s.planAccepted),
    dayStartTrust: s.dayStartTrust ?? s.trust,
    dayStartBonding: s.dayStartBonding ?? s.bonding,
    dayFarts: s.dayFarts ?? 0,
    daySprays: s.daySprays ?? { angry: 0, defensive: 0, consensual: 0, dominant: 0 },
    dayTopics: s.dayTopics ?? [],
    debug: Boolean(s.debug),
    debugOutfitLock: Boolean(s.debugOutfitLock),
    relationshipType: s.relationshipType === "harem" ? "harem" : "mono",
    focus: s.focus === "victoria" || s.focus === "ronnie" ? s.focus : "izzy",
    present: Array.isArray(s.present) && s.present.length ? s.present : [s.focus === "victoria" || s.focus === "ronnie" ? s.focus : "izzy"],
    roster: s.roster ?? initialCast().roster,
    planGirl: s.planGirl === "victoria" || s.planGirl === "ronnie" ? s.planGirl : s.focus === "victoria" || s.focus === "ronnie" ? s.focus : "izzy",
    morningDetour: Boolean(s.morningDetour),
    queuedMeet: s.queuedMeet ?? null,
    meetKind: s.meetKind === "queue" ? "queue" : "plan",
    partner: s.partner === "izzy" || s.partner === "victoria" || s.partner === "ronnie" ? s.partner : null,
    affairKnown: Boolean(s.affairKnown),
    money: typeof s.money === "number" ? s.money : 100,
    inventory: Array.isArray(s.inventory) ? s.inventory : [],
    dateDraft: s.dateDraft ?? null,
    scheduledDate: s.scheduledDate ?? null,
    activeDate: s.activeDate ?? null,
    dateReview: s.dateReview ?? null,
    confronting: s.confronting === "izzy" || s.confronting === "victoria" || s.confronting === "ronnie" ? s.confronting : null,
    grudge: s.grudge ?? {},
    dateTipOff: s.dateTipOff ?? {},
    gas: Array.isArray(s.gas) ? s.gas.filter((puff) => puff && (puff.size === 1 || puff.size === 2 || puff.size === 3) && puff.turns > 0) : [],
    departure: s.departure?.girl === "izzy" || s.departure?.girl === "victoria" || s.departure?.girl === "ronnie" ? s.departure : null,
    trailStreak: typeof s.trailStreak === "number" ? s.trailStreak : 0,
    trailGirl: s.trailGirl === "izzy" || s.trailGirl === "victoria" || s.trailGirl === "ronnie" ? s.trailGirl : null,
    sceneTurns: typeof s.sceneTurns === "number" ? s.sceneTurns : 0,
    sceneFarts: readSceneFarts(s.sceneFarts),
    shiftsWorked: typeof s.shiftsWorked === "number" ? s.shiftsWorked : 0,
    workedToday: Boolean(s.workedToday),
    pressedDuty: s.pressedDuty === "izzy" || s.pressedDuty === "victoria" || s.pressedDuty === "ronnie" ? s.pressedDuty : null,
    stink: typeof s.stink === "number" ? s.stink : 0,
    scentFrom: {
      izzy: typeof s.scentFrom?.izzy === "number" ? s.scentFrom.izzy : 0,
      victoria: typeof s.scentFrom?.victoria === "number" ? s.scentFrom.victoria : 0,
      ronnie: typeof s.scentFrom?.ronnie === "number" ? s.scentFrom.ronnie : 0,
    },
    stinkAsked: s.stinkAsked ?? {},
    stinkTalk:
      s.stinkTalk && (s.stinkTalk.girl === "izzy" || s.stinkTalk.girl === "victoria" || s.stinkTalk.girl === "ronnie")
        ? { girl: s.stinkTalk.girl, presses: s.stinkTalk.presses ?? 0 }
        : null,
    showersToday: typeof s.showersToday === "number" ? s.showersToday : 0,
    daySerial: typeof s.daySerial === "number" ? s.daySerial : 0,
    dutyNotice: Array.isArray(s.dutyNotice) ? s.dutyNotice : [],
    flauntDay: s.flauntDay ?? {},
    markAffair: parseMarkAffair(s.markAffair),
  };
}

function draftFromTurn(turn: TurnInput) {
  if (turn.beats?.length) {
    const body = turn.beats
      .map((beat) => (beat.kind === "say" ? beat.text : beat.kind === "think" ? `{${beat.text}}` : `*${beat.text}*`))
      .join(" ");
    return [body, turn.invite ? inviteToken(turn.invite) : ""].filter(Boolean).join(" ");
  }
  return [
    turn.say.trim(),
    turn.action.trim() ? `*${turn.action.trim()}*` : "",
    turn.invite ? inviteToken(turn.invite) : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function appendPlayer(messages: GameState["messages"], input: TurnInput) {
  const beats = input.beats?.length
    ? input.beats
    : [
        ...(input.say.trim() ? [{ kind: "say" as const, text: input.say.trim() }] : []),
        ...(input.action.trim() ? [{ kind: "act" as const, text: input.action.trim(), seen: input.action.trim() }] : []),
      ];
  const flag =
    input.inviteReply === "accept"
      ? "[accepted her invite]"
      : input.inviteReply === "decline"
        ? "[declined her invite]"
        : "";
  beats.forEach((beat, index) => {
    const note = index === beats.length - 1 ? flag : "";
    messages.push({
      id: uid(),
      role: "player",
      at: Date.now() + index,
      text: [beat.text, note].filter(Boolean).join(" "),
      aside: beat.kind === "say" ? undefined : beat.kind,
      say: beat.kind === "say" ? beat.text : undefined,
      action: beat.kind === "act" ? beat.seen || beat.text : undefined,
    });
  });
  if (input.invite && !beats.length) {
    messages.push({
      id: uid(),
      role: "player",
      at: Date.now(),
      text: [inviteToken(input.invite), flag].filter(Boolean).join(" "),
    });
  } else if (input.invite) {
    messages.push({
      id: uid(),
      role: "player",
      at: Date.now() + beats.length,
      text: inviteToken(input.invite),
    });
  } else if (flag && !beats.length) {
    messages.push({ id: uid(), role: "player", at: Date.now(), text: flag });
  }
}

function rejectedReply(current: GameState["messages"], prior: GameState["messages"]) {
  const oldIds = new Set(prior.map((m) => m.id));
  return current
    .filter((m) => !oldIds.has(m.id) && m.role !== "player")
    .map((m) => m.text)
    .join("\n")
    .slice(0, 700);
}

function deDupeLine(state: GameState, role: GirlId, line: string, asked: string) {
  const trimmed = line.trim();
  if (!trimmed) return line;
  if (/say that again|repeat that|one more time|what was that|what did you say/i.test(asked)) return line;
  const prev = [...state.messages].reverse().find((m) => m.role === role);
  if (!prev || prev.text.trim() !== trimmed) return line;
  const swaps =
    role === "victoria"
      ? [
          "I already said it. I'm not going to perform it twice. What else.",
          "You heard me the first time. Add something new.",
          "I'm still on what you said. Not on a copy of myself.",
        ]
      : [
          "I'm not gonna say that twice. Your turn. New words.",
          "Yeah, I heard myself. What did you actually mean.",
          "Looping me isn't a conversation. Try the next sentence.",
        ];
  const fresh = swaps.find((swap) => swap !== prev.text);
  return fresh ?? swaps[0]!;
}

let lastDutyCut: number | null = null;
let lastDutyGone: GirlId[] = [];
let openPlacesAfterTurn = false;

function paceOf(mode: GameMode, dates: number): Pace {
  return { mode: mode === "slow" ? "slow" : "casual", dates };
}

function nudgeGirl(patch: Partial<GameState>, snapshot: GameState, girl: GirlId, trustDelta: number, bondDelta: number) {
  if (!trustDelta && !bondDelta) return;
  const roster = patch.roster ?? snapshot.roster;
  const focus = patch.focus ?? snapshot.focus ?? "izzy";
  if (girl === focus) {
    const pace = paceOf(snapshot.gameMode, patch.dates ?? snapshot.dates ?? 0);
    const trust = applyTrust(patch.trust ?? snapshot.trust, trustDelta, pace);
    const bonding = applyBonding(patch.bonding ?? snapshot.bonding, bondDelta, pace);
    const romantic = Boolean((patch.flags ?? snapshot.flags).romanceAccepted);
    const bond = bondFromScores(trust, bonding, romantic);
    patch.trust = trust;
    patch.bonding = bonding;
    patch.bond = bond;
    patch.roster = withGirl({ ...snapshot, ...patch, roster } as GameState, girl, { trust, bonding, bond });
    return;
  }
  const card = roster[girl];
  if (!card) return;
  const pace = paceOf(snapshot.gameMode, card.dates);
  const trust = applyTrust(card.trust, trustDelta, pace);
  const bonding = applyBonding(card.bonding, bondDelta, pace);
  const bond = bondFromScores(trust, bonding, card.romanceAccepted);
  patch.roster = withGirl({ ...snapshot, ...patch, roster } as GameState, girl, { trust, bonding, bond });
}

function endRelationship(patch: Partial<GameState>, snapshot: GameState, girl: GirlId) {
  const focus = patch.focus ?? snapshot.focus ?? "izzy";
  const roster = patch.roster ?? snapshot.roster;
  const trust = girl === focus ? (patch.trust ?? snapshot.trust) : (roster[girl]?.trust ?? 0);
  const bonding = girl === focus ? (patch.bonding ?? snapshot.bonding) : (roster[girl]?.bonding ?? 0);
  const bond = bondFromScores(trust, bonding, false);
  const flags = { ...(patch.flags ?? snapshot.flags) };
  if (girl === focus) {
    flags.romanceAccepted = false;
    flags.romanceOffered = false;
    patch.trust = trust;
    patch.bonding = bonding;
    patch.bond = bond;
    patch.flags = flags;
  }
  if ((patch.partner ?? snapshot.partner) === girl) patch.partner = null;
  patch.roster = withGirl({ ...snapshot, ...patch, roster, flags } as GameState, girl, {
    trust,
    bonding,
    bond,
    romanceAccepted: false,
    romanceOffered: false,
  });
}

function isGirlfriend(snapshot: GameState, patch: Partial<GameState>, girl: GirlId) {
  const focus = patch.focus ?? snapshot.focus ?? "izzy";
  if (girl === focus) {
    const flags = patch.flags ?? snapshot.flags;
    if (flags.romanceAccepted || (patch.bond ?? snapshot.bond) === "romantic") return true;
  }
  return cardCouple((patch.roster ?? snapshot.roster)[girl]);
}

function insertAt(messages: ChatMessage[], at: number | null, line: ChatMessage) {
  if (at == null || at < 0 || at > messages.length) messages.push(line);
  else messages.splice(at, 0, line);
  return at == null ? null : at + 1;
}

function seatAfterExit(
  gone: GirlId,
  present: GirlId[],
  roster: Roster,
  seat: {
    liveFocus: GirlId;
    trust: number;
    bonding: number;
    bond: Bond;
    expression: Expression;
    outfit: OutfitId;
    dates: number;
    dateSpots: LocationId[];
    flags: GameFlags;
    izzyHere: boolean;
  },
) {
  if (!present.length) return { ...seat, izzyHere: false };
  if (gone !== seat.liveFocus) return { ...seat, izzyHere: true };
  const stay = present[0]!;
  const card = roster[stay];
  if (!card) return { ...seat, izzyHere: true };
  return {
    liveFocus: stay,
    trust: card.trust,
    bonding: card.bonding,
    bond: card.bond,
    expression: card.expression,
    outfit: card.outfit,
    dates: card.dates,
    dateSpots: [...card.dateSpots],
    flags: {
      ...seat.flags,
      romanceOffered: card.romanceOffered,
      romanceAccepted: card.romanceAccepted,
      knowsAboutSpray: card.knowsAboutSpray,
      scentInterest: card.scentInterest,
    },
    izzyHere: true,
  };
}

/** Unasked farts are a d12. A direct request is the same die, with a one-turn modifier. */
function applyFartDice(state: GameState, input: TurnInput, turn: IzzyTurn): IzzyTurn {
  const place = state.location;
  const blob = `${input.say} ${input.action}`;
  const present = state.izzyHere === false ? [] : (state.present ?? []);
  const focus = state.focus ?? "izzy";
  const asked = playerAskedFart(blob);
  const named = asked ? addressedGirls(blob, present) : [];
  const prompted = asked ? new Set(named.length ? named : present) : null;
  const intimate = sceneIsIntimate(state, input);
  let next = turn;
  const modeFor = (girl: GirlId): "force" | "roll" | "prompt" => {
    if (girl === focus && next.testId === "fart-test") return "force";
    if (prompted?.has(girl)) return "prompt";
    return "roll";
  };
  if (present.includes(focus) && next.fx !== "spray" && !next.sprayed) {
    const card = state.roster?.[focus];
    const shaped = shapeSpontaneousFart(
      focus,
      state.trust,
      place,
      readStops(card),
      readDebt(card),
      next.fx ?? "none",
      next.narration ?? "",
      next.dialogue ?? "",
      modeFor(focus),
      undefined,
      intimate,
      windowBonus(state, focus),
    );
    next = {
      ...next,
      fx: shaped.fx,
      narration: shaped.narration,
      dialogue: shaped.dialogue,
      expression: shaped.expression ?? next.expression,
    };
  }
  const other = otherGirl(focus, present);
  if (present.includes(other) && next.otherFx !== "spray" && !next.otherSprayKind) {
    const card = state.roster?.[other];
    const shaped = shapeSpontaneousFart(
      other,
      card?.trust ?? 0,
      place,
      readStops(card),
      readDebt(card),
      next.otherFx ?? "none",
      "",
      next.otherDialogue ?? "",
      modeFor(other),
      undefined,
      intimate,
      windowBonus(state, other),
    );
    let otherDialogue = shaped.dialogue;
    if (shaped.fx === "fart" && !mentionsFart(otherDialogue)) {
      const sidelined = other === "izzy" && !/\b(izzy|isabella)\b/i.test(blob);
      const tail = sidelined
        ? "Hey. I'm still in this. That one was so you'd look at me."
        : other === "victoria"
          ? "Excuse me."
          : "And that one was mine.";
      otherDialogue = otherDialogue.trim() ? `${otherDialogue.trim()} ${tail}` : tail;
    }
    if (shaped.fx === "fart" || next.otherFx === "fart" || modeFor(other) === "prompt") {
      next = {
        ...next,
        otherFx: shaped.fx === "fart" ? "fart" : "none",
        otherDialogue,
        otherExpression:
          shaped.expression ??
          (shaped.fx === "fart" ? (next.otherExpression ?? (other === "victoria" ? "shy" : "embarrassed")) : next.otherExpression),
      };
    }
  }
  // Third and later girls. Same die, same prompt modifier, one voice each in `extras`.
  const extraGirls = sceneOthers(present, focus).filter((girl) => girl !== other);
  if (extraGirls.length) {
    const voices = [...(next.extras ?? [])];
    for (const girl of extraGirls) {
      const at = voices.findIndex((v) => v.girl === girl);
      const voice = at >= 0 ? voices[at]! : { girl, dialogue: "", fx: "none" as FxEvent };
      if (voice.fx === "spray") continue;
      const card = state.roster?.[girl];
      const shaped = shapeSpontaneousFart(
        girl,
        card?.trust ?? 0,
        place,
        readStops(card),
        readDebt(card),
        voice.fx ?? "none",
        "",
        voice.dialogue ?? "",
        modeFor(girl),
        undefined,
        intimate,
        windowBonus(state, girl),
      );
      if (shaped.fx !== "fart" && voice.fx !== "fart" && modeFor(girl) !== "prompt" && at < 0) continue;
      const updated = {
        ...voice,
        fx: shaped.fx === "fart" ? ("fart" as const) : ("none" as const),
        dialogue: shaped.dialogue || (shaped.fx === "fart" ? "That one was mine." : ""),
        expression: shaped.expression ?? (shaped.fx === "fart" ? (voice.expression ?? "embarrassed") : voice.expression),
      };
      if (at >= 0) voices[at] = updated;
      else voices.push(updated);
    }
    next = { ...next, extras: voices };
  }
  return next;
}

async function runTurn(
  snapshot: GameState,
  payload: TurnInput,
  get: () => CompanionStore,
  set: (p: Partial<CompanionStore>) => void,
  opts?: { reroll?: boolean; avoid?: string },
) {
  let result: IzzyTurn;
  try {
    const present = snapshot.izzyHere === false ? [] : (snapshot.present ?? []);
    const named = addressedGirls(`${payload.say} ${payload.action}`, present);
    if (named.length === 1 && named[0] !== snapshot.focus) {
      snapshot = pullFocus(snapshot, named[0]);
    }
    try {
      const remote = await askIzzy({
        data: {
          state: { ...snapshot, messages: snapshot.messages.slice(-12) },
          turn: payload,
          reroll: opts?.reroll
            ? `REROLL: The player rejected your previous reply to this same input. Write a different response that fits the scene better. Do not repeat the rejected reply. Do not spray, move location, or escalate unless their words truly require it.\nRejected reply:\n${opts.avoid || "(none)"}`
            : undefined,
        },
      });
      result = remote.ok ? remote.turn : localIzzyTurn(snapshot, payload);
    } catch {
      result = localIzzyTurn(snapshot, payload);
    }
    const asked = `${payload.say} ${payload.action}`;
    const focusIdEarly = snapshot.focus ?? "izzy";
    if (!result.sprayed && result.fx !== "fart" && result.fx !== "spray") {
      result = { ...result, dialogue: deDupeLine(snapshot, speakerRole(focusIdEarly), result.dialogue ?? "", asked) };
    }
    if (result.otherDialogue && result.otherFx !== "fart" && result.otherFx !== "spray") {
      result = {
        ...result,
        otherDialogue: deDupeLine(snapshot, speakerRole(otherGirl(focusIdEarly, present)), result.otherDialogue, asked),
      };
    }
    result = { ...result, fx: resolveFx(result), suggestLocation: asLocationId(result.suggestLocation) };
    result = applyFartDice(snapshot, payload, result);
    const patch = applyTurn(snapshot, payload, result, { reroll: Boolean(opts?.reroll) });
    const focusId = patch.focus ?? snapshot.focus ?? "izzy";
    const voice = speakerRole(focusId);
    const said = patch.messages ?? [];
    const fresh = said.slice(snapshot.messages.length);
    const hers =
      [...fresh].reverse().find((m) => m.role === voice && (m.fx === "fart" || m.fx === "spray")) ??
      [...fresh].reverse().find((m) => m.role === voice);
    const otherId = otherGirl(focusId, patch.present ?? snapshot.present ?? []);
    const otherWasHere = (snapshot.present ?? []).includes(otherId) || (patch.present ?? []).includes(otherId);
    const otherVoice = speakerRole(otherId);
    const theirs = otherWasHere
      ? ([...fresh].reverse().find((m) => m.role === otherVoice && (m.fx === "fart" || m.fx === "spray")) ??
        [...fresh].reverse().find((m) => m.role === otherVoice))
      : undefined;
    const focusShot = patch.sprayKind != null && patch.sprayKind !== "none";
    const herGas = focusShot ? "spray" : hers?.fx === "fart" ? "fart" : null;
    const otherGas = theirs?.fx === "fart" || theirs?.fx === "spray" ? theirs.fx : undefined;
    const fx = herGas ?? (hers?.fx && hers.fx !== "none" && hers.fx !== "spray" ? hers.fx : "none");
    const otherKind = otherGas;
    const intimate =
      (fx === "fart" || otherKind === "fart") && intimateFetishFart(snapshot, payload, result);
    const atCasa = (patch.location ?? snapshot.location) === "mexican";
    const clipKind = atCasa ? "table" : intimate ? "intimate" : "casual";
    let gas = patch.gas ?? [];
    let fartSrc: string | undefined;
    let otherFartSrc: string | undefined;
    if (fx === "fart") {
      fartSrc = pickFartSrc(clipKind);
      gas = [...gas, { id: uid(), size: fartSizeFor(fartSrc), turns: fartSizeFor(fartSrc) }];
    }
    if (otherKind === "fart") {
      otherFartSrc = pickFartSrc(clipKind);
      const size = fartSizeFor(otherFartSrc);
      gas = [...gas, { id: uid(), size, turns: size }];
    }
    const events: ScentEvent[] = [];
    if (fx === "fart") events.push({ girl: focusId, amount: fartSizeFor(fartSrc ?? "") });
    if (otherKind === "fart") events.push({ girl: otherId, amount: fartSizeFor(otherFartSrc ?? "") });
    if (patch.sprayKind && patch.sprayKind !== "none") events.push({ girl: focusId, amount: 10 });
    if (patch.otherSprayKind && patch.otherSprayKind !== "none") events.push({ girl: otherId, amount: 10 });
    const extraFx: Partial<Record<GirlId, FxEvent>> = {};
    const extraFartSrcs: Partial<Record<GirlId, string>> = {};
    const extraSprays: Partial<Record<GirlId, SprayKind>> = {};
    for (const girl of sceneOthers(patch.present ?? snapshot.present ?? [], focusId).filter((id) => id !== otherId)) {
      const line = [...fresh].reverse().find((m) => m.role === speakerRole(girl) && (m.fx === "fart" || m.fx === "spray"));
      if (!line?.fx) continue;
      extraFx[girl] = line.fx;
      if (line.fx === "spray" && line.sprayKind) extraSprays[girl] = line.sprayKind;
      if (line.fx === "fart") {
        const src = pickFartSrc(clipKind);
        const size = fartSizeFor(src);
        extraFartSrcs[girl] = src;
        gas = [...gas, { id: uid(), size, turns: size }];
        events.push({ girl, amount: size });
      } else events.push({ girl, amount: 10 });
    }
    let level = clampStink(snapshot.stink ?? 0);
    let from = normalizeScent(snapshot.scentFrom);
    const hadGas = (snapshot.gas ?? []).some((puff) => puff.turns > 0);
    const company = snapshot.izzyHere !== false && (snapshot.present ?? []).length > 0;
    if (company && !hadGas && events.length === 0) {
      const faded = reduceStink(level, from, 1);
      level = faded.stink;
      from = faded.scent;
    }
    const poured = expose(level, from, events);
    const messages = patch.messages ?? [];
    let cursor = lastDutyCut;
    const dutyGone = new Set(lastDutyGone);
    const playerLine = `${payload.say} ${payload.action}`;
    let talk = snapshot.stinkTalk ?? null;
    let notedSmell = { ...(snapshot.stinkAsked ?? {}) };
    let flaunt = { ...(snapshot.flauntDay ?? {}) };
    const day = patch.daySerial ?? snapshot.daySerial ?? 0;
    const presentThen = snapshot.izzyHere === false ? [] : [...(snapshot.present ?? [])];
    const smellWord = /\b(smell|stink|scent|musk|skunk)\b/i;
    const marked = markedBy(poured.stink, poured.scent);
    const scenePlace = patch.location ?? snapshot.location;
    const when = patch.weekday ?? snapshot.weekday;
    const clock = patch.timeOfDay ?? snapshot.timeOfDay;
    const dropped =
      Boolean(snapshot.markAffair) && !isGirlfriend(snapshot, patch, snapshot.markAffair!.girl);
    let carried = dropped ? null : (snapshot.markAffair ?? null);
    let reactor: GirlId | null = null;
    if (carried && presentThen.includes(carried.girl) && !dutyGone.has(carried.girl)) {
      reactor = carried.girl;
    } else if (!carried) {
      const mates = presentThen.filter(
        (girl) => girl !== marked && !dutyGone.has(girl) && isGirlfriend(snapshot, patch, girl),
      );
      reactor = mates.includes(focusId) ? focusId : (mates[0] ?? null);
    }
    let plan = resolveAffair({
      existing: reactor && carried?.girl === reactor ? carried : reactor ? null : carried,
      girl: reactor,
      marker: marked,
      stink: poured.stink,
      mode: (patch.relationshipType ?? snapshot.relationshipType) === "harem" ? "harem" : "mono",
      markerIsPartner: marked ? isGirlfriend(snapshot, patch, marked) : false,
      text: playerLine,
      place: scenePlace,
      onDuty: reactor ? dutyOf(reactor, when, clock) !== "free" : false,
      busy: (patch.sprayPrompts?.length ?? 0) > 0 || Boolean(patch.sprayed),
      hold: patch.scentHold ?? snapshot.scentHold ?? 0,
    });
    if (!reactor) {
      plan = {
        girl: null,
        affair: carried,
        trust: 0,
        bonding: 0,
        breakTest: null,
        spray: null,
        fart: 0,
        lines: [],
        skipGeneric: false,
      };
    }
    if (plan.skipGeneric && talk?.girl === plan.girl) talk = null;
    if (talk && !presentThen.includes(talk.girl)) talk = null;
    if (talk && presentThen.includes(talk.girl)) {
      const judgment = judgeSmell(poured.stink, playerLine, talk.presses);
      nudgeGirl(patch, snapshot, talk.girl, judgment.trust, judgment.bonding);
      if (!judgment.relevant) talk = null;
      else {
        const line = smellVerdict(talk.girl, poured.stink, judgment);
        const already = messages
          .slice(snapshot.messages.length)
          .some((message) => message.role === speakerRole(talk!.girl) && smellWord.test(message.text));
        if (line && !already) {
          cursor = insertAt(messages, cursor, {
            id: uid(),
            role: speakerRole(talk.girl),
            at: Date.now(),
            text: line,
            expression: judgment.honest ? "shy" : "suspicious",
          });
        }
        talk = judgment.followUp ? { girl: talk.girl, presses: talk.presses + 1 } : null;
      }
    }
    const source = topScent(poured.scent);
    if (poured.switched && presentThen.includes(poured.switched.girl)) {
      const girl = poured.switched.girl;
      nudgeGirl(patch, snapshot, girl, 0, markBond(poured.switched.applied));
      cursor = insertAt(messages, cursor, {
        id: uid(),
        role: speakerRole(girl),
        at: Date.now(),
        expression: girl === "victoria" ? "scheming" : "flirty",
        text: markLine(girl, poured.switched.applied, isPrivatePlace(scenePlace) ? "private" : "public"),
      });
      flaunt = { ...flaunt, [girl]: day };
    } else if (!talk && !plan.skipGeneric) {
      const focusNow = patch.focus ?? snapshot.focus ?? "izzy";
      const candidates = presentThen.filter(
        (girl) =>
          girl !== source &&
          girl !== plan.girl &&
          !sameDay(notedSmell, girl, day) &&
          poured.stink > 10 &&
          !dutyGone.has(girl),
      );
      const asker = candidates.includes(focusNow) ? focusNow : candidates[0];
      const volunteered = Boolean(asker) && judgeSmell(poured.stink, playerLine, 0).relevant;
      if (volunteered && asker && (patch.sprayPrompts?.length ?? 0) === 0) {
        const judgment = judgeSmell(poured.stink, playerLine, 0);
        nudgeGirl(patch, snapshot, asker, judgment.trust, judgment.bonding);
        const line = smellVerdict(asker, poured.stink, judgment);
        if (line) {
          cursor = insertAt(messages, cursor, {
            id: uid(),
            role: speakerRole(asker),
            at: Date.now(),
            text: line,
            expression: judgment.honest ? "shy" : "suspicious",
          });
        }
        notedSmell = { ...notedSmell, [asker]: day };
        talk = judgment.followUp ? { girl: asker, presses: 1 } : null;
      } else if (asker && (patch.sprayPrompts?.length ?? 0) === 0) {
        const already = messages
          .slice(snapshot.messages.length)
          .some((message) => message.role === speakerRole(asker) && smellWord.test(message.text));
        if (!already) {
          cursor = insertAt(messages, cursor, {
            id: uid(),
            role: speakerRole(asker),
            at: Date.now(),
            expression: poured.stink >= 50 ? "suspicious" : "thinking",
            text: smellAskLine(asker, poured.stink),
          });
          if (poured.stink < 50 && (patch.trust ?? snapshot.trust) >= 40) {
            cursor = insertAt(messages, cursor, {
              id: uid(),
              role: "system",
              at: Date.now(),
              text: smellThought(asker, poured.stink),
            });
          }
        }
        notedSmell = { ...notedSmell, [asker]: day };
        talk = { girl: asker, presses: 0 };
      } else if (
        marked &&
        presentThen.includes(marked) &&
        !dutyGone.has(marked) &&
        !isPrivatePlace(scenePlace) &&
        dutyOf(marked, patch.weekday ?? snapshot.weekday, patch.timeOfDay ?? snapshot.timeOfDay) === "free" &&
        !sameDay(flaunt, marked, day) &&
        (patch.sprayPrompts?.length ?? 0) === 0
      ) {
        cursor = insertAt(messages, cursor, {
          id: uid(),
          role: speakerRole(marked),
          at: Date.now(),
          expression: marked === "victoria" ? "scheming" : "flirty",
          text: flauntLine(marked),
        });
        flaunt = { ...flaunt, [marked]: day };
      }
    }
    const extra: ScentEvent[] = [];
    if (plan.girl && plan.fart) extra.push({ girl: plan.girl, amount: plan.fart });
    if (plan.girl && plan.spray) extra.push({ girl: plan.girl, amount: 10 });
    let final = extra.length ? expose(poured.stink, poured.scent, extra) : poured;
    if (plan.girl && plan.affair?.phase === "reclaim" && extra.length) {
      const want = extra.reduce((sum, event) => sum + event.amount, 0);
      const short = Math.max(0, want - Math.max(0, final.stink - poured.stink));
      if (short > 0 && markedBy(final.stink, final.scent) !== plan.girl) {
        const moved = displaceScent(final.stink, final.scent, plan.girl, short);
        final = { stink: moved.stink, scent: moved.scent, switched: moved.switched ?? final.switched };
      }
    }
    let pulseKind: FxEvent = fx;
    let pulseOther: FxEvent | undefined = otherKind;
    let pulseFart = fartSrc;
    let pulseOtherFart = otherFartSrc;
    let pulseIntimate = intimate;
    let spotlight = Boolean(patch.sprayed) || otherGas === "spray";
    for (const line of plan.lines) {
      if (!plan.girl || !line.text) continue;
      cursor = insertAt(messages, cursor, {
        id: uid(),
        role: line.thought ? "system" : speakerRole(plan.girl),
        at: Date.now(),
        text: line.text,
        ...(line.thought ? {} : { expression: line.expression }),
      });
    }
    if (plan.girl && plan.fart) {
      const atCasa = (patch.location ?? snapshot.location) === "mexican";
      const src = pickFartSrc(atCasa ? "table" : true);
      gas = [...gas, { id: uid(), size: plan.fart, turns: plan.fart }];
      pulseIntimate = true;
      patch.dayFarts = (patch.dayFarts ?? snapshot.dayFarts ?? 0) + 1;
      if (plan.girl === focusId) {
        pulseFart = pulseFart ?? src;
        if (pulseKind === "none") pulseKind = "fart";
      } else {
        pulseOtherFart = pulseOtherFart ?? src;
        if (!pulseOther) pulseOther = "fart";
      }
    }
    let affairShot: GirlId | null = null;
    if (plan.girl && plan.spray) {
      const girl = plan.girl;
      const seatedNow = patch.focus ?? snapshot.focus ?? "izzy";
      const rosterNow = patch.roster ?? snapshot.roster;
      const tank =
        girl === seatedNow
          ? readTank({
              glandCap: patch.glandCap ?? snapshot.glandCap,
              glandShots: patch.glandShots ?? snapshot.glandShots,
              turnsSinceIntimateSpray: patch.turnsSinceIntimateSpray ?? snapshot.turnsSinceIntimateSpray,
              glandDry: patch.glandDry ?? snapshot.glandDry,
            })
          : readTank(rosterNow[girl]);
      if (tank.glandDry > 0) {
        cursor = insertAt(messages, cursor, {
          id: uid(),
          role: speakerRole(girl),
          at: Date.now(),
          expression: "shy",
          text: emptyGlandLine(girl),
        });
      } else {
        const prompts = [...(patch.sprayPrompts ?? [])];
        if (!prompts.some((prompt) => prompt.girl === girl)) {
          prompts.push({ girl, kind: plan.spray });
          patch.sprayPrompts = prompts;
          patch.sprayed = true;
          patch.sprayCount = (patch.sprayCount ?? snapshot.sprayCount ?? 0) + 1;
          patch.daySprays = bumpSpray(patch.daySprays ?? snapshot.daySprays, plan.spray);
          spotlight = true;
          affairShot = girl;
          if (girl === focusId) {
            patch.sprayKind = plan.spray;
            patch.flags = { ...(patch.flags ?? snapshot.flags), knowsAboutSpray: true };
            if (pulseKind === "fart" && !pulseOther) {
              pulseOther = "fart";
              pulseOtherFart = pulseFart;
            }
            pulseKind = "spray";
          } else {
            patch.otherSprayKind = plan.spray;
            if (pulseOther === "fart" && pulseKind === "none") {
              pulseKind = "fart";
              pulseFart = pulseOtherFart;
            }
            pulseOther = "spray";
          }
        }
      }
    }
    if (final.switched && final.switched.girl !== poured.switched?.girl && presentThen.includes(final.switched.girl)) {
      const girl = final.switched.girl;
      nudgeGirl(patch, snapshot, girl, 0, markBond(final.switched.applied));
      cursor = insertAt(messages, cursor, {
        id: uid(),
        role: speakerRole(girl),
        at: Date.now(),
        expression: girl === "victoria" ? "scheming" : "flirty",
        text: markLine(girl, final.switched.applied, isPrivatePlace(scenePlace) ? "private" : "public"),
      });
      flaunt = { ...flaunt, [girl]: day };
    }
    if (plan.girl && (plan.trust || plan.bonding)) nudgeGirl(patch, snapshot, plan.girl, plan.trust, plan.bonding);
    let affairNext = plan.girl && markedBy(final.stink, final.scent) === plan.girl ? null : plan.affair;
    let ended = false;
    if (plan.breakTest && plan.girl) {
      const girl = plan.girl;
      const roster = patch.roster ?? snapshot.roster;
      const trustNow = girl === focusId ? (patch.trust ?? snapshot.trust) : (roster[girl]?.trust ?? 0);
      const bondNow = girl === focusId ? (patch.bonding ?? snapshot.bonding) : (roster[girl]?.bonding ?? 0);
      ended = plan.breakTest === "over" ? !(trustNow > 50 && bondNow > 50) : trustNow < 50 || bondNow < 50;
      const stay =
        girl === "victoria"
          ? "I am not leaving you. Do not mistake that for this being fine."
          : "I'm still here. Don't look relieved.";
      const done =
        girl === "victoria"
          ? "I am not carrying her scent and you. We're done."
          : "Then I'm not your girlfriend. I'm done.";
      if (ended) {
        endRelationship(patch, snapshot, girl);
        affairNext = null;
      }
      cursor = insertAt(messages, cursor, {
        id: uid(),
        role: speakerRole(girl),
        at: Date.now(),
        expression: ended ? "angry" : "suspicious",
        text: ended ? done : stay,
      });
    }
    const face = [...plan.lines].reverse().find((line) => !line.thought)?.expression;
    const expression = plan.spray ? "spray" : ended ? "angry" : plan.breakTest ? "suspicious" : face;
    if (plan.girl && expression) {
      if (plan.girl === focusId) patch.expression = expression;
      else {
        const roster = patch.roster ?? snapshot.roster;
        const card = roster[plan.girl];
        patch.roster = withGirl({ ...snapshot, ...patch, roster } as GameState, plan.girl, {
          expression,
          knowsAboutSpray: Boolean(card?.knowsAboutSpray) || Boolean(plan.spray),
        });
      }
    }
    patch.messages = messages;
    patch.stink = final.stink;
    patch.scentFrom = final.scent;
    patch.stinkTalk = talk;
    patch.stinkAsked = notedSmell;
    patch.flauntDay = flaunt;
    patch.markAffair = affairNext;
    const origin = snapshot.focus ?? "izzy";
    const seated = patch.focus ?? origin;
    const rosterNow = patch.roster ?? snapshot.roster;
    const tanksNow: Record<GirlId, GlandTank> = {
      izzy: readTank(rosterNow.izzy),
      victoria: readTank(rosterNow.victoria),
      ronnie: readTank(rosterNow.ronnie),
    };
    tanksNow[seated] = readTank({
      glandCap: patch.glandCap ?? tanksNow[seated].glandCap,
      glandShots: patch.glandShots ?? tanksNow[seated].glandShots,
      turnsSinceIntimateSpray: patch.turnsSinceIntimateSpray ?? tanksNow[seated].turnsSinceIntimateSpray,
      glandDry: patch.glandDry ?? tanksNow[seated].glandDry,
    });
    const already: Record<GirlId, boolean> = { izzy: false, victoria: false, ronnie: false };
    if (patch.sprayKind && patch.sprayKind !== "none") already[origin] = true;
    if (patch.otherSprayKind && patch.otherSprayKind !== "none") already[otherGirl(origin, snapshot.present)] = true;
    const glandExtra: Record<GirlId, number> = { izzy: 0, victoria: 0, ronnie: 0 };
    if (affairShot) glandExtra[affairShot] += 1;
    const finished = finishTanks(tanksNow, already, glandExtra);
    const seatedAfter = finished.tanks[seated];
    patch.glandCap = seatedAfter.glandCap;
    patch.glandShots = seatedAfter.glandShots;
    patch.turnsSinceIntimateSpray = seatedAfter.turnsSinceIntimateSpray;
    patch.glandDry = seatedAfter.glandDry;
    let glandRoster = rosterNow;
    glandRoster = withGirl({ ...snapshot, ...patch, roster: glandRoster } as GameState, "izzy", finished.tanks.izzy);
    glandRoster = withGirl({ ...snapshot, ...patch, roster: glandRoster } as GameState, "victoria", finished.tanks.victoria);
    glandRoster = withGirl({ ...snapshot, ...patch, roster: glandRoster } as GameState, "ronnie", finished.tanks.ronnie);
    patch.roster = glandRoster;
    const farted: GirlId[] = [];
    if (fx === "fart" && fartSrc) farted.push(focusId);
    if (otherKind === "fart" && otherFartSrc && !farted.includes(otherId)) farted.push(otherId);
    for (const girl of Object.keys(extraFartSrcs) as GirlId[]) if (!farted.includes(girl)) farted.push(girl);
    if (plan.girl && plan.fart && !farted.includes(plan.girl)) farted.push(plan.girl);
    patch.roster = settleGuts(
      glandRoster,
      patch.izzyHere === false ? [] : [...(patch.present ?? [])],
      patch.location ?? snapshot.location,
      farted,
      (patch.daySerial ?? 0) !== (snapshot.daySerial ?? 0),
    );
    for (const girl of finished.emptied) {
      cursor = insertAt(messages, cursor, {
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `${girlName(girl)} emptied her scent glands. Every spray draws from them. She needs a while before she can spray again.`,
      });
    }
    patch.messages = messages;
    patch.sceneFarts = logSceneFarts(
      snapshot.sceneFarts ?? [],
      patch.izzyHere === false ? [] : [...(patch.present ?? snapshot.present ?? [])],
      farted,
    );
    set({
      ...patch,
      gas,
      busy: false,
      ...(openPlacesAfterTurn ? { showPlaces: true } : {}),
      spraySpotlight: spotlight,
      inviteReply: null,
      fxPulse: {
        kind: pulseKind,
        key: Date.now(),
        intimate: pulseIntimate,
        otherKind: pulseOther,
        fartSrc: pulseFart,
        otherFartSrc: pulseOtherFart,
        ...(Object.keys(extraFx).length ? { extraKinds: extraFx, extraFartSrcs, extraSprayKinds: extraSprays } : {}),
      },
    });
    persist({ ...patch, gas }, get);
  } catch {
    set({ busy: false });
  }
}

function persist(partial: Partial<GameState>, get: () => CompanionStore) {
  writeSave(pushFocus({ ...asGameState(get()), ...partial }));
}

function takeOne(items: string[], id: string | null | undefined) {
  if (!id) return items;
  const at = items.indexOf(id);
  if (at < 0) return items;
  return items.filter((_, index) => index !== at);
}

function giveBack(items: string[], id: string | null | undefined, held: boolean | undefined) {
  if (!id || held !== true) return items;
  return [...items, id];
}

function snapshotOf(state: CompanionStore): GameState {
  return asGameState(state);
}

function applyTurn(
  state: GameState,
  input: TurnInput,
  turn: IzzyTurn,
  opts?: { reroll?: boolean },
): Partial<GameState> {
  lastDutyCut = null;
  lastDutyGone = [];
  openPlacesAfterTurn = false;
  const event = resolveSprayEvent(state, input, turn, opts);
  const hayNow = `${input.say} ${input.action}`;
  let pendingDefensive = state.pendingDefensive;
  let threatLevel = state.threatLevel;
  let warned = false;
  let calmed = false;
  let sprayKind: SprayKind = "none";
  if (event.phase === "windup" && event.kind === "defensive") {
    warned = true;
    pendingDefensive = true;
    const kind = threatKind(hayNow) ?? "scare";
    threatLevel = threatLevel === "attack" || kind === "attack" ? "attack" : kind;
  } else if (event.phase === "windup") {
    // Intimate windup is not a spray. The pose and the jets wait for the burst.
  } else if (event.phase === "burst") {
    sprayKind = event.kind;
    if (event.kind === "defensive") {
      pendingDefensive = false;
      if (madeContact(hayNow) || threatKind(hayNow) === "attack") threatLevel = "attack";
      else if (state.pendingDefensive || threatKind(hayNow) === "scare") threatLevel = "scare";
    }
  } else if (state.pendingDefensive && talkedDown(hayNow)) {
    calmed = true;
    pendingDefensive = false;
    threatLevel = "none";
  }
  if (sprayKind === "consensual" && event.phase === "burst" && dominantSprayMode(state, turn)) {
    sprayKind = "dominant";
  }
  if (sprayKind === "dominant" && state.flags.sprayYield === "submit") {
    sprayKind = "consensual";
  }
  let sprayed = event.phase === "burst";
  let pendingIntimateSpray = event.phase === "windup" && event.kind !== "defensive";
  let confronting = state.confronting ?? null;
  let grudge = { ...(state.grudge ?? {}) };
  let stoodDown = false;
  let excused: GirlId | null = null;
  const talkEarly = `${input.say} ${input.action}`;
  if (confronting) {
    if (APOLOGY.test(talkEarly)) {
      sprayed = false;
      sprayKind = "none";
      pendingIntimateSpray = false;
      stoodDown = true;
      excused = confronting;
      delete grudge[confronting];
      confronting = null;
    } else if (CRUEL.test(talkEarly)) {
      sprayed = true;
      sprayKind = "angry";
      pendingIntimateSpray = false;
      confronting = null;
    } else {
      sprayed = false;
      sprayKind = "none";
      pendingIntimateSpray = false;
    }
  }
  let flags = { ...state.flags };
  let suggested = asLocationId(turn.suggestLocation);
  const home = herHome(state.focus ?? "izzy");
  if ((suggested === "dorm" || suggested === "vickyLiving" || suggested === "vickyBedroom" || suggested === "apartment") && !isCouple(state)) {
    suggested = null;
  }
  if (suggested === "dorm" && (state.focus ?? "izzy") !== "izzy") suggested = null;
  if ((suggested === "vickyLiving" || suggested === "vickyBedroom") && state.focus !== "victoria") suggested = null;
  if (suggested === "mexican") flags.invitedMexican = true;
  if (suggested === "dorm" || suggested === "vickyLiving") flags.invitedDorm = true;
  if (turn.romanceOffer && state.gameMode !== "slow") flags.romanceOffered = true;
  if (turn.testId === "fart-test") flags.firstFartTest = true;
  if (turn.testId === "infodump") flags.firstInfodumpTest = true;
  const talk = `${input.say} ${input.action}`.toLowerCase();
  if (
    /evangelion|\beva\b|asuka|shinji|cosplay|plugsuit|unit[- ]?0?2|anime|neko shelf|monster musume|plus sized elf|yan[iy]-?neko|shikanokonoko/.test(
      talk,
    )
  ) {
    flags.evaInterest = true;
  }
  if (/ongezellig|\bmymy\b|japamsterdam/.test(talk)) {
    flags.mymyInterest = true;
  }
  const nick = chosenNickname(state.playerName);
  if (
    /don'?t call me|do not call me|use my (full |real |actual )?name|that'?s not my name|that is not my name|no nicknames?|stop nicknaming|call me by my name/.test(
      talk,
    ) ||
    (nick ? new RegExp(`\\bdon'?t call me ${nick}\\b`, "i").test(talk) : false)
  ) {
    flags.nicknamesOff = true;
  }
  if (
    state.playerFartRole === "not" &&
    /do (it|that) again|i (like|love) (it|when you fart|your farts)|don't stop|dont stop|more of that|fart (on|in) my/.test(
      talk,
    )
  ) {
    flags.fartConverted = true;
  }
  if (showedScentInterest(talk) || flags.fartConverted || flags.sprayYield !== "none") {
    flags.scentInterest = true;
  }
  if (flags.sprayRepair) {
    const hay = `${input.say} ${input.action}`.toLowerCase();
    const repair =
      /listen|sorry|i hear|not your fault|natural|still (love|want|like)|reassur|i'm here|im here|not blaming/.test(
        hay,
      );
    if (repair) flags.sprayRepair = false;
  }

  let bondingDelta = turn.bondingDelta ?? 0;
  let nextLocation = asLocationId(state.location) ?? "library";
  let pendingInvite = asLocationId(state.pendingInvite);
  let traveled: ReturnType<typeof asLocationId> = null;
  let nightShut: LocationId | null = null;

  const asked = asLocationId(input.invite);
  const reply = input.inviteReply ?? null;
  const dateBlob = `${input.say} ${input.action}`;
  const askingDate = isDateAsk(dateBlob) && !state.activeDate && !state.scheduledDate && !state.dateDraft;
  const dateReady = state.trust >= 20 && state.bonding >= 20;
  const taken =
    (state.relationshipType ?? "mono") !== "harem" &&
    Boolean(state.partner) &&
    state.partner !== (state.focus ?? "izzy");
  if (asked && asked !== nextLocation && state.timeOfDay === "Night" && !openTonight(asked)) {
    nightShut = asked;
  } else if (asked && asked !== nextLocation && !(askingDate && (!dateReady || taken))) {
    const tone = inviteVerdict(state, asked);
    if (inviteAccepted(tone)) {
      traveled = asked;
      bondingDelta += tone === "eager" ? 4 : 2;
      if (asked === "dorm") flags.invitedDorm = true;
    } else {
      bondingDelta += tone === "stern-no" ? -2 : 0;
    }
    pendingInvite = null;
  } else if (pendingInvite) {
    const blob = `${input.say} ${input.action}`;
    const accepted = reply === "accept" || (!reply && isYes(blob) && !isNo(blob));
    const declined = reply === "decline" || (!reply && isNo(blob) && !isYes(blob));
    if (accepted) {
      bondingDelta += scoreInviteReply(input.say, input.action, true) + (reply === "accept" ? 3 : 0);
      traveled = pendingInvite;
      if (pendingInvite === "dorm") flags.invitedDorm = true;
      pendingInvite = null;
    } else if (declined) {
      bondingDelta += scoreInviteReply(input.say, input.action, false) + (reply === "decline" ? 0 : 0);
      pendingInvite = null;
    }
  }

  if (suggested && !traveled && !pendingInvite) {
    pendingInvite = suggested;
    if (suggested === "dorm") flags.invitedDorm = true;
    if (suggested === "mexican") flags.invitedMexican = true;
  }

  if (traveled) {
    nextLocation = traveled;
    pendingInvite = null;
  }
  let pressedDuty: GirlId | null = state.pressedDuty ?? null;
  if (traveled) pressedDuty = null;
  else if (pressedDuty) {
    const rude = rudeness(dateBlob);
    if (rude >= 6) {
      bondingDelta -= rude;
      pressedDuty = null;
    } else if (!asked) pressedDuty = null;
  }
  if (
    (state.focus ?? "izzy") === "victoria" &&
    state.location === "firm" &&
    dutyOf("victoria", state.weekday, state.timeOfDay) === "work" &&
    !/design|fabric|swatch|sofa|layout|palette|client|furniture|curtain|interior|color|desk|lobby|reception/.test(dateBlob) &&
    /date|kiss|fart|spray|hang out|let's go|lets go|come with|dinner|sexy|flirt|my place|your place|bedroom/.test(dateBlob)
  ) {
    bondingDelta -= Math.min(6, rudeness(dateBlob));
  }
  if (nextLocation === "dorm") flags.visitedDorm = true;

  if (state.playerFartRole === "not") {
    const stillKind =
      /don't mind|dont mind|it's (ok|fine|okay)|its (ok|fine)|still (like|love|want)|you('re| are) (fine|cute|hot)|i like you|not your fault|natural|come here|kiss/.test(
        talk,
      );
    const flinch = /gross|eww|\bew\b|gag|cough|nasty|too (strong|much)|whoa|hold (it|on)|can't breathe|cant breathe/.test(
      talk,
    );
    if (stillKind) bondingDelta += flinch ? 4 : 2;
  }

  let dates = state.dates ?? 0;
  let dateSpots = [...(state.dateSpots ?? [])];
  let dateOpen = asLocationId(state.dateOpen);
  let plannedDate = Boolean(state.plannedDate);
  let planTime = state.planTime;
  let planPlace = asLocationId(state.planPlace);
  let planGirl = state.planGirl ?? state.focus ?? "izzy";
  let dateNote: "too-soon" | "planned" | "here" | "going" | "planner" | "refused" | null = null;
  let openedThisTurn = false;
  let dateDraft = state.dateDraft ?? null;
  let money = state.money ?? 100;
  let inventory = [...(state.inventory ?? [])];
  let activeDate = state.activeDate ? { ...state.activeDate } : null;
  let scheduledDate = state.scheduledDate ?? null;
  let dateReview = state.dateReview ?? null;
  let giftTrust = 0;
  let giftBond = 0;
  let giftSpeechLine: string | null = null;
  if (askingDate) {
    const hinted = awkwardMention(dateBlob, asked);
    if (hinted && isAwkwardPlace(hinted, planGirl)) {
      dateNote = "refused";
      traveled = null;
      nextLocation = asLocationId(state.location) ?? "library";
      bondingDelta -= rudeness(dateBlob);
    } else if (taken) dateNote = "refused";
    else if (!dateReady) dateNote = "too-soon";
    else {
      const girl = state.focus ?? "izzy";
      const pre = prefillDate(dateBlob, asked, state.weekday);
      dateDraft = {
        girl,
        nth: dates + 1,
        time: pre.time,
        place: pre.place,
        day: pre.day,
        giftId: null,
      };
      dateNote = "planner";
      traveled = null;
      nextLocation = asLocationId(state.location) ?? "library";
    }
  }
  if (activeDate && !activeDate.presented) {
    const reaction = giftReaction(activeDate);
    if (reaction && input.action.includes(reaction.line)) {
      giftTrust = reaction.delta.trust;
      giftBond = reaction.delta.bonding;
      giftSpeechLine = reaction.speech;
      activeDate = { ...activeDate, presented: true, giftHeld: true };
    }
  }
  if (activeDate) {
    activeDate = { ...activeDate, smell: nextSmell(activeDate.smell, dateBlob) };
  }
  if (state.gameMode === "slow" && dateOpen && nextLocation === dateOpen && !openedThisTurn && dates < 3) {
    dates += 1;
    dateSpots = [...dateSpots, dateOpen].slice(-3);
    dateOpen = null;
    plannedDate = false;
  }

  const testsDone = turn.testId ? [...new Set([...state.testsDone, turn.testId])] : state.testsDone;
  const pace: Pace = { mode: state.gameMode === "slow" ? "slow" : "casual", dates };
  const rawTrust = (state.focus ?? "izzy") === "ronnie" ? ronnieReactionTrust(turn.trustDelta ?? 0, turn.fartReaction) : (turn.trustDelta ?? 0);
  let trust = applyTrust(state.trust, rawTrust + giftTrust + (stoodDown ? 6 : 0), pace);
  let bonding = applyBonding(state.bonding, bondingDelta + giftBond + (stoodDown ? 4 : 0), pace);
  const gate = romanceGate(pace.mode, dates, dateSpots);
  if (pace.mode === "slow") {
    const ready = dates >= 3 && trust >= gate.trust && bonding >= gate.bonding && !romanceBlocked(state, trust, bonding, dates);
    if (turn.romanceOffer && ready) flags.romanceOffered = true;
    else if (!ready) flags.romanceOffered = false;
  } else if (romanceBlocked(state, trust, bonding, dates)) {
    flags.romanceOffered = false;
  }
  const romantic = Boolean(
    flags.romanceAccepted ||
      (pace.mode !== "slow" && turn.romanceOffer && trust >= gate.trust && bonding >= gate.bonding),
  );
  let bond = bondFromScores(trust, bonding, romantic);

  const dest = placeOf(nextLocation);
  let outfit = autoOutfit(dest.defaultOutfit, trust, bond, nextLocation, flags);
  const requested = asOutfitId(turn.outfit);
  const cosplayOk = nextLocation === "dorm" && (bond === "romantic" || flags.romanceAccepted);
  if (state.debugOutfitLock && !traveled) {
    outfit = asOutfitId(state.outfit) ?? outfit;
  } else if (cosplayOk && flags.mymyInterest && /ongezellig|\bmymy\b|japamsterdam/.test(talk)) {
    outfit = "mymy";
  } else if (requested === "mymy" && cosplayOk && flags.mymyInterest) {
    outfit = "mymy";
  } else if (requested === "asuka") {
    if (nextLocation === "dorm" && flags.evaInterest && (bond === "romantic" || flags.romanceAccepted)) {
      outfit = "asuka";
    }
  } else if (requested) {
    outfit = requested;
  }

  const call = intimacyCall(
    { ...state, trust, bonding, flags, bond },
    input,
    {
      threat: sprayKind === "defensive" || sprayKind === "angry",
      traveledPublic: Boolean(traveled && traveled !== "dorm" && traveled !== "apartment"),
    },
  );
  const hold = state.scentHold ?? 0;
  const relentless = scentRelentless({ ...state, trust, bonding, flags, bond }, input);
  const triedScent =
    turn.fx === "fart" ||
    turn.fx === "spray" ||
    Boolean(turn.sprayed) ||
    turn.expression === "spray" ||
    pendingIntimateSpray ||
    (sprayed && sprayKind !== "defensive" && sprayKind !== "angry");
  const suppressScent = Boolean(
    call.scene && hold > 0 && !call.release && !relentless && triedScent && !call.blocked,
  );
  if ((call.blocked || call.redirect || suppressScent) && sprayKind !== "defensive" && sprayKind !== "angry") {
    sprayed = false;
    pendingIntimateSpray = false;
    if (sprayKind === "consensual" || sprayKind === "dominant") sprayKind = "none";
  }
  flags.intimateScene = call.scene;
  if (sprayed || sprayKind !== "none") flags.knowsAboutSpray = true;

  let glandCap = state.glandCap ?? 0;
  let glandShots = state.glandShots ?? 0;
  let turnsSinceIntimateSpray = state.turnsSinceIntimateSpray ?? 0;
  let glandDry = state.glandDry ?? 0;
  const focusOrigin = state.focus ?? "izzy";
  let tanks: Record<GirlId, GlandTank> = {
    izzy: readTank(state.roster?.izzy),
    victoria: readTank(state.roster?.victoria),
    ronnie: readTank(state.roster?.ronnie),
  };
  tanks[focusOrigin] = readTank({ glandCap, glandShots, turnsSinceIntimateSpray, glandDry });
  const emptiedGirls: GirlId[] = [];
  let dialogue = turn.dialogue;
  let narration = turn.narration;
  let expression = turn.expression;
  if (warned) {
    narration = "Her ears pin. Her tail lifts halfway, not committed, a warning. She does not spray. Yet.";
    dialogue = "Don't move. I mean it. No sudden anything. Tell me you aren't about to hurt me, or I will.";
    expression = "suspicious";
  } else if (calmed) {
    narration = "The tail lowers. She is still watching your hands.";
    dialogue = "Okay. Okay. I believe you. Don't make me do that again. I hate that I have to.";
    expression = "shy";
  } else if (stoodDown && excused === (state.focus ?? "izzy")) {
    narration = "The tail lowers. She is still angry. She is not going to spray.";
    dialogue =
      (state.focus ?? "izzy") === "victoria"
        ? "I heard you. That does not make it fine. Don't do it again."
        : "Okay. I heard you. Don't leave me sitting there again.";
    expression = "angry";
  } else if (dateNote === "too-soon") {
    narration = "She doesn't move toward the door.";
    dialogue =
      (state.focus ?? "izzy") === "victoria"
        ? "A date is a decision. I'm not there. Ask me when I know you better than this."
        : "A date? Not yet. I like you here. I don't like you enough to call it that.";
    expression = "suspicious";
  } else if (dateNote === "refused") {
    narration = "She doesn't reach for her bag.";
    dialogue =
      (state.focus ?? "izzy") === "victoria"
        ? "No. You already have someone. I will not be the other woman."
        : "No. You already have a girlfriend. I'm not doing that.";
    expression = "angry";
  } else if (dateNote === "planner") {
    narration = "She is willing. Nothing is set until the day, the time, and the place are filled in. A gift is welcome. It is not required.";
    dialogue =
      (state.focus ?? "izzy") === "victoria"
        ? "I'll go. Fill in the card. Day, time, place. Bring something if you want. Don't bring it because you think you have to."
        : "Yeah, I'll go. Fill it in. Day, time, place. A gift is nice. It's not the date.";
    expression = "flirty";
  } else if (dateNote === "planned" && planTime && planPlace) {
    narration = "She files it away like it matters.";
    dialogue = `${planTime}. ${placeOf(planPlace).name}. That's a date. I'll meet you there. Don't stand me up.`;
    expression = "flirty";
  } else if (dateNote === "here") {
    narration = "She looks at the room like it just became something else.";
    dialogue = "Okay. This is a date. I'm counting it. Don't waste it.";
    expression = "flirty";
  } else if (dateNote === "going") {
    narration = "She falls in beside you like she decided.";
    dialogue = "Fine. It's a date. Don't make it a bit.";
    expression = "flirty";
  }
  if (sprayed && sprayKind === "defensive") {
    const why = threatLevel === "attack" ? "attack" : threatLevel === "scare" ? "scare" : "none";
    const copy = defensiveSprayCopy(why);
    narration = copy.narration;
    dialogue = copy.dialogue;
    expression = "spray";
  } else if (call.blocked) {
    const copy = refusalCopy(state, call.blocked);
    narration = copy.narration;
    dialogue = copy.dialogue;
    expression = copy.expression;
  } else if (call.redirect) {
    const copy = redirectCopy(state);
    narration = copy.narration;
    dialogue = copy.dialogue;
    expression = copy.expression;
  } else if (suppressScent) {
    const copy = holdCopy(state.focus ?? "izzy", recentLines(state.messages, state.focus ?? "izzy"));
    narration = copy.narration;
    dialogue = copy.dialogue;
    expression = copy.expression;
  }

  const wantedIntimate =
    turn.sprayKind === "consensual" ||
    turn.sprayKind === "dominant" ||
    sprayKind === "dominant" ||
    turn.pendingIntimateSpray ||
    (turn.fx === "spray" && intimateWant(state, input));

  const blockedEmpty =
    glandDry > 0 &&
    (sprayed || wantedIntimate) &&
    !warned &&
    !calmed &&
    !call.blocked &&
    !call.redirect &&
    !suppressScent;
  if (blockedEmpty) {
    sprayed = false;
    sprayKind = "none";
    pendingIntimateSpray = false;
    dialogue = emptyGlandLine(focusOrigin);
    narration = "Her tail lifts and nothing comes. The glands are empty.";
    expression = "shy";
  }

  if (sprayed && sprayKind !== "none") {
    const spent = spendTank(tanks[focusOrigin]);
    tanks[focusOrigin] = spent.tank;
    if (spent.emptied) emptiedGirls.push(focusOrigin);
  }

  const msgs = [...state.messages];
  if (nightShut) {
    msgs.push({
      id: uid(),
      role: "narrator",
      at: Date.now(),
      text: `${placeOf(nightShut).name} is closed for the night.`,
    });
  }
  let girlReplies = 0;
  if (
    input.say.trim() ||
    input.action.trim() ||
    input.thought?.trim() ||
    input.beats?.length ||
    input.invite ||
    input.inviteReply
  ) {
    appendPlayer(msgs, input);
  }
  if (traveled) {
    const destPlace = placeOf(traveled);
    msgs.push({
      id: uid(),
      role: "narrator",
      at: Date.now(),
      text: `You end up at ${destPlace.name}. ${destPlace.blurb}`,
    });
  }
  const focusNow = state.focus ?? "izzy";
  let liveFocus = focusNow;
  const voice = speakerRole(focusNow);
  const who = girlName(focusNow);
  let present =
    state.izzyHere === false
      ? [...(state.present ?? [])]
      : [...(state.present?.length ? state.present : [focusNow])];
  let roster = state.roster ?? initialCast(focusNow).roster;
  let affairKnown = Boolean(state.affairKnown);
  let partner = state.partner ?? null;
  let meetKind = state.meetKind ?? "plan";
  if (traveled) {
    let party = inviteParty(state, `${input.say} ${input.action}`, traveled);
    // Every girl who is not the focus can tag along or already be there. Izzy/Victoria keep their old order.
    for (const other of [otherGirl(focusNow), ...GIRLS.filter((g) => g !== focusNow && g !== otherGirl(focusNow))]) {
    const wasWith = state.izzyHere !== false && (state.present ?? []).includes(other);
    if (!party.includes(other) && dutyOf(other, state.weekday, state.timeOfDay) === "free") {
      const chance = companionChance(focusNow, traveled, other);
      if (chance > 0 && Math.random() < chance) {
        party = [...party, other];
        const first = !roster[other]?.met;
        roster = withGirl({ ...state, roster }, other, {
          met: true,
          expression: other === "victoria" ? "shy" : "happy",
          trust: Math.max(roster[other]?.trust ?? 0, first ? 4 : roster[other]?.trust ?? 0),
          bonding: Math.max(roster[other]?.bonding ?? 0, first ? 2 : roster[other]?.bonding ?? 0),
        });
        msgs.push({
          id: uid(),
          role: "narrator",
          at: Date.now(),
          text: describeArrival(focusNow, other, traveled, first),
        });
      }
    } else if (party.includes(other) && !wasWith) {
      const first = !roster[other]?.met;
      roster = withGirl({ ...state, roster }, other, {
        met: true,
        expression: "happy",
        trust: Math.max(roster[other]?.trust ?? 0, first ? 4 : roster[other]?.trust ?? 0),
        bonding: Math.max(roster[other]?.bonding ?? 0, first ? 2 : roster[other]?.bonding ?? 0),
      });
      msgs.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `${girlName(other)} is already at ${placeOf(traveled).name}.`,
      });
      if (dutyOf(other, state.weekday, state.timeOfDay) === "work" && traveled === dutyPlace(other)) {
        msgs.push({
          id: uid(),
          role: speakerRole(other),
          at: Date.now(),
          expression: "thinking",
          text:
            other === "victoria"
              ? "I'm at the desk. If this is about a room, a fabric, or a client, I can help. Anything else will have to wait."
              : other === "ronnie"
                ? "I'm teaching right now. Grab a mat and join in, or catch me after class."
                : "I'm on the floor. If you need a pack, ask. If this is a hangout, I'm working.",
        });
      }
    }
    }
    const leftBehind = (state.izzyHere === false ? [] : (state.present ?? [])).filter((id) => !party.includes(id));
    for (const girl of leftBehind) {
      msgs.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `${girlName(girl)} doesn't come.`,
      });
    }
    present = party;
  }
  let forcedFx: "none" | "fart" | null = null;
  const playerBlob = `${input.say} ${input.action}`;
  const askedPublic =
    !playerAskedFart(playerBlob) && playfulPublicAsk(playerBlob) && !isPrivatePlace(nextLocation) && !relentless;
  if (askedPublic && !warned && !calmed && !sprayed && !suppressScent && !call.blocked && !call.redirect) {
    const onDuty = dutyOf(focusNow, state.weekday, state.timeOfDay) !== "free";
    const company = present.includes("izzy") && present.includes("victoria");
    const yes = indulgesPublicFart(focusNow, nextLocation, trust, company, onDuty);
    const tried = turn.fx === "fart" || mentionsFart(`${dialogue} ${narration}`);
    if (!yes) {
      const said = recentLines(state.messages, focusNow);
      const copy = publicFartNo(focusNow, said);
      narration = copy.narration;
      dialogue = copy.dialogue;
      expression = copy.expression;
      forcedFx = "none";
    } else if (!tried) {
      const copy = publicFartYes(focusNow, company);
      narration = copy.narration;
      dialogue = copy.dialogue;
      expression = copy.expression;
      forcedFx = "fart";
    }
  }
  const quiet =
    warned || calmed || blockedEmpty || Boolean(call.blocked) || call.redirect || suppressScent;
  if (narration?.trim()) {
    msgs.push({
      id: uid(),
      role: "narrator",
      at: Date.now(),
      text: narration.trim(),
    });
  }
  msgs.push({
    id: uid(),
    role: voice,
    at: Date.now(),
    text: dialogue,
    expression,
    trustDelta: turn.trustDelta,
    bondingDelta: turn.bondingDelta,
    fx: forcedFx ?? (warned || calmed || blockedEmpty || call.blocked || call.redirect || suppressScent ? "none" : sprayed ? "spray" : turn.fx),
  });
  if (present.includes(focusNow) && (dialogue.trim() || sprayed || turn.fx === "fart" || turn.fx === "spray")) {
    girlReplies += 1;
  }
  if (giftSpeechLine && activeDate) {
    const given = giftById(activeDate.giftId);
    const mentioned = given ? dialogue.toLowerCase().includes(given.name.split(" ")[0]!.toLowerCase()) : false;
    if (!mentioned) {
      msgs.push({
        id: uid(),
        role: voice,
        at: Date.now(),
        expression: "shy",
        text: giftSpeechLine,
      });
    }
  }
  if (excused && activeDate && excused !== activeDate.girl) {
    present = present.filter((id) => id !== excused);
    msgs.push({
      id: uid(),
      role: speakerRole(excused),
      at: Date.now(),
      expression: "angry",
      text:
        excused === "victoria"
          ? "I heard you. That does not make it fine. Don't do it again."
          : "Okay. I heard you. Don't leave me sitting there again.",
    });
    msgs.push({
      id: uid(),
      role: "narrator",
      at: Date.now(),
      text: `${girlName(excused)} lets the tail down. She doesn't stay.`,
    });
  }
  let pairedFart = false;
  let pairedSpray = false;
  let otherSprayKind: SprayKind = "none";
  let otherSprayer: GirlId | null = null;
  if (bothHere({ present })) {
    const other = otherGirl(focusNow, present);
    let otherFx = turn.otherFx ?? "none";
    const namedKind = turn.otherSprayKind;
    if (otherFx !== "fart" && (otherFx === "spray" || namedKind)) {
      otherSprayKind =
        namedKind === "angry" || namedKind === "consensual" || namedKind === "defensive" || namedKind === "dominant"
          ? namedKind
          : "consensual";
      otherFx = "spray";
    }
    const hardSpray = otherSprayKind === "angry" || otherSprayKind === "defensive";
    const holdGas = warned || calmed || blockedEmpty || call.blocked || call.redirect || suppressScent;
    const otherDry = tanks[other].glandDry > 0;
    let otherBlocked = false;
    let otherLine = turn.otherDialogue?.trim() ?? "";
    if (otherFx === "fart" && holdGas) {
      otherFx = "none";
      if (mentionsFart(otherLine)) otherLine = "";
    }
    if (otherFx === "spray" && otherDry) {
      otherFx = "none";
      otherSprayKind = "none";
      otherBlocked = true;
    } else if (otherFx === "spray" && !hardSpray && holdGas) {
      otherFx = "none";
      otherSprayKind = "none";
    }
    if (otherFx === "fart") pairedFart = true;
    if (otherFx === "spray") {
      pairedSpray = true;
      otherSprayer = other;
      const spent = spendTank(tanks[other]);
      tanks[other] = spent.tank;
      if (spent.emptied) emptiedGirls.push(other);
    } else otherSprayKind = "none";
    if (otherLine || otherFx === "fart" || otherFx === "spray" || otherBlocked) {
      const spoken = otherBlocked
        ? emptyGlandLine(other)
        : otherLine || (other === "victoria" ? "I wasn't going to. Then I did." : "Okay. Mine too.");
      const otherExpression = otherBlocked
        ? "shy"
        : otherFx === "spray"
          ? "spray"
          : (turn.otherExpression ?? roster[other]?.expression ?? "shy");
      msgs.push({
        id: uid(),
        role: speakerRole(other),
        at: Date.now(),
        text: spoken,
        expression: otherExpression,
        fx: otherFx === "none" ? undefined : otherFx,
      });
      girlReplies += 1;
      const card = roster[other];
      if (card) {
        const nextTrust = Math.max(0, Math.min(100, card.trust + Math.round(turn.otherTrustDelta ?? 0)));
        const nextBond = Math.max(0, Math.min(100, card.bonding + Math.round(turn.otherBondingDelta ?? 0)));
        roster = withGirl({ ...state, roster }, other, {
          trust: nextTrust,
          bonding: nextBond,
          bond: bondFromScores(nextTrust, nextBond, card.romanceAccepted),
          expression: otherExpression,
          met: true,
          knowsAboutSpray: card.knowsAboutSpray || otherFx === "spray",
        });
      }
    }
  }
  const extraSprayers: { girl: GirlId; kind: SprayKind }[] = [];
  if (sceneGirls({ present, izzyHere: true }).length > 2) {
    const covered: GirlId[] = [focusNow, otherGirl(focusNow, present)];
    const holdGas = Boolean(warned || calmed || blockedEmpty || call.blocked || call.redirect || suppressScent);
    const extras = resolveSceneExtras<GirlId>({
      voices: turn.extras as SceneVoice<GirlId>[] | undefined,
      present,
      covered,
      holdGas,
      dry: (girl) => (tanks[girl]?.glandDry ?? 0) > 0,
      mentionsFart,
      dryLine: emptyGlandLine,
    });
    for (const out of extras) {
      if (out.fx === "spray" && tanks[out.girl]) {
        extraSprayers.push({ girl: out.girl, kind: out.sprayKind ?? "defensive" });
        const spent = spendTank(tanks[out.girl]);
        tanks[out.girl] = spent.tank;
        if (spent.emptied) emptiedGirls.push(out.girl);
      }
      msgs.push({
        id: uid(),
        role: speakerRole(out.girl),
        at: Date.now(),
        text: out.text,
        expression: out.expression,
        fx: out.fx,
        ...(out.sprayKind ? { sprayKind: out.sprayKind } : {}),
      });
      girlReplies += 1;
      const card = roster[out.girl];
      if (card) {
        const nextTrust = Math.max(0, Math.min(100, card.trust + out.trustDelta));
        const nextBond = Math.max(0, Math.min(100, card.bonding + out.bondingDelta));
        roster = withGirl({ ...state, roster }, out.girl, {
          trust: nextTrust,
          bonding: nextBond,
          bond: bondFromScores(nextTrust, nextBond, card.romanceAccepted),
          expression: out.expression,
          met: true,
          knowsAboutSpray: card.knowsAboutSpray || out.fx === "spray",
        });
      }
    }
  }
  const sprayPrompts: SprayPrompt[] = [];
  const windowFor = (kind: SprayKind) =>
    kind !== "none" && !(kind === "consensual" && flags.intimateSprayResolved);
  if (sprayed && windowFor(sprayKind)) sprayPrompts.push({ girl: focusNow, kind: sprayKind as SprayPrompt["kind"] });
  if (pairedSpray && otherSprayer && windowFor(otherSprayKind)) {
    sprayPrompts.push({ girl: otherSprayer, kind: otherSprayKind as SprayPrompt["kind"] });
  }
  // A third girl's spray gets the same response window as the other two.
  for (const shot of extraSprayers) {
    if (windowFor(shot.kind)) sprayPrompts.push({ girl: shot.girl, kind: shot.kind as SprayPrompt["kind"] });
  }
  if (activeDate && !confronting) {
    const other = otherGirl(activeDate.girl);
    if (grudge[other] && !present.includes(other)) {
      present = [...present, other];
      confronting = other;
      const dateGirl = activeDate.girl;
      const crash = dateCrashLine(dateGirl);
      if (dateGirl === liveFocus) {
        trust = applyTrust(trust, crash.trust, pace);
        bonding = applyBonding(bonding, crash.bonding, pace);
        bond = bondFromScores(trust, bonding, romantic);
        expression = crash.expression;
        roster = withGirl({ ...state, roster }, dateGirl, { trust, bonding, bond, expression });
      } else {
        const card = roster[dateGirl];
        const nextTrust = applyTrust(card?.trust ?? 0, crash.trust, pace);
        const nextBond = applyBonding(card?.bonding ?? 0, crash.bonding, pace);
        roster = withGirl({ ...state, roster }, dateGirl, {
          trust: nextTrust,
          bonding: nextBond,
          bond: bondFromScores(nextTrust, nextBond, Boolean(card?.romanceAccepted)),
          expression: crash.expression,
        });
      }
      msgs.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `${girlName(other)} is here. She was not invited. Her tail is already up.`,
      });
      msgs.push({
        id: uid(),
        role: speakerRole(other),
        at: Date.now(),
        expression: "angry",
        text:
          other === "victoria"
            ? "You stood me up, and now I find you here. Talk. You have one chance before I spray."
            : "You left me waiting. And you're on a date. Start talking, or I spray. I mean it.",
      });
      msgs.push({
        id: uid(),
        role: speakerRole(dateGirl),
        at: Date.now(),
        expression: crash.expression,
        text: crash.text,
      });
    }
  }
  if (!call.scene) affairKnown = false;
  const hit = fidelityHit(
    { ...state, present, roster, affairKnown, partner, focus: focusNow },
    `${input.say} ${input.action}`,
    Boolean(call.scene),
  );
  if (hit) {
    roster = hit.roster;
    partner = hit.partner;
    affairKnown = hit.affairKnown;
    for (const line of hit.lines) {
      msgs.push({
        id: uid(),
        role: line.role,
        at: Date.now(),
        text: line.text,
        expression: line.expression,
      });
    }
  }
  for (const girl of emptiedGirls) {
    msgs.push({
      id: uid(),
      role: "narrator",
      at: Date.now(),
      text: `${girlName(girl)} emptied her scent glands. Every spray draws from them. She needs a while before she can spray again.`,
    });
  }
  if (turn.inner?.trim() && trust >= 40 && !warned && !calmed && !sprayed && !call.blocked && !call.redirect && !suppressScent) {
    msgs.push({
      id: uid(),
      role: "system",
      at: Date.now(),
      text: turn.inner.trim(),
    });
  }

  let turnsUntilTime = state.turnsUntilTime;
  let timeOfDay = state.timeOfDay;
  let weekday = state.weekday;
  const timeBefore = timeOfDay;
  const dayBefore = weekday;
  let daySerial = state.daySerial ?? 0;
  let showersToday = state.showersToday ?? 0;
  let dayPhase = state.dayPhase;
  let clockMoved = false;
  let shiftsWorked = state.shiftsWorked ?? 0;
  let workedToday = Boolean(state.workedToday);
  const lineFx = forcedFx ?? (quiet ? "none" : sprayed ? "spray" : turn.fx);
  const dayFarts = state.dayFarts + (lineFx === "fart" ? 1 : 0) + (pairedFart ? 1 : 0);
  if (activeDate && (lineFx === "fart" || pairedFart)) {
    activeDate = { ...activeDate, farts: activeDate.farts + (lineFx === "fart" ? 1 : 0) + (pairedFart ? 1 : 0) };
  }
  let daySprays = sprayed ? bumpSpray(state.daySprays, sprayKind) : state.daySprays;
  if (pairedSpray && otherSprayKind !== "none") daySprays = bumpSpray(daySprays, otherSprayKind);
  for (const shot of extraSprayers) daySprays = bumpSpray(daySprays, shot.kind);
  const dayTopics = topicsFrom(`${input.say} ${input.action} ${dialogue}`, state.dayTopics ?? []);
  const emittedScent =
    call.scene &&
    !quiet &&
    (lineFx === "fart" || (sprayed && (sprayKind === "consensual" || sprayKind === "dominant")));
  const scentHold = !call.scene ? 0 : relentless ? 0 : emittedScent ? 2 : Math.max(0, hold - 1);
  if (
    call.concluded &&
    timeOfDay === "Night" &&
    flags.romanceAccepted &&
    !isPrivatePlace(nextLocation) &&
    !pendingInvite &&
    dayPhase === "playing"
  ) {
    pendingInvite = home;
    msgs.push({
      id: uid(),
      role: voice,
      at: Date.now(),
      expression: "flirty",
      text:
        focusNow === "victoria"
          ? "It's still night. My house, or your apartment. I'm asking. Come home with me."
          : "It's still night. My dorm, or your apartment. I'm asking. Come with me.",
    });
  }
  if (dayPhase === "playing") {
    const nightScene = call.scene && timeOfDay === "Night" && !activeDate;
    const dutyExitThisTurn =
      !traveled &&
      !activeDate &&
      (state.dutyNotice ?? []).some((notice) => present.includes(notice.girl));
    const hardSpray = sprayed && (sprayKind === "defensive" || sprayKind === "angry");
    if (nightScene || girlReplies <= 0) {
      // Night intimacy does not move the clock. Neither does a turn where no skunkgirl replied.
    } else if (hardSpray || dutyExitThisTurn) {
      // A spray, or her scheduled goodbye, counts without advancing the hour mid-line.
      turnsUntilTime = Math.max(1, turnsUntilTime - girlReplies);
    } else {
      turnsUntilTime -= girlReplies;
      if (turnsUntilTime <= 0) {
        const prevTime = timeOfDay;
        const prevDay = weekday;
        const next = advanceTime(timeOfDay);
        timeOfDay = next.time;
        turnsUntilTime = Math.max(1, 10 + turnsUntilTime);
        clockMoved = true;
        pressedDuty = null;
        if (next.dayRoll) {
          weekday = nextWeekday(weekday);
          workedToday = false;
          daySerial += 1;
          showersToday = 0;
          if (weekday === "Monday") {
            const shifts = shiftsWorked;
            const pay = shifts * 20;
            money += pay;
            shiftsWorked = 0;
            msgs.push({
              id: uid(),
              role: "system",
              at: Date.now(),
              text: shifts
                ? `Payday. ${shifts} shift${shifts === 1 ? "" : "s"}. $${pay}.`
                : "Monday. You didn't work. Nothing hits your account.",
            });
          }
        }
        const missed =
          scheduledDate &&
          !activeDate &&
          scheduledDate.day === prevDay &&
          scheduledDate.time === prevTime;
        const together = isCouple({ flags, bond });
        if (activeDate) {
          const left = activeDate.cyclesLeft - 1;
          if (left <= 0) {
            const review = buildReview(activeDate, trust, bonding);
            dates += 1;
            dateSpots = [...dateSpots, activeDate.place].slice(-3);
            plannedDate = false;
            dateOpen = null;
            msgs.push({
              id: uid(),
              role: "narrator",
              at: Date.now(),
              text: "The date has run its length. She doesn't rush the last word.",
            });
            msgs.push({
              id: uid(),
              role: voice,
              at: Date.now(),
              expression: review.nextChance === "no" ? "shy" : "happy",
              text: closingLine(activeDate.girl, review.nextChance),
            });
            dateReview = review;
            activeDate = null;
          } else {
            activeDate = { ...activeDate, cyclesLeft: left };
          }
        } else if (missed && scheduledDate) {
          const hurt = scheduledDate.girl;
          const dropTrust = applyTrust(hurt === focusNow ? trust : (state.roster?.[hurt]?.trust ?? trust), -30, pace);
          const dropBond = applyBonding(hurt === focusNow ? bonding : (state.roster?.[hurt]?.bonding ?? bonding), -24, pace);
          grudge = {
            ...grudge,
            [hurt]: { place: scheduledDate.place, day: prevDay, time: prevTime },
          };
          if (scheduledDate.giftId) inventory = giveBack(inventory, scheduledDate.giftId, scheduledDate.giftHeld);
          if (hurt === focusNow) {
            trust = dropTrust;
            bonding = dropBond;
            bond = bondFromScores(dropTrust, dropBond, romantic);
          }
          roster = withGirl({ ...state, roster }, hurt, {
            trust: dropTrust,
            bonding: dropBond,
            bond: bondFromScores(dropTrust, dropBond, Boolean(state.roster?.[hurt]?.romanceAccepted)),
          });
          msgs.push({
            id: uid(),
            role: "narrator",
            at: Date.now(),
            text: `The hour passed. ${girlName(hurt)} was waiting. You were not there.`,
          });
          scheduledDate = null;
        } else if (timeOfDay === "Night" && together && openTonight(nextLocation, "Night") && !isPrivatePlace(nextLocation) && !pendingInvite) {
          pendingInvite = home;
          msgs.push({
            id: uid(),
            role: voice,
            at: Date.now(),
            expression: "flirty",
            text:
              focusNow === "victoria"
                ? "It's night and I'm not walking back alone. My house, or your apartment. I'm asking."
                : "It's night and I'm not walking back alone. My dorm, or your apartment. I'm asking. Come with me.",
          });
        }
      }
    }
  }

  let gas = ageGas(state.gas);
  let sceneTurns = traveled ? 1 : dayPhase === "playing" ? (state.sceneTurns ?? 0) + 1 : (state.sceneTurns ?? 0);
  let departure = clockMoved ? null : (state.departure ?? null);
  let trailStreak = clockMoved ? 0 : (state.trailStreak ?? 0);
  let trailGirl: GirlId | null = clockMoved ? null : (state.trailGirl ?? null);
  let izzyHere = state.izzyHere !== false;
  const talkLength = `${input.say} ${input.action}`.trim().length;
  const swing = (turn.trustDelta ?? 0) + (turn.bondingDelta ?? 0);
  const offendedNow = wasOffended(`${input.say} ${input.action}`, swing);
  const engaged = swing >= 2 || talkLength > 80;
  const boredTalk = swing <= 0 && talkLength < 28;
  let dutyNotice = traveled || activeDate ? [] : [...(state.dutyNotice ?? [])];
  const due =
    traveled || activeDate || dayPhase !== "playing"
      ? []
      : dutyNotice.filter((notice) => present.includes(notice.girl));
  if (due.length) {
    lastDutyCut = msgs.length;
    lastDutyGone = due.map((notice) => notice.girl);
    const spokenFrom = state.messages.length;
    for (const notice of due) {
      const gone = notice.girl;
      const already = msgs.slice(spokenFrom).some((message) => {
        return (
          message.role === speakerRole(gone) &&
          (goodbyeSaid(message.text) || /\b(class|shift|clock in|trailhead|line & lumen|i have to go)\b/i.test(message.text))
        );
      });
      if (!already) {
        msgs.push({
          id: uid(),
          role: speakerRole(gone),
          at: Date.now(),
          expression: "thinking",
          text: dutyFarewell(gone, notice.duty),
        });
      }
      if (gone === liveFocus) {
        roster = withGirl({ ...state, roster }, gone, {
          trust,
          bonding,
          bond,
          expression: "thinking",
          romanceOffered: flags.romanceOffered,
          romanceAccepted: flags.romanceAccepted,
          knowsAboutSpray: flags.knowsAboutSpray,
          scentInterest: flags.scentInterest,
          dates,
          dateSpots,
          outfit,
        });
      }
      present = present.filter((id) => id !== gone);
      departure = { girl: gone, place: notice.place };
      if (trailGirl !== gone) trailStreak = 0;
      trailGirl = gone;
      sceneTurns = 0;
      const seated = seatAfterExit(gone, present, roster, {
        liveFocus,
        trust,
        bonding,
        bond,
        expression,
        outfit,
        dates,
        dateSpots,
        flags,
        izzyHere,
      });
      liveFocus = seated.liveFocus;
      trust = seated.trust;
      bonding = seated.bonding;
      bond = seated.bond;
      expression = seated.expression;
      outfit = seated.outfit;
      dates = seated.dates;
      dateSpots = seated.dateSpots;
      flags = seated.flags;
      izzyHere = seated.izzyHere;
      msgs.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: present.length
          ? `${dutyExitNarration(gone, notice.duty)} ${girlName(present[0]!)} stays.`
          : dutyExitNarration(gone, notice.duty),
      });
    }
    dutyNotice = dutyNotice.filter((notice) => !due.some((item) => item.girl === notice.girl));
  }
  const canLeave =
    !due.length &&
    izzyHere &&
    dayPhase === "playing" &&
    !clockMoved &&
    !activeDate &&
    !confronting &&
    !sprayed &&
    !pendingIntimateSpray &&
    !pendingDefensive &&
    !flags.intimateScene &&
    !call.scene &&
    !traveled &&
    !dateDraft &&
    !warned &&
    !calmed &&
    (sceneTurns >= 5 || offendedNow) &&
    present.includes(liveFocus);
  if (canLeave && Math.random() < leaveChance({ ...state, trust, bonding }, liveFocus, engaged, boredTalk)) {
    const reason = leaveReason(state, liveFocus, boredTalk);
    const gone = liveFocus;
    roster = withGirl({ ...state, roster }, gone, {
      trust,
      bonding,
      bond,
      expression: "shy",
      romanceOffered: flags.romanceOffered,
      romanceAccepted: flags.romanceAccepted,
      knowsAboutSpray: flags.knowsAboutSpray,
      scentInterest: flags.scentInterest,
      dates,
      dateSpots,
      outfit,
    });
    present = present.filter((id) => id !== gone);
    departure = { girl: gone, place: nextStop(gone, timeOfDay, nextLocation, weekday) };
    if (trailGirl !== gone) trailStreak = 0;
    trailGirl = gone;
    sceneTurns = 0;
    msgs.push({
      id: uid(),
      role: speakerRole(gone),
      at: Date.now(),
      expression: "shy",
      text: leaveCopy(gone, reason),
    });
    if (present.length) {
      const stay = present[0]!;
      const card = roster[stay];
      if (card) {
        liveFocus = stay;
        trust = card.trust;
        bonding = card.bonding;
        bond = card.bond;
        expression = card.expression;
        outfit = card.outfit;
        dates = card.dates;
        dateSpots = [...card.dateSpots];
        flags = {
          ...flags,
          romanceOffered: card.romanceOffered,
          romanceAccepted: card.romanceAccepted,
          knowsAboutSpray: card.knowsAboutSpray,
          scentInterest: card.scentInterest,
        };
      }
      izzyHere = true;
      msgs.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `${girlName(gone)} leaves. She doesn't say where. ${girlName(stay)} stays.`,
      });
    } else {
      izzyHere = false;
      msgs.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `${girlName(gone)} leaves. She doesn't say where she's going. You're on your own.`,
      });
    }
  }

  if (clockMoved && dayPhase === "playing" && !activeDate) {
    for (const girl of present) {
      if (dutyNotice.some((notice) => notice.girl === girl)) continue;
      const after = dutyOf(girl, weekday, timeOfDay);
      const before = dutyOf(girl, dayBefore, timeBefore);
      if (after === "free" || after === before) continue;
      const place = dutyStop(girl, weekday, timeOfDay);
      if (!place || place === nextLocation) continue;
      dutyNotice = [...dutyNotice, { girl, duty: after, place }];
      msgs.push({
        id: uid(),
        role: speakerRole(girl),
        at: Date.now(),
        expression: "thinking",
        text: dutyWarn(girl, after),
      });
    }
  }

  if (clockMoved && timeOfDay === "Night") {
    const speakers = present.map((girl) => {
      if (girl === liveFocus) {
        return {
          girl,
          trust,
          bonding,
          official: Boolean(flags.romanceAccepted) || bond === "romantic",
        };
      }
      const card = roster[girl];
      return {
        girl,
        trust: card?.trust ?? 0,
        bonding: card?.bonding ?? 0,
        official: Boolean(card?.romanceAccepted) || card?.bond === "romantic",
      };
    });
    const closed = nightClose({
      location: nextLocation,
      present,
      focus: liveFocus,
      intimate: Boolean(flags.intimateScene) || call.scene,
      girls: speakers,
    });
    if (closed) {
      msgs.push({ id: uid(), role: "narrator", at: Date.now(), text: closed.narrator });
      for (const line of closed.spoken) {
        msgs.push({
          id: uid(),
          role: speakerRole(line.girl),
          at: Date.now(),
          expression: line.expression,
          text: line.text,
        });
      }
      if (closed.left.includes(liveFocus)) {
        roster = withGirl({ ...state, roster } as GameState, liveFocus, {
          trust,
          bonding,
          bond,
          expression,
          outfit,
          met: true,
          romanceOffered: flags.romanceOffered,
          romanceAccepted: flags.romanceAccepted,
          knowsAboutSpray: flags.knowsAboutSpray,
          scentInterest: flags.scentInterest,
          dates,
          dateSpots,
        });
      }
      present = closed.staying;
      if (!present.length) {
        izzyHere = false;
      } else if (!present.includes(liveFocus)) {
        const stay = present[0]!;
        const card = roster[stay];
        if (card) {
          liveFocus = stay;
          trust = card.trust;
          bonding = card.bonding;
          bond = card.bond;
          expression = card.expression;
          outfit = card.outfit;
          dates = card.dates ?? 0;
          dateSpots = [...(card.dateSpots ?? [])];
          flags = {
            ...flags,
            romanceOffered: card.romanceOffered,
            romanceAccepted: card.romanceAccepted,
            knowsAboutSpray: card.knowsAboutSpray,
            scentInterest: card.scentInterest,
          };
        }
        izzyHere = true;
      } else {
        izzyHere = true;
      }
      if (closed.inviteHome && !pendingInvite) pendingInvite = closed.inviteHome;
      if (closed.showPlaces) openPlacesAfterTurn = true;
    }
  }

  const seatedTank = tanks[liveFocus];
  glandCap = seatedTank.glandCap;
  glandShots = seatedTank.glandShots;
  turnsSinceIntimateSpray = seatedTank.turnsSinceIntimateSpray;
  glandDry = seatedTank.glandDry;
  roster = withGirl({ ...state, roster } as GameState, "izzy", tanks.izzy);
  roster = withGirl({ ...state, roster } as GameState, "victoria", tanks.victoria);
  roster = withGirl({ ...state, roster } as GameState, "ronnie", tanks.ronnie);

  return {
    trust,
    bonding,
    bond,
    focus: liveFocus,
    location: nextLocation,
    expression: warned ? "suspicious" : calmed ? "shy" : sprayed ? "spray" : expression === "spray" ? "flirty" : expression,
    outfit,
    flags,
    testsDone,
    pendingTest: turn.testId ?? null,
    pendingInvite,
    pendingIntimateSpray,
    pendingDefensive,
    threatLevel,
    glandCap,
    glandShots,
    turnsSinceIntimateSpray,
    glandDry,
    scentHold,
    messages: msgs,
    sprayed: sprayed || sprayPrompts.length > 0,
    sprayKind,
    otherSprayKind: pairedSpray ? otherSprayKind : "none",
    sprayPrompts,
    sprayCount: state.sprayCount + (sprayed ? 1 : 0) + (pairedSpray ? 1 : 0),
    weekday,
    timeOfDay,
    turnsUntilTime,
    dayPhase,
    izzyHere,
    dayFarts,
    daySprays,
    dayTopics,
    dates,
    dateSpots,
    dateOpen,
    plannedDate,
    planTime,
    planPlace,
    planGirl,
    present,
    roster,
    partner,
    affairKnown,
    meetKind,
    morningDetour: state.morningDetour && dayPhase !== "handoff" ? state.morningDetour : dayPhase === "handoff" ? true : state.morningDetour,
    debug: state.debug,
    debugOutfitLock: traveled ? false : state.debugOutfitLock,
    money,
    inventory,
    dateDraft,
    scheduledDate,
    activeDate,
    dateReview,
    confronting,
    grudge,
    gas,
    departure,
    trailStreak,
    trailGirl,
    sceneTurns,
    shiftsWorked,
    workedToday,
    pressedDuty,
    daySerial,
    showersToday,
    dutyNotice,
  };
}

function pickEmpty() {
  const lines = [
    "I would. I can't. Glands are dry. They refill, they don't print more. Give me a dozen breaths.",
    "Tail's up and nothing's coming. I'm out. Don't make that face — it's biology.",
    "Nope. Empty. You already got the magazine. Let them rest.",
  ];
  return lines[Math.floor(Math.random() * lines.length)]!;
}

function emptyGlandLine(girl: GirlId) {
  if (girl === "victoria") {
    const lines = [
      "Nothing comes out. The glands are empty. I need a while.",
      "I would spray. I can't. They're dry.",
      "That's the last of it. I'm empty.",
    ];
    return lines[Math.floor(Math.random() * lines.length)]!;
  }
  return pickEmpty();
}

function intimateWant(state: GameState, input: TurnInput) {
  const hay = `${input.say} ${input.action}`;
  return (
    state.pendingIntimateSpray ||
    state.flags.romanceAccepted ||
    state.bond === "romantic" ||
    /\bspray\b/i.test(hay)
  );
}

function systemNote(state: GameState, text: string) {
  return [
    ...state.messages,
    { id: uid(), role: "system" as const, at: Date.now(), text },
  ];
}

const SPRAY_DEBUG_LINES: Record<
  Exclude<SprayKind, "none">,
  { narration: string; dialogue: string }
> = {
  angry: {
    narration: "Her tail snaps up. She yanks her bottoms down. The air goes thick and chemical-sweet.",
    dialogue: "That's the line. You don't get to talk to me like that.",
  },
  consensual: {
    narration: "She looks back over her shoulder, tail high, and lets it go on purpose.",
    dialogue: "Don't move. This is the real me. Take it.",
  },
  defensive: defensiveSprayCopy("scare"),
  dominant: {
    narration: "She looks back with a mean little smile, shorts at her thighs, tail high. She is not asking.",
    dialogue: "Stay. You can take this. I want to watch you try.",
  },
};

const VICTORIA_SPRAY_DEBUG: Record<
  Exclude<SprayKind, "none">,
  { narration: string; dialogue: string }
> = {
  angry: {
    narration:
      "Both hands go behind her. She hikes the pencil skirt and her tail snaps up, aimed. The air goes thick and chemical-sweet.",
    dialogue: "That is the line. You don't get to talk to me like that.",
  },
  consensual: {
    narration:
      "She looks back, shy, and pulls the skirt up with both hands so her tail has a clear line. Then she lets it go on purpose.",
    dialogue: "Don't move. I want to see what this does to you.",
  },
  defensive: {
    narration:
      "She is scared and precise. Both hands yank the skirt up, tail high, and a defensive jet hits like a wall.",
    dialogue: "Stay back. I sprayed you because I thought you were a threat. Tail up. That is why.",
  },
  dominant: {
    narration:
      "She looks back with a knowing smile, both hands holding the skirt up, tail high. She is not asking.",
    dialogue: "Stay. You can take this. I want to watch you try.",
  },
};

function sprayDebugLines(girl: GirlId, kind: Exclude<SprayKind, "none">) {
  return girl === "victoria" ? VICTORIA_SPRAY_DEBUG[kind] : SPRAY_DEBUG_LINES[kind];
}

function fireSpray(kind: Exclude<SprayKind, "none">, get: () => CompanionStore, set: (p: Partial<CompanionStore>) => void) {
  const s = get();
  const focus = s.focus ?? "izzy";
  const tank = readTank(s);
  if (tank.glandDry > 0) {
    const messages = systemNote(s, `${girlName(focus)}'s scent glands are empty. She cannot spray.`);
    set({ messages, draft: "" });
    persist({ messages }, get);
    return;
  }
  const spent = spendTank(tank);
  const lines = sprayDebugLines(focus, kind);
  const flags = { ...s.flags, knowsAboutSpray: true };
  const messages = [
    ...s.messages,
    { id: uid(), role: "narrator" as const, at: Date.now(), text: lines.narration },
    {
      id: uid(),
      role: speakerRole(focus),
      at: Date.now() + 1,
      expression: "spray" as const,
      fx: "spray" as const,
      text: lines.dialogue,
    },
    ...(spent.emptied
      ? [
          {
            id: uid(),
            role: "narrator" as const,
            at: Date.now() + 2,
            text: `${girlName(focus)} emptied her scent glands. Every spray draws from them. She needs a while before she can spray again.`,
          },
        ]
      : []),
  ];
  const roster = withGirl(asGameState(s), focus, spent.tank);
  const patch: Partial<GameState> = {
    sprayed: true,
    sprayKind: kind,
    otherSprayKind: "none",
    sprayPrompts:
      kind === "consensual" && s.flags.intimateSprayResolved
        ? []
        : [{ girl: focus, kind }],
    sprayCount: s.sprayCount + 1,
    expression: "spray",
    pendingIntimateSpray: false,
    flags,
    messages,
    roster,
    glandCap: spent.tank.glandCap,
    glandShots: spent.tank.glandShots,
    turnsSinceIntimateSpray: spent.tank.turnsSinceIntimateSpray,
    glandDry: spent.tank.glandDry,
  };
  const poured = expose(clampStink(s.stink ?? 0), normalizeScent(s.scentFrom), [{ girl: focus, amount: 10 }]);
  patch.stink = poured.stink;
  patch.scentFrom = poured.scent;
  set({
    ...patch,
    spraySpotlight: true,
    draft: "",
    fxPulse: { kind: "spray", key: Date.now() },
  });
  persist(patch, get);
}

function runDebugCommand(
  cmd: DebugCommand,
  get: () => CompanionStore,
  set: (p: Partial<CompanionStore>) => void,
) {
  const s = get();
  if (cmd.kind === "travel") {
    if (!cmd.location) {
      const messages = systemNote(s, "Travel needs a place. Example: /travel @(Casa Luna)");
      set({ messages, draft: "" });
      persist({ messages }, get);
      return;
    }
    const dest = placeOf(cmd.location);
    const focus = s.focus ?? "izzy";
    const outfit =
      focus === "victoria" ? "work" : autoOutfit(dest.defaultOutfit, s.trust, s.bond, cmd.location, s.flags);
    const messages = [
      ...s.messages,
      {
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: `You end up at ${dest.name}. ${dest.what}`,
      },
    ];
    set({
      location: cmd.location,
      outfit,
      pendingInvite: null,
      debugOutfitLock: false,
      messages,
      sprayed: false,
      sprayKind: "none",
      otherSprayKind: "none",
      sprayPrompts: [],
      spraySpotlight: false,
      draft: "",
      expression: s.expression === "spray" ? "happy" : s.expression,
    });
    persist(
      {
        location: cmd.location,
        outfit,
        pendingInvite: null,
        debugOutfitLock: false,
        messages,
        sprayed: false,
        sprayKind: "none",
        otherSprayKind: "none",
        sprayPrompts: [],
        expression: s.expression === "spray" ? "happy" : s.expression,
      },
      get,
    );
    return;
  }

  if (cmd.kind === "cycle_outfit") {
    const focus = s.focus ?? "izzy";
    if (focus === "ronnie") {
      const messages = systemNote(s, "Ronnie's outfit follows the place: athletic at the gym, studio, field, and trail; casual elsewhere. /travel to change it.");
      set({ messages, draft: "" });
      persist({ messages }, get);
      return;
    }
    if (focus === "victoria") {
      const messages = systemNote(s, "Outfit: office blouse and pencil skirt. Victoria doesn't change clothes.");
      const patch = { outfit: "work" as const, debugOutfitLock: true, messages };
      set({ ...patch, draft: "" });
      persist(patch, get);
      return;
    }
    const i = nextIndex(
      Math.max(0, OUTFIT_CYCLE.indexOf(asOutfitId(s.outfit) ?? "casual")),
      OUTFIT_CYCLE.length,
    );
    const outfit = OUTFIT_CYCLE[i]!;
    const messages = systemNote(s, `Outfit: ${outfit}`);
    const patch = { outfit, debugOutfitLock: true, messages, debugOutfitIndex: i };
    set({ ...patch, draft: "", debugOutfitIndex: i });
    persist({ outfit, debugOutfitLock: true, messages }, get);
    return;
  }

  if (cmd.kind === "cycle_pose") {
    const focus = s.focus ?? "izzy";
    const poses = posesFor(asOutfitId(s.outfit) ?? "casual", focus);
    const i = nextIndex(s.debugPoseIndex, poses.length);
    const pose = poses[i]!;
    const messages = systemNote(s, `${girlName(focus)} — ${pose.label}`);
    set({
      expression: pose.expression,
      sprayKind: pose.sprayKind,
      otherSprayKind: "none",
      sprayPrompts: [],
      sprayed: false,
      spraySpotlight: false,
      debugPoseIndex: i,
      messages,
      draft: "",
    });
    persist(
      {
        expression: pose.expression,
        sprayKind: pose.sprayKind,
        sprayed: false,
        messages,
      },
      get,
    );
    return;
  }

  if (cmd.kind === "cycle_fart") {
    const i = nextIndex(s.debugFartIndex, FART_COUNT);
    const clip = fartClipAt(i);
    const size = clip ? fartSizeFor(clip.src) : 1;
    const gas = [...(s.gas ?? []), { id: uid(), size, turns: size }];
    const poured = expose(clampStink(s.stink ?? 0), normalizeScent(s.scentFrom), [{ girl: s.focus ?? "izzy", amount: size }]);
    const messages = systemNote(
      s,
      clip
        ? `Fart clip ${i + 1}/${FART_COUNT} — ${clip.kind} ${clip.n}/${clip.of} — size ${size}. Stink ${poured.stink}.`
        : `Fart clip ${i + 1}/${FART_COUNT}`,
    );
    set({
      debugFartIndex: i,
      messages,
      gas,
      stink: poured.stink,
      scentFrom: poured.scent,
      draft: "",
      fxPulse: { kind: "fart", key: Date.now(), fartIndex: i, fartSrc: clip?.src, intimate: clip?.kind === "intimate" },
    });
    persist({ messages, gas, stink: poured.stink, scentFrom: poured.scent }, get);
    return;
  }

  if (cmd.kind === "spray_angry") {
    fireSpray("angry", get, set);
    return;
  }
  if (cmd.kind === "spray_intimate") {
    fireSpray("consensual", get, set);
    return;
  }
  if (cmd.kind === "defensive_spray") {
    fireSpray("defensive", get, set);
    return;
  }
  if (cmd.kind === "dominant_spray") {
    fireSpray("dominant", get, set);
    return;
  }

  if (cmd.kind === "set_trust") {
    const trust = clamp(Math.round(cmd.value), 0, 100);
    const bond = bondFromScores(trust, s.bonding, s.flags.romanceAccepted);
    const who = girlName(s.focus ?? "izzy");
    const messages = systemNote(s, `${who}'s trust set to ${trust}`);
    set({ trust, bond, messages, draft: "" });
    persist({ trust, bond, messages }, get);
    return;
  }

  if (cmd.kind === "set_bonding") {
    const bonding = clamp(Math.round(cmd.value), 0, 100);
    const bond = bondFromScores(s.trust, bonding, s.flags.romanceAccepted);
    const who = girlName(s.focus ?? "izzy");
    const messages = systemNote(s, `${who}'s bonding set to ${bonding}`);
    set({ bonding, bond, messages, draft: "" });
    persist({ bonding, bond, messages }, get);
    return;
  }

  if (cmd.kind === "character_change") {
    const focus = s.focus ?? "izzy";
    const here = s.present ?? [];
    // Cycle through whoever is here; alone, cycle the whole cast.
    const after = [nextGirl(focus), nextGirl(nextGirl(focus))];
    const other = (here.length > 1 ? after.find((girl) => here.includes(girl)) : undefined) ?? nextGirl(focus);
    const hadBoth = here.length > 1 && here.includes(other);
    let next = pullFocus(asGameState(s), other);
    const card = next.roster[other];
    next = {
      ...next,
      present: hadBoth ? (next.present?.length ? next.present : [other]) : [other],
      sprayed: false,
      sprayKind: "none",
      otherSprayKind: "none",
      sprayPrompts: [],
      outfit: other === "victoria" ? "work" : other === "ronnie" ? "casual" : next.outfit,
      roster: {
        ...next.roster,
        [other]: {
          ...card,
          met: true,
          outfit: other === "victoria" ? "work" : other === "ronnie" ? "casual" : card.outfit,
        },
      },
    };
    const messages = [
      ...next.messages,
      {
        id: uid(),
        role: "system" as const,
        at: Date.now(),
        text: hadBoth
          ? `Now talking to ${girlName(other)}. ${girlName(focus)} is still here.`
          : `Now with ${girlName(other)}. ${girlName(focus)} steps out.`,
      },
    ];
    set({
      ...next,
      messages,
      spraySpotlight: false,
      draft: "",
      debugPoseIndex: -1,
    });
    persist({ ...next, messages }, get);
    return;
  }

  if (cmd.kind === "character_add") {
    const focus = s.focus ?? "izzy";
    const present = [...(s.present?.length ? s.present : [focus])];
    const other = absentGirl(present);
    if (!other) {
      const messages = systemNote(s, "Everyone is already here.");
      set({ messages, draft: "" });
      persist({ messages }, get);
      return;
    }
    present.push(other);
    const base = asGameState(s);
    const card = base.roster[other];
    const roster = withGirl(base, other, {
      met: true,
      outfit: other === "victoria" ? "work" : card?.outfit,
      expression: card?.met ? card.expression : other === "victoria" ? "shy" : other === "ronnie" ? "idle" : "embarrassed",
      trust: card?.met ? card.trust : Math.max(card?.trust ?? 0, 4),
      bonding: card?.met ? card.bonding : Math.max(card?.bonding ?? 0, 2),
    });
    const messages = [
      ...s.messages,
      {
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: `${girlName(other)} joins you. You are still talking to ${girlName(focus)}.`,
      },
    ];
    const patch = { present, roster, messages };
    set({ ...patch, draft: "" });
    persist(patch, get);
  }
}

function paceFrom(s: { gameMode?: GameMode; dates?: number }): Pace {
  return { mode: s.gameMode === "slow" ? "slow" : "casual", dates: s.dates ?? 0 };
}

function runTimeSkip(state: GameState, kind: "read" | "study"): Partial<CompanionStore> | null {
  if (state.dayPhase !== "playing" || state.dateDraft || state.dateReview || dateIsDue(state)) return null;
  if (kind === "read" && state.location !== "library") return null;
  if (kind === "study" && state.location !== "studyHall") return null;
  if (!openTonight(state.location, state.timeOfDay)) return null;
  const prevTime = state.timeOfDay;
  const prevDay = state.weekday;
  const next = advanceTime(prevTime);
  let weekday = state.weekday;
  let daySerial = state.daySerial ?? 0;
  let showersToday = state.showersToday ?? 0;
  let workedToday = Boolean(state.workedToday);
  let shiftsWorked = state.shiftsWorked ?? 0;
  let money = state.money;
  const messages = [...state.messages];
  if (next.dayRoll) {
    weekday = nextWeekday(weekday);
    workedToday = false;
    daySerial += 1;
    showersToday = 0;
    if (weekday === "Monday") {
      const pay = shiftsWorked * 20;
      money += pay;
      const shifts = shiftsWorked;
      shiftsWorked = 0;
      messages.push({
        id: uid(),
        role: "system",
        at: Date.now(),
        text: shifts ? `Payday. ${shifts} shift${shifts === 1 ? "" : "s"}. $${pay}.` : "Monday. You didn't work. Nothing hits your account.",
      });
    }
  }
  const timeOfDay = next.time;
  messages.push({
    id: uid(),
    role: "narrator",
    at: Date.now(),
    text:
      kind === "read"
        ? `You read in the library. It's ${timeOfDay} when you look up.`
        : `You study until the period turns. It's ${timeOfDay}.`,
  });
  let present = state.izzyHere === false ? [] : [...(state.present ?? [])];
  let roster = next.dayRoll ? clearFed(state.roster) : state.roster;
  let focus = state.focus ?? "izzy";
  let trust = state.trust;
  let bonding = state.bonding;
  let bond = state.bond;
  let expression = state.expression;
  let outfit = state.outfit;
  let flags = state.flags;
  let dates = state.dates ?? 0;
  let dateSpots = [...(state.dateSpots ?? [])];
  let departure = state.departure ?? null;
  let activeDate: GameState["activeDate"] = state.activeDate;
  let dateReview: GameState["dateReview"] = state.dateReview;
  let scheduledDate = state.scheduledDate;
  let inventory = [...(state.inventory ?? [])];
  let grudge = { ...(state.grudge ?? {}) };
  let pendingInvite = state.pendingInvite;
  const pace = paceFrom(state);
  if (activeDate) {
    const left = activeDate.cyclesLeft - 1;
    if (left <= 0) {
      const review = buildReview(activeDate, trust, bonding);
      dates += 1;
      dateSpots = [...dateSpots, activeDate.place].slice(-3);
      messages.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: "The date has run its length. She doesn't rush the last word.",
      });
      messages.push({
        id: uid(),
        role: speakerRole(activeDate.girl),
        at: Date.now(),
        expression: review.nextChance === "no" ? "shy" : "happy",
        text: closingLine(activeDate.girl, review.nextChance),
      });
      dateReview = review;
      activeDate = null;
    } else {
      activeDate = { ...activeDate, cyclesLeft: left };
    }
  } else if (scheduledDate && scheduledDate.day === prevDay && scheduledDate.time === prevTime) {
    const hurt = scheduledDate.girl;
    const baseTrust = hurt === focus ? trust : (roster?.[hurt]?.trust ?? trust);
    const baseBond = hurt === focus ? bonding : (roster?.[hurt]?.bonding ?? bonding);
    const dropTrust = applyTrust(baseTrust, -30, pace);
    const dropBond = applyBonding(baseBond, -24, pace);
    grudge = { ...grudge, [hurt]: { place: scheduledDate.place, day: prevDay, time: prevTime } };
    if (scheduledDate.giftId) inventory = giveBack(inventory, scheduledDate.giftId, scheduledDate.giftHeld);
    if (hurt === focus) {
      trust = dropTrust;
      bonding = dropBond;
      bond = bondFromScores(dropTrust, dropBond, flags.romanceAccepted);
    }
    roster = withGirl({ ...state, roster, trust, bonding, bond, flags }, hurt, {
      trust: dropTrust,
      bonding: dropBond,
      bond: bondFromScores(dropTrust, dropBond, Boolean(roster?.[hurt]?.romanceAccepted)),
    });
    messages.push({
      id: uid(),
      role: "narrator",
      at: Date.now(),
      text: `The hour passed. ${girlName(hurt)} was waiting. You were not there.`,
    });
    scheduledDate = null;
  }
  for (const girl of [...present]) {
    const duty = dutyOf(girl, weekday, timeOfDay);
    if (duty === "free") continue;
    messages.push({
      id: uid(),
      role: speakerRole(girl),
      at: Date.now(),
      expression: "thinking",
      text:
        girl === "victoria"
          ? "That ate the hour. I have the desk. I'll see you when I'm off."
          : duty === "work"
            ? "I've got Trailhead. If I don't clock in, the manager notices. I have to go."
            : "Class. I can't stay. I'll be on campus.",
    });
    if (girl === focus) {
      roster = withGirl({ ...state, roster, trust, bonding, bond, flags, dates, dateSpots }, focus, {
        trust,
        bonding,
        bond,
        expression,
        outfit,
        met: true,
        romanceAccepted: flags.romanceAccepted,
        romanceOffered: flags.romanceOffered,
        knowsAboutSpray: flags.knowsAboutSpray,
        scentInterest: flags.scentInterest,
        dates,
        dateSpots,
      });
    }
    present = present.filter((id) => id !== girl);
    departure = { girl, place: duty === "class" ? "campus" : dutyPlace(girl) };
  }
  let izzyHere = present.length > 0;
  if (!izzyHere) {
    messages.push({ id: uid(), role: "narrator", at: Date.now(), text: "You're on your own." });
  } else if (!present.includes(focus)) {
    const stay = present[0]!;
    const arrived = pullFocus({ ...state, present, roster, trust, bonding, bond, flags, dates, dateSpots, timeOfDay, weekday }, stay);
    focus = stay;
    trust = arrived.trust;
    bonding = arrived.bonding;
    bond = arrived.bond;
    expression = arrived.expression;
    outfit = arrived.outfit;
    flags = arrived.flags;
    dates = arrived.dates;
    dateSpots = arrived.dateSpots;
    roster = arrived.roster;
  }
  let showPlaces = false;
  if (timeOfDay === "Night") {
    const speakers = present.map((girl) => {
      if (girl === focus) {
        return { girl, trust, bonding, official: Boolean(flags.romanceAccepted) || bond === "romantic" };
      }
      const card = roster?.[girl];
      return {
        girl,
        trust: card?.trust ?? 0,
        bonding: card?.bonding ?? 0,
        official: Boolean(card?.romanceAccepted) || card?.bond === "romantic",
      };
    });
    const closed = nightClose({
      location: state.location,
      present,
      focus,
      intimate: Boolean(flags.intimateScene),
      girls: speakers,
    });
    if (closed) {
      messages.push({ id: uid(), role: "narrator", at: Date.now(), text: closed.narrator });
      for (const line of closed.spoken) {
        messages.push({
          id: uid(),
          role: speakerRole(line.girl),
          at: Date.now(),
          expression: line.expression,
          text: line.text,
        });
      }
      if (closed.left.includes(focus)) {
        roster = withGirl({ ...state, roster, trust, bonding, bond, flags, dates, dateSpots }, focus, {
          trust,
          bonding,
          bond,
          expression,
          outfit,
          met: true,
          romanceAccepted: flags.romanceAccepted,
          romanceOffered: flags.romanceOffered,
          knowsAboutSpray: flags.knowsAboutSpray,
          scentInterest: flags.scentInterest,
          dates,
          dateSpots,
        });
      }
      present = closed.staying;
      izzyHere = present.length > 0;
      if (izzyHere && !present.includes(focus)) {
        const stay = present[0]!;
        const arrived = pullFocus(
          { ...state, present, roster, trust, bonding, bond, flags, dates, dateSpots, timeOfDay, weekday },
          stay,
        );
        focus = stay;
        trust = arrived.trust;
        bonding = arrived.bonding;
        bond = arrived.bond;
        expression = arrived.expression;
        outfit = arrived.outfit;
        flags = arrived.flags;
        dates = arrived.dates;
        dateSpots = arrived.dateSpots;
        roster = arrived.roster;
      }
      if (closed.inviteHome && !pendingInvite) pendingInvite = closed.inviteHome;
      showPlaces = closed.showPlaces;
    }
  }
  return {
    weekday,
    timeOfDay,
    turnsUntilTime: 10,
    daySerial,
    showersToday,
    workedToday,
    shiftsWorked,
    money,
    messages,
    present,
    izzyHere,
    roster,
    focus,
    trust,
    bonding,
    bond,
    expression,
    outfit,
    flags,
    dates,
    dateSpots,
    departure,
    activeDate,
    dateReview,
    scheduledDate,
    inventory,
    grudge,
    pendingInvite,
    sceneTurns: 0,
    showPlaces,
  };
}

function scriptInvite(
  state: GameState,
  plan: InvitePlan,
  turn: TurnInput,
  get: () => CompanionStore,
  set: (p: Partial<CompanionStore>) => void,
) {
  const pace = paceFrom(state);
  let cursor = state;
  const messages = [...state.messages];
  appendPlayer(messages, { ...turn, invite: turn.invite ?? plan.dest });
  const origin = state.focus ?? "izzy";
  for (const block of plan.blocked) {
    cursor = pullFocus(cursor, block.girl);
    const bonding = applyBonding(cursor.bonding, block.bondingDelta, pace);
    const bond = bondFromScores(cursor.trust, bonding, cursor.flags.romanceAccepted);
    cursor = { ...cursor, bonding, bond };
    messages.push({
      id: uid(),
      role: speakerRole(block.girl),
      at: Date.now(),
      expression: block.expression,
      text: block.line,
      bondingDelta: block.bondingDelta,
    });
  }
  const going = plan.going.filter((id) => (state.present ?? []).includes(id));
  if (going.length) {
    for (const girl of GIRLS) {
      if (going.includes(girl) || plan.blocked.some((block) => block.girl === girl)) continue;
      if (girlAt(state, girl) !== plan.dest) continue;
      going.push(girl);
    }
    const host = going.includes(origin) ? origin : going[0]!;
    cursor = pullFocus(cursor, host);
    const where = placeOf(plan.dest);
    messages.push({
      id: uid(),
      role: "narrator",
      at: Date.now(),
      text: `${going.map(girlName).join(" and ")} head to ${where.name}. ${where.blurb}`,
    });
    const speaker = going[0]!;
    if (!plan.blocked.some((block) => block.girl === speaker)) {
      messages.push({
        id: uid(),
        role: speakerRole(speaker),
        at: Date.now(),
        expression: "happy",
        text: speaker === "victoria" ? `${where.name}. Fine. I'll get us there.` : `${where.name}. Yeah. Let's go.`,
      });
    }
    cursor = {
      ...cursor,
      location: plan.dest,
      present: going,
      izzyHere: true,
      sceneTurns: 1,
      outfit:
        host === "victoria"
          ? "work"
          : autoOutfit(where.defaultOutfit, cursor.trust, cursor.bond, plan.dest, cursor.flags),
    };
  } else if (cursor.focus !== origin && (state.present ?? []).includes(origin)) {
    cursor = pullFocus(cursor, origin);
  }
  const patch = {
    ...cursor,
    messages,
    present: going.length ? going : [...(state.present ?? [])],
    izzyHere: going.length ? true : state.izzyHere !== false,
    pressedDuty: plan.press,
    pendingInvite: null,
    dayPhase: "playing" as const,
    location: going.length ? plan.dest : state.location,
    sceneTurns: going.length ? 1 : (state.sceneTurns ?? 0) + 1,
  };
  set({ ...patch, busy: false, draft: "", inviteReply: null });
  persist(patch, get);
}

function resolveEveningPlan(
  turn: TurnInput,
  get: () => CompanionStore,
  set: (p: Partial<CompanionStore>) => void,
) {
  const state = get();
  const blob = `${turn.say} ${turn.action}`;
  const planTime = parseTimeOfDay(blob) ?? state.planTime;
  const planPlace = asLocationId(turn.invite) ?? parseMeetPlace(blob) ?? state.planPlace;
  const messages = [...state.messages];
  appendPlayer(messages, turn);
  if (!planTime || !planPlace) {
    const ask =
      !planTime && !planPlace
        ? "Both. A time of day, and a place. Morning, afternoon, evening, or night — and where."
        : !planTime
          ? `${placeOf(planPlace).name}. When? Morning, afternoon, evening, or night.`
          : `${planTime}. Where am I meeting you?`;
    messages.push({
      id: uid(),
      role: speakerRole(state.focus ?? "izzy"),
      at: Date.now(),
      expression: "thinking",
      text: ask,
    });
    const patch = {
      messages: messages,
      planTime,
      planPlace,
      planGirl: state.focus ?? "izzy",
      dayPhase: "planning" as const,
    };
    set({ ...patch, busy: false, draft: "" });
    persist(patch, get);
    return;
  }
  const accepted = likesPlayer(state);
  const where = placeOf(planPlace);
  messages.push({
    id: uid(),
    role: "narrator",
    at: Date.now(),
    text: accepted
      ? `She agrees — ${planTime}, ${where.name}. Then she's gone, and you're back in your apartment.`
      : "She shakes her head. She isn't meeting you. She leaves anyway, and you're back in your apartment.",
  });
  messages.push({
    id: uid(),
    role: speakerRole(state.focus ?? "izzy"),
    at: Date.now(),
    expression: accepted ? "happy" : "angry",
    text: accepted
      ? `${planTime}. ${where.name}. I'll be there.`
      : "No. I'm not making plans with you. Not after today. Go home.",
  });
  const outfit = autoOutfit("lounge", state.trust, state.bond, "apartment", state.flags);
  const patch = {
    messages: messages,
    planTime,
    planPlace,
    planGirl: state.focus ?? "izzy",
    planAccepted: accepted,
    plannedDate: state.gameMode === "slow" && (state.plannedDate || isDateAsk(`${turn.say} ${turn.action}`)) && accepted,
    dayPhase: "summary" as const,
    izzyHere: false,
    location: "apartment" as const,
    outfit,
    pendingInvite: null,
    expression: "idle" as const,
  };
  set({ ...patch, busy: false, draft: "", spraySpotlight: false });
  persist(patch, get);
}

export const useCompanion = create<CompanionStore>((set, get) => ({
  ...blankState(),
  hydrated: false,
  busy: false,
  spraySpotlight: false,
  draft: "",
  inviteReply: null,
  fxPulse: { kind: "none", key: 0 },
  fading: false,
  fadeMs: 700,
  showPlaces: false,
  lastTurn: null,
  debugFartIndex: -1,
  debugPoseIndex: -1,
  debugOutfitIndex: Math.max(0, OUTFIT_CYCLE.indexOf("casual")),

  hydrate: () => {
    if (get().hydrated) return;
    const saved = loadSave();
    set({
      ...(saved ?? blankState()),
      started: false,
      hydrated: true,
      busy: false,
      spraySpotlight: false,
      draft: "",
      inviteReply: null,
      showPlaces: false,
      lastTurn: null,
    });
  },

  start: (name: string, meet?: LocationId, gender?: PlayerGender, fartRole?: PlayerFartRole, mode?: GameMode, relationship?: RelationshipType) => {
    if (!name.trim()) return;
    const parsed = parseDebugName(name);
    if (!parsed.debug && !parsed.name.trim()) return;
    const next = seedMeeting(
      openingState(
        parsed.name,
        meet ?? "library",
        parsed.debug,
        gender === "female" ? "female" : "male",
        fartRole === "not" ? "not" : "into",
        mode === "slow" ? "slow" : "casual",
      ),
      meet ?? "library",
      relationship === "harem" ? "harem" : "mono",
    );
    writeSave(next);
    set({
      ...next,
      hydrated: true,
      busy: false,
      spraySpotlight: false,
      draft: "",
      inviteReply: null,
      debugFartIndex: -1,
      debugPoseIndex: -1,
      debugOutfitIndex: Math.max(0, OUTFIT_CYCLE.indexOf(next.outfit)),
      fxPulse: { kind: "blush", key: Date.now() },
      lastTurn: null,
    });
  },

  resume: () => {
    const saved = loadSave();
    if (saved?.started) set({ ...saved, hydrated: true, spraySpotlight: false, draft: "", inviteReply: null, lastTurn: null });
  },

  reset: () => {
    clearSave();
    set({
      ...blankState(),
      hydrated: true,
      busy: false,
      spraySpotlight: false,
      draft: "",
      inviteReply: null,
      fxPulse: { kind: "none", key: 0 },
      fading: false,
      fadeMs: 700,
      showPlaces: false,
      debugFartIndex: -1,
      debugPoseIndex: -1,
      debugOutfitIndex: 0,
      lastTurn: null,
    });
  },

  setDraft: (value) => set({ draft: value }),

  insertDraft: (chunk) => {
    const cur = get().draft;
    const needsSpace = cur.length > 0 && !/\s$/.test(cur);
    set({ draft: `${cur}${needsSpace ? " " : ""}${chunk}` });
  },

  setInviteReply: (value) => set({ inviteReply: value }),

  send: async (turn) => {
    const state = get();
    if (state.debug) {
      const cmd = parseDebugCommand(turn.say, asLocationId(turn.invite));
      if (cmd) {
        runDebugCommand(cmd, get, set);
        return;
      }
    }
    if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0) return;
    if (state.dateDraft || state.dateReview || dateIsDue(state)) return;
    if (state.dayPhase === "summary" || state.dayPhase === "meet" || state.dayPhase === "morning" || state.dayPhase === "handoff") return;
    if (playerAlone(state) && state.dayPhase === "playing") {
      const invite = asLocationId(turn.invite);
      const audible =
        Boolean(turn.say.trim() || turn.action.trim() || turn.thought?.trim() || turn.beats?.length);
      if (!audible && !invite) return;
      const messages = [...state.messages];
      appendPlayer(messages, { ...turn, invite });
      messages.push({
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: invite
          ? "Nobody is with you to invite. Use Travel in Places if you want to go alone."
          : "Nobody is here to answer. Pick a place if you want to find one of them.",
      });
      const patch = { messages };
      set(patch);
      persist(patch, get);
      return;
    }
    const say = turn.say.trim();
    let action = turn.action.trim();
    const thought = turn.thought?.trim() ?? "";
    let beats = turn.beats?.length ? turn.beats.map((beat) => ({ ...beat })) : undefined;
    const pendingGift =
      state.activeDate && !state.activeDate.presented && state.activeDate.giftHeld
        ? giftReaction(state.activeDate)
        : null;
    if (pendingGift) {
      action = [action, pendingGift.line].filter(Boolean).join("; ");
      const giftBeat = { kind: "act" as const, text: pendingGift.line, seen: pendingGift.line };
      beats = beats
        ? [...beats, giftBeat]
        : [
            ...(say ? [{ kind: "say" as const, text: say }] : []),
            ...(turn.action.trim() ? [{ kind: "act" as const, text: turn.action.trim(), seen: turn.action.trim() }] : []),
            giftBeat,
          ];
    }
    const invite = asLocationId(turn.invite);
    const inviteReply = turn.inviteReply ?? state.inviteReply;
    const payload: TurnInput = { say, action, thought, beats, invite, inviteReply };
    if (state.dayPhase === "playing" && !playerAlone(state)) {
      const blob = `${say} ${action}`;
      const dating = isDateAsk(blob) && !state.activeDate && !state.scheduledDate && !state.dateDraft;
      const hinted = dating ? (awkwardMention(blob, invite) ?? invite) : invite;
      const awkward = Boolean(dating && hinted && awkwardForAny(hinted, state.present ?? []));
      const plan = classifyInvite(state, blob, hinted, awkward);
      if (plan) {
        scriptInvite(asGameState(state), plan, payload, get, set);
        return;
      }
    }
    if (state.dayPhase === "planning") {
      const snapshot = snapshotOf(state);
      set({
        lastTurn: { state: structuredClone(snapshot), turn: payload },
        busy: true,
        draft: "",
        inviteReply: null,
      });
      resolveEveningPlan(payload, get, set);
      return;
    }
    if (!say && !action && !thought && !invite && !inviteReply && !beats?.length) return;
    const snapshot = snapshotOf(state);
    set({
      lastTurn: { state: structuredClone(snapshot), turn: payload },
      busy: true,
      draft: "",
      inviteReply: null,
    });
    await runTurn(snapshot, payload, get, set);
  },

  reroll: async () => {
    const state = get();
    const prior = state.lastTurn;
    if (!prior || state.busy) return;
    const avoid = rejectedReply(state.messages, prior.state.messages);
    set({
      ...prior.state,
      hydrated: true,
      busy: true,
      spraySpotlight: false,
      draft: "",
      inviteReply: null,
      fading: false,
      fxPulse: { kind: "none", key: Date.now() },
      lastTurn: prior,
    });
    if (prior.state.dayPhase === "planning") {
      resolveEveningPlan(prior.turn, get, set);
      return;
    }
    await runTurn(prior.state, prior.turn, get, set, { reroll: true, avoid });
  },

  rollBack: () => {
    const state = get();
    const prior = state.lastTurn;
    if (!prior || state.busy) return;
    set({
      ...prior.state,
      hydrated: true,
      busy: false,
      spraySpotlight: false,
      draft: draftFromTurn(prior.turn),
      inviteReply: null,
      fading: false,
      fxPulse: { kind: "none", key: Date.now() },
      lastTurn: null,
    });
    persist(prior.state, get);
  },

  endSpotlight: () => {
    const s = get();
    if ((s.sprayPrompts?.length ?? 0) > 0) {
      set({ spraySpotlight: false });
      return;
    }
    const focusWindow =
      Boolean(s.sprayed) &&
      s.sprayKind !== "none" &&
      !(s.sprayKind === "consensual" && s.flags.intimateSprayResolved);
    if (focusWindow) {
      set({ spraySpotlight: false });
      return;
    }
    const otherKind = s.otherSprayKind ?? "none";
    if (!s.sprayed && s.sprayKind === "none" && otherKind === "none") {
      set({ spraySpotlight: false });
      return;
    }
    const focusIntimate = s.sprayKind === "consensual" && Boolean(s.flags.intimateSprayResolved);
    const otherIntimate = otherKind === "consensual";
    const focus = s.focus ?? "izzy";
    const roster =
      otherKind === "none"
        ? s.roster
        : withGirl(asGameState(s), otherGirl(focus, s.present), { expression: otherIntimate ? "flirty" : "shy" });
    const patch = {
      spraySpotlight: false,
      sprayed: false,
      sprayKind: "none" as const,
      otherSprayKind: "none" as const,
      sprayPrompts: [] as SprayPrompt[],
      pendingIntimateSpray: false,
      ...(focusIntimate ? { expression: "flirty" as const } : {}),
      ...(roster !== s.roster ? { roster } : {}),
    };
    set(patch);
    persist(patch, get);
  },

  travel: (id) => {
    const state = get();
    if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0) return;
    if (playerAlone(state)) {
      get().goAlone(id);
      return;
    }
    get().insertDraft(inviteToken(id));
  },

  goAlone: (id) => {
    const state = get();
    if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0 || state.dateDraft || state.dateReview) return;
    if (!playerAlone(state)) return;
    if (state.timeOfDay === "Night" && !openTonight(id)) {
      const messages = [
        ...state.messages,
        { id: uid(), role: "narrator" as const, at: Date.now(), text: `${placeOf(id).name} is closed for the night.` },
      ];
      const patch = { messages, showPlaces: true };
      set(patch);
      persist(patch, get);
      return;
    }
    const owner = ownsHome(id);
    if (owner && !girlIsOfficial(state, owner)) {
      const messages = [
        ...state.messages,
        {
          id: uid(),
          role: "system" as const,
          at: Date.now(),
          text: `${placeOf(id).name} is hers. You don't walk in there unless you're together.`,
        },
      ];
      const patch = { messages };
      set(patch);
      persist(patch, get);
      return;
    }
    if (state.scheduledDate && dateIsDue(state) && id === state.scheduledDate.place) {
      const where = placeOf(id);
      const messages = [
        ...state.messages,
        {
          id: uid(),
          role: "narrator" as const,
          at: Date.now(),
          text: `${where.name}. She's waiting. The date doesn't start until you confirm it.`,
        },
      ];
      const patch = {
        location: id,
        messages,
        present: [] as GirlId[],
        izzyHere: false,
        sceneTurns: 0,
      };
      set(patch);
      persist(patch, get);
      return;
    }
    let departure = state.departure ?? null;
    let trailStreak = state.trailStreak ?? 0;
    let trailGirl = state.trailGirl ?? null;
    const chasing = Boolean(departure && departure.place === id);
    if (departure && !chasing) {
      departure = null;
      trailStreak = 0;
      trailGirl = null;
    }
    const here = GIRLS.filter((girl) => girlAt({ ...asGameState(state), location: id, departure }, girl) === id);
    const messages = [...state.messages];
    if (!here.length) {
      messages.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `${placeOf(id).name}. ${placeOf(id).blurb} You don't see any of them.`,
      });
      const patch = {
        location: id,
        messages,
        present: [] as GirlId[],
        izzyHere: false,
        departure,
        trailStreak,
        trailGirl,
        sceneTurns: 0,
      };
      set(patch);
      persist(patch, get);
      return;
    }
    const hurt = here.find((girl) => state.grudge?.[girl]);
    const trailed = chasing && departure && here.includes(departure.girl) ? departure.girl : null;
    const focus = hurt ?? trailed ?? here[0]!;
    const arrived = pullFocus({ ...asGameState(state), present: here, location: id, izzyHere: true, departure }, focus);
    const firstMeet = !state.roster?.[focus]?.met;
    let metRoster = firstMeet
      ? withGirl(arrived, focus, { met: true, trust: 6, bonding: 4, bond: "stranger" })
      : arrived.roster;
    let trust = firstMeet ? 6 : arrived.trust;
    let bonding = firstMeet ? 4 : arrived.bonding;
    let bond = firstMeet ? ("stranger" as const) : arrived.bond;
    let expression: GameState["expression"] = firstMeet ? "embarrassed" : hurt ? "angry" : "happy";
    const where = placeOf(id);
    if (trailed && !firstMeet) {
      const streak = (state.trailGirl === trailed ? (state.trailStreak ?? 0) : 0) + 1;
      trailStreak = streak;
      trailGirl = trailed;
      departure = null;
      if (!hurt) {
        const bite = followLines(trailed, streak);
        const pace = {
          mode: state.gameMode === "slow" ? ("slow" as const) : ("casual" as const),
          dates: metRoster[trailed]?.dates ?? 0,
        };
        trust = applyTrust(arrived.roster[trailed]?.trust ?? trust, bite.trust, pace);
        bonding = applyBonding(arrived.roster[trailed]?.bonding ?? bonding, bite.bonding, pace);
        bond = bondFromScores(trust, bonding, Boolean(metRoster[trailed]?.romanceAccepted));
        expression = bite.expression;
        metRoster = withGirl({ ...arrived, roster: metRoster }, trailed, { trust, bonding, bond, expression });
        messages.push({
          id: uid(),
          role: "narrator",
          at: Date.now(),
          text: `${girlName(trailed)} looks up. She did not tell you she would be at ${where.name}.`,
        });
        messages.push({
          id: uid(),
          role: speakerRole(trailed),
          at: Date.now(),
          expression: bite.expression,
          text: bite.text,
        });
      }
    }
    if (!arrived.roster[focus]?.met) {
      if (focus === "ronnie") {
        const lines = ronnieOpening(id);
        messages.push({ id: uid(), role: "narrator", at: Date.now(), text: lines.narrator });
        messages.push({
          id: uid(),
          role: "ronnie",
          at: Date.now(),
          expression: "happy",
          text: oneGreeting(lines.first, lines.second),
        });
      } else if (focus === "victoria") {
        const lines = victoriaOpening(id);
        messages.push({ id: uid(), role: "narrator", at: Date.now(), text: lines.narrator });
        messages.push({
          id: uid(),
          role: "victoria",
          at: Date.now(),
          expression: "embarrassed",
          text: oneGreeting(lines.first, lines.second),
        });
      } else {
        messages.push({
          id: uid(),
          role: "narrator",
          at: Date.now(),
          text: `${where.name}. A chubby skunk-neko looks up like she got caught existing.`,
        });
        messages.push({
          id: uid(),
          role: "izzy",
          at: Date.now(),
          expression: "embarrassed",
          text: "Uh. Hi. I'm Izzy. You can smell that, I know. You can sit. Or not.",
        });
      }
    } else if (hurt) {
      messages.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `${girlName(hurt)} is at ${where.name}. She has been waiting on an explanation. Her tail is up.`,
      });
      messages.push({
        id: uid(),
        role: speakerRole(hurt),
        at: Date.now(),
        expression: "angry",
        text:
          hurt === "victoria"
            ? "You stood me up. I am one breath from spraying you. Explain yourself."
            : "You left me sitting there. Talk me down, or I spray. I'm not kidding.",
      });
    } else if (!trailed) {
      const onDuty = dutyOf(focus, state.weekday, state.timeOfDay) === "work" && id === dutyPlace(focus);
      if (onDuty) expression = "thinking";
      messages.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: onDuty
          ? `${girlName(focus)} is at ${where.name}, and she is working. ${where.blurb}`
          : `You find ${here.map(girlName).join(" and ")} at ${where.name}. ${where.blurb}`,
      });
      messages.push({
        id: uid(),
        role: speakerRole(focus),
        at: Date.now(),
        expression: onDuty ? "thinking" : "happy",
        text: onDuty
          ? focus === "victoria"
            ? "I'm at the desk. If this is about a room, a fabric, or a client, I can help. Anything else will have to wait."
            : "I'm on the floor. If you need a pack, ask. If this is a hangout, I'm working."
          : focus === "victoria"
            ? "You came looking. Sit. I have a minute."
            : "You found me. That's either sweet or creepy and I'm choosing sweet.",
      });
    }
    const patch = {
      ...arrived,
      roster: metRoster,
      trust,
      bonding,
      bond,
      location: id,
      present: here,
      izzyHere: true,
      messages,
      confronting: hurt ?? null,
      expression,
      outfit:
        focus === "victoria"
          ? ("work" as const)
          : autoOutfit(where.defaultOutfit, trust, bond, id, arrived.flags),
      dayPhase: "playing" as const,
      departure,
      trailStreak,
      trailGirl,
      sceneTurns: 0,
    };
    set(patch);
    persist(patch, get);
  },

  depart: (id) => {
    const state = get();
    if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0 || state.dateDraft || state.dateReview) return;
    if (playerAlone(state)) {
      get().goAlone(id);
      return;
    }
    if (state.timeOfDay === "Night" && !openTonight(id)) {
      const messages = [
        ...state.messages,
        { id: uid(), role: "narrator" as const, at: Date.now(), text: `${placeOf(id).name} is closed for the night.` },
      ];
      const patch = { messages, showPlaces: true };
      set(patch);
      persist(patch, get);
      return;
    }
    const recent = state.messages
      .filter((m) => m.role === "player")
      .slice(-3)
      .map((m) => m.text)
      .join(" ");
    const polite = goodbyeSaid(recent);
    const present = [...(state.present ?? [])];
    const pace = paceFrom(state);
    let cursor = asGameState(state);
    const origin = cursor.focus ?? "izzy";
    const messages = [...cursor.messages];
    if (!polite) {
      for (const girl of present) {
        cursor = pullFocus(cursor, girl);
        const bonding = applyBonding(cursor.bonding, -5, pace);
        const bond = bondFromScores(cursor.trust, bonding, cursor.flags.romanceAccepted);
        cursor = { ...cursor, bonding, bond };
      }
      if (present.includes(origin)) cursor = pullFocus(cursor, origin);
      messages.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: "You leave without a goodbye. That costs you.",
      });
    } else {
      messages.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: "You say goodbye and go.",
      });
    }
    const patch = {
      ...cursor,
      messages,
      present: [] as GirlId[],
      izzyHere: false,
      sceneTurns: 0,
    };
    set(patch);
    persist(patch, get);
    get().goAlone(id);
  },

  goToWork: () => {
    const state = get();
    if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0 || state.dateDraft || state.dateReview) return;
    if (state.location !== "apartment" || state.timeOfDay === "Night" || state.workedToday) return;
    if (state.dayPhase !== "playing") return;
    const next = advanceTime(state.timeOfDay);
    if (next.dayRoll) return;
    const timeOfDay = next.time;
    const shiftsWorked = (state.shiftsWorked ?? 0) + 1;
    const aired = reduceStink(state.stink ?? 0, normalizeScent(state.scentFrom), 10);
    const leader = markedBy(aired.stink, aired.scent);
    const markAffair =
      state.markAffair && leader && leader === state.markAffair.marker && aired.stink > 50 ? state.markAffair : null;
    const messages = [
      ...state.messages,
      {
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: `You work a shift.${(state.stink ?? 0) > 0 ? " Some of the stink comes off." : ""} $20 is banked toward Monday. It's ${timeOfDay} when you get back to the apartment.`,
      },
    ];
    let present = state.izzyHere === false ? [] : [...(state.present ?? [])];
    let departure = state.departure ?? null;
    let roster = state.roster;
    let focus = state.focus ?? "izzy";
    let trust = state.trust;
    let bonding = state.bonding;
    let bond = state.bond;
    let expression = state.expression;
    let outfit = state.outfit;
    let flags = state.flags;
    let dates = state.dates ?? 0;
    let dateSpots = state.dateSpots ?? [];
    for (const girl of [...present]) {
      const duty = dutyOf(girl, state.weekday, timeOfDay);
      if (duty === "free") continue;
      messages.push({
        id: uid(),
        role: speakerRole(girl),
        at: Date.now(),
        expression: "thinking",
        text:
          girl === "victoria"
            ? "That ate the morning. I have the desk. I'll see you when I'm off."
            : duty === "work"
              ? "I've got Trailhead. If I don't clock in, the manager notices. I have to go."
              : "Class. I can't stay. I'll be on campus.",
      });
      present = present.filter((id) => id !== girl);
      departure = { girl, place: duty === "class" ? "campus" : dutyPlace(girl) };
    }
    const izzyHere = present.length > 0;
    if (!izzyHere) {
      messages.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: "You're back at the apartment alone.",
      });
    } else if (!present.includes(focus)) {
      const stay = present[0]!;
      const arrived = pullFocus({ ...asGameState(state), present, roster, timeOfDay }, stay);
      focus = stay;
      trust = arrived.trust;
      bonding = arrived.bonding;
      bond = arrived.bond;
      expression = arrived.expression;
      outfit = arrived.outfit;
      flags = arrived.flags;
      dates = arrived.dates;
      dateSpots = arrived.dateSpots;
      roster = arrived.roster;
    }
    const patch = {
      timeOfDay,
      turnsUntilTime: 10,
      shiftsWorked,
      workedToday: true,
      pressedDuty: null as GirlId | null,
      messages,
      present,
      izzyHere,
      departure,
      focus,
      trust,
      bonding,
      bond,
      expression,
      outfit,
      flags,
      dates,
      dateSpots,
      roster,
      sceneTurns: 0,
      location: "apartment" as const,
      stink: aired.stink,
      scentFrom: aired.scent,
      markAffair,
    };
    set({ fading: true, fadeMs: 1500, busy: true });
    window.setTimeout(() => {
      if (!get().fading) return;
      set({ ...patch, fading: true, busy: true });
      persist(patch, get);
      window.setTimeout(() => {
        if (!get().fading) return;
        set({ fading: false, busy: false, fadeMs: 700 });
      }, 1500);
    }, 1500);
  },

  buyGift: (id) => {
    const state = get();
    const gift = giftById(id);
    if (!gift || !isStore(state.location) || gift.store !== state.location) return;
    if (state.money < gift.price) return;
    const patch = {
      money: state.money - gift.price,
      inventory: [...state.inventory, gift.id],
      messages: [
        ...state.messages,
        {
          id: uid(),
          role: "narrator" as const,
          at: Date.now(),
          text: `You buy the ${gift.name}. $${gift.price}. You have $${state.money - gift.price} left.`,
        },
      ],
    };
    set(patch);
    persist(patch, get);
  },

  confirmDate: (draft) => {
    const state = get();
    const plan = state.dateDraft;
    if (!plan) return;
    if (!draft.time || !draft.place || !draft.day) return;
    const giftId = draft.giftId || "";
    if (giftId && !state.inventory.includes(giftId)) return;
    if (!slotOpen(state.weekday, state.timeOfDay, draft.day, draft.time)) return;
    if (isAwkwardPlace(draft.place, plan.girl)) return;
    const nth = plan.nth;
    if (nth < 3 && (draft.place === "dorm" || draft.place === "apartment" || draft.place === "vickyLiving" || draft.place === "vickyBedroom")) {
      return;
    }
    const voice = speakerRole(plan.girl);
    const where = placeOf(draft.place);
    const giftName = giftId ? (giftById(giftId)?.name ?? giftId) : "";
    const messages = [
      ...state.messages,
      {
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: giftName
          ? `${draft.day} ${draft.time}, ${where.name}. She has the plan. The ${giftName} stays in your bag until you meet her. Then she's gone, and you can go where you need to.`
          : `${draft.day} ${draft.time}, ${where.name}. She has the plan. No gift. Then she's gone, and you can go where you need to.`,
      },
      {
        id: uid(),
        role: voice,
        at: Date.now(),
        expression: "happy" as const,
        text:
          plan.girl === "victoria"
            ? giftName
              ? `${draft.day}. ${draft.time}. ${where.name}. I'll be there. Keep that in the bag until you see me.`
              : `${draft.day}. ${draft.time}. ${where.name}. I'll be there. You don't need to bring anything.`
            : giftName
              ? `${draft.day}, ${draft.time}, ${where.name}. I'll be there. Bring the thing if you still want to. I mean it.`
              : `${draft.day}, ${draft.time}, ${where.name}. I'll be there. Don't stress a gift.`,
      },
    ];
    const patch = {
      messages,
      dateDraft: null,
      scheduledDate: {
        girl: plan.girl,
        nth,
        time: draft.time,
        place: draft.place,
        day: draft.day,
        giftId,
        giftHeld: false,
      },
      present: [] as GirlId[],
      izzyHere: false,
      dayPhase: "playing" as const,
    };
    set(patch);
    persist(patch, get);
  },

  postponeDate: () => {
    const state = get();
    const plan = state.dateDraft;
    if (!plan) return;
    const voice = speakerRole(plan.girl);
    const messages = [
      ...state.messages,
      {
        id: uid(),
        role: voice,
        at: Date.now(),
        expression: "thinking" as const,
        text:
          plan.girl === "victoria"
            ? "Go on, then. Ask me again when you actually have a plan."
            : "Okay. Ask me again when you're ready to fill it in.",
      },
    ];
    const patch = {
      messages,
      dateDraft: null,
      present: [] as GirlId[],
      izzyHere: false,
    };
    set(patch);
    persist(patch, get);
  },

  attendDate: () => {
    const state = get();
    const plan = state.scheduledDate;
    if (!plan || !dateIsDue(state)) return;
    const arrived = pullFocus({ ...asGameState(state), location: plan.place }, plan.girl);
    const where = placeOf(plan.place);
    const voice = speakerRole(plan.girl);
    let inventory = [...(state.inventory ?? [])];
    let giftHeld = plan.giftHeld === true;
    if (!giftHeld && plan.giftId) {
      const nextBag = takeOne(inventory, plan.giftId);
      if (nextBag.length !== inventory.length) {
        inventory = nextBag;
        giftHeld = true;
      }
    }
    const giftName = giftHeld ? (giftById(plan.giftId)?.name ?? "") : "";
    const messages = [
      ...state.messages,
      {
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: `You meet ${girlName(plan.girl)} at ${where.name}. ${where.blurb} The date starts now.${giftName ? ` The ${giftName} comes out of your bag.` : ""}`,
      },
      {
        id: uid(),
        role: voice,
        at: Date.now(),
        expression: "flirty" as const,
        text:
          plan.girl === "victoria"
            ? "You came. Good. Sit down. This is the date."
            : "You showed. Okay. This is a date. I'm a little nervous and I'm not hiding it well.",
      },
    ];
    const patch = {
      ...arrived,
      inventory,
      location: plan.place,
      present: [plan.girl] as GirlId[],
      izzyHere: true,
      scheduledDate: null,
      activeDate: {
        girl: plan.girl,
        nth: plan.nth,
        place: plan.place,
        giftId: plan.giftId,
        giftHeld,
        cyclesLeft: cyclesFor(plan.nth),
        startTrust: arrived.trust,
        startBonding: arrived.bonding,
        farts: 0,
        presented: false,
        smell: "neutral" as const,
      },
      dayPhase: "playing" as const,
      messages,
      expression: "flirty" as const,
    };
    set(patch);
    persist(patch, get);
  },

  standUp: () => {
    const state = get();
    const plan = state.scheduledDate;
    if (!plan) return;
    const girl = plan.girl;
    const card = state.roster?.[girl];
    const onHer = (state.focus ?? "izzy") === girl && state.izzyHere !== false;
    const baseTrust = onHer ? state.trust : (card?.trust ?? 0);
    const baseBond = onHer ? state.bonding : (card?.bonding ?? 0);
    const pace = { mode: state.gameMode, dates: card?.dates ?? state.dates ?? 0 };
    const trust = applyTrust(baseTrust, -30, pace);
    const bonding = applyBonding(baseBond, -24, pace);
    const bond = bondFromScores(trust, bonding, Boolean(card?.romanceAccepted));
    const roster = withGirl(state, girl, { trust, bonding, bond, met: true });
    const messages = [
      ...state.messages,
      {
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: plan.giftId
          ? `You don't go. ${girlName(girl)} will know. The gift stays in your bag, and so does the damage.`
          : `You don't go. ${girlName(girl)} will know.`,
      },
    ];
    const patch = {
      messages,
      roster,
      scheduledDate: null,
      inventory: giveBack(state.inventory ?? [], plan.giftId, plan.giftHeld),
      grudge: {
        ...state.grudge,
        [girl]: { place: plan.place, day: state.weekday, time: state.timeOfDay },
      },
      ...(onHer
        ? {
            trust,
            bonding,
            bond,
            confronting: girl,
            expression: "angry" as const,
            messages: [
              ...messages,
              {
                id: uid(),
                role: speakerRole(girl),
                at: Date.now(),
                expression: "angry" as const,
                text:
                  girl === "victoria"
                    ? "You're looking at me while you do it. Talk. Before I spray."
                    : "Wow. You're really doing this in front of me. Talk, or I spray.",
              },
            ],
          }
        : {}),
    };
    set(patch);
    persist(patch, get);
  },

  dismissDateTip: () => {
    const state = get();
    const girl = state.focus ?? "izzy";
    const patch = { dateTipOff: { ...state.dateTipOff, [girl]: true } };
    set(patch);
    persist(patch, get);
  },

  closeReview: (askAgain) => {
    const state = get();
    const review = state.dateReview;
    if (!review) return;
    if (askAgain && review.askNext) {
      const voice = speakerRole(review.girl);
      const messages = [
        ...state.messages,
        {
          id: uid(),
          role: voice,
          at: Date.now(),
          expression: "flirty" as const,
          text:
            review.girl === "victoria"
              ? "Another one. All right. Put it on the card before I change my mind."
              : "Another date? Yeah. Okay. Fill it in. I'm not gonna plan it for you.",
        },
      ];
      const patch = {
        messages,
        dateReview: null,
        dateDraft: {
          girl: review.girl,
          nth: review.nth + 1,
          time: null,
          place: null,
          day: null,
          giftId: null,
        },
      };
      set(patch);
      persist(patch, get);
      return;
    }
    const voice = speakerRole(review.girl);
    const messages = [
      ...state.messages,
      {
        id: uid(),
        role: voice,
        at: Date.now(),
        expression: "shy" as const,
        text: review.girl === "victoria" ? "I'm going. You know where to find me when you mean it." : "I'm heading out. You know where the world is.",
      },
      {
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: `${girlName(review.girl)} leaves. You can go somewhere else.`,
      },
    ];
    const patch = {
      messages,
      dateReview: null,
      present: [] as GirlId[],
      izzyHere: false,
    };
    set(patch);
    persist(patch, get);
  },

  dismissSpray: (mode, girl) => {
    if (mode === "reset") {
      get().reset();
      return;
    }
    const s = get();
    const focus = s.focus ?? "izzy";
    const prompts = Array.isArray(s.sprayPrompts) ? s.sprayPrompts : [];
    if (girl && prompts.length > 0 && !prompts.some((prompt) => prompt.girl === girl)) return;
    const target: GirlId = girl ?? prompts[0]?.girl ?? focus;
    const voice = speakerRole(target);
    const mine = target === focus;
    const vicky = target === "victoria";
    const name = girlName(target);
    const card = s.roster?.[target];
    const pace = mine
      ? paceFrom(s)
      : {
          mode: s.gameMode === "slow" ? ("slow" as const) : ("casual" as const),
          dates: card?.dates ?? s.dates ?? 0,
        };
    const baseTrust = mine ? s.trust : (card?.trust ?? 0);
    const baseBonding = mine ? s.bonding : (card?.bonding ?? 0);
    const romantic = mine ? Boolean(s.flags.romanceAccepted) : Boolean(card?.romanceAccepted);
    const left = prompts.filter((prompt) => prompt.girl !== target);
    const done = left.length === 0;
    const hard = s.threatLevel === "attack";
    const flags = { ...s.flags, knowsAboutSpray: true };
    let expression: GameState["expression"] = mine ? s.expression : (card?.expression ?? "idle");
    let trust = baseTrust;
    let bonding = baseBonding;
    let romanticBond = romantic;
    let meters = false;
    let floorTrust = false;
    const lines: { role: "narrator" | "player" | GirlId; expression?: GameState["expression"]; text: string }[] = [];
    const say = (
      role: (typeof lines)[number]["role"],
      text: string,
      face?: GameState["expression"],
    ) => {
      lines.push({ role, text, expression: face });
    };

    if (mode === "submit") {
      meters = true;
      trust = applyTrust(baseTrust, 8, pace);
      bonding = applyBonding(baseBonding, s.flags.fartConverted ? 10 : 6, pace);
      romanticBond = true;
      expression = "flirty";
      flags.sprayYield = "submit";
      flags.intimateSprayResolved = true;
      say(
        "narrator",
        s.flags.fartConverted
          ? `You already let the gas get to you. Now ${name}. She looks wrecked with it, in the good way.`
          : `You stop fighting ${name}. Her ears lift. The smile she gives you is not nicer. It is pleased.`,
      );
      say(voice, "Good. That's mine. Don't think I'm going to be gentle now. You asked to be kept, not spared.", "flirty");
    } else if (mode === "resist") {
      meters = true;
      bonding = applyBonding(baseBonding, 2, pace);
      expression = "scheming";
      flags.sprayYield = s.flags.sprayYield === "submit" ? "submit" : "resist";
      say("narrator", `You push back against ${name}. Her tail only gets higher. She looks delighted.`);
      say(voice, "Oh, fight it. I like that. I'm not done teaching your body what it wants.", "scheming");
    } else if (mode === "surrender") {
      expression = "scheming";
      flags.defenseAftermath = "surrender";
      say(
        "narrator",
        `The spray from ${name} hits and your knees go. You can't fight it. She sees that, and the fear on her face turns into something sharper.`,
      );
      say(
        voice,
        "There. That's the end of it. You're done. Stay down and breathe through your mouth if you still remember how. I win.",
        "scheming",
      );
    } else if (mode === "aroused") {
      meters = true;
      trust = applyTrust(baseTrust, hard ? -10 : -2, pace);
      bonding = applyBonding(baseBonding, hard ? -6 : 1, pace);
      expression = "suspicious";
      flags.defenseAftermath = "aroused";
      say(
        "narrator",
        hard
          ? `You came at ${name}, and the spray that should have stopped you just made you want her. She looks sick about that, and interested, and angry with herself for both.`
          : `It was a scare, not a beating, and ${name}'s spray landed wrong. She is flushed, worried her only weapon doesn't work, and trying not to like that you like it.`,
      );
      say(
        voice,
        hard
          ? "You attacked me. And you're — into it? That spray is supposed to end a fight. I don't know what to do with you. Don't come closer while I'm figuring out if I should still be afraid."
          : "That was a scare. You weren't even hurting me, and now you look… wrecked, in the wrong direction. My spray is supposed to make people leave. Why are you looking at me like that?",
        "suspicious",
      );
    } else if (mode === "embrace") {
      meters = true;
      trust = applyTrust(baseTrust, 10, pace);
      bonding = applyBonding(baseBonding, 8, pace);
      romanticBond = true;
      expression = "flirty";
      flags.sprayRepair = false;
      flags.intimateSprayResolved = true;
      say(
        "narrator",
        `The musk from ${name} hits like a wall — chemical, sweet, blinding — and instead of running, something in you lights up harder than anything you've ever felt. You stay. You want more.`,
      );
      say(
        voice,
        vicky
          ? "You stayed in it. Not to be polite. You wanted it. Come here. I am not finished with you."
          : "Wait. You're— you're INTO it? Not surviving it. Actually— oh. Oh that's. Come here. I'm not done with you. I didn't know it could feel like being wanted.",
        "flirty",
      );
    } else if (mode === "overwhelm") {
      meters = true;
      trust = applyTrust(baseTrust, -5, pace);
      bonding = applyBonding(baseBonding, -3, pace);
      expression = "shy";
      flags.sprayRepair = true;
      flags.intimateSprayResolved = true;
      say(
        "narrator",
        `The burn from ${name} hits your eyes and throat. You cough, gag, stumble for air and water. Real skunkgirl spray is not a perfume. It's an event. You weren't ready for the intensity.`,
      );
      say(
        "player",
        `"I wasn't expecting it to be that strong. I'm not blaming you — it's natural for you. I just need a minute."`,
      );
      say(
        voice,
        vicky
          ? "You look wrecked. I thought you wanted this. I meant to spray. I did not mean to go past what you could take. Breathe. If you still want me when you can, say so."
          : "I... oh. You look wrecked. I thought you wanted this. I didn't mean to— I mean I DID, but I thought... okay. That's. That's a little. I'm gonna sit over here. If you still want me after you can breathe, say so like you mean it.",
        "shy",
      );
    } else {
      floorTrust = mine;
      expression = "angry";
      say(
        "narrator",
        vicky
          ? `The worst of it fades. ${name} smooths her skirt, not looking at you — but she hasn't left.`
          : `The worst of it fades. ${name} is back among the stacks, arms folded, not looking at you — but she hasn't left.`,
      );
      say(
        voice,
        vicky
          ? "If you are going to apologize, do it properly. I am not a novelty."
          : "If you're gonna apologize, do it like you mean it. I'm not a novelty air freshener.",
        "angry",
      );
    }

    const bond = bondFromScores(trust, bonding, romanticBond);
    const stillDefensive = left.some((prompt) => prompt.kind === "defensive");
    const patch: Partial<GameState> = {
      sprayed: !done,
      sprayKind: mine || done ? "none" : s.sprayKind,
      otherSprayKind: !mine || done ? "none" : s.otherSprayKind ?? "none",
      sprayPrompts: left,
      pendingIntimateSpray: done ? false : s.pendingIntimateSpray,
      pendingDefensive: stillDefensive ? s.pendingDefensive : false,
      flags,
      messages: [
        ...s.messages,
        ...lines.map((line) => ({
          id: uid(),
          role: line.role,
          at: Date.now(),
          text: line.text,
          ...(line.expression ? { expression: line.expression } : {}),
        })),
      ],
    };
    if (mine) {
      patch.expression = expression;
      if (meters) {
        patch.trust = trust;
        patch.bonding = bonding;
        patch.bond = bond;
      } else if (floorTrust) {
        patch.trust = Math.max(2, s.trust);
      }
    } else {
      patch.roster = withGirl(asGameState(s), target, {
        expression,
        met: true,
        knowsAboutSpray: true,
        ...(meters ? { trust, bonding, bond } : {}),
      });
    }
    const hearts = done && (mode === "submit" || mode === "embrace");
    set({
      ...patch,
      spraySpotlight: false,
      ...(done ? { fxPulse: { kind: hearts ? ("hearts" as const) : ("none" as const), key: Date.now() } } : {}),
    });
    persist(patch, get);
  },

  takeShower: (ids) => {
    const s = get();
    if (!SHOWER_PLACES.has(s.location)) return;
    if ((s.showersToday ?? 0) >= 2) return;
    if (s.dayPhase !== "playing" && s.dayPhase !== "planning" && s.dayPhase !== "summary") return;
    const owned = new Set(s.inventory ?? []);
    const picked = [...new Set(ids)].filter((id) => owned.has(id) && freshenRating(id) > 0);
    const cut = showerCut(picked);
    let inventory = [...(s.inventory ?? [])];
    for (const id of picked) inventory = takeOne(inventory, id);
    const washed = reduceStink(s.stink ?? 0, normalizeScent(s.scentFrom), cut);
    const names = picked.map((id) => giftById(id)?.name ?? id);
    const text = names.length
      ? `You shower with ${names.join(", ")}. Used up. The stink comes down by ${cut}.`
      : "You shower with just water. Nothing extra in the bag. The stink comes down by 10.";
    const messages = [...s.messages, { id: uid(), role: "narrator" as const, at: Date.now(), text }];
    const patch = {
      stink: washed.stink,
      scentFrom: washed.scent,
      showersToday: Math.min(2, (s.showersToday ?? 0) + 1),
      inventory,
      messages,
    };
    set(patch);
    persist(patch, get);
  },

  sleep: () => {
    const s = get();
    if (s.dayPhase !== "playing") return;
    if (!canSleepNow(s.location, s.timeOfDay)) return;
    if (s.busy || s.sprayed || (s.sprayPrompts?.length ?? 0) > 0 || s.dateDraft || s.dateReview || dateIsDue(s)) return;
    const patch = { dayPhase: "summary" as const };
    set(patch);
    persist(patch, get);
  },

  wake: () => {
    const s = get();
    if (s.dayPhase !== "summary" || s.fading) return;
    set({ fading: true, fadeMs: 1500 });
    window.setTimeout(() => {
      const cur = get();
      if (cur.dayPhase !== "summary") {
        set({ fading: false, fadeMs: 700 });
        return;
      }
      const weekday = nextWeekday(cur.weekday);
      const shifts = cur.shiftsWorked ?? 0;
      const pay = weekday === "Monday" ? shifts * 20 : 0;
      const washed = reduceStink(cur.stink ?? 0, normalizeScent(cur.scentFrom), 25);
      const patch = {
        weekday,
        money: cur.money + pay,
        shiftsWorked: weekday === "Monday" ? 0 : shifts,
        workedToday: false,
        pressedDuty: null,
        timeOfDay: "Morning" as const,
        turnsUntilTime: 10,
        dayPhase: "playing" as const,
        morningDetour: false,
        dayStartTrust: cur.trust,
        dayStartBonding: cur.bonding,
        dayFarts: 0,
        daySprays: emptySprays(),
        dayTopics: [] as string[],
        stink: washed.stink,
        scentFrom: washed.scent,
        showersToday: 0,
        daySerial: (cur.daySerial ?? 0) + 1,
        roster: clearFed(cur.roster),
        dutyNotice: [] as GameState["dutyNotice"],
        stinkTalk: null,
        gas: [] as GameState["gas"],
        scentHold: 0,
        pendingInvite: null,
        pendingDefensive: false,
        pendingIntimateSpray: false,
        sprayed: false,
        sprayKind: "none" as const,
        sprayPrompts: [] as GameState["sprayPrompts"],
        activeDate: null,
        sceneTurns: 0,
        flags: { ...cur.flags, intimateScene: false },
        messages: [
          ...cur.messages,
          {
            id: uid(),
            role: "narrator" as const,
            at: Date.now(),
            text: `You sleep. It's ${weekday} morning.`,
          },
          ...(weekday === "Monday"
            ? [
                {
                  id: uid(),
                  role: "system" as const,
                  at: Date.now(),
                  text: shifts
                    ? `Payday. ${shifts} shift${shifts === 1 ? "" : "s"}. $${pay}.`
                    : "Monday. You didn't work. Nothing hits your account.",
                },
              ]
            : []),
        ],
      };
      set({ ...patch, fading: true, fadeMs: 1500 });
      persist(patch, get);
      window.setTimeout(() => {
        if (!get().fading) return;
        set({ fading: false, fadeMs: 700 });
      }, 1500);
    }, 1500);
  },

  readTime: () => {
    const state = get();
    if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0) return;
    const patch = runTimeSkip(asGameState(state), "read");
    if (!patch) return;
    set(patch);
    persist(patch, get);
  },

  studyTime: () => {
    const state = get();
    if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0) return;
    const patch = runTimeSkip(asGameState(state), "study");
    if (!patch) return;
    set(patch);
    persist(patch, get);
  },

  dismissPlaces: () => set({ showPlaces: false }),

  beginMorning: (place: LocationId) => {
    const s = get();
    if (s.dayPhase !== "morning") return;
    const scheduled = s.planGirl ?? s.focus ?? "izzy";
    const other = otherGirl(scheduled);
    const arrived = pullFocus({ ...asGameState(s), roster: s.roster }, other);
    const first = !s.roster?.[other]?.met;
    const where = placeOf(place);
    const voice = speakerRole(other);
    const messages = [...s.messages];
    if (other === "ronnie" && first) {
      const lines = ronnieDropIn(where.name);
      messages.push({ id: uid(), role: "narrator", at: Date.now(), text: lines.narrator });
      messages.push({ id: uid(), role: voice, at: Date.now(), expression: "happy", text: lines.line });
    } else if (other === "victoria" && first) {
      const lines = victoriaDropIn(where.name);
      messages.push({ id: uid(), role: "narrator", at: Date.now(), text: lines.narrator });
      messages.push({ id: uid(), role: voice, at: Date.now(), expression: "embarrassed", text: lines.line });
    } else if (first) {
      messages.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `${where.name}. A chubby skunk-neko in a Lil' Stinker top looks up like she got caught existing.`,
      });
      messages.push({
        id: uid(),
        role: "izzy",
        at: Date.now(),
        expression: "embarrassed",
        text: "Uh. Hi. I'm Izzy. You can smell that, I know. I was just — sitting. You can sit too. Or not.",
      });
    } else {
      messages.push({
        id: uid(),
        role: "narrator",
        at: Date.now(),
        text: `You find ${girlName(other)} at ${where.name}. ${where.blurb}`,
      });
      messages.push({
        id: uid(),
        role: voice,
        at: Date.now(),
        expression: "happy",
        text:
          other === "victoria"
            ? "You came looking. I can tell. Sit down. I have a little time before I'm expected somewhere."
            : "You found me. That's either sweet or creepy and I'm choosing sweet. What's up?",
      });
    }
    let roster = withGirl(arrived, other, {
      met: true,
      trust: Math.max(arrived.trust, first ? 6 : arrived.trust),
      bonding: Math.max(arrived.bonding, first ? 4 : arrived.bonding),
      expression: first ? "embarrassed" : "happy",
    });
    const morningPresent: GirlId[] = [other];
    if (ronnieMorningDropIn(place, scheduled, other)) {
      const ronnieFirst = !s.roster?.ronnie?.met;
      if (ronnieFirst) {
        const lines = ronnieDropIn(where.name);
        messages.push({ id: uid(), role: "narrator", at: Date.now(), text: lines.narrator });
        messages.push({ id: uid(), role: "ronnie", at: Date.now(), expression: "happy", text: lines.line });
      } else {
        messages.push({ id: uid(), role: "narrator", at: Date.now(), text: "Ronnie jogs up between classes, water bottle in hand." });
        messages.push({ id: uid(), role: "ronnie", at: Date.now(), expression: "happy", text: "Hey! Got ten minutes before my next class. What'd I miss?" });
      }
      const card = roster.ronnie;
      roster = {
        ...roster,
        ronnie: {
          ...card,
          met: true,
          trust: ronnieFirst ? Math.max(card.trust, 4) : card.trust,
          bonding: ronnieFirst ? Math.max(card.bonding, 2) : card.bonding,
          expression: "happy",
        },
      };
      morningPresent.push("ronnie");
    }
    const patch = {
      ...arrived,
      roster,
      location: place,
      present: morningPresent,
      izzyHere: true,
      morningDetour: true,
      dayPhase: "playing" as const,
      expression: first ? ("embarrassed" as const) : ("happy" as const),
      outfit: other === "victoria" ? ("work" as const) : autoOutfit(where.defaultOutfit, arrived.trust, arrived.bond, place, arrived.flags),
      messages,
      pendingInvite: null,
    };
    set(patch);
    persist(patch, get);
  },

  resolveHandoff: (planAgain: boolean) => {
    const s = get();
    if (s.dayPhase !== "handoff") return;
    const detour = s.focus ?? "izzy";
    const bonding = Math.max(0, Math.min(100, s.bonding + (planAgain ? 8 : -6)));
    const bond = bondFromScores(s.trust, bonding, s.flags.romanceAccepted);
    const slot = laterSlot(s.planTime ?? "Afternoon");
    const queuedMeet = planAgain
      ? {
          girl: detour,
          place: suitedPlace(detour, asLocationId(s.planPlace)),
          time: slot.time,
          nextDay: slot.nextDay,
        }
      : null;
    const saved = pushFocus({ ...asGameState(s), bonding, bond, roster: s.roster });
    const host = s.planGirl ?? "izzy";
    const dest = asLocationId(s.planPlace) ?? "library";
    const arrived = pullFocus({ ...saved, queuedMeet }, host);
    let dates = arrived.dates ?? 0;
    let dateSpots = [...(arrived.dateSpots ?? [])];
    if (s.plannedDate && s.gameMode === "slow" && dates < 3) {
      dates += 1;
      dateSpots = [...dateSpots, dest].slice(-3);
    }
    const where = placeOf(dest);
    const voice = speakerRole(host);
    const messages = [
      ...s.messages,
      {
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: planAgain
          ? `You tell ${girlName(detour)} you'll see her later. Then you go to ${where.name}, where ${girlName(host)} is waiting.`
          : `You don't make another plan. ${girlName(detour)} notices. You still leave for ${where.name}.`,
      },
      {
        id: uid(),
        role: voice,
        at: Date.now(),
        expression: "happy" as const,
        text:
          host === "victoria"
            ? `${s.planTime ?? "Now"}. You came. Good. I don't like being left with a clock and no company.`
            : `${s.planTime ?? "Now"}. You showed. I was starting to think the morning ate you.`,
      },
    ];
    const patch = {
      ...arrived,
      bonding: arrived.bonding,
      dates,
      dateSpots,
      location: dest,
      present: [host] as GirlId[],
      izzyHere: true,
      morningDetour: false,
      dayPhase: "playing" as const,
      timeOfDay: s.planTime ?? s.timeOfDay,
      queuedMeet,
      plannedDate: false,
      dateOpen: s.plannedDate ? dest : null,
      expression: "happy" as const,
      outfit: host === "victoria" ? ("work" as const) : autoOutfit(where.defaultOutfit, arrived.trust, arrived.bond, dest, arrived.flags),
      messages,
      pendingInvite: null,
      affairKnown: false,
    };
    set(patch);
    persist(patch, get);
  },

  confirmMeet: () => {
    const s = get();
    if (s.dayPhase !== "meet") return;
    const queued = s.meetKind === "queue" ? s.queuedMeet : null;
    const host = queued?.girl ?? s.planGirl ?? s.focus ?? "izzy";
    const dest = asLocationId(queued?.place ?? s.planPlace) ?? "library";
    const arrived = pullFocus({ ...asGameState(s), roster: s.roster }, host);
    let dates = arrived.dates ?? 0;
    let dateSpots = [...(arrived.dateSpots ?? [])];
    const counting = Boolean(s.plannedDate) && !queued;
    if (counting && s.gameMode === "slow" && dates < 3) {
      dates += 1;
      dateSpots = [...dateSpots, dest].slice(-3);
    }
    const where = placeOf(dest);
    const voice = speakerRole(host);
    const messages = [
      ...s.messages,
      {
        id: uid(),
        role: "narrator" as const,
        at: Date.now(),
        text: `You find ${girlName(host)} at ${where.name}. ${where.blurb}`,
      },
      {
        id: uid(),
        role: voice,
        at: Date.now(),
        expression: s.planAccepted || counting ? ("happy" as const) : ("suspicious" as const),
        text: counting
          ? `${s.timeOfDay}. You showed up for the date. I'm counting this one.`
          : s.planAccepted || queued
            ? `${s.timeOfDay}. You actually showed. Good.`
            : host === "victoria"
              ? "I didn't agree to this. You're here anyway. Say something worth the time."
              : "I didn't agree to this. You're here anyway. Fine. Say something that isn't a waste of the morning.",
      },
    ];
    const patch = {
      ...arrived,
      dates,
      dateSpots,
      location: dest,
      outfit: host === "victoria" ? ("work" as const) : autoOutfit(where.defaultOutfit, arrived.trust, arrived.bond, dest, arrived.flags),
      present: [host] as GirlId[],
      izzyHere: true,
      dayPhase: "playing" as const,
      expression: s.planAccepted || counting ? ("happy" as const) : ("suspicious" as const),
      pendingInvite: null,
      dateOpen: counting ? dest : null,
      plannedDate: false,
      morningDetour: false,
      meetKind: "plan" as const,
      queuedMeet: queued ? null : s.queuedMeet,
      messages,
    };
    set(patch);
    persist(patch, get);
  },

  acceptRomance: () => {
    const s = get();
    if (s.gameMode === "slow" && (s.dates ?? 0) < 3) return;
    if (romanceBlocked(s, s.trust, s.bonding, s.dates ?? 0)) return;
    const flags = { ...s.flags, romanceAccepted: true, romanceOffered: true };
    const girl = s.focus ?? "izzy";
    const bond = bondFromScores(s.trust, s.bonding, true);
    const partner = s.relationshipType === "mono" ? girl : girl;
    const roster = withGirl(s, girl, {
      romanceAccepted: true,
      romanceOffered: true,
      bond,
      met: true,
    });
    const patch = {
      flags,
      bond,
      expression: "flirty" as const,
      partner: s.relationshipType === "mono" ? girl : s.partner ?? girl,
      roster,
    };
    set({ ...patch, fxPulse: { kind: "hearts", key: Date.now() } });
    persist(patch, get);
  },
}));


/** Pure turn steps, exported for the companion unit tests only. */
export const __turnForTests = { applyTurn, applyFartDice };
