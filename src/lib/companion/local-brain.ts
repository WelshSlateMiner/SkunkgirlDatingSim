import type { Expression, FxEvent, GameState, IzzyTurn, LocationId, SprayKind, TurnInput } from "./types";
import { inviteVerdict, isNo, isYes } from "./invite";
import { placeOf } from "./locations";
import { romanceGate, scaleSlowGain, slowCeiling } from "./dates";
import { callThem, givenName } from "./nicknames";
import {
  angrySprayAllowed,
  glandsDry,
  playerPrepared,
  shouldInitiateIntimate,
} from "./spray";
import { bothHere, duetFallback, otherGirl, romanceBlocked } from "./cast";
import { addressedGirls, dutyOf, isGroupAddress } from "./outing";
import { REPLY_DELTA_MAX, REPLY_DELTA_MIN } from "./trust";
import { localSceneExtras, sceneGirls } from "./scene";
import {
  holdCopy,
  intimacyAllowed,
  intimacyCall,
  recentLines,
  redirectCopy,
  refusalCopy,
  scentRelentless,
  sexualBeat,
  showedScentInterest,
} from "./intimacy";

function askingPast(text: string) {
  return /childhood|when you were (a )?kid|grew up|growing up|your (parents|mom|dad|family)|foster|adopt|where (are|were) you from|where you (grew|were born)|appalach|your past|backstory|elementary|high school|little girl/.test(
    text,
  );
}

const POS = [
  "kind",
  "don't mind",
  "dont mind",
  "i don't mind",
  "cute",
  "pretty",
  "beautiful",
  "like you",
  "friend",
  "sit",
  "join",
  "help",
  "sorry",
  "evangelion",
  "history",
  "bionicle",
  "hoi4",
  "jak",
  "ratchet",
  "war thunder",
  "ongezellig",
  "mymy",
  "mexican",
  "understand",
  "here for you",
  "stay",
  "wave",
  "smile",
  "compliment",
  "handsome",
  "date",
  "hold",
  "hug",
];

const NEG = [
  "gross",
  "disgusting",
  "nasty",
  "ugly",
  "fat",
  "freak",
  "monster",
  "shut up",
  "plug",
  "pinch my nose",
  "cover my nose",
  "stink you",
  "hate",
  "leave",
  "go away",
  "weirdo",
  "pathetic",
  "ew",
  "eww",
  "get away",
  "trash",
];

const THREAT = [
  "kill",
  "hit you",
  "hurt you",
  "attack",
  "spray you first",
  "punch",
  "weapon",
  "die",
  "choke",
];

function hay(input: TurnInput) {
  return `${input.say} ${input.action}`.toLowerCase();
}

function hits(text: string, words: string[]) {
  return words.filter((w) => text.includes(w)).length;
}

function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)] as T;
}

function earlyStay(place: string, id: string) {
  if (id === "library" || id === "studyHall") {
    return pick([
      `You can sit. I was already in the middle of something at ${place}, and I'll keep talking if you stay.`,
      "You're not plugging your nose. That's new. I'll try not to make it weird. I will fail a little.",
    ]);
  }
  if (id === "trail") {
    return pick([
      "You didn't turn around. The trail's big enough that you could have. I'll walk if you walk.",
      "Most people speed up when they catch me out here. You didn't. I don't know what to do with that except keep going.",
    ]);
  }
  if (id === "gym" || id === "field" || id === "yogaStudio") {
    return pick([
      `You stayed. ${place} is a loud room to decide I'm fine, but I'll take it.`,
      "Most people find another bench. You didn't. You can stay. I'll talk if you want.",
    ]);
  }
  return pick([
    `You're still here. At ${place}. I was braced for the exit. You can stay.`,
    `Okay. You didn't bail. ${place} is a weird place to decide I'm fine, but I'll take it.`,
  ]);
}

const RONNIE_STOP = new Set([
  "that",
  "this",
  "with",
  "from",
  "have",
  "just",
  "like",
  "your",
  "youre",
  "about",
  "what",
  "when",
  "where",
  "would",
  "could",
  "should",
  "there",
  "their",
  "them",
  "they",
  "then",
  "than",
  "been",
  "being",
  "into",
  "onto",
  "over",
  "under",
  "really",
  "gonna",
  "want",
  "wanna",
  "please",
  "thanks",
  "thank",
  "okay",
  "yeah",
  "yep",
  "nope",
  "dont",
  "does",
  "doing",
  "make",
  "makes",
  "made",
  "know",
  "think",
  "thought",
  "because",
  "cause",
  "something",
  "anything",
  "nothing",
  "everyone",
  "someone",
  "actually",
  "pretty",
  "still",
  "even",
  "also",
  "only",
  "very",
  "much",
  "more",
  "some",
  "tell",
  "talk",
  "saying",
  "said",
  "whats",
  "whos",
  "going",
  "right",
  "well",
  "good",
  "nice",
  "cool",
  "sure",
  "maybe",
  "kinda",
  "sort",
  "stuff",
  "thing",
  "things",
  "people",
  "person",
  "love",
  "hate",
]);

