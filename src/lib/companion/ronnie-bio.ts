import type { GiftDef } from "./gifts";
import type { LocationId, Weekday } from "./types";

export { RONNIE_ACTIVE } from "./ronnie-art";

/**
 * Veronica's background. She is not on the roster, not a speaker, and not a date.
 * Nothing here puts her in a scene. Victoria may mention the public facts.
 */

export const RONNIE_PROFILE = {
  id: "ronnie",
  name: "Veronica",
  short: "Ronnie",
  age: 20,
  mother: "victoria",
  college: "Same campus as Izzy",
  team: "Track",
  major: "Health sciences",
  goal: "Personal trainer, then her own place in sports and health",
  hair: "Naturally black, like her mother. She dyes it blonde so she is not a copy of Vicky.",
  voice:
    "Athletic tomboy. Competitive, hard-working, and aimed at the next personal best. Confident and a little sarcastic, the way a star athlete talks when she already decided she can do the thing. Not her mother's polished, pretty, everything-in-its-place style. She loves Vicky and she is not a mommy's girl. The overbearing years made her push the other way.",
  father:
    "In public she acts like not having a father is a settled fact. She still wishes she had one, and she keeps going anyway. She will talk about that once Trust and Bonding are both at least 60. Not before.",
} as const;

export const RONNIE_FATHER_GATE = { trust: 60, bonding: 60 } as const;

/** Above 75 on both. Slow Romance also waits until the third date, same as the other girls. */
export const RONNIE_RELATIONSHIP_GATE = { trust: 75, bonding: 75, slowDates: 3 } as const;

/**
 * Documented only. Do not enforce until she is a GirlId.
 * In monogamous mode she will not start a relationship if the player is already with Izzy.
 * She reads that as disrespect toward Izzy.
 */
export const RONNIE_ROMANCE_BLOCK = {
  monogamyIfOfficialWith: ["izzy"] as const,
} as const;

export const RONNIE_SCHEDULE = {
  class: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as Weekday[],
    time: "Morning" as const,
    places: ["library", "cafe", "campus", "studyHall", "classroom"] as LocationId[],
  },
  work: {
    place: "yogaStudio" as const,
    days: ["Tuesday", "Wednesday", "Thursday", "Saturday"] as Weekday[],
    time: "Afternoon" as const,
    onTheClock:
      "She will take the player as a client, or stop for a short hello. Then she goes back to the people she is supposed to be teaching. She takes the job seriously. She does not take herself as seriously as her mother does at the desk.",
  },
  otherwise: "If she is not in class and not teaching, she is usually at the campus gym.",
} as const;

/** Off-the-clock stops. Not a spawn table. */
export const RONNIE_HAUNTS: { place: LocationId; why: string }[] = [
  { place: "naturalFoods", why: "Protein bars at Root & Grain." },
  { place: "cafe", why: "Protein smoothies." },
  { place: "library", why: "Health and fitness guides, healthy cookbooks, and books on insects." },
  { place: "trail", why: "Practice hikes, hill repeats, and looking for bugs." },
  { place: "trendy", why: "Trendy accessories at Spike Rack." },
  { place: "theater", why: "Action movies at Marquee House." },
  { place: "sportingGoods", why: "Athletic gear at Trailhead Outfitters. Track shoes are the one she actually wants." },
  { place: "craftStore", why: "Hearth & Hobby, with her mom or to buy something for her mom." },
  { place: "furniture", why: "Room & Line, same reason." },
  { place: "collectibles", why: "Accessories." },
  { place: "animeStore", why: "Accessories. This is the shop Vicky already struggles in when she shops for her." },
  { place: "gym", why: "Training when she is free." },
  { place: "field", why: "The track." },
];

export const RONNIE_INSECTS = {
  favorite: "Praying mantises",
  favoriteSpecies: "Devil's Flower Mantis",
  dorm: "She keeps the current one in an enclosure in her dorm and adopts a new one when they are in season.",
  trail: "She looks for bugs on the Nature Trail.",
  library: "She rents insect books from the campus library.",
} as const;

/**
 * Date shape, once she exists. Same length and setup as the other girls.
 * A gift is welcome and is not required. That gift rule is already live for Izzy and Victoria.
 */
export const RONNIE_DATE_RULES = {
  giftsRequired: false,
  poorDatePlaces: ["classroom", "studyHall", "sportingGoods", "firm", "yogaStudio"] as LocationId[],
  refusedDatePlaces: ["dorm", "vickyLiving", "vickyBedroom"] as LocationId[],
  casualDatePlaces: ["ronnieDorm", "apartment"] as LocationId[],
  willNotWanderInto: ["dorm", "apartment"] as LocationId[],
  mayAppearAt: ["vickyLiving", "vickyBedroom"] as LocationId[],
} as const;

