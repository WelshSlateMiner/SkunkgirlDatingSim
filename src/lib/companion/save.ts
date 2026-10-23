import type { GameFlags, GameMode, GameState, GirlId, LiveEvent, LocationId, PlayerFartRole, PlayerGender, QueuedMeet } from "./types";
import { TIMES, WEEKDAYS, emptySprays } from "./time";
import { uid } from "@/lib/utils";
import { FIRST_MEETS, asLocationId, placeOf } from "./locations";
import { asOutfitId } from "./portraits";
import { blankCard, initialCast, oneGreeting } from "./cast";
import { economySeed } from "./outing";
import { readSceneFarts } from "./scene";
import { keepsakeById } from "./keepsakes";
import { isFlatFive, readOpinionGain, readOpinions } from "./opinions";
import { readTank } from "./spray";
import { OPENINGS } from "./openings";

export const SAVE_KEY = "izzy-companion-save";
export const SAVE_VERSION = 12;

export const defaultFlags = (): GameFlags => ({
  invitedMexican: false,
  invitedDorm: false,
  visitedDorm: false,
  knowsAboutSpray: false,
  romanceOffered: false,
  romanceAccepted: false,
  workShift: false,
  firstFartTest: false,
  firstInfodumpTest: false,
  sprayRepair: false,
  intimateSprayResolved: false,
  evaInterest: false,
  mymyInterest: false,
  fartConverted: false,
  sprayYield: "none",
  defenseAftermath: "none",
  nicknamesOff: false,
  scentInterest: false,
  vickyScentCurious: false,
  intimateScene: false,
});

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function openingState(
  playerName: string,
  meet: LocationId = "library",
  debug = false,
  playerGender: PlayerGender = "male",
  playerFartRole: PlayerFartRole = "into",
  gameMode: GameMode = "casual",
): GameState {
  const name = playerName.trim() || "you";
  const loc = FIRST_MEETS.includes(meet) ? meet : "library";
  const place = placeOf(loc);
  const lines = pick(OPENINGS[loc] ?? OPENINGS.library ?? []);
  const messages: GameState["messages"] = [
    {
      id: uid(),
      role: "narrator",
      at: Date.now(),
      text: lines.narrator,
    },
    {
      id: uid(),
      role: "izzy",
      at: Date.now() + 1,
      expression: "embarrassed",
      fx: "blush",
      text: oneGreeting(lines.first, lines.second),
    },
  ];
  return {
    version: SAVE_VERSION,
    playerName: name,
    playerGender,
    playerFartRole,
    gameMode,
    dates: 0,
    dateSpots: [],
    dateOpen: null,
    plannedDate: false,
    started: true,
    trust: 6,
    bonding: 4,
    location: loc,
    outfit: place.defaultOutfit,
    expression: "embarrassed",
    bond: "stranger",
    sprayed: false,
    sprayKind: "none",
    sprayCount: 0,
    testsDone: [],
    flags: defaultFlags(),
    pendingTest: null,
    pendingInvite: null,
    pendingIntimateSpray: false,
    glandCap: 0,
    glandShots: 0,
    turnsSinceIntimateSpray: 0,
    glandDry: 0,
    scentHold: 0,
    weekday: "Monday",
    timeOfDay: "Morning",
    turnsUntilTime: 10,
    dayPhase: "playing",
    izzyHere: true,
    pendingDefensive: false,
    threatLevel: "none",
    planTime: null,
    planPlace: null,
    planAccepted: false,
    dayStartTrust: 6,
    dayStartBonding: 4,
    dayFarts: 0,
    daySprays: emptySprays(),
    dayTopics: [],
    debug,
    debugOutfitLock: false,
    messages,
    ...economySeed(),
    heldGiftId: null,
    ...initialCast("izzy"),
    keepsakes: [],
    seenDay: {},
    incident: null,
    opinions: readOpinions(null),
    opinionGain: {},
  };
}

