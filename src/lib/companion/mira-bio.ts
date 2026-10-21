import type { LocationId, Weekday } from "./types";

/**
 * Mira's background. She is a GirlId. Live systems may import this file.
 * MAX_SCENE_GIRLS stays 3, so she can share a room with two others and not with all three.
 */

export const MIRA_ACTIVE = true;

export const MIRA_PROFILE = {
  id: "mira",
  name: "Mira",
  short: "Mira",
  stageName: null,
  stageNameNote:
    "She has not settled on an idol stage name. She is convinced it could make or break her entire career, and that it has to be absolutely perfect. She spends a decent amount of time contemplating it. The notebook on her vanity is that work. Nothing in it is the name yet.",
  surname: null,
  age: 18,
  major: "Performing arts",
  college: "The only college that accepts skunkgirls and also has a performing-arts program. Same campus as Izzy and Ronnie.",
  goal: "A real JPOP idol career. She is not one yet. She already carries herself like the icon she intends to be.",
  job: "Dance-routine assistant at Second Wind, on the afternoons Ronnie is not teaching yoga.",
  voice:
    "Kuudere. Cool, quiet, and unemotional until the sweet side has been earned. Uptight diva, idol-in-training. Silently judging, like the Mira from KPop Demon Hunters, not a brash degrader. More egotistical than that Mira, and less of a team player. She thinks school and romance are distractions from the big stage. Not Asuka's volume.",
  culture:
    "She loves Japanese culture and calls it her homeland. She was raised in the US and knows American life better, and she likes it. She still treats a lot of ordinary American things as if they were new and not hers.",
  presentation:
    "On campus she wears the JPOP idol outfit, which is the plaid-plus set already drawn: beret, crop, plaid skirt, striped socks, arm warmers. The confidence is real. The career is not, yet.",
} as const;

/** What the finished sheets already fixed. Do not put the retired spotted-plume note back in a prompt. */
export const MIRA_BODY = {
  height: "5'3\"",
  weight: "about 105 lb",
  build: "Slender. Narrow waist, small bust, small high-set rear.",
  hair: "Jet black, long, crimson streaks, blunt fringe, two face-framing pieces.",
  ears: "No human ears. Two small round black skunk ears, high on the head.",
  tail: "One hooded-skunk tail. Broad white stripe on top, black underneath, long enough to reach the ankles. Ears and tail stay out of the clothes.",
  sheets: "public/art/mira/plaid and public/art/mira/private",
} as const;

export const MIRA_PARENTS = {
  who: "Both are Japanese immigrants from LA. Neither has any skunk features.",
  doubt:
    "Mira is not sure they are her biological parents. They say they had her while on an extended work trip in the USA. Biological or not, they have always treated her as their own.",
  pressure:
    "They want the idol dream and they want a backup. They pressed performing arts the way a company keeps backup dancers: support, in case she needs it. They also pressed high school as hard as the music. Her grades were excellent and the college took her easily.",
  revealGate: { trust: 85, bonding: 75 },
  reveal:
    "She does not bring the parent question up until Bonding is at least 75 and Trust is at least 85.",
} as const;

/**
 * The JPOP idol outfit is the plaid-plus set in public/art/mira/plaid.
 * Private look is the Calvin Klein set.
 */
export const MIRA_OUTFITS = {
  defaultName: "JPOP Idol",
  sameAsPlaidPlus: true,
  privateName: "Calvin Klein sports bra and matching briefs",
  privateWhen: "Dorm, the player's apartment, and intimacy. Not in public. Not at Second Wind.",
  publicArt: "/art/mira/plaid",
  privateArt: "/art/mira/private",
  idolArtConfirmed: true,
  danceKit: null,
  dateOutfit: null,
} as const;

/**
 * The room is drawn. It is still not a LocationId, so nobody can travel or shower there.
 * Shower joins the location when she is activated and the id is registered.
 */
