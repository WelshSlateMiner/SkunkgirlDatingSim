import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/spray-DHzJQ-Ag.js
var FART_RE = /\b(fart(?:ed|ing|s)?|toot(?:ed|ing|s)?|poot(?:ed|ing|s)?|flatulence|flatu(?:s|lent)|passed (?:gas|wind)|passing gas|rips? (?:one|it|a)|ripped (?:one|it|a)|let(?:s|ting)?(?: one| it)? (?:rip|go|slip|out)|a (?:quiet |wet |little |soft |short |unbothered )?(?:puff|toot|brap)\b|puffs?\b|puffed\b|lift(?:s|ed|ing)? (?:a |her )?cheek|unclench(?:ed|es|ing)?|couldn'?t hold it|hold it in|from (?:her )?behind|digestive tract|stomach (?:voted|joined|won|made)|beans? (?:hit|landed|won)|season(?:ed)? .{0,24}(?:aisle|shelf|store)|gassed (?:the |this )?|that one had architecture|aisle will never recover|open a window for the civilians|lean(?:s|ed)? .{0,40}(?:cheek|rip|toot|fart))\b|p+f+t+|br+a+p+|thbb?t+|pbb+t+|\*+[^*]{0,40}(fart|toot|poot|pfft|brap|puff)[^*]{0,40}\*+/i;
function mentionsFart(text) {
	return FART_RE.test(text);
}
function resolveFx(turn) {
	if (!(Boolean(turn.pendingIntimateSpray) && !turn.sprayed && turn.fx !== "spray") && (turn.sprayed || turn.fx === "spray" || turn.expression === "spray")) return "spray";
	const blob = `${turn.dialogue ?? ""} ${turn.narration ?? ""} ${turn.inner ?? ""}`;
	if (turn.fx === "fart" || mentionsFart(blob)) return "fart";
	return turn.fx ?? "none";
}
var SEXUAL$1 = /\b(sex|fuck|cock|dick|pussy|clit|cum|moan|orgasm|naked|nude|kiss|lap|thigh|inside|hump|ride|suck|rim|masturb|jerk|stroke|penetrat|good boy|good girl|spank|ass|butt)\b/i;
/** Moan-tailed clips only when the fart is part of an intimate fetish beat, not a public or teasing toot. */
function intimateFetishFart(state, input, turn) {
	const blob = `${input.say} ${input.action} ${turn.dialogue ?? ""} ${turn.narration ?? ""}`;
	const sexual = SEXUAL$1.test(blob);
	const privatePlace = state.location === "dorm" || state.location === "apartment";
	const romantic = state.flags.romanceAccepted || state.bond === "romantic";
	const fetishOn = state.playerFartRole === "into" || state.flags.fartConverted || state.flags.sprayYield === "submit" || state.flags.sprayYield === "resist";
	if (sexual && (privatePlace || romantic || state.trust >= 55 && state.bonding >= 45)) return true;
	if (fetishOn && privatePlace && (romantic || state.bond === "close")) return true;
	return false;
}
/** Anywhere a skunkgirl can buy a meal. Casa Luna is the sit-down that fills her the most. */
var FOOD = /* @__PURE__ */ new Set([
	"cafe",
	"burger",
	"foodCourt",
	"grocery",
	"naturalFoods",
	"italian",
	"mexican"
]);
function readGut(card) {
	const fed = card?.fed === 2 ? 2 : card?.fed === 1 ? 1 : 0;
	return {
		streak: typeof card?.fartStreak === "number" ? card.fartStreak : 0,
		rest: typeof card?.fartRest === "number" ? card.fartRest : 0,
		big: typeof card?.fartBig === "number" ? card.fartBig : 0,
		fed
	};
}
function foodRank(place) {
	if (place === "mexican") return 2;
	return FOOD.has(place) ? 1 : 0;
}
function fedAfter(fed, place) {
	const rank = foodRank(place);
	return rank > fed ? rank : fed;
}
/** How many farts she may land before her body makes her stop. */
function fartCap(trust, fed) {
	const base = trust > 40 ? 3 : 2;
	return fed === 2 ? base + 2 : base;
}
/** Unasked farts. Food raises how often. Casa Luna raises it the most. A direct ask skips this. */
function fartChance(girl, trust, fed) {
	const izzy = girl !== "victoria";
	if (trust < 20) return 0;
	if (fed === 2) return izzy ? .7 : .5;
	if (fed === 1) return izzy ? .5 : .34;
	return izzy ? .32 : .14;
}
function canFartNow(gut, trust, place) {
	if (gut.rest > 0) return false;
	return gut.streak < fartCap(trust, fedAfter(gut.fed, place));
}
function afterFart(gut, trust, place, size, intimate) {
	const fed = fedAfter(gut.fed, place);
	const streak = gut.streak + 1;
	const big = size === 3 ? gut.big + 1 : 0;
	let rest = 0;
	if (streak >= fartCap(trust, fed)) rest = streak >= 3 ? 2 : 1;
	if (size === 3 && !(intimate && big < 2)) rest = Math.max(rest, 1);
	else if (size !== 3 && gut.big > 0) rest = Math.max(rest, 1);
	return {
		streak,
		rest,
		big,
		fed
	};
}
function tickQuiet(gut, place) {
	const fed = fedAfter(gut.fed, place);
	if (gut.rest > 0) {
		const rest = gut.rest - 1;
		return rest > 0 ? {
			streak: gut.streak,
			rest,
			big: gut.big,
			fed
		} : {
			streak: 0,
			rest: 0,
			big: 0,
			fed
		};
	}
	if (gut.streak > 0 || gut.big > 0) return {
		streak: 0,
		rest: 0,
		big: 0,
		fed
	};
	return {
		...gut,
		fed
	};
}
function clearFed(roster) {
	const next = { ...roster };
	for (const girl of ["izzy", "victoria"]) {
		const card = next[girl];
		if (!card) continue;
		if (!card.fed && !card.fartStreak && !card.fartRest && !card.fartBig) continue;
		next[girl] = {
			...card,
			fed: 0,
			fartStreak: 0,
			fartRest: 0,
			fartBig: 0
		};
	}
	return next;
}
function settleGuts(roster, present, place, focus, focusTrust, intimate, landed, dayReset) {
	let next = dayReset ? clearFed(roster) : { ...roster };
	const here = new Set(present);
	for (const girl of ["izzy", "victoria"]) {
		const card = next[girl];
		if (!card) continue;
		const gut = readGut(card);
		const base = dayReset ? {
			streak: 0,
			rest: 0,
			big: 0,
			fed: 0
		} : gut;
		if (!here.has(girl)) {
			next = {
				...next,
				[girl]: {
					...card,
					fed: base.fed
				}
			};
			continue;
		}
		const trust = girl === focus ? focusTrust : card.trust;
		const sizes = landed.filter((hit) => hit.girl === girl).map((hit) => hit.size);
		const gutNext = sizes.length ? afterFart(base, trust, place, sizes.reduce((max, size) => size > max ? size : max, 1), intimate) : tickQuiet(base, place);
		next = {
			...next,
			[girl]: {
				...card,
				fartStreak: gutNext.streak,
				fartRest: gutNext.rest,
				fartBig: gutNext.big,
				fed: gutNext.fed
			}
		};
	}
	return next;
}
function gutBrief(state) {
	const present = state.izzyHere === false ? [] : state.present ?? [];
	return (present.length ? present : [state.focus ?? "izzy"]).map((girl) => {
		const card = state.roster?.[girl];
		const gut = readGut(card);
		const trust = girl === (state.focus ?? "izzy") ? state.trust : card?.trust ?? 0;
		const fed = fedAfter(gut.fed, state.location);
		const cap = fartCap(trust, fed);
		const who = girl === "victoria" ? "Victoria" : "Izzy";
		const meal = fed === 2 ? state.location === "mexican" ? "She sat down at Casa Luna today, so her capacity is as high as it gets. A fart in this restaurant uses a large clip with no moan." : "She sat down at Casa Luna today, so her capacity stays high for the rest of the day." : fed === 1 ? "She has been somewhere that sells food today, so an unasked fart is more likely. The streak cap does not grow." : "No food stop yet today.";
		return `GUT ${who}: ${gut.rest > 0 ? `REST ${gut.rest}. Do not fart. fx none. Do not describe letting one go. If they asked, the reason is her body.` : `She may fart. This run is ${gut.streak} of ${cap}. Unasked rate about ${Math.round(fartChance(girl, trust, fed) * 100)}%. Not every reply. A direct request can be a yes inside this cap.`} ${meal}`;
	}).join("\n");
}
/** Drop a fart the body did not actually release, without claiming the tank is empty. */
function dropFartProse(girl, narration, dialogue) {
	const narr = mentionsFart(narration) ? "" : narration;
	if (!mentionsFart(dialogue)) return {
		narration: narr,
		dialogue
	};
	return {
		narration: narr,
		dialogue: dialogue.split(/(?<=[.!?])\s+/).map((sentence) => sentence.trim()).filter((sentence) => sentence && !mentionsFart(sentence)).join(" ").trim() || (girl === "victoria" ? "I'm listening. Go on." : "I'm here. Keep going.")
	};
}
var LOCATIONS = {
	library: {
		id: "library",
		name: "Campus Library",
		what: "The college library — quiet stacks, study carrels, and a history aisle Izzy lives in.",
		blurb: "History stacks, dust, and a lingering musk.",
		group: "campus",
		minTrust: 0,
		image: "/art/places/library.jpg",
		defaultOutfit: "casual"
	},
	studyHall: {
		id: "studyHall",
		name: "Study Hall",
		what: "A campus study hall: long tables, green lamps, and people pretending to be productive.",
		blurb: "Green lamps and the quiet grind.",
		group: "campus",
		minTrust: 8,
		image: "/art/places/studyHall.jpg",
		defaultOutfit: "casual"
	},
	classroom: {
		id: "classroom",
		name: "Lecture Hall",
		what: "A college lecture hall — rows of desks, a whiteboard, afternoon class after everyone else left.",
		blurb: "Afternoon light on empty desks.",
		group: "campus",
		minTrust: 8,
		image: "/art/places/classroom.jpg",
		defaultOutfit: "casual"
	},
	cafe: {
		id: "cafe",
		name: "Campus Cafe",
		what: "The on-campus coffee shop: espresso machine, pastry case, tiny tables.",
		blurb: "Pastries, steam, and a table for two.",
		group: "campus",
		minTrust: 10,
		image: "/art/places/cafe.jpg",
		defaultOutfit: "casual"
	},
	campus: {
		id: "campus",
		name: "The Quad",
		what: "The college's outdoor central lawn — brick walkways, oak trees, benches, students cutting between classes. It used to have a firepit. Rising insurance costs after the Texas A&M bonfire disaster made the college board remove the pit and ban any burning on the property.",
		blurb: "Brick, oaks, and late sun.",
		group: "campus",
		minTrust: 8,
		image: "/art/places/campus.jpg",
		defaultOutfit: "campus"
	},
	trail: {
		id: "trail",
		name: "Nature Trail",
		what: "The wooded hiking path behind campus: pines, a creek crossing, dirt switchbacks.",
		blurb: "Where her skunk-sense actually helps.",
		group: "campus",
		minTrust: 18,
		image: "/art/places/trail.jpg",
		defaultOutfit: "campus"
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
		inviteOnly: true
	},
	mexican: {
		id: "mexican",
		name: "Casa Luna",
		what: "A sit-down Mexican restaurant in town. Tacos, beans, extra salsa. Her favorite.",
		blurb: "Fiber-forward. Consequences follow.",
		group: "town",
		minTrust: 22,
		image: "/art/places/mexican.jpg",
		defaultOutfit: "casual"
	},
	burger: {
		id: "burger",
		name: "Shake & Stack",
		what: "Burger and milkshake fast food joint. Burgers, shakes, fries, vinyl booths.",
		blurb: "Too much sugar and she will steal fries.",
		group: "town",
		minTrust: 18,
		image: "/art/places/burger.jpg",
		defaultOutfit: "casual"
	},
	mall: {
		id: "mall",
		name: "Westgate Mall",
		what: "The local indoor shopping mall — skylight atrium and a ring of stores. The food court and specialty shops live here too.",
		blurb: "Storefronts and people-watching.",
		group: "town",
		minTrust: 28,
		image: "/art/places/mall.jpg",
		defaultOutfit: "campus"
	},
	foodCourt: {
		id: "foodCourt",
		name: "Food Court",
		what: "The mall food court: a ring of counters (teriyaki, pizza, pretzels) and sticky tables under the skylight.",
		blurb: "Too many options. She wants all of them.",
		group: "town",
		minTrust: 28,
		image: "/art/places/mall.jpg",
		defaultOutfit: "casual"
	},
	gameStore: {
		id: "gameStore",
		name: "Pixel & Cartridge",
		what: "A video game shop inside the mall. New releases, used cases, retro wall.",
		blurb: "Retro walls and arguments about box art.",
		group: "town",
		minTrust: 28,
		image: "/art/places/gameStore.jpg",
		defaultOutfit: "campus"
	},
	animeStore: {
		id: "animeStore",
		name: "Neko Shelf",
		what: "The mall's anime store. Figures, manga, tapestries, an OP looping on a TV.",
		blurb: "Figures, tapestries, and Evangelion debates.",
		group: "town",
		minTrust: 28,
		image: "/art/places/animeStore.jpg",
		defaultOutfit: "campus"
	},
	collectibles: {
		id: "collectibles",
		name: "Collectibles Corner",
		what: "A mall collectibles shop — bins of old toys, Bionicle parts, random merch.",
		blurb: "Bionicle bins. Don't act surprised.",
		group: "town",
		minTrust: 30,
		image: "/art/places/animeStore.jpg",
		defaultOutfit: "campus"
	},
	fashion: {
		id: "fashion",
		name: "Rook & Thread",
		what: "A mall clothing store. Racks of actual outfits, fitting rooms, harsh lighting.",
		blurb: "Clothes she will call 'too try-hard' then try on.",
		group: "town",
		minTrust: 32,
		image: "/art/places/mall.jpg",
		defaultOutfit: "casual"
	},
	makeup: {
		id: "makeup",
		name: "Glow Counter",
		what: "A mall cosmetics counter / makeup store. Testers, mirrors, free samples.",
		blurb: "She mostly wants the free samples.",
		group: "town",
		minTrust: 32,
		image: "/art/places/mall.jpg",
		defaultOutfit: "casual"
	},
	trendy: {
		id: "trendy",
		name: "Spike Rack",
		what: "A mall alt store in the Hot Topic / Spencer's vein. Band tees, goth jewelry, gag gifts, posters, lava lamps, and a wall of sarcastic mugs.",
		blurb: "She will leave with a shirt she does not need.",
		group: "town",
		minTrust: 32,
		image: "/art/places/mall.jpg",
		defaultOutfit: "campus"
	},
	perfume: {
		id: "perfume",
		name: "Sillage",
		what: "A mall perfume boutique. Glass bottles, testers, and a joke at her expense.",
		blurb: "She already has a signature.",
		group: "town",
		minTrust: 35,
		image: "/art/places/mall.jpg",
		defaultOutfit: "dress"
	},
	tabletop: {
		id: "tabletop",
		name: "Hex & Timber",
		what: "A tabletop and board game store with a play lounge in the back. Strategy boxes on the wall, long tables, dice, and maps people actually play.",
		blurb: "She is hunting a new strategy game. The lounge is for people who will sit down.",
		group: "town",
		minTrust: 22,
		image: "/art/places/tabletop.jpg",
		defaultOutfit: "casual"
	},
	theater: {
		id: "theater",
		name: "Marquee House",
		what: "The mall movie theater. Ticket booth, popcorn, a dark auditorium.",
		blurb: "A dark room she can unclench in.",
		group: "town",
		minTrust: 30,
		image: "/art/places/theater.jpg",
		defaultOutfit: "casual"
	},
	apartment: {
		id: "apartment",
		name: "Your Apartment",
		what: "The player's one-bedroom apartment. Simple furnishings, light blue walls, dark grey carpet, a full-size mattress on a faux-wood bed frame, and a few music and movie posters. Left sparse on purpose so it can stand in as your own place.",
		blurb: "Light blue walls, grey carpet, and a bed that is yours.",
		group: "private",
		minTrust: 40,
		image: "/art/places/apartment.jpg",
		defaultOutfit: "lounge"
	},
	grocery: {
		id: "grocery",
		name: "Harbor Mart",
		what: "A regular grocery store. Produce, snacks, fluorescent aisles.",
		blurb: "'Just one more' bag of chips.",
		group: "town",
		minTrust: 16,
		image: "/art/places/grocery.jpg",
		defaultOutfit: "campus"
	},
	naturalFoods: {
		id: "naturalFoods",
		name: "Root & Grain",
		what: "A natural foods / bulk grocery. Beans, fiber, overpriced granola.",
		blurb: "Fiber heaven. She is unreasonably excited.",
		group: "town",
		minTrust: 16,
		image: "/art/places/grocery.jpg",
		defaultOutfit: "campus"
	},
	sportingGoods: {
		id: "sportingGoods",
		name: "Trailhead Outfitters",
		what: "An outdoor sporting goods store. Tents, boots, hiking packs. She works here as a sales clerk.",
		blurb: "Skunk knowledge, hiking-pack sales.",
		group: "work",
		minTrust: 20,
		image: "/art/places/sportingGoods.jpg",
		defaultOutfit: "work"
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
		inviteOnly: true
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
		inviteOnly: true
	},
	craftStore: {
		id: "craftStore",
		name: "Hearth & Hobby",
		what: "A big craft and home store. Florals, frames, fabric bolts, wreaths. Victoria treats it like a second office.",
		blurb: "Fabric, frames, and a woman with a plan.",
		group: "town",
		minTrust: 0,
		image: "/art/places/craftStore.jpg",
		defaultOutfit: "work"
	},
	italian: {
		id: "italian",
		name: "Osteria Vale",
		what: "A high-end Italian restaurant. White cloth, low light, a menu she actually respects.",
		blurb: "A table worth dressing for.",
		group: "town",
		minTrust: 30,
		image: "/art/places/italian.jpg",
		defaultOutfit: "dress"
	},
	furniture: {
		id: "furniture",
		name: "Room & Line",
		what: "A large furniture showroom of staged rooms. Sofas, lamps, and layouts Victoria cannot walk past without correcting.",
		blurb: "Showrooms she will redecorate in her head.",
		group: "town",
		minTrust: 16,
		image: "/art/places/furniture.jpg",
		defaultOutfit: "work"
	},
	firm: {
		id: "firm",
		name: "Line & Lumen",
		what: "Reception at an interior-design consulting firm. A wood desk, dried branches, fabric swatches, a design book, pale walls. Victoria works this desk on weekday afternoons.",
		blurb: "A quiet desk, and she is on the clock.",
		group: "work",
		minTrust: 0,
		image: "/art/places/firm.jpg",
		defaultOutfit: "work"
	}
};
var LOCATION_GROUPS = [
	{
		id: "campus",
		label: "Campus"
	},
	{
		id: "town",
		label: "Around Town"
	},
	{
		id: "work",
		label: "Work"
	},
	{
		id: "private",
		label: "Private"
	}
];
var FIRST_MEETS = [
	"library",
	"studyHall",
	"trail",
	"animeStore",
	"craftStore"
];
var EXTRA_ALIASES = {
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
	office: "firm"
};
function norm(s) {
	return s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}
var aliasIndex = null;
function index() {
	if (aliasIndex) return aliasIndex;
	const map = /* @__PURE__ */ new Map();
	for (const loc of Object.values(LOCATIONS)) {
		map.set(norm(loc.id), loc.id);
		map.set(norm(loc.name), loc.id);
	}
	for (const [k, v] of Object.entries(EXTRA_ALIASES)) map.set(norm(k), v);
	aliasIndex = map;
	return map;
}
function resolvePlace(query) {
	const q = norm(query);
	if (!q) return null;
	const map = index();
	const hit = map.get(q);
	if (hit) return hit;
	let best = null;
	for (const [alias, id] of map) {
		if (alias.length < 3) continue;
		if (alias.includes(q) || q.includes(alias)) {
			if (!best || alias.length > best.len) best = {
				id,
				len: alias.length
			};
		}
	}
	return best?.id ?? null;
}
function asLocationId(value) {
	if (value == null || value === false) return null;
	const raw = String(value).trim();
	if (!raw || raw === "null" || raw === "undefined" || raw === "none") return null;
	return resolvePlace(raw);
}
function placeOf(id) {
	return LOCATIONS[asLocationId(id) ?? "library"] ?? LOCATIONS.library;
}
/** Still open after dark. Everything else locks up. */
var NIGHT_OPEN = /* @__PURE__ */ new Set([
	"trail",
	"campus",
	"dorm",
	"apartment",
	"vickyLiving",
	"vickyBedroom",
	"theater"
]);
var SLEEP_AT = /* @__PURE__ */ new Set([
	"apartment",
	"dorm",
	"vickyBedroom"
]);
function openTonight(id, time = "Night") {
	if (time !== "Night") return true;
	return NIGHT_OPEN.has(id);
}
function canSleepNow(id, time) {
	return SLEEP_AT.has(id) && (time === "Evening" || time === "Night");
}
var CASUAL = {
	embarrassed: "/art/izzy/embarrassed.webp",
	happy: "/art/izzy/happy.webp",
	idle: "/art/izzy/happy.webp",
	flirty: "/art/izzy/flirty.webp",
	laughing: "/art/izzy/laughing.webp",
	suspicious: "/art/izzy/suspicious.webp",
	shy: "/art/izzy/shy.webp",
	angry: "/art/izzy/angry.webp",
	infodump: "/art/izzy/infodump.webp",
	aroused: "/art/izzy/aroused.webp",
	thinking: "/art/izzy/thinking.webp",
	scheming: "/art/izzy/scheming.webp",
	spray: "/art/izzy/spray-angry-casual.webp"
};
var OUTFIT_IDLE = {
	casual: "/art/izzy/happy.webp",
	lounge: "/art/izzy/lounge.webp",
	campus: "/art/izzy/campus.webp",
	work: "/art/izzy/work.webp",
	dress: "/art/izzy/dress.webp",
	sleep: "/art/izzy/sleep.webp",
	lingerie: "/art/izzy/lingerie.webp",
	asuka: "/art/izzy/asuka.webp",
	mymy: "/art/izzy/mymy.webp"
};
var SPRAY_ANGRY = {
	casual: "/art/izzy/spray-angry-casual.webp",
	lounge: "/art/izzy/spray-angry-lounge.webp",
	campus: "/art/izzy/spray-angry-campus.webp",
	work: "/art/izzy/spray-angry-work.webp",
	dress: "/art/izzy/spray-angry-dress.webp",
	sleep: "/art/izzy/spray-angry-sleep.webp",
	lingerie: "/art/izzy/spray-angry-lingerie.webp",
	asuka: "/art/izzy/asuka-flirty.webp",
	mymy: "/art/izzy/mymy-flirty.webp"
};
var SPRAY_CONSENT = {
	casual: "/art/izzy/spray-consent-casual.webp",
	lounge: "/art/izzy/spray-consent-lounge.webp",
	campus: "/art/izzy/spray-consent-campus.webp",
	work: "/art/izzy/spray-consent-work.webp",
	dress: "/art/izzy/spray-consent-dress.webp",
	sleep: "/art/izzy/spray-consent-sleep.webp",
	lingerie: "/art/izzy/spray-consent-lingerie.webp",
	asuka: "/art/izzy/asuka-flirty.webp",
	mymy: "/art/izzy/mymy-flirty.webp"
};
var SPRAY_DEFENSIVE = {
	casual: "/art/izzy/spray-defensive-casual.webp",
	lounge: "/art/izzy/spray-defensive-lounge.webp",
	campus: "/art/izzy/spray-defensive-campus.webp",
	work: "/art/izzy/spray-defensive-work.webp",
	dress: "/art/izzy/spray-defensive-dress.webp",
	sleep: "/art/izzy/spray-defensive-sleep.webp",
	lingerie: "/art/izzy/spray-defensive-lingerie.webp",
	asuka: "/art/izzy/spray-defensive-asuka.webp",
	mymy: "/art/izzy/mymy-flirty.webp"
};
var SPRAY_DOMINANT = "/art/izzy/spray-dominant.webp";
function sprayPortraitSrc(outfit, kind) {
	if (kind === "dominant") return SPRAY_DOMINANT;
	if (kind === "consensual") return SPRAY_CONSENT[outfit] ?? SPRAY_CONSENT.casual;
	if (kind === "defensive") return SPRAY_DEFENSIVE[outfit] ?? SPRAY_DEFENSIVE.casual;
	return SPRAY_ANGRY[outfit] ?? SPRAY_ANGRY.casual;
}
var VICTORIA = {
	embarrassed: "/art/victoria/embarrassed.webp",
	happy: "/art/victoria/happy.webp",
	idle: "/art/victoria/idle.webp",
	flirty: "/art/victoria/flirty.webp",
	laughing: "/art/victoria/laughing.webp",
	suspicious: "/art/victoria/suspicious.webp",
	shy: "/art/victoria/shy.webp",
	angry: "/art/victoria/angry.webp",
	infodump: "/art/victoria/infodump.webp",
	aroused: "/art/victoria/aroused.webp",
	thinking: "/art/victoria/thinking.webp",
	scheming: "/art/victoria/scheming.webp",
	spray: "/art/victoria/spray.webp"
};
var VICTORIA_LINGERIE = {
	embarrassed: "/art/victoria/lingerie/embarrassed.webp",
	happy: "/art/victoria/lingerie/happy.webp",
	idle: "/art/victoria/lingerie/idle.webp",
	flirty: "/art/victoria/lingerie/flirty.webp",
	laughing: "/art/victoria/lingerie/laughing.webp",
	suspicious: "/art/victoria/lingerie/suspicious.webp",
	shy: "/art/victoria/lingerie/shy.webp",
	angry: "/art/victoria/lingerie/angry.webp",
	infodump: "/art/victoria/lingerie/infodump.webp",
	aroused: "/art/victoria/lingerie/aroused.webp",
	thinking: "/art/victoria/lingerie/thinking.webp",
	scheming: "/art/victoria/lingerie/scheming.webp",
	spray: "/art/victoria/lingerie/spray.webp"
};
var VICTORIA_LINGERIE_SPRAY = {
	angry: "/art/victoria/lingerie/spray-angry.webp",
	consensual: "/art/victoria/lingerie/spray-consent.webp",
	defensive: "/art/victoria/lingerie/spray-defensive.webp",
	dominant: "/art/victoria/lingerie/spray-dominant.webp"
};
/** Home, the player's apartment, or any intimate scene. Not the office. */
function victoriaLingerieOn(locationId, intimate) {
	return intimate || locationId === "vickyLiving" || locationId === "vickyBedroom" || locationId === "apartment";
}
var VICTORIA_SPRAY = {
	angry: "/art/victoria/spray-angry.webp",
	consensual: "/art/victoria/spray-consent.webp",
	defensive: "/art/victoria/spray-defensive.webp",
	dominant: "/art/victoria/spray-dominant.webp"
};
function portraitSrc(outfit, expression, sprayKind = "none", girl = "izzy", lingerie = false) {
	if (girl === "victoria") {
		if (lingerie) {
			if (sprayKind !== "none") return VICTORIA_LINGERIE_SPRAY[sprayKind];
			if (expression === "spray") return VICTORIA_LINGERIE.spray;
			return VICTORIA_LINGERIE[expression] ?? VICTORIA_LINGERIE.idle;
		}
		if (sprayKind !== "none") return VICTORIA_SPRAY[sprayKind];
		if (expression === "spray") return VICTORIA.spray;
		return VICTORIA[expression] ?? VICTORIA.happy;
	}
	if (sprayKind !== "none") return sprayPortraitSrc(outfit, sprayKind);
	if (expression === "spray") return sprayPortraitSrc(outfit, "angry");
	if (outfit === "asuka" || outfit === "mymy") {
		const file = outfit === "asuka" ? "asuka" : "mymy";
		if (expression === "flirty" || expression === "laughing" || expression === "aroused" || expression === "scheming") return `/art/izzy/${file}-flirty.webp`;
		return `/art/izzy/${file}.webp`;
	}
	if (outfit === "casual") return CASUAL[expression] ?? CASUAL.happy;
	if (expression !== "happy" && expression !== "idle") return `/art/izzy/${outfit}-${expression}.webp`;
	return OUTFIT_IDLE[outfit] ?? CASUAL.happy;
}
var OUTFIT_LABEL = {
	casual: "Lil' Stinker set",
	lounge: "Lounge hoodie",
	campus: "Campus hoodie",
	work: "Trailhead vest",
	dress: "Red date dress",
	sleep: "Sleep shirt",
	lingerie: "After hours",
	asuka: "Unit-02 night",
	mymy: "Mymy cosplay"
};
var OUTFITS = new Set(Object.keys(OUTFIT_LABEL));
function asOutfitId(value) {
	const raw = String(value ?? "").trim();
	return OUTFITS.has(raw) ? raw : null;
}
function autoOutfit(locationDefault, trust, bond, locationId, flags) {
	if (locationId === "vickyLiving" || locationId === "vickyBedroom") return "work";
	if (locationId === "dorm") {
		const intimate = bond === "romantic" || Boolean(flags?.romanceAccepted);
		if (intimate && flags?.evaInterest && trust >= 70) return "asuka";
		if (intimate && trust >= 92) return "lingerie";
		if (trust >= 70) return "sleep";
		return "lounge";
	}
	if (locationId === "sportingGoods") return "work";
	if (locationId === "theater" && trust >= 55) return "dress";
	if ((locationId === "mexican" || locationId === "burger") && trust >= 70) return "dress";
	if (locationId === "perfume" && trust >= 50) return "dress";
	return locationDefault;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
var WEEKDAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
	"Sunday"
];
var TIMES = [
	"Morning",
	"Afternoon",
	"Evening",
	"Night"
];
function isCouple(state) {
	return state.flags.romanceAccepted || state.bond === "romantic";
}
function advanceTime(time) {
	if (time === "Morning") return {
		time: "Afternoon",
		dayRoll: false
	};
	if (time === "Afternoon") return {
		time: "Evening",
		dayRoll: false
	};
	if (time === "Evening") return {
		time: "Night",
		dayRoll: false
	};
	return {
		time: "Morning",
		dayRoll: true
	};
}
function nextWeekday(day) {
	return WEEKDAYS[(WEEKDAYS.indexOf(day) + 1) % WEEKDAYS.length] ?? "Monday";
}
function emptySprays() {
	return {
		angry: 0,
		defensive: 0,
		consensual: 0,
		dominant: 0
	};
}
var TOPIC_RULES = [
	[/evangelion|\beva\b|asuka|anime|mymy|ongezellig|neko/, "anime"],
	[/axis|allies|board game|tabletop|hex/, "board games"],
	[/hoi4|jak|daxter|ratchet|war thunder|video game|bionicle/, "video games"],
	[/history|rome|war|logistics|treaty/, "history"],
	[/taco|burrito|mexican|burger|shake|food|hungry|beans|eat/, "food"],
	[/tether|chvrch|sabrina|chappell|music|song|playlist/, "music"],
	[/forest|trail|hike|woods|moss|skunk biology|scent gland/, "the woods"],
	[/dorm|apartment|home|room/, "going home"],
	[/fart|gas|spray|stink|musk|gassy/, "her skunk side"],
	[/childhood|foster|appalach|family|growing up|adopt/, "her past"]
];
function topicsFrom(text, existing) {
	const next = [...existing];
	for (const [re, label] of TOPIC_RULES) {
		if (next.includes(label)) continue;
		if (re.test(text)) next.push(label);
	}
	return next.slice(0, 8);
}
function parseTimeOfDay(text) {
	const t = text.toLowerCase();
	if (/\bmorning\b|\bam\b|before class|breakfast/.test(t)) return "Morning";
	if (/\bafternoon\b|after class|lunch/.test(t)) return "Afternoon";
	if (/\bevening\b|sunset|dinner|dusk/.test(t)) return "Evening";
	if (/\bnight\b|tonight|late\b/.test(t)) return "Night";
	return null;
}
function parseMeetPlace(text) {
	return resolvePlace(text);
}
function likesPlayer(state) {
	return state.trust >= 18 && state.bonding >= 12;
}
function bumpSpray(tally, kind) {
	if (kind === "none") return tally;
	return {
		...tally,
		[kind]: tally[kind] + 1
	};
}
function slowCeiling(dates) {
	if (dates >= 3) return 100;
	if (dates === 2) return 75;
	if (dates === 1) return 50;
	return 25;
}
function scaleSlowGain(delta) {
	if (delta <= 0) return delta;
	return Math.max(1, Math.round(delta * .5));
}
var DATE_WORD = /\b(on a date|a date|date me|date night|take you out|ask you out|go out with me|this is a date|be a date)\b/i;
var HIGH = /* @__PURE__ */ new Set([
	"theater",
	"mexican",
	"trail",
	"perfume",
	"campus",
	"burger"
]);
var MID = /* @__PURE__ */ new Set([
	"animeStore",
	"tabletop",
	"gameStore",
	"fashion",
	"collectibles",
	"dorm",
	"apartment"
]);
function isDateAsk(text) {
	return DATE_WORD.test(text);
}
function dateScore(spots) {
	if (!spots.length) return 0;
	return spots.reduce((n, id) => n + (HIGH.has(id) ? 3 : MID.has(id) ? 2 : 1), 0) / spots.length;
}
function romanceGate(mode, dates, spots) {
	if (mode !== "slow") return {
		trust: 100,
		bonding: 70
	};
	if (dates < 3) return {
		trust: 101,
		bonding: 101
	};
	const q = dateScore(spots);
	if (q >= 2.4) return {
		trust: 85,
		bonding: 60
	};
	if (q >= 1.8) return {
		trust: 92,
		bonding: 65
	};
	return {
		trust: 100,
		bonding: 70
	};
}
function paced(current, delta, min, max, pace) {
	let next = clamp(current + (pace?.mode === "slow" ? scaleSlowGain(delta) : delta), min, max);
	if (pace?.mode === "slow" && next > current) next = Math.min(next, slowCeiling(pace.dates));
	return next;
}
function applyTrust(current, delta, pace) {
	return paced(current, delta, -25, 100, pace);
}
function applyBonding(current, delta, pace) {
	return paced(current, delta, 0, 100, pace);
}
function bondFromScores(trust, bonding, romantic) {
	if (romantic) return "romantic";
	if (bonding >= 80 && trust >= 50) return "close";
	if (bonding >= 55 && trust >= 28) return "friend";
	if (bonding >= 28) return "acquaintance";
	return "stranger";
}
function bondLabel(bond) {
	switch (bond) {
		case "stranger": return "Stranger";
		case "acquaintance": return "Getting there";
		case "friend": return "Friend";
		case "close": return "Close";
		case "romantic": return "Together";
	}
}
/** Shortenings of a given name. Not titles, not comments on behavior. */
var DICT = {
	victoria: ["Vicky", "Vic"],
	victor: ["Vic"],
	jacob: ["Jake"],
	james: ["Jim"],
	alexander: ["Alex"],
	alexandra: ["Alex"],
	alexandria: ["Alex"],
	alexis: ["Alex"],
	elizabeth: ["Liz", "Beth"],
	elisabeth: ["Liz", "Beth"],
	jonathan: ["Jon"],
	johnathan: ["Jon"],
	christopher: ["Chris"],
	kristopher: ["Kris"],
	katherine: ["Kate", "Kat"],
	catherine: ["Kate", "Cat"],
	kathryn: ["Kate"],
	katharine: ["Kate"],
	jennifer: ["Jen"],
	jessica: ["Jess"],
	michael: ["Mike"],
	michaela: ["Mick"],
	nicholas: ["Nick"],
	nicole: ["Nikki"],
	daniel: ["Dan"],
	danielle: ["Dani"],
	daniela: ["Dani"],
	matthew: ["Matt"],
	mathew: ["Matt"],
	william: ["Will"],
	robert: ["Rob"],
	roberta: ["Bobbie"],
	roberto: ["Rob"],
	richard: ["Rick"],
	benjamin: ["Ben"],
	samuel: ["Sam"],
	samantha: ["Sam"],
	stephanie: ["Steph"],
	stephen: ["Steve"],
	steven: ["Steve"],
	rebecca: ["Becca"],
	patricia: ["Pat"],
	patrick: ["Pat"],
	nathaniel: ["Nate"],
	nathan: ["Nate"],
	anthony: ["Tony"],
	antonio: ["Tony"],
	joseph: ["Joe"],
	josephine: ["Josie"],
	thomas: ["Tom"],
	timothy: ["Tim"],
	andrew: ["Andy"],
	andrea: ["Andie"],
	abigail: ["Abby"],
	gabrielle: ["Gabby"],
	gabriella: ["Gabby"],
	gabriela: ["Gabby"],
	madison: ["Maddy"],
	madeline: ["Maddy"],
	madeleine: ["Maddy"],
	margaret: ["Maggie"],
	gregory: ["Greg"],
	jeffrey: ["Jeff"],
	geoffrey: ["Geoff"],
	phillip: ["Phil"],
	philip: ["Phil"],
	theodore: ["Theo"],
	theodora: ["Theo"],
	isabella: ["Bella"],
	isabel: ["Bella"],
	isabelle: ["Bella"],
	christina: ["Tina"],
	christine: ["Chris"],
	christian: ["Chris"],
	zachary: ["Zach"],
	zachariah: ["Zach"],
	dominic: ["Dom"],
	valerie: ["Val"],
	valeria: ["Val"],
	kimberly: ["Kim"],
	kimberley: ["Kim"],
	melanie: ["Mel"],
	melissa: ["Mel"],
	deborah: ["Deb"],
	theresa: ["Tess"],
	teresa: ["Tess"],
	natasha: ["Tash"],
	natalie: ["Nat"],
	cameron: ["Cam"],
	charles: ["Charlie"],
	charlotte: ["Charlie"],
	olivia: ["Liv"],
	emily: ["Em"],
	emilia: ["Em"],
	penelope: ["Penny"],
	frederick: ["Fred"],
	francesca: ["Fran"],
	francis: ["Frank"],
	franklin: ["Frank"],
	douglas: ["Doug"],
	raymond: ["Ray"],
	gwendolyn: ["Gwen"],
	reginald: ["Reg"],
	maximilian: ["Max"],
	maxwell: ["Max"],
	sebastian: ["Seb"],
	annabelle: ["Anna"],
	anastasia: ["Ana"],
	bartholomew: ["Bart"],
	lawrence: ["Larry"],
	laurence: ["Larry"],
	suzanne: ["Sue"],
	susan: ["Sue"],
	susannah: ["Sue"],
	cassandra: ["Cass"],
	cassidy: ["Cass"],
	tristan: ["Tris"],
	beatrice: ["Bea"],
	beatrix: ["Bea"],
	eleanor: ["Ellie"],
	leonardo: ["Leo"],
	leonard: ["Leo"],
	edward: ["Ed"],
	edmund: ["Ed"],
	eduardo: ["Ed"],
	harrison: ["Harry"],
	harold: ["Harry"],
	henry: ["Harry"],
	veronica: ["Ronnie"],
	jasmine: ["Jaz"]
};
var VOWELS = /* @__PURE__ */ new Set([
	"a",
	"e",
	"i",
	"o",
	"u"
]);
function givenName(full) {
	return (full.trim().split(/\s+/)[0] ?? "").replace(/[^A-Za-z]/g, "");
}
/** First-syllable clip for names the list doesn't know. Victoria → Vic, Samantha → Sam. */
function autoNick(given) {
	if (given.length < 5) return null;
	const lower = given.toLowerCase();
	let i = 0;
	while (i < lower.length && !VOWELS.has(lower[i])) i++;
	if (i >= lower.length) return null;
	i++;
	while (i < lower.length && VOWELS.has(lower[i])) i++;
	if (i >= lower.length) return null;
	i++;
	if (i < lower.length - 1 && !VOWELS.has(lower[i]) && !VOWELS.has(lower[i + 1])) i++;
	const stem = lower.slice(0, i);
	if (stem.length < 3 || stem.length >= lower.length) return null;
	return stem.charAt(0).toUpperCase() + stem.slice(1);
}
function nicknamesFor(full) {
	const given = givenName(full);
	if (given.length < 3) return [];
	const key = given.toLowerCase();
	const known = DICT[key];
	if (known?.length) return known.filter((n) => n.toLowerCase() !== key).slice(0, 2);
	const auto = autoNick(given);
	if (!auto || auto.toLowerCase() === key) return [];
	return [auto];
}
function chosenNickname(full) {
	return nicknamesFor(full)[0] ?? null;
}
/** What she should call them out loud right now. */
function callThem(full, trust, nicknamesOff) {
	const name = givenName(full) || full.trim();
	if (!name) return "you";
	if (nicknamesOff || trust < 28) return name;
	return chosenNickname(full) ?? name;
}
var HARD_STOP$1 = /\b(safeword|\bred\b|ooc\b|actually stop|stop for real|i mean it, stop)\b/i;
var SCENT_INTEREST = /\b(?:i (?:really )?(?:like|love|want|need|crave)|i'?m into|im into|into your|turned on|turns me on|get(?:s|ting)? (?:me )?off|so hot|this is hot|don'?t hold|do(?:n't| not) hold|fart (?:on|in|for) (?:me|my)|spray (?:me|on me|for me)|(?:love|like|want|need) (?:your |the |her )?(?:farts?|gas|spray|stink|musk|smell|scent)|your (?:farts?|gas|spray|musk|stink|smell) (?:is |are )?(?:hot|cute|sexy|amazing|perfect|mine)|sit on my face)\b/i;
var DISGUST = /\b(gross|nasty|disgusting|hate (?:your |the )?(?:fart|gas|smell|spray|stink)|stop farting)\b/i;
var SEXUAL = /\b(?:sex|fuck(?:ing)?|naked|nude|undress|make out|making out|kiss(?:ing|ed)?|grind(?:ing)?|hump(?:ing)?|moan(?:ing)?|orgasm|cum|cock|dick|pussy|clit|ride (?:you|me|her)|in bed|take me|good boy|good girl|blow ?job|go down on|eat you out|finger me|inside me|spread (?:her|my|your) (?:legs|thighs)|spray me|fart (?:on|in) (?:me|my))\b/i;
var FULL_SEX = /\b(?:fuck(?:ing)?|have sex|let'?s have sex|penetrat\w*|inside me|inside you|ride me|ride you|blow ?job|go down|eat you out|make love|cock|dick|pussy|clit|cum|orgasm|intercourse|put it in)\b/i;
var SCENT_WORD = /\b(?:farts?|farting|gas|gassy|sprays?|sprayed|spraying|stink|stinky|musk|scent|smell|skunk)\b/i;
var CONCLUDE = /\b(?:that(?:'s| is) enough|i(?:'m| am) (?:done|finished|satisfied|spent)|we should stop|let(?:'s| us) (?:stop|get dressed|cuddle|sleep|call it)|get dressed|pull (?:my |your |our )?(?:pants|clothes|shorts|shirt) (?:up|back|on)|afterglow|no more (?:tonight|sex|spraying|farting)|we can stop|i want to (?:cuddle|stop|sleep)|call it a night|that was (?:all|enough)|scene(?:'s| is) over|i(?:'m| am) ready to (?:stop|sleep|cuddle)|good ?night|heading (?:home|out)|i should go|we should (?:go|leave)|time to (?:go|leave|sleep))\b/i;
var AGAIN = /\b(?:(?:fart|spray|gas|stink).{0,24}(?:again|now|more)|another (?:spray|fart|one)|spray me|fart (?:on|for) me again|do that again|let (?:another|one) (?:go|rip)|more (?:gas|spray|farts)|keep (?:going|farting|spraying)|don'?t stop|dont stop|don'?t hold|do not hold|let it rip)\b/i;
var MARK_ASK = /\b(?:mark me|scent[- ]?mark|smell like you|your (?:scent|musk|smell) on me|put your (?:scent|musk|smell) on)\b/i;
var DOMINANT_ASK = /\b(?:dom(?:me|inat(?:e|ing))? me|mind[- ]?break|own me|be rough|take charge)\b/i;
var PRIVATE_MARK = /* @__PURE__ */ new Set([
	"dorm",
	"apartment",
	"vickyLiving",
	"vickyBedroom"
]);
function showedScentInterest(text) {
	if (!SCENT_INTEREST.test(text)) return false;
	if (DISGUST.test(text) && !/\b(?:but|still|anyway)\b/i.test(text)) return false;
	return true;
}
function sexualBeat(text) {
	return SEXUAL.test(text);
}
function fullSex(text) {
	return FULL_SEX.test(text);
}
function scentFocused(text) {
	return SCENT_WORD.test(text);
}
function concludesIntimacy(text) {
	return CONCLUDE.test(text);
}
function asksForScentNow(text) {
	return AGAIN.test(text);
}
/** Marking, dominance, or a direct ask during intimacy. She does not wait the usual couple of turns. */
function scentRelentless(state, input) {
	const text = `${input.say} ${input.action}`;
	if (isHardStop(text) || concludesIntimacy(text)) return false;
	const scene = Boolean(state.flags.intimateScene) || sexualBeat(text);
	const focus = state.focus ?? "izzy";
	const affair = state.markAffair;
	if (affair?.phase === "reclaim" && (affair.girl === focus || (state.present ?? []).includes(affair.girl)) && (scene || PRIVATE_MARK.has(state.location)) || scene && MARK_ASK.test(text)) return true;
	if (state.flags.sprayYield === "resist" || scene && state.playerFartRole === "not" && state.flags.sprayYield !== "submit" || scene && DOMINANT_ASK.test(text)) return true;
	return scene && asksForScentNow(text);
}
function isHardStop(text) {
	return HARD_STOP$1.test(text);
}
function officiallyTogether(state) {
	return Boolean(state.flags.romanceAccepted);
}
/** Sex is allowed. Slow romance: only once you are official. Casual, before that: 50/50 and scent interest. */
function intimacyAllowed(state) {
	if (officiallyTogether(state)) return true;
	if (state.gameMode === "slow") return false;
	return state.trust >= 50 && state.bonding >= 50 && Boolean(state.flags.scentInterest);
}
function intimacyBlockReason(state) {
	if (intimacyAllowed(state)) return null;
	if (state.gameMode === "slow") return "slow";
	if (state.trust < 50 || state.bonding < 50) return "meters";
	return "scent";
}
function intimacyCall(state, input, opts) {
	const text = `${input.say} ${input.action}`;
	let scene = Boolean(state.flags.intimateScene);
	if (opts?.traveledPublic) scene = false;
	if (opts?.threat || isHardStop(text)) return {
		scene: false,
		blocked: false,
		redirect: false,
		concluded: false,
		release: false
	};
	if (scene && concludesIntimacy(text)) return {
		scene: false,
		blocked: false,
		redirect: false,
		concluded: true,
		release: false
	};
	const scent = state.flags.scentInterest || showedScentInterest(text) || state.flags.fartConverted || state.flags.sprayYield !== "none";
	const view = {
		...state,
		flags: {
			...state.flags,
			scentInterest: scent
		}
	};
	const trying = scene || sexualBeat(text);
	const reason = trying ? intimacyBlockReason(view) : null;
	if (reason) return {
		scene: false,
		blocked: reason,
		redirect: false,
		concluded: false,
		release: false
	};
	const next = trying;
	return {
		scene: next,
		blocked: false,
		redirect: Boolean(next && !officiallyTogether(view) && fullSex(text) && !scentFocused(text)),
		concluded: false,
		release: asksForScentNow(text)
	};
}
function partnerWord(state) {
	return state.playerGender === "female" ? "girlfriend" : "boyfriend";
}
function refusalCopy(state, reason) {
	if (reason === "slow") return {
		narration: "She doesn't follow that. She stays where she is.",
		dialogue: `Not yet. I'm not doing that until you're actually my ${partnerWord(state)}. Slow is the deal. Dates, then us.`,
		expression: "shy"
	};
	if (reason === "meters") return {
		narration: "She catches the idea before it becomes a scene, and she doesn't go further.",
		dialogue: "I like you. I don't like you enough for that. Stay a while. Then ask me again.",
		expression: "suspicious"
	};
	return {
		narration: "She looks at you like you skipped a chapter.",
		dialogue: "If you want me before we're official, want the farts. Want the spray. I'm not a body you get to leave the skunk out of.",
		expression: "suspicious"
	};
}
function redirectCopy(state) {
	return {
		narration: "She stays in it, but she doesn't let it become something else.",
		dialogue: `We can do this. Not that. Not until you're my ${partnerWord(state)}. Right now it's the gas, or the spray, and what they do to you.`,
		expression: "scheming"
	};
}
function recentLines(messages, girl) {
	const role = girl === "victoria" ? "victoria" : "izzy";
	return messages.filter((message) => message.role === role).slice(-3).map((message) => message.text).join("\n");
}
function pickFresh(lines, avoid = "") {
	const unused = lines.filter((line) => !avoid.includes(line.dialogue.slice(0, 32)));
	const pool = unused.length ? unused : lines;
	return pool[Math.floor(Math.random() * pool.length)];
}
function holdCopy(girl = "izzy", avoid = "") {
	return pickFresh(girl !== "victoria" ? [
		{
			narration: "She presses a hand under her stomach and shakes her head.",
			dialogue: "I don't feel gassy. Stomach's quiet. I can't just order one up.",
			expression: "thinking"
		},
		{
			narration: "She bears down for a second, tail twitching, and nothing comes.",
			dialogue: "Tank's empty. The stomach one. Beans need a minute.",
			expression: "embarrassed"
		},
		{
			narration: "She exhales, annoyed at her own gut.",
			dialogue: "I'm out of gas. That last one took what I had.",
			expression: "shy"
		},
		{
			narration: "She waits, then shrugs like she checked and the answer was no.",
			dialogue: "Nothing's brewing. I already looked. It's just me in there.",
			expression: "thinking"
		},
		{
			narration: "A small push, then she lets her stomach go soft again.",
			dialogue: "I already spent it. Gut's on break. Ask when it starts talking again.",
			expression: "embarrassed"
		}
	] : [
		{
			narration: "She smooths her skirt. She does not strain.",
			dialogue: "I don't feel gassy. There is nothing there to let go of.",
			expression: "thinking"
		},
		{
			narration: "She goes still, then lets the effort go.",
			dialogue: "I've emptied the tank. Another one will not appear because you asked.",
			expression: "shy"
		},
		{
			narration: "A short, annoyed breath. Her hand rests on her middle and drops.",
			dialogue: "I'm out of gas. The last one was what I had.",
			expression: "shy"
		},
		{
			narration: "She is quiet for a moment, listening to herself, then shakes her head once.",
			dialogue: "My stomach is quiet. I can feel that it's gone.",
			expression: "thinking"
		},
		{
			narration: "She doesn't perform the effort. There is nothing to perform.",
			dialogue: "That was the end of it. I am not going to strain for a second one that isn't there.",
			expression: "shy"
		}
	], avoid);
}
var PLAYFUL_PUBLIC = /\b(?:please|c'?mon|come on|dare you|i dare|bet you|just a (?:little|tiny|small)|for me|i want to hear|pretty please|right here|in (?:public|front of)|can you|will you|would you|go on|do it|let one|rip one)\b/i;
var FART_ASK = /\b(?:farts?|farting|toots?|poots?|puffs?|pass gas|let one|rip one|cut one)\b/i;
var MEAN_FART = /\b(?:gross|disgusting|nasty|pig|whale|fatass|you stink)\b/i;
var TIGHT = /* @__PURE__ */ new Set([
	"classroom",
	"studyHall",
	"firm"
]);
var VICKY_NO = /* @__PURE__ */ new Set([
	"classroom",
	"studyHall",
	"firm",
	"library",
	"campus",
	"mall",
	"cafe",
	"grocery",
	"foodCourt",
	"sportingGoods"
]);
function playfulPublicAsk(text) {
	if (MEAN_FART.test(text)) return false;
	if (/\b(?:don'?t|do not|stop fart|no more|ew|gross)\b/i.test(text)) return false;
	return FART_ASK.test(text) && PLAYFUL_PUBLIC.test(text);
}
/** Izzy usually says yes. Victoria usually does not. Izzy with the other skunkgirl wants the attention. */
function indulgesPublicFart(girl, place, trust, withOther, onDuty) {
	if (onDuty) return false;
	if (girl === "izzy") {
		if (withOther) return true;
		if (TIGHT.has(place) && trust < 28) return false;
		return true;
	}
	if (VICKY_NO.has(place)) return false;
	return trust >= 72 && (place === "trail" || place === "mexican");
}
function publicFartNo(girl, avoid = "") {
	if (girl === "victoria") return pickFresh([
		{
			narration: "She glances at the room, then at them, and does not shift her weight.",
			dialogue: "I don't feel gassy. And I am not going to invent one for a room full of people.",
			expression: "shy"
		},
		{
			narration: "Her tail stays down. One hand settles on her stomach and leaves.",
			dialogue: "The tank is empty. Even if it were not, not in public.",
			expression: "thinking"
		},
		{
			narration: "She adjusts her glasses and lowers her voice.",
			dialogue: "I'm out of gas. This is also a public room. Both are true.",
			expression: "suspicious"
		}
	], avoid);
	return pickFresh([
		{
			narration: "She looks around, ears a little flat, and doesn't push.",
			dialogue: "I don't feel gassy, and this room is a lot. Nothing's even queued up.",
			expression: "embarrassed"
		},
		{
			narration: "She tries to play along, then winces and lets it go.",
			dialogue: "Tank's empty. I would. There's nothing in there.",
			expression: "shy"
		},
		{
			narration: "She grins, then shakes her head.",
			dialogue: "I'm out of gas. Dare me when my stomach's actually in on it.",
			expression: "laughing"
		}
	], avoid);
}
function publicFartYes(girl, withOther) {
	if (girl === "victoria") return {
		narration: "She checks who is close, steps in, and lets a short one go. She does not look proud of the choice.",
		dialogue: "Fine. A small one. If you tell anyone I agreed to that, I will deny it.",
		expression: "shy"
	};
	if (withOther) return {
		narration: "Izzy doesn't wait her turn. She leans, lets one go, and watches to see if their eyes come back to her.",
		dialogue: "Hey. I'm right here too. That one was so you'd look at me.",
		expression: "flirty"
	};
	return {
		narration: "She glances around, decides she doesn't care, and lets it go with a grin.",
		dialogue: "Okay, okay. You asked nice. Don't make it a whole thing.",
		expression: "embarrassed"
	};
}
function intimacyBrief(state, input) {
	const text = `${input.say} ${input.action}`;
	const scent = state.flags.scentInterest || showedScentInterest(text) || state.flags.fartConverted || state.flags.sprayYield !== "none";
	const view = {
		...state,
		flags: {
			...state.flags,
			scentInterest: scent
		}
	};
	const call = intimacyCall(view, input);
	const hold = state.scentHold ?? 0;
	const relentless = scentRelentless(view, input);
	const lines = [
		`INTIMACY official: ${officiallyTogether(view) ? "yes — full sex is allowed" : "no"}`,
		`INTIMACY allowed now: ${intimacyAllowed(view) ? "yes" : "no"}`,
		`INTIMACY scene: ${call.scene || state.flags.intimateScene ? "yes" : "no"}`,
		`scentInterest: ${scent ? "yes — they have wanted her farts and/or spray" : "no"}`,
		`SCENT HOLD: ${hold > 0 && !call.release && !relentless ? "SET — do not fart and do not spray this turn. Watch how the last one landed. fx none, sprayed false, sprayKind null, pendingIntimateSpray false." : "clear"}`,
		relentless ? "SCENT PACE: relentless. She wants another now. Marking, dominance, or they just asked. Fart this turn. A spray is right if she is marking, dominant, or they asked to be sprayed, and the glands are not empty. Consecutive farts are allowed. Do not pause to watch their face. Do not wait a couple of turns." : "SCENT PACE: measured. One fart or one spray, then watch what it did. Do not fart or spray on the next line unless they ask, she is marking, or she is being dominant."
	];
	if (!officiallyTogether(view) && state.gameMode === "slow") lines.push("SLOW ROMANCE: refuse all sexual activity until you are official. No sex, no undressing, no intimate spray.");
	else if (!officiallyTogether(view) && intimacyAllowed(view)) lines.push("CASUAL, not official: intimacy is allowed only because trust and bonding are both at least 50 and they want your farts or spray. Keep the scene centered on those. Do not switch to sex that leaves them out.");
	else if (!intimacyAllowed(view)) lines.push("They are not allowed intimacy yet. Refuse it in character. Do not start a sex scene.");
	if ((call.scene || state.flags.intimateScene) && state.timeOfDay === "Night") lines.push("NIGHT SCENE: the clock is frozen. Do not end the day, do not leave, do not say you have to go home. Stay in the roleplay until they end it.");
	if (call.concluded) lines.push("They are ending the intimate scene. Do not start another sex act. Answer the ending.");
	if (call.redirect) lines.push("They pushed past farts and spray. Pull it back. You are not official. The gas or the spray stays the point.");
	return lines.join("\n");
}
var GIRLS = ["izzy", "victoria"];
var AFFINITY = {
	library: {
		izzy: 70,
		victoria: 70
	},
	studyHall: {
		izzy: 78,
		victoria: 42
	},
	classroom: {
		izzy: 88,
		victoria: 8
	},
	cafe: {
		izzy: 58,
		victoria: 48
	},
	campus: {
		izzy: 84,
		victoria: 12
	},
	trail: {
		izzy: 76,
		victoria: 22
	},
	dorm: {
		izzy: 100,
		victoria: 0
	},
	mexican: {
		izzy: 82,
		victoria: 28
	},
	burger: {
		izzy: 64,
		victoria: 16
	},
	mall: {
		izzy: 50,
		victoria: 52
	},
	gameStore: {
		izzy: 74,
		victoria: 18
	},
	foodCourt: {
		izzy: 56,
		victoria: 30
	},
	fashion: {
		izzy: 40,
		victoria: 64
	},
	makeup: {
		izzy: 32,
		victoria: 58
	},
	collectibles: {
		izzy: 76,
		victoria: 28
	},
	trendy: {
		izzy: 68,
		victoria: 18
	},
	perfume: {
		izzy: 22,
		victoria: 92
	},
	theater: {
		izzy: 52,
		victoria: 48
	},
	animeStore: {
		izzy: 96,
		victoria: 14
	},
	tabletop: {
		izzy: 72,
		victoria: 24
	},
	grocery: {
		izzy: 38,
		victoria: 74
	},
	naturalFoods: {
		izzy: 34,
		victoria: 56
	},
	sportingGoods: {
		izzy: 70,
		victoria: 18
	},
	apartment: {
		izzy: 40,
		victoria: 40
	},
	vickyLiving: {
		izzy: 0,
		victoria: 100
	},
	vickyBedroom: {
		izzy: 0,
		victoria: 100
	},
	craftStore: {
		izzy: 18,
		victoria: 96
	},
	italian: {
		izzy: 34,
		victoria: 90
	},
	furniture: {
		izzy: 14,
		victoria: 96
	},
	firm: {
		izzy: 8,
		victoria: 98
	}
};
var PRIVATE$1 = /* @__PURE__ */ new Set([
	"dorm",
	"apartment",
	"vickyLiving",
	"vickyBedroom"
]);
function otherGirl(id) {
	return id === "izzy" ? "victoria" : "izzy";
}
function girlName(id) {
	return id === "victoria" ? "Victoria" : "Izzy";
}
function girlShort(id) {
	return id === "victoria" ? "Vicky" : "Izzy";
}
function speakerRole(id) {
	return id === "victoria" ? "victoria" : "izzy";
}
function herHome(id) {
	return id === "victoria" ? "vickyLiving" : "dorm";
}
function isPrivatePlace(id) {
	return Boolean(id && PRIVATE$1.has(id));
}
function ownsHome(id) {
	if (id === "dorm") return "izzy";
	if (id === "vickyLiving" || id === "vickyBedroom") return "victoria";
	return null;
}
function girlIsOfficial(state, girl) {
	if (state.roster?.[girl]?.romanceAccepted) return true;
	if (state.focus === girl && (state.flags.romanceAccepted || state.bond === "romantic")) return true;
	return false;
}
function affinity(girl, place) {
	return AFFINITY[place]?.[girl] ?? 20;
}
function blankCard(outfit = "casual") {
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
		fartStreak: 0,
		fartRest: 0,
		fartBig: 0,
		fed: 0
	};
}
function blankRoster() {
	return {
		izzy: blankCard("casual"),
		victoria: blankCard("work")
	};
}
function initialCast(focus = "izzy") {
	const roster = blankRoster();
	roster[focus] = {
		...roster[focus],
		met: true,
		trust: 6,
		bonding: 4,
		expression: focus === "victoria" ? "shy" : "embarrassed"
	};
	return {
		relationshipType: "mono",
		focus,
		present: [focus],
		roster,
		planGirl: focus,
		morningDetour: false,
		queuedMeet: null,
		meetKind: "plan",
		partner: null,
		affairKnown: false
	};
}
function rollGirl(place) {
	const a = affinity("izzy", place);
	const b = affinity("victoria", place);
	const total = Math.max(1, a + b);
	return Math.random() * total < a ? "izzy" : "victoria";
}
function morningSpots(other, avoid) {
	const mine = otherGirl(other);
	return Object.keys(AFFINITY).filter((id) => {
		if (id === avoid || PRIVATE$1.has(id)) return false;
		const o = affinity(other, id);
		const m = affinity(mine, id);
		return o >= 68 && o + 8 >= m;
	}).sort((a, b) => affinity(other, b) - affinity(other, a)).slice(0, 6);
}
function companionChance(focus, place) {
	if (PRIVATE$1.has(place)) return 0;
	const theirs = affinity(otherGirl(focus), place);
	const mine = affinity(focus, place);
	if (theirs < 68) return 0;
	let p = theirs >= 88 ? .46 : .28;
	if (theirs > mine + 18) p += .1;
	return Math.min(.58, p);
}
function laterSlot(time) {
	if (time === "Morning" || time === "Afternoon") return {
		time: "Evening",
		nextDay: false
	};
	if (time === "Evening") return {
		time: "Night",
		nextDay: false
	};
	return {
		time: "Morning",
		nextDay: true
	};
}
function suitedPlace(girl, avoid) {
	return Object.keys(AFFINITY).filter((id) => id !== avoid && !PRIVATE$1.has(id)).sort((a, b) => affinity(girl, b) - affinity(girl, a))[0] ?? "library";
}
function withGirl(state, girl, patch) {
	const roster = state.roster ?? blankRoster();
	return {
		...roster,
		[girl]: {
			...roster[girl],
			...patch
		}
	};
}
function pushFocus(state) {
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
				glandDry: state.glandDry ?? 0
			}
		}
	};
}
function pullFocus(state, girl) {
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
			scentInterest: card.scentInterest
		}
	};
}
function cardCouple(card) {
	return Boolean(card && (card.romanceAccepted || card.bond === "romantic"));
}
function romanceBlocked(state, trust, bonding, dates) {
	const focus = state.focus ?? "izzy";
	if ((state.relationshipType ?? "mono") === "mono") {
		if ((state.roster?.[otherGirl(focus)])?.romanceAccepted) return true;
	}
	if (focus === "victoria") {
		const need = state.relationshipType === "harem" ? 82 : 72;
		if (trust < 100 || bonding < need) return true;
		if (state.gameMode === "slow" && dates < 3) return true;
	}
	return false;
}
function pickOne(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function oneGreeting(first, second) {
	return [first.trim(), second.trim()].filter(Boolean).join(" ");
}
function victoriaOpening(place) {
	return pickOne({
		library: [
			{
				narrator: "The design shelves are quieter than the rest of the library. A tall, mature skunk-neko woman in a tan blouse and a black pencil skirt is standing very still, glasses tipped down, one hand over her mouth. A heavy, expensive musk hangs in the aisle. She thought she was alone.",
				first: "Oh. That was unprofessional, and it was mine. I'm Victoria. Most people at the office call me Vicky. You can keep walking. Please don't make a scene — I already have.",
				second: "I come here for the design books. Sit if you're staying. Quietly. I can be civil if you can."
			},
			{
				narrator: "A design monograph is open on the table and a tall skunk-neko woman has one hand flat on it, as if she can hold the smell down with the page. Tan blouse, pencil skirt, glasses. She looks up and does not smile yet.",
				first: "You're early for a conversation I wasn't having. I'm Victoria. The musk is mine. The book is not an excuse. Don't point.",
				second: "If you need this aisle, take the other end. I'll finish the chapter and pretend we both have manners."
			},
			{
				narrator: "She has her phone face-down and her tail tucked against the chair leg. The library's dust can't cover what just happened. A mature skunk-neko in office clothes meets your eyes like she is closing a meeting.",
				first: "I was on a call. Then I wasn't. I'm Victoria. If you heard that, you can forget it. If you smelled it, forgetting will take longer.",
				second: "Sit if you came for the shelves. I don't need a witness, and I don't need a speech."
			},
			{
				narrator: "The tall woman at the end of the design row straightens her glasses, smooths her skirt, and still cannot smooth the air. Skunk, under perfume. She has already decided how this introduction will go.",
				first: "Hello. Victoria. Vicky, if we're going to be stuck in the same aisle. I let one go. I'd rather say it than watch you guess.",
				second: "You can stay. Quietly. I was having a decent afternoon before my own body filed a complaint."
			}
		],
		craftStore: [
			{
				narrator: "The craft store smells like dried flowers and hot glue until a richer, skunky note cuts through it. A tall skunk-neko woman in office clothes is comparing two bolts of floral fabric. Her ears flick when she notices you. The scent is not the store's.",
				first: "Florals are this side, if that's what you came for. The other smell is me. I'm Victoria. I'd rather you heard that from me.",
				second: "I usually hold it until the car. Today the car was too far. You can stay. Just don't point."
			},
			{
				narrator: "A wreath display half-hides a mature skunk-neko in a pencil skirt. She is holding a spool of ribbon like it might explain the musk in the aisle. It does not. She sees you and lifts her chin.",
				first: "Monday was supposed to be empty. It isn't. I'm Victoria. That wasn't potpourri. I'll be done with this ribbon in a minute.",
				second: "Shop if you came to shop. I'll keep the tail in. That's the best I can offer in a craft store."
			},
			{
				narrator: "She is comparing picture frames with the focus of someone who does this for a living and is annoyed she has to do it while fragrant. Glasses, blouse, a skunk tail she keeps trying to park behind her calves.",
				first: "The gold one is a lie. It photographs warm and hangs cheap. I'm Victoria. The smell walked in with me. Ignore it or leave. Both are allowed.",
				second: "If you're buying a gift, say who it's for. I can be useful. I would like to be useful instead of explained."
			},
			{
				narrator: "Hot glue and dried orange peel, and under that a thick skunk musk. The woman in office clothes has stopped in the fabric aisle with her eyes closed, one second too long. She opens them when your shoes hit the tile.",
				first: "Don't. I know. I'm Victoria. I held it through a meeting and lost the argument in aisle four. You can pretend you needed wreaths.",
				second: "I'll move to the far end. You take this one. That's fair."
			}
		],
		animeStore: [
			{
				narrator: "Neko Shelf is loud with plastic and posters. The woman by the gift wall does not look like she belongs here: blouse, pencil skirt, glasses, a skunk tail she is trying to keep close to her calves. She is reading the back of a box like it is a contract.",
				first: "I'm buying a gift. For my daughter. She is twenty, and she likes this sort of thing, and I am out of my depth. I'm Victoria.",
				second: "If you work here, the figure on the end is the one she circled. If you don't, I'll be done in a minute."
			},
			{
				narrator: "A mature skunk-neko in office clothes is scrolling a notes app in front of a wall of boxes, tail tucked, perfume losing. She clocks you and puts the phone away like you walked into her office.",
				first: "I have a list. I do not have a translator. I'm Victoria. The smell is mine, not the store's. My daughter sent me. She is twenty. This is not my aisle.",
				second: "If you know which of these isn't a waste of money, say so. If you came to stare, don't."
			},
			{
				narrator: "She has the wrong box in her hands and she knows it. Blouse, heels, a skunk tail knocking a poster. The musk got there before the apology. She sets the box down with care.",
				first: "That one isn't even on the list. And that smell is me. Victoria. I came in for a gift and my body decided to introduce me first.",
				second: "Give me a minute. I'll get the right one and get out of your way."
			},
			{
				narrator: "The gift wall has a tall skunk-neko woman who looks one question away from asking a clerk and refusing to. She straightens her glasses. The air around her is not plastic.",
				first: "Hello. I'm Victoria. I don't shop here. My daughter does. If you smelled something on the way in, it was me, and I'd rather we not make it a topic.",
				second: "Point me at something a twenty-year-old would actually want, or let me suffer in peace. Those are the options."
			}
		],
		trail: [
			{
				narrator: "Off the path, under the pines, a tall skunk-neko woman in heels that were a mistake has her phone lowered and her tail half-raised. The air is thick and musky, the kind that has been saved up all day. She startles when a twig snaps.",
				first: "Don't come closer for a second. Please. I thought the woods were empty. I'm Victoria. I walk here when the office is too much.",
				second: "I spend all day making sure nobody at work has to smell me. Out here I stop pretending. You picked a bad minute. Or a honest one."
			},
			{
				narrator: "A car door is still open on the lot behind her. She made it ten steps into the trees before she let the day go. Mature, office clothes, skunk tail high, then dropped when she hears you.",
				first: "Stay on the path. I'm Victoria. I drove out here so I could stop holding it. You beat me to the clearing. That's unfortunate for both of us.",
				second: "Give me a minute and the trail is yours. I don't need company for this part."
			},
			{
				narrator: "She is already turning back toward the lot, phone in hand, when the musk catches up with her. Heels, blouse, a tail she can't hide in pine shade. She sees you and stops like a meeting just started.",
				first: "I was leaving. Now I'm introducing myself. Victoria. The air is mine. I come here after work. I did not post a sign.",
				second: "If you keep walking, walk. If you're going to say something clever, save it. I've had a day."
			},
			{
				narrator: "The ridge loop smells like damp bark and a thick, saved-up skunk musk. A tall woman in clothes that do not belong on a trail has one hand out, palm first, asking for distance before she asks for a name.",
				first: "Don't come closer yet. I'm Victoria. I let it go because I thought I was alone. I was wrong. You can still turn around.",
				second: "I'll be civil in a minute. Right now I need the wind, not an audience."
			}
		],
		studyHall: [
			{
				narrator: "A green lamp, a stack of interior-design manuals, and a woman who is clearly not a student. Pencil skirt, glasses, skunk ears she stopped hiding. She presses her knees together and will not look up from the page.",
				first: "If that was audible, I apologize. I am studying for a promotion, not performing. Victoria. You can sit. Quietly.",
				second: "Two chapters left. I would like to finish them without a conversation about what I am. That's the plan."
			},
			{
				narrator: "She has claimed the corner table the way some people claim a conference room. Manuals squared, glasses on, a musk the green lamp cannot explain. She looks up once, decides you are not a threat, and speaks.",
				first: "This table is taken. I'm Victoria. If you need a seat, the next one is free, and it smells more like a library.",
				second: "I'm reading for a promotion. You can stay in the room. You cannot turn it into a conversation about my tail."
			},
			{
				narrator: "Notes for a presentation are spread in a neat fan. The woman who made them — mature, skunk-eared, office clothes — has just gone still. The air says why. She closes one folder before she looks at you.",
				first: "That was me. Victoria. I have a presentation in the morning and a body that does not care. Sit down or don't. Don't narrate it.",
				second: "I can share the table if you can be quiet. I am not sharing an explanation."
			},
			{
				narrator: "She looks like faculty until the tail gives her away, curled tight around the chair. A heavy musk sits under the lamp. She takes her glasses off, then puts them back on, buying a second.",
				first: "Hello. I'm Victoria. I booked this hour to study, not to meet anyone. The smell arrived anyway. You can pretend it didn't.",
				second: "If you're staying, keep your voice down. I still have a chapter, and I still have a title I'm trying to earn."
			}
		],
		furniture: [
			{
				narrator: "The showroom is a row of perfect little rooms. In one of them, a mature skunk-neko woman is measuring a loveseat with her hands, tail curled neatly aside. She smells like perfume laid over something much stronger.",
				first: "The proportions on this one are a lie. It looks generous and sits small. I'm Victoria. I do this for work, and then I do it again because I like it.",
				second: "You don't have to hover. If you want an opinion, ask. If you want to comment on the tail, don't."
			},
			{
				narrator: "She is standing in a staged living room like she owns the building and is disappointed in it. Blouse, skirt, glasses, a skunk tail she has aimed away from the upholstery. The perfume fails at the second breath.",
				first: "Don't sit yet. The cushion is for the photograph, not for you. I'm Victoria. The other smell is me. I was hoping the showroom would be louder.",
				second: "If you're shopping, I can tell you what will still look right in a year. If you're not, keep walking. I'll survive."
			},
			{
				narrator: "A mature skunk-neko has just stood up from a display loveseat a little too quickly. The musk she left in the cushions is obvious. She smooths her skirt and meets you anyway.",
				first: "I sat down. That was a mistake. I'm Victoria. I measure rooms for a living and I still forget I bring my own atmosphere.",
				second: "Give that one a minute before you try it. I'll be at the lamps, pretending this was professional."
			},
			{
				narrator: "Tape measure, notebook, heels. She is working, or she was, until you rounded the sofa and the air explained her first. She doesn't flinch. She just gets exact.",
				first: "Victoria. I'm on the clock, more or less. If you smelled me before you saw me, that's honest. I'd rather lead with the name.",
				second: "Ask me about the layout if you want a conversation. Ask me about the tail and we're done."
			}
		],
		italian: [
			{
				narrator: "White cloth, low light, a table set for one. The woman in the corner has taken her glasses off to read the menu. Black hair in a high tail, skunk ears, a blouse buttoned one notch lower than the office would like. She notices you before the waiter does.",
				first: "If they sat you here, the kitchen draft is usually worse than I am. I'm Victoria. Long week. You can say hello. Don't do it like you've discovered me.",
				second: "I eat alone when the day has been loud. Sit if you want. I already ordered enough for a person who pretends they aren't hungry."
			},
			{
				narrator: "She has a glass of wine and the corner booth, and she clocked you at the door. Mature, office clothes loosened by one button, a skunk tail along the seat. The musk is warm and close.",
				first: "You're hovering. Sit or let them seat someone who will. I'm Victoria. Yes, that's me you smell. The wine is not covering it. I stopped expecting it to.",
				second: "Long day. I can be decent company if you can be an adult about it."
			},
			{
				narrator: "The corner table was supposed to be private. A tall skunk-neko woman looks up from a menu she has already decided on. Glasses in one hand. She is not embarrassed enough to leave, and not relaxed enough to pretend.",
				first: "I had this table. Now I have company. Victoria. If the smell beat me to you, I'm sorry, once. I don't do it twice.",
				second: "You can join me. Or you can ask them for a table by the window. I won't be wounded. I'll be eating."
			},
			{
				narrator: "Low light, white cloth, and a woman who looks like she came from an office and refused to go home yet. Skunk ears, high tail of hair, a real tail she has tried to keep off the aisle. She speaks before you can make it awkward.",
				first: "Hello. I'm Victoria. Don't do the little pause where you decide whether to mention it. I already know. Sit down if you're hungry.",
				second: "I ordered like I might not be alone. That was optimism or habit. You can tell me which after the bread."
			}
		]
	}[place] ?? [
		{
			narrator: `You weren't expecting her. A tall skunk-neko woman in a tan blouse and black skirt is already here, glasses on, tail held carefully. The air around her is perfumed, and under that, skunk. She meets your eyes and does not run.`,
			first: "Hello. I'm Victoria. The smell got here first, so I'll go second. I can be civil if you can. That's the offer.",
			second: "Sit if you're staying. Don't point, and don't make me repeat myself."
		},
		{
			narrator: `A mature skunk-neko in office clothes clocks you and straightens her glasses, buying one second. Perfume, then musk. She does not smile yet. She does not leave.`,
			first: "Victoria. Most people say Vicky once they survive the first minute. The scent is mine. I'd rather name it than watch you work up to it.",
			second: "You can stay. You can also keep walking. Decide, and then do it."
		},
		{
			narrator: `She was on her way out. Heels, blouse, a tail she tucks as the door opens and you are suddenly in her air. She stops, recalculates, and introduces herself like it was on the schedule.`,
			first: "I was leaving. Now I'm not. I'm Victoria. If you followed the smell, say so. If you didn't, hello anyway.",
			second: "Don't hover in the doorway. In or out. I don't like a half-finished entrance."
		},
		{
			narrator: `The room already had her in it: tall, glasses, pencil skirt, a skunk tail held with office discipline. She looks at you the way she looks at a meeting that started early.`,
			first: "We haven't met. I'm Victoria. That isn't the room. That's me. I can be pleasant if you can be discreet.",
			second: "Sit if you meant to be here. I'll pretend this is normal until it is."
		}
	]);
}
function victoriaDropIn(placeName) {
	return pickOne([
		{
			narrator: `${placeName}. You were looking for her, and the scent gets there first. Victoria is already here, office clothes, tail held tight, not expecting to be found.`,
			line: "Oh. Hello. I don't think we've met. I'm Victoria. If you followed the smell, I'd rather you said so than hovered."
		},
		{
			narrator: `${placeName}. A tall skunk-neko in a blouse and pencil skirt looks up from whatever she was finishing. The musk arrived a step before she did.`,
			line: "You found me. Victoria. Most people land on Vicky. Don't stand there deciding what to do with your face."
		},
		{
			narrator: `${placeName}. She clocks you, straightens her glasses, and does not pretend the air is innocent.`,
			line: "We haven't met. I'm Victoria. Yes, that's me. Sit if you came to talk. Hover if you came to leave."
		},
		{
			narrator: `${placeName}. She was mid-step, tail tucked, and now she has an audience she didn't schedule.`,
			line: "Hello. Victoria. I was on my way somewhere quieter. You got here first. We can be civil, or you can let me pass."
		}
	]);
}
function seedMeeting(state, place, relationshipType) {
	const girl = rollGirl(place);
	const roster = blankRoster();
	roster[girl] = {
		...roster[girl],
		met: true,
		trust: 6,
		bonding: 4,
		expression: girl === "victoria" ? "shy" : "embarrassed",
		outfit: girl === "victoria" ? "work" : state.outfit
	};
	if (girl === "izzy") {
		roster.izzy = {
			...roster.izzy,
			trust: state.trust,
			bonding: state.bonding,
			expression: state.expression,
			outfit: state.outfit
		};
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
			affairKnown: false
		};
	}
	const lines = victoriaOpening(place);
	const messages = [{
		id: uid(),
		role: "narrator",
		at: Date.now(),
		text: lines.narrator
	}, {
		id: uid(),
		role: "victoria",
		at: Date.now() + 1,
		expression: "embarrassed",
		text: oneGreeting(lines.first, lines.second)
	}];
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
		messages
	};
}
function duetFallback(other, met) {
	if (other === "victoria") return met ? "Victoria's ears turn, but she doesn't leave. \"I'm still in this. Don't talk about me like I stepped out.\"" : "Victoria straightens her glasses. \"I don't believe we've met. I'm Victoria. I'll stay, unless this was meant to be private.\"";
	return met ? "Izzy rocks on her heels, tail flicking. \"Hey. I'm not furniture. You can talk to both of us.\"" : "Izzy's ears pop up. \"Oh. Hi. I'm Izzy. I was just — okay, I live in places like this. Don't let me wreck the vibe. Or do.\"";
}
function fidelityHit(state, text, scene) {
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
	if (Math.random() > (seen ? 1 : intimate ? .72 : .28)) return null;
	const trustLoss = intimate ? 34 : 16;
	const bondLoss = intimate ? 26 : 12;
	const trust = Math.max(0, card.trust - trustLoss);
	const bonding = Math.max(0, card.bonding - bondLoss);
	const broken = trust < 50 || bonding < 50 ? Math.random() < (trust < 50 && bonding < 50 ? 1 : .75) : false;
	const next = {
		...card,
		trust,
		bonding,
		romanceOffered: broken ? false : card.romanceOffered,
		romanceAccepted: broken ? false : card.romanceAccepted,
		bond: broken ? "acquaintance" : bondFromScores(trust, bonding, card.romanceAccepted)
	};
	const roster = {
		...state.roster ?? blankRoster(),
		[partner]: next
	};
	const name = girlName(partner);
	const lines = [];
	if (seen) lines.push({
		role: "narrator",
		text: `${name} is right here. She heard enough. The warmth leaves her face.`
	});
	else lines.push({
		role: "narrator",
		text: `Word gets back to ${name}. Not a rumor. The specific thing. She does not take it quietly.`
	});
	lines.push({
		role: speakerRole(partner),
		expression: "angry",
		text: broken ? "No. We are done. I can forgive a clumsy person. I cannot stay with someone who does that and thinks I won't notice. Don't come to me tonight." : intimate ? "I know what you did with her. Do not dress it up. You are mine, or you were. Trust is not a feeling I can fake for you right now." : "Flirting with her, while you have me. I heard. I am not going to scream in public. I am also not going to pretend it was nothing."
	});
	return {
		roster,
		partner: broken ? null : partner,
		affairKnown: true,
		lines
	};
}
function bothHere(state) {
	const present = state.present ?? [];
	return present.includes("izzy") && present.includes("victoria");
}
function describeArrival(focus, other, place, firstTime) {
	const where = placeOf(place).name;
	if (firstTime && other === "victoria") return `${where} was not only ${girlName(focus)}. Victoria is here too, blouse smoothed, tail held in, already pretending the scent in the air is the room's.`;
	if (firstTime) return `${where} already has another skunkgirl in it. Izzy looks up from whatever she was doing, ears high, and does not apologize for being there.`;
	return `${girlName(other)} is here as well. ${where} is the sort of place she would be.`;
}
var STORE_IDS = [
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
	"furniture"
];
var GIFTS = [
	{
		id: "steam-card",
		name: "Steam gift card",
		store: "gameStore",
		price: 10,
		izzy: "love",
		victoria: "miss"
	},
	{
		id: "retro-keychain",
		name: "retro cartridge keychain",
		store: "gameStore",
		price: 8,
		izzy: "like",
		victoria: "ok"
	},
	{
		id: "strategy-guide",
		name: "hardback strategy guide",
		store: "gameStore",
		price: 28,
		izzy: "love",
		victoria: "like"
	},
	{
		id: "eva-artbook",
		name: "Evangelion art book",
		store: "animeStore",
		price: 32,
		izzy: "love",
		victoria: "ok"
	},
	{
		id: "musume-volume",
		name: "Monster Musume volume",
		store: "animeStore",
		price: 15,
		izzy: "love",
		victoria: "miss"
	},
	{
		id: "plain-figure",
		name: "small figure in a plain box",
		store: "animeStore",
		price: 40,
		izzy: "love",
		victoria: "miss"
	},
	{
		id: "bionicle-mask",
		name: "loose Bionicle mask",
		store: "collectibles",
		price: 18,
		izzy: "love",
		victoria: "ok"
	},
	{
		id: "mixed-bricks",
		name: "bag of mixed bricks",
		store: "collectibles",
		price: 22,
		izzy: "like",
		victoria: "love"
	},
	{
		id: "dollhouse-mini",
		name: "dollhouse miniature",
		store: "collectibles",
		price: 45,
		izzy: "ok",
		victoria: "love"
	},
	{
		id: "campus-hoodie",
		name: "soft campus hoodie",
		store: "fashion",
		price: 35,
		izzy: "love",
		victoria: "miss"
	},
	{
		id: "pencil-skirt",
		name: "black pencil skirt",
		store: "fashion",
		price: 48,
		izzy: "miss",
		victoria: "like"
	},
	{
		id: "black-tights",
		name: "plain black tights",
		store: "fashion",
		price: 12,
		izzy: "ok",
		victoria: "like"
	},
	{
		id: "lip-balm",
		name: "tinted lip balm",
		store: "makeup",
		price: 9,
		izzy: "like",
		victoria: "like"
	},
	{
		id: "sample-set",
		name: "perfume sample set",
		store: "makeup",
		price: 24,
		izzy: "insult",
		victoria: "miss"
	},
	{
		id: "compact-mirror",
		name: "compact mirror",
		store: "makeup",
		price: 16,
		izzy: "ok",
		victoria: "like"
	},
	{
		id: "band-tee",
		name: "oversized band tee",
		store: "trendy",
		price: 20,
		izzy: "love",
		victoria: "miss"
	},
	{
		id: "sarcastic-mug",
		name: "sarcastic mug",
		store: "trendy",
		price: 14,
		izzy: "like",
		victoria: "like"
	},
	{
		id: "gag-freshener",
		name: "gag air-freshener can",
		store: "trendy",
		price: 6,
		izzy: "insult",
		victoria: "insult"
	},
	{
		id: "floral-bottle",
		name: "department-store floral",
		store: "perfume",
		price: 38,
		izzy: "insult",
		victoria: "miss"
	},
	{
		id: "unscented-lotion",
		name: "unscented lotion",
		store: "perfume",
		price: 15,
		izzy: "like",
		victoria: "love"
	},
	{
		id: "niche-musk",
		name: "niche musk bottle",
		store: "perfume",
		price: 50,
		izzy: "miss",
		victoria: "like"
	},
	{
		id: "axis-pocket",
		name: "Axis & Allies pocket edition",
		store: "tabletop",
		price: 30,
		izzy: "love",
		victoria: "ok"
	},
	{
		id: "hex-notebook",
		name: "blank hex notebook",
		store: "tabletop",
		price: 11,
		izzy: "like",
		victoria: "love"
	},
	{
		id: "dice-tin",
		name: "dice set in a tin",
		store: "tabletop",
		price: 18,
		izzy: "love",
		victoria: "like"
	},
	{
		id: "dried-beans",
		name: "bag of dried beans",
		store: "grocery",
		price: 5,
		izzy: "love",
		victoria: "like"
	},
	{
		id: "meal-for-two",
		name: "ready meal for two",
		store: "grocery",
		price: 14,
		izzy: "like",
		victoria: "like"
	},
	{
		id: "checkout-spray",
		name: "checkout body spray",
		store: "grocery",
		price: 7,
		izzy: "insult",
		victoria: "insult"
	},
	{
		id: "tomato-sauce",
		name: "tomato sauce can",
		store: "grocery",
		price: 5,
		izzy: "like",
		victoria: "like"
	},
	{
		id: "industrial-soap",
		name: "industrial soap",
		store: "grocery",
		price: 15,
		izzy: "insult",
		victoria: "miss"
	},
	{
		id: "fiber-granola",
		name: "high-fiber granola",
		store: "naturalFoods",
		price: 9,
		izzy: "love",
		victoria: "ok"
	},
	{
		id: "olive-oil",
		name: "nice olive oil",
		store: "naturalFoods",
		price: 22,
		izzy: "ok",
		victoria: "love"
	},
	{
		id: "odor-tea",
		name: "herbal odor tea",
		store: "naturalFoods",
		price: 13,
		izzy: "insult",
		victoria: "insult"
	},
	{
		id: "wool-socks",
		name: "wool hiking socks",
		store: "sportingGoods",
		price: 16,
		izzy: "love",
		victoria: "ok"
	},
	{
		id: "field-notebook",
		name: "field notebook",
		store: "sportingGoods",
		price: 10,
		izzy: "love",
		victoria: "like"
	},
	{
		id: "scent-free-soap",
		name: "scent-free outdoor soap",
		store: "sportingGoods",
		price: 12,
		izzy: "insult",
		victoria: "miss"
	},
	{
		id: "floral-fabric",
		name: "floral fabric remnant",
		store: "craftStore",
		price: 8,
		izzy: "miss",
		victoria: "love"
	},
	{
		id: "embroidery-kit",
		name: "embroidery kit",
		store: "craftStore",
		price: 19,
		izzy: "ok",
		victoria: "love"
	},
	{
		id: "fake-plant",
		name: "fake plant in a ceramic pot",
		store: "craftStore",
		price: 27,
		izzy: "like",
		victoria: "love"
	},
	{
		id: "design-book",
		name: "discount design book",
		store: "furniture",
		price: 24,
		izzy: "ok",
		victoria: "love"
	},
	{
		id: "throw-pillows",
		name: "pair of throw pillows",
		store: "furniture",
		price: 36,
		izzy: "like",
		victoria: "love"
	},
	{
		id: "linen-candle",
		name: "fresh-linen candle",
		store: "furniture",
		price: 18,
		izzy: "miss",
		victoria: "insult"
	}
];
var BY_ID = new Map(GIFTS.map((gift) => [gift.id, gift]));
function isStore(id) {
	return STORE_IDS.includes(id);
}
function giftsAt(store) {
	return GIFTS.filter((gift) => gift.store === store);
}
function giftById(id) {
	if (!id) return null;
	return BY_ID.get(id) ?? null;
}
var LADDER = [
	"insult",
	"miss",
	"ok",
	"like",
	"love"
];
function bump(kind, steps) {
	if (steps <= 0 || kind === "insult") return kind;
	const at = LADDER.indexOf(kind);
	return LADDER[Math.min(LADDER.length - 1, at + steps)] ?? kind;
}
function receptionOf(gift, girl) {
	const base = girl === "victoria" ? gift.victoria : gift.izzy;
	if (girl === "victoria") return bump(base, 1);
	return bump(base, gift.price >= 28 ? 1 : 0);
}
function receptionDelta(kind) {
	if (kind === "love") return {
		trust: 4,
		bonding: 8
	};
	if (kind === "like") return {
		trust: 2,
		bonding: 4
	};
	if (kind === "ok") return {
		trust: 0,
		bonding: 1
	};
	if (kind === "miss") return {
		trust: -1,
		bonding: -2
	};
	return {
		trust: -8,
		bonding: -6
	};
}
function giftSpeech(girl, gift) {
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
function giftSummary(girl, gift) {
	const kind = receptionOf(gift, girl);
	const name = gift.name;
	if (kind === "love") return `${name} was exactly her kind of thing.`;
	if (kind === "like") return `She liked the ${name}.`;
	if (kind === "ok") return `The ${name} was fine. Not a miss, not a memory.`;
	if (kind === "miss") return `The ${name} missed her. She was polite about it.`;
	return `The ${name} landed as an insult. It asked her to cover what she is.`;
}
function presentLine(gift, girlName) {
	return `I present the ${gift.name} as a gift to ${girlName}.`;
}
var PRIVATE_DATES = /* @__PURE__ */ new Set([
	"dorm",
	"apartment",
	"vickyLiving",
	"vickyBedroom"
]);
var AWKWARD_DATES = /* @__PURE__ */ new Set([
	"classroom",
	"studyHall",
	"sportingGoods",
	"firm"
]);
var CAMPUS_AM = [
	"library",
	"cafe",
	"campus",
	"studyHall",
	"classroom"
];
var HANGOUT = {
	izzy: {
		Morning: [
			"library",
			"cafe",
			"campus",
			"trail",
			"animeStore"
		],
		Afternoon: [
			"library",
			"cafe",
			"animeStore",
			"mexican",
			"mall",
			"tabletop",
			"trail"
		],
		Evening: [
			"mexican",
			"tabletop",
			"burger",
			"trail",
			"mall"
		],
		Night: [
			"campus",
			"trail",
			"burger"
		]
	},
	victoria: {
		Morning: [
			"grocery",
			"cafe",
			"furniture",
			"craftStore"
		],
		Afternoon: [
			"craftStore",
			"furniture",
			"perfume",
			"italian",
			"mall"
		],
		Evening: [
			"italian",
			"mall",
			"furniture",
			"perfume"
		],
		Night: ["italian", "perfume"]
	}
};
function economySeed() {
	return {
		money: 100,
		inventory: [],
		dateDraft: null,
		scheduledDate: null,
		activeDate: null,
		dateReview: null,
		confronting: null,
		grudge: {},
		dateTipOff: {},
		gas: [],
		departure: null,
		trailStreak: 0,
		trailGirl: null,
		sceneTurns: 0,
		shiftsWorked: 0,
		workedToday: false,
		pressedDuty: null,
		otherSprayKind: "none",
		sprayPrompts: [],
		stink: 0,
		scentFrom: {
			izzy: 0,
			victoria: 0
		},
		stinkAsked: {},
		stinkTalk: null,
		showersToday: 0,
		daySerial: 0,
		dutyNotice: [],
		flauntDay: {},
		markAffair: null
	};
}
function playerAlone(state) {
	return state.izzyHere === false || !state.present?.length;
}
function prefillDate(text, invite, today) {
	let day = null;
	for (const name of WEEKDAYS) if (new RegExp(`\\b${name}\\b`, "i").test(text)) day = name;
	if (!day && /\btomorrow\b/i.test(text)) day = nextWeekday(today);
	if (!day && /\btoday\b/i.test(text)) day = today;
	return {
		time: parseTimeOfDay(text),
		place: invite ?? parseMeetPlace(text),
		day
	};
}
function datePlaces(nth) {
	return Object.keys(LOCATIONS).filter((id) => !AWKWARD_DATES.has(id) && (nth >= 3 || !PRIVATE_DATES.has(id)));
}
function slotOpen(today, now, day, time) {
	const days = WEEKDAYS.indexOf(day) - WEEKDAYS.indexOf(today);
	if ((days < 0 ? days + 7 : days) === 0) return TIMES.indexOf(time) >= TIMES.indexOf(now);
	return true;
}
function dateIsDue(state) {
	const plan = state.scheduledDate;
	if (!plan || state.activeDate) return false;
	return plan.day === state.weekday && plan.time === state.timeOfDay;
}
function isAwkwardPlace(id) {
	return AWKWARD_DATES.has(id);
}
function dutyOf(girl, weekday, time) {
	const weekend = weekday === "Saturday" || weekday === "Sunday";
	if (girl === "izzy") {
		if (!weekend && time === "Morning") return "class";
		if (!weekend && time === "Afternoon" && (weekday === "Monday" || weekday === "Wednesday" || weekday === "Friday")) return "work";
		return "free";
	}
	if (!weekend && time === "Afternoon") return "work";
	return "free";
}
function dutyPlace(girl) {
	return girl === "victoria" ? "firm" : "sportingGoods";
}
function dutyStop(girl, weekday, time) {
	const duty = dutyOf(girl, weekday, time);
	if (duty === "free") return null;
	if (duty === "work") return dutyPlace(girl);
	return CAMPUS_AM[WEEKDAYS.indexOf(weekday) % CAMPUS_AM.length] ?? "library";
}
function dutyWarn(girl, duty) {
	if (girl === "victoria") return "The desk is open and it is mine. I'll hear you out once more. Then I have to go to Line & Lumen.";
	if (duty === "class") return "That's the block. I have class. Say what you wanted to say — then I have to actually go.";
	return "Trailhead just started without me. One more thing, then I have to clock in.";
}
function dutyFarewell(girl, duty) {
	if (girl === "victoria") return "That's the end of it. Line & Lumen. I'll be at the desk.";
	if (duty === "class") return "Okay. That's me. Class. I'll see you when I'm not late.";
	return "I'm clocking in. If you need a pack, you know where the floor is. If you need me, later.";
}
function dutyExitNarration(girl, duty) {
	const name = girlName(girl);
	return duty === "class" ? `${name} leaves for class.` : `${name} leaves for her shift.`;
}
var GROUP_ADDR = /\b(you guys|you two|both of you|you both|the two of you|ladies|all of you|everyone here|y'all|yall|you all|both girls|you girls)\b/i;
function isGroupAddress(text) {
	return GROUP_ADDR.test(text);
}
function addressedGirls(text, present) {
	const named = [];
	if (/\b(izzy|isabella)\b/i.test(text)) named.push("izzy");
	if (/\b(vicky|victoria)\b/i.test(text)) named.push("victoria");
	if (isGroupAddress(text)) return present.filter((id, i, all) => all.indexOf(id) === i);
	return named.filter((id) => present.includes(id));
}
function goodbyeSaid(text) {
	return /\b(bye|goodbye|good-bye|see you|see ya|later|heading out|take care|i(?:'m| am) (?:going|leaving|off)|gotta go|i should go|i have to go|good night|goodnight)\b/i.test(text);
}
/** 10 harsh, 6 pushy, 1 polite, 3 ordinary. */
function rudeness(text) {
	if (/\b(shut up|fuck you|fuck off|i don't care|i dont care|just come|stop making excuses|not that busy|skip (?:class|work)|blow (?:it|this) off|ditch (?:class|work)|get over it|worthless)\b/i.test(text)) return 10;
	if (/\b(come on|seriously|just this once|please just|you can leave|won't take long|wont take long|don't be like that|dont be like that|right now)\b/i.test(text)) return 6;
	if (/\b(sorry|no rush|when you(?:'re| are) free|after work|after class|whenever|another time|that(?:'s| is) fine|no worries|i can wait)\b/i.test(text)) return 1;
	return 3;
}
function wasOffended(text, swing) {
	return swing <= -4 || /\b(gross|freak|monster|shut up|i hate you|go away|get lost|disgusting)\b/i.test(text);
}
function awkwardMention(text, invite) {
	if (invite && isAwkwardPlace(invite)) return invite;
	if (/\b(lecture halls?|classrooms?)\b/i.test(text)) return "classroom";
	if (/\bstudy halls?\b/i.test(text)) return "studyHall";
	if (/\b(trailhead|sporting goods)\b/i.test(text)) return "sportingGoods";
	if (/\b(line (?:and|&) lumen|consulting firm|the firm|reception desk)\b/i.test(text)) return "firm";
	return null;
}
function busyLine(girl, duty, insist, loss) {
	if (girl === "victoria") {
		if (loss >= 8) return "I said I am working. The desk is not optional. No. I am not leaving.";
		if (loss <= 1) return "I can't leave the desk. If this is a design question, ask it here. Otherwise I will see you when the afternoon is over.";
		return "No. I am at Line & Lumen until this afternoon is done. I am not walking out because you thought that made sense.";
	}
	if (insist) return duty === "class" ? "I already said I have class. Pushing it doesn't move the lecture. Stop." : "I already said I'm on the clock. Asking again doesn't clock me out. Stop.";
	return duty === "class" ? "I have class this morning. I can't walk off. Ask me when I'm actually free." : "I'm on the floor at Trailhead this afternoon. I can talk if you're shopping. I can't leave.";
}
function awkwardLine(girl, place, loss) {
	if (girl === "victoria") {
		if (place === "firm") return loss >= 8 ? "A date at my own desk. No. And don't ask it like the chair is a table." : "You want a date at my reception desk. That is not a date. No.";
		if (place === "classroom" || place === "studyHall") return "A lecture hall is not dinner. I am not sitting in the back of a class for a date. No.";
		return loss >= 8 ? "Her job is not a date, and asking it like that doesn't help. No." : "Trailhead is where she works. I am not having a date between the backpacks. No.";
	}
	if (place === "classroom") return loss >= 8 ? "A date in the lecture hall? That's weird, and a little rude. No." : "A date in the lecture hall is just class with extra steps. No.";
	if (place === "studyHall") return "Study hall is where I pretend to do homework. It is not a date. Pick somewhere else.";
	if (place === "sportingGoods") return loss >= 8 ? "A date at my job, while I'm in the vest. No." : "Trailhead is work. I sell packs there. I don't date across the counter. No.";
	return "Line & Lumen is her office. I'm not taking a date to Vicky's desk. No.";
}
function classifyInvite(state, text, dest, dating) {
	if (!dest || dest === state.location) return null;
	const present = state.izzyHere === false || !state.present?.length ? [] : state.present;
	if (!present.length) return null;
	const named = addressedGirls(text, present);
	const group = isGroupAddress(text) || named.length > 1;
	const focus = state.focus ?? present[0];
	const targets = (group ? present : named.length === 1 ? named : [focus]).filter((id, i, all) => all.indexOf(id) === i);
	const loss = rudeness(text);
	if (dating && isAwkwardPlace(dest)) return {
		dest,
		going: [],
		blocked: targets.map((girl) => ({
			girl,
			bondingDelta: -loss,
			line: awkwardLine(girl, dest, loss),
			expression: loss >= 8 ? "angry" : "suspicious"
		})),
		press: null
	};
	const blocked = [];
	const going = [];
	let press = null;
	for (const girl of targets) {
		const duty = dutyOf(girl, state.weekday, state.timeOfDay);
		if (duty === "free") {
			going.push(girl);
			continue;
		}
		if (girl === "izzy") {
			const insist = state.pressedDuty === "izzy";
			blocked.push({
				girl,
				bondingDelta: insist ? -loss : 0,
				line: busyLine(girl, duty, insist, loss),
				expression: insist && loss >= 6 ? "angry" : "thinking"
			});
			press = "izzy";
		} else blocked.push({
			girl,
			bondingDelta: -loss,
			line: busyLine(girl, "work", true, loss),
			expression: loss >= 8 ? "angry" : "suspicious"
		});
	}
	if (!blocked.length) return null;
	return {
		dest,
		going,
		blocked,
		press
	};
}
function inviteParty(state, text, dest) {
	const present = state.izzyHere === false || !state.present?.length ? [] : [...state.present];
	const focus = state.focus ?? present[0] ?? "izzy";
	const named = addressedGirls(text, present);
	const party = (isGroupAddress(text) || named.length > 1 ? present.slice() : named.length === 1 ? [...named] : [focus]).filter((id, i, all) => all.indexOf(id) === i);
	for (const girl of ["izzy", "victoria"]) {
		if (party.includes(girl) || present.includes(girl)) continue;
		if (girlAt(state, girl) !== dest) continue;
		party.push(girl);
	}
	return party.length ? party : [focus];
}
function girlAt(state, girl) {
	if (state.present?.includes(girl) && state.izzyHere !== false) return state.location;
	const hurt = state.grudge?.[girl];
	if (hurt) return hurt.place;
	const plan = state.scheduledDate;
	if (plan?.girl === girl && dateIsDue(state)) return plan.place;
	if (state.timeOfDay === "Night" && girlIsOfficial(state, girl)) return girl === "victoria" ? "vickyLiving" : "dorm";
	if (state.departure?.girl === girl) return state.departure.place;
	const duty = dutyOf(girl, state.weekday, state.timeOfDay);
	if (duty === "class") return CAMPUS_AM[WEEKDAYS.indexOf(state.weekday) % CAMPUS_AM.length] ?? "library";
	if (duty === "work") return dutyPlace(girl);
	const list = HANGOUT[girl][state.timeOfDay];
	return list[(WEEKDAYS.indexOf(state.weekday) + TIMES.indexOf(state.timeOfDay)) % list.length] ?? "library";
}
function cyclesFor(nth) {
	return nth <= 1 ? 1 : 2;
}
var WELCOME = /don't mind|dont mind|i (like|love) (it|your|the smell|when you)|smell(s)? (good|great|fine)|stay|didn't flinch|didnt flinch|it's (fine|okay|ok)|its (fine|okay|ok)/i;
var FLINCH = /gross|eww|\bew\b|gag|nasty|too (strong|much)|hold your|cover it|spray (perfume|deo)|you stink|disgust/i;
function nextSmell(current, text) {
	if (FLINCH.test(text)) return "flinch";
	if (current === "flinch") return current;
	if (WELCOME.test(text)) return "welcome";
	return current;
}
function smellSummary(stance) {
	if (stance === "welcome") return "She believes you can live with the smell. You didn't flinch, and you said so.";
	if (stance === "flinch") return "You pulled back from the smell. That stayed with her longer than the gift.";
	return "You didn't make the smell a problem, and you didn't say you wanted it.";
}
function chanceOf(kind, stance, trustDelta, bondDelta) {
	if (kind === "insult" || stance === "flinch" && trustDelta < 0 || trustDelta <= -8 && bondDelta < 0) return "no";
	if ((kind === "love" || kind === "like") && stance !== "flinch" && bondDelta >= 0) return "likely";
	if (bondDelta >= 4 && stance === "welcome") return "likely";
	return "uncertain";
}
function closingLine(girl, chance) {
	if (girl === "victoria") {
		if (chance === "likely") return "I had a good time. I don't say that to be polite. If you ask again, I'll listen.";
		if (chance === "no") return "I came. I won't pretend the night was what I wanted. Don't ask me to dress it up.";
		return "It wasn't nothing. I'm not ready to call it a habit. Ask me properly if you want another.";
	}
	if (chance === "likely") return "Okay. That was a date. A real one. I would do it again. Don't get weird about it.";
	if (chance === "no") return "I showed up. That's the nicest thing I can say about it. I'm going.";
	return "It was... a date. I didn't hate it. I also didn't float home. We'll see.";
}
function buildReview(date, trustAfter, bondAfter) {
	const gift = giftById(date.giftId);
	const kind = gift ? receptionOf(gift, date.girl) : "ok";
	const trustDelta = trustAfter - date.startTrust;
	const bondDelta = bondAfter - date.startBonding;
	const nextChance = chanceOf(kind, date.smell, trustDelta, bondDelta);
	return {
		girl: date.girl,
		nth: date.nth,
		trustBefore: date.startTrust,
		trustAfter,
		bondBefore: date.startBonding,
		bondAfter,
		nextChance,
		farts: date.farts,
		smell: smellSummary(date.smell),
		gift: gift ? giftSummary(date.girl, gift) : "The gift never made it out of the bag.",
		askNext: date.nth < 3 && nextChance !== "no"
	};
}
function giftReaction(date) {
	const gift = giftById(date.giftId);
	if (!gift) return null;
	return {
		line: presentLine(gift, girlName(date.girl)),
		speech: giftSpeech(date.girl, gift),
		delta: receptionDelta(receptionOf(gift, date.girl))
	};
}
var APOLOGY = /sorry|i messed up|i should have|i forgot|forgive|i was wrong|didn'?t mean|let me explain|i got (scared|busy|lost)|i'?ll make it up|you didn'?t deserve|that was on me|i stood you up/i;
var CRUEL = /whatever|don'?t care|dont care|shut up|get over it|not a big deal|your fault|too sensitive|so what|not my problem/i;
var ELSEWHERE = {
	izzy: [
		"library",
		"cafe",
		"campus",
		"studyHall",
		"mexican",
		"burger",
		"animeStore",
		"tabletop",
		"trail",
		"gameStore"
	],
	victoria: [
		"cafe",
		"grocery",
		"italian",
		"furniture",
		"craftStore",
		"mall",
		"perfume",
		"library"
	]
};
function ageGas(gas) {
	return (gas ?? []).map((puff) => ({
		...puff,
		turns: puff.turns - 1
	})).filter((puff) => puff.turns > 0);
}
function nextStop(girl, time, avoid, weekday) {
	if (weekday) {
		const duty = dutyOf(girl, weekday, time);
		if (duty === "work") return dutyPlace(girl);
		if (duty === "class") {
			const pool = CAMPUS_AM.filter((id) => id !== avoid);
			return pool[Math.floor(Math.random() * pool.length)] ?? "library";
		}
	}
	const near = HANGOUT[girl][time].filter((id) => id !== avoid);
	const pool = near.length ? near : ELSEWHERE[girl].filter((id) => id !== avoid);
	return pool[Math.floor(Math.random() * pool.length)] ?? "cafe";
}
function leaveChance(state, girl, engaged, bored) {
	const official = girlIsOfficial(state, girl);
	const weekend = state.weekday === "Saturday" || state.weekday === "Sunday";
	const t = state.timeOfDay;
	let p = .05;
	if (girl === "izzy") {
		if (!weekend && (t === "Morning" || t === "Afternoon")) p = .28;
		else if (t === "Night" && !official) p = .18;
		else p = .06;
	} else if (!weekend && (t === "Morning" || t === "Afternoon")) p = .26;
	else if (t === "Evening" || t === "Night") p = official ? .12 : .22;
	else p = .06;
	if (engaged) p *= .22;
	if (bored) p *= 1.65;
	const card = state.roster?.[girl];
	const trust = card?.trust ?? state.trust;
	const bonding = card?.bonding ?? state.bonding;
	if (trust < 18 && bonding < 18) p *= 1.3;
	if (official) p *= .55;
	return Math.min(.62, p);
}
function leaveReason(state, girl, bored) {
	const t = state.timeOfDay;
	const duty = dutyOf(girl, state.weekday, t);
	if (girl === "victoria") {
		if (duty === "work") return "office";
		if (t === "Evening" || t === "Night") return "daughter";
		return bored ? "bored" : "errand";
	}
	if (duty === "class") return "class";
	if (duty === "work") return "shift";
	if (t === "Night") return "night";
	return bored ? "bored" : "errand";
}
function leaveCopy(girl, reason) {
	if (girl === "victoria") {
		if (reason === "office") return "I have a meeting. It will not move because I'm enjoying this. I have to get back.";
		if (reason === "daughter") return "Veronica's waiting on me. I liked this. I still have to go.";
		if (reason === "bored") return "I think we're done for now. I have a house that doesn't run itself.";
		return "I have errands that will not do themselves. This was good.";
	}
	if (reason === "class") return "I have class. If I skip, the professor notices the empty chair, and I already know how that ends. I have to go.";
	if (reason === "shift") return "My shift at Trailhead. If I don't clock in, the manager notices. I have to go.";
	if (reason === "night") return "I'm heading back. It's late, and I still have reading I was pretending I didn't.";
	if (reason === "bored") return "I'm gonna go. This isn't going anywhere and I can tell. Bye.";
	return "I'm gonna walk. My brain's full. I'll be around.";
}
function followLines(girl, streak) {
	if (streak >= 2) {
		if (girl === "victoria") return {
			expression: "angry",
			trust: -8,
			bonding: -5,
			text: "Once, I can call unlucky. Twice is you deciding where I go. I didn't tell you. Don't follow me."
		};
		return {
			expression: "angry",
			trust: -10,
			bonding: -8,
			text: "You did it again. I left, and you showed up. I didn't tell you where I was going. That's not cute. Don't follow me."
		};
	}
	if (girl === "victoria") return {
		expression: "suspicious",
		trust: -3,
		bonding: -1,
		text: "I didn't tell you I was coming here. Explain how you knew, and make it good."
	};
	return {
		expression: "suspicious",
		trust: -4,
		bonding: -2,
		text: "How are you here. I didn't tell you where I was going."
	};
}
function dateCrashLine(girl) {
	if (girl === "izzy") return {
		expression: "suspicious",
		trust: -12,
		bonding: -6,
		text: "You stood her up. Then you sat down with me. I saw how you treat someone who was waiting. I don't know what that makes me."
	};
	return {
		expression: "scheming",
		trust: -4,
		bonding: 4,
		text: "She was waiting, and you were here. That's cold. I make cold calls for a living. I'm not going to pretend I'm not a little glad it was my table. Don't make me watch it twice."
	};
}
var FRESHEN = {
	"scent-free-soap": 25,
	"checkout-spray": 15,
	"niche-musk": 15,
	"unscented-lotion": 10,
	"sample-set": 10,
	"tomato-sauce": 20,
	"industrial-soap": 30
};
var SHOWER_PLACES = /* @__PURE__ */ new Set([
	"apartment",
	"dorm",
	"vickyBedroom"
]);
function emptyScent() {
	return {
		izzy: 0,
		victoria: 0
	};
}
function normalizeScent(raw) {
	return {
		izzy: typeof raw?.izzy === "number" && Number.isFinite(raw.izzy) ? Math.max(0, Math.round(raw.izzy)) : 0,
		victoria: typeof raw?.victoria === "number" && Number.isFinite(raw.victoria) ? Math.max(0, Math.round(raw.victoria)) : 0
	};
}
function clampStink(n) {
	if (!Number.isFinite(n)) return 0;
	return Math.max(0, Math.min(100, Math.round(n)));
}
/** Who the player currently smells like. Off at 20 or below, and off on a tie. */
function markedBy(stink, scent) {
	if (stink <= 20) return null;
	if (scent.izzy > 20 && scent.izzy > scent.victoria) return "izzy";
	if (scent.victoria > 20 && scent.victoria > scent.izzy) return "victoria";
	return null;
}
function markedLabel(stink, scent) {
	if (stink <= 0) return "Nobody";
	if (scent.izzy > scent.victoria && scent.izzy > 0) return "Izzy";
	if (scent.victoria > scent.izzy && scent.victoria > 0) return "Victoria";
	return "Nobody";
}
function reduceStink(stink, scent, cut) {
	const level = clampStink(stink);
	const next = level - Math.max(0, Math.min(level, Math.round(cut)));
	if (next <= 0) return {
		stink: 0,
		scent: emptyScent()
	};
	const from = normalizeScent(scent);
	const total = from.izzy + from.victoria;
	if (total <= 0) return {
		stink: next,
		scent: emptyScent()
	};
	let izzy = Math.round(from.izzy / total * next);
	let victoria = next - izzy;
	if (victoria < 0) {
		izzy = next;
		victoria = 0;
	}
	return {
		stink: next,
		scent: {
			izzy,
			victoria
		}
	};
}
/** Add what she just put on the player. Decay is separate and only when the air is clear. */
function expose(stink, scent, events) {
	let level = clampStink(stink);
	let from = normalizeScent(scent);
	const poured = {};
	let switched = null;
	for (const event of events) {
		const before = markedBy(level, from);
		const applied = Math.max(0, Math.min(event.amount, 100 - level));
		if (applied <= 0) continue;
		from = {
			...from,
			[event.girl]: from[event.girl] + applied
		};
		level += applied;
		poured[event.girl] = (poured[event.girl] ?? 0) + applied;
		const after = markedBy(level, from);
		if (after === event.girl && after !== before) switched = {
			girl: event.girl,
			applied: poured[event.girl]
		};
	}
	return {
		stink: level,
		scent: from,
		switched
	};
}
/** Cap is full. A reclaim still moves the other girl's share onto her. */
function displaceScent(stink, scent, girl, amount) {
	const level = clampStink(stink);
	const from = normalizeScent(scent);
	const other = girl === "izzy" ? "victoria" : "izzy";
	const moved = Math.max(0, Math.min(from[other], Math.round(amount)));
	if (moved <= 0) return {
		stink: level,
		scent: from,
		switched: null
	};
	const next = {
		...from,
		[other]: from[other] - moved,
		[girl]: from[girl] + moved
	};
	const before = markedBy(level, from);
	const after = markedBy(level, next);
	return {
		stink: level,
		scent: next,
		switched: after === girl && after !== before ? {
			girl,
			applied: moved
		} : null
	};
}
/** 1 at a 5-point takeover, 10 at 90. */
function markBond(applied) {
	return Math.max(1, Math.min(10, Math.round(applied / 9)));
}
function showerCut(selectedIds) {
	const ratings = selectedIds.map((id) => FRESHEN[id] ?? 0).filter((n) => n > 0);
	if (!ratings.length) return 10;
	return Math.min(75, ratings.reduce((sum, n) => sum + n, 0));
}
function freshenRating(id) {
	return FRESHEN[id] ?? 0;
}
var SMELL_TOPIC = /\b(smell|stink|stank|odor|odour|scent|musk|reek|whiff|skunk|spray|gland|perfume|cologne|garlic|onion|sweat|deodorant)\b/i;
var ADMITS = /\b(skunk(?:girl)?s?|izzy|isabella|victoria|vicky|her (?:fart|gas|spray|musk|scent)|scent gland|she (?:sprayed|farted|marked)|another (?:girl|skunk))\b/i;
var DENIES = /\b(don'?t smell|do not smell|nothing|you(?:'re| are) imagining|no idea|not a skunk|isn'?t skunk|not skunk|just (?:food|garlic|onions?|the gym|gym|sweat|perfume|cologne|deodorant|soap|coffee|cheese|the (?:store|cafe|restaurant))|it(?:'s| is) (?:just |only )?(?:perfume|cologne|food|garlic|onions?|sweat|the gym|deodorant|soap|nothing|coffee|cheese))\b/i;
var WARM = /\b(like it|love it|don'?t mind|do not mind|it(?:'s| is) (?:hot|good|fine|okay)|into it|turns me on|i wanted|proud|show(?: me)? off|i(?:'m| am) yours)\b/i;
var ASHAMED = /\b(sorry|embarrassed|i hate it|too much|gross|didn'?t want|didnt want|accident|wish i didn'?t)\b/i;
function judgeSmell(stink, text, presses) {
	const blob = text.trim();
	if (!(SMELL_TOPIC.test(blob) || ADMITS.test(blob))) return {
		relevant: false,
		honest: false,
		trust: 0,
		bonding: 0,
		followUp: false
	};
	const admits = ADMITS.test(blob);
	const denies = DENIES.test(blob) && !admits;
	const honest = admits && !denies;
	const elaborate = blob.length >= 80;
	if (honest) {
		if (WARM.test(blob)) return {
			relevant: true,
			honest: true,
			trust: stink > 75 ? 5 : 4,
			bonding: stink > 75 ? 4 : 3,
			followUp: false
		};
		if (ASHAMED.test(blob)) return {
			relevant: true,
			honest: true,
			trust: 1,
			bonding: 0,
			followUp: false
		};
		return {
			relevant: true,
			honest: true,
			trust: 2,
			bonding: 1,
			followUp: false
		};
	}
	if (stink < 50) {
		const easy = stink <= 30 && elaborate;
		if (presses >= 1) {
			if (easy) return {
				relevant: true,
				honest: false,
				trust: 0,
				bonding: 0,
				followUp: false
			};
			return {
				relevant: true,
				honest: false,
				trust: -2,
				bonding: -1,
				followUp: false
			};
		}
		if (easy) return {
			relevant: true,
			honest: false,
			trust: 0,
			bonding: 0,
			followUp: true
		};
		return {
			relevant: true,
			honest: false,
			trust: stink >= 35 ? -3 : -1,
			bonding: 0,
			followUp: true
		};
	}
	if (stink <= 75) {
		const loss = elaborate ? -5 : -10;
		return {
			relevant: true,
			honest: false,
			trust: loss,
			bonding: loss,
			followUp: false
		};
	}
	const loss = elaborate ? -10 : -15;
	return {
		relevant: true,
		honest: false,
		trust: loss,
		bonding: loss,
		followUp: false
	};
}
function smellAskLine(girl, stink) {
	if (girl === "victoria") {
		if (stink > 75) return "That is a skunkgirl. Not the woods. Why do you smell like her?";
		if (stink >= 50) return "I need a name for that smell. Don't dress it up. What have you been standing in?";
		if (stink <= 30) return "There's something faint on your clothes. I almost missed it. Familiar, and not the room.";
		return "You have a scent on you. I know it. I'm not going to interrogate you. Unless you want to tell me.";
	}
	if (stink > 75) return "That's a skunkgirl. Not a candle. Why do you smell like one of us?";
	if (stink >= 50) return "Okay, that's not the room. What is that smell? I'm not accusing you. I just need a name for it.";
	if (stink <= 30) return "Huh. You smell a little like... never mind. It's faint. Could be the room.";
	return "You smell like something. Familiar. Not bad. I know that note. You don't have to explain it.";
}
function smellThought(girl, stink) {
	if (girl === "victoria") return stink <= 30 ? "Faint. Skunk, or close to it. I can let it sit if they don't lie." : "That's skunk. Not mine. I noticed. I don't have to make it a scene unless they do.";
	return stink <= 30 ? "Faint. Familiar. Skunk-ish. I can pretend I didn't clock it if they have a real story." : "That's a skunk. Not me. I'm not saying it out loud unless they do. My nose already filed it.";
}
function smellFollowUp(girl) {
	if (girl === "victoria") return "Specifics. Where did you pick that up, and how long were you there?";
	return "Walk me through that again. Where, exactly? I have a good nose. I want the version that survives it.";
}
function smellVerdict(girl, stink, judgment) {
	if (!judgment.relevant) return null;
	if (judgment.followUp) return smellFollowUp(girl);
	if (judgment.honest) {
		if (judgment.bonding >= 3) return girl === "victoria" ? "You smell like one of us and you're telling the truth about it. I can work with that. Don't smirk." : "Oh. So it's a skunkgirl, and you're not even sorry. That's a lot. I don't hate it.";
		if (judgment.trust <= 1) return girl === "victoria" ? "Honest, at least. Embarrassment isn't an apology, but it isn't a lie. I'll take the truth." : "Okay. You told me. You look like you want to crawl out of your hoodie. The truth still counts.";
		return girl === "victoria" ? "All right. It's skunk, and you said so. That was the correct answer." : "Thanks for just saying it. Skunk. I can work with skunk. I can't work with a story.";
	}
	if (stink > 75) return girl === "victoria" ? "Don't. I know a skunkgirl's musk from onions. Lying about my nose is an insult." : "Nope. That's a skunkgirl and we both know it. Don't lie to the person with the better nose.";
	if (stink >= 50) return girl === "victoria" ? "That is not what I am smelling. I won't name it for you. I will not accept a cover story either." : "I can tell when it's skunk. You don't have to confess the whole thing. You don't get to say it isn't.";
	if (judgment.trust < 0) return girl === "victoria" ? "I'm not convinced. I'll let it sit. Don't add a second version." : "Uh-huh. I'm letting it go. My nose isn't, fully.";
	return girl === "victoria" ? "Fine. It's faint enough that I'll accept the story. Don't make me ask twice." : "Okay. It's light. I'll buy it. For now.";
}
function markLine(girl, applied, where) {
	const heavy = applied >= 30;
	if (girl === "victoria") {
		if (where === "public" && heavy) return "Good. You smell like mine. Stay where people can tell. I want them to know.";
		if (heavy) return "That's me on you now. Heavy. I like you claimed. When we're out, I will not be subtle about it.";
		if (where === "public") return "Light. But it's me, and we're in public. Stay close. I don't mind who notices.";
		return "That's me on you now. Light. I still like it.";
	}
	if (heavy) return "Oh, you are soaked in me. That's... yeah. I like that more than I should. Get over here.";
	return "Ha. You smell a little like me now. That's funny. Don't make it weird. I kind of like it.";
}
function flauntLine(girl) {
	if (girl === "victoria") return "Stay close. We're out, and you smell like me. I want that noticed.";
	return "Heh. You're just walking around smelling like me. I'm having a normal amount of fun with that.";
}
function sameDay(asked, girl, day) {
	return (asked?.[girl] ?? -1) === day;
}
var CHEAT = /\b(cheated|unfaithful|i slept with|we slept|we had sex|i fucked|she(?:'s| is) my girlfriend|i(?:'m| am) dating her|i love her|affair|hooked up|i kissed her|we(?:'re| are) together|i(?:'m| am) with her(?: too)?)\b/i;
var PLATONIC = /\b(not romantic|nothing romantic|not dating|just friends|wasn'?t intimate|not intimate|not sex|no sex|accident|didn'?t mean|didnt mean|she just (?:farted|sprayed|gassed)|only (?:a fart|her fart|the smell|gas)|no feelings|wasn'?t a date|wasnt a date|not a girlfriend|not my girlfriend)\b/i;
var GENTLE = /\b(i(?:'m| am) sorry|forgive me|please (?:don'?t|do not) spray|i can explain|let me explain|it wasn'?t like that|it wasnt like that|i was wrong|i messed up|i regret)\b/i;
var PROUD = /\b(whatever|don'?t care|dont care|so what|too bad|get over it|not your business|shut up|i(?:'d| would) do it again|deal with it|she(?:'s| is) better|and i liked it)\b/i;
var PRIVATE = /* @__PURE__ */ new Set([
	"dorm",
	"apartment",
	"vickyBedroom",
	"vickyLiving"
]);
var SEMI = /* @__PURE__ */ new Set(["trail", "mexican"]);
var CROWD = /* @__PURE__ */ new Set([
	"classroom",
	"studyHall",
	"firm",
	"sportingGoods",
	"library",
	"campus",
	"mall",
	"cafe",
	"grocery",
	"foodCourt"
]);
var QUIET = {
	girl: null,
	affair: null,
	trust: 0,
	bonding: 0,
	breakTest: null,
	spray: null,
	fart: 0,
	lines: [],
	skipGeneric: false
};
function affair(girl, marker, phase, waits, extra = {}) {
	return {
		...QUIET,
		girl,
		affair: {
			girl,
			marker,
			phase,
			waits
		},
		skipGeneric: true,
		...extra
	};
}
function hit(text, min, max) {
	if (PROUD.test(text)) return max;
	const sorry = GENTLE.test(text);
	if (sorry && text.trim().length >= 80) return min;
	if (sorry) return min + Math.round((max - min) * .25);
	return min + Math.round((max - min) * .55);
}
function platonic(text, strict) {
	const blob = text.trim();
	if (CHEAT.test(blob) || PROUD.test(blob)) return false;
	if (!ADMITS.test(blob) && !PLATONIC.test(blob)) return false;
	if (PLATONIC.test(blob) && blob.length >= (strict ? 50 : 12)) return true;
	if (!strict && ADMITS.test(blob) && !DENIES.test(blob) && blob.length >= 40) return true;
	return strict && PLATONIC.test(blob) && blob.length >= 90;
}
function talkedDown$1(text) {
	const blob = text.trim();
	if (CHEAT.test(blob) || PROUD.test(blob) || DENIES.test(blob) && !ADMITS.test(blob)) return false;
	return blob.length >= 24 && (GENTLE.test(blob) || PLATONIC.test(blob));
}
function roomOf(place) {
	if (PRIVATE.has(place)) return "private";
	if (SEMI.has(place)) return "semi";
	if (CROWD.has(place)) return "crowd";
	return "public";
}
function resolveAffair(input) {
	const { existing, girl, marker, stink, mode, text, place, onDuty, busy, hold } = input;
	if (existing && (!girl || !marker || stink <= 50 || marker !== existing.marker || girl !== existing.girl || marker === existing.girl)) return {
		...QUIET,
		affair: null
	};
	if (!girl || !marker || girl === marker || stink <= 50) return {
		...QUIET,
		affair: existing
	};
	if (mode === "harem" && input.markerIsPartner) {
		if (existing?.phase === "known") return affair(girl, marker, "known", 0);
		return affair(girl, marker, "known", 0, { lines: [{
			text: girl === "victoria" ? "That's hers. I know who. You don't have to confess a woman I already agreed to. Come here anyway." : "Oh. That's her. I know that note. You're allowed. You could have led with it. I'm not mad.",
			expression: girl === "victoria" ? "scheming" : "flirty"
		}] });
	}
	const phase = existing?.phase ?? (girl === "izzy" ? mode === "harem" ? "hint" : "wait" : "demand");
	const waits = existing?.waits ?? 0;
	const relevant = SMELL_TOPIC.test(text) || ADMITS.test(text) || CHEAT.test(text) || PLATONIC.test(text);
	if (girl === "victoria" && mode === "mono") return victoriaMono(girl, marker, phase, waits, text, place, onDuty, busy, !existing);
	if (girl === "victoria") return victoriaHarem(girl, marker, phase, waits, text, onDuty, busy, hold, relevant, !existing);
	if (mode === "mono") return izzyMono(girl, marker, phase, waits, stink, text, place, onDuty, busy, relevant);
	return izzyHarem(girl, marker, phase, waits, text, place, onDuty, busy, hold, relevant);
}
function victoriaMono(girl, marker, phase, waits, text, place, onDuty, busy, opening) {
	if (opening || phase === "wait" || phase === "hint" || phase === "known") return affair(girl, marker, "demand", 0, { lines: [{
		text: "That is a skunkgirl. On you. Not cologne, and not a joke. Her scent is intimate, and I am not going to pretend I don't know that. Explain it.",
		expression: "angry"
	}] });
	if (phase === "demand") {
		if (CHEAT.test(text)) return cheat(girl, marker, text, "over");
		if (platonic(text, false)) return affair(girl, marker, "reclaim", 0, { lines: [{
			text: "I believe you. I will not leave her on your skin. When I am free, my bedroom. You will meet me there, and I will put myself back on you.",
			expression: "scheming"
		}] });
		if (!(SMELL_TOPIC.test(text) || ADMITS.test(text) || PLATONIC.test(text)) && text.trim().length < 8) return affair(girl, marker, "demand", waits + 1, { lines: [{
			text: "I'm still waiting. Why do you smell like her?",
			expression: "angry"
		}] });
		return affair(girl, marker, "warn", 0, { lines: [{
			text: "That is not an explanation. I am one breath from an angry spray. You have one more chance. Be gentle, and be honest.",
			expression: "angry"
		}] });
	}
	if (phase === "warn") {
		if (CHEAT.test(text)) return cheat(girl, marker, text, "over");
		if (talkedDown$1(text) || platonic(text, false)) return affair(girl, marker, "reclaim", 0, { lines: [{
			text: "All right. I heard you. The spray stays in. My bedroom, when I am free. I am still replacing her.",
			expression: "suspicious"
		}] });
		return affair(girl, marker, "spent", 0, {
			trust: -8,
			bonding: -8,
			spray: busy ? null : "angry",
			lines: [{
				text: "I gave you the chance. You didn't take it. Hold still.",
				expression: "spray"
			}]
		});
	}
	if (phase === "spent") {
		if (CHEAT.test(text)) return cheat(girl, marker, text, "over");
		if (platonic(text, false)) return affair(girl, marker, "reclaim", 0, { lines: [{
			text: "That is the explanation I asked for. My bedroom. I am not done until you smell like me.",
			expression: "scheming"
		}] });
		return affair(girl, marker, "spent", waits);
	}
	return reclaimVictoria(girl, marker, place, onDuty, busy, waits);
}
function victoriaHarem(girl, marker, phase, waits, text, onDuty, busy, hold, relevant, opening) {
	if (phase === "reclaim") return sneak(girl, marker, onDuty, busy, hold, waits);
	if (opening || phase !== "demand" && phase !== "warn" && phase !== "spent" && phase !== "known") return affair(girl, marker, "demand", 0, { lines: [{
		text: "You smell like a skunkgirl, and you did not tell me before you wore her here. I don't need to be the only one. I need to have agreed first. Who is she?",
		expression: "suspicious"
	}] });
	if (phase === "spent" || phase === "known") {
		if (platonic(text, false) || ADMITS.test(text) && !DENIES.test(text) || CHEAT.test(text)) return affair(girl, marker, "reclaim", 0, { lines: [{
			text: "Thank you for saying it. Is she kind to you? I won't have you mishandled. And I am putting some of me back on you, quietly.",
			expression: "thinking"
		}] });
		return affair(girl, marker, phase === "known" ? "known" : "spent", waits);
	}
	if (DENIES.test(text) && !ADMITS.test(text) || PROUD.test(text) && !ADMITS.test(text)) {
		const loss = text.trim().length < 40 ? -12 : -8;
		return affair(girl, marker, "spent", 0, {
			trust: loss,
			bonding: loss,
			lines: [{
				text: "Don't lie to my nose. I asked for the truth before you touched anyone else. That was the condition. This hurts.",
				expression: "angry"
			}]
		});
	}
	if (ADMITS.test(text) || PLATONIC.test(text) || CHEAT.test(text)) return affair(girl, marker, "reclaim", 0, { lines: [{
		text: "Late. But you told me. Is she treating you right? I will check, in my way. And I'm going to put my scent back on you. Quietly, until you smell like you have a home.",
		expression: "scheming"
	}] });
	if (!relevant) return affair(girl, marker, "demand", waits + 1, { lines: [{
		text: "I'm still asking. Who marked you, and why didn't I know?",
		expression: "suspicious"
	}] });
	return affair(girl, marker, "demand", waits);
}
function izzyMono(girl, marker, phase, waits, stink, text, place, onDuty, busy, relevant) {
	if (phase === "reclaim") return reclaimIzzy(girl, marker, place, onDuty, busy, false, waits);
	if (phase === "wait" || phase === "hint" || phase === "known") {
		if (relevant || CHEAT.test(text)) return judgeIzzy(girl, marker, stink, text, false);
		const next = waits + 1;
		if (next >= 4) return affair(girl, marker, "demand", next, {
			trust: -5,
			bonding: -5,
			lines: [{
				text: stink > 75 ? "You were going to wear that and hope I have a worse nose than I do. That is another skunkgirl, and it's a lot. Why are you hiding it?" : "You were just going to wear that and hope I didn't notice. I noticed. Why are you hiding it from me?",
				expression: "suspicious"
			}]
		});
		return affair(girl, marker, "wait", next, { lines: next === 1 ? [{
			text: "That's not me. That's another skunkgirl. I'm waiting to see if they say it first.",
			expression: "suspicious",
			thought: true
		}] : [] });
	}
	if (phase === "demand" || phase === "warn") return judgeIzzy(girl, marker, stink, text, true);
	if (CHEAT.test(text) || platonic(text, stink > 75)) return judgeIzzy(girl, marker, stink, text, true);
	return affair(girl, marker, "spent", waits);
}
function izzyHarem(girl, marker, phase, waits, text, place, onDuty, busy, hold, relevant) {
	if (phase === "reclaim") return reclaimIzzy(girl, marker, place, onDuty, busy, true, waits);
	if (phase === "spent") {
		if (relevant) return judgeIzzyHarem(girl, marker, text);
		return affair(girl, marker, "spent", waits);
	}
	if (phase === "demand" || phase === "warn") return judgeIzzyHarem(girl, marker, text);
	if (relevant) return judgeIzzyHarem(girl, marker, text);
	const next = waits + 1;
	if (next >= 4) return affair(girl, marker, "demand", next, { lines: [{
		text: "You're still not going to mention it? I can smell her. I'm not accusing. I am starting to think you're hiding her from me.",
		expression: "suspicious"
	}] });
	return affair(girl, marker, "hint", next, { lines: [{
		text: next === 1 ? "Weird. You smell like a skunkgirl I haven't met. I'm not accusing. I'm also not stupid." : "That note is still on you. Skunkgirl. You can tell me. I'd rather hear it than guess.",
		expression: "thinking"
	}] });
}
function judgeIzzy(girl, marker, stink, text, asked) {
	if (CHEAT.test(text)) {
		const loss = -hit(text, 25, 50);
		const cruel = PROUD.test(text) || loss <= -40;
		return affair(girl, marker, "spent", 0, {
			trust: loss,
			bonding: loss,
			breakTest: "under",
			spray: cruel ? "angry" : null,
			lines: [{
				text: cruel ? "You cheated, and you're proud of it. Don't smile. Hold still." : "You cheated. I heard you. I'm hurt. Don't dress it up.",
				expression: cruel ? "spray" : "angry"
			}]
		});
	}
	const strict = stink > 75;
	if (platonic(text, strict)) return affair(girl, marker, "reclaim", 0, { lines: [{
		text: strict ? "That's a real explanation. I don't love how much of her is on you, but it isn't a girlfriend. I can live with it. I still want mine on you, if the room lets me get away with it." : "Not romantic. Not a thing. Okay. I can live with a smell if she isn't your girlfriend. I still want mine over it.",
		expression: "shy"
	}] });
	if (!asked && !(SMELL_TOPIC.test(text) || ADMITS.test(text))) return affair(girl, marker, "wait", 1);
	if (DENIES.test(text) && !ADMITS.test(text)) return affair(girl, marker, "demand", 0, {
		trust: strict ? -8 : -4,
		bonding: strict ? -8 : -4,
		lines: [{
			text: strict ? "That story doesn't survive a nose. You smell thoroughly like her. Try again, and don't invent a candle." : "I can tell it's skunk. You don't have to make it a romance. You don't get to say it isn't her.",
			expression: "suspicious"
		}]
	});
	return affair(girl, marker, "demand", 0, { lines: [{
		text: strict ? "How did you get that much of her on you? I need the real version. Thoroughly real." : "Say it plainly. Is it romantic, or is it just her scent?",
		expression: "suspicious"
	}] });
}
function judgeIzzyHarem(girl, marker, text) {
	if (DENIES.test(text) && !ADMITS.test(text)) return affair(girl, marker, "spent", 0, {
		trust: -10,
		bonding: -8,
		lines: [{
			text: "You just tried to cover a skunkgirl with a story. That hurts more than the smell. I can share. I can't be lied to.",
			expression: "angry"
		}]
	});
	if (ADMITS.test(text) || PLATONIC.test(text) || CHEAT.test(text)) return affair(girl, marker, "reclaim", 0, { lines: [{
		text: "You could have told me before you walked in wearing her. Who is she? Is she nice? I want the version where I'm not the last to know. And yeah. I'm getting my scent on you. Fair's fair.",
		expression: "scheming"
	}] });
	return affair(girl, marker, "demand", 0, { lines: [{
		text: "Just tell me. Who is she? I'm curious, not your mom. Don't make me guess.",
		expression: "thinking"
	}] });
}
function cheat(girl, marker, text, test) {
	const loss = -hit(text, 25, test === "over" ? 75 : 50);
	return affair(girl, marker, "spent", 0, {
		trust: loss,
		bonding: loss,
		breakTest: test,
		lines: [{
			text: girl === "victoria" ? "You were with her. You wore her home to me. A skunkgirl's scent is not a souvenir. It is intimate, and you spent it on someone else." : "You cheated. I heard you. I'm hurt. Don't dress it up.",
			expression: "angry"
		}]
	});
}
function reclaimVictoria(girl, marker, place, onDuty, busy, waits) {
	if (onDuty || place !== "vickyBedroom") {
		const nag = onDuty ? 1 : 2;
		if (waits === nag) return affair(girl, marker, "reclaim", waits);
		return affair(girl, marker, "reclaim", nag, { lines: [{
			text: onDuty ? "Not here. When I am off the desk, my bedroom. I meant that. I am not finished until you smell like me." : "My bedroom. Not later as a maybe. When we are there I will fart on you, and I will dominant-spray, until she is gone off your skin.",
			expression: "scheming"
		}] });
	}
	if (busy) return affair(girl, marker, "reclaim", 0);
	return affair(girl, marker, "reclaim", 0, {
		fart: 3,
		spray: "dominant",
		lines: [{
			text: "Stay. Bedroom rules. This one is mine, and the spray after it is mine. I'm not asking.",
			expression: "spray"
		}]
	});
}
function reclaimIzzy(girl, marker, place, onDuty, busy, harem, waits) {
	if (onDuty) {
		if (waits > 0) return affair(girl, marker, "reclaim", waits);
		return affair(girl, marker, "reclaim", 1, { lines: [{
			text: "I want my scent back on you. Not while I'm on the clock. After. Don't think I forgot.",
			expression: "scheming"
		}] });
	}
	const room = roomOf(place);
	if (busy) return affair(girl, marker, "reclaim", waits);
	if (room === "private" || harem && room === "semi") return affair(girl, marker, "reclaim", 0, {
		fart: 3,
		spray: "dominant",
		lines: [{
			text: room === "semi" ? "Back corner. Trail or a booth, I don't care. Big one, then the spray. I'm putting me over her." : "Okay. Door's ours. Large one, and then I spray. I want you smelling like me, not her.",
			expression: "spray"
		}]
	});
	if (waits > 0) return affair(girl, marker, "reclaim", waits - 1);
	if (room === "semi" || room === "public") return affair(girl, marker, "reclaim", 1, {
		fart: 3,
		lines: [{
			text: "I can get away with a big one here. Not the spray. Not yet. Let it sit on you.",
			expression: "scheming"
		}]
	});
	return affair(girl, marker, "reclaim", 1, {
		fart: 2,
		lines: [{
			text: "Small. Sneaky. People are around. I still want a little of me on you.",
			expression: "flirty"
		}]
	});
}
function sneak(girl, marker, onDuty, busy, _hold, waits) {
	if (onDuty || busy) return affair(girl, marker, "reclaim", waits);
	if (waits > 0) return affair(girl, marker, "reclaim", waits - 1);
	return affair(girl, marker, "reclaim", 1, {
		fart: 2,
		lines: [{
			text: "Excuse me. That one was mine. I would like you to keep it. I didn't announce it on purpose.",
			expression: "scheming"
		}]
	});
}
var HARD_STOP = /\b(safeword|\bred\b|ooc\b|for real|actually stop|stop for real|i mean it, stop)\b/i;
var ATTACK = /\b(kill|punch|choke|stab|beat you|attack you|hurt you|weapon|hit you|slap you|i('m| am) going to (kill|hurt|hit))\b/i;
var SCARE = /\b(boo+|jumpscare|jump-?scare|snuck up|sneak up|lunge|loom|scare you|gotcha|jump at)\b/i;
var CONTACT = /\b(grab(?:s|bed|bing)?|punch(?:es|ed)?|hit(?:s|ting)?|slap(?:s|ped)?|choke(?:s|d)?|stab(?:s|bed)?|shove(?:s|d)?|kick(?:s|ed)?|tackle(?:s|d)?)\b/i;
var CALM = /\b(sorry|mean no harm|no harm|won'?t hurt|will not hurt|not going to hurt|hands? (up|off)|backing (off|away)|i'?m not a threat|just (kidding|talking)|didn'?t mean|no sudden|i (stop|stopped|freeze)|easy,|easy\b|i yield|i surrender)\b/i;
function threatKind(hay) {
	if (ATTACK.test(hay)) return "attack";
	if (SCARE.test(hay)) return "scare";
	return null;
}
function madeContact(hay) {
	return CONTACT.test(hay) && (ATTACK.test(hay) || SCARE.test(hay) || /\b(her|izzy)\b/i.test(hay));
}
function talkedDown(hay) {
	return CALM.test(hay) && !madeContact(hay) && !ATTACK.test(hay);
}
function pressingThreat(hay) {
	return madeContact(hay) || ATTACK.test(hay) || /\b(lunge|step closer|come closer|don'?t stop|do it anyway|grab her|i grab)\b/i.test(hay);
}
var PLAY_TOUCH = /\b(pat+|patted|patting|spank|spanked|smack|smacked|slap|slapped|grab|grabbed|squeeze|squeezed|grope|groped)\b/i;
var ASS = /\b(ass|butt|cheek|thigh|hip|rear)\b/i;
var INTIMATE = /\b(kiss|sex|bed|make love|intimate|undress|want you|mark me|inside|fuck|breed|dom|kneel|good (boy|girl)|hold still|brace)\b/i;
var SPRAY_WORD = /\bspray\b/i;
var PREPARE = /\b(do it|yes|yeah|please|brace|hold still|i('m| am) ready|go ahead|mark me|don'?t stop|stay|wait|oh god|please don'?t|no—|no\.\.\.|mercy|whimper)\b/i;
function lastThreeNegative(state) {
	return state.messages.filter((m) => m.role === "izzy").slice(-3).some((m) => (m.trustDelta ?? 0) < 0 || (m.bondingDelta ?? 0) < 0);
}
function angrySprayAllowed(state) {
	if (state.trust > 0 && state.bonding > 0 && !lastThreeNegative(state)) return false;
	return true;
}
function intimateContext(state, input) {
	const hay = `${input.say} ${input.action}`;
	const romantic = state.flags.romanceAccepted || state.bond === "romantic";
	return romantic || state.pendingIntimateSpray || state.trust >= 75 && state.bonding >= 75 && INTIMATE.test(hay) || state.location === "dorm" && romantic;
}
function isCncPlay(state, input) {
	const hay = `${input.say} ${input.action}`;
	if (HARD_STOP.test(hay)) return false;
	if (!intimateContext(state, input)) return false;
	return /don'?t|please don'?t|no+|stop|mercy|wait|you wouldn'?t/.test(hay.toLowerCase());
}
function impactPlay(state, hay) {
	if (!PLAY_TOUCH.test(hay) || !ASS.test(hay)) return false;
	if (intimateContext(state, {
		say: hay,
		action: ""
	})) return true;
	return state.trust >= 40 && state.bonding >= 40 && !lastThreeNegative(state);
}
function dominantSprayMode(state, turn) {
	if (state.flags.sprayYield === "submit") return false;
	if (glandsDry(state)) return false;
	if (state.flags.sprayYield === "resist") return true;
	if (turn.sprayKind === "dominant") return true;
	return state.playerFartRole === "not";
}
function playerPrepared(input) {
	const hay = `${input.say} ${input.action}`;
	if (HARD_STOP.test(hay)) return false;
	return PREPARE.test(hay) || SPRAY_WORD.test(hay) || hay.trim().length === 0;
}
function defensiveSprayCopy(threat) {
	if (threat === "attack") return {
		narration: "She doesn't wait. She shoves her bottoms down around her thighs, tail high, and fires a hot chemical jet. She sprayed because you put hands on her.",
		dialogue: "I sprayed you. Bottoms down, tail up, the whole jet — because you grabbed me. That's why. Stay back."
	};
	if (threat === "scare") return {
		narration: "She already told you to stop. She drops her bottoms, tail straight up, and sprays a defensive burst anyway. She did it because she still thought you were a threat.",
		dialogue: "I warned you. You kept coming, so I sprayed. Bottoms down, tail high. That's how, and that's why."
	};
	return {
		narration: "Her ears pin. She yanks her bottoms down, tail high, and a defensive spray hits like a wall. She did it because she thought you were a threat.",
		dialogue: "I sprayed you. Tail up, bottoms down, a full defensive burst. I did it because I thought you were going to hurt me."
	};
}
function resolveSprayEvent(state, input, turn, opts) {
	const hay = `${input.say} ${input.action}`;
	const close = intimateContext(state, input);
	const modelBurst = Boolean(turn.sprayed || turn.fx === "spray" || turn.expression === "spray" && !turn.pendingIntimateSpray);
	const modelWindup = Boolean(turn.pendingIntimateSpray);
	const angryOk = angrySprayAllowed(state);
	const dry = glandsDry(state);
	const play = impactPlay(state, hay);
	const harm = (ATTACK.test(hay) || SCARE.test(hay)) && !play;
	const explicitDefensive = turn.sprayKind === "defensive" && (Boolean(turn.sprayed) || turn.fx === "spray" || turn.expression === "spray");
	if (opts?.reroll) {
		if (explicitDefensive && !play) return {
			kind: "defensive",
			phase: "burst"
		};
		if (turn.sprayKind === "defensive" && !play) return {
			kind: "defensive",
			phase: "windup"
		};
	} else if (state.pendingDefensive) {
		if (talkedDown(hay) && !pressingThreat(hay) && !explicitDefensive) return {
			kind: "none",
			phase: "none"
		};
		if (pressingThreat(hay) || harm || madeContact(hay) || explicitDefensive) return {
			kind: "defensive",
			phase: "burst"
		};
		return {
			kind: "none",
			phase: "none"
		};
	} else if (harm || explicitDefensive && !play) {
		if (madeContact(hay) || explicitDefensive || state.pendingDefensive && pressingThreat(hay)) return {
			kind: "defensive",
			phase: "burst"
		};
		return {
			kind: "defensive",
			phase: "windup"
		};
	}
	const intimateBurst = modelBurst && turn.sprayKind !== "defensive" && turn.sprayKind !== "angry";
	if (!dry && state.pendingIntimateSpray && playerPrepared(input) && !HARD_STOP.test(hay)) return {
		kind: "consensual",
		phase: "burst"
	};
	if (!dry && close && SPRAY_WORD.test(hay) && !HARD_STOP.test(hay) && turn.sprayKind !== "defensive") return {
		kind: "consensual",
		phase: "burst"
	};
	if (!dry && close && (turn.sprayKind === "consensual" || intimateBurst || SPRAY_WORD.test(hay) || isCncPlay(state, input)) && turn.sprayKind !== "defensive") {
		if (modelWindup && !intimateBurst) return {
			kind: "consensual",
			phase: "windup"
		};
		if (intimateBurst || turn.sprayKind === "consensual" || SPRAY_WORD.test(hay) || isCncPlay(state, input)) {
			if (turn.pendingIntimateSpray && !intimateBurst) return {
				kind: "consensual",
				phase: "windup"
			};
			if (intimateBurst || turn.sprayKind === "consensual") return {
				kind: "consensual",
				phase: "burst"
			};
		}
	}
	if (!dry && turn.sprayKind === "consensual" && (intimateBurst || modelWindup)) return {
		kind: "consensual",
		phase: intimateBurst ? "burst" : "windup"
	};
	if (!dry && modelWindup && (close || state.trust >= 75 && state.bonding >= 75)) return {
		kind: "consensual",
		phase: "windup"
	};
	if (!dry && intimateBurst && close) return {
		kind: "consensual",
		phase: "burst"
	};
	if ((turn.sprayKind === "angry" || modelBurst && !close && turn.sprayKind !== "defensive") && !close) {
		if (!angryOk) return {
			kind: "none",
			phase: "none"
		};
		if (turn.sprayKind === "angry" || modelBurst) return {
			kind: "angry",
			phase: "burst"
		};
	}
	if (modelBurst && angryOk && !close && turn.sprayKind !== "defensive") return {
		kind: "angry",
		phase: "burst"
	};
	return {
		kind: "none",
		phase: "none"
	};
}
function rollGlandCap() {
	const weights = [
		1,
		2,
		4,
		6,
		4,
		2,
		1
	];
	let roll = Math.random() * weights.reduce((sum, n) => sum + n, 0);
	for (let i = 0; i < weights.length; i++) {
		roll -= weights[i];
		if (roll <= 0) return 8 + i;
	}
	return 11;
}
function glandNum(value) {
	return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}
function readTank(raw) {
	return {
		glandCap: glandNum(raw?.glandCap),
		glandShots: glandNum(raw?.glandShots),
		turnsSinceIntimateSpray: glandNum(raw?.turnsSinceIntimateSpray),
		glandDry: glandNum(raw?.glandDry)
	};
}
/** One fired spray, any kind. A new session rolls 8–14. The shot that hits the cap empties her. */
function spendTank(tank) {
	let cap = tank.glandCap;
	let shots = tank.glandShots;
	if (tank.turnsSinceIntimateSpray >= 3 || cap <= 0) {
		cap = rollGlandCap();
		shots = 0;
	}
	shots += 1;
	if (shots >= cap) return {
		tank: {
			glandCap: 0,
			glandShots: 0,
			turnsSinceIntimateSpray: 0,
			glandDry: 12
		},
		emptied: true
	};
	return {
		tank: {
			glandCap: cap,
			glandShots: shots,
			turnsSinceIntimateSpray: 0,
			glandDry: 0
		},
		emptied: false
	};
}
/** She did not spray. Dry counts down. Three quiet turns end the session. */
function restTank(tank) {
	if (tank.glandDry > 0) return {
		...tank,
		glandDry: tank.glandDry - 1
	};
	const turns = tank.turnsSinceIntimateSpray + 1;
	if (turns >= 3) return {
		glandCap: 0,
		glandShots: 0,
		turnsSinceIntimateSpray: turns,
		glandDry: 0
	};
	return {
		...tank,
		turnsSinceIntimateSpray: turns
	};
}
/** Model sprays are already spent. Extra shots are scripted sprays this same turn. Everyone else rests. */
function finishTanks(tanks, already, extra) {
	const emptied = [];
	const next = {
		izzy: tanks.izzy,
		victoria: tanks.victoria
	};
	for (const girl of ["izzy", "victoria"]) {
		let tank = next[girl];
		const more = extra[girl] ?? 0;
		for (let i = 0; i < more; i++) {
			if (tank.glandDry > 0) break;
			const spent = spendTank(tank);
			tank = spent.tank;
			if (spent.emptied) emptied.push(girl);
		}
		if (!already[girl] && more <= 0) tank = restTank(tank);
		next[girl] = tank;
	}
	return {
		tanks: next,
		emptied
	};
}
function glandsDry(state) {
	return (state.glandDry ?? 0) > 0;
}
function shouldInitiateIntimate(state, input) {
	const text = `${input.say} ${input.action}`;
	if ((state.scentHold ?? 0) > 0 && !asksForScentNow(text) && !scentRelentless(state, input)) return false;
	if (glandsDry(state)) return false;
	if (state.pendingIntimateSpray) return false;
	if (state.flags.intimateScene) return false;
	const scent = state.flags.scentInterest || showedScentInterest(text) || state.flags.fartConverted || state.flags.sprayYield !== "none";
	if (!intimacyAllowed({
		...state,
		flags: {
			...state.flags,
			scentInterest: scent
		}
	})) return false;
	return sexualBeat(text) || /\bspray\b/i.test(text);
}
//#endregion
export { dutyStop as $, victoriaOpening as $n, nicknamesFor as $t, cardCouple as A, sameDay as An, inviteParty as At, dateCrashLine as B, slowCeiling as Bn, leaveCopy as Bt, bondLabel as C, resolveAffair as Cn, holdCopy as Ct, callThem as D, romanceBlocked as Dn, intimacyBrief as Dt, bumpSpray as E, resolveSprayEvent as En, intimacyAllowed as Et, clearFed as F, sexualBeat as Fn, isPrivatePlace as Ft, displaceScent as G, spendTank as Gn, markLine as Gt, datePlaces as H, smellThought as Hn, likesPlayer as Ht, closingLine as I, shouldInitiateIntimate as In, isStore as It, duetFallback as J, threatKind as Jn, mentionsFart as Jt, dominantSprayMode as K, suitedPlace as Kn, markedBy as Kt, cn as L, showedScentInterest as Ln, judgeSmell as Lt, clamp as M, scentRelentless as Mn, isCouple as Mt, clampStink as N, seedMeeting as Nn, isDateAsk as Nt, canFartNow as O, romanceGate as On, intimacyCall as Ot, classifyInvite as P, settleGuts as Pn, isGroupAddress as Pt, dutyPlace as Q, victoriaLingerieOn as Qn, nextWeekday as Qt, companionChance as R, showerCut as Rn, laterSlot as Rt, bondFromScores as S, refusalCopy as Sn, herHome as St, buildReview as T, resolvePlace as Tn, initialCast as Tt, defensiveSprayCopy as U, smellVerdict as Un, madeContact as Ut, dateIsDue as V, smellAskLine as Vn, leaveReason as Vt, describeArrival as W, speakerRole as Wn, markBond as Wt, dutyFarewell as X, uid as Xn, nextSmell as Xt, dutyExitNarration as Y, topicsFrom as Yn, morningSpots as Yt, dutyOf as Z, victoriaDropIn as Zn, nextStop as Zt, applyTrust as _, readGut as _n, girlShort as _t, GIRLS as a, parseMeetPlace as an, fedAfter as at, autoOutfit as b, redirectCopy as bn, goodbyeSaid as bt, OUTFIT_LABEL as c, playerAlone as cn, flauntLine as ct, WEEKDAYS as d, portraitSrc as dn, giftById as dt, normalizeScent as en, wasOffended as er, dutyWarn as et, addressedGirls as f, prefillDate as fn, giftReaction as ft, applyBonding as g, pushFocus as gn, girlName as gt, angrySprayAllowed as h, pullFocus as hn, girlIsOfficial as ht, FRESHEN as i, ownsHome as in, fartChance as it, chosenNickname as j, scaleSlowGain as jn, isAwkwardPlace as jt, canSleepNow as k, rudeness as kn, intimateFetishFart as kt, SHOWER_PLACES as l, playerPrepared as ln, followLines as lt, ageGas as m, publicFartYes as mn, girlAt as mt, CRUEL as n, openTonight as nn, emptySprays as nt, LOCATIONS as o, parseTimeOfDay as on, fidelityHit as ot, advanceTime as p, publicFartNo as pn, giftsAt as pt, dropFartProse as q, talkedDown as qn, markedLabel as qt, FIRST_MEETS as r, otherGirl as rn, expose as rt, LOCATION_GROUPS as s, placeOf as sn, finishTanks as st, APOLOGY as t, oneGreeting as tn, withGirl as tr, economySeed as tt, TIMES as u, playfulPublicAsk as un, freshenRating as ut, asLocationId as v, readTank as vn, givenName as vt, bothHere as w, resolveFx as wn, indulgesPublicFart as wt, awkwardMention as x, reduceStink as xn, gutBrief as xt, asOutfitId as y, recentLines as yn, glandsDry as yt, cyclesFor as z, slotOpen as zn, leaveChance as zt };
