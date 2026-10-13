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
} from "./types";
import { bondFromScores } from "./trust";
import { sexualBeat } from "./intimacy";
import { uid } from "@/lib/utils";
import { placeOf } from "./locations";

export const GIRLS: GirlId[] = ["izzy", "victoria"];

const AFFINITY: Record<LocationId, Record<GirlId, number>> = {
  library: { izzy: 70, victoria: 70 },
  studyHall: { izzy: 78, victoria: 42 },
  classroom: { izzy: 88, victoria: 8 },
  cafe: { izzy: 58, victoria: 48 },
  campus: { izzy: 84, victoria: 12 },
  trail: { izzy: 76, victoria: 22 },
  dorm: { izzy: 100, victoria: 0 },
  mexican: { izzy: 82, victoria: 28 },
  burger: { izzy: 64, victoria: 16 },
  mall: { izzy: 50, victoria: 52 },
  gameStore: { izzy: 74, victoria: 18 },
  foodCourt: { izzy: 56, victoria: 30 },
  fashion: { izzy: 40, victoria: 64 },
  makeup: { izzy: 32, victoria: 58 },
  collectibles: { izzy: 76, victoria: 28 },
  trendy: { izzy: 68, victoria: 18 },
  perfume: { izzy: 22, victoria: 92 },
  theater: { izzy: 52, victoria: 48 },
  animeStore: { izzy: 96, victoria: 14 },
  tabletop: { izzy: 72, victoria: 24 },
  grocery: { izzy: 38, victoria: 74 },
  naturalFoods: { izzy: 34, victoria: 56 },
  sportingGoods: { izzy: 70, victoria: 18 },
  apartment: { izzy: 40, victoria: 40 },
  vickyLiving: { izzy: 0, victoria: 100 },
  vickyBedroom: { izzy: 0, victoria: 100 },
  craftStore: { izzy: 18, victoria: 96 },
  italian: { izzy: 34, victoria: 90 },
  furniture: { izzy: 14, victoria: 96 },
  firm: { izzy: 8, victoria: 98 },
};

const PRIVATE = new Set<LocationId>(["dorm", "apartment", "vickyLiving", "vickyBedroom"]);

export function otherGirl(id: GirlId): GirlId {
  return id === "izzy" ? "victoria" : "izzy";
}

export function girlName(id: GirlId) {
  return id === "victoria" ? "Victoria" : "Izzy";
}

export function girlShort(id: GirlId) {
  return id === "victoria" ? "Vicky" : "Izzy";
}

export function speakerRole(id: GirlId): "izzy" | "victoria" {
  return id === "victoria" ? "victoria" : "izzy";
}

export function herHome(id: GirlId): LocationId {
  return id === "victoria" ? "vickyLiving" : "dorm";
}

export function isPrivatePlace(id: LocationId | null | undefined) {
  return Boolean(id && PRIVATE.has(id));
}

export function ownsHome(id: LocationId): GirlId | null {
  if (id === "dorm") return "izzy";
  if (id === "vickyLiving" || id === "vickyBedroom") return "victoria";
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
  };
}

export function initialCast(focus: GirlId = "izzy") {
  const roster = blankRoster();
  roster[focus] = {
    ...roster[focus],
    met: true,
    trust: 6,
    bonding: 4,
    expression: focus === "victoria" ? "shy" : "embarrassed",
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

export function rollGirl(place: LocationId): GirlId {
  const a = affinity("izzy", place);
  const b = affinity("victoria", place);
  const total = Math.max(1, a + b);
  return Math.random() * total < a ? "izzy" : "victoria";
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

export function companionChance(focus: GirlId, place: LocationId) {
  if (PRIVATE.has(place)) return 0;
  const other = otherGirl(focus);
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
    const other = state.roster?.[otherGirl(focus)];
    if (other?.romanceAccepted) return true;
  }
  if (focus === "victoria") {
    const need = state.relationshipType === "harem" ? 82 : 72;
    if (trust < 100 || bonding < need) return true;
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

export function seedMeeting(state: GameState, place: LocationId, relationshipType: RelationshipType): GameState {
  const girl = rollGirl(place);
  const roster = blankRoster();
  roster[girl] = {
    ...roster[girl],
    met: true,
    trust: 6,
    bonding: 4,
    expression: girl === "victoria" ? "shy" : "embarrassed",
    outfit: girl === "victoria" ? "work" : state.outfit,
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
  const lines = victoriaOpening(place);
  const messages: GameState["messages"] = [
    { id: uid(), role: "narrator", at: Date.now(), text: lines.narrator },
    {
      id: uid(),
      role: "victoria",
      at: Date.now() + 1,
      expression: "embarrassed",
      text: oneGreeting(lines.first, lines.second),
    },
  ];
  return {
    ...state,
    relationshipType,
    focus: "victoria",
    present: ["victoria"],
    roster,
    planGirl: "victoria",
    morningDetour: false,
    queuedMeet: null,
    meetKind: "plan",
    partner: null,
    affairKnown: false,
    trust: 6,
    bonding: 4,
    bond: "stranger",
    outfit: "work",
    expression: "shy",
    izzyHere: true,
    messages,
  };
}

export function duetFallback(other: GirlId, met: boolean) {
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
): { roster: Roster; partner: GirlId | null; affairKnown: boolean; lines: { role: "narrator" | "izzy" | "victoria"; text: string; expression?: Expression }[] } | null {
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
  const lines: { role: "narrator" | "izzy" | "victoria"; text: string; expression?: Expression }[] = [];
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

export function bothHere(state: Pick<GameState, "present">) {
  const present = state.present ?? [];
  return present.includes("izzy") && present.includes("victoria");
}

export function describeArrival(focus: GirlId, other: GirlId, place: LocationId, firstTime: boolean) {
  const where = placeOf(place).name;
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
