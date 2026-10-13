import { Button } from "@/components/ui/button";
import { girlName } from "@/lib/companion/cast";
import { placeOf } from "@/lib/companion/locations";
import { dateIsDue } from "@/lib/companion/outing";
import { useCompanion } from "@/lib/companion/store";

export function DateDue() {
  const due = useCompanion(dateIsDue);
  const plan = useCompanion((s) => s.scheduledDate);
  const attendDate = useCompanion((s) => s.attendDate);
  const standUp = useCompanion((s) => s.standUp);
  if (!due || !plan) return null;
  const who = girlName(plan.girl);
  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-end justify-center p-4 sm:items-center">
      <div className="pointer-events-auto w-full max-w-md rounded-xl border border-border bg-surface/95 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
        <p className="font-display text-2xl text-fg">She's waiting</p>
        <p className="mt-2 text-sm leading-relaxed text-fg">
          {plan.day} {plan.time}. {who} is at {placeOf(plan.place).name}. You can go, or you can stand her up.
        </p>
        <Button className="mt-4 w-full" onClick={attendDate}>
          Go to the date
        </Button>
        <Button className="mt-2 w-full" variant="outline" onClick={standUp}>
          Stand her up
        </Button>
      </div>
    </div>
  );
}

export function DateReviewCard() {
  const review = useCompanion((s) => s.dateReview);
  const closeReview = useCompanion((s) => s.closeReview);
  if (!review) return null;
  const who = girlName(review.girl);
  const trustDelta = review.trustAfter - review.trustBefore;
  const bondDelta = review.bondAfter - review.bondBefore;
  const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);
  const chance =
    review.nextChance === "likely"
      ? "She would say yes to another date."
      : review.nextChance === "no"
        ? "She is not ready to plan another one."
        : "Another date is possible. It depends how you ask.";
  return (
    <div className="pointer-events-none fixed inset-0 z-40 flex items-end justify-center p-4 sm:items-center">
      <div className="pointer-events-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-surface/95 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.45)]">
        <p className="font-display text-2xl text-fg">After the date</p>
        <p className="mt-2 text-sm text-muted">
          {who}: Trust {sign(trustDelta)} ({review.trustBefore} to {review.trustAfter}) · Bonding {sign(bondDelta)} (
          {review.bondBefore} to {review.bondAfter})
        </p>
        <p className="mt-3 text-sm text-fg">{chance}</p>
        <p className="mt-2 text-sm text-fg">
          She farted {review.farts} time{review.farts === 1 ? "" : "s"}.
        </p>
        <p className="mt-2 text-sm text-fg">{review.smell}</p>
        <p className="mt-2 text-sm text-fg">{review.gift}</p>
        {review.askNext ? (
          <Button className="mt-5 w-full" onClick={() => closeReview(true)}>
            Ask {who} on another date
          </Button>
        ) : null}
        <Button className="mt-2 w-full" variant={review.askNext ? "outline" : "default"} onClick={() => closeReview(false)}>
          Let her go
        </Button>
      </div>
    </div>
  );
}