export function blankState(): GameState {
  return {
    version: SAVE_VERSION,
    playerName: "",
    playerGender: "male",
    playerFartRole: "into",
    gameMode: "casual",
    dates: 0,
    dateSpots: [],
    dateOpen: null,
    plannedDate: false,
    started: false,
    trust: 6,
    bonding: 4,
    location: "library",
    outfit: "casual",
    expression: "embarrassed",
    bond: "stranger",
    messages: [],
    sprayed: false,
    sprayKind: "none",
    sprayCount: 0,
    testsDone: [],
    flags: defaultFlags(),
    pendingTest: null,
    pendingInvite: null,
    pendingIntimateSpray: false,
    glandCap: 0,
    glandShots: 0,
    turnsSinceIntimateSpray: 0,
    glandDry: 0,
    scentHold: 0,
    weekday: "Monday",
    timeOfDay: "Morning",
    turnsUntilTime: 10,
    dayPhase: "playing",
    izzyHere: true,
    pendingDefensive: false,
    threatLevel: "none",
    planTime: null,
    planPlace: null,
    planAccepted: false,
    dayStartTrust: 6,
    dayStartBonding: 4,
    dayFarts: 0,
    daySprays: emptySprays(),
    dayTopics: [],
    debug: false,
    debugOutfitLock: false,
    ...economySeed(),
    heldGiftId: null,
    ...initialCast("izzy"),
    keepsakes: [],
    seenDay: {},
    incident: null,
    opinions: readOpinions(null),
    opinionGain: {},
  };
}

function asGirl(value: unknown): GirlId | null {
  return value === "izzy" || value === "victoria" || value === "ronnie" || value === "mira" ? value : null;
}

const EVENT_PHASES = ["threat", "skunked", "dare", "clear"] as const;
const WOLF_FRAMES = ["snarl", "sprayed", "retreat", "off"] as const;

export function parseIncident(raw: unknown): LiveEvent | null {
  if (!raw || typeof raw !== "object") return null;
  const event = raw as Partial<LiveEvent>;
  if (event.id !== "wolf") return null;
  const phase = EVENT_PHASES.find((item) => item === event.phase);
  const wolf = WOLF_FRAMES.find((item) => item === event.wolf);
  if (!phase || !wolf) return null;
  const girls = Array.isArray(event.girls) ? event.girls.filter((id): id is GirlId => asGirl(id) !== null) : [];
  const sprayers = Array.isArray(event.sprayers) ? event.sprayers.filter((id): id is GirlId => asGirl(id) !== null) : [];
  const darers = Array.isArray(event.darers) ? event.darers.filter((id): id is GirlId => asGirl(id) !== null) : [];
  if (!girls.length) return null;
  const cause = event.cause === "accident" ? ("accident" as const) : undefined;
  return {
    id: "wolf",
    phase,
    wolf,
    girls,
    sprayers,
    ...(cause ? { cause } : {}),
    ...(darers.length ? { darers } : {}),
  };
}

const AFFAIR_PHASES = ["wait", "hint", "demand", "warn", "reclaim", "spent", "known"] as const;

export function parseMarkAffair(raw: GameState["markAffair"] | null | undefined): GameState["markAffair"] {
  if (!raw || typeof raw !== "object") return null;
  const girl = raw.girl === "izzy" || raw.girl === "victoria" || raw.girl === "ronnie" || raw.girl === "mira" ? raw.girl : null;
  const marker = raw.marker === "izzy" || raw.marker === "victoria" || raw.marker === "ronnie" || raw.marker === "mira" ? raw.marker : null;
  const phase = AFFAIR_PHASES.find((item) => item === raw.phase);
  if (!girl || !marker || !phase || girl === marker) return null;
  const waits = typeof raw.waits === "number" && Number.isFinite(raw.waits) ? Math.max(0, Math.round(raw.waits)) : 0;
  return { girl, marker, phase, waits };
}

const FACES = new Set([
  "embarrassed",
  "happy",
  "idle",
  "flirty",
  "laughing",
  "suspicious",
  "shy",
  "angry",
  "infodump",
  "aroused",
  "thinking",
  "scheming",
  "spray",
]);
const BONDS = new Set(["stranger", "acquaintance", "friend", "close", "romantic"]);

