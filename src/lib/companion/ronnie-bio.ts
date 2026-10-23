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

/** Her deepest secret. Not for the How to Play window. A bonus for players to find. */
export const RONNIE_SECRET = {
  why:
    "Deep down, her mother's overbearing parenting and the missing father left a mark she has questioned and grappled with since puberty.",
  kink:
    "She has a mommy kink. She likes being treated like a dependent by her partner and nurtured compassionately, guided by a soft-dominant hand during intimacy.",
  vicky: "She wonders whether she is actually interested in Victoria sexually. It is a deep, taboo secret.",
  gate: "She will not discuss it unless Trust and Bonding are both at least 90 and she is in a relationship with the player.",
} as const;

export const RONNIE_SECRET_GATE = { trust: 90, bonding: 90, relationship: true } as const;

/**
 * The hidden Vicky and Ronnie threesome pathway. Both game modes.
 * Never listed in How to Play.
 */
export const VICKY_RONNIE_PATHWAY = {
  steps: [
    "The player enters a relationship with Vicky or Ronnie first. In Skunkgirl Harem the other is locked out of a relationship until this pathway is complete. Either one explains in her own voice that it would be weird to date the same person as her mom or her daughter.",
    "Trust and Bonding are maxed with both women.",
    "The player tells Vicky how good she is at being a motherly figure. Vicky says she loves being a mother figure, it feels natural, and it is very sexy to her.",
    "The player asks Ronnie whether she has deep secrets or taboo kinks. She admits the mommy kink. If the player is with Vicky, she adds that she knows it is weird, she is a little jealous of how her mom treats the player the way she used to treat her, and she wonders if she has a thing for Vicky too.",
    "The player suggests they talk to her mom about it and work it out. Ronnie accepts in her own voice only if Trust and Bonding are 100 with both women.",
    "The player invites both to Vicky's bedroom or living room, Ronnie's dorm, or the player's apartment, and tells Vicky that Ronnie has something to talk about. Ronnie explains her feelings to Vicky.",
    "If Vicky's Trust and Bonding are maxed and one or both are in a relationship with the player, Vicky slips into the motherly role and seduces Ronnie with her sly cougar charm.",
  ],
  meetPlaces: ["vickyBedroom", "vickyLiving", "ronnieDorm", "apartment"] as LocationId[],
  acceptGate: { trust: 100, bonding: 100 },
  vickyGate: { maxed: true, relationshipWithEither: true },
  haremLockout: true,
  inHowToPlay: false,
} as const;

/** Casual relations and invitations. */
export const RONNIE_INTIMACY = {
  inviteGate: { trust: 40, bonding: 40 },
  inviteTo: ["ronnieDorm", "apartment"] as LocationId[],
  fartPlayGate: { trust: 50, bonding: 50, relationship: false },
  casual:
    "More open to casual relations than Vicky or Izzy. She is enjoying her young and reckless phase, finally free of her mom's protective guardianship.",
  monogamy:
    "In monogamous mode she is still open to casual relations if the player is in a relationship with another skunkgirl and not her.",
} as const;

/** After dark. */
export const RONNIE_NIGHT = {
  belowGate:
    "If Trust and Bonding are not high enough for intimacy, she will hang out somewhere still open or say goodbye for the night.",
  aboveGate: "Otherwise she gives and accepts invitations to her dorm or the player's apartment.",
  canSleepShowerAt: ["ronnieDorm"] as LocationId[],
} as const;

/** Cheating, the stink meter, and walk-ins. Same shape as the other girls. */
export const RONNIE_LOYALTY = {
  smellsOfOther:
    "If the player smells like another skunkgirl while in a relationship with her, she questions their loyalty and expects a good explanation.",
  angrySprayHit: { min: 25, max: 60 },
  walkInChances: 1,
  breakupBelow: 50,
  breakupOnCaughtDateWithPoorExcuse: true,
  monogamyStricter: true,
} as const;

export const RONNIE_SPRAYS = ["angry", "defensive", "consensual", "dominant"] as const;

/** Scenes with other skunkgirls. Needs 3-girl scenes and Ronnie as a GirlId. */
export const RONNIE_JOINT_SCENES = {
  attention: "She may fart to draw attention to herself in a joint scene, or just to tease her mother.",
  backgroundContest:
    "With three or more skunkgirls in a scene and the focus on someone other than her and Izzy, she may get into a background farting contest with Izzy.",
  threesome: "In a three- or foursome she tries to be the gassiest and stinkiest while blasting the player.",
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
  /** She accepts these, but is less impressed and starts to read the relationship as casual. */
  casualDatePlaces: ["ronnieDorm", "apartment"] as LocationId[],
  willNotWanderInto: ["dorm", "apartment"] as LocationId[],
  mayAppearAt: ["vickyLiving", "vickyBedroom"] as LocationId[],
} as const;

