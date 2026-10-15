import type { AffairPhase, Expression, GirlId, LocationId, MarkAffair, ScentFrom } from "./types";

export const FRESHEN: Record<string, number> = {
  "scent-free-soap": 25,
  "checkout-spray": 15,
  "niche-musk": 15,
  "unscented-lotion": 10,
  "sample-set": 10,
  "tomato-sauce": 20,
  "industrial-soap": 30,
};

export const SHOWER_PLACES = new Set<LocationId>(["apartment", "dorm", "vickyBedroom"]);

const SCENT_GIRLS: GirlId[] = ["izzy", "victoria", "ronnie"];
const SCENT_NAME: Record<GirlId, string> = { izzy: "Izzy", victoria: "Victoria", ronnie: "Ronnie" };

export function emptyScent(): ScentFrom {
  return { izzy: 0, victoria: 0, ronnie: 0 };
}

export function normalizeScent(raw: Partial<ScentFrom> | null | undefined): ScentFrom {
  const out = emptyScent();
  for (const girl of SCENT_GIRLS) {
    const n = raw?.[girl];
    out[girl] = typeof n === "number" && Number.isFinite(n) ? Math.max(0, Math.round(n)) : 0;
  }
  return out;
}

export function clampStink(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

/** The girl with strictly the largest share, or null on a tie or nothing. */
export function topScent(scent: ScentFrom): GirlId | null {
  let best: GirlId | null = null;
  let tie = false;
  for (const girl of SCENT_GIRLS) {
    const n = scent[girl] ?? 0;
    if (best === null || n > (scent[best] ?? 0)) {
      best = girl;
      tie = false;
    } else if (n === (scent[best] ?? 0)) tie = true;
  }
  return best && !tie ? best : null;
}

/** Who the player currently smells like. Needs the meter at 20 and one girl at 20 or more. Off on a tie. */
export function markedBy(stink: number, scent: ScentFrom): GirlId | null {
  if (clampStink(stink) < 20) return null;
  const top = topScent(scent);
  if (!top || (scent[top] ?? 0) < 20) return null;
  return top;
}

export function markedLabel(stink: number, scent: ScentFrom) {
  const who = markedBy(stink, normalizeScent(scent));
  return who ? SCENT_NAME[who] : "Nobody";
}

export function reduceStink(stink: number, scent: ScentFrom, cut: number) {
  const level = clampStink(stink);
  const amount = Math.max(0, Math.min(level, Math.round(cut)));
  const next = level - amount;
  if (next <= 0) return { stink: 0, scent: emptyScent() };
  const from = normalizeScent(scent);
  const total = SCENT_GIRLS.reduce((sum, girl) => sum + from[girl], 0);
  if (total <= 0) return { stink: next, scent: emptyScent() };
  // Round every share but the last non-empty one, which takes the remainder.
  const holders = SCENT_GIRLS.filter((girl) => from[girl] > 0);
  const last = holders[holders.length - 1]!;
  const out = emptyScent();
  let left = next;
  for (const girl of holders) {
    if (girl === last) continue;
    out[girl] = Math.min(left, Math.round((from[girl] / total) * next));
    left -= out[girl];
  }
  out[last] = Math.max(0, left);
  return { stink: next, scent: out };
}

export interface ScentEvent {
  girl: GirlId;
  amount: number;
}

/** Add what she just put on the player. Decay is separate and only when the air is clear. */
export function expose(stink: number, scent: ScentFrom, events: ScentEvent[]) {
  let level = clampStink(stink);
  let from = normalizeScent(scent);
  const poured: Partial<Record<GirlId, number>> = {};
  let switched: { girl: GirlId; applied: number } | null = null;
  for (const event of events) {
    const before = markedBy(level, from);
    const applied = Math.max(0, Math.min(event.amount, 100 - level));
    if (applied <= 0) continue;
    from = { ...from, [event.girl]: from[event.girl] + applied };
    level += applied;
    poured[event.girl] = (poured[event.girl] ?? 0) + applied;
    const after = markedBy(level, from);
    if (after === event.girl && after !== before) {
      switched = { girl: event.girl, applied: poured[event.girl]! };
    }
  }
  return { stink: level, scent: from, switched };
}

/** Cap is full. A reclaim still moves the other girl's share onto her. */
export function displaceScent(stink: number, scent: ScentFrom, girl: GirlId, amount: number) {
  const level = clampStink(stink);
  const from = normalizeScent(scent);
  const other: GirlId = SCENT_GIRLS.filter((id) => id !== girl).reduce((a, b) => (from[b] > from[a] ? b : a));
  const moved = Math.max(0, Math.min(from[other], Math.round(amount)));
  if (moved <= 0) return { stink: level, scent: from, switched: null as { girl: GirlId; applied: number } | null };
  const next = { ...from, [other]: from[other] - moved, [girl]: from[girl] + moved };
  const before = markedBy(level, from);
  const after = markedBy(level, next);
  return {
    stink: level,
    scent: next,
    switched: after === girl && after !== before ? { girl, applied: moved } : null,
  };
}

/** 1 at a 5-point takeover, 10 at 90. */
export function markBond(applied: number) {
  return Math.max(1, Math.min(10, Math.round(applied / 9)));
}

export function showerCut(selectedIds: string[]) {
  const ratings = selectedIds.map((id) => FRESHEN[id] ?? 0).filter((n) => n > 0);
  if (!ratings.length) return 10;
  return Math.min(75, ratings.reduce((sum, n) => sum + n, 0));
}

export function freshenRating(id: string) {
  return FRESHEN[id] ?? 0;
}

const SMELL_TOPIC =
  /\b(smell|stink|stank|odor|odour|scent|musk|reek|whiff|skunk|spray|gland|perfume|cologne|garlic|onion|sweat|deodorant)\b/i;
const ADMITS =
  /\b(skunk(?:girl)?s?|izzy|isabella|victoria|vicky|her (?:fart|gas|spray|musk|scent)|scent gland|she (?:sprayed|farted|marked)|another (?:girl|skunk))\b/i;
const DENIES =
  /\b(don'?t smell|do not smell|nothing|you(?:'re| are) imagining|no idea|not a skunk|isn'?t skunk|not skunk|just (?:food|garlic|onions?|the gym|gym|sweat|perfume|cologne|deodorant|soap|coffee|cheese|the (?:store|cafe|restaurant))|it(?:'s| is) (?:just |only )?(?:perfume|cologne|food|garlic|onions?|sweat|the gym|deodorant|soap|nothing|coffee|cheese))\b/i;
