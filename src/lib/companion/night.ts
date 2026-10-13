import { herHome } from "./cast";
import { openTonight, placeOf } from "./locations";
import type { Expression, GirlId, LocationId } from "./types";

export type NightBend = "invite" | "continue" | "goodnight";

/** Same choice for both of them. The words are not. */
export function nightBend(trust: number, bonding: number, official: boolean, intimate: boolean): NightBend {
  if (official || (trust >= 40 && bonding >= 35)) return "invite";
  if (intimate && trust >= 20) return "invite";
  if (intimate) return "continue";
  if ((trust >= 18 && bonding >= 12) || trust + bonding >= 40) return "continue";
  return "goodnight";
}

const LINES: Record<GirlId, Record<NightBend, { text: string; expression: Expression }>> = {
  izzy: {
    invite: {
      expression: "flirty",
      text: "They're locking up. I'm not done with you. My dorm, or your apartment. Come with me.",
    },
    continue: {
      expression: "happy",
      text: "They're closing. Quad's still open. Trail too, and the movie house. Invite me if you've got somewhere. I'm not ready to call it.",
    },
    goodnight: {
      expression: "shy",
      text: "They're closing, and I should head back. Good night.",
    },
  },
  victoria: {
    invite: {
      expression: "flirty",
      text: "They're closing. I'm not ending the night on a sidewalk. My house, or your apartment. I'm asking.",
    },
    continue: {
      expression: "thinking",
      text: "This place is closing. The quad is still open, and so are the trail and the theater. Invite me if you have somewhere in mind. I can keep walking.",
    },
    goodnight: {
      expression: "shy",
      text: "They're closing. I'm going home. Good night.",
    },
  },
};

export interface NightSpeaker {
  girl: GirlId;
  trust: number;
  bonding: number;
  official: boolean;
}

export interface NightClose {
  narrator: string;
  spoken: { girl: GirlId; text: string; expression: Expression }[];
  left: GirlId[];
  staying: GirlId[];
  inviteGirl: GirlId | null;
  inviteHome: LocationId | null;
  showPlaces: boolean;
}

export function nightClose(args: {
  location: LocationId;
  present: GirlId[];
  focus: GirlId;
  intimate: boolean;
  girls: NightSpeaker[];
}): NightClose | null {
  if (openTonight(args.location, "Night")) return null;
  const place = placeOf(args.location).name;
  if (!args.present.length) {
    return {
      narrator: `${place} is closed for the night. Pick somewhere that is still open.`,
      spoken: [],
      left: [],
      staying: [],
      inviteGirl: null,
      inviteHome: null,
      showPlaces: true,
    };
  }
  const byId = new Map(args.girls.map((girl) => [girl.girl, girl]));
  const order = args.present.includes(args.focus)
    ? [args.focus, ...args.present.filter((id) => id !== args.focus)]
    : [...args.present];
  const spoken: NightClose["spoken"] = [];
  const left: GirlId[] = [];
  let inviteGirl: GirlId | null = null;
  for (const girl of order) {
    const meter = byId.get(girl) ?? { girl, trust: 0, bonding: 0, official: false };
    const bend = nightBend(meter.trust, meter.bonding, meter.official, args.intimate);
    const line = LINES[girl][bend];
    spoken.push({ girl, text: line.text, expression: line.expression });
    if (bend === "goodnight") left.push(girl);
    else if (bend === "invite" && inviteGirl == null) inviteGirl = girl;
  }
  const staying = args.present.filter((id) => !left.includes(id));
  const focusStays = staying.includes(args.focus);
  if (inviteGirl && !staying.includes(inviteGirl)) inviteGirl = null;
  if (inviteGirl && focusStays && inviteGirl !== args.focus) inviteGirl = null;
  return {
    narrator: staying.length
      ? `${place} is closing for the night.`
      : `${place} is closed for the night. You're on your own. Pick somewhere still open.`,
    spoken,
    left,
    staying,
    inviteGirl,
    inviteHome: inviteGirl ? herHome(inviteGirl) : null,
    showPlaces: staying.length === 0,
  };
}
