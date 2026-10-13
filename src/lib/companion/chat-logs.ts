import type { ChatRole, GameMode } from "./types";
import { uid } from "@/lib/utils";

export const CHAT_LOG_KEY = "izzy-chat-logs";
const MAX_LOGS = 30;

export interface SavedChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  at: number;
}

export interface SavedChatLog {
  id: string;
  savedAt: number;
  playerName: string;
  gameMode: GameMode;
  weekday: string;
  timeOfDay: string;
  locationName: string;
  messages: SavedChatMessage[];
}

function read(): SavedChatLog[] {
  try {
    const raw = localStorage.getItem(CHAT_LOG_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedChatLog[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((log) => log && Array.isArray(log.messages) && typeof log.id === "string");
  } catch {
    return [];
  }
}

function write(logs: SavedChatLog[]) {
  localStorage.setItem(CHAT_LOG_KEY, JSON.stringify(logs.slice(0, MAX_LOGS)));
}

export function listChatLogs(): SavedChatLog[] {
  return read().sort((a, b) => b.savedAt - a.savedAt);
}

export function saveChatLog(input: Omit<SavedChatLog, "id" | "savedAt">): { ok: true; log: SavedChatLog } | { ok: false } {
  const log: SavedChatLog = {
    ...input,
    id: uid(),
    savedAt: Date.now(),
    messages: input.messages.map((m) => ({
      id: m.id,
      role: m.role,
      text: m.text,
      at: m.at,
    })),
  };
  try {
    write([log, ...read()]);
    return { ok: true, log };
  } catch {
    return { ok: false };
  }
}

export function deleteChatLog(id: string) {
  try {
    write(read().filter((log) => log.id !== id));
  } catch {
    /* ignore quota / private mode */
  }
}
