import type { GameFlags, GameMode, GameState, GirlId, LocationId, PlayerFartRole, PlayerGender, QueuedMeet } from "./types";
import { TIMES, WEEKDAYS, emptySprays } from "./time";
import { uid } from "@/lib/utils";
import { FIRST_MEETS, asLocationId, placeOf } from "./locations";
import { asOutfitId } from "./portraits";
import { initialCast, oneGreeting } from "./cast";
import { economySeed } from "./outing";
import { readTank } from "./spray";

export const SAVE_KEY = "izzy-companion-save";
export const SAVE_VERSION = 7;

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
  intimateScene: false,
});

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

type Beat = { narrator: string; first: string; second: string };

const OPENINGS: Record<string, Beat[]> = {
  library: [
    {
      narrator:
        "The history aisle is quieter than the rest of the library. Dust, old paper — and a lingering musk, animal-sharp, unmistakably skunk. At the end of the shelf a chubby skunk-neko girl in a Lil' Stinker crop top is hunched over a stack of books. She looks over. Green eyes go wide. Ears flatten.",
      first:
        "Oh— uh. Hi. You can probably smell that. Sorry. Library and all. I'm Isabella. Izzy. I was just… World War I logistics. The whole supply chain through the mud is actually—",
      second: "I'm rambling. You can just keep walking. People usually do.",
    },
    {
      narrator:
        "The history stacks smell like dust and old glue until they don't. A skunky musk hangs in the aisle. A chubby skunk-neko girl is halfway off a rolling stool, hugging a folio bigger than her torso. She notices you and almost drops it.",
      first:
        "Hi. Izzy. That smell is me. I was trying to be discreet about it, which is a skill I do not have. Late Roman grain routes. Extremely sexy. The maps, I mean.",
      second: "You can pretend you needed a different century. I won't fight you.",
    },
    {
      narrator:
        "Someone has pulled half the Pacific theater section into a messy pile on the floor. The culprit — chubby, skunk-eared, pink crop top — is sitting in it. The air is animal-sharp. She looks up, caught.",
      first:
        "Oh no. Hi. I'm Izzy. I farted. In the library. And now you're here. I was pulling island-hopping supply notes and I got excited and my body made a decision.",
      second: "If you need to leave, the 900s are that way. I live in this aisle now, apparently.",
    },
    {
      narrator:
        "A chubby skunk-neko girl is using the history shelf as a desk, HOI4 notes spilling out of a library book she is definitely not supposed to treat like a mousepad. A musk lingers. She clocks you and goes pink to the ears.",
      first:
        "That's— hi. Izzy. Don't look at the notes. Or the smell. I told myself I was researching the Eastern Front and then I started drawing front lines in the margin like a gremlin.",
      second: "You can keep walking. I will simply perish quietly among the 940s.",
    },
    {
      narrator:
        "The Bionicle section isn't even in history, but a chubby skunk-neko girl has dragged a mask-lore paperback into the stacks anyway. Skunk musk. Wide green eyes. Caught.",
      first:
        "Okay so— Izzy. Isabella. That was me. The smell. I was making a case that the Bohrok swarms are just a plague narrative with cooler masks and then my stomach voted.",
      second: "If that's too much for a first sentence, yeah. I get it. Exit's behind you.",
    },
  ],
  studyHall: [
    {
      narrator:
        "Study hall is half empty. Green lamps, open textbooks — and a musk that does not belong to highlighter ink. At the next table a chubby skunk-neko girl goes very still. She had clearly just… and thought nobody was close enough to notice.",
      first:
        "Oh god. You heard that. Or smelled it. Both, probably. I'm Izzy. I was being so quiet except for the part that isn't quiet.",
      second: "You can pretend you're looking for a seat farther away. That's the popular choice.",
    },
    {
      narrator:
        "Under a green lamp, a chubby skunk-neko girl is surrounded by index cards about Versailles. The air around her table is skunky-warm. She looks up like she considered crawling under the desk.",
      first:
        "Hi. Izzy. That wasn't the lamp. That was me. I had beans at lunch and a paper due and I made several mistakes in a row.",
      second: "There's a whole empty row by the windows if you value your lungs.",
    },
    {
      narrator:
        "Someone is taking notes on War Thunder maps in a composition book and calling it 'spatial history.' The musk gives her away before the handwriting does. Chubby, skunk-eared, mortified.",
      first:
        "Izzy. Hi. I thought the hall was empty enough. I was mapping supply routes. For a class. Okay it was for a match later. Still counts.",
      second: "If you sit somewhere else I will not be brave enough to stop you.",
    },
    {
      narrator:
        "A half-finished Evangelion essay sits next to a history syllabus. The girl attached to both — plus-size, skunk tail draped off the chair — has just let one go and is pretending the lamp did it. It did not.",
      first:
        "That's on me. I'm Izzy. I was supposed to be outlining the Treaty of Trianon and I slipped into Eva again. And then I slipped in a different way.",
      second: "You can just… not sit here. I would. I mean I wouldn't. I live here. It's complicated.",
    },
  ],
  trail: [
    {
      narrator:
        "The nature trail dips into pine shade. Birdsong, damp earth — and a sudden, animal-sharp skunk musk on the breeze. Around the bend, a chubby skunk-neko girl in a campus hoodie is frozen mid-step, tail puffed. She looks back. Sees you. Mortified.",
      first:
        "I— that was me. Obviously. I thought I was alone. Woods are supposed to be the one place I can… anyway. Izzy. Isabella. Hi.",
      second: "If you want to keep walking, I get it. The trail's big.",
    },
    {
      narrator:
        "A chubby skunk-neko girl is crouched over a patch of moss with a beat-up field notebook. The musk hits a second before she does. She stands too fast, hoodie riding up, ears flat.",
      first:
        "Hi. Izzy. I was identifying plants. Poorly. And I thought the trees didn't care if I… you know. They don't. People do.",
      second: "There's a fork up ahead if you want a less aromatic hike.",
    },
    {
      narrator:
        "The trail marker for the ridge loop has a sticky note in messy handwriting: 'wind's wrong today, use west spur.' The author is a chubby skunk-neko in a campus hoodie, caught mid-toot, looking like she works here even when she doesn't.",
      first:
        "Okay. Izzy. Trailhead Outfitters. Sometimes I scout on my off day because my nose is better than the forecast. Which is a fun fact that is currently working against me.",
      second: "You can take the other spur. I will not follow you. Probably.",
    },
    {
      narrator:
        "Someone has been looking for morels and found embarrassment instead. A chubby skunk-neko girl straightens up from the leaf litter, tail puffed, musk hanging in the pines.",
      first:
        "Mushrooms. I was looking for mushrooms. Not a metaphor. I'm Izzy. I farted in the woods like an animal because I am, technically, an animal, and I forgot hikers exist.",
      second: "Keep going if you want. I'll just… blend into this tree. I won't. But I'll try.",
    },
    {
      narrator:
        "The creek crossing is quiet except for a very obvious skunk musk. A chubby skunk-neko girl in a hoodie is sitting on a rock, catching her breath after a test, and now catching you seeing her at her least academic.",
      first:
        "I came out here to not think about a midterm and then my body filed an addendum. Izzy. Hi. This is the opposite of a great first impression.",
      second: "The path back to the lot is behind you if you need an exit. No hard feelings. Some smell feelings.",
    },
  ],
  animeStore: [
    {
      narrator:
        "Neko Shelf is cramped in the good way: figures, tapestries, a TV looping an OP. Then the musk — skunk, not acrylic. A chubby skunk-neko girl is holding an Evangelion box like it might explode. She looks over. It kind of did.",
      first:
        "Hi. Izzy. That's me. The smell, not the Unit-01. I got excited about the reprint and my stomach joined the conversation.",
      second: "You can browse the other wall. I will be here, surviving, possibly buying this anyway.",
    },
    {
      narrator:
        "The Monster Musume shelf has a gap. The girl who made it — plus-size, skunk-eared, campus hoodie — is clutching volume eight and radiating an animal-sharp musk she is trying to ignore. She fails. She sees you.",
      first:
        "I was just— Izzy. I came for this and then I let one go in an anime store, which is a new low, even for me. Centaurs wouldn't judge. People do.",
      second: "If you need to look at manga that doesn't smell like me, that's most of the store.",
    },
    {
      narrator:
        "Someone is arguing quietly with a price tag on a Yani-Neko figure. Chubby skunk-neko, tail knocking a tapestry. The musk arrives before the apology.",
      first:
        "Okay so— I'm Izzy. I did not mean to season Neko Shelf. I was doing math on whether I can justify this figure and my digestive tract said 'no, but also yes.'",
      second: "You can just… keep walking toward the keychains. I would.",
    },
    {
      narrator:
        "Plus Sized Elf is face-out on the shelf. The girl reaching for it looks like she wandered out of the pages — chubby, skunk-eared — and has just farted in the aisle. Green eyes go huge.",
      first:
        "That's ironic. I'm Izzy. I came for representation and I brought… atmosphere. Sorry. They don't usually let the mascot contribute.",
      second: "There's a whole shonen wall if you want distance. I get it.",
    },
    {
      narrator:
        "Neko Shelf's back corner has Shikanokonoko merch and one chubby skunk-neko girl who thought a deer-girl display was a safe place to unclench. It was not. You round the spinner rack. She dies a little.",
      first:
        "Hi. Izzy. I came for the deer nonsense and then I made my own problem. The woods I can explain. A mall anime store is harder.",
      second: "If you need to bounce, bounce. I'll be hiding behind this cardboard cutout that is not big enough.",
    },
  ],
  craftStore: [
    {
      narrator:
        "Hearth & Hobby smells like dried flowers and hot glue until a skunky note cuts through the fabric aisle. A chubby skunk-neko girl in a campus hoodie is comparing two bolts of cloth like she is not sure she is allowed to touch them. She looks up. Ears flatten.",
      first:
        "Oh. Hi. Izzy. I was looking for something for a gift and then I… the smell is me. I don't usually come in here. I can tell.",
      second: "You can keep shopping. I'll put the fabric back. Probably. Maybe. Don't mind me.",
    },
    {
      narrator:
        "The wreath display has a chubby skunk-neko girl half-hidden behind it, tail curled tight, a musk hanging in the aisle that is not potpourri. She sees you and goes pink.",
      first:
        "Hi. Izzy. I thought a craft store would be empty on a Monday. I was wrong, and my stomach was louder than the empty. Sorry.",
      second: "The florals are that way if you want distance. I will be over here, surviving.",
    },
  ],
  gym: [
    {
      narrator:
        "The campus weight room smells like rubber and iron. A loaded rack, two bench presses, mirrors. Then a skunky note that isn't the chalk. A chubby skunk-neko girl in a campus hoodie is sitting on the end of a bench, caught between a set and an apology.",
      first:
        "Oh. Hi. Izzy. I came in to hide from a reading and then I… yeah. The smell is me. I don't even lift. I just needed a room that wasn't the library.",
      second: "You can take the other bench. I'll be quiet. Or I'll try. My stomach has its own opinions.",
    },
    {
      narrator:
        "Afternoon in the weight room. Plates on the rack, a bar on the nearer bench, nobody else around until you walk in on a chubby skunk-neko girl who has clearly just let one go and is pretending the mirrors didn't witness it.",
      first:
        "Don't— hi. I'm Izzy. That was me. I was going to do one set so I could say I went to the gym, and my body filed a different workout.",
      second: "The exit's behind you if a first impression should not include chalk and skunk. Fair.",
    },
  ],
};

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
  const lines = pick(OPENINGS[loc] ?? OPENINGS.library);
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
    timeOfDay: "Afternoon",
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
    ...initialCast("izzy"),
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
    timeOfDay: "Afternoon",
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
    ...initialCast("izzy"),
  };
}

