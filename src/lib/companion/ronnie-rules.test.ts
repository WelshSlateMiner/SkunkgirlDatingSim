import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { promptModifier, rangeMax, ronnieFartAllowed, ronnieNextDebt, ronnieRangeSpan, ronnieRivalHeld, yogaClassBonus } from "./fart.ts";
import { ronnieInstructing, ronnieOnClock } from "./yoga.ts";

describe("Ronnie fart rules (dormant)", () => {
  it("streak narrows by 2, quiet opens by 1", () => {
    assert.equal(ronnieNextDebt(0, true), 2);
    assert.equal(ronnieNextDebt(2, true), 4);
    assert.equal(ronnieNextDebt(4, false), 3);
    assert.equal(ronnieNextDebt(0, false), 0);
  });
  it("builds her span", () => {
    assert.equal(ronnieRangeSpan({ stops: [], debt: 0, place: "gym" }), 3);
    assert.equal(ronnieRangeSpan({ stops: [], debt: 0, place: "gym", prompted: true, rivalHeld: true }), 6);
    assert.equal(promptModifier("ronnie", "gym"), 2);
  });
  it("holds the rival bonus until she is alone", () => {
    assert.equal(ronnieRivalHeld(false, 1, true), true);
    assert.equal(ronnieRivalHeld(true, 1, false), true);
    assert.equal(ronnieRivalHeld(true, 0, false), false);
  });
  it("public limits", () => {
    assert.equal(ronnieFartAllowed("gym", "intimate", 2, false), true);
    assert.equal(ronnieFartAllowed("gym", "intimate", 3, false), false);
    assert.equal(ronnieFartAllowed("gym", "intimate", 1, true), false);
    assert.equal(ronnieFartAllowed("ronnieDorm", "intimate", 3, true), true);
  });
  it("yoga class bonus stays off while she cannot be present", () => {
    assert.equal(ronnieOnClock("Tuesday", "Afternoon"), true);
    assert.equal(ronnieOnClock("Monday", "Afternoon"), false);
    const state = { location: "yogaStudio", weekday: "Tuesday", timeOfDay: "Afternoon", present: ["izzy"], izzyHere: true } as const;
    assert.equal(ronnieInstructing({ ...state, present: ["izzy"] }), false);
    assert.equal(yogaClassBonus("yogaStudio", true), 1);
    assert.equal(rangeMax("izzy", 30, [], false, 0), 3);
    assert.equal(rangeMax("izzy", 30, [], false, 1), 4);
  });
});
