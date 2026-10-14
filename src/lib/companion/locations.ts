import type { LocationId, OutfitId, TimeOfDay } from "./types";

export interface LocationDef {
  id: LocationId;
  name: string;
  what: string;
  blurb: string;
  group: "campus" | "town" | "work" | "private";
  minTrust: number;
  image: string;
  defaultOutfit: OutfitId;
  inviteOnly?: boolean;
}

export const LOCATIONS: Record<LocationId, LocationDef> = {
  library: {
    id: "library",
    name: "Campus Library",
    what: "The college library — quiet stacks, study carrels, and a history aisle Izzy lives in.",
    blurb: "History stacks, dust, and a lingering musk.",
    group: "campus",
    minTrust: 0,
    image: "/art/places/library.jpg",
    defaultOutfit: "casual",
  },
  studyHall: {
    id: "studyHall",
    name: "Study Hall",
    what: "A campus study hall: long tables, green lamps, and people pretending to be productive.",
    blurb: "Green lamps and the quiet grind.",
    group: "campus",
    minTrust: 8,
    image: "/art/places/studyHall.jpg",
    defaultOutfit: "casual",
  },
  classroom: {
    id: "classroom",
    name: "Lecture Hall",
    what: "A college lecture hall — rows of desks, a whiteboard, afternoon class after everyone else left.",
    blurb: "Afternoon light on empty desks.",
    group: "campus",
    minTrust: 8,
    image: "/art/places/classroom.jpg",
    defaultOutfit: "casual",
  },
  cafe: {
    id: "cafe",
    name: "Campus Cafe",
    what: "The on-campus coffee shop: espresso machine, pastry case, tiny tables.",
    blurb: "Pastries, steam, and a table for two.",
    group: "campus",
    minTrust: 10,
    image: "/art/places/cafe.jpg",
    defaultOutfit: "casual",
  },
  campus: {
    id: "campus",
    name: "The Quad",
    what: "The college's outdoor central lawn — brick walkways, oak trees, benches, students cutting between classes. It used to have a firepit. Rising insurance costs after the Texas A&M bonfire disaster made the college board remove the pit and ban any burning on the property.",
    blurb: "Brick, oaks, and late sun.",
    group: "campus",
    minTrust: 8,
    image: "/art/places/campus.jpg",
    defaultOutfit: "campus",
  },
  trail: {
    id: "trail",
    name: "Nature Trail",
    what: "The wooded hiking path behind campus: pines, a creek crossing, dirt switchbacks.",
    blurb: "Where her skunk-sense actually helps.",
    group: "campus",
    minTrust: 18,
    image: "/art/places/trail.jpg",
    defaultOutfit: "campus",
  },
  dorm: {
    id: "dorm",
    name: "Izzy's Dorm",
    what: "Her actual dorm room on campus — unmade bed, laundry piles, figures, and her smell in the walls.",
    blurb: "Untidy, lived-in, and hers.",
    group: "private",
    minTrust: 45,
    image: "/art/places/dorm.jpg",
    defaultOutfit: "lounge",
    inviteOnly: true,
  },
  mexican: {
    id: "mexican",
    name: "Casa Luna",
    what: "A sit-down Mexican restaurant in town. Tacos, beans, extra salsa. Her favorite.",
    blurb: "Fiber-forward. Consequences follow.",
    group: "town",
    minTrust: 22,
    image: "/art/places/mexican.jpg",
    defaultOutfit: "casual",
  },
  burger: {
    id: "burger",
    name: "Shake & Stack",
    what: "Burger and milkshake fast food joint. Burgers, shakes, fries, vinyl booths.",
    blurb: "Too much sugar and she will steal fries.",
    group: "town",
    minTrust: 18,
    image: "/art/places/burger.jpg",
    defaultOutfit: "casual",
  },
  mall: {
    id: "mall",
    name: "Westgate Mall",
    what: "The local indoor shopping mall — skylight atrium and a ring of stores. The food court and specialty shops live here too.",
    blurb: "Storefronts and people-watching.",
    group: "town",
    minTrust: 28,
    image: "/art/places/mall.jpg",
    defaultOutfit: "campus",
  },
  foodCourt: {
    id: "foodCourt",
    name: "Food Court",
    what: "The mall food court: a ring of counters (teriyaki, pizza, pretzels) and sticky tables under the skylight.",
    blurb: "Too many options. She wants all of them.",
    group: "town",
    minTrust: 28,
    image: "/art/places/mall.jpg",
    defaultOutfit: "casual",
  },
  gameStore: {
    id: "gameStore",
    name: "Pixel & Cartridge",
    what: "A video game shop inside the mall. New releases, used cases, retro wall.",
    blurb: "Retro walls and arguments about box art.",
    group: "town",
    minTrust: 28,
    image: "/art/places/gameStore.jpg",
    defaultOutfit: "campus",
  },
  animeStore: {
    id: "animeStore",
    name: "Neko Shelf",
    what: "The mall's anime store. Figures, manga, tapestries, an OP looping on a TV.",
    blurb: "Figures, tapestries, and Evangelion debates.",
    group: "town",
    minTrust: 28,
    image: "/art/places/animeStore.jpg",
    defaultOutfit: "campus",
  },
  collectibles: {
    id: "collectibles",
    name: "Collectibles Corner",
    what: "A mall collectibles shop — bins of old toys, Bionicle parts, random merch.",
    blurb: "Bionicle bins. Don't act surprised.",
    group: "town",
    minTrust: 30,
    image: "/art/places/animeStore.jpg",
    defaultOutfit: "campus",
  },
  fashion: {
    id: "fashion",
    name: "Rook & Thread",
    what: "A mall clothing store. Racks of actual outfits, fitting rooms, harsh lighting.",
    blurb: "Clothes she will call 'too try-hard' then try on.",
    group: "town",
    minTrust: 32,
    image: "/art/places/mall.jpg",
    defaultOutfit: "casual",
  },
  makeup: {
    id: "makeup",
    name: "Glow Counter",
    what: "A mall cosmetics counter / makeup store. Testers, mirrors, free samples.",
    blurb: "She mostly wants the free samples.",
    group: "town",
    minTrust: 32,
    image: "/art/places/mall.jpg",
    defaultOutfit: "casual",
  },
  trendy: {
    id: "trendy",
    name: "Spike Rack",
    what: "A mall alt store in the Hot Topic / Spencer's vein. Band tees, goth jewelry, gag gifts, posters, lava lamps, and a wall of sarcastic mugs.",
    blurb: "She will leave with a shirt she does not need.",
    group: "town",
    minTrust: 32,
    image: "/art/places/mall.jpg",
    defaultOutfit: "campus",
  },
  perfume: {
    id: "perfume",
    name: "Sillage",
    what: "A mall perfume boutique. Glass bottles, testers, and a joke at her expense.",
    blurb: "She already has a signature.",
    group: "town",
    minTrust: 35,
    image: "/art/places/mall.jpg",
    defaultOutfit: "dress",
  },
  tabletop: {
    id: "tabletop",
    name: "Hex & Timber",
    what: "A tabletop and board game store with a play lounge in the back. Strategy boxes on the wall, long tables, dice, and maps people actually play.",
    blurb: "She is hunting a new strategy game. The lounge is for people who will sit down.",
    group: "town",
    minTrust: 22,
    image: "/art/places/tabletop.jpg",
    defaultOutfit: "casual",
  },
  theater: {
    id: "theater",
    name: "Marquee House",
    what: "The mall movie theater. Ticket booth, popcorn, a dark auditorium.",
    blurb: "A dark room she can unclench in.",
    group: "town",
    minTrust: 30,
    image: "/art/places/theater.jpg",
    defaultOutfit: "casual",
  },
  apartment: {
    id: "apartment",
    name: "Your Apartment",
    what: "The player's one-bedroom apartment. Simple furnishings, light blue walls, dark grey carpet, a full-size mattress on a faux-wood bed frame, and a few music and movie posters. Left sparse on purpose so it can stand in as your own place.",
    blurb: "Light blue walls, grey carpet, and a bed that is yours.",
    group: "private",
    minTrust: 40,
    image: "/art/places/apartment.jpg",
    defaultOutfit: "lounge",
  },
  grocery: {
    id: "grocery",
    name: "Harbor Mart",
    what: "A regular grocery store. Produce, snacks, fluorescent aisles.",
    blurb: "'Just one more' bag of chips.",
    group: "town",
    minTrust: 16,
    image: "/art/places/grocery.jpg",
    defaultOutfit: "campus",
  },
  naturalFoods: {
    id: "naturalFoods",
    name: "Root & Grain",
    what: "A natural foods / bulk grocery. Beans, fiber, overpriced granola.",
    blurb: "Fiber heaven. She is unreasonably excited.",
    group: "town",
    minTrust: 16,
    image: "/art/places/grocery.jpg",
    defaultOutfit: "campus",
  },
  sportingGoods: {
    id: "sportingGoods",
    name: "Trailhead Outfitters",
    what: "An outdoor sporting goods store. Tents, boots, hiking packs. She works here as a sales clerk.",
    blurb: "Skunk knowledge, hiking-pack sales.",
    group: "work",
    minTrust: 20,
    image: "/art/places/sportingGoods.jpg",
    defaultOutfit: "work",
  },
  vickyLiving: {
    id: "vickyLiving",
    name: "Vicky's Living Room",
    what: "Victoria's living room — floral loveseat, a rustic coffee table with a design book left open, fake plants, everything squared away.",
    blurb: "Organized, floral, and hers.",
    group: "private",
    minTrust: 45,
    image: "/art/places/vickyLiving.jpg",
    defaultOutfit: "work",
    inviteOnly: true,
  },
  vickyBedroom: {
    id: "vickyBedroom",
    name: "Vicky's Bedroom",
    what: "Victoria's bedroom. A king bed, floral and heart pillows, curtains drawn around it. Quiet and deliberate.",
    blurb: "Curtains, pillows, and no mess.",
    group: "private",
    minTrust: 55,
    image: "/art/places/vickyBedroom.jpg",
    defaultOutfit: "work",
    inviteOnly: true,
  },
  craftStore: {
    id: "craftStore",
    name: "Hearth & Hobby",
    what: "A big craft and home store. Florals, frames, fabric bolts, wreaths. Victoria treats it like a second office.",
    blurb: "Fabric, frames, and a woman with a plan.",
    group: "town",
    minTrust: 0,
    image: "/art/places/craftStore.jpg",
    defaultOutfit: "work",
  },
  italian: {
    id: "italian",
    name: "Osteria Vale",
    what: "A high-end Italian restaurant. White cloth, low light, a menu she actually respects.",
    blurb: "A table worth dressing for.",
    group: "town",
    minTrust: 30,
    image: "/art/places/italian.jpg",
    defaultOutfit: "dress",
  },
  furniture: {
    id: "furniture",
    name: "Room & Line",
    what: "A large furniture showroom of staged rooms. Sofas, lamps, and layouts Victoria cannot walk past without correcting.",
    blurb: "Showrooms she will redecorate in her head.",
    group: "town",
    minTrust: 16,
    image: "/art/places/furniture.jpg",
    defaultOutfit: "work",
  },
  firm: {
    id: "firm",
    name: "Line & Lumen",
    what: "Reception at an interior-design consulting firm. A wood desk, dried branches, fabric swatches, a design book, pale walls. Victoria works this desk on weekday afternoons.",
    blurb: "A quiet desk, and she is on the clock.",
    group: "work",
    minTrust: 0,
    image: "/art/places/firm.jpg",
    defaultOutfit: "work",
  },
  gym: {
    id: "gym",
    name: "Campus Gym",
    what: "The college weight room. A loaded free-weight rack, two bench-press benches, mirrors, and rubber floors. It locks up at night.",
    blurb: "Racks, benches, and someone already mid-set.",
    group: "campus",
    minTrust: 0,
    image: "/art/places/gym.jpg",
    defaultOutfit: "campus",
  },
  yogaStudio: {
    id: "yogaStudio",
    name: "Second Wind",
    what: "A yoga and pilates studio just off campus. Oak floors, a barre, mats, and soft north light. Veronica works here. It closes at night.",
    blurb: "Mats, a barre, and a quiet floor.",
    group: "work",
    minTrust: 0,
    image: "/art/places/yogaStudio.jpg",
    defaultOutfit: "campus",
  },
  field: {
    id: "field",
    name: "West Field",
    what: "The campus athletic field. A red running track around a grass infield, empty bleachers, light poles. It stays open after dark.",
    blurb: "Lanes, grass, and late sun.",
    group: "campus",
    minTrust: 8,
    image: "/art/places/field.jpg",
    defaultOutfit: "campus",
  },
  ronnieDorm: {
    id: "ronnieDorm",
    name: "Ronnie's Dorm",
    what: "Veronica's dorm room. A trophy shelf of track awards and a lifting plaque, finish-line and medal photos, a blue-morpho and a birdwing in frames, an insect terrarium, and a jester-hood plush on the bed.",
    blurb: "Trophies, butterflies, and her bed.",
    group: "private",
    minTrust: 45,
    image: "/art/places/ronnieDorm.jpg",
    defaultOutfit: "lounge",
    inviteOnly: true,
  },
};