/** Honest and playful lands. Outright rude costs trust and bonding. */
export const RONNIE_MANNERS = {
  best: "Play it straight and give it back. She likes a person who can keep up.",
  rude: "Judgmental or mean costs trust and bonding.",
} as const;

/**
 * How she farts and how she reads the player's reaction. Dormant until she can speak.
 * The trust numbers are scales against what Izzy and Victoria give for the same reaction.
 */
export const RONNIE_FARTS = {
  attitude:
    "Not afraid to let rip. She says it is just her body working as intended, with her skunky nature plus all the fiber and protein she eats. She says it in her own tomboy voice.",
  public:
    "In public she lets every casual fart go, plus intimate farts with no moan up to size 2. Strangers do not bother her.",
  private:
    "In semi-private and private places she lets rip all kinds of farts, unashamed, laughs afterwards, and often comments on them.",
  competitive:
    "Her competitive side covers her gas. She is down for a farting contest with another skunkgirl. She may take another girl's public slip in the same scene as a challenge and try to top it.",
  yoga:
    "At the yoga studio she is comfortable farting while instructing and encourages her clients to as well. It is natural and shows everything is working.",
  promptMiss:
    "If the player asks and nothing comes, she is disappointed she failed, not refusing.",
} as const;

export const RONNIE_FART_REACTIONS = {
  /** Playing it cool still earns trust, less than with the other girls. */
  coolTrustScale: 0.5,
  /** A negative but not rude reaction is not disrespect to her. No penalty. */
  negativeIsDisrespect: false,
  /** Playful back is her best reaction. Open attraction works, but less than with the others. */
  playfulBest: true,
  attractedScale: 0.5,
  guide: [
    "Playing it cool raises Trust, but by less than with the other girls.",
    "Reacting negatively is not disrespect to her. She is used to people downplaying it or gently saying what they think, and she shrugs it off or teases back.",
    "Outright judgmental or rude costs Trust and Bonding.",
    "Being playful back is the best way onto her good side. Being openly attracted to her farts is not as effective with her as with the other girls.",
    "Fart play can happen once Trust and Bonding are both over 50, even outside a relationship. She focuses on humiliation: she knows how bad her farts are and laughs at how weird the player is for being into it.",
  ],
} as const;

export function ronnieFartBrief() {
  return [
    RONNIE_FARTS.attitude,
    RONNIE_FARTS.public,
    RONNIE_FARTS.private,
    RONNIE_FARTS.competitive,
    RONNIE_FARTS.yoga,
    RONNIE_FARTS.promptMiss,
    ...RONNIE_FART_REACTIONS.guide,
  ].join(" ");
}

export function ronnieGiftKind(gift: GiftDef) {
  return gift.ronnie;
}

/** Stored for the day she can be handed something. No date calls this. */
export function ronnieGiftSpeech(gift: GiftDef) {
  const name = gift.name;
  const kind = gift.ronnie;
  if (kind === "love") return `${name}. Okay. You were actually paying attention. I'm keeping it.`;
  if (kind === "like") return `${name}. Yeah. This works. Thanks.`;
  if (kind === "ok") return `${name}. I'll find a use for it. Or my mom will. Thanks.`;
  if (kind === "miss") return `${name}. That's not really me. I see the try.`;
  return `${name}. That's you asking me to cover up. Not a gift.`;
}

/** What Victoria is allowed to know out loud. Ronnie herself still does not appear. */
export function veronicaBrief() {
  return [
    `Veronica "Ronnie" is ${RONNIE_PROFILE.age}, Vicky's daughter, a skunkgirl, and not in this scene. She is not a romance option. Mention her only if family, gifts, or responsibility comes up.`,
    RONNIE_PROFILE.hair,
    `She is on the college ${RONNIE_PROFILE.team.toLowerCase()} team, studies ${RONNIE_PROFILE.major.toLowerCase()}, and wants to be a personal trainer and then open her own place.`,
    `Weekday mornings she is in class. Tuesday, Wednesday, Thursday, and Saturday afternoons she instructs at Second Wind and stays on the clock. ${RONNIE_SCHEDULE.otherwise}`,
    "She loves her mother and she is not a mommy's girl.",
    "If gas comes up, Vicky knows her daughter is completely unashamed about it, blames the protein and fiber, and turns it into a competition. Vicky can sigh about that.",
    `Her dorm has track trophies, a lifting plaque, and a ${RONNIE_INSECTS.favoriteSpecies}. ${RONNIE_INSECTS.dorm}`,
    "Do not put her in the scene, do not speak as her, and do not have her walk in.",
  ].join(" ");
}