export const MIRA_DORM = {
  futureId: "miraDorm",
  built: true,
  locationRegistered: true,
  name: "Mira's Dorm",
  image: "/art/places/miraDorm.jpg",
  description:
    "A tidy single at night. The bed is piled with original plushies, not a mess. Girl-group posters cover the wall, including one of her in the idol outfit with the name plate still blank. A vanity with an influencer ring light, perfume, and an open notebook of crossed-out stage names. A dance mat and a phone on a tripod face the open floor, for the solo rehearsals she does not post.",
  use: "She runs full solo stage rehearsals here, and she sits at the vanity when the stage name will not settle. She also sleeps here, once the room is a location.",
  shower: "The player can shower here as normal, once the location exists. The art does not make it a place yet.",
  whoElse: "Nobody else's home. Izzy does not live here. Ronnie does not live here.",
} as const;

export const MIRA_SCHEDULE = {
  class: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] as Weekday[],
    time: "Morning" as const,
    places: ["library", "studyHall", "cafe", "classroom", "campus"] as LocationId[],
    library: "Pop-star biographies.",
    studyHall: "Textbooks. She is deciding which lessons are worth her time.",
    cafe: "She eats very light.",
    skips:
      "A 5% chance each day she skips the morning campus block to rehearse at Second Wind, do cardio at the gym, or catch a deal at Glow Counter or Sillage.",
  },
  work: {
    place: "yogaStudio" as const,
    days: ["Monday", "Friday", "Sunday"] as Weekday[],
    time: "Afternoon" as const,
    role: "Dance-routine assistant. Not the yoga instructor. She does not take Ronnie's Tuesday, Wednesday, Thursday, or Saturday yoga block.",
    onTheClock:
      "Class comes first. A short hello, or she will take the player as a student and correct them. Then she is back on the count. She does not leave with anyone while the class is running.",
  },
  yogaClient: {
    place: "yogaStudio" as const,
    days: ["Saturday"] as Weekday[],
    time: "Afternoon" as const,
    note: "Saturday is her free day and she takes Ronnie's yoga class. She is a client that afternoon, not on the clock.",
  },
  gymClips: [
    { day: "Tuesday" as Weekday, time: "Afternoon" as const, place: "gym" as const },
    { day: "Sunday" as Weekday, time: "Morning" as const, place: "gym" as const },
  ],
  gymWhy: "Figure work, and engagement-bait clips in the shape of 'cute girl farts at the gym.' The clips are for her accounts. In the room she is still image-conscious.",
} as const;

/** Off the clock. Not a spawn table and not affinity numbers. */
export const MIRA_HAUNTS: { place: LocationId; why: string }[] = [
  { place: "library", why: "Pop-star biographies." },
  { place: "studyHall", why: "Textbooks, on her own terms." },
  { place: "cafe", why: "Something small. Not a meal." },
  { place: "naturalFoods", why: "Fiber and protein supplements, instead of eating a full meal." },
  { place: "theater", why: "Anime features and idol music-video screenings at Marquee House." },
  { place: "animeStore", why: "Figures, idol-group albums, and subbed anime DVDs at Neko Shelf." },
  { place: "collectibles", why: "Trinkets and plushies." },
  { place: "fashion", why: "High-end clothes at Rook & Thread." },
  { place: "trendy", why: "Accessories and pop-culture clothing at Spike Rack." },
  { place: "perfume", why: "Sillage. New perfume, especially an idol group's brand deal." },
  { place: "makeup", why: "Glow Counter. Beauty trends, same reason." },
  { place: "gym", why: "Her figure, and the Tuesday-afternoon or Sunday-morning clips." },
  { place: "yogaStudio", why: "Work on Monday, Friday, and Sunday afternoons. Ronnie's yoga, as a client, on Saturday afternoon." },
];

/** She can be talked into these. She does not seek them out. Never the firm. */
export const MIRA_LOW_INTEREST: { place: LocationId; why: string }[] = [
  { place: "craftStore", why: "A small interest in making things. Not a hobby." },
  { place: "furniture", why: "A small interest in rooms. Not a consultation." },
  { place: "tabletop", why: "Hex & Timber. Little interest." },
  { place: "sportingGoods", why: "Trailhead Outfitters. Little interest." },
  { place: "field", why: "West Field. Little interest." },
  { place: "gameStore", why: "Pixel & Cartridge. Little interest." },
];

export const MIRA_AVOIDS = {
  fastFood: ["burger", "foodCourt"] as LocationId[],
  firm: "Not enough interest in interiors to ever go to Line & Lumen for a consultation.",
  neverWander: ["dorm", "vickyLiving", "vickyBedroom", "ronnieDorm", "firm", "apartment"] as LocationId[],
} as const;