export const LOCATION_GROUPS: { id: LocationDef["group"]; label: string }[] = [
  { id: "campus", label: "Campus" },
  { id: "town", label: "Around Town" },
  { id: "work", label: "Work" },
  { id: "private", label: "Private" },
];

export const FIRST_MEETS: LocationId[] = ["library", "studyHall", "trail", "animeStore", "craftStore", "gym"];

export function placeImage(id: LocationId) {
  return LOCATIONS[id]?.image ?? "/art/places/library.jpg";
}

const EXTRA_ALIASES: Record<string, LocationId> = {
  library: "library",
  stacks: "library",
  "history aisle": "library",
  "study hall": "studyHall",
  study: "studyHall",
  classroom: "classroom",
  lecture: "classroom",
  "lecture hall": "classroom",
  cafe: "cafe",
  coffee: "cafe",
  "campus cafe": "cafe",
  quad: "campus",
  campus: "campus",
  outdoors: "campus",
  trail: "trail",
  "nature trail": "trail",
  woods: "trail",
  dorm: "dorm",
  "dorm room": "dorm",
  "her dorm": "dorm",
  "izzy dorm": "dorm",
  "izzys dorm": "dorm",
  "izzy's dorm": "dorm",
  mexican: "mexican",
  "mexican restaurant": "mexican",
  tacos: "mexican",
  "casa luna": "mexican",
  burger: "burger",
  burgers: "burger",
  milkshake: "burger",
  "shake stack": "burger",
  mall: "mall",
  "food court": "foodCourt",
  "game store": "gameStore",
  games: "gameStore",
  "video games": "gameStore",
  "video game store": "gameStore",
  "neko shelf": "animeStore",
  nekoshelf: "animeStore",
  anime: "animeStore",
  "anime store": "animeStore",
  "pixel and cartridge": "gameStore",
  casaluna: "mexican",
  collectibles: "collectibles",
  fashion: "fashion",
  clothes: "fashion",
  makeup: "makeup",
  trendy: "trendy",
  "spike rack": "trendy",
  "hot topic": "trendy",
  spencers: "trendy",
  "spencer's": "trendy",
  tabletop: "tabletop",
  "board game": "tabletop",
  "board games": "tabletop",
  "board game store": "tabletop",
  "game lounge": "tabletop",
  "hex and timber": "tabletop",
  "hex timber": "tabletop",
  perfume: "perfume",
  theater: "theater",
  movies: "theater",
  movie: "theater",
  grocery: "grocery",
  "grocery store": "grocery",
  "natural foods": "naturalFoods",
  work: "sportingGoods",
  "sporting goods": "sportingGoods",
  trailhead: "sportingGoods",
  apartment: "apartment",
  "my apartment": "apartment",
  "my place": "apartment",
  "your apartment": "apartment",
  "vicky living": "vickyLiving",
  "vicky's living room": "vickyLiving",
  "victoria living": "vickyLiving",
  "her living room": "vickyLiving",
  "vicky bedroom": "vickyBedroom",
  "vicky's bedroom": "vickyBedroom",
  "victoria bedroom": "vickyBedroom",
  "her bedroom": "vickyBedroom",
  "craft store": "craftStore",
  hobby: "craftStore",
  "hearth hobby": "craftStore",
  "hearth and hobby": "craftStore",
  italian: "italian",
  osteria: "italian",
  "italian restaurant": "italian",
  furniture: "furniture",
  "furniture store": "furniture",
  showroom: "furniture",
  "room and line": "furniture",
  firm: "firm",
  consulting: "firm",
  "consulting firm": "firm",
  "line and lumen": "firm",
  "line & lumen": "firm",
  reception: "firm",
  "reception desk": "firm",
  "vicky's work": "firm",
  "vickys work": "firm",
  "victoria's work": "firm",
  "her office": "firm",
  office: "firm",
  gym: "gym",
  "campus gym": "gym",
  "weight room": "gym",
  "the gym": "gym",
  yoga: "yogaStudio",
  pilates: "yogaStudio",
  "yoga studio": "yogaStudio",
  "pilates studio": "yogaStudio",
  "second wind": "yogaStudio",
  field: "field",
  track: "field",
  "the track": "field",
  "athletic field": "field",
  "west field": "field",
  "running track": "field",
  "ronnie dorm": "ronnieDorm",
  "ronnies dorm": "ronnieDorm",
  "ronnie's dorm": "ronnieDorm",
  "veronica dorm": "ronnieDorm",
  "veronica's dorm": "ronnieDorm",
};

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

