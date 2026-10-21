import type { GameState, GirlId, IzzyTurn, SprayKind, TurnInput } from "./types";
import { asksForScentNow, intimacyAllowed, scentRelentless, sexualBeat, showedScentInterest } from "./intimacy";

export type SprayPhase = "none" | "windup" | "burst";

export interface SprayEvent {
  kind: SprayKind;
  phase: SprayPhase;
}

const HARD_STOP =
  /\b(safeword|\bred\b|ooc\b|for real|actually stop|stop for real|i mean it, stop)\b/i;

const ATTACK =
  /\b(kill|punch|choke|stab|beat you|attack you|hurt you|weapon|hit you|slap you|i('m| am) going to (kill|hurt|hit))\b/i;

const SCARE =
  /\b(boo+|jumpscare|jump-?scare|snuck up|sneak up|lunge|loom|scare you|gotcha|jump at)\b/i;

const CONTACT =
  /\b(grab(?:s|bed|bing)?|punch(?:es|ed)?|hit(?:s|ting)?|slap(?:s|ped)?|choke(?:s|d)?|stab(?:s|bed)?|shove(?:s|d)?|kick(?:s|ed)?|tackle(?:s|d)?)\b/i;

const CALM =
  /\b(sorry|mean no harm|no harm|won'?t hurt|will not hurt|not going to hurt|hands? (up|off)|backing (off|away)|i'?m not a threat|just (kidding|talking)|didn'?t mean|no sudden|i (stop|stopped|freeze)|easy,|easy\b|i yield|i surrender)\b/i;

export function threatKind(hay: string): "attack" | "scare" | null {
  if (ATTACK.test(hay)) return "attack";
  if (SCARE.test(hay)) return "scare";
  return null;
}

export function madeContact(hay: string) {
  return CONTACT.test(hay) && (ATTACK.test(hay) || SCARE.test(hay) || /\b(her|izzy)\b/i.test(hay));
}

export function talkedDown(hay: string) {
  return CALM.test(hay) && !madeContact(hay) && !ATTACK.test(hay);
}

export function pressingThreat(hay: string) {
  return madeContact(hay) || ATTACK.test(hay) || /\b(lunge|step closer|come closer|don'?t stop|do it anyway|grab her|i grab)\b/i.test(hay);
}

const PLAY_TOUCH =
  /\b(pat+|patted|patting|spank|spanked|smack|smacked|slap|slapped|grab|grabbed|squeeze|squeezed|grope|groped)\b/i;

const ASS =
  /\b(ass|butt|cheek|thigh|hip|rear)\b/i;

const INTIMATE =
  /\b(kiss|sex|bed|make love|intimate|undress|want you|mark me|inside|fuck|breed|dom|kneel|good (boy|girl)|hold still|brace)\b/i;

const SPRAY_WORD = /\bspray\b/i;

const PREPARE =
  /\b(do it|yes|yeah|please|brace|hold still|i('m| am) ready|go ahead|mark me|don'?t stop|stay|wait|oh god|please don'?t|no—|no\.\.\.|mercy|whimper)\b/i;

export function lastThreeNegative(state: GameState) {
  const turns = state.messages.filter((m) => m.role === "izzy").slice(-3);
  return turns.some((m) => (m.trustDelta ?? 0) < 0 || (m.bondingDelta ?? 0) < 0);
}

export function angrySprayAllowed(state: GameState) {
  if (state.trust > 0 && state.bonding > 0 && !lastThreeNegative(state)) return false;
  return true;
}

export function intimateContext(state: GameState, input: TurnInput) {
  const hay = `${input.say} ${input.action}`;
  const romantic = state.flags.romanceAccepted || state.bond === "romantic";
  return (
    romantic ||
    state.pendingIntimateSpray ||
    (state.trust >= 75 && state.bonding >= 75 && INTIMATE.test(hay)) ||
    (state.location === "dorm" && romantic)
  );
}

export function isCncPlay(state: GameState, input: TurnInput) {
  const hay = `${input.say} ${input.action}`;
  if (HARD_STOP.test(hay)) return false;
  if (!intimateContext(state, input)) return false;
  return /don'?t|please don'?t|no+|stop|mercy|wait|you wouldn'?t/.test(hay.toLowerCase());
}

export function impactPlay(state: GameState, hay: string) {
  if (!PLAY_TOUCH.test(hay) || !ASS.test(hay)) return false;
  if (intimateContext(state, { say: hay, action: "" })) return true;
  return state.trust >= 40 && state.bonding >= 40 && !lastThreeNegative(state);
}

export function dominantSprayMode(state: GameState, turn: IzzyTurn) {
  if (state.flags.sprayYield === "submit") return false;
  if (glandsDry(state)) return false;
  if (state.flags.sprayYield === "resist") return true;
  if (turn.sprayKind === "dominant") return true;
  return state.playerFartRole === "not";
}

export function playerPrepared(input: TurnInput) {
  const hay = `${input.say} ${input.action}`;
  if (HARD_STOP.test(hay)) return false;
  return PREPARE.test(hay) || SPRAY_WORD.test(hay) || hay.trim().length === 0;
}

export function defensiveSprayCopy(threat: "attack" | "scare" | "none") {
  if (threat === "attack") {
    return {
      narration:
        "She doesn't wait. She shoves her bottoms down around her thighs, tail high, and fires a hot chemical jet. She sprayed because you put hands on her.",
      dialogue:
        "I sprayed you. Bottoms down, tail up, the whole jet — because you grabbed me. That's why. Stay back.",
    };
  }
  if (threat === "scare") {
    return {
      narration:
        "She already told you to stop. She drops her bottoms, tail straight up, and sprays a defensive burst anyway. She did it because she still thought you were a threat.",
      dialogue:
        "I warned you. You kept coming, so I sprayed. Bottoms down, tail high. That's how, and that's why.",
    };
  }
  return {
    narration:
      "Her ears pin. She yanks her bottoms down, tail high, and a defensive spray hits like a wall. She did it because she thought you were a threat.",
    dialogue:
      "I sprayed you. Tail up, bottoms down, a full defensive burst. I did it because I thought you were going to hurt me.",
  };
}

export function resolveSprayEvent(
  state: GameState,
  input: TurnInput,
  turn: IzzyTurn,
  opts?: { reroll?: boolean },
): SprayEvent {
  const hay = `${input.say} ${input.action}`;
  const close = intimateContext(state, input);
  const modelBurst = Boolean(
    turn.sprayed || turn.fx === "spray" || (turn.expression === "spray" && !turn.pendingIntimateSpray),
  );
  const modelWindup = Boolean(turn.pendingIntimateSpray);
  const angryOk = angrySprayAllowed(state);
  const dry = glandsDry(state);
  const play = impactPlay(state, hay);
  const harm = (ATTACK.test(hay) || SCARE.test(hay)) && !play;
  const explicitDefensive =
    turn.sprayKind === "defensive" &&
    (Boolean(turn.sprayed) || turn.fx === "spray" || turn.expression === "spray");

  // A reroll may walk back a misfired spray. Only a new reply that actually
  // sprays or warns is honored — keyword matches do not force it again.
  if (opts?.reroll) {
    if (explicitDefensive && !play) return { kind: "defensive", phase: "burst" };
    if (turn.sprayKind === "defensive" && !play) return { kind: "defensive", phase: "windup" };
  } else if (state.pendingDefensive) {
    if (talkedDown(hay) && !pressingThreat(hay) && !explicitDefensive) {
      return { kind: "none", phase: "none" };
    }
    if (pressingThreat(hay) || harm || madeContact(hay) || explicitDefensive) {
      return { kind: "defensive", phase: "burst" };
    }
    return { kind: "none", phase: "none" };
  } else if (harm || (explicitDefensive && !play)) {
    if (madeContact(hay) || explicitDefensive || (state.pendingDefensive && pressingThreat(hay))) {
      return { kind: "defensive", phase: "burst" };
    }
    return { kind: "defensive", phase: "windup" };
  }

  const intimateBurst = modelBurst && turn.sprayKind !== "defensive" && turn.sprayKind !== "angry";

  if (!dry && state.pendingIntimateSpray && playerPrepared(input) && !HARD_STOP.test(hay)) {
    return { kind: "consensual", phase: "burst" };
  }

  if (!dry && close && SPRAY_WORD.test(hay) && !HARD_STOP.test(hay) && turn.sprayKind !== "defensive") {
    return { kind: "consensual", phase: "burst" };
  }

  if (!dry && close && (turn.sprayKind === "consensual" || intimateBurst || SPRAY_WORD.test(hay) || isCncPlay(state, input)) && turn.sprayKind !== "defensive") {
    if (modelWindup && !intimateBurst) return { kind: "consensual", phase: "windup" };
    if (intimateBurst || turn.sprayKind === "consensual" || SPRAY_WORD.test(hay) || isCncPlay(state, input)) {
      if (turn.pendingIntimateSpray && !intimateBurst) return { kind: "consensual", phase: "windup" };
      if (intimateBurst || turn.sprayKind === "consensual") return { kind: "consensual", phase: "burst" };
    }
  }

  if (!dry && turn.sprayKind === "consensual" && (intimateBurst || modelWindup)) {
    return { kind: "consensual", phase: intimateBurst ? "burst" : "windup" };
  }

  if (!dry && modelWindup && (close || (state.trust >= 75 && state.bonding >= 75))) {
    return { kind: "consensual", phase: "windup" };
  }

  if (!dry && intimateBurst && close) return { kind: "consensual", phase: "burst" };

  const wantAngry = turn.sprayKind === "angry" || (modelBurst && !close && turn.sprayKind !== "defensive");

  if (wantAngry && !close) {
    if (!angryOk) return { kind: "none", phase: "none" };
    if (turn.sprayKind === "angry" || modelBurst) {
      return { kind: "angry", phase: "burst" };
    }
  }

  if (modelBurst && angryOk && !close && turn.sprayKind !== "defensive") return { kind: "angry", phase: "burst" };

  return { kind: "none", phase: "none" };
}

export const GLAND_MAX: Record<GirlId, number> = {
  izzy: 35,
  victoria: 40,
  ronnie: 30,
  mira: 25,
};

/** A spray spends 1, 2, or 3. Stink added is ten points per point spent. */
export function clampSprayLevel(level: unknown): 1 | 2 | 3 {
  const n = typeof level === "number" ? Math.round(level) : 1;
  if (n >= 3) return 3;
  if (n === 2) return 2;
  return 1;
}

export function stinkForSpray(level: number) {
  return clampSprayLevel(level) * 10;
}

export interface GlandTank {
  glandCap: number;
  glandShots: number;
  turnsSinceIntimateSpray: number;
  glandDry: number;
}

function glandNum(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? Math.max(0, Math.round(value)) : 0;
}

export function readTank(raw: Partial<GlandTank> | null | undefined): GlandTank {
  return {
    glandCap: glandNum(raw?.glandCap),
    glandShots: glandNum(raw?.glandShots),
    turnsSinceIntimateSpray: glandNum(raw?.turnsSinceIntimateSpray),
    glandDry: glandNum(raw?.glandDry),
  };
}

/** One fired spray. Level 1–3, clamped to whatever capacity she has left. */
export function spendTank(
  tank: GlandTank,
  girl: GirlId,
  level: unknown = 1,
): { tank: GlandTank; emptied: boolean; spent: 0 | 1 | 2 | 3 } {
  if (tank.glandDry > 0) return { tank, emptied: true, spent: 0 };
  let cap = tank.glandCap;
  let shots = tank.glandShots;
  const max = GLAND_MAX[girl];
  if (cap <= 0) {
    cap = max;
    shots = 0;
  } else if (cap !== max) {
    cap = max;
    shots = Math.min(shots, max);
  }
  const left = cap - shots;
  if (left <= 0) {
    return {
      tank: { glandCap: 0, glandShots: 0, turnsSinceIntimateSpray: 0, glandDry: 12 },
      emptied: true,
      spent: 0,
    };
  }
  const spent = Math.min(clampSprayLevel(level), left) as 1 | 2 | 3;
  shots += spent;
  if (shots >= cap) {
    return {
      tank: { glandCap: 0, glandShots: 0, turnsSinceIntimateSpray: 0, glandDry: 12 },
      emptied: true,
      spent,
    };
  }
  return {
    tank: { glandCap: cap, glandShots: shots, turnsSinceIntimateSpray: 0, glandDry: 0 },
    emptied: false,
    spent,
  };
}

/** She sprayed last turn and has not yet given a non-spray reply. */
export function onSprayCooldown(tank: GlandTank) {
  return tank.glandDry === 0 && tank.glandCap > 0 && tank.glandShots > 0 && tank.turnsSinceIntimateSpray === 0;
}

const PREP: Record<GirlId, [string, string]> = {
  izzy: [
    "Not yet. I want the last one to sit on you. I'm watching what it does.",
    "Hold on. I'm excited, but I'm letting that one sink in first. I want to see your face before I do it again.",
  ],
  victoria: [
    "Not this second. I'm setting the glands for a bigger one. I want to see how much of mommy's stink you can actually take.",
    "Wait. The next one will be heavier. I'm preparing it. We'll see how much of mommy's stink you can handle.",
  ],
  ronnie: [
    "Already? You fucking stink. You sure? There's so much more where that came from.",
    "You want another one right now? You already fucking stink. Say you're sure. There's a lot more.",
  ],
  mira: [
    "Already? I'm not ready this second. If you're sure, I'll get another one ready. I like that you want what I can do.",
    "Give me a turn. I'm a little shy about firing again this fast. If you mean it, I'll prepare another. I like being wanted for this.",
  ],
};

const GAP: Record<GirlId, [string, string]> = {
  izzy: [
    "Between classes. I had a gap, and my feet came this way. I'll be back before they take attendance. Probably.",
    "Class is still on. I'm just not in the room this minute. Between classes. Don't make it a thing.",
  ],
  victoria: [
    "I don't have a class. This is my morning.",
    "No lecture. I left school a long time ago.",
  ],
  ronnie: [
    "Between classes. I've got the next block. This is just the gap. I wasn't going to sit in a hallway.",
    "Yeah, I have class. I'm between them. I'll make it. I don't do late.",
  ],
  mira: [
    "Between classes. The next one hasn't started. I'm not skipping. I'm using the gap.",
    "Class is this morning. This is the space between. I'll be there when it starts.",
  ],
};

function pickPair(lines: [string, string], salt: number) {
  return lines[Math.abs(salt) % 2] ?? lines[0];
}

export function preparingCopy(girl: GirlId, salt: number) {
  return {
    narration: "Her tail stays down. The last spray is still in the air, and she is not ready to fire again.",
    dialogue: pickPair(PREP[girl], salt),
    expression: girl === "mira" ? ("shy" as const) : girl === "victoria" ? ("scheming" as const) : ("flirty" as const),
  };
}

export function betweenClassCopy(girl: GirlId, salt: number) {
  return {
    narration: "She answers the question and does not make a speech out of it.",
    dialogue: pickPair(GAP[girl], salt),
    expression: "thinking" as const,
  };
}

/** She did not spray. Dry counts down. Capacity stays until it is actually spent. */
export function restTank(tank: GlandTank): GlandTank {
  if (tank.glandDry > 0) {
    const glandDry = tank.glandDry - 1;
    if (glandDry === 0) return { glandCap: 0, glandShots: 0, turnsSinceIntimateSpray: 1, glandDry: 0 };
    return { ...tank, glandDry };
  }
  return { ...tank, turnsSinceIntimateSpray: tank.turnsSinceIntimateSpray + 1 };
}

/** Model sprays are already spent. Extra shots are scripted sprays this same turn. Everyone else rests. */
export function finishTanks(
  tanks: Record<GirlId, GlandTank>,
  already: Record<GirlId, boolean>,
  extra: Record<GirlId, number>,
): { tanks: Record<GirlId, GlandTank>; emptied: GirlId[] } {
  const emptied: GirlId[] = [];
  const next: Record<GirlId, GlandTank> = { ...tanks };
  for (const girl of Object.keys(next) as GirlId[]) {
    let tank = next[girl];
    const more = extra[girl] ?? 0;
    for (let i = 0; i < more; i++) {
      if (tank.glandDry > 0) break;
      const spent = spendTank(tank, girl, 1);
      tank = spent.tank;
      if (spent.emptied) emptied.push(girl);
    }
    if (!already[girl] && more <= 0) tank = restTank(tank);
    next[girl] = tank;
  }
  return { tanks: next, emptied };
}

export function glandsDry(state: GameState) {
  return (state.glandDry ?? 0) > 0;
}

export function shouldInitiateIntimate(state: GameState, input: TurnInput) {
  const text = `${input.say} ${input.action}`;
  if ((state.scentHold ?? 0) > 0 && !asksForScentNow(text) && !scentRelentless(state, input)) return false;
  if (glandsDry(state)) return false;
  if (state.pendingIntimateSpray) return false;
  if (state.flags.intimateScene) return false;
  const scent =
    state.flags.scentInterest ||
    showedScentInterest(text) ||
    state.flags.fartConverted ||
    state.flags.sprayYield !== "none";
  if (!intimacyAllowed({ ...state, flags: { ...state.flags, scentInterest: scent } })) return false;
  return sexualBeat(text) || /\bspray\b/i.test(text);
}
