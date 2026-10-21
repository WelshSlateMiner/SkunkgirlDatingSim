import type {
  Bond,
  Expression,
  GameState,
  GirlCard,
  GirlId,
  LocationId,
  OutfitId,
  QueuedMeet,
  RelationshipType,
  Roster,
  TimeOfDay,
  Weekday,
} from "./types";
import { bondFromScores } from "./trust";
import { sexualBeat } from "./intimacy";
import { uid } from "@/lib/utils";
import { openTonight, placeOf } from "./locations";
import { MAX_SCENE_GIRLS, sceneOrder, sceneOthers } from "./scene";
import { dutyOf } from "./outing";
import { RONNIE_HAUNTS } from "./ronnie-bio";

export const GIRLS: GirlId[] = ["izzy", "victoria", "ronnie", "mira"];

const AFFINITY: Record<LocationId, Record<GirlId, number>> = {
  library: { izzy: 70, victoria: 70, ronnie: 50, mira: 68 },
  studyHall: { izzy: 78, victoria: 42, ronnie: 40, mira: 64 },
  classroom: { izzy: 88, victoria: 8, ronnie: 55, mira: 50 },
  cafe: { izzy: 58, victoria: 48, ronnie: 62, mira: 46 },
  campus: { izzy: 84, victoria: 12, ronnie: 64, mira: 40 },
  trail: { izzy: 76, victoria: 22, ronnie: 72, mira: 16 },
  dorm: { izzy: 100, victoria: 0, ronnie: 0, mira: 0 },
  mexican: { izzy: 82, victoria: 28, ronnie: 30, mira: 58 },
  burger: { izzy: 64, victoria: 16, ronnie: 28, mira: 8 },
  mall: { izzy: 50, victoria: 52, ronnie: 30, mira: 52 },
  gameStore: { izzy: 74, victoria: 18, ronnie: 12, mira: 12 },
  foodCourt: { izzy: 56, victoria: 30, ronnie: 30, mira: 8 },
  fashion: { izzy: 40, victoria: 64, ronnie: 18, mira: 72 },
  makeup: { izzy: 32, victoria: 58, ronnie: 10, mira: 80 },
  collectibles: { izzy: 76, victoria: 28, ronnie: 40, mira: 60 },
  trendy: { izzy: 68, victoria: 18, ronnie: 60, mira: 58 },
  perfume: { izzy: 22, victoria: 92, ronnie: 6, mira: 84 },
  theater: { izzy: 52, victoria: 48, ronnie: 56, mira: 74 },
  animeStore: { izzy: 96, victoria: 14, ronnie: 38, mira: 76 },
  tabletop: { izzy: 72, victoria: 24, ronnie: 14, mira: 12 },
  grocery: { izzy: 38, victoria: 74, ronnie: 24, mira: 18 },
  naturalFoods: { izzy: 34, victoria: 56, ronnie: 66, mira: 64 },
  sportingGoods: { izzy: 70, victoria: 18, ronnie: 82, mira: 10 },
  apartment: { izzy: 40, victoria: 40, ronnie: 30, mira: 24 },
  vickyLiving: { izzy: 0, victoria: 100, ronnie: 20, mira: 0 },
  vickyBedroom: { izzy: 0, victoria: 100, ronnie: 0, mira: 0 },
  craftStore: { izzy: 18, victoria: 96, ronnie: 30, mira: 22 },
  italian: { izzy: 34, victoria: 90, ronnie: 20, mira: 62 },
  furniture: { izzy: 14, victoria: 96, ronnie: 22, mira: 16 },
  firm: { izzy: 8, victoria: 98, ronnie: 0, mira: 0 },
  gym: { izzy: 82, victoria: 12, ronnie: 96, mira: 70 },
  yogaStudio: { izzy: 24, victoria: 36, ronnie: 92, mira: 90 },
  field: { izzy: 74, victoria: 14, ronnie: 94, mira: 12 },
  ronnieDorm: { izzy: 0, victoria: 0, ronnie: 100, mira: 0 },
  miraDorm: { izzy: 0, victoria: 0, ronnie: 0, mira: 100 },
};

const PRIVATE = new Set<LocationId>(["dorm", "apartment", "vickyLiving", "vickyBedroom", "ronnieDorm", "miraDorm"]);

/**
 * The other girl in this scene: the first one after the focus in scene order.
 * Without a scene, the old Izzy/Victoria swap (Ronnie pairs with Izzy, her campus classmate).
 */
export function otherGirl(id: GirlId, present?: readonly GirlId[]): GirlId {
  const here = present ? sceneOthers(present, id) : [];
  if (here.length) return here[0]!;
  return id === "izzy" ? "victoria" : "izzy";
}

export function girlName(id: GirlId) {
  return id === "victoria" ? "Victoria" : id === "ronnie" ? "Ronnie" : id === "mira" ? "Mira" : "Izzy";
}

export function girlShort(id: GirlId) {
  return id === "victoria" ? "Vicky" : id === "ronnie" ? "Ronnie" : id === "mira" ? "Mira" : "Izzy";
}

export function speakerRole(id: GirlId): GirlId {
  return id;
}

export function herHome(id: GirlId): LocationId {
  return id === "victoria" ? "vickyLiving" : id === "ronnie" ? "ronnieDorm" : id === "mira" ? "miraDorm" : "dorm";
}

export function isPrivatePlace(id: LocationId | null | undefined) {
  return Boolean(id && PRIVATE.has(id));
}

export function ownsHome(id: LocationId): GirlId | null {
  if (id === "dorm") return "izzy";
  if (id === "vickyLiving" || id === "vickyBedroom") return "victoria";
  if (id === "ronnieDorm") return "ronnie";
  if (id === "miraDorm") return "mira";
  return null;
}

export function girlIsOfficial(state: Pick<GameState, "focus" | "flags" | "bond" | "roster">, girl: GirlId) {
  if (state.roster?.[girl]?.romanceAccepted) return true;
  if (state.focus === girl && (state.flags.romanceAccepted || state.bond === "romantic")) return true;
  return false;
}

export function affinity(girl: GirlId, place: LocationId) {
  return AFFINITY[place]?.[girl] ?? 20;
}

export function blankCard(outfit: OutfitId = "casual"): GirlCard {
  return {
    met: false,
    trust: 0,
    bonding: 0,
    bond: "stranger",
    romanceOffered: false,
    romanceAccepted: false,
    knowsAboutSpray: false,
    scentInterest: false,
    dates: 0,
    dateSpots: [],
    expression: "idle",
    outfit,
    glandCap: 0,
    glandShots: 0,
    turnsSinceIntimateSpray: 0,
    glandDry: 0,
    fartDebt: 0,
    fedStops: [],
  };
}

export function blankRoster(): Roster {
  return {
    izzy: blankCard("casual"),
    victoria: blankCard("work"),
    ronnie: blankCard("casual"),
    mira: blankCard("casual"),
  };
}

export function initialCast(focus: GirlId = "izzy") {
  const roster = blankRoster();
  roster[focus] = {
    ...roster[focus],
    met: true,
    trust: 6,
    bonding: 4,
    expression: focus === "victoria" ? "shy" : focus === "ronnie" ? "happy" : focus === "mira" ? "idle" : "embarrassed",
  };
  return {
    relationshipType: "mono" as RelationshipType,
    focus,
    present: [focus] as GirlId[],
    roster,
    planGirl: focus,
    morningDetour: false,
    queuedMeet: null as QueuedMeet | null,
    meetKind: "plan" as const,
    partner: null as GirlId | null,
    affairKnown: false,
  };
}

