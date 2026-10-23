import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { openingState } from "./save.ts";
import { GLAND_DRY_TURNS, resolveSprayEvent, spendTank } from "./spray.ts";
import type { IzzyTurn, TurnInput } from "./types.ts";

const quiet: IzzyTurn = {
  dialogue: "No.",
  expression: "suspicious",
  trustDelta: 0,
  bondingDelta: 0,
  fx: "none",
};

describe("spray decisions", () => {
  it("warns on a threat and fires once contact lands", () => {
    const state = openingState("Tester", "library");
    const warn = resolveSprayEvent(state, { say: "I am going to hurt you.", action: "" }, quiet);
    assert.deepEqual(warn, { kind: "defensive", phase: "windup" });
    const hit = resolveSprayEvent(
      state,
      { say: "I grab Izzy and I am going to hurt you.", action: "" },
      { ...quiet, sprayed: true, fx: "spray", sprayKind: "defensive", expression: "spray" },
    );
    assert.deepEqual(hit, { kind: "defensive", phase: "burst" });
  });

  it("does not angry-spray while both meters are positive", () => {
    const state = openingState("Tester", "library");
    const event = resolveSprayEvent(
      state,
      { say: "You are awful.", action: "" } as TurnInput,
      { ...quiet, sprayed: true, fx: "spray", sprayKind: "angry", expression: "spray" },
    );
    assert.deepEqual(event, { kind: "none", phase: "none" });
  });

  it("will not fire a consensual spray from an empty tank", () => {
    const state = {
      ...openingState("Tester", "dorm"),
      trust: 80,
      bonding: 80,
      bond: "romantic" as const,
      glandDry: GLAND_DRY_TURNS,
      flags: { ...openingState("Tester", "dorm").flags, romanceAccepted: true },
    };
    const event = resolveSprayEvent(
      state,
      { say: "Spray me.", action: "" },
      { ...quiet, sprayed: true, fx: "spray", sprayKind: "consensual", expression: "spray" },
    );
    assert.equal(event.kind, "none");
  });

  it("locks an emptied tank for the named dry stretch", () => {
    const spent = spendTank({ glandCap: 25, glandShots: 24, turnsSinceIntimateSpray: 1, glandDry: 0 }, "mira", 3);
    assert.equal(spent.emptied, true);
    assert.equal(spent.tank.glandDry, GLAND_DRY_TURNS);
  });
});