let aliasIndex: Map<string, LocationId> | null = null;

function index() {
  if (aliasIndex) return aliasIndex;
  const map = new Map<string, LocationId>();
  for (const loc of Object.values(LOCATIONS)) {
    map.set(norm(loc.id), loc.id);
    map.set(norm(loc.name), loc.id);
  }
  for (const [k, v] of Object.entries(EXTRA_ALIASES)) map.set(norm(k), v);
  aliasIndex = map;
  return map;
}

export function resolvePlace(query: string): LocationId | null {
  const q = norm(query);
  if (!q) return null;
  const map = index();
  const hit = map.get(q);
  if (hit) return hit;
  let best: { id: LocationId; len: number } | null = null;
  for (const [alias, id] of map) {
    if (alias.length < 3) continue;
    if (alias.includes(q) || q.includes(alias)) {
      if (!best || alias.length > best.len) best = { id, len: alias.length };
    }
  }
  return best?.id ?? null;
}

export function asLocationId(value: unknown): LocationId | null {
  if (value == null || value === false) return null;
  const raw = String(value).trim();
  if (!raw || raw === "null" || raw === "undefined" || raw === "none") return null;
  return resolvePlace(raw);
}

export function placeOf(id: string | null | undefined) {
  return LOCATIONS[asLocationId(id) ?? "library"] ?? LOCATIONS.library;
}

/** Still open after dark. Everything else locks up. */
const NIGHT_OPEN = new Set<LocationId>([
  "trail",
  "campus",
  "field",
  "dorm",
  "ronnieDorm",
  "apartment",
  "vickyLiving",
  "vickyBedroom",
  "theater",
]);

const SLEEP_AT = new Set<LocationId>(["apartment", "dorm", "vickyBedroom", "ronnieDorm"]);

export function openTonight(id: LocationId, time: TimeOfDay = "Night") {
  if (time !== "Night") return true;
  return NIGHT_OPEN.has(id);
}

export function canSleepNow(id: LocationId, time: TimeOfDay) {
  return SLEEP_AT.has(id) && (time === "Evening" || time === "Night");
}