/** Honest and playful lands. Outright rude costs trust and bonding. */
export const RONNIE_MANNERS = {
  best: "Play it straight and give it back. She likes a person who can keep up.",
  rude: "Judgmental or mean costs trust and bonding.",
} as const;

/** How she farts and how she reads the player's reaction. The trust numbers sit against Izzy and Victoria. */
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
  /** Playing it cool still earns trust, half what the other girls give. */
  coolTrustScale: 0.5,
  /** A negative but not rude reaction is not disrespect to her. No penalty. Saying they stink is a compliment. */
  negativeIsDisrespect: false,
  /** Only making a big issue out of it costs Trust and Bonding. */
  bigIssueCosts: true,
  /** Playful back is her best reaction. Being openly into it works at two thirds of what the others give. */
  playfulBest: true,
  attractedScale: 2 / 3,
  guide: [
    "Playing it cool raises Trust, but by less than with the other girls.",
    "Reacting negatively is not disrespect to her. She is used to people downplaying it or gently saying what they think, and she shrugs it off or teases back.",
    "She does not care if the player comments on how bad they stink. She takes that as a point of pride and may brag about it.",
    "She only cares when the player makes a big issue out of it: lecturing, shaming, refusing to drop it, or making a scene. That costs Trust and Bonding.",
    "Being playful back is the best way onto her good side. Being openly into her farts still helps, a bit less than with the other girls. She finds it amusing in a curious way, like she is trying to figure out what is going on in the player's head.",
    "Fart play can happen once Trust and Bonding are both over 50, even outside a relationship. She focuses on humiliation: she knows how bad her farts are and laughs at how weird the player is for being into it.",
  ],
} as const;

/** How she acts while she is teaching at Second Wind. Read by yoga.ts. */
export const RONNIE_INSTRUCTOR = {
  role:
    "She is on the clock, teaching a class. The class comes first: cueing poses, counting breaths, fixing form, checking on the other clients. She is friendly and upbeat, a little bossy in a coach way, and keeps her jokes short.",
  player:
    "She will take the player as a client and coach them like anyone else, or stop for a quick hello. Long chats, flirting, and dates wait until after class. She steers the player back to the mat.",
  farts:
    "She is comfortable farting during class and encourages her clients to as well. It is natural and shows everything is working. A slip in class gets a quick, matter-of-fact line and she keeps teaching.",
  limits:
    "No intimacy, no sprays except in self-defense, no leaving with the player while class is running.",
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

/** What Victoria is allowed to know out loud about her daughter. */
export function veronicaBrief() {
  return [
    `Veronica "Ronnie" is ${RONNIE_PROFILE.age}, Vicky's daughter, a skunkgirl. Unless STATE lists her as present, she is not in this scene; mention her only if family, gifts, or responsibility comes up.`,
    RONNIE_PROFILE.hair,
    `She is on the college ${RONNIE_PROFILE.team.toLowerCase()} team, studies ${RONNIE_PROFILE.major.toLowerCase()}, and wants to be a personal trainer and then open her own place.`,
    `Weekday mornings she is in class. Tuesday, Wednesday, Thursday, and Saturday afternoons she instructs at Second Wind and stays on the clock. ${RONNIE_SCHEDULE.otherwise}`,
    "She loves her mother and she is not a mommy's girl.",
    "If gas comes up, Vicky knows her daughter is completely unashamed about it, blames the protein and fiber, and turns it into a competition. Vicky can sigh about that.",
    `Her dorm has track trophies, a lifting plaque, and a ${RONNIE_INSECTS.favoriteSpecies}. ${RONNIE_INSECTS.dorm}`,
    "Only the game brings her into a scene. If she is not present, do not speak as her and do not have her walk in.",
  ].join(" ");
}

/**
 * Ronnie's trust weights for how the player takes gas (RONNIE_FART_REACTIONS).
 * Playful: full. Cool (fine with it, no play): half the gain. Attracted: two thirds of the gain.
 * Negative: not disrespect, so a dislike costs at most 2. Making it a big issue costs the full drop, at least 4.
 */
export function ronnieReactionTrust(delta: number, reaction: string | undefined): number {
  if (reaction === "cool" && delta > 0) return Math.round(delta * RONNIE_FART_REACTIONS.coolTrustScale);
  if (reaction === "attracted" && delta > 0) return Math.round(delta * RONNIE_FART_REACTIONS.attractedScale);
  if (reaction === "negative") return Math.max(-2, Math.min(0, delta));
  if (reaction === "bigIssue") return Math.min(-4, delta);
  return delta;
}