function withoutHeldFlag<T>(date: T | null | undefined): T | null {
  if (!date || typeof date !== "object") return null;
  const { giftHeld: _flag, ...rest } = date as T & { giftHeld?: boolean };
  return rest as T;
}

function readFlags(raw: Partial<GameFlags> | undefined): GameFlags {
  const base = defaultFlags();
  if (!raw) return base;
  const next = { ...base };
  for (const key of Object.keys(base) as (keyof GameFlags)[]) {
    if (raw[key] !== undefined) next[key] = raw[key] as never;
  }
  if (next.sprayYield !== "none" && next.sprayYield !== "submit" && next.sprayYield !== "resist") next.sprayYield = "none";
  if (next.defenseAftermath !== "none" && next.defenseAftermath !== "surrender" && next.defenseAftermath !== "aroused") {
    next.defenseAftermath = "none";
  }
  return next;
}

function readHeldGift(raw: GameState): string | null {
  if (typeof raw.heldGiftId === "string" && raw.heldGiftId) return raw.heldGiftId;
  const active = raw.activeDate as (GameState["activeDate"] & { giftHeld?: boolean }) | null;
  if (active?.giftHeld && active.giftId) return active.giftId;
  const scheduled = raw.scheduledDate as (GameState["scheduledDate"] & { giftHeld?: boolean }) | null;
  if (scheduled?.giftHeld && scheduled.giftId) return scheduled.giftId;
  return null;
}

/**
 * v12 is the first versioned step. Older saves, including ones with no version,
 * take this normalizer. Unknown keys are dropped. giftHeld on a date folds into heldGiftId.
 */
export function migrate(raw: GameState): GameState {
  return normalizeV12(raw);
}