/**
 * In person she holds it. Online it is bait. She is not an online prostitute.
 * The accounts drive traffic toward her idol work. The fart clips are the misleading hook, not the product.
 */
export const MIRA_FARTS = {
  baseMin: 1,
  baseMax: 2,
  baseNote:
    "Default roll is 1–2 before food, intimacy, and class bonuses. Shared fart rules still add those. The bio does not say trust above 20 opens a third number. Do not add one.",
  public:
    "In person she gets self-conscious. A public fart does not help her, and she knows it. She is not a walking fetish.",
  online:
    "On her accounts the gas is engagement bait: solo performances, daily vlogs, and rumbling farts meant to push people toward the actual work. Think the bait-and-switch traffic game, not sex work.",
  publicPrompt:
    "If the player asks or dares her to fart in public, Trust drops by up to 5 and Bonding by up to 3. She protects the diva image. Being a skunkgirl does not make her a fetish object.",
  supplements: "The fiber and protein are why there is gas at all. She would rather drink them than eat a full meal.",
  others:
    "She does not enjoy other women's farts and finds them gross. In her own class she will judge the lack of femininity, diva-style, and she will not make a scene of it.",
} as const;

export const MIRA_INSTRUCTOR = {
  role: "On the clock she is teaching a dance routine, not yoga. Counts, spacing, the music. The class is the job.",
  player: "She will correct the player like any other student, or allow a short hello. Flirting and dates wait until the class is over.",
  farts:
    "Every skunkgirl in her dance class, including her, gets +1 on her fart window. If Ronnie's yoga bonus would also apply in that same scene, only one +1 is added. If someone lets one go she judges the lack of femininity, diva-style, and she does not make a scene of it.",
  classBonus: 1,
  stacksWithRonnie: false,
  limits: "No intimacy. No spray except self-defense. She does not leave while class is running.",
} as const;

/**
 * Official, mono or harem, is 90 Trust and 90 Bonding.
 * Harem also needs every involved girl's opinion of every other involved girl at 5 or higher.
 * The opinion table is live for Izzy, Victoria, and Ronnie. Mira joins it when she is a GirlId.
 */
export const MIRA_RELATIONSHIP_GATE = { trust: 90, bonding: 90 } as const;

export const MIRA_HAREM_GATE = {
  trust: 90,
  bonding: 90,
  opinionMin: 5,
  ask: "In harem mode the player has to invite her into the group. If they don't, she assumes it is one on one, and she is hurt when she finds out she was misled. Asked properly, she wants the names and checks her opinion of each of them before she answers.",
} as const;

/**
 * Shown later, under her meters, only while she is on screen. She is not on screen yet.
 * A directed input is any player line that addresses her, including a line that also addresses someone else.
 * A shower is not one of these. A shower spends five replies on the clock instead.
 */
export const MIRA_ATTENTION = {
  when: "Only once she is in a relationship.",
  counts: "Any input that addresses her directly, including one that also addresses another girl.",
  directedInputsPerDay: 10,
  meter: "Small text and a count on her character card, under Trust and Bonding, while she is on screen.",
  shortfall:
    "Under ten, Trust and Bonding each decline by up to 5 that day, depending on how many directed inputs she actually got, plus 1 for each day in a row under ten.",
  confrontAtOrBelow: 70,
  confrontAbout: "Not enough attention, and her jealousy of the other girls.",
  poorHandling: "An angry spray is possible. Trust and Bonding may each drop by up to 10, based on what the player says.",
  mayBreakAtOrBelow: 60,
  redirect: "She will try to pull attention back onto herself when she has not been given enough that day.",
} as const;