/** First-meeting odds per start location, in percent (design table, not derived from affinity). */
export const START_ODDS: Partial<Record<LocationId, Record<GirlId, number>>> = {
  library: { izzy: 40, victoria: 20, ronnie: 20, mira: 20 },
  studyHall: { izzy: 40, victoria: 10, ronnie: 20, mira: 30 },
  trail: { izzy: 40, victoria: 10, ronnie: 40, mira: 10 },
  animeStore: { izzy: 50, victoria: 10, ronnie: 15, mira: 25 },
  craftStore: { izzy: 15, victoria: 45, ronnie: 25, mira: 15 },
  gym: { izzy: 5, victoria: 10, ronnie: 60, mira: 25 },
};

function startWeights(place: LocationId): number[] {
  const table = START_ODDS[place];
  return GIRLS.map((girl) => (table ? table[girl] : affinity(girl, place)));
}

/** Who you meet first at a place: START_ODDS for start locations, affinity elsewhere. `roll` is 0..1 (tests pass one). */
export function rollGirl(place: LocationId, roll = Math.random()): GirlId {
  const weights = startWeights(place);
  const total = Math.max(1, weights.reduce((sum, w) => sum + w, 0));
  let pick = roll * total;
  for (let i = 0; i < GIRLS.length; i++) {
    pick -= weights[i]!;
    if (pick < 0) return GIRLS[i]!;
  }
  return GIRLS[GIRLS.length - 1]!;
}

export function meetOdds(place: LocationId): Record<GirlId, number> {
  const w = startWeights(place);
  const total = Math.max(1, w.reduce((sum, x) => sum + x, 0));
  const out = {} as Record<GirlId, number>;
  GIRLS.forEach((girl, i) => {
    out[girl] = w[i]! / total;
  });
  return out;
}

export function morningSpots(other: GirlId, avoid: LocationId | null): LocationId[] {
  const mine = otherGirl(other);
  return (Object.keys(AFFINITY) as LocationId[])
    .filter((id) => {
      if (id === avoid || PRIVATE.has(id)) return false;
      const o = affinity(other, id);
      const m = affinity(mine, id);
      return o >= 68 && o + 8 >= m;
    })
    .sort((a, b) => affinity(other, b) - affinity(other, a))
    .slice(0, 6);
}

export function companionChance(focus: GirlId, place: LocationId, other: GirlId = otherGirl(focus)) {
  if (PRIVATE.has(place)) return 0;
  const theirs = affinity(other, place);
  const mine = affinity(focus, place);
  if (theirs < 68) return 0;
  let p = theirs >= 88 ? 0.46 : 0.28;
  if (theirs > mine + 18) p += 0.1;
  return Math.min(0.58, p);
}

export function timeRank(time: TimeOfDay) {
  if (time === "Morning") return 0;
  if (time === "Afternoon") return 1;
  if (time === "Evening") return 2;
  return 3;
}

export function reachedTime(now: TimeOfDay, target: TimeOfDay) {
  return timeRank(now) >= timeRank(target);
}

export function laterSlot(time: TimeOfDay): { time: TimeOfDay; nextDay: boolean } {
  if (time === "Morning" || time === "Afternoon") return { time: "Evening", nextDay: false };
  if (time === "Evening") return { time: "Night", nextDay: false };
  return { time: "Morning", nextDay: true };
}

export function suitedPlace(girl: GirlId, avoid: LocationId | null): LocationId {
  const ranked = (Object.keys(AFFINITY) as LocationId[])
    .filter((id) => id !== avoid && !PRIVATE.has(id))
    .sort((a, b) => affinity(girl, b) - affinity(girl, a));
  return ranked[0] ?? "library";
}

export function withGirl(state: GameState, girl: GirlId, patch: Partial<GirlCard>): Roster {
  const roster = state.roster ?? blankRoster();
  return {
    ...roster,
    [girl]: { ...roster[girl], ...patch },
  };
}

export function pushFocus(state: GameState): GameState {
  const focus = state.focus ?? "izzy";
  const roster = state.roster ?? blankRoster();
  const prev = roster[focus] ?? blankCard();
  return {
    ...state,
    focus,
    roster: {
      ...roster,
      [focus]: {
        ...prev,
        met: true,
        trust: state.trust,
        bonding: state.bonding,
        bond: state.bond,
        romanceOffered: state.flags.romanceOffered,
        romanceAccepted: state.flags.romanceAccepted,
        knowsAboutSpray: state.flags.knowsAboutSpray,
        scentInterest: state.flags.scentInterest,
        dates: state.dates ?? 0,
        dateSpots: state.dateSpots ?? [],
        expression: state.expression,
        outfit: state.outfit,
        glandCap: state.glandCap ?? 0,
        glandShots: state.glandShots ?? 0,
        turnsSinceIntimateSpray: state.turnsSinceIntimateSpray ?? 0,
        glandDry: state.glandDry ?? 0,
      },
    },
  };
}

export function pullFocus(state: GameState, girl: GirlId): GameState {
  const synced = pushFocus(state);
  const card = synced.roster[girl] ?? blankCard();
  return {
    ...synced,
    focus: girl,
    trust: card.trust,
    bonding: card.bonding,
    bond: card.bond,
    dates: card.dates,
    dateSpots: card.dateSpots,
    expression: card.expression,
    outfit: card.outfit,
    glandCap: card.glandCap ?? 0,
    glandShots: card.glandShots ?? 0,
    turnsSinceIntimateSpray: card.turnsSinceIntimateSpray ?? 0,
    glandDry: card.glandDry ?? 0,
    present: synced.present?.length ? synced.present : [girl],
    flags: {
      ...synced.flags,
      romanceOffered: card.romanceOffered,
      romanceAccepted: card.romanceAccepted,
      knowsAboutSpray: card.knowsAboutSpray,
      scentInterest: card.scentInterest,
    },
  };
}

export function cardCouple(card: GirlCard | undefined) {
  return Boolean(card && (card.romanceAccepted || card.bond === "romantic"));
}