function normalizeV12(raw: GameState): GameState {
  const base = blankState();
  const location = asLocationId(raw.location) ?? "library";
  const focus = asGirl(raw.focus) ?? "izzy";
  const seeded = initialCast(focus);
  const roster = raw.roster?.izzy && raw.roster?.victoria ? { ...raw.roster } : seeded.roster;
  // Saves from before Ronnie have no card for her. She starts unmet.
  if (!roster.ronnie) roster.ronnie = blankCard("casual");
  if (!roster.mira) roster.mira = blankCard("casual");
  if (!raw.roster?.izzy) {
    roster.izzy = {
      ...roster.izzy,
      met: true,
      trust: typeof raw.trust === "number" ? raw.trust : 6,
      bonding: typeof raw.bonding === "number" ? raw.bonding : 4,
      bond: raw.bond ?? "stranger",
      romanceOffered: Boolean(raw.flags?.romanceOffered),
      romanceAccepted: Boolean(raw.flags?.romanceAccepted),
      knowsAboutSpray: Boolean(raw.flags?.knowsAboutSpray),
      scentInterest: Boolean(raw.flags?.scentInterest),
      dates: typeof raw.dates === "number" ? raw.dates : 0,
      dateSpots: Array.isArray(raw.dateSpots)
        ? raw.dateSpots.map((id) => asLocationId(id)).filter((id): id is LocationId => Boolean(id)).slice(0, 3)
        : [],
      expression: raw.expression ?? "embarrassed",
      outfit: asOutfitId(raw.outfit) ?? "casual",
    };
  }
  const inherited = readTank(raw);
  for (const girl of ["izzy", "victoria", "ronnie", "mira"] as const) {
    const card = roster[girl];
    if (!card) continue;
    const own = typeof card.glandCap === "number";
    const tank = own ? readTank(card) : girl === focus ? inherited : readTank(null);
    roster[girl] = {
      ...card,
      ...tank,
      fartDebt: typeof card.fartDebt === "number" && card.fartDebt > 0 ? Math.round(card.fartDebt) : 0,
      fedStops: Array.isArray(card.fedStops)
        ? card.fedStops.map((id) => asLocationId(id)).filter((id): id is LocationId => Boolean(id))
        : [],
    };
  }
  const present = Array.isArray(raw.present)
    ? raw.present.map(asGirl).filter((id): id is GirlId => Boolean(id))
    : [];
  const queued = raw.queuedMeet;
  const queuedMeet: QueuedMeet | null =
    queued && asGirl(queued.girl) && asLocationId(queued.place) && TIMES.includes(queued.time)
      ? {
          girl: asGirl(queued.girl)!,
          place: asLocationId(queued.place)!,
          time: queued.time,
          nextDay: Boolean(queued.nextDay),
        }
      : null;
  return {
    ...base,
    version: SAVE_VERSION,
    playerName: typeof raw.playerName === "string" ? raw.playerName : "",
    playerGender: raw.playerGender === "female" ? "female" : "male",
    playerFartRole: raw.playerFartRole === "not" ? "not" : "into",
    gameMode: raw.gameMode === "slow" ? "slow" : "casual",
    dates: typeof raw.dates === "number" ? Math.max(0, Math.min(3, Math.round(raw.dates))) : 0,
    dateSpots: Array.isArray(raw.dateSpots)
      ? raw.dateSpots.map((id) => asLocationId(id)).filter((id): id is LocationId => Boolean(id)).slice(0, 3)
      : [],
    dateOpen: asLocationId(raw.dateOpen),
    plannedDate: Boolean(raw.plannedDate),
    started: raw.started === true,
    trust: typeof raw.trust === "number" ? raw.trust : base.trust,
    expression: FACES.has(String(raw.expression)) ? raw.expression : base.expression,
    bond: BONDS.has(String(raw.bond)) ? raw.bond : base.bond,
    sprayed: Boolean(raw.sprayed),
    sprayCount: typeof raw.sprayCount === "number" ? Math.max(0, Math.round(raw.sprayCount)) : 0,
    testsDone: Array.isArray(raw.testsDone) ? raw.testsDone.filter((id): id is string => typeof id === "string") : [],
    pendingTest: typeof raw.pendingTest === "string" ? raw.pendingTest : null,
    location,
    outfit: asOutfitId(raw.outfit) ?? placeOf(location).defaultOutfit,
    sprayKind:
      raw.sprayKind === "consensual" ||
      raw.sprayKind === "angry" ||
      raw.sprayKind === "defensive" ||
      raw.sprayKind === "dominant"
        ? raw.sprayKind
        : "none",
    bonding: typeof raw.bonding === "number" ? raw.bonding : 4,
    pendingInvite: asLocationId(raw.pendingInvite),
    pendingIntimateSpray: Boolean(raw.pendingIntimateSpray),
    glandCap: typeof raw.glandCap === "number" ? raw.glandCap : 0,
    glandShots: typeof raw.glandShots === "number" ? raw.glandShots : 0,
    turnsSinceIntimateSpray: typeof raw.turnsSinceIntimateSpray === "number" ? raw.turnsSinceIntimateSpray : 0,
    glandDry: typeof raw.glandDry === "number" ? raw.glandDry : 0,
    scentHold: typeof raw.scentHold === "number" ? raw.scentHold : 0,
    weekday: WEEKDAYS.includes(raw.weekday) ? raw.weekday : "Monday",
    timeOfDay: TIMES.includes(raw.timeOfDay) ? raw.timeOfDay : "Afternoon",
    turnsUntilTime: typeof raw.turnsUntilTime === "number" ? raw.turnsUntilTime : 10,
    dayPhase:
      raw.dayPhase === "planning" ||
      raw.dayPhase === "summary" ||
      raw.dayPhase === "meet" ||
      raw.dayPhase === "morning" ||
      raw.dayPhase === "handoff"
        ? raw.dayPhase
        : "playing",
    izzyHere: raw.izzyHere !== false,
    pendingDefensive: Boolean(raw.pendingDefensive),
    threatLevel: raw.threatLevel === "attack" || raw.threatLevel === "scare" ? raw.threatLevel : "none",
    planTime: TIMES.includes(raw.planTime as never) ? raw.planTime : null,
    planPlace: asLocationId(raw.planPlace),
    planAccepted: Boolean(raw.planAccepted),
    dayStartTrust: typeof raw.dayStartTrust === "number" ? raw.dayStartTrust : raw.trust,
    dayStartBonding: typeof raw.dayStartBonding === "number" ? raw.dayStartBonding : raw.bonding,
    dayFarts: typeof raw.dayFarts === "number" ? raw.dayFarts : 0,
    daySprays: (() => {
      const sprays = emptySprays();
      const incoming = raw.daySprays;
      if (incoming) {
        for (const key of Object.keys(sprays) as (keyof typeof sprays)[]) {
          const n = incoming[key];
          if (typeof n === "number") sprays[key] = n;
        }
      }
      return sprays;
    })(),
    dayTopics: Array.isArray(raw.dayTopics) ? raw.dayTopics.slice(0, 8) : [],
    debug: Boolean(raw.debug),
    debugOutfitLock: Boolean(raw.debugOutfitLock),
    flags: readFlags(raw.flags),
    messages: Array.isArray(raw.messages) ? raw.messages : [],
    relationshipType: raw.relationshipType === "harem" ? "harem" : "mono",
    focus,
    present: present.length ? present : [focus],
    sceneFarts: readSceneFarts(raw.sceneFarts),
    roster,
    planGirl: asGirl(raw.planGirl) ?? focus,
    morningDetour: Boolean(raw.morningDetour),
    queuedMeet,
    meetKind: raw.meetKind === "queue" ? "queue" : "plan",
    partner: asGirl(raw.partner),
    affairKnown: Boolean(raw.affairKnown),
    money: typeof raw.money === "number" ? Math.max(0, Math.round(raw.money)) : 100,
    inventory: Array.isArray(raw.inventory) ? raw.inventory.filter((id): id is string => typeof id === "string") : [],
    heldGiftId: readHeldGift(raw),
    dateDraft: raw.dateDraft ?? null,
    scheduledDate: withoutHeldFlag(raw.scheduledDate),
    activeDate: withoutHeldFlag(raw.activeDate),
    dateReview: raw.dateReview ?? null,
    confronting: asGirl(raw.confronting),
    grudge: raw.grudge ?? {},
    dateTipOff: raw.dateTipOff ?? {},
    gas: Array.isArray(raw.gas)
      ? raw.gas.filter((puff) => puff && (puff.size === 1 || puff.size === 2 || puff.size === 3) && puff.turns > 0)
      : [],
    departure:
      raw.departure && asGirl(raw.departure.girl) && asLocationId(raw.departure.place)
        ? { girl: asGirl(raw.departure.girl)!, place: asLocationId(raw.departure.place)! }
        : null,
    trailStreak: typeof raw.trailStreak === "number" ? raw.trailStreak : 0,
    trailGirl: asGirl(raw.trailGirl),
    sceneTurns: typeof raw.sceneTurns === "number" ? raw.sceneTurns : 0,
    shiftsWorked: typeof raw.shiftsWorked === "number" ? Math.max(0, Math.round(raw.shiftsWorked)) : 0,
    workedToday: Boolean(raw.workedToday),
    pressedDuty: asGirl(raw.pressedDuty),
    stink: typeof raw.stink === "number" ? Math.max(0, Math.min(100, Math.round(raw.stink))) : 0,
    scentFrom: {
      izzy: typeof raw.scentFrom?.izzy === "number" ? Math.max(0, Math.round(raw.scentFrom.izzy)) : 0,
      victoria: typeof raw.scentFrom?.victoria === "number" ? Math.max(0, Math.round(raw.scentFrom.victoria)) : 0,
      ronnie: typeof raw.scentFrom?.ronnie === "number" ? Math.max(0, Math.round(raw.scentFrom.ronnie)) : 0,
      mira: typeof raw.scentFrom?.mira === "number" ? Math.max(0, Math.round(raw.scentFrom.mira)) : 0,
    },
    stinkAsked: raw.stinkAsked ?? {},
    stinkTalk:
      raw.stinkTalk && asGirl(raw.stinkTalk.girl)
        ? { girl: raw.stinkTalk.girl, presses: typeof raw.stinkTalk.presses === "number" ? raw.stinkTalk.presses : 0 }
        : null,
    showersToday: typeof raw.showersToday === "number" ? Math.max(0, Math.round(raw.showersToday)) : 0,
    opinions: isFlatFive(raw.opinions) ? readOpinions(null) : readOpinions(raw.opinions),
    opinionGain: readOpinionGain(raw.opinionGain),
    daySerial: typeof raw.daySerial === "number" ? Math.max(0, Math.round(raw.daySerial)) : 0,
    dutyNotice: Array.isArray(raw.dutyNotice)
      ? raw.dutyNotice.filter(
          (notice): notice is GameState["dutyNotice"][number] =>
            Boolean(
              notice &&
                asGirl(notice.girl) &&
                (notice.duty === "class" || notice.duty === "work") &&
                asLocationId(notice.place),
            ),
        )
      : [],
    flauntDay: raw.flauntDay ?? {},
    markAffair: parseMarkAffair(raw.markAffair),
    keepsakes: Array.isArray(raw.keepsakes)
      ? raw.keepsakes.filter((id): id is string => typeof id === "string" && Boolean(keepsakeById(id)))
      : [],
    attention:
      raw.attention && typeof raw.attention.day === "number"
        ? {
            day: Math.round(raw.attention.day),
            mira: typeof raw.attention.mira === "number" ? Math.max(0, Math.round(raw.attention.mira)) : 0,
          }
        : undefined,
    seenDay: {
      ...(typeof raw.seenDay?.izzy === "number" ? { izzy: raw.seenDay.izzy } : {}),
      ...(typeof raw.seenDay?.victoria === "number" ? { victoria: raw.seenDay.victoria } : {}),
      ...(typeof raw.seenDay?.ronnie === "number" ? { ronnie: raw.seenDay.ronnie } : {}),
      ...(typeof raw.seenDay?.mira === "number" ? { mira: raw.seenDay.mira } : {}),
    },
    incident: parseIncident(raw.incident),
    otherSprayKind:
      raw.otherSprayKind === "angry" ||
      raw.otherSprayKind === "consensual" ||
      raw.otherSprayKind === "defensive" ||
      raw.otherSprayKind === "dominant"
        ? raw.otherSprayKind
        : "none",
    sprayPrompts: Array.isArray(raw.sprayPrompts)
      ? raw.sprayPrompts.filter(
          (prompt): prompt is GameState["sprayPrompts"][number] =>
            Boolean(
              prompt &&
                asGirl(prompt.girl) &&
                (prompt.kind === "angry" ||
                  prompt.kind === "consensual" ||
                  prompt.kind === "defensive" ||
                  prompt.kind === "dominant"),
            ),
        )
      : [],
  };
}

