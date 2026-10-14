import type { Expression } from "./types";

/** Dormant art map. Bio is in ronnie-bio.ts. Do not import this into the roster. */
export const RONNIE_ACTIVE = false;

const EXPRESSIONS: Expression[] = [
  "embarrassed",
  "happy",
  "idle",
  "flirty",
  "laughing",
  "suspicious",
  "shy",
  "angry",
  "infodump",
  "aroused",
  "thinking",
  "scheming",
];

function set(folder: "casual" | "athletic"): Record<Expression, string> {
  const out = {} as Record<Expression, string>;
  for (const expression of EXPRESSIONS) {
    out[expression] = `/art/ronnie/${folder}/${expression}.jpg`;
  }
  out.spray = `/art/ronnie/${folder}/happy.jpg`;
  return out;
}

export const RONNIE_CASUAL = set("casual");
export const RONNIE_ATHLETIC = set("athletic");

export const RONNIE_POSES = {
  squat: "/art/ronnie/athletic/squat.jpg",
  yoga: "/art/ronnie/athletic/yoga.jpg",
} as const;
