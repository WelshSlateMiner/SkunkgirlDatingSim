import type { Expression, GirlId } from "./types";

/** First gift. Both meters must already be here. */
export const KEEPSAKE_FIRST = 50;
/** Second gift. Only after her first, and only at this gate. */
export const KEEPSAKE_SECOND = 90;
/** Rolled once, the first time she is in the scene on a given day. */
export const KEEPSAKE_CHANCE = 0.1;

export interface Keepsake {
  id: string;
  girl: GirlId;
  tier: 1 | 2;
  name: string;
  blurb: string;
  /** What she says as she hands it over. */
  line: string;
  expression: Expression;
  image: string;
}

export const KEEPSAKES: Keepsake[] = [
  {
    id: "izzy-pin",
    girl: "izzy",
    tier: 1,
    name: "Enamel Skunk in Hoodie Trail Pin",
    blurb: "A little enamel skunk in a hoodie she had made and then got too shy to wear. She gives it like it is a joke. It is not.",
    line: "Don't make it a thing. I had this made and then I got shy. It's yours.",
    expression: "shy",
    image: "/art/keepsakes/izzy-pin.png",
  },
  {
    id: "izzy-guide",
    girl: "izzy",
    tier: 2,
    name: "Annotated Local Trail Guide",
    blurb: "From her personal collection. A worn guide to the trails around here, with her notes in it, including the hike you took together. She acts like she is only lending it.",
    line: "I'm lending it. The notes in the back are from when we hiked. Keep it anyway.",
    expression: "shy",
    image: "/art/keepsakes/izzy-guide.png",
  },
  {
    id: "vicky-swatch",
    girl: "victoria",
    tier: 1,
    name: "The Swatch Card",
    blurb: "One fabric card from Line & Lumen. Her notes on the back say what the color does to a room. She only parts with a decision she has already made.",
    line: "I already decided. This is the one. Take it before I start checking it again.",
    expression: "thinking",
    image: "/art/keepsakes/vicky-swatch.png",
  },
  {
    id: "vicky-miniature",
    girl: "victoria",
    tier: 2,
    name: "The Miniature",
    blurb: "A finished dollhouse room she built herself. One sofa. One lamp. Arranged until it was right. She will know if you move anything.",
    line: "One sofa. One lamp. If you move either, I will know.",
    expression: "happy",
    image: "/art/keepsakes/vicky-miniature.png",
  },
  {
    id: "ronnie-mantis",
    girl: "ronnie",
    tier: 1,
    name: "Framed Preserved Devil's Flower Mantis",
    blurb: "One of her own mantises, raised as a pet from last season. She wants you to have it. Don't tap the glass.",
    line: "That's one of mine. Last season. Don't tap the glass.",
    expression: "happy",
    image: "/art/keepsakes/ronnie-mantis.png",
  },
  {
    id: "ronnie-lane",
    girl: "ronnie",
    tier: 2,
    name: "Lane Card",
    blurb: "The race card from a meet she actually cared about. Her event and her time. She says it is trash. She kept it, so it meant something.",
    line: "It's trash. I kept it. Lane card from the meet that mattered. Don't lose it.",
    expression: "shy",
    image: "/art/keepsakes/ronnie-lane.png",
  },
  {
    id: "mira-mixtape",
    girl: "mira",
    tier: 1,
    name: "Mixtape of her favorite songs",
    blurb: "She plays it off as self-promotion. It is not another EP. These are the songs she actually loves, and she hopes you like them.",
    line: "Play it. Or don't. They're the ones I put on when nobody is asking me to be a brand.",
    expression: "shy",
    image: "/art/keepsakes/mira-mixtape.jpg",
  },
  {
    id: "mira-rehearsals",
    girl: "mira",
    tier: 2,
    name: "USB of her private dance rehearsals",
    blurb: "At-home routines she does not post. More personal than the public work. Handing them over is trust, not a content drop.",
    line: "These don't go online. Don't you put them online either.",
    expression: "thinking",
    image: "/art/keepsakes/mira-rehearsals.jpg",
  },
];

