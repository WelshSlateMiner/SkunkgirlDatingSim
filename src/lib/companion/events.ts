import { girlName } from "./cast";
import { sceneNames, sceneOrder } from "./scene";
import type { Expression, GirlId, LiveEvent, TimeOfDay } from "./types";

/**
 * Rare incidents. Each one rolls on a player input while its conditions hold,
 * then plays out in scripted beats so the outcome does not depend on the model.
 * Wolf Attack! is the first. Later events join CATALOG.
 */

export type EventId = "wolf";

export type SkunkChoice = "disgusted" | "understanding" | "aroused";

export interface EventSpec {
  id: EventId;
  name: string;
  /** Location ids where the incident can start. */
  locations: readonly string[];
  chance: (time: TimeOfDay) => number;
}

export const WOLF_CHANCE_DAY = 0.02;
export const WOLF_CHANCE_DARK = 0.04;

export function wolfChance(time: TimeOfDay) {
  return time === "Evening" || time === "Night" ? WOLF_CHANCE_DARK : WOLF_CHANCE_DAY;
}

export const CATALOG: readonly EventSpec[] = [
  { id: "wolf", name: "Wolf Attack!", locations: ["trail"], chance: wolfChance },
];

export function findEvent(name: string): EventSpec | null {
  const n = name.trim().toLowerCase().replace(/[!?.]+$/g, "").trim();
  if (!n) return null;
  return CATALOG.find((event) => event.id === n || event.name.toLowerCase().replace(/[!?.]+$/g, "") === n) ?? null;
}

export interface RollState {
  incident?: LiveEvent | null;
  location: string;
  dayPhase: string;
  izzyHere?: boolean;
  present?: readonly string[];
  started?: boolean;
  timeOfDay: TimeOfDay;
}

/** True when some event is allowed to roll. A miss spends nothing. */
export function canRollEvents(state: RollState) {
  if (state.incident) return false;
  if (!state.started) return false;
  if (state.dayPhase !== "playing") return false;
  if (state.izzyHere === false) return false;
  if (!state.present?.length) return false;
  return true;
}

export function rollEvent(state: RollState, rng: () => number): EventId | null {
  if (!canRollEvents(state)) return null;
  for (const event of CATALOG) {
    if (!event.locations.includes(state.location)) continue;
    if (rng() < event.chance(state.timeOfDay)) return event.id;
  }
  return null;
}

/** Both meters strictly over 50. Exactly 50 stays on the low path. */
export function metersWarm(trust: number, bonding: number) {
  return trust > 50 && bonding > 50;
}

/** An attempt to drive the wolf off. Being frightened is not one. */
function plain(text: string) {
  return text.toLowerCase().replace(/[\u2018\u2019]/g, "'");
}

export function triedToWard(text: string) {
  const t = plain(text);
  if (!t.trim()) return false;
  return (
    /\b(shouts?|shouting|yells?|yelling|screams?|screaming|hollers?|hollering)\b/.test(t) ||
    /\b(throws?|throwing|hurls?|chucks?|flings?)\b/.test(t) ||
    /\b(protects?|protecting|shields?|shielding|fends?|fending)\b/.test(t) ||
    /\b(wards?|warding|shoos?|shooing)\b/.test(t) ||
    /\b(swings?|swinging|stomps?|stomping|charges?|charging|kicks?|kicking|punches?|punching)\b/.test(t) ||
    /\b(waves?|waving|claps?|clapping|bangs?|banging|roars?|roaring|barks?|barking)\b/.test(t) ||
    /\bscare(?:s|d|ing)?\s+(?:it|him|the wolf|the animal)\b/.test(t) ||
    /\b(step|stand|get|put|move)s?\b[^.]{0,40}\b(in front|between)\b/.test(t) ||
    /\bin front of\b/.test(t) ||
    /\b(fight|fights|fighting|chase|chases|chasing)\s+(?:it|him|the wolf)\b/.test(t) ||
    /\b(drive|back|scare)\s+(?:it|him|the wolf)\s+(?:off|away|back)\b/.test(t) ||
    /\bpick(?:s|ed)? up\b[^.]{0,24}\b(rock|stick|branch)\b/.test(t)
  );
}

