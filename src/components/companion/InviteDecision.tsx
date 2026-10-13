import { Button } from "@/components/ui/button";
import { girlName } from "@/lib/companion/cast";
import { inviteToken } from "@/lib/companion/parse-input";
import { placeOf } from "@/lib/companion/locations";
import { useCompanion } from "@/lib/companion/store";
import { cn } from "@/lib/utils";

export function InviteDecision() {
  const destId = useCompanion((s) => s.pendingInvite);
  const reply = useCompanion((s) => s.inviteReply);
  const setReply = useCompanion((s) => s.setInviteReply);
  const busy = useCompanion((s) => s.busy);
  const focus = useCompanion((s) => s.focus ?? "izzy");
  const sprayed = useCompanion((s) => s.sprayed);

  if (!destId || sprayed) return null;
  const dest = placeOf(destId);

  return (
    <div className="mb-3 rounded-md border border-cream/40 bg-cream/10 px-3 py-3">
      <p className="text-sm text-fg text-pretty">
        {girlName(focus)} has invited you to {inviteToken(dest.id)}. Will you join her?
      </p>
      <p className="mt-1 text-[11px] leading-relaxed text-muted text-pretty">
        Accept or Decline flags your next message. The scene updates after you send — not when you tap a
        choice.
      </p>
      <div className="mt-3 flex gap-2">
        <Button
          size="sm"
          variant={reply === "accept" ? "default" : "outline"}
          className="flex-1"
          disabled={busy}
          aria-pressed={reply === "accept"}
          onClick={() => setReply(reply === "accept" ? null : "accept")}
        >
          Accept
        </Button>
        <Button
          size="sm"
          variant={reply === "decline" ? "default" : "outline"}
          className="flex-1"
          disabled={busy}
          aria-pressed={reply === "decline"}
          onClick={() => setReply(reply === "decline" ? null : "decline")}
        >
          Decline
        </Button>
      </div>
      {reply ? (
        <p className={cn("mt-2 text-[11px] uppercase tracking-[0.14em]", "text-accent")}>
          {reply === "accept" ? "Accept flagged — send when you're ready." : "Decline flagged — send when you're ready."}
        </p>
      ) : null}
    </div>
  );
}
