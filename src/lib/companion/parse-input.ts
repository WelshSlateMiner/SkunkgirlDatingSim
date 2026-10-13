import { placeOf, resolvePlace } from "./locations";
import type { LocationId, PlayerBeat } from "./types";

export interface ParsedTurn {
  say: string;
  action: string;
  thought: string;
  beats: PlayerBeat[];
  invite: LocationId | null;
}

export function inviteToken(id: LocationId) {
  return `@(${placeOf(id).name})`;
}

export function actionToken(text: string) {
  return `*${text.trim()}*`;
}

const PHYSICAL =
  /\b(?:sits?|sat|sitting|stands?|stood|standing|walks?|walked|walking|steps?|stepped|leans?|leaned|leaning|reaches?|reached|reaching|holds?|held|holding|shakes?|shook|shaking|waves?|waved|waving|nods?|nodded|smiles?|smiled|smiling|grins?|grinned|laughs?|laughed|laughing|looks?|looked|looking|watches?|watched|watching|stares?|stared|staring|glances?|glanced|turns?|turned|turning|kisses?|kissed|kissing|hugs?|hugged|hugging|touches?|touched|touching|pats?|patted|grabs?|grabbed|pulls?|pulled|pushes?|pushed|offers?|offered|points?|pointed|bows?|bowed|kneels?|knelt|lies?|lays?|laid|crosses?|crossed|folds?|folded|covers?|covered|sniffs?|sniffed|coughs?|coughed|blushes?|blushed|fidgets?|shifts?|shifted|moves?|moved|moving|follows?|followed|leaves?|left|leaving|stays?|stayed|waits?|waited|opens?|opened|closes?|closed|lifts?|lifted|raises?|raised|lowers?|lowered|puts?|puts|sets?|takes?|took|taking|gives?|gave|eats?|ate|drinks?|drank|sips?|sipped|reads?|reads|writes?|wrote|stretches?|stretched|yawns?|yawned|sighs?|sighed|winks?|winked|shrugs?|shrugged|tilts?|tilted|scoots?|scooted|slides?|slid|plops?|plopped|extends?|extended|squeezes?|squeezed|places?|placed|hands?|gets up|sits down)\b/i;

const MENTAL =
  /^(?:i\s+(?:think|feel|wonder|hope|wish|believe|decide|realize|realise|notice|love|want|need|hate|like)\b|she(?:'s| is)\s+so\b|you(?:'re| are)\s+so\b|wow\b|god\b|damn\b)/i;

const PRIVATE_ADJ =
  /\b(?:gorgeous|beautiful|sexy|cute|pretty|handsome|stunning|lovely|adorable|breathtaking|disgusting)\b/gi;

/** What she can see. Private opinions inside the same gesture are dropped. */
export function seenAction(raw: string): string | null {
  const chunks = raw
    .split(/\s*(?:,|;|\.|\band\b)\s*/i)
    .map((part) => part.trim())
    .filter(Boolean);
  const kept: string[] = [];
  for (const chunk of chunks) {
    const admiring = /\b(?:admires?|admired|admiring|gazes?|gazed|gazing)\b/i.test(chunk);
    if (MENTAL.test(chunk) && !PHYSICAL.test(chunk) && !admiring) continue;
    if (!PHYSICAL.test(chunk) && !admiring) continue;
    let bit = chunk
      .replace(/\bI\s+admire\b/i, "I look at")
      .replace(/\badmires\b/i, "looks at")
      .replace(/\badmire\b/i, "look at")
      .replace(/\badmired\b/i, "looked at")
      .replace(/\badmiring\b/i, "looking at")
      .replace(/\bgazes?\b/i, "looks")
      .replace(/\bgazed\b/i, "looked")
      .replace(/\bgazing\b/i, "looking");
    bit = bit.replace(PRIVATE_ADJ, "").replace(/\s{2,}/g, " ").replace(/\s+([.!?])/g, "$1").trim();
    if (bit) kept.push(bit);
  }
  if (!kept.length) return null;
  return kept.join(" and ").replace(/\s{2,}/g, " ").trim();
}

function pushSay(beats: PlayerBeat[], text: string) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean) beats.push({ kind: "say", text: clean });
}

export function parseDraft(raw: string): ParsedTurn {
  const beats: PlayerBeat[] = [];
  let invite: LocationId | null = null;
  const token = /\*([^*]+)\*|\{([^{}]*)\}/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = token.exec(raw))) {
    const between = raw.slice(last, match.index).replace(/@\(([^)]*)\)/g, (_m, inner: string) => {
      const found = resolvePlace(String(inner));
      if (found && !invite) invite = found;
      return " ";
    });
    pushSay(beats, between);
    const star = match[1];
    const brace = match[2];
    if (brace != null) {
      const text = brace.trim();
      if (text) beats.push({ kind: "think", text });
    } else if (star != null) {
      const text = star.trim();
      if (text) {
        const seen = seenAction(text);
        if (seen) beats.push({ kind: "act", text, seen });
        else beats.push({ kind: "think", text });
      }
    }
    last = match.index + match[0].length;
  }
  const tail = raw.slice(last).replace(/@\(([^)]*)\)/g, (_m, inner: string) => {
    const found = resolvePlace(String(inner));
    if (found && !invite) invite = found;
    return " ";
  });
  pushSay(beats, tail);

  const say = beats
    .filter((beat) => beat.kind === "say")
    .map((beat) => beat.text)
    .join(" ");
  const action = beats
    .filter((beat) => beat.kind === "act")
    .map((beat) => beat.seen || beat.text)
    .join("; ");
  const thought = beats
    .filter((beat) => beat.kind === "think")
    .map((beat) => beat.text)
    .join(" ");
  return { say, action, thought, beats, invite };
}