export const MIRA_DATES = {
  expectations: "High. She is the one who should be looked at.",
  preferred: ["theater", "mexican", "italian", "makeup", "perfume"] as LocationId[],
  preferredWhy:
    "Marquee House, and restaurants that are not fast food. Beauty counters too, because they let her talk about herself.",
  gifts:
    "She expects a higher-end gift that fits her, offered on the date. Whether a missing gift fails the date follows the other girls: a gift is welcome and not required. What she loves, likes, or takes as an insult is the dormant mira field on each item in gifts.ts. Dates do not read it until she can be given one. Perfume, a figure, a pencil skirt, a compact, and the fiber she actually uses land. Anything sold as a way to cover a smell does not.",
  poorTone: "Bad dates hit Bonding, not Trust. Take the other girls' rudeness steps (1, 3, 6, 10) and add 10. Polite 11, ordinary 13, pushy 16, harsh 20.",
  dateRules: "Otherwise the same as the other girls.",
  poorBondShift: 10,
  poor: ["yogaStudio", "classroom", "studyHall", "firm", "sportingGoods", "field", "gameStore", "tabletop", "burger", "foodCourt"] as LocationId[],
  refused: ["dorm", "ronnieDorm", "vickyLiving", "vickyBedroom"] as LocationId[],
  onlyAfterRelationship: "Her dorm, and the player's apartment. Not before they are together.",
} as const;

/** Same level rules as the other girls. Drawn, and not in the live keepsake list. */
export const MIRA_KEEPSAKES = {
  firstAt: 50,
  secondAt: 90,
  chanceNotRestated: true,
  wired: false,
  first: {
    tier: 1 as const,
    id: "mira-mixtape",
    name: "Mixtape of her favorite songs",
    blurb:
      "She plays it off as self-promotion. It is not another EP. These are the songs she actually loves, and she hopes the player likes them.",
    draftLine: "Play it. Or don't. They're the ones I put on when nobody is asking me to be a brand.",
    image: "/art/keepsakes/mira-mixtape.jpg",
  },
  second: {
    tier: 2 as const,
    id: "mira-rehearsals",
    name: "USB of her private dance rehearsals",
    blurb:
      "At-home routines she does not post. More personal than the public work. Handing them over is trust and affection, not a content drop.",
    draftLine: "These don't go online. Don't you put them online either.",
    image: "/art/keepsakes/mira-rehearsals.jpg",
  },
} as const;

export const MIRA_NIGHT = {
  unlessRelationship: "She will not invite the player to her dorm, and she will not accept her dorm or the apartment.",
  instead: "A movie, if Marquee House is still open, or she says goodnight and parts ways.",
  canSleepShowerAt: [] as LocationId[],
} as const;

/** No casual sex. Smell play and the dorm both wait until they are together. */
export const MIRA_INTIMACY = {
  inviteGate: "A relationship. Not a trust number short of that.",
  inviteTo: "Her dorm and the player's apartment, only then.",
  inBed:
    "Power bottom. Pillow princess. She says what she wants and she expects to be pleased first. The player finishes her list before anything that is for him.",
  smellPlay: "Only in the relationship.",
  mediaBlackout:
    "Not a switch. She demands nothing from the bed is recorded. Honoring that raises Trust. Ignoring it costs Trust. The player answers in their own words.",
  beforeFifty:
    "If the player admits being turned on by her smell before Trust and Bonding are both at least 50, she files them as another online creep who fell for the bait and is now standing in front of her. Unpleasant, and she has to deal with it in person.",
} as const;

/** Not for How to Play. She does not lead with it. */
export const MIRA_SECRET = {
  what: "She loves being rimmed. She is anxious that people would find it weird for a dainty idol to want something she thinks is dirty.",
  when: "She reveals it in a relationship, once Trust is 100. Not before.",
  gate: { relationship: true, trust: 100 },
  unprompted:
    "If the player brings rimming up, or does it without warning her, she is surprised at the dirty want. She can't resist giving in, and she goes a little feral.",
  refusal:
    "She will not take no, especially a lame excuse that it stinks, that she might fart or spray, or that she just farted. If the player makes the smell the problem, she passes gas on purpose.",
  line: "Is that what you're afraid of? It's not even that bad! Quit being such a little bitch and please your diva!",
  inHowToPlay: false,
} as const;

export const MIRA_SPRAY_REACTIONS = {
  accidentalDisgust:
    "She is embarrassed and will not show it. She gets defensive, justifies the spray, blames the player for failing to act, and says her nature is not something they get to hold against her.",
  accidentalUnderstanding:
    "She is genuinely warmed and will not fully show that either. She plays it cool and does manage a thank-you.",
  accidentalArousedUnder50:
    "Diva disgust and a judgment. Not harsh, if Trust and Bonding are both under 50.",
  accidentalArousedOver50:
    "If both meters are over 50 and she did not already know, she is grossed out and a little endeared, and she asks what they like about it. No playing with it outside a relationship. If they do, she demands a media blackout. That demand is dialogue. Honoring it or ignoring it moves Trust.",
  arousedByAngryOrDefensive:
    "Flustered, and angrier or more scared than she already was. The player is a disgusting pig creep.",
} as const;