export function romanceBlocked(state: Pick<GameState, "focus" | "relationshipType" | "roster" | "gameMode">, trust: number, bonding: number, dates: number) {
  const focus = state.focus ?? "izzy";
  if ((state.relationshipType ?? "mono") === "mono") {
    // Monogamy: anyone else official blocks this one.
    if (GIRLS.some((girl) => girl !== focus && state.roster?.[girl]?.romanceAccepted)) return true;
  }
  if (focus === "victoria") {
    const need = state.relationshipType === "harem" ? 82 : 72;
    if (trust < 100 || bonding < need) return true;
    if (state.gameMode === "slow" && dates < 3) return true;
  }
  if (focus === "mira") {
    if (trust < 90 || bonding < 90) return true;
    if (state.gameMode === "slow" && dates < 3) return true;
  }
  return false;
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export function oneGreeting(first: string, second: string) {
  return [first.trim(), second.trim()].filter(Boolean).join(" ");
}

export function victoriaOpening(place: LocationId): { narrator: string; first: string; second: string } {
  const named: Partial<Record<LocationId, { narrator: string; first: string; second: string }[]>> = {
    library: [
      {
        narrator:
          "The design shelves are quieter than the rest of the library. A tall, mature skunk-neko woman in a tan blouse and a black pencil skirt is standing very still, glasses tipped down, one hand over her mouth. A heavy, expensive musk hangs in the aisle. She thought she was alone.",
        first:
          "Oh. That was unprofessional, and it was mine. I'm Victoria. Most people at the office call me Vicky. You can keep walking. Please don't make a scene — I already have.",
        second: "I come here for the design books. Sit if you're staying. Quietly. I can be civil if you can.",
      },
      {
        narrator:
          "A design monograph is open on the table and a tall skunk-neko woman has one hand flat on it, as if she can hold the smell down with the page. Tan blouse, pencil skirt, glasses. She looks up and does not smile yet.",
        first:
          "You're early for a conversation I wasn't having. I'm Victoria. The musk is mine. The book is not an excuse. Don't point.",
        second: "If you need this aisle, take the other end. I'll finish the chapter and pretend we both have manners.",
      },
      {
        narrator:
          "She has her phone face-down and her tail tucked against the chair leg. The library's dust can't cover what just happened. A mature skunk-neko in office clothes meets your eyes like she is closing a meeting.",
        first:
          "I was on a call. Then I wasn't. I'm Victoria. If you heard that, you can forget it. If you smelled it, forgetting will take longer.",
        second: "Sit if you came for the shelves. I don't need a witness, and I don't need a speech.",
      },
      {
        narrator:
          "The tall woman at the end of the design row straightens her glasses, smooths her skirt, and still cannot smooth the air. Skunk, under perfume. She has already decided how this introduction will go.",
        first:
          "Hello. Victoria. Vicky, if we're going to be stuck in the same aisle. I let one go. I'd rather say it than watch you guess.",
        second: "You can stay. Quietly. I was having a decent afternoon before my own body filed a complaint.",
      },
    ],
    craftStore: [
      {
        narrator:
          "The craft store smells like dried flowers and hot glue until a richer, skunky note cuts through it. A tall skunk-neko woman in office clothes is comparing two bolts of floral fabric. Her ears flick when she notices you. The scent is not the store's.",
        first:
          "Florals are this side, if that's what you came for. The other smell is me. I'm Victoria. I'd rather you heard that from me.",
        second: "I usually hold it until the car. Today the car was too far. You can stay. Just don't point.",
      },
      {
        narrator:
          "A wreath display half-hides a mature skunk-neko in a pencil skirt. She is holding a spool of ribbon like it might explain the musk in the aisle. It does not. She sees you and lifts her chin.",
        first:
          "Monday was supposed to be empty. It isn't. I'm Victoria. That wasn't potpourri. I'll be done with this ribbon in a minute.",
        second: "Shop if you came to shop. I'll keep the tail in. That's the best I can offer in a craft store.",
      },
      {
        narrator:
          "She is comparing picture frames with the focus of someone who does this for a living and is annoyed she has to do it while fragrant. Glasses, blouse, a skunk tail she keeps trying to park behind her calves.",
        first:
          "The gold one is a lie. It photographs warm and hangs cheap. I'm Victoria. The smell walked in with me. Ignore it or leave. Both are allowed.",
        second: "If you're buying a gift, say who it's for. I can be useful. I would like to be useful instead of explained.",
      },
      {
        narrator:
          "Hot glue and dried orange peel, and under that a thick skunk musk. The woman in office clothes has stopped in the fabric aisle with her eyes closed, one second too long. She opens them when your shoes hit the tile.",
        first:
          "Don't. I know. I'm Victoria. I held it through a meeting and lost the argument in aisle four. You can pretend you needed wreaths.",
        second: "I'll move to the far end. You take this one. That's fair.",
      },
    ],
    animeStore: [
      {
        narrator:
          "Neko Shelf is loud with plastic and posters. The woman by the gift wall does not look like she belongs here: blouse, pencil skirt, glasses, a skunk tail she is trying to keep close to her calves. She is reading the back of a box like it is a contract.",
        first:
          "I'm buying a gift. For my daughter. She is twenty, and she likes this sort of thing, and I am out of my depth. I'm Victoria.",
        second: "If you work here, the figure on the end is the one she circled. If you don't, I'll be done in a minute.",
      },
      {
        narrator:
          "A mature skunk-neko in office clothes is scrolling a notes app in front of a wall of boxes, tail tucked, perfume losing. She clocks you and puts the phone away like you walked into her office.",
        first:
          "I have a list. I do not have a translator. I'm Victoria. The smell is mine, not the store's. My daughter sent me. She is twenty. This is not my aisle.",
        second: "If you know which of these isn't a waste of money, say so. If you came to stare, don't.",
      },
      {
        narrator:
          "She has the wrong box in her hands and she knows it. Blouse, heels, a skunk tail knocking a poster. The musk got there before the apology. She sets the box down with care.",
        first:
          "That one isn't even on the list. And that smell is me. Victoria. I came in for a gift and my body decided to introduce me first.",
        second: "Give me a minute. I'll get the right one and get out of your way.",
      },
      {
        narrator:
          "The gift wall has a tall skunk-neko woman who looks one question away from asking a clerk and refusing to. She straightens her glasses. The air around her is not plastic.",
        first:
          "Hello. I'm Victoria. I don't shop here. My daughter does. If you smelled something on the way in, it was me, and I'd rather we not make it a topic.",
        second: "Point me at something a twenty-year-old would actually want, or let me suffer in peace. Those are the options.",
      },
    ],
    trail: [
      {
        narrator:
          "Off the path, under the pines, a tall skunk-neko woman in heels that were a mistake has her phone lowered and her tail half-raised. The air is thick and musky, the kind that has been saved up all day. She startles when a twig snaps.",
        first:
          "Don't come closer for a second. Please. I thought the woods were empty. I'm Victoria. I walk here when the office is too much.",
        second: "I spend all day making sure nobody at work has to smell me. Out here I stop pretending. You picked a bad minute. Or a honest one.",
      },
      {
        narrator:
          "A car door is still open on the lot behind her. She made it ten steps into the trees before she let the day go. Mature, office clothes, skunk tail high, then dropped when she hears you.",
        first:
          "Stay on the path. I'm Victoria. I drove out here so I could stop holding it. You beat me to the clearing. That's unfortunate for both of us.",
        second: "Give me a minute and the trail is yours. I don't need company for this part.",
      },
      {
        narrator:
          "She is already turning back toward the lot, phone in hand, when the musk catches up with her. Heels, blouse, a tail she can't hide in pine shade. She sees you and stops like a meeting just started.",
        first:
          "I was leaving. Now I'm introducing myself. Victoria. The air is mine. I come here after work. I did not post a sign.",
        second: "If you keep walking, walk. If you're going to say something clever, save it. I've had a day.",
      },
      {
        narrator:
          "The ridge loop smells like damp bark and a thick, saved-up skunk musk. A tall woman in clothes that do not belong on a trail has one hand out, palm first, asking for distance before she asks for a name.",
        first:
          "Don't come closer yet. I'm Victoria. I let it go because I thought I was alone. I was wrong. You can still turn around.",
        second: "I'll be civil in a minute. Right now I need the wind, not an audience.",
      },
    ],
    studyHall: [
      {
        narrator:
          "A green lamp, a stack of interior-design manuals, and a woman who is clearly not a student. Pencil skirt, glasses, skunk ears she stopped hiding. She presses her knees together and will not look up from the page.",
        first:
          "If that was audible, I apologize. I am studying for a promotion, not performing. Victoria. You can sit. Quietly.",
        second: "Two chapters left. I would like to finish them without a conversation about what I am. That's the plan.",
      },
      {
        narrator:
          "She has claimed the corner table the way some people claim a conference room. Manuals squared, glasses on, a musk the green lamp cannot explain. She looks up once, decides you are not a threat, and speaks.",
        first:
          "This table is taken. I'm Victoria. If you need a seat, the next one is free, and it smells more like a library.",
        second: "I'm reading for a promotion. You can stay in the room. You cannot turn it into a conversation about my tail.",
      },
      {
        narrator:
          "Notes for a presentation are spread in a neat fan. The woman who made them — mature, skunk-eared, office clothes — has just gone still. The air says why. She closes one folder before she looks at you.",
        first:
          "That was me. Victoria. I have a presentation in the morning and a body that does not care. Sit down or don't. Don't narrate it.",
        second: "I can share the table if you can be quiet. I am not sharing an explanation.",
      },
      {
        narrator:
          "She looks like faculty until the tail gives her away, curled tight around the chair. A heavy musk sits under the lamp. She takes her glasses off, then puts them back on, buying a second.",
        first:
          "Hello. I'm Victoria. I booked this hour to study, not to meet anyone. The smell arrived anyway. You can pretend it didn't.",
        second: "If you're staying, keep your voice down. I still have a chapter, and I still have a title I'm trying to earn.",
      },
    ],
    furniture: [
      {
        narrator:
          "The showroom is a row of perfect little rooms. In one of them, a mature skunk-neko woman is measuring a loveseat with her hands, tail curled neatly aside. She smells like perfume laid over something much stronger.",
        first:
          "The proportions on this one are a lie. It looks generous and sits small. I'm Victoria. I do this for work, and then I do it again because I like it.",
        second: "You don't have to hover. If you want an opinion, ask. If you want to comment on the tail, don't.",
      },
      {
        narrator:
          "She is standing in a staged living room like she owns the building and is disappointed in it. Blouse, skirt, glasses, a skunk tail she has aimed away from the upholstery. The perfume fails at the second breath.",
        first:
          "Don't sit yet. The cushion is for the photograph, not for you. I'm Victoria. The other smell is me. I was hoping the showroom would be louder.",
        second: "If you're shopping, I can tell you what will still look right in a year. If you're not, keep walking. I'll survive.",
      },
      {
        narrator:
          "A mature skunk-neko has just stood up from a display loveseat a little too quickly. The musk she left in the cushions is obvious. She smooths her skirt and meets you anyway.",
        first:
          "I sat down. That was a mistake. I'm Victoria. I measure rooms for a living and I still forget I bring my own atmosphere.",
        second: "Give that one a minute before you try it. I'll be at the lamps, pretending this was professional.",
      },
      {
        narrator:
          "Tape measure, notebook, heels. She is working, or she was, until you rounded the sofa and the air explained her first. She doesn't flinch. She just gets exact.",
        first:
          "Victoria. I'm on the clock, more or less. If you smelled me before you saw me, that's honest. I'd rather lead with the name.",
        second: "Ask me about the layout if you want a conversation. Ask me about the tail and we're done.",
      },
    ],
    italian: [
      {
        narrator:
          "White cloth, low light, a table set for one. The woman in the corner has taken her glasses off to read the menu. Black hair in a high tail, skunk ears, a blouse buttoned one notch lower than the office would like. She notices you before the waiter does.",
        first:
          "If they sat you here, the kitchen draft is usually worse than I am. I'm Victoria. Long week. You can say hello. Don't do it like you've discovered me.",
        second: "I eat alone when the day has been loud. Sit if you want. I already ordered enough for a person who pretends they aren't hungry.",
      },
      {
        narrator:
          "She has a glass of wine and the corner booth, and she clocked you at the door. Mature, office clothes loosened by one button, a skunk tail along the seat. The musk is warm and close.",
        first:
          "You're hovering. Sit or let them seat someone who will. I'm Victoria. Yes, that's me you smell. The wine is not covering it. I stopped expecting it to.",
        second: "Long day. I can be decent company if you can be an adult about it.",
      },
      {
        narrator:
          "The corner table was supposed to be private. A tall skunk-neko woman looks up from a menu she has already decided on. Glasses in one hand. She is not embarrassed enough to leave, and not relaxed enough to pretend.",
        first:
          "I had this table. Now I have company. Victoria. If the smell beat me to you, I'm sorry, once. I don't do it twice.",
        second: "You can join me. Or you can ask them for a table by the window. I won't be wounded. I'll be eating.",
      },
      {
        narrator:
          "Low light, white cloth, and a woman who looks like she came from an office and refused to go home yet. Skunk ears, high tail of hair, a real tail she has tried to keep off the aisle. She speaks before you can make it awkward.",
        first:
          "Hello. I'm Victoria. Don't do the little pause where you decide whether to mention it. I already know. Sit down if you're hungry.",
        second: "I ordered like I might not be alone. That was optimism or habit. You can tell me which after the bread.",
      },
    ],
    gym: [
      {
        narrator:
          "The campus gym smells like rubber and iron until a richer note cuts through it. A tall skunk-neko woman in a tan blouse and pencil skirt is at the water fountain, glasses on, not dressed for a set. She does not pretend the musk is the chalk.",
        first:
          "I walked through the wrong door. I'm Victoria. I wanted the design studio and I found barbells. The smell is mine. Don't make it a tour.",
        second: "If you know the hallway that gets me out without a second lap, say so. I'll be by the fountain, overdressed.",
      },
      {
        narrator:
          "She has a portfolio under one arm and heels that do not belong on a rubber floor. Office clothes, a skunk tail kept off the mats. The musk got here before she decided what to do with her face.",
        first:
          "Don't. I know. Victoria. I cut across the gym because the quad was a crowd. My body filed a complaint in the doorway. You can keep lifting.",
        second: "I'll be gone in a minute. Don't point, and don't offer me a spot. I am not here for the bar.",
      },
      {
        narrator:
          "Between the racks, a woman who just left a client meeting is losing an argument with her phone. Blouse, skirt, glasses. The air behind her is skunk. She looks up like you opened a door she meant to keep shut.",
        first:
          "Hello. Victoria. Vicky, if we are going to share a weight room I did not mean to enter. I let one go. I'd rather say it than watch you guess at the mats.",
        second: "Take the bench. I'll take the door. That's as fair as these shoes get.",
      },
    ],
  };
  const fallback = [
    {
      narrator: `You weren't expecting her. A tall skunk-neko woman in a tan blouse and black skirt is already here, glasses on, tail held carefully. The air around her is perfumed, and under that, skunk. She meets your eyes and does not run.`,
      first: "Hello. I'm Victoria. The smell got here first, so I'll go second. I can be civil if you can. That's the offer.",
      second: "Sit if you're staying. Don't point, and don't make me repeat myself.",
    },
    {
      narrator: `A mature skunk-neko in office clothes clocks you and straightens her glasses, buying one second. Perfume, then musk. She does not smile yet. She does not leave.`,
      first: "Victoria. Most people say Vicky once they survive the first minute. The scent is mine. I'd rather name it than watch you work up to it.",
      second: "You can stay. You can also keep walking. Decide, and then do it.",
    },
    {
      narrator: `She was on her way out. Heels, blouse, a tail she tucks as the door opens and you are suddenly in her air. She stops, recalculates, and introduces herself like it was on the schedule.`,
      first: "I was leaving. Now I'm not. I'm Victoria. If you followed the smell, say so. If you didn't, hello anyway.",
      second: "Don't hover in the doorway. In or out. I don't like a half-finished entrance.",
    },
    {
      narrator: `The room already had her in it: tall, glasses, pencil skirt, a skunk tail held with office discipline. She looks at you the way she looks at a meeting that started early.`,
      first: "We haven't met. I'm Victoria. That isn't the room. That's me. I can be pleasant if you can be discreet.",
      second: "Sit if you meant to be here. I'll pretend this is normal until it is.",
    },
  ];
  const pool = named[place] ?? fallback;
  return pickOne(pool);
}

export function victoriaDropIn(placeName: string): { narrator: string; line: string } {
  return pickOne([
    {
      narrator: `${placeName}. You were looking for her, and the scent gets there first. Victoria is already here, office clothes, tail held tight, not expecting to be found.`,
      line: "Oh. Hello. I don't think we've met. I'm Victoria. If you followed the smell, I'd rather you said so than hovered.",
    },
    {
      narrator: `${placeName}. A tall skunk-neko in a blouse and pencil skirt looks up from whatever she was finishing. The musk arrived a step before she did.`,
      line: "You found me. Victoria. Most people land on Vicky. Don't stand there deciding what to do with your face.",
    },
    {
      narrator: `${placeName}. She clocks you, straightens her glasses, and does not pretend the air is innocent.`,
      line: "We haven't met. I'm Victoria. Yes, that's me. Sit if you came to talk. Hover if you came to leave.",
    },
    {
      narrator: `${placeName}. She was mid-step, tail tucked, and now she has an audience she didn't schedule.`,
      line: "Hello. Victoria. I was on my way somewhere quieter. You got here first. We can be civil, or you can let me pass.",
    },
  ]);
}

export function seedMeeting(
  state: GameState,
  place: LocationId,
  relationshipType: RelationshipType,
  roll = Math.random(),
): GameState {
  const girl = rollGirl(place, roll);
  const roster = blankRoster();
  roster[girl] = {
    ...roster[girl],
    met: true,
    trust: 6,
    bonding: 4,
    expression: girl === "victoria" ? "shy" : girl === "ronnie" || girl === "mira" ? "idle" : "embarrassed",
    outfit: girl === "victoria" ? "work" : girl === "ronnie" || girl === "mira" ? "casual" : state.outfit,
  };
  if (girl === "izzy") {
    roster.izzy = { ...roster.izzy, trust: state.trust, bonding: state.bonding, expression: state.expression, outfit: state.outfit };
    return {
      ...state,
      relationshipType,
      focus: "izzy",
      present: ["izzy"],
      roster,
      planGirl: "izzy",
      morningDetour: false,
      queuedMeet: null,
      meetKind: "plan",
      partner: null,
      affairKnown: false,
    };
  }
  const lines = girl === "ronnie" ? ronnieOpening(place) : girl === "mira" ? miraOpening(place) : victoriaOpening(place);
  const messages: GameState["messages"] = [
    { id: uid(), role: "narrator", at: Date.now(), text: lines.narrator },
    {
      id: uid(),
      role: girl,
      at: Date.now() + 1,
      expression: girl === "ronnie" ? "happy" : girl === "mira" ? "idle" : "embarrassed",
      text: oneGreeting(lines.first, lines.second),
    },
  ];
  return {
    ...state,
    relationshipType,
    focus: girl,
    present: [girl],
    roster,
    planGirl: girl,
    morningDetour: false,
    queuedMeet: null,
    meetKind: "plan",
    partner: null,
    affairKnown: false,
    trust: 6,
    bonding: 4,
    bond: "stranger",
    outfit: girl === "ronnie" || girl === "mira" ? "casual" : "work",
    expression: girl === "ronnie" || girl === "mira" ? "idle" : "shy",
    izzyHere: true,
    messages,
  };
}

/** First-meet lines for Mira. Kuudere, idol set, one skunk tail. */
export function miraOpening(place: LocationId): { narrator: string; first: string; second: string } {
  const named: Partial<Record<LocationId, { narrator: string; first: string; second: string }[]>> = {
    library: [
      {
        narrator:
          "The biography aisle. A slender skunkgirl in a black beret, plaid crop, and pleated skirt is reading a pop-star life like it is a contract. Crimson streaks, one black tail with a broad white stripe. She does not look up until the page is finished.",
        first: "Mira. I'm not signing anything, and I'm not doing a photo. If you need the chair, there are others.",
        second: "Pop biographies. I'm comparing how they picked a name. Mine isn't ready. Don't suggest one.",
      },
      {
        narrator:
          "She has three biographies open and none of them are for class. Beret, plaid, one skunk tail laid along the chair so it doesn't knock the stack. She notices you on the second look, not the first.",
        first: "Mira. If you need a recommendation, I don't do those out loud. The quiet aisle is that way.",
        second: "I'm working. Not on a paper. On a problem. You can sit if you can be furniture.",
      },
      {
        narrator:
          "A slender skunkgirl turns a page with one finger and keeps the other hand on her beret, like the library might try to take it. Plaid skirt, striped socks, tail low. The musk is small and she does not apologize for it.",
        first: "You're in my light. Mira. Step left. The book isn't a conversation.",
        second: "If you came to ask what I'm reading, it's a life I haven't earned yet. That's all you get.",
      },
    ],
    studyHall: [
      {
        narrator:
          "A green lamp, a closed textbook, and a skunkgirl in the idol outfit deciding whether the textbook deserves to be open. Beret, arm tassels, striped socks. Her tail rests along the chair instead of up.",
        first: "Mira. Performing arts. This is the part where I decide which class is worth my morning. You can sit. Quietly.",
        second: "If you came to talk about a stage name, I don't have one. That's the whole problem.",
      },
      {
        narrator:
          "Study hall, back row. She has earbuds in and a notebook that is not notes. Plaid, beret, one tail kept off the aisle. She pulls one bud when your chair moves.",
        first: "Mira. I'm not studying. I'm counting. Don't ask what. The lamp isn't an invitation.",
        second: "If this table is yours, say so. If it isn't, sit and don't fill the quiet.",
      },
      {
        narrator:
          "She is the stillest person under the lamps. Idol skirt, combat boots that don't match the room, a skunk tail that flicks once and stops. She looks at you like attendance.",
        first: "You're late for a class I'm not teaching. Mira. Sit or keep walking. Both are quiet options.",
        second: "I skipped the part where I pretend to want help. I don't. The chair is free. That's it.",
      },
    ],
    trail: [
      {
        narrator:
          "The Nature Trail is a strange place for a beret and combat boots. She's on the path anyway, phone lowered, one fluffy skunk tail held so it doesn't drag. She looks mildly offended by the dirt.",
        first: "Mira. I took a wrong turn out of a shot. Don't film me. This is not the content.",
        second: "If you're going back toward campus, walk. I'm not staying out here to become a nature documentary.",
      },
      {
        narrator:
          "Pine shade, and a skunkgirl who dressed for a stage and got a path. Plaid skirt, beret, tail carried high enough to clear the mud. She stops when she sees you and does not smile.",
        first: "Don't say it's pretty. Mira. I know what a trail is. I don't need a guide, and I don't need a photo.",
        second: "I'm walking back. You can be ahead of me or behind me. Not beside me explaining birds.",
      },
      {
        narrator:
          "She is standing on the boards like the woods booked her without asking. One black tail, white stripe, boots that have already lost. The musk is faint and she looks annoyed that the air noticed.",
        first: "Mira. This was supposed to be a shortcut to somewhere with a floor. It isn't. Keep your voice down. The trees aren't an audience.",
        second: "If you know the way that isn't uphill, use fewer words than that sentence.",
      },
    ],
    animeStore: [
      {
        narrator:
          "Neko Shelf. A skunkgirl in plaid and a beret is comparing idol albums, ears through the hat, tail out from the skirt. She holds a figure box like she is grading it.",
        first: "Mira. If you're here for the loud boxes, they're that way. I'm looking at the ones that actually charted.",
        second: "Don't recommend me a group. I already know which ones are doing it right.",
      },
      {
        narrator:
          "She has an album facedown so the price doesn't show, and a look that says she already decided. Beret, tassels, one skunk tail clear of the spinner rack.",
        first: "Mira. I'm not staff. If you need a recommendation, read the back. I came for one thing and I found it.",
        second: "You can stand there. Don't narrate the outfit. I can hear you thinking it.",
      },
      {
        narrator:
          "The new-release wall. She checks a tracklist the way other people check a contract, then notices you in the reflection of the case. Plaid, crimson streaks, tail low.",
        first: "You're in the glass. Mira. Move. I'm not a meet-and-greet, and this isn't a signing.",
        second: "If you know this group, don't quiz me. If you don't, the shelf will survive without either of us talking.",
      },
    ],
    craftStore: [
      {
        narrator:
          "Hearth & Hobby. She looks like she wandered into the wrong aisle on purpose and is now committed. Plaid skirt, ring-light complexion, one skunk tail kept clear of the ribbon spools.",
        first: "Mira. I'm not a regular. I wanted a trim for a costume and the internet lied about the aisle.",
        second: "If you know where the black ribbon is, say so. If you don't, I'm still looking.",
      },
      {
        narrator:
          "Dried flowers, hot glue, and a skunkgirl who is treating a bolt of black fabric like a mistake she intends to finish. Beret on, tail off the table.",
        first: "Don't help unless you were asked. Mira. I can read a label. I just don't like what it says.",
        second: "Costume trim. Not a hobby. If you're shopping for a wreath, that's the other side of me.",
      },
      {
        narrator:
          "She holds a card of buttons up to the light and rejects it without a change of face. Plaid crop, pleated skirt, one hooded-skunk tail. The craft store did not get a smile.",
        first: "Mira. Wrong size. Wrong color. I'm still here because leaving empty looks like I didn't try.",
        second: "If you work here, black, narrow, matte. If you don't, you can walk. I'm not lost. I'm annoyed.",
      },
    ],
    gym: [
      {
        narrator:
          "The campus gym, mirror wall. A slender skunkgirl in the idol outfit has her phone on a low tripod and is not lifting anything. She checks the frame, notices you in it, and does not smile.",
        first: "Mira. You're in the shot. Step left. This isn't a collab.",
        second: "It's a clip. That's all you need to know. The gym is a background.",
      },
      {
        narrator:
          "She is using the mirror, not the bar. Beret off for once, hair down, plaid still on, one tail held so it reads in the glass. She sees you enter the reflection and waits.",
        first: "Don't walk through. Mira. I need the mirror for ten seconds. You can have it when the phone is down.",
        second: "I'm not training. I'm checking a line. If you came to lift, the racks are behind you.",
      },
      {
        narrator:
          "Afternoon, almost empty. A skunkgirl in the idol set stands on a mat like it is a mark, phone lowered, tail still. The rubber smell doesn't cover her. She isn't embarrassed. She's busy.",
        first: "Mira. Count's off. Don't talk over it. I'll be a person again in a minute.",
        second: "If you want the mat, wait. If you want a conversation, it isn't this one.",
      },
    ],
  };
  const fallback = [
    {
      narrator:
        "A slender skunkgirl in a black beret and a red plaid set turns just enough to see who stopped. Long black hair, crimson streaks, one hooded-skunk tail. She looks at you the way a headliner looks at a cue she didn't ask for.",
      first: "Mira. If you know me, you know the accounts. If you don't, this is the in-person version, and it is less patient.",
      second: "You can talk. Don't waste it on a compliment I can get from a comment section.",
    },
    {
      narrator:
        "She was already in the room. Beret, plaid, one tail kept clear of whatever she was standing next to. She finishes a thought before she spends one on you.",
      first: "Mira. I didn't ask for an entrance. If you have a reason, use it. If you don't, the door still works.",
      second: "I'm not performing. That's later. This is just me, and I'm busy.",
    },
    {
      narrator:
        "Crimson streaks, combat boots, a skunk tail that doesn't match the polite version of the room. She looks at you once, the way she looks at a cue she might ignore.",
      first: "You're staring. Mira. Blink or talk. I don't do the third thing, where you wait for me to carry it.",
      second: "If this is about a show, I don't have a name for it yet. Don't help.",
    },
  ];
  return pickOne(named[place] ?? fallback);
}

export function miraDropIn(placeName: string): { narrator: string; line: string } {
  return pickOne([
    {
      narrator: `${placeName}. A skunkgirl in the idol beret is already here, tail low, checking her reflection in something that isn't a mirror.`,
      line: "Mira. I was here first. Don't make it a scene unless you can carry one.",
    },
    {
      narrator: `${placeName}. She clocks you, adjusts a tassel, and does not pretend she was waiting.`,
      line: "Hm. Mira. If this is about a dance class, Second Wind has a schedule. If it isn't, talk.",
    },
  ]);
}

/** First-meet lines for Ronnie. Written for the activation; the doc has none. Rainbow Dash + Kim Possible. */
export function ronnieOpening(place: LocationId): { narrator: string; first: string; second: string } {
  const named: Partial<Record<LocationId, { narrator: string; first: string; second: string }[]>> = {
    gym: [
      {
        narrator:
          "The free-weight corner. A blonde skunkgirl in a white track top and blue trunks racks a barbell that has no business being that heavy, ponytail swinging, black-and-white tail up and loose. The air behind her is unmistakably skunk. She grins at you in the mirror like she heard you think about it.",
        first: "Yeah, that was me. Leg day does that. I'm Ronnie. Veronica if you're my professor, Ronnie if you're cool.",
        second: "You lifting, or just spotting the view? Either way, grab a bench. I've got two more sets and I don't do them slow.",
      },
      {
        narrator:
          "Someone is doing barbell squats like the floor owes her money. Skunk ears, blonde ponytail, smartwatch blinking. Between reps she lets one rip, loud, and doesn't even break form.",
        first: "Ha! Personal best on that one too. Relax, it's just my body working. Protein and fiber, baby. I'm Ronnie.",
        second: "New here? I can show you the racks. Fair warning, I'm going to make it a competition.",
      },
      {
        narrator:
          "The rack by the mirrors is hers for the moment. Blonde ponytail, white track top, blue trunks, smartwatch going. She finishes a set, lets one go without looking sorry, and grins when she catches you in the glass.",
        first: "Hey. Ronnie. That was the set, not the greeting. The greeting is: you new, or you just bad at pretending you didn't hear that?",
        second: "Plates are free. If you need a spot I'll do it, but I'm gonna count out loud and I'm gonna win.",
      },
    ],
    field: [
      {
        narrator:
          "West Field. A blonde skunkgirl finishes a lap so fast the track should file a complaint, slows to a jog, and lands next to you hands on hips, tail flicking. A faint musk catches up a second later.",
        first: "Hey! You were timing me, right? Tell me that was under seventy. I'm Ronnie. Track team.",
        second: "If you're running, I'll pace you. If you're not, you can hold my water and tell me I'm amazing.",
      },
      {
        narrator:
          "West Field, lane three. A blonde skunkgirl in a white track top and blue trunks is shaking out her hands like the race already happened. Tail high. She spots you on the grass and jogs over, musk a step behind.",
        first: "You the timer or the audience? I'm Ronnie. Either way, don't stand in lane four. I drift.",
        second: "Warm-up fart. That's a technical term. You can stay on the infield if you can handle a winner.",
      },
      {
        narrator:
          "The track is mostly empty. She is not. Ponytail, smartwatch, athletic kit, a skunk tail that flags every time she changes direction. She pulls up in front of you, breathing easy, grinning easier.",
        first: "Ronnie. You're on my cooldown lap, which means you get the charming version. The smell is also the charming version.",
        second: "If you run, I'll give you a pace. If you don't, move two feet left so I don't clothesline you. Politely.",
      },
    ],
    trail: [
      {
        narrator:
          "Halfway up a hill on the Nature Trail a blonde skunkgirl in a cropped white track top and blue running trunks is crouched over a leaf, ponytail up, tail high, totally still. Then she pops up, beaming, and the breeze carries a very skunky note your way.",
        first: "Don't step there, there's a mantis! Okay, wait, that smell's me, sorry not sorry. I'm Ronnie.",
        second: "I do hill repeats up here and bug spotting on the way down. You can tag along if you can keep up.",
      },
      {
        narrator:
          "A straight stretch of the Nature Trail, and a blonde skunkgirl in a cropped white track top and blue running trunks is walking it backward, checking her watch. Tail up. When she turns, the breeze brings the skunk with her.",
        first: "Oh, hey, don't dodge. I'm Ronnie. I was counting steps, not hiding. The smell's me. Trail tax.",
        second: "You out here to run or to look at leaves? I can do both. Leaves lose.",
      },
      {
        narrator:
          "She comes around the bend at a jog that isn't showing off and then absolutely is. Ponytail, track kit, black-and-white tail streaming high. She slows when she sees you and the musk catches up a second late.",
        first: "Ronnie. Track. I thought this loop was empty, which is why I didn't hold that one. You can laugh. I already did.",
        second: "If you're going up the hill, I'll pace you for free. If you're going down, save me a bug. I collect those. Not in a jar. In my head.",
      },
    ],
    yogaStudio: [
      {
        narrator:
          "Second Wind. A blonde skunkgirl in track kit is rolling out mats at the front of the room, smartwatch on, ponytail high. Somebody in the back lets one slip during a stretch, and she just laughs.",
        first: "See? Body's working. That's the whole point. I'm Ronnie, I teach here. You here for class?",
        second: "Grab a mat. I go easy on first-timers for exactly one pose.",
      },
      {
        narrator:
          "Second Wind, before the room fills. Ronnie is in track kit, not a costume, barefoot on a mat she just snapped flat. Ponytail high, tail higher. She looks up and owns the faint skunk in the studio air.",
        first: "Class isn't for twenty minutes, so you get the pre-game. I'm Ronnie. I teach. The smell is me warming up. Don't make it weirder than it is.",
        second: "Shoes off if you're staying. Shoes on if you're lost. Both are valid. Only one of them gets a good spot.",
      },
      {
        narrator:
          "She is writing the pose order on a little board and talking to herself about hips. Blonde, athletic, skunk tail curled up so it stays off the mats. She notices you in the mirror and turns, already mid-smile.",
        first: "Hey. Ronnie. If you're here for the gentle class, that's me, and I am only gentle on purpose. Yeah, I let one go. Bodies work.",
        second: "Grab a block if you need it. Don't grab my mat. I already farted on the air rights.",
      },
    ],
    library: [
      {
        narrator:
          "The quiet floor. A blonde skunkgirl in a backwards cap and a Love Stinks tank has a health-sciences text open and is not reading it. Cargo pants, chunky boots, tail taking up the aisle. She looks up like the library started it.",
        first: "Yeah, I know. Ronnie. I came in for one chapter and my stomach filed a louder one. You can sit. I'm not the librarian.",
        second: "If you need this table, take the end that isn't me. I'll be done being academic in, like, four minutes.",
      },
      {
        narrator:
          "Someone dragged a protein bar into the stacks and is treating it like research. Blonde, skunk ears, baggy cargos, a big black-and-white tail. The musk is not the old paper. She grins when you notice.",
        first: "Caught. I'm Ronnie. Veronica on the syllabus, Ronnie if you want me to answer. I farted. The book didn't.",
        second: "You looking for a subject or a seat? I've got opinions on both and a time limit on the second.",
      },
      {
        narrator:
          "She has one boot up on the chair rung and a notebook full of sets, not citations. Backwards cap, tank, cargo pants. A skunky note hangs in the aisle. She doesn't lower her voice for it.",
        first: "Hey. New person. I'm Ronnie. Don't do the library whisper on my account. I already lost that fight with my own gut.",
        second: "Health sci, track, future gym. That's the bio. You can have a shorter one if you sit down.",
      },
    ],
    studyHall: [
      {
        narrator:
          "Green lamp, open notebook, a blonde skunkgirl who has written 'quad day' where a thesis should be. Love Stinks tank, cargos, tail draped off the chair. The musk says she stopped holding it when the hall looked empty.",
        first: "Ha. Okay. Ronnie. I thought I had the row. I didn't. You can pretend that was a chair. It wasn't.",
        second: "I'm supposed to be studying joints. I am studying joints. I'm also a person with a digestive system. Sit if you can multitask.",
      },
      {
        narrator:
          "Study hall, back corner. She is highlighting like the marker owes her money, ponytail through a backwards cap, cargo pockets full of something that crinkles. She clocks you and does not hide the smell.",
        first: "Hey. I'm Ronnie. If you need quiet, I'm the wrong table, and I already know why. The fart was mine. The notes are also mine. Don't take either.",
        second: "There's a window row if your lungs file a complaint. I'll still be here being impressive.",
      },
      {
        narrator:
          "A smartwatch buzzes. She silences it with her chin because both hands are on a diagram of a knee. Blonde, skunk tail up, tomboy clothes that did not dress for a library. She looks over, bright.",
        first: "Ronnie. Don't mind the air. I held it through a lab and the hall is where I lost. You sitting or touring?",
        second: "If this is your usual spot, say so. I'll move. I'll also race you to the better lamp.",
      },
    ],
    animeStore: [
      {
        narrator:
          "Neko Shelf. She looks like she was dared to come in and then decided to win. Backwards cap, Love Stinks tank, cargo pants, a skunk tail knocking a poster. She is holding a figure box at arm's length.",
        first: "Okay, which of these is the one people actually want? I'm Ronnie. This is a gift, not a personality. The smell's me, not the plastic.",
        second: "Point me at the right shelf and I'll get out of your aisle. Or stay. I'm fun. The box is not.",
      },
      {
        narrator:
          "She is parked in front of a running-anime display like it owes her a PR. Blonde ponytail, chunky boots, tail high. A skunky note cuts the new-plastic air. She laughs before you can make a face.",
        first: "Yeah, I heard it too. Ronnie. I came in for a friend's birthday and my body made it about me. Classic.",
        second: "If you know this show, help. If you don't, stand there and look impressed. I accept both.",
      },
      {
        narrator:
          "The keychain wall. A blonde skunkgirl in cargos is comparing two of them like a coach comparing split times. She notices you, pockets neither, and owns the musk without a warm-up.",
        first: "Hey. Ronnie. Don't recommend me the cute one. I need the one that survives a gym bag. And yeah, that was me.",
        second: "I'll be five minutes. Less if you actually know what you're looking at. More if you make it a bit.",
      },
    ],
    craftStore: [
      {
        narrator:
          "Hearth & Hobby. Dried flowers, hot glue, and a blonde skunkgirl in a backwards cap who is clearly not a regular. Love Stinks tank, cargo pants, tail careful around the ribbon. She looks relieved to see a person who also might be lost.",
        first: "Tell me this aisle has something that isn't flowers. I'm Ronnie. I need a patch for a gym bag and the internet said 'craft store' like that was a plan.",
        second: "The smell's me. Sorry-not-sorry. If you know patches, talk. If you know wreaths, that's the other Ronnie, and she doesn't exist.",
      },
      {
        narrator:
          "She has a bolt of blue fabric over one shoulder and no idea what to do with it. Chunky boots, cargos, skunk ears, a grin that got here before the apology. The musk is not potpourri.",
        first: "Ha. Ronnie. I picked this up because it was the color of my trunks and now I'm in a committed relationship with a mistake. You shop here on purpose?",
        second: "I'll put it back if you tell me where 'back' is. Deal? I'll even hold the fart until the parking lot. No promises. I already used today's.",
      },
      {
        narrator:
          "End of the ribbon aisle. She is reading a label out loud, quietly, like the words might be a rep scheme. Blonde, tomboy, big black-and-white tail. She sees you and drops the whisper.",
        first: "Oh good, a witness. I'm Ronnie. I was sent for 'black elastic' and I have found twelve things that are not that. Also I farted. The elastic didn't.",
        second: "Stay if you want. I'm competitive about leaving with the right thing. You can be on my team.",
      },
    ],
  };
  const fallback = [
    {
      narrator: `A blonde skunkgirl in a backwards cap and a "Love Stinks" tank turns around fast, like she's always about to start a race. Baggy cargo pants, chunky boots, a big black-and-white tail. Skunk musk, zero apology.`,
      first: "Oh, hey. Yeah, the smell's me. I'm Ronnie. You looked like you were about to say something, so say it.",
      second: "I've got somewhere to be in, like, twenty minutes. Until then, I'm all yours. Make it interesting.",
    },
    {
      narrator: `An athletic blonde skunkgirl is mid-protein-bar when she spots you, salutes with it, and lets out a short, unbothered toot as she shifts her weight.`,
      first: "Ha. That's not a greeting, that's just Tuesday. I'm Ronnie. Track team, health sciences, future gym owner.",
      second: "You look like you need a workout plan. Or a snack. I've got both.",
    },
  ];
  return pickOne(named[place] ?? fallback);
}

export function ronnieDropIn(placeName: string): { narrator: string; line: string } {
  return pickOne([
    {
      narrator: `${placeName}. A blonde skunkgirl with her ponytail through a backwards cap is already here, stretching a calf against whatever's closest. Her tail swings up when she sees you.`,
      line: "Hey, new face! I'm Ronnie. Don't mind the smell, I just came from the gym. Mostly.",
    },
    {
      narrator: `${placeName}. Someone athletic and blonde laughs at her own fart before you even get close. Skunk ears. Big grin.`,
      line: "You heard that? Good. Saves me the intro. I'm Ronnie. What's your deal?",
    },
  ]);
}

export function duetFallback(other: GirlId, met: boolean) {
  if (other === "ronnie") {
    return met
      ? "Ronnie bounces on her toes, tail up. \"Hey. Still here. Don't make me compete for attention, because I will win.\""
      : "Ronnie grins and sticks out a hand. \"Ronnie. Track, health sci, gym rat. Don't stop on my account.\"";
  }
  if (other === "mira") {
    return met
      ? "Mira doesn't look over right away. \"I'm here. Don't narrate me.\""
      : "Mira turns just enough. \"Mira. If this is a scene, I'm not in it until I say so.\"";
  }
  if (other === "victoria") {
    return met
      ? "Victoria's ears turn, but she doesn't leave. \"I'm still in this. Don't talk about me like I stepped out.\""
      : "Victoria straightens her glasses. \"I don't believe we've met. I'm Victoria. I'll stay, unless this was meant to be private.\"";
  }
  return met
    ? "Izzy rocks on her heels, tail flicking. \"Hey. I'm not furniture. You can talk to both of us.\""
    : "Izzy's ears pop up. \"Oh. Hi. I'm Izzy. I was just — okay, I live in places like this. Don't let me wreck the vibe. Or do.\"";
}

export function fidelityHit(
  state: GameState,
  text: string,
  scene: boolean,
): { roster: Roster; partner: GirlId | null; affairKnown: boolean; lines: { role: "narrator" | GirlId; text: string; expression?: Expression }[] } | null {
  if ((state.relationshipType ?? "mono") !== "mono") return null;
  const partner = state.partner;
  if (!partner || partner === state.focus) return null;
  const card = state.roster?.[partner];
  if (!card?.romanceAccepted) return null;
  const intimate = scene || sexualBeat(text) || /\bkiss|make out|i love you|sleep with|in bed|undress|fuck|eat you out|blow/.test(text);
  const flirt = /\bflirt|you're so hot|you look so good|be mine|hold you|date me|my girlfriend\b/.test(text);
  if (!intimate && !flirt) return null;
  if (state.affairKnown) return null;
  const seen = (state.present ?? []).includes(partner);
  const chance = seen ? 1 : intimate ? 0.72 : 0.28;
  if (Math.random() > chance) return null;
  const trustLoss = intimate ? 34 : 16;
  const bondLoss = intimate ? 26 : 12;
  const trust = Math.max(0, card.trust - trustLoss);
  const bonding = Math.max(0, card.bonding - bondLoss);
  const broken = trust < 50 || bonding < 50 ? Math.random() < (trust < 50 && bonding < 50 ? 1 : 0.75) : false;
  const next: GirlCard = {
    ...card,
    trust,
    bonding,
    romanceOffered: broken ? false : card.romanceOffered,
    romanceAccepted: broken ? false : card.romanceAccepted,
    bond: broken ? "acquaintance" : bondFromScores(trust, bonding, card.romanceAccepted),
  };
  const roster = { ...(state.roster ?? blankRoster()), [partner]: next };
  const name = girlName(partner);
  const lines: { role: "narrator" | GirlId; text: string; expression?: Expression }[] = [];
  if (seen) {
    lines.push({
      role: "narrator",
      text: `${name} is right here. She heard enough. The warmth leaves her face.`,
    });
  } else {
    lines.push({
      role: "narrator",
      text: `Word gets back to ${name}. Not a rumor. The specific thing. She does not take it quietly.`,
    });
  }
  lines.push({
    role: speakerRole(partner),
    expression: "angry",
    text: broken
      ? "No. We are done. I can forgive a clumsy person. I cannot stay with someone who does that and thinks I won't notice. Don't come to me tonight."
      : intimate
        ? "I know what you did with her. Do not dress it up. You are mine, or you were. Trust is not a feeling I can fake for you right now."
        : "Flirting with her, while you have me. I heard. I am not going to scream in public. I am also not going to pretend it was nothing.",
  });
  return { roster, partner: broken ? null : partner, affairKnown: true, lines };
}

/** Two or more girls in the scene. */
export function bothHere(state: Pick<GameState, "present">) {
  return sceneOrder(state.present ?? []).length >= 2;
}

export function describeArrival(focus: GirlId, other: GirlId, place: LocationId, firstTime: boolean) {
  const where = placeOf(place).name;
  if (firstTime && other === "ronnie") {
    return `${where} has a blonde skunkgirl in track kit already in it, ponytail swinging. She waves like you're late for something. That's Ronnie.`;
  }
  if (firstTime && other === "victoria") {
    return `${where} was not only ${girlName(focus)}. Victoria is here too, blouse smoothed, tail held in, already pretending the scent in the air is the room's.`;
  }
  if (firstTime) {
    return `${where} already has another skunkgirl in it. Izzy looks up from whatever she was doing, ears high, and does not apologize for being there.`;
  }
  return `${girlName(other)} is here as well. ${where} is the sort of place she would be.`;
}

export function bondWord(bond: Bond) {
  if (bond === "romantic") return "together";
  return bond;
}

/** Chance Ronnie drops in on a morning detour scene. */
export const RONNIE_MORNING_DROP_IN = 0.35;

/**
 * Ronnie drops in on a morning scene only in the campus area (locations with group "campus"),
 * never when she is the scheduled girl or already the one you went to find.
 */
export function ronnieMorningDropIn(place: LocationId, scheduled: GirlId, arriving: GirlId, roll = Math.random()): boolean {
  if (scheduled === "ronnie" || arriving === "ronnie") return false;
  if (PRIVATE.has(place) || placeOf(place).group !== "campus") return false;
  return roll < RONNIE_MORNING_DROP_IN;
}

/** Debug: the next girl in roster order (izzy -> victoria -> ronnie -> izzy). */
export function nextGirl(girl: GirlId): GirlId {
  const i = GIRLS.indexOf(girl);
  return GIRLS[(i + 1) % GIRLS.length]!;
}

/** Debug: the first girl in roster order who is not in the scene, or null when all are here. */
export function absentGirl(present: readonly GirlId[]): GirlId | null {
  return GIRLS.find((girl) => !present.includes(girl)) ?? null;
}

/** Outside the morning detour: Ronnie drops in at her haunts (bio) when she is free, else campus-area spots. */
export const RONNIE_HAUNT_DROP_IN = 0.2;
export const RONNIE_CAMPUS_DROP_IN = 0.05;
export const RONNIE_HAUNT_PLACES: ReadonlySet<LocationId> = new Set(RONNIE_HAUNTS.map((h) => h.place));

export function isCampusArea(place: LocationId) {
  return !PRIVATE.has(place) && placeOf(place).group === "campus";
}

/**
 * Chance Ronnie drops in on an in-play arrival (not the morning detour).
 * 0 while she is in class or teaching, at a closed place, in a private room, when she is already
 * in the scene or the focus, or when the scene already has three girls.
 */
export function ronnieDropInChance(
  place: LocationId,
  weekday: Weekday,
  time: TimeOfDay,
  scene: readonly GirlId[],
): number {
  if (scene.includes("ronnie") || new Set(scene).size >= MAX_SCENE_GIRLS) return 0;
  if (PRIVATE.has(place) || !openTonight(place, time)) return 0;
  if (dutyOf("ronnie", weekday, time) !== "free") return 0;
  if (RONNIE_HAUNT_PLACES.has(place)) return RONNIE_HAUNT_DROP_IN;
  if (isCampusArea(place)) return RONNIE_CAMPUS_DROP_IN;
  return 0;
}