const BY_ID = new Map(KEEPSAKES.map((item) => [item.id, item]));

export function keepsakeById(id: string | null | undefined) {
  if (!id) return null;
  return BY_ID.get(id) ?? null;
}

/** The apartment painting is 1792×1008. Twelve equal slots inside the glass cabinet. */
export const APARTMENT_PX = { w: 1792, h: 1008 };

export interface ShelfCubby {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Row-major, left to right, top to bottom. Same size in every pane, measured on the painting. */
const CABINET_SLOTS: ShelfCubby[] = [
  { x: 692, y: 178, w: 172, h: 156 },
  { x: 893, y: 178, w: 172, h: 156 },
  { x: 1098, y: 178, w: 172, h: 156 },
  { x: 1307, y: 178, w: 172, h: 156 },
  { x: 692, y: 370, w: 172, h: 156 },
  { x: 893, y: 370, w: 172, h: 156 },
  { x: 1098, y: 370, w: 172, h: 156 },
  { x: 1307, y: 370, w: 172, h: 156 },
  { x: 692, y: 560, w: 172, h: 156 },
  { x: 893, y: 560, w: 172, h: 156 },
  { x: 1098, y: 560, w: 172, h: 156 },
  { x: 1307, y: 560, w: 172, h: 156 },
];

export function shelfCubbies(): ShelfCubby[] {
  return CABINET_SLOTS.map((spot) => ({ ...spot }));
}

/**
 * Next gift she is willing to part with, or null.
 * The first waits for 50/50. The second waits until the first has been given and both meters are 90.
 */
export function nextKeepsake(girl: GirlId, owned: readonly string[], trust: number, bonding: number) {
  const hers = KEEPSAKES.filter((item) => item.girl === girl).sort((a, b) => a.tier - b.tier);
  for (const item of hers) {
    if (owned.includes(item.id)) continue;
    const gate = item.tier === 1 ? KEEPSAKE_FIRST : KEEPSAKE_SECOND;
    if (trust < gate || bonding < gate) return null;
    if (item.tier === 2) {
      const first = hers.find((other) => other.tier === 1);
      if (first && !owned.includes(first.id)) return null;
    }
    return item;
  }
  return null;
}

export interface KeepsakeRollState {
  started: boolean;
  dayPhase: string;
  izzyHere: boolean;
  present: readonly GirlId[];
  daySerial: number;
  keepsakes: readonly string[];
  seenDay: Partial<Record<GirlId, number>>;
  roster: Partial<Record<GirlId, { trust: number; bonding: number } | undefined>>;
}

export interface KeepsakeOffer {
  keepsakes: string[];
  seenDay: Partial<Record<GirlId, number>>;
  gained: Keepsake[];
  changed: boolean;
}

const ROLL_ORDER: GirlId[] = ["izzy", "victoria", "ronnie", "mira"];

/**
 * First time each present girl is in the scene today, roll once.
 * A miss still spends the day. She does not get a second chance until tomorrow.
 */
export function offerKeepsakes(state: KeepsakeRollState, rng: () => number): KeepsakeOffer {
  const seenDay = { ...(state.seenDay ?? {}) };
  const keepsakes = [...(state.keepsakes ?? [])];
  const gained: Keepsake[] = [];
  if (!state.started || state.dayPhase !== "playing" || state.izzyHere === false) {
    return { keepsakes, seenDay, gained, changed: false };
  }
  let changed = false;
  for (const girl of ROLL_ORDER) {
    if (!state.present.includes(girl)) continue;
    if (seenDay[girl] === state.daySerial) continue;
    seenDay[girl] = state.daySerial;
    changed = true;
    const card = state.roster?.[girl];
    if (!card) continue;
    const next = nextKeepsake(girl, keepsakes, card.trust, card.bonding);
    if (!next) continue;
    if (rng() >= KEEPSAKE_CHANCE) continue;
    keepsakes.push(next.id);
    gained.push(next);
  }
  return { keepsakes, seenDay, gained, changed };
}