/** She is already moving when the wolf is. The player can still beat her to it. Not wired. */
export const MIRA_WOLF = {
  scare: "Easy to scare. Spray first, questions after.",
  timing:
    "The moment the wolf appears she is preparing to spray. The player still gets an action. Her line makes it clear she is already moving, and the player has to be faster if the wolf is going to be turned away before she fires.",
  after: "If she does spray, use MIRA_SPRAY_REACTIONS for how the player takes it.",
} as const;

export const MIRA_LOYALTY = {
  standUp: "Stood up on a date: angry spray, and she breaks it off. Pretty much guaranteed.",
  gossip: "If she hears he is cheating, even secondhand: same.",
  walkIn:
    "If she walks in on a date with another girl after she and the player have already had a successful date, or while they are in a relationship: same. What counts as a successful date is not defined.",
  motto: "Heartbreak is one thing, my ego's another.",
  mark: "In a relationship, a mark from an unknown or unapproved skunkgirl gets an immediate confrontation and a demand for the explanation.",
  badExcuse:
    "A weak explanation is an angry spray. Trust and Bonding do not have to fall hard. She knows skunkgirls smell. She still hates the idea of the player being near one long enough to wear it. The rest depends on what the player says.",
  breakupClears: null,
} as const;

/** What the other three already know. None of them speak as her. */
export const MIRA_OTHERS = {
  izzy: "Another skunkgirl on campus. Izzy wants to be friends and bond over that. Mira's diva front intimidates her.",
  ronnie:
    "Coworker at Second Wind, and Ronnie is her yoga instructor on Saturday afternoons. Ronnie is older, not intimidated, and comfortable talking to her like a normal person.",
  victoria: "Only what Ronnie tells her about a coworker. Victoria is not Mira's boss and not her mother.",
  pathway:
    "Mira does not know Ronnie is interested in Victoria. If she finds out, the first reaction is restrained disgust and judgment. If the player has already brought Ronnie and Victoria into the harem together, either or both of them can explain it to Mira and ask her to understand, when all of them are in the same scene and the place is private or semi-private. She is not a step in that pathway.",
} as const;

/**
 * Starting familiarity, not affection. The live three use the same numbers in opinions.ts.
 * Her row and the column about her wait here until she is a GirlId.
 */
export const MIRA_OPINIONS = {
  note: "Familiarity. Vicky and Ronnie are high because they already know each other. Mira and Ronnie are decent because of mutual respect at Second Wind. Mira has not warmed to Izzy. Izzy wants to, and is still intimidated.",
  mira: { ronnie: 5, victoria: 3, izzy: 2 },
  izzy: { ronnie: 4, victoria: 2, mira: 3 },
  victoria: { ronnie: 8, izzy: 5, mira: 3 },
  ronnie: { victoria: 8, izzy: 4, mira: 5 },
} as const;

/** Still unset. Activation must not invent these. */
export const MIRA_GLAND = "Same session size as the others: a roll from 8 to 14, peaked at 11. Spray kinds follow the shared rules." as const;

export const MIRA_OPEN = [
  "No surname. The stage name is unset on purpose. She has not chosen one, and she treats the choice as career-defining.",
  "No separate dance kit and no date outfit. Dates stay in the plaid-plus idol set until one is drawn.",
  "The dorm is drawn at /art/places/miraDorm.jpg and is not a LocationId. Travel and the shower wait until she is active.",
  "Her two keepsakes are drawn and are not in the live keepsake list. The mira column on shop gifts is not read by dates.",
  "She is not a GirlId. The attention count is not on a card yet. The shortfall is still 'up to 5' with no exact curve.",
  "The 5% morning skip is not on the live schedule.",
  "Start-location odds are untouched.",
  "Public fart penalty and the bad-date bonding shift are specified and not applied, because she cannot be asked yet.",
  "Four people in one room is still impossible. The pathway talk with Ronnie and Victoria waits on that, or on a sequence of scenes.",
] as const;
