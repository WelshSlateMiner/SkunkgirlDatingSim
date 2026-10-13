import type { GirlId, LocationId } from "./types";

export type GiftReception = "love" | "like" | "ok" | "miss" | "insult";

export interface GiftDef {
  id: string;
  name: string;
  store: LocationId;
  price: number;
  izzy: GiftReception;
  victoria: GiftReception;
}

export const STORE_IDS: LocationId[] = [
  "gameStore",
  "animeStore",
  "collectibles",
  "fashion",
  "makeup",
  "trendy",
  "perfume",
  "tabletop",
  "grocery",
  "naturalFoods",
  "sportingGoods",
  "craftStore",
  "furniture",
];

export const GIFTS: GiftDef[] = [
  { id: "steam-card", name: "Steam gift card", store: "gameStore", price: 10, izzy: "love", victoria: "miss" },
  { id: "retro-keychain", name: "retro cartridge keychain", store: "gameStore", price: 8, izzy: "like", victoria: "ok" },
  { id: "strategy-guide", name: "hardback strategy guide", store: "gameStore", price: 28, izzy: "love", victoria: "like" },

  { id: "eva-artbook", name: "Evangelion art book", store: "animeStore", price: 32, izzy: "love", victoria: "ok" },
  { id: "musume-volume", name: "Monster Musume volume", store: "animeStore", price: 15, izzy: "love", victoria: "miss" },
  { id: "plain-figure", name: "small figure in a plain box", store: "animeStore", price: 40, izzy: "love", victoria: "miss" },

  { id: "bionicle-mask", name: "loose Bionicle mask", store: "collectibles", price: 18, izzy: "love", victoria: "ok" },
  { id: "mixed-bricks", name: "bag of mixed bricks", store: "collectibles", price: 22, izzy: "like", victoria: "love" },
  { id: "dollhouse-mini", name: "dollhouse miniature", store: "collectibles", price: 45, izzy: "ok", victoria: "love" },

  { id: "campus-hoodie", name: "soft campus hoodie", store: "fashion", price: 35, izzy: "love", victoria: "miss" },
  { id: "pencil-skirt", name: "black pencil skirt", store: "fashion", price: 48, izzy: "miss", victoria: "like" },
  { id: "black-tights", name: "plain black tights", store: "fashion", price: 12, izzy: "ok", victoria: "like" },

  { id: "lip-balm", name: "tinted lip balm", store: "makeup", price: 9, izzy: "like", victoria: "like" },
  { id: "sample-set", name: "perfume sample set", store: "makeup", price: 24, izzy: "insult", victoria: "miss" },
  { id: "compact-mirror", name: "compact mirror", store: "makeup", price: 16, izzy: "ok", victoria: "like" },

  { id: "band-tee", name: "oversized band tee", store: "trendy", price: 20, izzy: "love", victoria: "miss" },
  { id: "sarcastic-mug", name: "sarcastic mug", store: "trendy", price: 14, izzy: "like", victoria: "like" },
  { id: "gag-freshener", name: "gag air-freshener can", store: "trendy", price: 6, izzy: "insult", victoria: "insult" },

  { id: "floral-bottle", name: "department-store floral", store: "perfume", price: 38, izzy: "insult", victoria: "miss" },
  { id: "unscented-lotion", name: "unscented lotion", store: "perfume", price: 15, izzy: "like", victoria: "love" },
  { id: "niche-musk", name: "niche musk bottle", store: "perfume", price: 50, izzy: "miss", victoria: "like" },

  { id: "axis-pocket", name: "Axis & Allies pocket edition", store: "tabletop", price: 30, izzy: "love", victoria: "ok" },
  { id: "hex-notebook", name: "blank hex notebook", store: "tabletop", price: 11, izzy: "like", victoria: "love" },
  { id: "dice-tin", name: "dice set in a tin", store: "tabletop", price: 18, izzy: "love", victoria: "like" },

  { id: "dried-beans", name: "bag of dried beans", store: "grocery", price: 5, izzy: "love", victoria: "like" },
  { id: "meal-for-two", name: "ready meal for two", store: "grocery", price: 14, izzy: "like", victoria: "like" },
  { id: "checkout-spray", name: "checkout body spray", store: "grocery", price: 7, izzy: "insult", victoria: "insult" },
  { id: "tomato-sauce", name: "tomato sauce can", store: "grocery", price: 5, izzy: "like", victoria: "like" },
  { id: "industrial-soap", name: "industrial soap", store: "grocery", price: 15, izzy: "insult", victoria: "miss" },

  { id: "fiber-granola", name: "high-fiber granola", store: "naturalFoods", price: 9, izzy: "love", victoria: "ok" },
  { id: "olive-oil", name: "nice olive oil", store: "naturalFoods", price: 22, izzy: "ok", victoria: "love" },
  { id: "odor-tea", name: "herbal odor tea", store: "naturalFoods", price: 13, izzy: "insult", victoria: "insult" },

  { id: "wool-socks", name: "wool hiking socks", store: "sportingGoods", price: 16, izzy: "love", victoria: "ok" },
  { id: "field-notebook", name: "field notebook", store: "sportingGoods", price: 10, izzy: "love", victoria: "like" },
  { id: "scent-free-soap", name: "scent-free outdoor soap", store: "sportingGoods", price: 12, izzy: "insult", victoria: "miss" },

  { id: "floral-fabric", name: "floral fabric remnant", store: "craftStore", price: 8, izzy: "miss", victoria: "love" },
  { id: "embroidery-kit", name: "embroidery kit", store: "craftStore", price: 19, izzy: "ok", victoria: "love" },
  { id: "fake-plant", name: "fake plant in a ceramic pot", store: "craftStore", price: 27, izzy: "like", victoria: "love" },

  { id: "design-book", name: "discount design book", store: "furniture", price: 24, izzy: "ok", victoria: "love" },
  { id: "throw-pillows", name: "pair of throw pillows", store: "furniture", price: 36, izzy: "like", victoria: "love" },
  { id: "linen-candle", name: "fresh-linen candle", store: "furniture", price: 18, izzy: "miss", victoria: "insult" },
];

