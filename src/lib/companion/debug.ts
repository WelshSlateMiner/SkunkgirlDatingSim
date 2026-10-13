import { DEBUG_FART_CLIPS } from "./audio";
import { asLocationId } from "./locations";
import type { Expression, GirlId, LocationId, OutfitId, SprayKind } from "./types";

export const OUTFIT_CYCLE: OutfitId[] = [
  "casual",
  "lounge",
  "campus",
  "work",
  "dress",
  "sleep",
  "lingerie",
  "asuka",
  "mymy",
];

export interface DebugPose {
  expression: Expression;
  sprayKind: SprayKind;
  label: string;
}

const SPRAY_POSES: DebugPose[] = [
  { expression: "spray", sprayKind: "angry", label: "Spray · angry" },
  { expression: "spray", sprayKind: "consensual", label: "Spray · intimate" },
  { expression: "spray", sprayKind: "defensive", label: "Spray · defensive" },
  { expression: "spray", sprayKind: "dominant", label: "Spray · dominant" },
];

const CASUAL_POSES: DebugPose[] = [
  { expression: "embarrassed", sprayKind: "none", label: "Embarrassed" },
  { expression: "happy", sprayKind: "none", label: "Happy" },
  { expression: "idle", sprayKind: "none", label: "Idle" },
  { expression: "flirty", sprayKind: "none", label: "Flirty" },
  { expression: "laughing", sprayKind: "none", label: "Laughing" },
  { expression: "suspicious", sprayKind: "none", label: "Suspicious" },
  { expression: "shy", sprayKind: "none", label: "Shy" },
  { expression: "angry", sprayKind: "none", label: "Angry" },
  { expression: "infodump", sprayKind: "none", label: "Infodump" },
  { expression: "aroused", sprayKind: "none", label: "Aroused" },
  { expression: "thinking", sprayKind: "none", label: "Thinking" },
  { expression: "scheming", sprayKind: "none", label: "Scheming" },
  ...SPRAY_POSES,
];

export function posesFor(outfit: OutfitId, girl: GirlId = "izzy"): DebugPose[] {
  if (girl === "victoria") return CASUAL_POSES;
  if (outfit === "asuka" || outfit === "mymy") {
    return [
      { expression: "happy", sprayKind: "none", label: "Idle" },
      { expression: "flirty", sprayKind: "none", label: "Looking back" },
      ...SPRAY_POSES,
    ];
  }
  return CASUAL_POSES;
}

export type DebugCommand =
  | { kind: "travel"; location: LocationId | null }
  | { kind: "cycle_outfit" }
  | { kind: "cycle_fart" }
  | { kind: "cycle_pose" }
  | { kind: "spray_angry" }
  | { kind: "spray_intimate" }
  | { kind: "defensive_spray" }
  | { kind: "dominant_spray" }
  | { kind: "set_trust"; value: number }
  | { kind: "set_bonding"; value: number }
  | { kind: "character_change" }
  | { kind: "character_add" };

const CMD =
  /^\/(travel|cycle_outfit|cycle_fart|cycle_pose|spray_angry|spray_intimate|defensive_spray|dominant_spray|set_trust|set_bonding|character_change|character_add)\b/i;

export function parseDebugName(raw: string): { debug: boolean; name: string } {
  const t = raw.trim();
  if (!/^\/debug\b/i.test(t)) return { debug: false, name: t };
  const rest = t.replace(/^\/debug\s*/i, "").trim();
  return { debug: true, name: rest || "You" };
}

export function parseDebugCommand(say: string, invite?: LocationId | null): DebugCommand | null {
  const text = say.trim();
  const m = text.match(CMD);
  if (!m) return null;
  const verb = m[1]!.toLowerCase();
  if (verb === "travel") return { kind: "travel", location: invite ?? asLocationId(text.slice(m[0].length)) };
  if (verb === "set_trust") {
    const n = Number.parseInt(text.slice(m[0].length).trim(), 10);
    if (!Number.isFinite(n)) return null;
    return { kind: "set_trust", value: n };
  }
  if (verb === "set_bonding") {
    const n = Number.parseInt(text.slice(m[0].length).trim(), 10);
    if (!Number.isFinite(n)) return null;
    return { kind: "set_bonding", value: n };
  }
  return { kind: verb as Exclude<DebugCommand["kind"], "travel" | "set_trust" | "set_bonding"> };
}

export function nextIndex(current: number, length: number) {
  if (length <= 0) return 0;
  return (current + 1) % length;
}

export const FART_COUNT = DEBUG_FART_CLIPS.length;

export const DEBUG_TIPS = [
  "/travel @(Casa Luna)",
  "/cycle_outfit",
  "/cycle_pose",
  "/cycle_fart",
  "/spray_angry",
  "/spray_intimate",
  "/defensive_spray",
  "/dominant_spray",
  "/set_trust 50",
  "/set_bonding 50",
  "/character_change",
  "/character_add",
];
