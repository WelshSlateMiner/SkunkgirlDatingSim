import type { Expression, GameState, GirlId, LocationId, TurnInput } from "./types";

const HARD_STOP = /\b(safeword|\bred\b|ooc\b|actually stop|stop for real|i mean it, stop)\b/i;

const SCENT_INTEREST =
  /\b(?:i (?:really )?(?:like|love|want|need|crave)|i'?m into|im into|into your|turned on|turns me on|get(?:s|ting)? (?:me )?off|so hot|this is hot|don'?t hold|do(?:n't| not) hold|fart (?:on|in|for) (?:me|my)|spray (?:me|on me|for me)|(?:love|like|want|need) (?:your |the |her )?(?:farts?|gas|spray|stink|musk|smell|scent)|your (?:farts?|gas|spray|musk|stink|smell) (?:is |are )?(?:hot|cute|sexy|amazing|perfect|mine)|sit on my face)\b/i;

const DISGUST = /\b(gross|nasty|disgusting|hate (?:your |the )?(?:fart|gas|smell|spray|stink)|stop farting)\b/i;

const SEXUAL =
  /\b(?:sex|fuck(?:ing)?|naked|nude|undress|make out|making out|kiss(?:ing|ed)?|grind(?:ing)?|hump(?:ing)?|moan(?:ing)?|orgasm|cum|cock|dick|pussy|clit|ride (?:you|me|her)|in bed|take me|good boy|good girl|blow ?job|go down on|eat you out|finger me|inside me|spread (?:her|my|your) (?:legs|thighs)|spray me|fart (?:on|in) (?:me|my))\b/i;

const FULL_SEX =
  /\b(?:fuck(?:ing)?|have sex|let'?s have sex|penetrat\w*|inside me|inside you|ride me|ride you|blow ?job|go down|eat you out|make love|cock|dick|pussy|clit|cum|orgasm|intercourse|put it in)\b/i;

const SCENT_WORD = /\b(?:farts?|farting|gas|gassy|sprays?|sprayed|spraying|stink|stinky|musk|scent|smell|skunk)\b/i;

const CONCLUDE =
  /\b(?:that(?:'s| is) enough|i(?:'m| am) (?:done|finished|satisfied|spent)|we should stop|let(?:'s| us) (?:stop|get dressed|cuddle|sleep|call it)|get dressed|pull (?:my |your |our )?(?:pants|clothes|shorts|shirt) (?:up|back|on)|afterglow|no more (?:tonight|sex|spraying|farting)|we can stop|i want to (?:cuddle|stop|sleep)|call it a night|that was (?:all|enough)|scene(?:'s| is) over|i(?:'m| am) ready to (?:stop|sleep|cuddle)|good ?night|heading (?:home|out)|i should go|we should (?:go|leave)|time to (?:go|leave|sleep))\b/i;

const AGAIN =
  /\b(?:(?:fart|spray|gas|stink).{0,24}(?:again|now|more)|another (?:spray|fart|one)|spray me|fart (?:on|for) me again|do that again|let (?:another|one) (?:go|rip)|more (?:gas|spray|farts)|keep (?:going|farting|spraying)|don'?t stop|dont stop|don'?t hold|do not hold|let it rip)\b/i;

const MARK_ASK =
  /\b(?:mark me|scent[- ]?mark|smell like you|your (?:scent|musk|smell) on me|put your (?:scent|musk|smell) on)\b/i;

const DOMINANT_ASK = /\b(?:dom(?:me|inat(?:e|ing))? me|mind[- ]?break|own me|be rough|take charge)\b/i;

const PRIVATE_MARK = new Set(["dorm", "apartment", "vickyLiving", "vickyBedroom"]);

export type IntimacyBlock = "slow" | "meters" | "scent";

export function showedScentInterest(text: string) {
  if (!SCENT_INTEREST.test(text)) return false;
  if (DISGUST.test(text) && !/\b(?:but|still|anyway)\b/i.test(text)) return false;
  return true;
}

export function sexualBeat(text: string) {
  return SEXUAL.test(text);
}

export function fullSex(text: string) {
  return FULL_SEX.test(text);
}

export function scentFocused(text: string) {
  return SCENT_WORD.test(text);
}

export function concludesIntimacy(text: string) {
  return CONCLUDE.test(text);
}

export function asksForScentNow(text: string) {
  return AGAIN.test(text);
}

/** Marking, dominance, or a direct ask during intimacy. She does not wait the usual couple of turns. */
export function scentRelentless(state: GameState, input: TurnInput) {
  const text = `${input.say} ${input.action}`;
  if (isHardStop(text) || concludesIntimacy(text)) return false;
  const scene = Boolean(state.flags.intimateScene) || sexualBeat(text);
  const focus = state.focus ?? "izzy";
  const affair = state.markAffair;
  const reclaiming =
    affair?.phase === "reclaim" &&
    (affair.girl === focus || (state.present ?? []).includes(affair.girl)) &&
    (scene || PRIVATE_MARK.has(state.location));
  if (reclaiming || (scene && MARK_ASK.test(text))) return true;
  const dominant =
    state.flags.sprayYield === "resist" ||
    (scene && state.playerFartRole === "not" && state.flags.sprayYield !== "submit") ||
    (scene && DOMINANT_ASK.test(text));
  if (dominant) return true;
  return scene && asksForScentNow(text);
}

export function isHardStop(text: string) {
  return HARD_STOP.test(text);
}

export function officiallyTogether(state: Pick<GameState, "flags">) {
  return Boolean(state.flags.romanceAccepted);
}

/** Sex is allowed. Slow romance: only once you are official. Casual, before that: 50/50 and scent interest. */
export function intimacyAllowed(state: Pick<GameState, "gameMode" | "trust" | "bonding" | "flags">) {
  if (officiallyTogether(state)) return true;
  if (state.gameMode === "slow") return false;
  return state.trust >= 50 && state.bonding >= 50 && Boolean(state.flags.scentInterest);
}

export function intimacyBlockReason(state: Pick<GameState, "gameMode" | "trust" | "bonding" | "flags">): IntimacyBlock | null {
  if (intimacyAllowed(state)) return null;
  if (state.gameMode === "slow") return "slow";
  if (state.trust < 50 || state.bonding < 50) return "meters";
  return "scent";
}

export type IntimacyCall = {
  scene: boolean;
  blocked: IntimacyBlock | false;
  redirect: boolean;
  concluded: boolean;
  release: boolean;
};

export function intimacyCall(
  state: GameState,
  input: TurnInput,
  opts?: { threat?: boolean; traveledPublic?: boolean },
): IntimacyCall {
  const text = `${input.say} ${input.action}`;
  let scene = Boolean(state.flags.intimateScene);
  if (opts?.traveledPublic) scene = false;
  if (opts?.threat || isHardStop(text)) {
    return { scene: false, blocked: false, redirect: false, concluded: false, release: false };
  }
  if (scene && concludesIntimacy(text)) {
    return { scene: false, blocked: false, redirect: false, concluded: true, release: false };
  }
  const scent =
    state.flags.scentInterest ||
    showedScentInterest(text) ||
    state.flags.fartConverted ||
    state.flags.sprayYield !== "none";
  const view = { ...state, flags: { ...state.flags, scentInterest: scent } };
  const trying = scene || sexualBeat(text);
  const reason = trying ? intimacyBlockReason(view) : null;
  if (reason) {
    return { scene: false, blocked: reason, redirect: false, concluded: false, release: false };
  }
  const next = trying;
  const redirect = Boolean(next && !officiallyTogether(view) && fullSex(text) && !scentFocused(text));
  return { scene: next, blocked: false, redirect, concluded: false, release: asksForScentNow(text) };
}

function partnerWord(state: Pick<GameState, "playerGender">) {
  return state.playerGender === "female" ? "girlfriend" : "boyfriend";
}

export function refusalCopy(state: Pick<GameState, "playerGender">, reason: IntimacyBlock): {
  narration: string;
  dialogue: string;
  expression: Expression;
} {
  if (reason === "slow") {
    return {
      narration: "She doesn't follow that. She stays where she is.",
      dialogue: `Not yet. I'm not doing that until you're actually my ${partnerWord(state)}. Slow is the deal. Dates, then us.`,
      expression: "shy",
    };
  }
  if (reason === "meters") {
    return {
      narration: "She catches the idea before it becomes a scene, and she doesn't go further.",
      dialogue: "I like you. I don't like you enough for that. Stay a while. Then ask me again.",
      expression: "suspicious",
    };
  }
  return {
    narration: "She looks at you like you skipped a chapter.",
    dialogue:
      "If you want me before we're official, want the farts. Want the spray. I'm not a body you get to leave the skunk out of.",
    expression: "suspicious",
  };
}

export function redirectCopy(state: Pick<GameState, "playerGender">): {
  narration: string;
  dialogue: string;
  expression: Expression;
} {
  return {
    narration: "She stays in it, but she doesn't let it become something else.",
    dialogue: `We can do this. Not that. Not until you're my ${partnerWord(state)}. Right now it's the gas, or the spray, and what they do to you.`,
    expression: "scheming",
  };
}

export function recentLines(messages: { role: string; text: string }[], girl: GirlId) {
  const role = girl;
  return messages
    .filter((message) => message.role === role)
    .slice(-3)
    .map((message) => message.text)
    .join("\n");
}

function pickFresh<T extends { dialogue: string }>(lines: T[], avoid = ""): T {
  const unused = lines.filter((line) => !avoid.includes(line.dialogue.slice(0, 32)));
  const pool = unused.length ? unused : lines;
  return pool[Math.floor(Math.random() * pool.length)]!;
}

export function holdCopy(girl: GirlId = "izzy", avoid = ""): { narration: string; dialogue: string; expression: Expression } {
  const izzy = girl !== "victoria";
  const lines: { narration: string; dialogue: string; expression: Expression }[] = izzy
    ? [
        {
          narration: "She presses a hand under her stomach and shakes her head.",
          dialogue: "I don't feel gassy. Stomach's quiet. I can't just order one up.",
          expression: "thinking",
        },
        {
          narration: "She bears down for a second, tail twitching, and nothing comes.",
          dialogue: "Tank's empty. The stomach one. Beans need a minute.",
          expression: "embarrassed",
        },
        {
          narration: "She exhales, annoyed at her own gut.",
          dialogue: "I'm out of gas. That last one took what I had.",
          expression: "shy",
        },
        {
          narration: "She waits, then shrugs like she checked and the answer was no.",
          dialogue: "Nothing's brewing. I already looked. It's just me in there.",
          expression: "thinking",
        },
        {
          narration: "A small push, then she lets her stomach go soft again.",
          dialogue: "I already spent it. Gut's on break. Ask when it starts talking again.",
          expression: "embarrassed",
        },
      ]
    : [
        {
          narration: "She smooths her skirt. She does not strain.",
          dialogue: "I don't feel gassy. There is nothing there to let go of.",
          expression: "thinking",
        },
        {
          narration: "She goes still, then lets the effort go.",
          dialogue: "I've emptied the tank. Another one will not appear because you asked.",
          expression: "shy",
        },
        {
          narration: "A short, annoyed breath. Her hand rests on her middle and drops.",
          dialogue: "I'm out of gas. The last one was what I had.",
          expression: "shy",
        },
        {
          narration: "She is quiet for a moment, listening to herself, then shakes her head once.",
          dialogue: "My stomach is quiet. I can feel that it's gone.",
          expression: "thinking",
        },
        {
          narration: "She doesn't perform the effort. There is nothing to perform.",
          dialogue: "That was the end of it. I am not going to strain for a second one that isn't there.",
          expression: "shy",
        },
      ];
  return pickFresh(lines, avoid);
}

const PLAYFUL_PUBLIC =
  /\b(?:please|c'?mon|come on|dare you|i dare|bet you|just a (?:little|tiny|small)|for me|i want to hear|pretty please|right here|in (?:public|front of)|can you|will you|would you|go on|do it|let one|rip one)\b/i;
const FART_ASK = /\b(?:farts?|farting|toots?|poots?|puffs?|pass gas|let one|rip one|cut one)\b/i;
const MEAN_FART = /\b(?:gross|disgusting|nasty|pig|whale|fatass|you stink)\b/i;
const TIGHT = new Set<LocationId>(["classroom", "studyHall", "firm"]);
const VICKY_NO = new Set<LocationId>([
  "classroom",
  "studyHall",
  "firm",
  "library",
  "campus",
  "mall",
  "cafe",
  "grocery",
  "foodCourt",
  "sportingGoods",
]);

export function playfulPublicAsk(text: string) {
  if (MEAN_FART.test(text)) return false;
  if (/\b(?:don'?t|do not|stop fart|no more|ew|gross)\b/i.test(text)) return false;
  return FART_ASK.test(text) && PLAYFUL_PUBLIC.test(text);
}

/** Izzy usually says yes. Victoria usually does not. Izzy with the other skunkgirl wants the attention. */
export function indulgesPublicFart(
  girl: GirlId,
  place: LocationId,
  trust: number,
  withOther: boolean,
  onDuty: boolean,
) {
  if (onDuty) return false;
  if (girl === "izzy") {
    if (withOther) return true;
    if (TIGHT.has(place) && trust < 28) return false;
    return true;
  }
  if (VICKY_NO.has(place)) return false;
  return trust >= 72 && (place === "trail" || place === "mexican");
}

export function publicFartNo(girl: GirlId, avoid = ""): { narration: string; dialogue: string; expression: Expression } {
  if (girl === "victoria") {
    const lines: { narration: string; dialogue: string; expression: Expression }[] = [
      {
        narration: "She glances at the room, then at them, and does not shift her weight.",
        dialogue: "I don't feel gassy. And I am not going to invent one for a room full of people.",
        expression: "shy",
      },
      {
        narration: "Her tail stays down. One hand settles on her stomach and leaves.",
        dialogue: "The tank is empty. Even if it were not, not in public.",
        expression: "thinking",
      },
      {
        narration: "She adjusts her glasses and lowers her voice.",
        dialogue: "I'm out of gas. This is also a public room. Both are true.",
        expression: "suspicious",
      },
    ];
    return pickFresh(lines, avoid);
  }
  const lines: { narration: string; dialogue: string; expression: Expression }[] = [
    {
      narration: "She looks around, ears a little flat, and doesn't push.",
      dialogue: "I don't feel gassy, and this room is a lot. Nothing's even queued up.",
      expression: "embarrassed",
    },
    {
      narration: "She tries to play along, then winces and lets it go.",
      dialogue: "Tank's empty. I would. There's nothing in there.",
      expression: "shy",
    },
    {
      narration: "She grins, then shakes her head.",
      dialogue: "I'm out of gas. Dare me when my stomach's actually in on it.",
      expression: "laughing",
    },
  ];
  return pickFresh(lines, avoid);
}

export function publicFartYes(girl: GirlId, withOther: boolean): { narration: string; dialogue: string; expression: Expression } {
  if (girl === "victoria") {
    return {
      narration: "She checks who is close, steps in, and lets a short one go. She does not look proud of the choice.",
      dialogue: "Fine. A small one. If you tell anyone I agreed to that, I will deny it.",
      expression: "shy",
    };
  }
  if (withOther) {
    return {
      narration: "Izzy doesn't wait her turn. She leans, lets one go, and watches to see if their eyes come back to her.",
      dialogue: "Hey. I'm right here too. That one was so you'd look at me.",
      expression: "flirty",
    };
  }
  return {
    narration: "She glances around, decides she doesn't care, and lets it go with a grin.",
    dialogue: "Okay, okay. You asked nice. Don't make it a whole thing.",
    expression: "embarrassed",
  };
}

export function intimacyBrief(state: GameState, input: TurnInput) {
  const text = `${input.say} ${input.action}`;
  const scent =
    state.flags.scentInterest ||
    showedScentInterest(text) ||
    state.flags.fartConverted ||
    state.flags.sprayYield !== "none";
  const view = { ...state, flags: { ...state.flags, scentInterest: scent } };
  const call = intimacyCall(view, input);
  const hold = state.scentHold ?? 0;
  const relentless = scentRelentless(view, input);
  const lines = [
    `INTIMACY official: ${officiallyTogether(view) ? "yes — full sex is allowed" : "no"}`,
    `INTIMACY allowed now: ${intimacyAllowed(view) ? "yes" : "no"}`,
    `INTIMACY scene: ${call.scene || state.flags.intimateScene ? "yes" : "no"}`,
    `scentInterest: ${scent ? "yes — they have wanted her farts and/or spray" : "no"}`,
    `SCENT HOLD: ${hold > 0 && !call.release && !relentless ? "SET — do not fart and do not spray this turn. Watch how the last one landed. fx none, sprayed false, sprayKind null, pendingIntimateSpray false." : "clear"}`,
    relentless
      ? "SCENT PACE: relentless. She wants another now. Marking, dominance, or they just asked. Fart this turn. A spray is right if she is marking, dominant, or they asked to be sprayed, and the glands are not empty. Consecutive farts are allowed. Do not pause to watch their face. Do not wait a couple of turns."
      : "SCENT PACE: measured. One fart or one spray, then watch what it did. Do not fart or spray on the next line unless they ask, she is marking, or she is being dominant.",
  ];
  if (!officiallyTogether(view) && state.gameMode === "slow") {
    lines.push("SLOW ROMANCE: refuse all sexual activity until you are official. No sex, no undressing, no intimate spray.");
  } else if (!officiallyTogether(view) && intimacyAllowed(view)) {
    lines.push(
      "CASUAL, not official: intimacy is allowed only because trust and bonding are both at least 50 and they want your farts or spray. Keep the scene centered on those. Do not switch to sex that leaves them out.",
    );
  } else if (!intimacyAllowed(view)) {
    lines.push("They are not allowed intimacy yet. Refuse it in character. Do not start a sex scene.");
  }
  if ((call.scene || state.flags.intimateScene) && state.timeOfDay === "Night") {
    lines.push(
      "NIGHT SCENE: the clock is frozen. Do not end the day, do not leave, do not say you have to go home. Stay in the roleplay until they end it.",
    );
  }
  if (call.concluded) {
    lines.push("They are ending the intimate scene. Do not start another sex act. Answer the ending.");
  }
  if (call.redirect) {
    lines.push("They pushed past farts and spray. Pull it back. You are not official. The gas or the spray stays the point.");
  }
  return lines.join("\n");
}
