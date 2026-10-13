import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatLine } from "@/components/companion/DialoguePanel";
import { deleteChatLog, listChatLogs, type SavedChatLog } from "@/lib/companion/chat-logs";

function when(at: number) {
  try {
    return new Date(at).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function ChatLogLibrary() {
  const [open, setOpen] = useState(false);
  const [logs, setLogs] = useState<SavedChatLog[]>([]);
  const [reading, setReading] = useState<SavedChatLog | null>(null);

  function refresh() {
    setLogs(listChatLogs());
  }

  if (!open) {
    return (
      <button
        type="button"
        className="text-xs text-muted underline-offset-2 hover:underline"
        onClick={() => {
          refresh();
          setReading(null);
          setOpen(true);
        }}
      >
        Chat logs
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3">
      <div className="mb-8 flex max-h-[min(80dvh,720px)] w-full max-w-lg flex-col rounded-[var(--radius-xl)] border border-border bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="font-display text-lg text-fg">{reading ? reading.playerName : "Chat logs"}</p>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Close"
            onClick={() => {
              setOpen(false);
              setReading(null);
            }}
          >
            <X />
          </Button>
        </div>
        {reading ? (
          <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 pb-5">
            <p className="text-xs text-muted">
              {reading.gameMode === "slow" ? "Slow Romance" : "Casual"} · {reading.weekday} {reading.timeOfDay} ·{" "}
              {reading.locationName} · {when(reading.savedAt)}
            </p>
            {reading.messages.map((m) => (
              <ChatLine key={m.id} message={m} />
            ))}
            <Button variant="ghost" size="sm" onClick={() => setReading(null)}>
              All logs
            </Button>
          </div>
        ) : logs.length === 0 ? (
          <p className="px-5 pb-5 text-sm text-muted">No saved chats yet. The floppy disk in a game saves one here.</p>
        ) : (
          <ul className="min-h-0 flex-1 space-y-2 overflow-y-auto px-5 pb-5">
            {logs.map((log) => (
              <li key={log.id} className="rounded-lg border border-border bg-bg/40 p-3">
                <button type="button" className="w-full text-left" onClick={() => setReading(log)}>
                  <p className="text-sm text-fg">
                    {log.playerName} · {log.gameMode === "slow" ? "Slow Romance" : "Casual"}
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    {when(log.savedAt)} · {log.messages.length} message{log.messages.length === 1 ? "" : "s"} ·{" "}
                    {log.locationName}
                  </p>
                </button>
                <button
                  type="button"
                  className="mt-2 text-xs text-subtle underline-offset-2 hover:text-fg hover:underline"
                  onClick={() => {
                    deleteChatLog(log.id);
                    refresh();
                  }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
