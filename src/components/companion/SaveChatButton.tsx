import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveChatLog } from "@/lib/companion/chat-logs";
import { placeOf } from "@/lib/companion/locations";
import { useCompanion } from "@/lib/companion/store";

export function SaveChatButton() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  function save() {
    const s = useCompanion.getState();
    if (!s.messages.length) {
      setNote("Nothing to save yet.");
      return;
    }
    const result = saveChatLog({
      playerName: s.playerName.trim() || "You",
      gameMode: s.gameMode,
      weekday: s.weekday,
      timeOfDay: s.timeOfDay,
      locationName: placeOf(s.location).name,
      messages: s.messages.map((m) => ({
        id: m.id,
        role: m.role,
        text: m.text,
        at: m.at,
      })),
    });
    setNote(result.ok ? "Saved to the title screen." : "Couldn't save. Storage is full.");
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Save chat log"
        aria-expanded={open}
        onClick={() => {
          setNote(null);
          setOpen((v) => !v);
        }}
      >
        <Save />
      </Button>
      {open ? (
        <div className="absolute right-0 top-12 z-40 w-64 rounded-xl border border-border bg-surface p-3 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
          <p className="text-sm leading-relaxed text-fg">Save this chat to the title screen?</p>
          <p className="mt-1 text-xs text-muted">You can read it later from the main menu. The game itself stays as it is.</p>
          {note ? <p className="mt-2 text-xs text-accent">{note}</p> : null}
          <div className="mt-3 flex gap-2">
            <Button size="sm" className="flex-1" onClick={save}>
              Save chat log
            </Button>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