function asGirl(value: unknown): GirlId | null {
  return value === "izzy" || value === "victoria" ? value : null;
}

const AFFAIR_PHASES = ["wait", "hint", "demand", "warn", "reclaim", "spent", "known"] as const;

export function parseMarkAffair(raw: GameState["markAffair"] | null | undefined): GameState["markAffair"] {
  if (!raw || typeof raw !== "object") return null;
  const girl = raw.girl === "izzy" || raw.girl === "victoria" ? raw.girl : null;
  const marker = raw.marker === "izzy" || raw.marker === "victoria" ? raw.marker : null;
  const phase = AFFAIR_PHASES.find((item) => item === raw.phase);
  if (!girl || !marker || !phase || girl === marker) return null;
  const waits = typeof raw.waits === "number" && Number.isFinite(raw.waits) ? Math.max(0, Math.round(raw.waits)) : 0;
  return { girl, marker, phase, waits };
}

function migrate(raw: GameState): GameState {
  const base = blankState();
  const location = asLocationId(raw.location) ?? "library";
  const focus = asGirl(raw.focus) ?? "izzy";
  const seeded = initialCast(focus);
  const roster = raw.roster?.izzy && raw.roster?.victoria ? raw.roster : seeded.roster;
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
  for (const girl of ["izzy", "victoria"] as const) {
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
    ...raw,
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
    daySprays: { ...emptySprays(), ...raw.daySprays },
    dayTopics: Array.isArray(raw.dayTopics) ? raw.dayTopics.slice(0, 8) : [],
    debug: Boolean(raw.debug),
    debugOutfitLock: Boolean(raw.debugOutfitLock),
    flags: { ...defaultFlags(), ...raw.flags },
    messages: Array.isArray(raw.messages) ? raw.messages : [],
    relationshipType: raw.relationshipType === "harem" ? "harem" : "mono",
    focus,
    present: present.length ? present : [focus],
    roster,
    planGirl: asGirl(raw.planGirl) ?? focus,
    morningDetour: Boolean(raw.morningDetour),
    queuedMeet,
    meetKind: raw.meetKind === "queue" ? "queue" : "plan",
    partner: asGirl(raw.partner),
    affairKnown: Boolean(raw.affairKnown),
    money: typeof raw.money === "number" ? Math.max(0, Math.round(raw.money)) : 100,
    inventory: Array.isArray(raw.inventory) ? raw.inventory.filter((id): id is string => typeof id === "string") : [],
    dateDraft: raw.dateDraft ?? null,
    scheduledDate: raw.scheduledDate ?? null,
    activeDate: raw.activeDate ?? null,
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
    pressedDuty: raw.pressedDuty === "izzy" || raw.pressedDuty === "victoria" ? raw.pressedDuty : null,
    stink: typeof raw.stink === "number" ? Math.max(0, Math.min(100, Math.round(raw.stink))) : 0,
    scentFrom: {
      izzy: typeof raw.scentFrom?.izzy === "number" ? Math.max(0, Math.round(raw.scentFrom.izzy)) : 0,
      victoria: typeof raw.scentFrom?.victoria === "number" ? Math.max(0, Math.round(raw.scentFrom.victoria)) : 0,
    },
    stinkAsked: raw.stinkAsked ?? {},
    stinkTalk:
      raw.stinkTalk && (raw.stinkTalk.girl === "izzy" || raw.stinkTalk.girl === "victoria")
        ? { girl: raw.stinkTalk.girl, presses: typeof raw.stinkTalk.presses === "number" ? raw.stinkTalk.presses : 0 }
        : null,
    showersToday: typeof raw.showersToday === "number" ? Math.max(0, Math.min(2, Math.round(raw.showersToday))) : 0,
    daySerial: typeof raw.daySerial === "number" ? Math.max(0, Math.round(raw.daySerial)) : 0,
    dutyNotice: Array.isArray(raw.dutyNotice)
      ? raw.dutyNotice.filter(
          (notice): notice is GameState["dutyNotice"][number] =>
            !!notice &&
            (notice.girl === "izzy" || notice.girl === "victoria") &&
            (notice.duty === "class" || notice.duty === "work") &&
            Boolean(asLocationId(notice.place)),
        )
      : [],
    flauntDay: raw.flauntDay ?? {},
    markAffair: parseMarkAffair(raw.markAffair),
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
            !!prompt &&
            (prompt.girl === "izzy" || prompt.girl === "victoria") &&
            (prompt.kind === "angry" ||
              prompt.kind === "consensual" ||
              prompt.kind === "defensive" ||
              prompt.kind === "dominant"),
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
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
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
