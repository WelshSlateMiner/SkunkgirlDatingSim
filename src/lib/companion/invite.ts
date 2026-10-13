import { asLocationId, openTonight, placeOf } from "./locations";
import { isCouple } from "./time";
import { cardCouple, ownsHome } from "./cast";
import type { GameState, LocationId } from "./types";

export type InviteTone = "eager" | "casual" | "polite-no" | "stern-no" | "here";

export function inviteVerdict(
  state: Pick<GameState, "trust" | "bonding" | "flags" | "bond" | "location" | "timeOfDay" | "focus" | "roster" | "present">,
  destId: LocationId,
): InviteTone {
  const here = asLocationId(state.location);
  const destKey = asLocationId(destId);
  if (!destKey) return "stern-no";
  if (state.timeOfDay === "Night" && !openTonight(destKey)) return "stern-no";
  if (destKey === here) return "here";
  const dest = placeOf(destKey);

  const { trust, bonding, flags, bond } = state;
  const romantic = isCouple(state);
  const owner = ownsHome(destKey);
  if (owner) {
    const card = state.roster?.[owner];
    const withHer = card ? cardCouple(card) : owner === (state.focus ?? "izzy") && romantic;
    const sheIsHere = (state.present ?? []).includes(owner) || state.focus === owner;
    if (!withHer || !sheIsHere) return trust < 18 || bonding < 12 ? "stern-no" : "polite-no";
    if (state.timeOfDay === "Night") return "eager";
  }
  if (destKey === "apartment" && !romantic) {
    return trust < 18 || bonding < 12 ? "stern-no" : "polite-no";
  }
  if (romantic && state.timeOfDay === "Night" && destKey === "apartment") {
    return "eager";
  }
  const canPrivate =
    !dest.inviteOnly ||
    flags.invitedDorm ||
    romantic ||
    (trust >= 55 && bonding >= 48);

  if (dest.inviteOnly && !canPrivate) {
    return trust < 18 || bonding < 12 ? "stern-no" : "polite-no";
  }

  if (trust < dest.minTrust - 10 || bonding < Math.max(4, dest.minTrust * 0.25)) {
    return trust < 12 ? "stern-no" : "polite-no";
  }

  if (trust < dest.minTrust) {
    if (bonding >= dest.minTrust + 15 && trust >= dest.minTrust - 8) return "casual";
    return "polite-no";
  }

  if (bonding < 16 && dest.minTrust >= 22) return "polite-no";
  if (trust >= dest.minTrust + 18 && bonding >= 48) return "eager";
  return "casual";
}

export function inviteAccepted(tone: InviteTone) {
  return tone === "eager" || tone === "casual";
}

export function scoreInviteReply(say: string, action: string, yes: boolean) {
  const text = `${say} ${action}`.trim();
  const explained = text.length > 24 || /\bbecause\b|\bwanna\b|\bwant to\b|\blove\b|\blike\b|\binto\b/.test(text.toLowerCase());
  if (yes) return explained ? 8 : 3;
  if (/rude|whatever|shut|gross|no way/.test(text.toLowerCase())) return -5;
  return explained ? 1 : 0;
}

export function isYes(text: string) {
  return /\b(yes|yeah|yep|sure|ok|okay|alright|down|let'?s|i'?d love|i would|of course|absolutely|please)\b/i.test(
    text,
  );
}

export function isNo(text: string) {
  return /\b(no|nah|nope|not now|maybe later|can'?t|don'?t want|pass)\b/i.test(text);
}
