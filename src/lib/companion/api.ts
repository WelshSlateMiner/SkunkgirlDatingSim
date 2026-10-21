import { createServerFn } from "@tanstack/react-start";
import type { GameState, IzzyTurn, TurnInput } from "./types";
import { resolveFx } from "./fart";
import { asLocationId } from "./locations";
import { asOutfitId } from "./portraits";
import { stateBlock, systemPrompt } from "./prompts";
import { bothHere } from "./cast";
import { parseExtras } from "./scene";

const EXPRESSIONS = new Set([
  "embarrassed",
  "happy",
  "flirty",
  "laughing",
  "suspicious",
  "shy",
  "angry",
  "infodump",
  "aroused",
  "thinking",
  "scheming",
  "spray",
  "idle",
]);

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const body = fenced ? fenced[1] : trimmed;
  const start = body.indexOf("{");
  const end = body.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("No JSON object");
  return JSON.parse(body.slice(start, end + 1));
}

function coerceTurn(raw: unknown): IzzyTurn {
  const o = (raw ?? {}) as Record<string, unknown>;
  const expression = String(o.expression ?? "happy");
  const fx = String(o.fx ?? "none");
  const delta = Number(o.trustDelta ?? 0);
  const bondingDelta = Number(o.bondingDelta ?? 0);
  const winding = Boolean(o.pendingIntimateSpray) && fx !== "spray" && !o.sprayed;
  const turn: IzzyTurn = {
    narration: String(o.narration ?? "").slice(0, 520),
    dialogue: String(o.dialogue ?? "...").slice(0, 1600),
    expression: (EXPRESSIONS.has(expression) ? expression : "happy") as IzzyTurn["expression"],
    trustDelta: Math.max(-18, Math.min(12, Number.isFinite(delta) ? Math.round(delta) : 0)),
    bondingDelta: Math.max(-12, Math.min(12, Number.isFinite(bondingDelta) ? Math.round(bondingDelta) : 0)),
    fx: (["none", "fart", "spray", "blush", "hearts", "laugh"].includes(fx)
      ? fx
      : "none") as IzzyTurn["fx"],
    suggestLocation: asLocationId(o.suggestLocation),
    outfit: asOutfitId(o.outfit),
    inner: o.inner ? String(o.inner).slice(0, 180) : undefined,
    testId: o.testId ? String(o.testId) : null,
    romanceOffer: Boolean(o.romanceOffer),
    sprayed: !winding && (Boolean(o.sprayed) || expression === "spray" || fx === "spray"),
    sprayKind:
      o.sprayKind === "consensual" ||
      o.sprayKind === "angry" ||
      o.sprayKind === "defensive" ||
      o.sprayKind === "dominant"
        ? o.sprayKind
        : null,
    sprayLevel: o.sprayLevel == null ? undefined : Number(o.sprayLevel),
    pendingIntimateSpray: Boolean(o.pendingIntimateSpray),
    otherDialogue: o.otherDialogue ? String(o.otherDialogue).slice(0, 900) : undefined,
    otherExpression: EXPRESSIONS.has(String(o.otherExpression ?? ""))
      ? (String(o.otherExpression) as IzzyTurn["expression"])
      : undefined,
    otherTrustDelta: Math.max(-12, Math.min(8, Math.round(Number(o.otherTrustDelta ?? 0) || 0))),
    otherBondingDelta: Math.max(-12, Math.min(8, Math.round(Number(o.otherBondingDelta ?? 0) || 0))),
    otherFx: (["none", "fart", "spray", "blush", "hearts", "laugh"].includes(String(o.otherFx ?? ""))
      ? String(o.otherFx)
      : "none") as IzzyTurn["fx"],
    otherSprayKind:
      o.otherSprayKind === "consensual" ||
      o.otherSprayKind === "angry" ||
      o.otherSprayKind === "defensive" ||
      o.otherSprayKind === "dominant"
        ? o.otherSprayKind
        : null,
    otherSprayLevel: o.otherSprayLevel == null ? undefined : Number(o.otherSprayLevel),
    extras: parseExtras(o.extras),
    fartReaction: (["playful", "cool", "attracted", "negative", "bigIssue"].includes(String(o.fartReaction ?? ""))
      ? String(o.fartReaction)
      : "none") as IzzyTurn["fartReaction"],
  };
  turn.fx = resolveFx(turn);
  return turn;
}

export const askIzzy = createServerFn({ method: "POST" })
  .validator((input: { state: GameState; turn: TurnInput; reroll?: string }) => input)
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) return { ok: false as const, error: "offline" };

    const recent: { role: "user" | "assistant"; content: string }[] = [];
    for (const m of data.state.messages.slice(-18)) {
      if (m.role === "player") {
        if (m.aside === "think") continue;
        if (m.aside === "act") {
          const seen = m.action?.trim();
          if (seen) recent.push({ role: "user", content: `Did: ${seen}` });
          continue;
        }
        const said = (m.say || m.text || "").trim();
        const did = (m.action || "").trim();
        const content = [said && `Said: ${said}`, did && `Did: ${did}`].filter(Boolean).join("\n");
        if (content) recent.push({ role: "user", content });
        continue;
      }
      if (m.text) recent.push({ role: "assistant", content: m.text });
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 1.0,
        max_tokens: bothHere(data.state) ? 700 : 450,
        messages: [
          { role: "system", content: systemPrompt(data.state) },
          ...recent,
          { role: "user", content: data.reroll ? `${stateBlock(data.state, data.turn)}\n\n${data.reroll}` : stateBlock(data.state, data.turn) },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false as const, error: `xAI API error ${res.status}` };
    }
    const body = (await res.json()) as {
      choices: { message: { content: string } }[];
    };
    const content = body.choices[0]?.message.content ?? "";
    try {
      const turn = coerceTurn(extractJson(content));
      if (!turn.dialogue.trim()) {
        return { ok: false as const, error: "empty" };
      }
      return { ok: true as const, turn };
    } catch {
      return { ok: false as const, error: "parse" };
    }
  });