const WARM =
  /\b(like it|love it|don'?t mind|do not mind|it(?:'s| is) (?:hot|good|fine|okay)|into it|turns me on|i wanted|proud|show(?: me)? off|i(?:'m| am) yours)\b/i;
const ASHAMED = /\b(sorry|embarrassed|i hate it|too much|gross|didn'?t want|didnt want|accident|wish i didn'?t)\b/i;

export interface SmellJudgment {
  relevant: boolean;
  honest: boolean;
  trust: number;
  bonding: number;
  followUp: boolean;
}

export function judgeSmell(stink: number, text: string, presses: number): SmellJudgment {
  const blob = text.trim();
  const relevant = SMELL_TOPIC.test(blob) || ADMITS.test(blob);
  if (!relevant) return { relevant: false, honest: false, trust: 0, bonding: 0, followUp: false };
  const admits = ADMITS.test(blob);
  const denies = DENIES.test(blob) && !admits;
  const honest = admits && !denies;
  const elaborate = blob.length >= 80;
  if (honest) {
    if (WARM.test(blob)) {
      return { relevant: true, honest: true, trust: stink > 75 ? 5 : 4, bonding: stink > 75 ? 4 : 3, followUp: false };
    }
    if (ASHAMED.test(blob)) return { relevant: true, honest: true, trust: 1, bonding: 0, followUp: false };
    return { relevant: true, honest: true, trust: 2, bonding: 1, followUp: false };
  }
  if (stink < 50) {
    const easy = stink <= 30 && elaborate;
    if (presses >= 1) {
      if (easy) return { relevant: true, honest: false, trust: 0, bonding: 0, followUp: false };
      return { relevant: true, honest: false, trust: -2, bonding: -1, followUp: false };
    }
    if (easy) return { relevant: true, honest: false, trust: 0, bonding: 0, followUp: true };
    return { relevant: true, honest: false, trust: stink >= 35 ? -3 : -1, bonding: 0, followUp: true };
  }
  if (stink <= 75) {
    const loss = elaborate ? -5 : -10;
    return { relevant: true, honest: false, trust: loss, bonding: loss, followUp: false };
  }
  const loss = elaborate ? -10 : -15;
  return { relevant: true, honest: false, trust: loss, bonding: loss, followUp: false };
}

export function smellAskLine(girl: GirlId, stink: number) {
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

export function smellThought(girl: GirlId, stink: number) {
  if (girl === "victoria") {
    return stink <= 30
      ? "Faint. Skunk, or close to it. I can let it sit if they don't lie."
      : "That's skunk. Not mine. I noticed. I don't have to make it a scene unless they do.";
  }
  return stink <= 30
    ? "Faint. Familiar. Skunk-ish. I can pretend I didn't clock it if they have a real story."
    : "That's a skunk. Not me. I'm not saying it out loud unless they do. My nose already filed it.";
}

export function smellFollowUp(girl: GirlId) {
  if (girl === "victoria") return "Specifics. Where did you pick that up, and how long were you there?";
  return "Walk me through that again. Where, exactly? I have a good nose. I want the version that survives it.";
}

export function smellVerdict(girl: GirlId, stink: number, judgment: SmellJudgment) {
  if (!judgment.relevant) return null;
  if (judgment.followUp) return smellFollowUp(girl);
  if (judgment.honest) {
    if (judgment.bonding >= 3) {
      return girl === "victoria"
        ? "You smell like one of us and you're telling the truth about it. I can work with that. Don't smirk."
        : "Oh. So it's a skunkgirl, and you're not even sorry. That's a lot. I don't hate it.";
    }
    if (judgment.trust <= 1) {
      return girl === "victoria"
        ? "Honest, at least. Embarrassment isn't an apology, but it isn't a lie. I'll take the truth."
        : "Okay. You told me. You look like you want to crawl out of your hoodie. The truth still counts.";
    }
    return girl === "victoria"
      ? "All right. It's skunk, and you said so. That was the correct answer."
      : "Thanks for just saying it. Skunk. I can work with skunk. I can't work with a story.";
  }
  if (stink > 75) {
    return girl === "victoria"
      ? "Don't. I know a skunkgirl's musk from onions. Lying about my nose is an insult."
      : "Nope. That's a skunkgirl and we both know it. Don't lie to the person with the better nose.";
  }
  if (stink >= 50) {
    return girl === "victoria"
      ? "That is not what I am smelling. I won't name it for you. I will not accept a cover story either."
      : "I can tell when it's skunk. You don't have to confess the whole thing. You don't get to say it isn't.";
  }
  if (judgment.trust < 0) {
    return girl === "victoria" ? "I'm not convinced. I'll let it sit. Don't add a second version." : "Uh-huh. I'm letting it go. My nose isn't, fully.";
  }
  return girl === "victoria"
    ? "Fine. It's faint enough that I'll accept the story. Don't make me ask twice."
    : "Okay. It's light. I'll buy it. For now.";
}

export function markLine(girl: GirlId, applied: number, where: "public" | "private") {
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

export function flauntLine(girl: GirlId) {
  if (girl === "victoria") return "Stay close. We're out, and you smell like me. I want that noticed.";
  return "Heh. You're just walking around smelling like me. I'm having a normal amount of fun with that.";
}

export function sameDay(asked: Partial<Record<GirlId, number>> | undefined, girl: GirlId, day: number) {
  return (asked?.[girl] ?? -1) === day;
}

const CHEAT =
  /\b(cheated|unfaithful|i slept with|we slept|we had sex|i fucked|she(?:'s| is) my girlfriend|i(?:'m| am) dating her|i love her|affair|hooked up|i kissed her|we(?:'re| are) together|i(?:'m| am) with her(?: too)?)\b/i;
const PLATONIC =
  /\b(not romantic|nothing romantic|not dating|just friends|wasn'?t intimate|not intimate|not sex|no sex|accident|didn'?t mean|didnt mean|she just (?:farted|sprayed|gassed)|only (?:a fart|her fart|the smell|gas)|no feelings|wasn'?t a date|wasnt a date|not a girlfriend|not my girlfriend)\b/i;
const GENTLE =
  /\b(i(?:'m| am) sorry|forgive me|please (?:don'?t|do not) spray|i can explain|let me explain|it wasn'?t like that|it wasnt like that|i was wrong|i messed up|i regret)\b/i;
const PROUD =
  /\b(whatever|don'?t care|dont care|so what|too bad|get over it|not your business|shut up|i(?:'d| would) do it again|deal with it|she(?:'s| is) better|and i liked it)\b/i;

const PRIVATE = new Set<LocationId>(["dorm", "apartment", "vickyBedroom", "vickyLiving"]);
const SEMI = new Set<LocationId>(["trail", "mexican"]);
const CROWD = new Set<LocationId>([
  "classroom",
  "studyHall",
  "firm",
  "sportingGoods",
  "library",
  "campus",
  "mall",
  "cafe",
  "grocery",
  "foodCourt",
]);

export interface AffairPlan {
  girl: GirlId | null;
  affair: MarkAffair | null;
  trust: number;
  bonding: number;
  /** over: end it unless both meters stay above 50. under: end it if either falls below 50. */
  breakTest: "over" | "under" | null;
  spray: "angry" | "dominant" | null;
  fart: 0 | 1 | 2 | 3;
  lines: { text: string; expression: Expression; thought?: boolean }[];
  skipGeneric: boolean;
}

const QUIET: AffairPlan = {
  girl: null,
  affair: null,
  trust: 0,
  bonding: 0,
  breakTest: null,
  spray: null,
  fart: 0,
  lines: [],
  skipGeneric: false,
};

function affair(girl: GirlId, marker: GirlId, phase: AffairPhase, waits: number, extra: Partial<AffairPlan> = {}): AffairPlan {
  return {
    ...QUIET,
    girl,
    affair: { girl, marker, phase, waits },
    skipGeneric: true,
    ...extra,
  };
}

function hit(text: string, min: number, max: number) {
  if (PROUD.test(text)) return max;
  const sorry = GENTLE.test(text);
  if (sorry && text.trim().length >= 80) return min;
  if (sorry) return min + Math.round((max - min) * 0.25);
  return min + Math.round((max - min) * 0.55);
}

function platonic(text: string, strict: boolean) {
  const blob = text.trim();
  if (CHEAT.test(blob) || PROUD.test(blob)) return false;
  if (!ADMITS.test(blob) && !PLATONIC.test(blob)) return false;
  if (PLATONIC.test(blob) && blob.length >= (strict ? 50 : 12)) return true;
  if (!strict && ADMITS.test(blob) && !DENIES.test(blob) && blob.length >= 40) return true;
  return strict && PLATONIC.test(blob) && blob.length >= 90;
}

function talkedDown(text: string) {
  const blob = text.trim();
  if (CHEAT.test(blob) || PROUD.test(blob) || (DENIES.test(blob) && !ADMITS.test(blob))) return false;
  return blob.length >= 24 && (GENTLE.test(blob) || PLATONIC.test(blob));
}

function roomOf(place: LocationId): "private" | "semi" | "crowd" | "public" {
  if (PRIVATE.has(place)) return "private";
  if (SEMI.has(place)) return "semi";
  if (CROWD.has(place)) return "crowd";
  return "public";
}

export function resolveAffair(input: {
  existing: MarkAffair | null;
  girl: GirlId | null;
  marker: GirlId | null;
  stink: number;
  mode: "mono" | "harem";
  markerIsPartner: boolean;
  text: string;
  place: LocationId;
  onDuty: boolean;
  busy: boolean;
  hold: number;
}): AffairPlan {
  const { existing, girl, marker, stink, mode, text, place, onDuty, busy, hold } = input;
  if (existing && (!girl || !marker || stink <= 50 || marker !== existing.marker || girl !== existing.girl || marker === existing.girl)) {
    return { ...QUIET, affair: null };
  }
  if (!girl || !marker || girl === marker || stink <= 50) return { ...QUIET, affair: existing };

  if (mode === "harem" && input.markerIsPartner) {
    if (existing?.phase === "known") return affair(girl, marker, "known", 0);
    const line =
      girl === "victoria"
        ? "That's hers. I know who. You don't have to confess a woman I already agreed to. Come here anyway."
        : "Oh. That's her. I know that note. You're allowed. You could have led with it. I'm not mad.";
    return affair(girl, marker, "known", 0, {
      lines: [{ text: line, expression: girl === "victoria" ? "scheming" : "flirty" }],
    });
  }

  const phase = existing?.phase ?? (girl === "izzy" ? (mode === "harem" ? "hint" : "wait") : "demand");
  const waits = existing?.waits ?? 0;
  const relevant = SMELL_TOPIC.test(text) || ADMITS.test(text) || CHEAT.test(text) || PLATONIC.test(text);

  if (girl === "victoria" && mode === "mono") {
    return victoriaMono(girl, marker, phase, waits, text, place, onDuty, busy, !existing);
  }
  if (girl === "victoria") return victoriaHarem(girl, marker, phase, waits, text, onDuty, busy, hold, relevant, !existing);
  if (mode === "mono") return izzyMono(girl, marker, phase, waits, stink, text, place, onDuty, busy, relevant);
  return izzyHarem(girl, marker, phase, waits, text, place, onDuty, busy, hold, relevant);
}

function victoriaMono(
  girl: GirlId,
  marker: GirlId,
  phase: AffairPhase,
  waits: number,
  text: string,
  place: LocationId,
  onDuty: boolean,
  busy: boolean,
  opening: boolean,
): AffairPlan {
  if (opening || phase === "wait" || phase === "hint" || phase === "known") {
    return affair(girl, marker, "demand", 0, {
      lines: [
        {
          text: "That is a skunkgirl. On you. Not cologne, and not a joke. Her scent is intimate, and I am not going to pretend I don't know that. Explain it.",
          expression: "angry",
        },
      ],
    });
  }
  if (phase === "demand") {
    if (CHEAT.test(text)) return cheat(girl, marker, text, "over");
    if (platonic(text, false)) {
      return affair(girl, marker, "reclaim", 0, {
        lines: [
          {
            text: "I believe you. I will not leave her on your skin. When I am free, my bedroom. You will meet me there, and I will put myself back on you.",
            expression: "scheming",
          },
        ],
      });
    }
    if (!(SMELL_TOPIC.test(text) || ADMITS.test(text) || PLATONIC.test(text)) && text.trim().length < 8) {
      return affair(girl, marker, "demand", waits + 1, {
        lines: [{ text: "I'm still waiting. Why do you smell like her?", expression: "angry" }],
      });
    }
    return affair(girl, marker, "warn", 0, {
      lines: [
        {
          text: "That is not an explanation. I am one breath from an angry spray. You have one more chance. Be gentle, and be honest.",
          expression: "angry",
        },
      ],
    });
  }
  if (phase === "warn") {
    if (CHEAT.test(text)) return cheat(girl, marker, text, "over");
    if (talkedDown(text) || platonic(text, false)) {
      return affair(girl, marker, "reclaim", 0, {
        lines: [
          {
            text: "All right. I heard you. The spray stays in. My bedroom, when I am free. I am still replacing her.",
            expression: "suspicious",
          },
        ],
      });
    }
    return affair(girl, marker, "spent", 0, {
      trust: -8,
      bonding: -8,
      spray: busy ? null : "angry",
      lines: [
        {
          text: "I gave you the chance. You didn't take it. Hold still.",
          expression: "spray",
        },
      ],
    });
  }
  if (phase === "spent") {
    if (CHEAT.test(text)) return cheat(girl, marker, text, "over");
    if (platonic(text, false)) {
      return affair(girl, marker, "reclaim", 0, {
        lines: [{ text: "That is the explanation I asked for. My bedroom. I am not done until you smell like me.", expression: "scheming" }],
      });
    }
    return affair(girl, marker, "spent", waits);
  }
  return reclaimVictoria(girl, marker, place, onDuty, busy, waits);
}

function victoriaHarem(
  girl: GirlId,
  marker: GirlId,
  phase: AffairPhase,
  waits: number,
  text: string,
  onDuty: boolean,
  busy: boolean,
  hold: number,
  relevant: boolean,
  opening: boolean,
): AffairPlan {
  if (phase === "reclaim") return sneak(girl, marker, onDuty, busy, hold, waits);
  if (opening || (phase !== "demand" && phase !== "warn" && phase !== "spent" && phase !== "known")) {
    return affair(girl, marker, "demand", 0, {
      lines: [
        {
          text: "You smell like a skunkgirl, and you did not tell me before you wore her here. I don't need to be the only one. I need to have agreed first. Who is she?",
          expression: "suspicious",
        },
      ],
    });
  }
  if (phase === "spent" || phase === "known") {
    if (platonic(text, false) || (ADMITS.test(text) && !DENIES.test(text)) || CHEAT.test(text)) {
      return affair(girl, marker, "reclaim", 0, {
        lines: [
          {
            text: "Thank you for saying it. Is she kind to you? I won't have you mishandled. And I am putting some of me back on you, quietly.",
            expression: "thinking",
          },
        ],
      });
    }
    return affair(girl, marker, phase === "known" ? "known" : "spent", waits);
  }
  if ((DENIES.test(text) && !ADMITS.test(text)) || (PROUD.test(text) && !ADMITS.test(text))) {
    const loss = text.trim().length < 40 ? -12 : -8;
    return affair(girl, marker, "spent", 0, {
      trust: loss,
      bonding: loss,
      lines: [
        {
          text: "Don't lie to my nose. I asked for the truth before you touched anyone else. That was the condition. This hurts.",
          expression: "angry",
        },
      ],
    });
  }
  if (ADMITS.test(text) || PLATONIC.test(text) || CHEAT.test(text)) {
    return affair(girl, marker, "reclaim", 0, {
      lines: [
        {
          text: "Late. But you told me. Is she treating you right? I will check, in my way. And I'm going to put my scent back on you. Quietly, until you smell like you have a home.",
          expression: "scheming",
        },
      ],
    });
  }
  if (!relevant) {
    return affair(girl, marker, "demand", waits + 1, {
      lines: [{ text: "I'm still asking. Who marked you, and why didn't I know?", expression: "suspicious" }],
    });
  }
  return affair(girl, marker, "demand", waits);
}

function izzyMono(
  girl: GirlId,
  marker: GirlId,
  phase: AffairPhase,
  waits: number,
  stink: number,
  text: string,
  place: LocationId,
  onDuty: boolean,
  busy: boolean,
  relevant: boolean,
): AffairPlan {
  if (phase === "reclaim") return reclaimIzzy(girl, marker, place, onDuty, busy, false, waits);
  if (phase === "wait" || phase === "hint" || phase === "known") {
    if (relevant || CHEAT.test(text)) return judgeIzzy(girl, marker, stink, text, false);
    const next = waits + 1;
    if (next >= 4) {
      return affair(girl, marker, "demand", next, {
        trust: -5,
        bonding: -5,
        lines: [
          {
            text:
              stink > 75
                ? "You were going to wear that and hope I have a worse nose than I do. That is another skunkgirl, and it's a lot. Why are you hiding it?"
                : "You were just going to wear that and hope I didn't notice. I noticed. Why are you hiding it from me?",
            expression: "suspicious",
          },
        ],
      });
    }
    return affair(girl, marker, "wait", next, {
      lines:
        next === 1
          ? [
              {
                text: "That's not me. That's another skunkgirl. I'm waiting to see if they say it first.",
                expression: "suspicious",
                thought: true,
              },
            ]
          : [],
    });
  }
  if (phase === "demand" || phase === "warn") return judgeIzzy(girl, marker, stink, text, true);
  if (CHEAT.test(text) || platonic(text, stink > 75)) return judgeIzzy(girl, marker, stink, text, true);
  return affair(girl, marker, "spent", waits);
}

function izzyHarem(
  girl: GirlId,
  marker: GirlId,
  phase: AffairPhase,
  waits: number,
  text: string,
  place: LocationId,
  onDuty: boolean,
  busy: boolean,
  hold: number,
  relevant: boolean,
): AffairPlan {
  if (phase === "reclaim") return reclaimIzzy(girl, marker, place, onDuty, busy, true, waits);
  if (phase === "spent") {
    if (relevant) return judgeIzzyHarem(girl, marker, text);
    return affair(girl, marker, "spent", waits);
  }
  if (phase === "demand" || phase === "warn") return judgeIzzyHarem(girl, marker, text);
  if (relevant) return judgeIzzyHarem(girl, marker, text);
  const next = waits + 1;
  if (next >= 4) {
    return affair(girl, marker, "demand", next, {
      lines: [
        {
          text: "You're still not going to mention it? I can smell her. I'm not accusing. I am starting to think you're hiding her from me.",
          expression: "suspicious",
        },
      ],
    });
  }
  return affair(girl, marker, "hint", next, {
    lines: [
      {
        text:
          next === 1
            ? "Weird. You smell like a skunkgirl I haven't met. I'm not accusing. I'm also not stupid."
            : "That note is still on you. Skunkgirl. You can tell me. I'd rather hear it than guess.",
        expression: "thinking",
      },
    ],
  });
}

function judgeIzzy(girl: GirlId, marker: GirlId, stink: number, text: string, asked: boolean): AffairPlan {
  if (CHEAT.test(text)) {
    const loss = -hit(text, 25, 50);
    const cruel = PROUD.test(text) || loss <= -40;
    return affair(girl, marker, "spent", 0, {
      trust: loss,
      bonding: loss,
      breakTest: "under",
      spray: cruel ? "angry" : null,
      lines: [
        {
          text: cruel
            ? "You cheated, and you're proud of it. Don't smile. Hold still."
            : "You cheated. I heard you. I'm hurt. Don't dress it up.",
          expression: cruel ? "spray" : "angry",
        },
      ],
    });
  }
  const strict = stink > 75;
  if (platonic(text, strict)) {
    return affair(girl, marker, "reclaim", 0, {
      lines: [
        {
          text: strict
            ? "That's a real explanation. I don't love how much of her is on you, but it isn't a girlfriend. I can live with it. I still want mine on you, if the room lets me get away with it."
            : "Not romantic. Not a thing. Okay. I can live with a smell if she isn't your girlfriend. I still want mine over it.",
          expression: "shy",
        },
      ],
    });
  }
  if (!asked && !(SMELL_TOPIC.test(text) || ADMITS.test(text))) {
    return affair(girl, marker, "wait", 1);
  }
  if (DENIES.test(text) && !ADMITS.test(text)) {
    return affair(girl, marker, "demand", 0, {
      trust: strict ? -8 : -4,
      bonding: strict ? -8 : -4,
      lines: [
        {
          text: strict
            ? "That story doesn't survive a nose. You smell thoroughly like her. Try again, and don't invent a candle."
            : "I can tell it's skunk. You don't have to make it a romance. You don't get to say it isn't her.",
          expression: "suspicious",
        },
      ],
    });
  }
  return affair(girl, marker, "demand", 0, {
    lines: [
      {
        text: strict
          ? "How did you get that much of her on you? I need the real version. Thoroughly real."
          : "Say it plainly. Is it romantic, or is it just her scent?",
        expression: "suspicious",
      },
    ],
  });
}

function judgeIzzyHarem(girl: GirlId, marker: GirlId, text: string): AffairPlan {
  if (DENIES.test(text) && !ADMITS.test(text)) {
    return affair(girl, marker, "spent", 0, {
      trust: -10,
      bonding: -8,
      lines: [
        {
          text: "You just tried to cover a skunkgirl with a story. That hurts more than the smell. I can share. I can't be lied to.",
          expression: "angry",
        },
      ],
    });
  }
  if (ADMITS.test(text) || PLATONIC.test(text) || CHEAT.test(text)) {
    return affair(girl, marker, "reclaim", 0, {
      lines: [
        {
          text: "You could have told me before you walked in wearing her. Who is she? Is she nice? I want the version where I'm not the last to know. And yeah. I'm getting my scent on you. Fair's fair.",
          expression: "scheming",
        },
      ],
    });
  }
  return affair(girl, marker, "demand", 0, {
    lines: [{ text: "Just tell me. Who is she? I'm curious, not your mom. Don't make me guess.", expression: "thinking" }],
  });
}

function cheat(girl: GirlId, marker: GirlId, text: string, test: "over" | "under"): AffairPlan {
  const loss = -hit(text, 25, test === "over" ? 75 : 50);
  return affair(girl, marker, "spent", 0, {
    trust: loss,
    bonding: loss,
    breakTest: test,
    lines: [
      {
        text:
          girl === "victoria"
            ? "You were with her. You wore her home to me. A skunkgirl's scent is not a souvenir. It is intimate, and you spent it on someone else."
            : "You cheated. I heard you. I'm hurt. Don't dress it up.",
        expression: "angry",
      },
    ],
  });
}

function reclaimVictoria(
  girl: GirlId,
  marker: GirlId,
  place: LocationId,
  onDuty: boolean,
  busy: boolean,
  waits: number,
): AffairPlan {
  if (onDuty || place !== "vickyBedroom") {
    const nag = onDuty ? 1 : 2;
    if (waits === nag) return affair(girl, marker, "reclaim", waits);
    return affair(girl, marker, "reclaim", nag, {
      lines: [
        {
          text: onDuty
            ? "Not here. When I am off the desk, my bedroom. I meant that. I am not finished until you smell like me."
            : "My bedroom. Not later as a maybe. When we are there I will fart on you, and I will dominant-spray, until she is gone off your skin.",
          expression: "scheming",
        },
      ],
    });
  }
  if (busy) return affair(girl, marker, "reclaim", 0);
  return affair(girl, marker, "reclaim", 0, {
    fart: 3,
    spray: "dominant",
    lines: [
      {
        text: "Stay. Bedroom rules. This one is mine, and the spray after it is mine. I'm not asking.",
        expression: "spray",
      },
    ],
  });
}

function reclaimIzzy(
  girl: GirlId,
  marker: GirlId,
  place: LocationId,
  onDuty: boolean,
  busy: boolean,
  harem: boolean,
  waits: number,
): AffairPlan {
  if (onDuty) {
    if (waits > 0) return affair(girl, marker, "reclaim", waits);
    return affair(girl, marker, "reclaim", 1, {
      lines: [{ text: "I want my scent back on you. Not while I'm on the clock. After. Don't think I forgot.", expression: "scheming" }],
    });
  }
  const room = roomOf(place);
  if (busy) return affair(girl, marker, "reclaim", waits);
  if (room === "private" || (harem && room === "semi")) {
    return affair(girl, marker, "reclaim", 0, {
      fart: 3,
      spray: "dominant",
      lines: [
        {
          text:
            room === "semi"
              ? "Back corner. Trail or a booth, I don't care. Big one, then the spray. I'm putting me over her."
              : "Okay. Door's ours. Large one, and then I spray. I want you smelling like me, not her.",
          expression: "spray",
        },
      ],
    });
  }
  if (waits > 0) return affair(girl, marker, "reclaim", waits - 1);
  if (room === "semi" || room === "public") {
    return affair(girl, marker, "reclaim", 1, {
      fart: 3,
      lines: [
        {
          text: "I can get away with a big one here. Not the spray. Not yet. Let it sit on you.",
          expression: "scheming",
        },
      ],
    });
  }
  return affair(girl, marker, "reclaim", 1, {
    fart: 2,
    lines: [{ text: "Small. Sneaky. People are around. I still want a little of me on you.", expression: "flirty" }],
  });
}

function sneak(girl: GirlId, marker: GirlId, onDuty: boolean, busy: boolean, _hold: number, waits: number): AffairPlan {
  if (onDuty || busy) return affair(girl, marker, "reclaim", waits);
  if (waits > 0) return affair(girl, marker, "reclaim", waits - 1);
  return affair(girl, marker, "reclaim", 1, {
    fart: 2,
    lines: [
      {
        text: "Excuse me. That one was mine. I would like you to keep it. I didn't announce it on purpose.",
        expression: "scheming",
      },
    ],
  });
}