export function loadSave(): GameState | null {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    return migrate(parsed);
  } catch {
    return null;
  }
}

export function writeSave(state: GameState) {
  try {
    const { fartPlan: _plan, ...rest } = state;
    localStorage.setItem(SAVE_KEY, JSON.stringify(rest));
  } catch {
    /* private mode / quota */
  }
}

export function clearSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
  } catch {
    /* ignore */
  }
}

export function saveFileName(state: Pick<GameState, "playerName">) {
  const who = (state.playerName || "run").replace(/[^\w-]+/g, "").slice(0, 24) || "run";
  return `skunkgirls-${who}.json`;
}

/** Download or share the run as a JSON file the player can keep. */
export async function downloadSave(state: GameState) {
  const { fartPlan: _plan, ...rest } = state;
  const body = JSON.stringify({ ...rest, started: true });
  const name = saveFileName(state);
  const file = new File([body], name, { type: "application/json" });
  if (typeof navigator.canShare === "function" && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file], title: "Skunkgirls save" });
      return;
    } catch (err) {
      if (err instanceof DOMException && err.name === "AbortError") return;
    }
  }
  const url = URL.createObjectURL(file);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Read a save file. Null if it is not one of ours. */
export function readSaveText(text: string): GameState | null {
  try {
    const data = JSON.parse(text) as GameState;
    if (!data || typeof data !== "object") return null;
    if (typeof data.playerName !== "string" || !Array.isArray(data.messages)) return null;
    const state = migrate(data);
    if (!state.playerName.trim() && state.messages.length === 0) return null;
    return { ...state, started: true };
  } catch {
    return null;
  }
}
