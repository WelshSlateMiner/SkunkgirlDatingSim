import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { meetOdds, rollGirl, seedMeeting, otherGirl } from "@/lib/companion/cast";
import { FIRST_MEETS } from "@/lib/companion/locations";
import { blankState, migrate, openingState } from "@/lib/companion/save";
import { __turnForTests } from "@/lib/companion/store";
import { baseRange, windowBonus } from "@/lib/companion/fart";
import { ronnieReactionTrust } from "@/lib/companion/ronnie-bio";
import { portraitSrc } from "@/lib/companion/portraits";
import type { GameState, IzzyTurn, TurnInput } from "@/lib/companion/types";

/** First roll in [0,1) that lands on Ronnie at this place. */
function ronnieRoll(place: (typeof FIRST_MEETS)[number]): number {
  for (let r = 0; r < 1; r += 0.005) if (rollGirl(place, r) === "ronnie") return r;
  return -1;
}

describe("Ronnie chance meeting at every start location", () => {
  for (const place of FIRST_MEETS) {
    it(`can meet Ronnie at ${place}`, () => {
      const odds = meetOdds(place);
      assert.ok(odds.ronnie > 0, "nonzero odds");
      assert.ok(Math.abs(odds.izzy + odds.victoria + odds.ronnie - 1) < 1e-9);
      const roll = ronnieRoll(place);
      assert.ok(roll >= 0);
      const s = seedMeeting(openingState("Tester", place), place, "mono", roll);
      assert.equal(s.focus, "ronnie");
      assert.deepEqual(s.present, ["ronnie"]);
      assert.equal(s.roster.ronnie.met, true);
      const greet = s.messages.find((m) => m.role === "ronnie");
      assert.ok(greet && greet.text.length > 10, "Ronnie greets in her own voice");
      assert.ok(!s.messages.some((m) => m.role === "izzy" || m.role === "victoria"));
    });
  }
  it("is the favourite at the gym", () => {
    const g = meetOdds("gym");
    assert.ok(g.ronnie > g.izzy && g.ronnie > g.victoria);
  });
});

describe("Ronnie rules hooked in", () => {
  it("range 1-3 regardless of trust", () => {
    assert.equal(baseRange("ronnie", 0), 3);
    assert.equal(baseRange("ronnie", 90), 3);
  });
  it("trust reaction weights", () => {
    assert.equal(ronnieReactionTrust(6, "playful"), 6);
    assert.equal(ronnieReactionTrust(6, "cool"), 3);
    assert.equal(ronnieReactionTrust(6, "attracted"), 4);
    assert.equal(ronnieReactionTrust(-10, "negative"), -2);
    assert.equal(ronnieReactionTrust(-1, "bigIssue"), -4);
  });
  it("rival bonus once another girl has farted in the scene", () => {
    const base = { location: "cafe", weekday: "Monday", timeOfDay: "Morning", present: ["ronnie", "izzy"], izzyHere: true } as const;
    assert.equal(windowBonus({ ...base, sceneFarts: [] } as never, "ronnie"), 0);
    assert.equal(windowBonus({ ...base, sceneFarts: ["izzy"] } as never, "ronnie"), 1);
    assert.equal(windowBonus({ ...base, sceneFarts: ["izzy"] } as never, "izzy"), 0);
  });
  it("never loads lingerie art", () => {
    for (const ex of ["idle", "aroused", "flirty", "spray"] as const) {
      assert.doesNotMatch(portraitSrc("lingerie" as never, ex, "none", "ronnie", true, "ronnieDorm"), /lingerie/);
    }
  });
});

describe("a real three-girl turn", () => {
  it("Izzy focus, Victoria other, Ronnie as an extra", () => {
    const start = openingState("Tester", "library");
    const state: GameState = {
      ...start,
      focus: "izzy",
      present: ["izzy", "victoria", "ronnie"],
      izzyHere: true,
      roster: {
        ...start.roster,
        victoria: { ...start.roster.victoria, met: true },
        ronnie: { ...start.roster.ronnie, met: true },
      },
    };
    assert.equal(otherGirl("izzy", state.present), "victoria");
    assert.equal(otherGirl("ronnie", state.present), "izzy");
    const input: TurnInput = { say: "Hey everyone", action: "" } as TurnInput;
    const turn: IzzyTurn = {
      narration: "",
      dialogue: "Hi!",
      expression: "happy",
      trustDelta: 2,
      bondingDelta: 1,
      fx: "none",
      otherDialogue: "Good afternoon.",
      extras: [{ girl: "ronnie", dialogue: "Sup. You lift?", expression: "scheming", trustDelta: 3, bondingDelta: 2, fx: "none" }],
    } as IzzyTurn;
    const patch = __turnForTests.applyTurn(state, input, turn);
    const msgs = (patch.messages ?? []).slice(state.messages.length);
    const roles = msgs.map((m) => m.role);
    assert.ok(roles.includes("izzy"));
    assert.ok(roles.includes("victoria"));
    assert.ok(roles.includes("ronnie"), `ronnie spoke: ${roles.join(",")}`);
    assert.ok((patch.roster?.ronnie.trust ?? 0) > state.roster.ronnie.trust, "her own trust moved");
    assert.deepEqual(patch.present ?? state.present, ["izzy", "victoria", "ronnie"]);
  });
});

describe("old saves", () => {
  it("a two-girl save without Ronnie loads", () => {
    const old = blankState() as GameState & { roster: Record<string, unknown> };
    const roster = { ...old.roster } as Record<string, unknown>;
    delete roster.ronnie;
    const scent = { ...(old.scentFrom ?? {}) } as Record<string, unknown>;
    delete scent.ronnie;
    const loaded = migrate({ ...old, roster, scentFrom: scent } as never);
    assert.ok(loaded.roster.ronnie);
    assert.equal(loaded.roster.ronnie.met, false);
    assert.equal(typeof loaded.scentFrom.ronnie, "number");
  });
});