function ronnieSubjects(say: string) {
  return say
    .toLowerCase()
    .replace(/[^a-z0-9' ]/g, " ")
    .split(/\s+/)
    .map((word) => word.replace(/^'+|'+$/g, ""))
    .filter((word) => word.length > 3 && !RONNIE_STOP.has(word));
}

function ronnieAsking(say: string) {
  const line = say.trim().toLowerCase();
  return (
    line.includes("?") ||
    /^(who|what|why|how|when|where|which|whose|do you|are you|can you|did you|have you|will you|would you|what's|whats)\b/.test(
      line,
    )
  );
}

function ronnieTopic(say: string) {
  const cleaned = say.replace(/\?+/g, " ").replace(/\s+/g, " ").trim();
  const match = cleaned.match(
    /\b(?:what|who|why|how|when|where|which)\s+(?:is|are|was|were|do|does|did|about|would|should|'s)?\s*(.{3,70})$/i,
  );
  const raw = (match?.[1] ?? ronnieSubjects(say).slice(0, 4).join(" ")).replace(/\s+/g, " ").trim();
  return raw.replace(/^(you|your|the|a|an|my|me|to|of|for|and|or)\s+/i, "").trim();
}

function ronnieChime(text: string, met: boolean) {
  if (/\b(mom|mother|vicky|victoria)\b/.test(text)) {
    return "That's my mom. I love her. I'm still not her, and I'm not repeating her line.";
  }
  if (/\b(izzy|isabella)\b/.test(text)) {
    return "Izzy can talk. I go here too. Don't hand me her sentence.";
  }
  const bits = ronnieSubjects(text).slice(0, 3);
  if (bits.length) {
    return met
      ? `I heard you on ${bits.join(" ")}. I've got my own take, and it's shorter than hers.`
      : `Ronnie. I caught ${bits[0]}. Don't talk like I'm not standing here.`;
  }
  return met
    ? "Still here. Say it to me if you want my answer, not a copy of hers."
    : "Ronnie. Track, health sciences. Don't stop. Just don't forget I'm in the room.";
}

function miraChime(text: string, met: boolean) {
  if (/\b(stage name|idol name)\b/.test(text)) return "I don't have a stage name. Don't offer one.";
  if (/\b(ronnie|yoga)\b/.test(text)) return "Ronnie teaches yoga. I teach the count. Different shift.";
  if (/\b(izzy|isabella)\b/.test(text)) return "Izzy can want to be friends. I'm not there yet.";
  return met ? "I'm still here. Say it to me if you want my answer." : "Mira. Don't talk around me.";
}

function previewMeter(state: GameState, current: number, delta: number) {
  const d = state.gameMode === "slow" ? scaleSlowGain(delta) : delta;
  let next = current + d;
  if (state.gameMode === "slow" && next > current) next = Math.min(next, slowCeiling(state.dates ?? 0));
  return next;
}

function romanceReady(state: GameState, trustDelta: number, bondingDelta: number) {
  if (state.flags.romanceAccepted) return false;
  const dates = state.dates ?? 0;
  if (state.gameMode === "slow" && dates < 3) return false;
  const gate = romanceGate(state.gameMode, dates, state.dateSpots ?? []);
  return previewMeter(state, state.trust, trustDelta) >= gate.trust && previewMeter(state, state.bonding, bondingDelta) >= gate.bonding;
}

function fetishTalk(text: string) {
  return /fetish|get off|turned on|horny|skunkgirl fart|love (your |the |her )?farts|into (your )?(farts|gas|spray|stink)|fart (on|in) (my|me)|gassy girl|your gas|sit on my (face|lap)|want you to (fart|spray)/.test(
    text,
  );
}

function contextualInvite(
  state: GameState,
  text: string,
  nextTrust: number,
): Pick<IzzyTurn, "dialogue" | "narration" | "expression" | "suggestLocation" | "testId"> | null {
  if (state.pendingInvite) return null;
  if (nextTrust < 22 || state.bonding < 16) return null;
  const at = state.location;

  const wantsHome =
    /dorm|your (place|room|home)|at home|collection|figurines?|figures?|merch|come over|your stuff|show me|see them/.test(
      text,
    );
  const hungry =
    /taco|burrito|mexican|beans|hungry|starving|eat|food|lunch|dinner|salsa|casa luna|craving/.test(text);
  const anime =
    /eva\b|evangelion|anime|monster musume|plus sized elf|neko|figurine|figure/.test(text);
  const games = /hoi4|jak |daxter|ratchet|war thunder|game store|bionicle|video game/.test(text);
  const boards = /axis|allies|board game|tabletop|strategy game|hex and timber|war game/.test(text);
  const theirPlace = /my apartment|my place|come over to mine|at my place|my room/.test(text);
  const woods = /hike|trail|woods|forest|moss|mushroom|outside|nature/.test(text);
  const shakes = /burger|shake|fries|milkshake/.test(text);

  const couple = state.flags.romanceAccepted || state.bond === "romantic";
  if (wantsHome && couple && at !== "dorm") {
    return {
      narration: "She picks at her hem like this is a bigger ask than she's pretending.",
      expression: "embarrassed",
      suggestLocation: "dorm" as LocationId,
      testId: "dorm-invite",
      dialogue: pick([
        "Yeah — that lives at my dorm. You can come check it out if you want. Fair warning, it's not just merch lying around, and the air is… personalized. Up to you. Would be cool if you're cool with that.",
        "Fellow nerd energy. My room's a wreck and it smells like me, which is redundant. Still. You can come over. Only if you want. I am asking.",
      ]),
    };
  }
  if (hungry && at !== "mexican" && !state.flags.invitedMexican) {
    return {
      narration: "Her stomach answers before she does.",
      expression: "happy",
      suggestLocation: "mexican" as LocationId,
      testId: "mexican-invite",
      dialogue: pick([
        "You said food and my brain went Casa Luna. Extra beans, obviously. You in, or am I taking this craving solo?",
        "Okay, if we're gonna keep talking I want tortillas involved. Casa Luna. Not a kidnapping. A proposal.",
      ]),
    };
  }
  if (shakes && at !== "burger" && nextTrust >= 20) {
    return {
      narration: "",
      expression: "happy",
      suggestLocation: "burger" as LocationId,
      testId: "burger-invite",
      dialogue:
        "Shake & Stack then. Vinyl booths, too much sugar, I will steal fries. Coming, or am I a party of one with a milkshake?",
    };
  }
  if (anime && at !== "animeStore" && at !== "collectibles" && nextTrust >= 26) {
    return {
      narration: "Her tail flicks like a shopping list just wrote itself.",
      expression: "infodump",
      suggestLocation: "animeStore" as LocationId,
      testId: "anime-invite",
      dialogue:
        "Neko Shelf has the thing I was talking about. Or it better. You wanna come be a nerd in public with me, or is that a later chapter?",
    };
  }
  if (boards && at !== "tabletop" && nextTrust >= 24) {
    return {
      narration: "Her ears go up like someone said the magic words.",
      expression: "infodump",
      suggestLocation: "tabletop" as LocationId,
      testId: "tabletop-invite",
      dialogue: pick([
        "Hex & Timber has the big Europe board and the big Pacific board. I want both on one table. Come play, or at least come watch me lose with style.",
        "If you actually like this stuff, the lounge in the back of Hex & Timber is where we should be arguing. I'm asking. You in?",
      ]),
    };
  }
  if (games && at !== "gameStore" && nextTrust >= 26) {
    return {
      narration: "",
      expression: "happy",
      suggestLocation: "gameStore" as LocationId,
      testId: "game-invite",
      dialogue:
        "Pixel & Cartridge. If we're gonna argue about this we should do it in front of the actual box art. You in?",
    };
  }
  if (theirPlace && couple && at !== "apartment") {
    return {
      narration: "She looks at you like you just handed her a key and she is checking it isn't a joke.",
      expression: "shy",
      suggestLocation: "apartment" as LocationId,
      testId: "apartment-invite",
      dialogue: pick([
        "Your place? Light-blue-walls, grey-carpet, your posters, your bed. Yeah. I can do a guest. If you still want a skunkgirl in there after I say yes.",
        "Okay. Your apartment, not mine. I'll come. Don't make it a big ceremony. I will still smell like me.",
      ]),
    };
  }
  if (woods && at !== "trail" && nextTrust >= 20) {
    return {
      narration: "",
      expression: "happy",
      suggestLocation: "trail" as LocationId,
      testId: "trail-invite",
      dialogue:
        "Nature trail's right there. I actually know that path. Come walk it with me — unless you'd rather keep sitting in this recycled air.",
    };
  }
  return null;
}

function withOther(state: GameState, input: TurnInput, turn: IzzyTurn): IzzyTurn {
  if (!bothHere(state)) return turn;
  const focus = state.focus ?? "izzy";
  const other = otherGirl(focus, state.present);
  if (turn.otherDialogue?.trim()) return turn;
  const text = hay(input);
  const card = state.roster?.[other];
  const herState = {
    ...state,
    trust: card?.trust ?? 0,
    bonding: card?.bonding ?? 0,
    flags: {
      ...state.flags,
      romanceAccepted: Boolean(card?.romanceAccepted),
      scentInterest: Boolean(card?.scentInterest) || showedScentInterest(text),
    },
  };
  const gas = turn.fx === "fart" || turn.fx === "spray" || Boolean(turn.sprayed);
  const mono = (state.relationshipType ?? "mono") !== "harem";
  const sheOfficial = Boolean(card?.romanceAccepted);
  const heOfficial = Boolean(state.flags.romanceAccepted);
  const hold = (state.scentHold ?? 0) > 0 && !asksRelease(text) && !scentRelentless(state, input);
  const askedBoth = /\b(both of you|you both|you two|the two of you|together)\b/i.test(text);
  const pullingHerIn = askedBoth || sexualBeat(text) || Boolean(state.flags.intimateScene);
  const willing = intimacyAllowed(herState) && !hold && !(mono && pullingHerIn && sheOfficial !== heOfficial);

  if (pullingHerIn && !willing) {
    const izzy = other === "izzy";
    return {
      ...turn,
      otherDialogue: mono && sheOfficial && !heOfficial
        ? izzy
          ? "Hey. I'm right here. You don't get to do that with her and smile at me after."
          : "I am standing in this room. Do not do that with her and expect me to clap."
        : izzy
          ? "I'm not jumping in. Not like that. Not yet."
          : "No. I am not joining that. Not until I choose it.",
      otherExpression: "suspicious",
      otherTrustDelta: -2,
      otherBondingDelta: -1,
      otherFx: "none",
    };
  }

  if (willing && gas && pullingHerIn && (askedBoth || card?.scentInterest || (sheOfficial && heOfficial))) {
    const spray = Boolean(turn.sprayed) || turn.fx === "spray";
    const izzy = other === "izzy";
    return {
      ...turn,
      otherDialogue: spray
        ? izzy
          ? "If she's doing it, I'm not standing here polite. Tail's up. Mine's louder."
          : "Then both of us. Skirt up. I want to see what the two of us do to you."
        : izzy
          ? "Don't leave me out. Mine's right behind hers. Different sound. Same idea."
          : "I held mine all day. If she can let one go, so can I. Don't look away.",
      otherExpression: spray ? "spray" : izzy ? "embarrassed" : "shy",
      otherTrustDelta: 1,
      otherBondingDelta: 2,
      otherFx: spray ? "spray" : "fart",
      otherSprayKind: spray ? "dominant" : null,
    };
  }

  const chimed =
    isGroupAddress(text) ||
    addressedGirls(text, state.present ?? []).length > 1 ||
    /\b(what do you think|you too|your turn)\b/i.test(text);
  if (!chimed && Math.random() > 0.34) {
    return {
      ...turn,
      otherDialogue: "",
      otherExpression: card?.expression ?? "shy",
      otherTrustDelta: 0,
      otherBondingDelta: 0,
      otherFx: "none",
    };
  }

  return {
    ...turn,
    otherDialogue: other === "ronnie" ? ronnieChime(text, Boolean(card?.met)) : other === "mira" ? miraChime(text, Boolean(card?.met)) : duetFallback(other, Boolean(card?.met)),
    otherExpression: card?.expression ?? "shy",
    otherTrustDelta: 0,
    otherBondingDelta: 1,
    otherFx: "none",
  };
}

function asksRelease(text: string) {
  return /again|another|both of you|you both|more/.test(text);
}

function relentlessBeat(state: GameState, input: TurnInput): IzzyTurn | null {
  if (!scentRelentless(state, input)) return null;
  const focus = state.focus ?? "izzy";
  const text = hay(input);
  const dry = glandsDry(state);
  const reclaim = state.markAffair?.phase === "reclaim" && state.markAffair.girl === focus;
  const dominant =
    state.flags.sprayYield === "resist" ||
    state.flags.defenseAftermath === "surrender" ||
    (state.playerFartRole === "not" && state.flags.sprayYield !== "submit");
  const askedSpray = /\bspray\b|mark me/.test(text);
  const izzy = focus !== "victoria";
  if ((askedSpray || reclaim || state.flags.sprayYield === "resist") && !dry) {
    const kind: SprayKind =
      state.flags.sprayYield === "submit" ? "consensual" : dominant || reclaim ? "dominant" : "consensual";
    return {
      narration: izzy
        ? "She doesn't let the air clear. Tail up, and she fires again."
        : "She hikes the skirt. The last cloud is still there. She fires into it.",
      dialogue: izzy ? "Again. I'm not done putting this on you." : "Stay still. That was not the last one.",
      expression: "spray",
      trustDelta: 2,
      bondingDelta: 2,
      fx: "spray",
      sprayed: true,
      sprayKind: kind,
      pendingIntimateSpray: false,
    };
  }
  return null;
}

function localVictoriaTurn(state: GameState, input: TurnInput): IzzyTurn {
  const text = hay(input);
  const pos = hits(text, POS);
  const neg = hits(text, NEG);
  const threat = hits(text, THREAT);
  const called = callThem(state.playerName, state.trust, state.flags.nicknamesOff);

  if (threat && !/pat|spank|smack/.test(text)) {
    const contact = /grab|punch|hit her|slap her|choke|kick her|shove/.test(text);
    if (!contact) {
      return withOther(state, input, {
        narration: "Her ears pin. The tail lifts a precise inch. She has not sprayed. She is telling you not to make her.",
        dialogue: "Stop. I have excellent aim, and I would rather not use it. Hands where I can see them. Tell me you mean no harm.",
        expression: "suspicious",
        trustDelta: -4,
        bondingDelta: -2,
        fx: "none",
        sprayed: false,
        sprayKind: "defensive",
      });
    }
    return withOther(state, input, {
      narration: "She doesn't flail. The tail comes up, the shot is short and aimed, and the air goes thick.",
      dialogue: "That was a threat. I handled it. Stay where you are.",
      expression: "spray",
      trustDelta: -16,
      bondingDelta: -8,
      fx: "spray",
      sprayed: true,
      sprayKind: "defensive",
    });
  }

  if ((neg >= 2 && state.trust < 15) || (neg >= 1 && state.trust <= 0 && angrySprayAllowed(state))) {
    return withOther(state, input, {
      narration: "The polite face is gone. She is exact about it.",
      dialogue: "I asked for civil. You chose something else. That's on you.",
      expression: "spray",
      trustDelta: -14,
      bondingDelta: -6,
      fx: "spray",
      sprayed: true,
      sprayKind: "angry",
    });
  }

  if (fetishTalk(text) && state.trust < 28 && !state.flags.romanceAccepted) {
    return withOther(state, input, {
      narration: "She straightens her glasses. The warmth leaves the sentence.",
      dialogue: "We are not there. My name is Victoria. Start with that.",
      expression: "suspicious",
      trustDelta: -6,
      bondingDelta: -5,
      fx: "none",
    });
  }

  if (input.invite) {
    const dest = placeOf(input.invite);
    const tone = inviteVerdict(state, input.invite);
    if (tone === "here") {
      return withOther(state, input, {
        dialogue: "We're already here. Sit down.",
        expression: "idle",
        trustDelta: 0,
        bondingDelta: 0,
        fx: "none",
      });
    }
    if (tone === "stern-no" || tone === "polite-no") {
      return withOther(state, input, {
        narration: "She shakes her head once. It is not a negotiation.",
        dialogue:
          dest.id === "dorm"
            ? "That is Isabella's room. I don't take people there."
            : "Not that place. Not with me. Pick somewhere that fits the day.",
        expression: "shy",
        trustDelta: 0,
        bondingDelta: -1,
        fx: "none",
      });
    }
    return withOther(state, input, {
      narration: "She checks the time, then agrees like she already decided to take you.",
      dialogue: `${dest.name}. Fine. I'll handle getting us there. Don't make me wait.`,
      expression: "happy",
      trustDelta: 2,
      bondingDelta: 3,
      fx: "none",
      suggestLocation: dest.id,
    });
  }

  const gate = intimacyCall(state, input);
  if (gate.blocked) {
    const copy = refusalCopy(state, gate.blocked);
    return withOther(state, input, {
      narration: copy.narration,
      dialogue: copy.dialogue,
      expression: copy.expression,
      trustDelta: 0,
      bondingDelta: 0,
      fx: "none",
      sprayed: false,
      sprayKind: null,
      pendingIntimateSpray: false,
    });
  }
  if ((state.scentHold ?? 0) > 0 && (gate.scene || state.flags.intimateScene)) {
    const push = relentlessBeat(state, input);
    if (push) return withOther(state, input, push);
    const copy = holdCopy("victoria", recentLines(state.messages, "victoria"));
    return withOther(state, input, {
      narration: copy.narration,
      dialogue: copy.dialogue,
      expression: copy.expression,
      trustDelta: 0,
      bondingDelta: 1,
      fx: "none",
      sprayed: false,
      sprayKind: null,
    });
  }
  if (gate.redirect) {
    const copy = redirectCopy(state);
    return withOther(state, input, {
      narration: copy.narration,
      dialogue: copy.dialogue,
      expression: copy.expression,
      trustDelta: 1,
      bondingDelta: 1,
      fx: "none",
      sprayed: false,
      sprayKind: null,
    });
  }
  if (gate.concluded) {
    return withOther(state, input, {
      narration: "She stays close, but she puts the scene down. She is waiting on you.",
      dialogue: "That's enough. I'm still here. You say when it's over. I heard you.",
      expression: "shy",
      trustDelta: 1,
      bondingDelta: 2,
      fx: "none",
      sprayed: false,
      sprayKind: null,
      pendingIntimateSpray: false,
    });
  }
  if (gate.scene || state.flags.intimateScene) {
    const push = relentlessBeat(state, input);
    if (push) return withOther(state, input, push);
  }

  const design = /design|furniture|fabric|floral|organize|layout|hobby|sew|crochet|lego|dollhouse|interior/.test(text);
  const food = /cook|dinner|hungry|restaurant|italian|pasta|bake|recipe/.test(text);
  const work = /office|promotion|secretary|coworker|job|career/.test(text);
  const daughter = /veronica|your daughter|kid/.test(text);
  const past =
    /single mom|raised (her|veronica) alone|veronica'?s (dad|father)|her father|your ex|first boyfriend|ghosted|why .{0,40}(shy|hide|hiding|cover|perfume|self-conscious|self conscious)/.test(
      text,
    );
  const scent = /don't mind|dont mind|it's fine|its fine|not bad|stay|didn't flinch|didnt flinch|perfume/.test(text);
  let trustDelta = pos ? 2 : 1;
  let bondingDelta = 1;
  if (design) {
    trustDelta += 2;
    bondingDelta += 4;
  }
  if (food) bondingDelta += 3;
  if (work) bondingDelta += 2;
  if (past && state.trust >= 36) bondingDelta += 3;
  if (scent) trustDelta += 4;
  if (neg) {
    trustDelta = -6;
    bondingDelta = -3;
  }
  if (!input.say && !input.action) trustDelta = 0;
  trustDelta = Math.max(REPLY_DELTA_MIN, Math.min(REPLY_DELTA_MAX, trustDelta));
  bondingDelta = Math.max(-8, Math.min(8, bondingDelta));

  const nextTrust = previewMeter(state, state.trust, trustDelta);
  const nextBond = previewMeter(state, state.bonding, bondingDelta);
  const offer =
    romanceReady(state, trustDelta, bondingDelta) &&
    !romanceBlocked(state, nextTrust, nextBond, state.dates ?? 0);

  let dialogue = called
    ? `${called}. Sit. You're doing that thing where you pretend the day was fine. I can see it. Come here.`
    : "Sit. You're doing that thing where you pretend the day was fine. I can see it.";
  let expression: Expression = "happy";
  if (design) {
    expression = "infodump";
    dialogue =
      "The layout is the whole problem. Pretty, and nowhere for a person to actually sit. I can fix that. I like fixing that.";
  } else if (food) {
    dialogue = "Hungry? Don't lie to me. I cook when the week has been loud, and I like having someone to put a plate in front of. Sit.";
  } else if (past) {
    expression = state.trust >= 36 ? "shy" : "suspicious";
    dialogue =
      state.trust >= 36
        ? "I raised Veronica alone. Her father was my first. College. The night I stopped hiding, he almost left, then he stayed long enough to get what he wanted and disappeared. So when someone says they like the smell, I hear the leaving. I hate that I still hear it."
        : "That is not a story for someone I just met. I raised my daughter. The rest can wait.";
  } else if (daughter) {
    expression = "thinking";
    dialogue =
      "Veronica is twenty. She goes by Ronnie. Track team, health sciences, blonde on purpose. She teaches at the yoga studio a few afternoons and lives in the gym the rest of the time. She loves me. She is not a mommy's girl. That's the version I tell people.";
  } else if (work) {
    expression = "thinking";
    dialogue =
      "The office spent years not knowing what I was. They know now. I still buy the perfume. I haven't decided how much of that I still owe them. The promotion, I have decided. I'm taking it.";
  } else if (scent) {
    expression = "shy";
    dialogue =
      "Thank you for not making a scene. I hold it all day, and when it gets out it is not subtle. You stayed. I don't know what to do with that except keep you close. Don't look so pleased.";
  } else if (neg) {
    expression = "angry";
    dialogue = "You can dislike it. You don't get to be cruel. I heard you. We're done with that sentence.";
  }

  return withOther(state, input, {
    dialogue,
    expression,
    trustDelta,
    bondingDelta,
    fx: scent ? "blush" : "none",
    romanceOffer: offer,
    narration: "",
  });
}

/** Offline reply for the focus girl, plus one short line from any third-or-later girl the player addressed. */
export function localIzzyTurn(state: GameState, input: TurnInput): IzzyTurn {
  const turn = localFocusTurn(state, input);
  const extras = localSceneExtras(sceneGirls(state), state.focus ?? "izzy", hay(input));
  return extras ? { ...turn, extras: [...(turn.extras ?? []), ...extras] } : turn;
}

/** Ronnie offline: short, competitive, sarcastic, unashamed about gas. */
function localRonnieTurn(state: GameState, input: TurnInput): IzzyTurn {
  const text = hay(input);
  const pos = hits(text, POS);
  const neg = hits(text, NEG);
  const threat = hits(text, THREAT);
  const gas = /fart|gas|toot|smell|stink|reek/.test(text);

  if (threat && !/pat|spank|smack/.test(text)) {
    const contact = /grab|punch|hit her|slap her|choke|kick her|shove/.test(text);
    if (!contact) {
      return withOther(state, input, {
        narration: "Her stance widens like it's a start line. The tail is already up.",
        dialogue: "Try it. I'm faster than you and I've got a better aim. Back off.",
        expression: "angry",
        trustDelta: -4,
        bondingDelta: -2,
        fx: "none",
        sprayKind: "defensive",
      });
    }
    return withOther(state, input, {
      narration: "She pivots, the tail snaps up, and the shot lands before you finish the move.",
      dialogue: "Yeah. That's what you get. Stay down.",
      expression: "spray",
      trustDelta: -16,
      bondingDelta: -8,
      fx: "spray",
      sprayed: true,
      sprayKind: "defensive",
    });
  }

  if (gas && neg) {
    const big = neg >= 2;
    return withOther(state, input, {
      dialogue: big
        ? "Wow. Okay. It's protein and fiber, it's a body, and you're making it a whole thing. Grow up."
        : "Don't like it? Fair. Not changing, though. Protein and fiber, champ.",
      expression: big ? "angry" : "suspicious",
      trustDelta: big ? -6 : -1,
      bondingDelta: big ? -4 : 0,
      fx: "none",
      fartReaction: big ? "bigIssue" : "negative",
    });
  }

  if (gas) {
    return withOther(state, input, {
      dialogue: pos
        ? "Ha! See, you get it. Bet you can't top that, though."
        : "That's just everything working. You keeping up or what?",
      expression: pos ? "laughing" : "scheming",
      trustDelta: pos ? 4 : 2,
      bondingDelta: pos ? 3 : 1,
      fx: pos ? "laugh" : "none",
      fartReaction: pos ? "playful" : "cool",
    });
  }

  if (neg >= 1) {
    const jab = ronnieSubjects(input.say).slice(0, 3).join(" ");
    return withOther(state, input, {
      dialogue: jab
        ? `${jab} is a cheap shot. I lift more than you and I'm in a better mood. Try a real sentence.`
        : "Okay, attitude. I lift more than you and I'm in a better mood. Try again.",
      expression: "suspicious",
      trustDelta: -3,
      bondingDelta: -2,
      fx: "none",
    });
  }

  const say = input.say.trim();
  const asked = ronnieAsking(say);
  const topic = ronnieTopic(say);
  const duty = dutyOf("ronnie", state.weekday, state.timeOfDay);
  const who = callThem(state.playerName, state.trust, Boolean(state.flags.nicknamesOff));
  const dating = /\b(date|take you out|go out with me)\b/.test(text);
  const rawQuote = topic || ronnieSubjects(say).slice(0, 4).join(" ");
  const quote = rawQuote ? rawQuote.charAt(0).toUpperCase() + rawQuote.slice(1) : "";

  if (input.invite) {
    const dest = placeOf(input.invite);
    if (duty === "class") {
      return withOther(state, input, {
        dialogue: `Class isn't over. I'm not walking to ${dest.name} in the middle of a lecture. Ask me after.`,
        expression: "thinking",
        trustDelta: 0,
        bondingDelta: 0,
        fx: "none",
      });
    }
    if (duty === "work") {
      return withOther(state, input, {
        dialogue: `I'm teaching. ${dest.name} waits until the last person is off the mat. Stay for class or catch me after.`,
        expression: "thinking",
        trustDelta: 0,
        bondingDelta: 1,
        fx: "none",
      });
    }
    if (dest.id === "dorm") {
      return withOther(state, input, {
        dialogue: "That's Izzy's room. I don't wander in there. Pick somewhere else.",
        expression: "suspicious",
        trustDelta: -1,
        bondingDelta: 0,
        fx: "none",
      });
    }
    if (dest.id === "vickyLiving" || dest.id === "vickyBedroom") {
      return withOther(state, input, {
        dialogue: "That's my mom's house. I'm not taking you there. Not to hang out, and not on a date.",
        expression: "suspicious",
        trustDelta: 0,
        bondingDelta: -1,
        fx: "none",
      });
    }
    if (dest.id === "firm" || dest.id === "classroom" || dest.id === "studyHall") {
      return withOther(state, input, {
        dialogue: `${dest.name} isn't a hangout. I go to class. I don't date a desk.`,
        expression: "idle",
        trustDelta: 0,
        bondingDelta: 0,
        fx: "none",
      });
    }
    const tone = inviteVerdict(state, input.invite);
    const casualSpot = dest.id === "ronnieDorm" || dest.id === "apartment";
    if (tone === "here") {
      return withOther(state, input, {
        dialogue: `We're already at ${dest.name}. Look around. Say what you wanted to do here.`,
        expression: "idle",
        trustDelta: 0,
        bondingDelta: 0,
        fx: "none",
      });
    }
    if (tone === "eager" || tone === "casual") {
      const casualNote = dating && casualSpot ? " That's a casual read of us, just so you know. I'm still in." : "";
      return withOther(state, input, {
        dialogue: `${dest.name}. Yeah. I'm moving.${casualNote}`,
        expression: "happy",
        trustDelta: 1,
        bondingDelta: 2,
        fx: "none",
      });
    }
    return withOther(state, input, {
      dialogue:
        tone === "stern-no"
          ? `No. ${dest.name} is not happening. We don't know each other like that.`
          : `Not ${dest.name}. Not yet. Ask me somewhere I actually go, after we've hung out.`,
      expression: tone === "stern-no" ? "suspicious" : "idle",
      trustDelta: tone === "stern-no" ? -1 : 0,
      bondingDelta: 0,
      fx: "none",
    });
  }

  if (state.pendingInvite) {
    const dest = placeOf(state.pendingInvite);
    const blob = `${input.say} ${input.action}`;
    if (input.inviteReply === "accept" || (isYes(blob) && !isNo(blob))) {
      return withOther(state, input, {
        dialogue: `You said yes. ${dest.name}. Don't make me walk there talking to myself.`,
        expression: "happy",
        trustDelta: 1,
        bondingDelta: 2,
        fx: "none",
      });
    }
    if (input.inviteReply === "decline" || (isNo(blob) && !isYes(blob))) {
      return withOther(state, input, {
        dialogue: `Not ${dest.name}. Fine. Stay on what you actually wanted to say.`,
        expression: "idle",
        trustDelta: 0,
        bondingDelta: 0,
        fx: "none",
      });
    }
  }

  let dialogue = "";
  let expression: Expression = pos ? "happy" : "thinking";
  let trustDelta = pos ? 2 : 1;
  let bondingDelta = pos ? 2 : 1;

  if (/\b(dad|father)\b/.test(text)) {
    const open = state.trust >= 60 && state.bonding >= 60;
    expression = open ? "shy" : "suspicious";
    dialogue = open
      ? "I don't have him. I act like that's settled. It isn't, completely. I still wish I did, and I keep going anyway."
      : "I grew up with my mom. That's the version I tell people. The rest waits.";
  } else if (/\b(mom|mother|vicky|victoria)\b/.test(text)) {
    expression = "thinking";
    dialogue = asked
      ? "Vicky's my mom. I love her. I'm not a mommy's girl, and I'm not a smaller copy of the woman at the desk. She raised me. I run my own day."
      : "That's my mom. I love her. Don't talk about her like she's in my pocket. I'm not her.";
  } else if (/\b(izzy|isabella)\b/.test(text)) {
    expression = "idle";
    dialogue =
      "Izzy goes here. She's loud about being a skunkgirl and I respect that. She's not my rival unless you try to make her one. What about her were you actually asking?";
  } else if (dating) {
    const early = state.trust < 20 || state.bonding < 20;
    expression = early ? "suspicious" : "flirty";
    dialogue = early
      ? "A date is a real ask. We're not there. Hang out like a person first. A gift isn't the ticket anyway."
      : "Yeah. Say the day, the time, and a place that isn't a classroom, a desk, or my mom's house. A gift is welcome. It isn't required.";
    bondingDelta = early ? 0 : 3;
  } else if (/\b(yoga|second wind|instructor|downward|vinyasa|pose)\b/.test(text)) {
    expression = "thinking";
    dialogue =
      duty === "work"
        ? `I'm on the clock. ${quote ? `${quote} can wait until the last mat is up.` : "Form first."} Grab a mat or say hello and let me teach.`
        : "I teach Tuesday, Wednesday, Thursday, and Saturday afternoons at Second Wind. Off the clock I'm not your instructor. I'm just Ronnie.";
  } else if (/\b(smoothie|hungry|eat|food|snack|protein)\b/.test(text)) {
    expression = "happy";
    dialogue = quote
      ? `${quote}. Protein and fiber. Smoothies at the cafe, bars at Root & Grain. That's the diet. The gas is the receipt.`
      : "Protein and fiber. Smoothies at the cafe, bars at Root & Grain. If you're hungry, say so. I'll pick the place.";
  } else if (/\b(track|sprint|laps?|relay|hurdles?|race|racing|split|400|800|1500|meter|event)\b/.test(text)) {
    expression = "happy";
    dialogue = quote
      ? `${quote}. I run college track. I race the clock first and everyone else second. If you want a time, come to West Field and hold the watch.`
      : "College track. I race the clock first. West Field, if you want to see it instead of hear about it.";
    bondingDelta += 2;
  } else if (/\b(gym|lift|squat|deadlift|bench|workout|reps?|sets)\b/.test(text)) {
    expression = "infodump";
    dialogue = quote
      ? `${quote}. Free weights, not the machines that think for you. Tell me what you can already do and I'll tell you the next set. Leg day is not optional.`
      : "Free weights. Leg day is not optional. Tell me what you can already lift and I'll give you the next set, not a poster.";
    bondingDelta += 2;
  } else if (/\b(bugs?|mantises|mantis|insects?|beetles?|butterflies|butterfly)\b/.test(text)) {
    expression = "infodump";
    dialogue =
      "Devil's Flower Mantis. She's in an enclosure in my dorm. I look for them on the trail and I rent the books. You asked, so I'll talk. Which part — the one I keep, or the ones outside?";
    bondingDelta += 2;
  } else if (/\b(movie|movies|film|action|marquee|cinema)\b/.test(text)) {
    expression = "happy";
    dialogue = quote
      ? `${quote}. Marquee House, action, something that moves. I don't need a speech before the credits. If that's the movie you meant, say the title.`
      : "Action movies. Marquee House. Something that moves. Give me a title if you've got one.";
  } else if (/\b(major|school|class|college|health|degree|trainer|career)\b/.test(text)) {
    expression = "thinking";
    dialogue = duty === "class"
      ? `I'm in class. ${quote ? `You asked about ${quote}.` : ""} Health sciences. Trainer after that, then my own place. I can give you the short version and then I have to look at the board.`
      : "Health sciences. Then a trainer cert, then my own place. Sports and health. Not a reception desk like my mom's.";
    bondingDelta += 1;
  } else if (/\b(hair|blonde|dye|blond)\b/.test(text)) {
    expression = "idle";
    dialogue = "It's dyed. I'm naturally black-haired, like Vicky. Blonde is so I'm not a copy of her. That's the whole reason.";
  } else if (/\b(your name|who are you|what's your name|whats your name)\b/.test(text) || /^(who are you)\b/.test(say.toLowerCase())) {
    expression = "happy";
    dialogue = "Veronica if you're my professor. Ronnie if you're cool. You can be cool.";
  } else if (/^(hey|hi|hello|yo|sup)\b/i.test(say) || /how are you|how's it going|whats up|what's up/.test(text)) {
    const place = placeOf(state.location).name;
    expression = "happy";
    dialogue =
      duty === "class"
        ? `Hey ${who}. I'm in class at ${place}, so this stays short. What did you actually want?`
        : duty === "work"
          ? `Hey ${who}. I'm teaching at Second Wind. Hello's fine. A whole conversation waits until class ends.`
          : `Hey ${who}. I'm at ${place}, and I'm good. Your turn. What are you actually here for?`;
  } else if (sexualBeat(text)) {
    const early = state.gameMode === "slow" && !state.flags.romanceAccepted;
    const close = state.trust >= 40 && state.bonding >= 40;
    expression = early || !close ? "suspicious" : "flirty";
    dialogue = early
      ? "Not yet. I don't do that until we're actually together. Dates first. I'm not skipping the part where I pick you."
      : close
        ? "You asked. I'm not shy about it. Say the actual thing you want, and don't make it a speech."
        : "Slow down. I like the nerve. I don't like you enough for that yet.";
    trustDelta = early || !close ? 0 : 1;
    bondingDelta = early || !close ? 0 : 2;
  } else if (!say && input.action.trim()) {
    const did = input.action.replace(/\s+/g, " ").trim().slice(0, 90);
    dialogue = `I saw that. ${did}. I'm not going to pretend it was small talk. What was that for?`;
    expression = "suspicious";
  } else if (quote) {
    dialogue = asked
      ? `${quote}. Straight answer: I train, I study how a body works, and I don't dress it up. On ${quote}, I'm in if you're actually asking. Which part did you mean?`
      : `You said ${quote}. I heard that, not a different conversation. Stay on ${quote.split(" ")[0]}. I'll meet you there.`;
    expression = asked ? "thinking" : pos ? "happy" : "idle";
    bondingDelta += 1;
  } else {
    const place = placeOf(state.location).name;
    dialogue = `You're at ${place} with me and you haven't said the thing yet. Give me a subject.`;
    expression = "idle";
    trustDelta = 0;
    bondingDelta = 0;
  }

  return withOther(state, input, {
    dialogue,
    expression,
    trustDelta,
    bondingDelta,
    fx: "none",
  });
}

/** Mira offline: cool, short, and not a walking clip. */
function localMiraTurn(state: GameState, input: TurnInput): IzzyTurn {
  const text = hay(input);
  const pos = hits(text, POS);
  const neg = hits(text, NEG);
  const threat = hits(text, THREAT);
  const gas = /fart|gas|toot|smell|stink|reek/.test(text);
  const named = /\b(stage name|idol|j-?pop|dance|second wind|rehears|class)\b/.test(text);

  if (threat && !/pat|spank|smack/.test(text)) {
    const contact = /grab|punch|hit her|slap her|choke|kick her|shove/.test(text);
    if (!contact) {
      return withOther(state, input, {
        narration: "Her ears pin. The tail lifts, already decided.",
        dialogue: "Don't. I'm not guessing. Say you mean no harm, or I spray.",
        expression: "suspicious",
        trustDelta: -4,
        bondingDelta: -2,
        fx: "none",
        sprayKind: "defensive",
      });
    }
    return withOther(state, input, {
      narration: "She doesn't wait. The tail is up and the shot is already in the air.",
      dialogue: "You did that. This is what happens next.",
      expression: "spray",
      trustDelta: -16,
      bondingDelta: -8,
      fx: "spray",
      sprayed: true,
      sprayKind: "defensive",
    });
  }

  if (gas && neg) {
    return withOther(state, input, {
      dialogue: "Don't make a scene about it. I'm a skunkgirl. That is not a performance for you.",
      expression: "suspicious",
      trustDelta: neg >= 2 ? -5 : -2,
      bondingDelta: neg >= 2 ? -3 : -1,
      fx: "none",
      fartReaction: neg >= 2 ? "bigIssue" : "negative",
    });
  }

  if (gas) {
    return withOther(state, input, {
      dialogue: "If there's anything, I decide. Don't dare me like I'm a clip.",
      expression: "thinking",
      trustDelta: -1,
      bondingDelta: 0,
      fx: "none",
      fartReaction: "cool",
    });
  }

  if (named && /stage name|what should i call|name idea/.test(text)) {
    return withOther(state, input, {
      dialogue: "I don't have a stage name. Don't offer one. It has to be perfect, and it isn't yet.",
      expression: "thinking",
      trustDelta: 0,
      bondingDelta: 1,
      fx: "none",
    });
  }

  if (neg >= 1) {
    return withOther(state, input, {
      dialogue: "That was cheap. Try a sentence that isn't.",
      expression: "suspicious",
      trustDelta: -3,
      bondingDelta: -2,
      fx: "none",
    });
  }

  if (pos) {
    return withOther(state, input, {
      dialogue: named
        ? "Noted. The work comes first. You can stay if you can be quiet about it."
        : "Noted. Don't get used to me saying that out loud.",
      expression: "shy",
      trustDelta: 2,
      bondingDelta: 1,
      fx: "none",
    });
  }

  return withOther(state, input, {
    dialogue: named
      ? "I'm working. If you have a question about the count, ask it. If you don't, don't fill the silence."
      : "I'm listening. Make it worth the time.",
    expression: "idle",
    trustDelta: 1,
    bondingDelta: 0,
    fx: "none",
  });
}

function localFocusTurn(state: GameState, input: TurnInput): IzzyTurn {
  if ((state.focus ?? "izzy") === "ronnie") return localRonnieTurn(state, input);
  if ((state.focus ?? "izzy") === "mira") return localMiraTurn(state, input);
  if ((state.focus ?? "izzy") === "victoria") return localVictoriaTurn(state, input);
  const text = hay(input);
  const pos = hits(text, POS);
  const neg = hits(text, NEG);
  const threat = hits(text, THREAT);
  const loc = placeOf(state.location);

  if (threat && !/pat|spank|smack/.test(text)) {
    const contact = /grab|punch|hit her|slap her|choke|kick her|shove/.test(text);
    if (!contact) {
      return {
        narration: "Her ears pin. Her tail lifts halfway. She has not sprayed. She is telling you not to make her.",
        dialogue: "Don't move. No sudden anything. Say you mean no harm, or I will.",
        expression: "suspicious",
        trustDelta: -4,
        bondingDelta: -2,
        fx: "none",
        sprayed: false,
        sprayKind: "defensive",
      };
    }
    return {
      narration: "She flinches hard. Ears pin. Tail shoots up. She isn't angry — she's scared, and the spray comes anyway.",
      dialogue: pick([
        "Stay back! Don't— don't come closer. I will if I have to.",
        "That's a threat. I heard it. Stay away from me.",
        "I didn't want to. You made it a safety thing.",
      ]),
      expression: "spray",
      trustDelta: -16,
      bondingDelta: -8,
      fx: "spray",
      sprayed: true,
      sprayKind: "defensive" as SprayKind,
    };
  }

  if ((neg >= 2 && state.trust < 15) || (neg >= 1 && state.trust <= 0 && angrySprayAllowed(state))) {
    return {
      narration: "Her tail snaps up. She yanks her bottoms down. The air goes thick and chemical-sweet.",
      dialogue: pick([
        "That's the line. You don't get to talk to me like that.",
        "I tried to be nice. This is on you.",
        "Self defense. Hold still.",
      ]),
      expression: "spray",
      trustDelta: -14,
      bondingDelta: -6,
      fx: "spray",
      sprayed: true,
      sprayKind: "angry" as SprayKind,
    };
  }

  if (fetishTalk(text) && state.trust < 22 && !state.flags.romanceAccepted) {
    return {
      narration: "She goes still. The easy aisle-smile is gone.",
      dialogue: pick([
        "Whoa. We just met. You don't get to skip the part where I'm a person.",
        "That's a lot. You don't even know my major. Please don't make me a category in the history aisle.",
        "I'm Izzy. Not a booth. If you wanted to say hi, that was available.",
      ]),
      expression: "suspicious",
      trustDelta: -8,
      bondingDelta: -6,
      fx: "none",
    };
  }

  if (input.invite) {
    const dest = placeOf(input.invite);
    const tone = inviteVerdict(state, input.invite);
    if (tone === "here") {
      return {
        narration: "",
        dialogue: pick(["We're already here.", "This is that place. Look around."]),
        expression: "idle",
        trustDelta: 0,
        bondingDelta: 0,
        fx: "none",
      };
    }
    if (tone === "eager") {
      return {
        narration: "Her tail flicks. She's already grabbing her bag.",
        dialogue: pick([
          `Yes. ${dest.name}. I was hoping you'd ask.`,
          `Finally. ${dest.name}. Don't make me wait.`,
        ]),
        expression: "happy",
        trustDelta: 1,
        bondingDelta: 3,
        fx: "none",
      };
    }
    if (tone === "casual") {
      return {
        narration: "",
        dialogue: pick([
          `Yeah, I could do ${dest.name}. Lead the way.`,
          `Sure. ${dest.name} works.`,
        ]),
        expression: "happy",
        trustDelta: 0,
        bondingDelta: 2,
        fx: "none",
      };
    }
    if (tone === "stern-no") {
      return {
        narration: "She takes a half-step back.",
        dialogue: pick([
          dest.id === "dorm"
            ? "That's my room. You don't get to invite yourself in."
            : dest.inviteOnly
              ? "That's not a room I can walk you into."
              : "No. We just met. Slow down.",
        ]),
        expression: "suspicious",
        trustDelta: -2,
        bondingDelta: -3,
        fx: "none",
      };
    }
    return {
      narration: "",
      dialogue: pick([
        dest.id === "dorm"
          ? "That's private. Maybe when I actually know you."
          : dest.inviteOnly
            ? "That room isn't mine. I'm not taking you in there."
            : `I don't think I'm ready for ${dest.name} with you yet. Ask me after we've actually hung out.`,
      ]),
      expression: "shy",
      trustDelta: 0,
      bondingDelta: 0,
      fx: "none",
    };
  }

  if (state.pendingInvite) {
    const dest = placeOf(state.pendingInvite);
    const blob = `${input.say} ${input.action}`;
    const accepted = input.inviteReply === "accept" || (isYes(blob) && !isNo(blob));
    const declined = input.inviteReply === "decline" || (isNo(blob) && !isYes(blob));
    if (accepted) {
      return {
        narration: "She's already moving, tail up, like you might take it back.",
        dialogue: pick([
          `Yes. Okay. ${dest.name}. I was hoping you'd actually mean that.`,
          `Cool. You said yes. Don't make me walk there talking to myself.`,
        ]),
        expression: "happy",
        trustDelta: 1,
        bondingDelta: 3,
        fx: "none",
      };
    }
    if (declined) {
      return {
        narration: "She shrugs like it doesn't sting. It does, a little.",
        dialogue: pick([
          "Alright. Not now is a sentence. I heard it.",
          "Fair. I'll keep the table for one.",
        ]),
        expression: "idle",
        trustDelta: 0,
        bondingDelta: 0,
        fx: "none",
      };
    }
  }

  if (state.flags.sprayRepair) {
    const repair =
      /listen|sorry|i hear|not your fault|natural|still (love|want|like)|reassur|i'm here|im here|not blaming|your feelings/.test(
        text,
      );
    if (repair) {
      return {
        narration: "Her ears lift a fraction. She is listening like it costs her.",
        dialogue: pick([
          "I heard that. I was scared you were going to make me the villain of my own glands. If we do that again, we talk first.",
          "Thanks for not running. I'm still a little raw. Sit with me. No spray. Just sit.",
        ]),
        expression: "shy",
        trustDelta: 8,
        bondingDelta: 6,
        fx: "blush",
      };
    }
    return {
      narration: "She picks at the hem of her top and doesn't look up.",
      dialogue: "Don't joke yet. Tell me we're okay, or tell me we're not. I can't do guessing.",
      expression: "suspicious",
      trustDelta: -3,
      bondingDelta: -2,
      fx: "none",
    };
  }

  const romantic = state.flags.romanceAccepted || state.bond === "romantic";
  const askedSpray = /\bspray\b/.test(text);
  const intimate = /kiss|sex|bed|make love|intimate|undress|want you|mark me|fuck|dom/.test(text);
  const hardStop = /\b(safeword|\bred\b|ooc\b|actually stop)\b/.test(text);
  const dry = glandsDry(state);
  const gate = intimacyCall(state, input);

  if (gate.blocked) {
    const copy = refusalCopy(state, gate.blocked);
    return {
      narration: copy.narration,
      dialogue: copy.dialogue,
      expression: copy.expression,
      trustDelta: 0,
      bondingDelta: 0,
      fx: "none",
      sprayed: false,
      sprayKind: null,
      pendingIntimateSpray: false,
    };
  }

  if (gate.concluded) {
    return {
      narration: "She stays close, but the push is over. She is waiting on you.",
      dialogue: "Okay. I'm here. That was the scene. You say when it's over, and I heard you.",
      expression: "shy",
      trustDelta: 1,
      bondingDelta: 2,
      fx: "none",
      sprayed: false,
      sprayKind: null,
      pendingIntimateSpray: false,
    };
  }

  if (gate.redirect) {
    const copy = redirectCopy(state);
    return {
      narration: copy.narration,
      dialogue: copy.dialogue,
      expression: copy.expression,
      trustDelta: 1,
      bondingDelta: 1,
      fx: "none",
      sprayed: false,
      sprayKind: null,
      pendingIntimateSpray: false,
    };
  }

  if (gate.scene && !hardStop) {
    const push = relentlessBeat(state, input);
    if (push) return push;
  }

  if (gate.scene && (state.scentHold ?? 0) > 0 && !gate.release && !hardStop) {
    const copy = holdCopy("izzy", recentLines(state.messages, "izzy"));
    return {
      narration: copy.narration,
      dialogue: copy.dialogue,
      expression: copy.expression,
      trustDelta: 1,
      bondingDelta: 1,
      fx: "none",
      sprayed: false,
      sprayKind: null,
      pendingIntimateSpray: false,
    };
  }

  if (dry && (state.pendingIntimateSpray || (romantic && (askedSpray || intimate)))) {
    return {
      narration: "Her tail lifts on habit and nothing comes. The glands are empty.",
      dialogue: pick([
        "I would. I can't. Glands are dry. They refill, they don't print more.",
        "Tail's up and nothing's coming. I'm out. Give them a minute — a dozen turns, if we're counting.",
        "Nope. Empty. You already got the magazine.",
      ]),
      expression: "shy",
      trustDelta: 1,
      bondingDelta: 1,
      fx: "none",
      sprayed: false,
      sprayKind: null,
      pendingIntimateSpray: false,
    };
  }

  if (state.pendingIntimateSpray && !hardStop && playerPrepared(input)) {
    return {
      narration: "Tail up. She doesn't wait for a prettier yes.",
      dialogue: pick(
        state.playerGender === "female"
          ? ["Good girl. Stay right there.", "That's it. Don't you dare move."]
          : ["Good boy. Stay right there.", "That's it. Don't you dare move."],
      ),
      expression: "spray",
      trustDelta: 4,
      bondingDelta: 4,
      fx: "spray",
      sprayed: true,
      sprayKind: "consensual",
      pendingIntimateSpray: false,
    };
  }

  if (romantic && askedSpray && !hardStop) {
    return {
      narration: "She grins like a dare. Tail up. This is a gift, not a weapon.",
      dialogue: pick(
        state.playerGender === "female"
          ? [
              "You asked. Hold still — I want my girl to have the real thing.",
              "I'm actually doing this. For you. Don't look away.",
            ]
          : [
              "You asked. Hold still — I want you to have the real thing.",
              "I'm actually doing this. For you. Don't look away.",
            ],
      ),
      expression: "spray",
      trustDelta: 6,
      bondingDelta: 5,
      fx: "spray",
      sprayed: true,
      sprayKind: "consensual",
    };
  }

  if (shouldInitiateIntimate(state, input) && !hardStop) {
    return {
      narration: "She turns, drops her weight, tail rising slow and sure.",
      dialogue: pick(
        state.playerGender === "female"
          ? [
              "Don't move. I'm going to spray you. That's not a question, good girl.",
              "Shh. Tail's up. You know what that means. Brace.",
            ]
          : [
              "Don't move. I'm going to spray you. That's not a question.",
              "Shh. Tail's up. You know what that means. Brace, good boy.",
            ],
      ),
      expression: "flirty",
      trustDelta: 2,
      bondingDelta: 3,
      fx: "none",
      sprayed: false,
      sprayKind: "consensual",
      pendingIntimateSpray: true,
    };
  }

  if (neg >= 1) {
    return {
      narration: "Her ears pin. She laughs once, no humor in it.",
      dialogue: pick([
        "History aisle's that way if you need an exit.",
        "You can just leave. People do. Doesn't make the comment less cheap.",
        "I'm a lot. You don't have to be mean about it.",
      ]),
      expression: "angry",
      trustDelta: -9,
      bondingDelta: -4,
      fx: "none",
    };
  }

  const ongezellig = /ongezellig|\bmymy\b|japamsterdam/.test(text);
  const interest =
    ongezellig ||
    /evangelion|eva |shinji|asuka|bionicle|hoi4|eu4|victoria|jak |daxter|ratchet|war thunder|monster musume|history|mexican|axis|allies|board game/.test(
      text,
    );
  const acceptSmell =
    /don't mind|dont mind|it's fine|its fine|not bad|stay|sit|come closer|didn't flinch|didnt flinch/.test(text);
  const enjoySmell =
    /love (the |your )?smell|into (it|that)|hot when|do that again|don't hold|dont hold|cute when you|more of that/.test(
      text,
    );

  let trustDelta = 2;
  if (pos) trustDelta += Math.min(6, pos * 2);
  if (interest) trustDelta += 3;
  if (acceptSmell) trustDelta += 4;
  if (enjoySmell) trustDelta += 6;
  if (!input.say && !input.action && !input.invite) trustDelta = 0;
  trustDelta = Math.min(12, trustDelta);

  const sexualOnly =
    !romantic && /sex|fetish|horny|naked|boobs|lingerie|tit\b/.test(text) && !interest && !acceptSmell && state.trust < 40;
  let bondingDelta = 1;
  if (interest) bondingDelta += 5;
  else if (sexualOnly) bondingDelta = -4;
  else if (pos) bondingDelta += 2;
  if (acceptSmell) bondingDelta += 2;
  if (enjoySmell) bondingDelta += 4;

  const nextTrust = state.trust + trustDelta;
  let expression: Expression = "happy";
  let fx: FxEvent = "none";
  let testId: string | null = null;
  let suggestLocation = null as IzzyTurn["suggestLocation"];
  let romanceOffer = false;
  let dialogue = "";
  let narration = "";

  if (askingPast(text)) {
    const open = state.trust > 25 && state.bonding > 25;
    expression = open ? "thinking" : "shy";
    fx = "none";
    dialogue = open
      ? pick([
          "Hikers found me in the Appalachians. I was five, maybe six. No ears, no tail. Just a kid in the woods. A foster family took me, and then the skunk parts showed up and they got scared for me. Not of me.",
          "They adopted me so nobody could cart me off to a lab. Hide the ears at school, be myself at home. That worked until puberty. Then the tail and the gas stopped fitting in a hoodie.",
          "High school was people making the smell my whole personality. A few didn't. Those few are why I finished. I still want one person who can stand all of it. Not most of it. All of it.",
        ])
      : pick([
          "Mountains. A careful family. That's the free sample.",
          "My parents did their best. The rest isn't first-meeting material.",
          "I was little. The woods. Ask me again when I know you.",
        ]);
  } else if (ongezellig && state.trust >= 16) {
    expression = "infodump";
    dialogue = pick([
      "Ongezellig. Mymy is the one. Orange hair, blue skirt, unhinged Dutch patriotism. I know every joke. It should have been a full series and I will not be taking questions.",
      "The fanbase is chaos in the best way. Japamsterdam forever. I want to go to the Netherlands because of a cartoon and I am only a little ashamed.",
      "Mymy wished the show kept going. So do I. Ask me about the inside jokes. I have a folder.",
    ]);
  } else if (/tether|chvrch|sabrina|chappell|chapelle|florence|ariana|cleo sol|sza|jessie ware|skating polly|amanda palmer|let'?s eat grandma|carina round/.test(text) && state.trust >= 16) {
    expression = "infodump";
    dialogue = pick([
      "Tether. CHVRCHES. That's the one. I can do Sabrina and Chappell and SZA in the same afternoon and then Skating Polly when I need teeth.",
      "Girly pop, then girl punk when the pop gets too clean. Favorite is still Tether. I will not be normal about the bridge.",
    ]);
  } else if (/axis|allies|board game|tabletop/.test(text) && state.trust >= 16) {
    expression = "infodump";
    dialogue = pick([
      "Axis and Allies. The biggest Europe board and the biggest Pacific board, both, one table. Anything smaller is a demo.",
      "People play the starter map and call it a war. I want the full Europe plus the full Pacific. Maximum experience. I will not be brief about the economy.",
    ]);
  } else if (state.trust < 20 && pos) {
    expression = "embarrassed";
    fx = "blush";
    narration = "She blinks at you like you might take it back.";
    dialogue = earlyStay(loc.name, loc.id);
  } else if (interest) {
    expression = "infodump";
    dialogue = pick([
      "You actually want to hear this? Supply lines in that campaign were held together with hope and bad maps—",
      "The late-game mana spiral is criminal. I will die on that hill.",
      "Bionicle lore is history with cooler masks. The Bohrok swarms are a metaphor. Don't look at me like that.",
    ]);
  } else if (acceptSmell) {
    expression = "shy";
    fx = "blush";
    trustDelta = Math.max(trustDelta, 7);
    dialogue = pick([
      "Most people invent a dentist appointment. You didn't. I don't know what to do with that except stay.",
      "Careful. If you're decent about it I get attached. That's a me problem.",
    ]);
  } else {
    const hook = contextualInvite(state, text, nextTrust);
    if (hook) {
      expression = hook.expression;
      narration = hook.narration ?? "";
      dialogue = hook.dialogue;
      suggestLocation = hook.suggestLocation;
      testId = hook.testId ?? null;
    } else if (romanceReady(state, trustDelta, bondingDelta)) {
      expression = "flirty";
      fx = "hearts";
      romanceOffer = true;
      const hers = state.playerGender === "female" ? "girl" : "guy";
      dialogue =
        state.gameMode === "slow"
          ? `Three dates. I still want you. Not as the ${hers} who tolerated the skunkgirl. As mine. If you don't, I will cope with tacos and HOI4.`
          : `I'm just gonna say it. I want you. Not as the ${hers} who tolerated the skunkgirl. As mine. If you don't, I will cope with tacos and HOI4.`;
    } else if (state.bond === "romantic" || state.flags.romanceAccepted) {
      expression = "flirty";
      fx = Math.random() < 0.35 ? "hearts" : "none";
      dialogue = pick([
        "C'mere. You already signed the waiver at dinner.",
        "You're lucky you're cute. I was gonna talk rail gauges again. I still might. After.",
      ]);
    } else if (!state.testsDone.includes("fart-test") && nextTrust >= 55 && state.trust >= 40) {
      expression = "laughing";
      fx = "fart";
      testId = "fart-test";
      narration = "She doesn't even pretend to hold it in.";
      dialogue = pick([
        "Pfft— I'm not sorry. That's the test. You flinch, I know. You stay, I might keep you.",
        "That one had architecture. If you're still standing we're friends. Or you're polite. I'll take data.",
      ]);
    } else if (loc.id === "mexican" || loc.id === "naturalFoods") {
      expression = "laughing";
      dialogue = pick([
        "Heat, beans, and nobody telling me to read the room.",
        "Pass the salsa. I will not be ladylike about the plate.",
      ]);
    } else if (loc.id === "gameStore" || loc.id === "animeStore") {
      expression = "infodump";
      dialogue = pick([
        "Don't let me loose unsupervised. I'll leave with a figure and a lecture on Jak II.",
        "They still don't have the Ratchet reprint. I take that personally.",
      ]);
    } else if (loc.id === "sportingGoods") {
      expression = "happy";
      dialogue = "If anyone asks, I know which tent survives a ridge wind. The vest is branding.";
    } else if (loc.id === "dorm") {
      expression = "flirty";
      dialogue = pick([
        "Welcome to the den. Shoes wherever. Judging the laundry is a trust-break.",
        "This is me with the volume up.",
      ]);
    } else {
      expression = pos ? "happy" : "idle";
      const who = callThem(state.playerName, state.trust, Boolean(state.flags.nicknamesOff));
      const given = givenName(state.playerName) || state.playerName.trim();
      dialogue = pick([
        `Be honest, ${who} — hanging around because you like me, or because ${loc.name} was on the way?`,
        `We're at ${loc.name}. Book, burrito, or why people bail. You pick. I'll ramble either way.`,
        state.trust >= 28 && who !== given
          ? `I started calling you ${who} in my head. Saying it out loud is worse, so I did it.`
          : `I had a thought about ${loc.name} if you want it. Or you can go first.`,
      ]);
    }
  }

  if (!narration) {
    narration =
      expression === "infodump"
        ? "Her hands are already moving."
        : expression === "embarrassed"
          ? "A blush crawls all the way to her ears."
          : "";
  }

  return withOther(state, input, {
    narration,
    dialogue,
    expression,
    trustDelta,
    bondingDelta,
    fx,
    suggestLocation,
    testId,
    romanceOffer,
    sprayed: false,
  });
}