const BY_ID = new Map(GIFTS.map((gift) => [gift.id, gift]));

export function isStore(id: LocationId) {
  return STORE_IDS.includes(id);
}

export function giftsAt(store: LocationId) {
  return GIFTS.filter((gift) => gift.store === store);
}

export function giftById(id: string | null | undefined) {
  if (!id) return null;
  return BY_ID.get(id) ?? null;
}

const LADDER: GiftReception[] = ["insult", "miss", "ok", "like", "love"];

function bump(kind: GiftReception, steps: number): GiftReception {
  if (steps <= 0 || kind === "insult") return kind;
  const at = LADDER.indexOf(kind);
  return LADDER[Math.min(LADDER.length - 1, at + steps)] ?? kind;
}

export function receptionOf(gift: GiftDef, girl: GirlId): GiftReception {
  const base = girl === "victoria" ? gift.victoria : gift.izzy;
  if (girl === "victoria") {
    // Motherly. A gift that isn't asking her to hide lands easier.
    return bump(base, 1);
  }
  // College kid. The same gift means more when it clearly cost something.
  return bump(base, gift.price >= 28 ? 1 : 0);
}

export function receptionDelta(kind: GiftReception) {
  if (kind === "love") return { trust: 4, bonding: 8 };
  if (kind === "like") return { trust: 2, bonding: 4 };
  if (kind === "ok") return { trust: 0, bonding: 1 };
  if (kind === "miss") return { trust: -1, bonding: -2 };
  return { trust: -8, bonding: -6 };
}

export function giftSpeech(girl: GirlId, gift: GiftDef) {
  const kind = receptionOf(gift, girl);
  const name = gift.name;
  if (girl === "victoria") {
    if (kind === "love") return `${name}. You were paying attention. Sit down before I get sentimental about a bag.`;
    if (kind === "like") return `${name}. That's thoughtful. I won't pretend it isn't.`;
    if (kind === "ok") return `${name}. I'll find a place for it. Thank you.`;
    if (kind === "miss") return `${name}. I see what you were trying to do. It isn't quite me.`;
    return `${name}. That is not a gift. That is you asking me to be less of what I am.`;
  }
  if (kind === "love") return `Oh. ${name}. You actually brought this. Don't look so proud. I'm keeping it.`;
  if (kind === "like") return `${name}. Yeah. That's... good. I like it. Thanks.`;
  if (kind === "ok") return `${name}. I'll take it. I don't hate it. That's a review.`;
  if (kind === "miss") return `${name}. Um. Thanks? I don't really have a shelf for that.`;
  return `${name}. Is this a joke? I'm a person, not a smell you're trying to fix.`;
}

export function giftSummary(girl: GirlId, gift: GiftDef) {
  const kind = receptionOf(gift, girl);
  const name = gift.name;
  if (kind === "love") return `${name} was exactly her kind of thing.`;
  if (kind === "like") return `She liked the ${name}.`;
  if (kind === "ok") return `The ${name} was fine. Not a miss, not a memory.`;
  if (kind === "miss") return `The ${name} missed her. She was polite about it.`;
  return `The ${name} landed as an insult. It asked her to cover what she is.`;
}

export function presentLine(gift: GiftDef, girlName: string) {
  return `I present the ${gift.name} as a gift to ${girlName}.`;
}
