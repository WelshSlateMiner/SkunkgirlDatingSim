import { useEffect, useRef, useState } from "react";
import { girlName } from "@/lib/companion/cast";
import { useCompanion } from "@/lib/companion/store";
import type { ChatMessage } from "@/lib/companion/types";
import { cn } from "@/lib/utils";

const RECENT_COUNT = 12;

export function ChatLine({ message }: { message: Pick<ChatMessage, "role" | "text" | "aside"> }) {
  const m = message;
  if (m.role === "narrator") {
    return <p className="text-[13px] leading-relaxed text-muted italic text-pretty">{m.text}</p>;
  }
  if (m.role === "system") {
    return <p className="text-[12px] text-subtle italic">She thinks: {m.text}</p>;
  }
  if (m.role === "player") {
    const aside = m.aside === "act" || m.aside === "think";
    const body = m.aside === "act" ? `*${m.text}*` : m.aside === "think" ? `{${m.text}}` : m.text;
    return (
      <p className={cn("text-sm", aside ? "italic" : "text-cream/90", m.aside === "think" ? "text-muted" : aside ? "text-cream/80" : undefined)}>
        <span className="mr-2 text-[11px] uppercase tracking-wider text-subtle not-italic">You</span>
        {body}
      </p>
    );
  }
  const name = m.role === "victoria" ? "Victoria" : "Izzy";
  return (
    <div>
      <p className={cn("mb-1 font-display text-sm", m.role === "victoria" ? "text-cream" : "text-accent")}>{name}</p>
      <p className="text-[15px] leading-relaxed text-fg text-pretty">{m.text}</p>
    </div>
  );
}

export function DialoguePanel({ compact = false }: { compact?: boolean }) {
  const messages = useCompanion((s) => s.messages);
  const busy = useCompanion((s) => s.busy);
  const focus = useCompanion((s) => s.focus ?? "izzy");
  const thinking = `${girlName(focus)} is thinking…`;
  const scroller = useRef<HTMLDivElement>(null);
  const [full, setFull] = useState(false);
  const jump = useRef<"start" | "end">("end");

  const hidden = Math.max(0, messages.length - RECENT_COUNT);
  const showingAll = full && !compact;
  const visible = compact ? messages.slice(-1) : showingAll ? messages : messages.slice(-RECENT_COUNT);
  const latest = messages.filter((m) => m.role !== "player").at(-1);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (jump.current === "start") {
      el.scrollTop = 0;
      jump.current = "end";
      return;
    }
    const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 64;
    if (!showingAll || nearBottom) el.scrollTop = el.scrollHeight;
  }, [messages.length, busy, compact, showingAll]);

  if (compact) {
    return (
      <div className="min-w-0 flex-1 pr-2">
        {busy ? (
          <p className="text-sm text-muted shimmer-text">{thinking}</p>
        ) : latest ? (
          <div>
            {latest.role === "izzy" || latest.role === "victoria" ? (
              <p className={cn("mb-0.5 font-display text-xs", latest.role === "victoria" ? "text-cream" : "text-accent")}>
                {latest.role === "victoria" ? "Victoria" : "Izzy"}
              </p>
            ) : null}
            <p
              className={cn(
                "line-clamp-2 text-pretty leading-snug",
                latest.role === "narrator"
                  ? "text-[13px] text-muted italic"
                  : latest.role === "system"
                    ? "text-xs text-subtle"
                    : "text-sm text-fg",
              )}
            >
              {latest.role === "system" ? `She thinks: ${latest.text}` : latest.text}
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">She’s waiting.</p>
        )}
      </div>
    );
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {hidden > 0 ? (
        <button
          type="button"
          className="mb-2 self-start text-xs text-muted underline-offset-2 hover:text-fg hover:underline"
          onClick={() => {
            if (showingAll) {
              jump.current = "end";
              setFull(false);
            } else {
              jump.current = "start";
              setFull(true);
            }
          }}
        >
          {showingAll ? "Show recent" : "View Previous Messages"}
        </button>
      ) : null}
      <div
        ref={scroller}
        className={cn(
          "flex min-h-0 flex-col gap-3 overflow-y-auto pr-1",
          showingAll ? "max-h-[48vh]" : "max-h-[22vh] sm:max-h-[28vh]",
        )}
      >
        {visible.map((m) => (
          <div key={m.id} className={showingAll ? undefined : "stagger-in"}>
            <ChatLine message={m} />
          </div>
        ))}
        {busy ? <p className="text-sm text-muted shimmer-text">{thinking}</p> : null}
      </div>
    </div>
  );
}
