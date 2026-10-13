import { RefreshCw, Send, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { parseDraft } from "@/lib/companion/parse-input";
import { useCompanion } from "@/lib/companion/store";
import { cn } from "@/lib/utils";

export function TurnControls({ className }: { className?: string }) {
  const busy = useCompanion((s) => s.busy);
  const lastTurn = useCompanion((s) => s.lastTurn);
  const reroll = useCompanion((s) => s.reroll);
  const rollBack = useCompanion((s) => s.rollBack);
  const ready = Boolean(lastTurn) && !busy;

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 gap-1.5 px-2.5 text-xs"
        disabled={!ready}
        onClick={() => void reroll()}
        aria-label="Reroll her reply"
      >
        <RefreshCw />
        Reroll
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="h-8 gap-1.5 px-2.5 text-xs"
        disabled={!ready}
        onClick={() => rollBack()}
        aria-label="Roll back your last message and her reply"
      >
        <Undo2 />
        Roll back
      </Button>
    </div>
  );
}

export function ChatComposer({ compact = false }: { compact?: boolean }) {
  const busy = useCompanion((s) => s.busy);
  const sprayed = useCompanion((s) => s.sprayed);
  const prompts = useCompanion((s) => s.sprayPrompts);
  const debug = useCompanion((s) => s.debug);
  const send = useCompanion((s) => s.send);
  const draft = useCompanion((s) => s.draft);
  const setDraft = useCompanion((s) => s.setDraft);
  const inviteReply = useCompanion((s) => s.inviteReply);
  const playerName = useCompanion((s) => s.playerName);
  const example = `Hi, I’m ${playerName || "there"}! *holds out a hand* Nice to meet you.`;

  const locked = debug ? busy : busy || sprayed || (prompts?.length ?? 0) > 0;

  const parsedLive = parseDraft(draft);
  const empty =
    !parsedLive.say && !parsedLive.action && !parsedLive.thought && !parsedLive.invite && !inviteReply;

  function submit() {
    if (locked) return;
    const parsed = parseDraft(draft);
    if (!parsed.say && !parsed.action && !parsed.thought && !parsed.invite && !inviteReply) return;
    void send({ ...parsed, inviteReply });
  }

  return (
    <form
      className={cn(compact ? "mt-2 space-y-1" : "mt-3 space-y-2")}
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className={cn("grid gap-2", compact ? "grid-cols-[1fr_auto]" : "grid-cols-[1fr_auto]")}>
        {compact ? (
          <Input
            value={draft}
            disabled={locked}
            placeholder="Say something… *act* {thought}"
            className="h-9 rounded-sm text-xs"
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
          />
        ) : (
          <Textarea
            rows={2}
            value={draft}
            disabled={locked}
            placeholder={example}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit();
              }
            }}
          />
        )}
        <Button
          type="submit"
          size={compact ? "sm" : "default"}
          disabled={locked || empty}
          className={compact ? undefined : "h-auto min-h-11 sm:self-stretch"}
          aria-label="Send"
        >
          <Send />
          {compact ? null : <span className="sm:hidden">Send</span>}
        </Button>
      </div>
      <TurnControls />
      <p className={cn("text-subtle text-pretty", compact ? "text-[10px] leading-snug" : "text-[11px] leading-relaxed")}>
        {`*I sit down* is something she can see. {a private thought} is only for you. She answers what you said and what she watched you do, in the order you wrote it. @(Casa Luna) invites her.`}
      </p>
    </form>
  );
}