/** Begging a girl not to follow through on the dominant spray. */
export function beggedOff(text: string) {
  const t = plain(text);
  if (!t.trim()) return false;
  if (/\b(don'?t|do not|stop|wait|hold on|spare|please no|not that|knock it off|cut it out|mercy)\b/.test(t)) return true;
  if (/\bbeg(?:ging|ged|s)?\b/.test(t) && !/\bdon'?t beg\b/.test(t)) return true;
  if (/^\s*no\b/.test(t) && !/\b(do it|go ahead|spray)\b/.test(t)) return true;
  return false;
}

export type WardEffort = "none" | "failed" | "stood";

/** The player tried, and the way they wrote it says the wolf was not stopped. */
export function effortFellShort(text: string) {
  const t = plain(text);
  if (!t.trim()) return false;
  return (
    /\b(not very effective|not effective|ineffective|useless|pointless|no use|no effect|no luck|does nothing|did nothing|nothing happens)\b/.test(t) ||
    /\b(doesn'?t|don'?t|didn'?t|won'?t|isn'?t|wasn'?t|ain'?t|barely|hardly)\b[^.]{0,48}\b(work|working|help|helping|enough|effective|effect|matter|phase|stop|scare|deter|slow|notice|care|fazed|impressed)\b/.test(t) ||
    /\b(keeps? coming|still coming|comes? closer|getting closer|closing in|keeps? advancing|still advancing|still lunging|won'?t stop|not stopping)\b/.test(t) ||
    /\b(wolf|it|he|animal)\b[^.]{0,36}\b(doesn'?t care|ignores|keeps coming|comes closer|still coming|isn'?t fazed|not fazed|unimpressed|unbothered|doesn'?t notice|doesn'?t stop)\b/.test(t) ||
    /\b(doesn'?t seem to (?:work|help|care|notice|matter|stop)|not helping|not working|didn'?t work|doesn'?t work|isn'?t working|wasn'?t working)\b/.test(t)
  );
}

/** Stood is a try that is not written as a failure. Failed is any line that says the wolf was not stopped. */
export function wardEffort(text: string): WardEffort {
  if (!plain(text).trim()) return "none";
  if (effortFellShort(text)) return "failed";
  if (triedToWard(text)) return "stood";
  return "none";
}

/** Vicky and Izzy spray anyway. Ronnie stands down only for a stand that actually holds. */
export function girlWantsToSpray(girl: GirlId, effort: WardEffort) {
  if (girl === "ronnie") return effort !== "stood";
  return true;
}

export function wolfSprayKind(girl: GirlId): "defensive" | "angry" {
  return girl === "ronnie" ? "angry" : "defensive";
}

export interface SprayPlan {
  wanted: GirlId[];
  sprayers: GirlId[];
  blocked: GirlId[];
  held: GirlId[];
}

export function planWolfSpray(girls: readonly GirlId[], effort: WardEffort, dry: readonly GirlId[]): SprayPlan {
  const drySet = new Set(dry);
  const here = sceneOrder(girls);
  const wanted = here.filter((girl) => girlWantsToSpray(girl, effort));
  return {
    wanted,
    sprayers: wanted.filter((girl) => !drySet.has(girl)),
    blocked: wanted.filter((girl) => drySet.has(girl)),
    held: here.filter((girl) => !girlWantsToSpray(girl, effort)),
  };
}

export type Activity = "sitting" | "racing" | "walking" | "still";

export function activityContext(text: string): Activity {
  const t = text.toLowerCase();
  if (/\b(rac(?:e|es|ed|ing)|sprint(?:s|ed|ing)?|outrun)\b/.test(t)) return "racing";
  if (/\b(sits?|sitting|sat|bench|log)\b/.test(t)) return "sitting";
  if (/\b(walks?|walking|hikes?|hiking|strolls?|strolling|jogs?|jogging)\b/.test(t)) return "walking";
  return "still";
}

export interface EventLine {
  role: "narrator" | GirlId;
  text: string;
  expression?: Expression;
}

const APPROACH_FACE: Record<GirlId, Expression> = {
  izzy: "shy",
  victoria: "angry",
  ronnie: "scheming",
  mira: "suspicious",
};

const APPROACH_LINE: Record<GirlId, string> = {
  izzy: "Don't— don't move. It's looking at us. Stay with me. Please.",
  victoria: "Behind me. Now. I mean it.",
  ronnie: "Okay. Okay. I've got it. Don't you freeze on me.",
  mira: "Don't move. I'm already lifting my tail. Be faster than me if you have a better idea.",
};

export function approachScript(girls: readonly GirlId[], context: string): { lines: EventLine[]; expressions: Partial<Record<GirlId, Expression>> } {
  const here = sceneOrder(girls);
  const act = activityContext(context);
  const beat =
    act === "racing"
      ? "The race dies mid-stride."
      : act === "sitting"
        ? "Nobody stays on the ground."
        : act === "walking"
          ? "The walk stops under you."
          : context.trim()
            ? "Whatever you were in the middle of can wait."
            : "The pines go quiet in the wrong way.";
  const who =
    here.length > 1 ? "They see it before you do" : here.length === 1 ? `${girlName(here[0]!)} sees it before you do` : "You see it";
  const lines: EventLine[] = [
    {
      role: "narrator",
      text: `${beat} ${who}. A wolf has come up on the right, low in the brush, crouched, lips peeled, about to lunge.`,
    },
  ];
  const expressions: Partial<Record<GirlId, Expression>> = {};
  for (const girl of here) {
    expressions[girl] = APPROACH_FACE[girl];
    lines.push({ role: girl, text: APPROACH_LINE[girl], expression: APPROACH_FACE[girl] });
  }
  return { lines, expressions };
}

function sprayNarration(sprayers: readonly GirlId[], effort: WardEffort) {
  const who = sceneNames(sprayers);
  const verb = sprayers.length > 1 ? "move" : "moves";
  const shot = `${who} ${verb} first. Tails up, the spray hits the wolf across the face, the shoulders, the forelegs — and the edge of the cloud finds you too. It was not aimed at you. There was no time to aim.`;
  if (effort === "failed") return `You tried to turn it. The wolf does not care, and it is still coming. ${shot}`;
  if (effort === "stood") return `You hold your ground. It is not enough to keep every tail down. ${shot}`;
  return shot;
}

const SPRAY_LINE: Record<GirlId, string> = {
  izzy: "I'm sorry— I'm sorry, it was right there, I didn't see where it went—",
  victoria: "Down. I had to. I told you I would handle it.",
  ronnie: "Eat that, not us. …You're in it too. Wrong place. Whatever.",
  mira: "I told you I was moving. You were in the cloud. That's the timing. Don't make it my nature.",
};

const FAIL_LINE: Record<GirlId, string> = {
  izzy: "You tried. I saw you try. It kept coming and I couldn't not spray. I'm sorry.",
  victoria: "You did try. It was not enough. Down. I will finish this.",
  ronnie: "Credit for trying. It didn't care. Move.",
  mira: "You tried. It was still coming. I sprayed. Don't put that on me.",
};

const STOOD_LINE: Record<GirlId, string> = {
  izzy: "You stood there for us. I still sprayed. I was too scared not to. I'm so sorry.",
  victoria: "That was brave. I sprayed anyway. Next time you stay behind me.",
  ronnie: "You stepped up. I was gonna spray it. I let you.",
  mira: "You stood there. I still fired. I was not going to wait and find out.",
};

const HELD_LINE: Record<GirlId, string> = {
  izzy: "I didn't even see you move.",
  victoria: "Don't do that again. Get behind me next time.",
  ronnie: "You stepped up. I was gonna spray it. I let you.",
  mira: "You were faster. Fine. I didn't have to.",
};

const DRY_LINE: Record<GirlId, string> = {
  izzy: "Nothing's coming out. I can't— they're empty—",
  victoria: "Not now. The glands are dry. Stay behind me anyway.",
  ronnie: "I'd spray. I can't. Empty. Don't just stand there.",
  mira: "Nothing's coming out. Don't just stand there.",
};

export function effortThanks(effort: WardEffort) {
  if (effort === "stood") return { trust: 2, bonding: 2 };
  if (effort === "failed") return { trust: 1, bonding: 1 };
  return { trust: 0, bonding: 0 };
}

export function resolveLines(plan: SprayPlan, effort: WardEffort): EventLine[] {
  const lines: EventLine[] = [];
  const stood = effort === "stood";
  if (effort === "stood") {
    lines.push({ role: "narrator", text: "They saw you hold your ground. That lands harder than a try that failed." });
  } else if (effort === "failed") {
    lines.push({ role: "narrator", text: "They saw the try. It counts. Just not as much as if it had worked." });
  }
  if (plan.sprayers.length) {
    lines.push({ role: "narrator", text: sprayNarration(plan.sprayers, effort) });
    for (const girl of plan.sprayers) {
      const text = effort === "failed" ? FAIL_LINE[girl] : effort === "stood" ? STOOD_LINE[girl] : SPRAY_LINE[girl];
      lines.push({ role: girl, text, expression: "spray" });
    }
    for (const girl of plan.held) lines.push({ role: girl, text: HELD_LINE[girl], expression: APPROACH_FACE[girl] });
    for (const girl of plan.blocked) lines.push({ role: girl, text: DRY_LINE[girl], expression: APPROACH_FACE[girl] });
    return lines;
  }
  if (plan.blocked.length && !stood) {
    lines.push({
      role: "narrator",
      text: "Tails come up and the spray doesn't. The wolf doesn't know the glands are dry. It sees the stance, hates the odds, and bolts into the pines.",
    });
  } else if (plan.blocked.length && stood) {
    lines.push({
      role: "narrator",
      text: "You put yourself in front of the teeth. The tails come up behind you and nothing comes out — and it doesn't matter. The wolf peels off into the brush.",
    });
  } else {
    lines.push({
      role: "narrator",
      text: "You put yourself between them and the teeth. The wolf holds the crouch, then thinks better of it, and slides back into the pines. Nobody has to spray.",
    });
  }
  for (const girl of plan.held) lines.push({ role: girl, text: HELD_LINE[girl], expression: APPROACH_FACE[girl] });
  for (const girl of plan.blocked) lines.push({ role: girl, text: DRY_LINE[girl], expression: "shy" });
  return lines;
}

export interface SkunkReaction {
  trustDelta: number;
  bondingDelta: number;
  expression: Expression;
  line: string;
  /** Izzy, warm, invites them to the dorm. She is not planning to wash the spray off. */
  invite: boolean;
  /** Warm Vicky or Ronnie threatens a dominant spray and waits for the next line. */
  dare: boolean;
}

const CHOICE_ACT: Record<SkunkChoice, string> = {
  disgusted: "*recoils from the smell*",
  understanding: "*takes it in stride*",
  aroused: "*doesn't exactly mind*",
};

export function choiceAct(choice: SkunkChoice) {
  return CHOICE_ACT[choice];
}

export function skunkReaction(
  girl: GirlId,
  choice: SkunkChoice,
  trust: number,
  bonding: number,
  gender: "male" | "female" = "male",
): SkunkReaction {
  const warm = metersWarm(trust, bonding);
  if (choice === "disgusted") {
    if (girl === "ronnie") {
      return {
        trustDelta: 0,
        bondingDelta: 0,
        expression: "laughing",
        line: "You smell awful. Suck it up, buttercup. Skunked beats eaten. Shit happens.",
        invite: false,
        dare: false,
      };
    }
    if (girl === "victoria") {
      return {
        trustDelta: -5,
        bondingDelta: -5,
        expression: "angry",
        line: "I am sorry you caught it. I am not sorry the wolf is gone. Don't look at me like I did something filthy by saving you.",
        invite: false,
        dare: false,
      };
    }
    return {
      trustDelta: -5,
      bondingDelta: -5,
      expression: "embarrassed",
      line: "I know. I know. I'm sorry. I wasn't aiming at you. I was scared.",
      invite: false,
      dare: false,
    };
  }
  if (choice === "understanding") {
    if (girl === "ronnie") {
      return {
        trustDelta: 5,
        bondingDelta: 5,
        expression: "laughing",
        line: "You smell like a chemical fire and you're being cool about it. Fine. I appreciate that. Still nasty, though.",
        invite: false,
        dare: false,
      };
    }
    if (girl === "victoria") {
      return {
        trustDelta: 10,
        bondingDelta: 10,
        expression: "shy",
        line: "I hit you. I'm sorry. The wolf left, and that part I'm proud of. I'll make it up to you.",
        invite: false,
        dare: false,
      };
    }
    return {
      trustDelta: 10,
      bondingDelta: 10,
      expression: "embarrassed",
      line: "Thank you. I was so scared I didn't even see where it went. I'm really, really sorry.",
      invite: false,
      dare: false,
    };
  }
  if (girl === "izzy") {
    if (!warm) {
      return {
        trustDelta: -3,
        bondingDelta: -3,
        expression: "shy",
        line: "Please don't. I didn't do that for… that. Can we just pretend you didn't say it? I already feel awful.",
        invite: false,
        dare: false,
      };
    }
    return {
      trustDelta: 10,
      bondingDelta: 10,
      expression: "flirty",
      line: "You stink. Both of us do. Come back to my dorm and get washed up. …I'm not actually thinking about soap.",
      invite: true,
      dare: false,
    };
  }
  if (girl === "victoria") {
    if (!warm) {
      return {
        trustDelta: -5,
        bondingDelta: -5,
        expression: "suspicious",
        line: "You're saying that now? After I just sprayed you on accident? I don't believe you. …It would be a hard thing to fake. I'm not playing along. Not yet.",
        invite: false,
        dare: false,
      };
    }
    return {
      trustDelta: 10,
      bondingDelta: 10,
      expression: "flirty",
      line: vickyTease(gender),
      invite: false,
      dare: true,
    };
  }
  if (!warm) {
    return {
      trustDelta: 2,
      bondingDelta: 2,
      expression: "laughing",
      line: "Oh my god. The wolf almost ate you and now you're into it? You smell rank. I did that. You're welcome, weirdo. Adrenaline's a hell of a drug.",
      invite: false,
      dare: false,
    };
  }
  return {
    trustDelta: 0,
    bondingDelta: 0,
    expression: "scheming",
    line: "You actually like this. You reek, and you're looking at me like that. Weird. I could give you a real one. Dominant. On purpose. Beg me not to, if you're bluffing.",
    invite: false,
    dare: true,
  };
}

export function dareBegSpoken(girl: GirlId, gender: "male" | "female" = "male") {
  if (girl === "victoria") {
    const kid = gender === "female" ? "girl" : "boy";
    return `Good ${kid}. You came to your senses. It is very sweet that you acted aroused by my spray. I know it is far too potent to ever have that effect on anyone. Come home. I will clean you up.`;
  }
  return "Fine. You flinched. I won't waste a spray on a bluff.";
}

export function dareBegNarration(girl: GirlId) {
  if (girl === "victoria") {
    return "Victoria's voice goes soft, the way it does when she has already decided to take care of someone. The tail settles. She is not going to spray.";
  }
  return "Ronnie laughs, short and mean, and lets her tail drop.";
}

export function dareBegFace(girl: GirlId): Expression {
  return girl === "victoria" ? "flirty" : "laughing";
}

export function dareGoNarration(girls: readonly GirlId[]) {
  if (girls.length > 1) return "Neither of them was bluffing.";
  if (girls[0] === "victoria") return "The tease drops out of her voice. She was not bluffing.";
  return "She wasn't bluffing.";
}

function vickyTease(gender: "male" | "female") {
  const kid = gender === "female" ? "girl" : "boy";
  return `It is not proper to be into skunk spray. You are a dirty ${kid}. Mommy's spray is for keeping you safe, not for pleasing you. Keep behaving so naughtily and I will show you what a real spray looks like.`;
}

export function publicBlob(turn: { say?: string; action?: string; beats?: { text: string; kind?: string }[] }) {
  if (turn.beats?.length) {
    return turn.beats
      .filter((beat) => beat.kind !== "think")
      .map((beat) => beat.text)
      .join(" ");
  }
  return [turn.say, turn.action].filter(Boolean).join(" ");
}

const ACCIDENT_LINE: Record<GirlId, { narration: string; dialogue: string }> = {
  izzy: {
    narration:
      "Her tail snaps up before she means it to. A defensive jet breaks, thick and chemical, and the cloud finds you. She was not aiming at you.",
    dialogue: "I'm sorry— I'm sorry, I didn't mean to, I didn't see where it went—",
  },
  victoria: {
    narration:
      "She startles. Both hands yank the skirt, the tail goes up, and a defensive jet hits the air between you. The edge of it catches you. She was not aiming at you.",
    dialogue: "That was not for you. I didn't have time to aim. I'm sorry.",
  },
  ronnie: {
    narration:
      "Her tail comes up on a flinch. The spray breaks hot and chemical and you are standing in it. She was not aiming at you.",
    dialogue: "Wrong place. I wasn't aiming at you. You still caught it.",
  },
  mira: {
    narration:
      "She flinches and the tail is already up. A defensive jet breaks, and the edge of it finds you. She was not aiming at you. She will not look embarrassed about it.",
    dialogue: "That was a flinch. You were in the way. Don't hold my nature against me.",
  },
};

export function accidentSprayScript(girl: GirlId) {
  return ACCIDENT_LINE[girl];
}
