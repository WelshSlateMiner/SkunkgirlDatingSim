import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { blankOpinions, disclosedHarem, haremOpinionsOk, shiftOpinion, warmScene, WALK_IN_DROP } from "./opinions.ts";
import { cappedClassBonus } from "./yoga.ts";
import { SHOWER_TURNS, spendTurns } from "./time.ts";

describe("girl opinions", () => {
  it("starts from familiarity, and a day's gain still stops at 2", () => {
    const map = blankOpinions();
    assert.equal(map.izzy.ronnie, 4);
    assert.equal(map.izzy.victoria, 2);
    assert.equal(map.victoria.izzy, 5);
    assert.equal(map.victoria.ronnie, 8);
    assert.equal(map.ronnie.izzy, 4);
    assert.equal(map.ronnie.victoria, 8);
    const first = warmScene(map, {}, ["izzy", "ronnie"]);
    assert.equal(first.map.izzy.ronnie, 5);
    assert.equal(first.map.ronnie.izzy, 5);
    const second = warmScene(first.map, first.gain, ["izzy", "ronnie"]);
    assert.equal(second.map.izzy.ronnie, 6);
    const third = warmScene(second.map, second.gain, ["izzy", "ronnie"]);
    assert.equal(third.map.izzy.ronnie, 6);
  });

  it("a walk-in drops by 5 and clamps at 1", () => {
    const map = blankOpinions();
    const dropped = shiftOpinion(map, {}, "ronnie", "victoria", -WALK_IN_DROP);
    assert.equal(dropped.map.ronnie.victoria, 3);
    assert.equal(dropped.applied, -5);
    const floored = shiftOpinion(map, {}, "izzy", "victoria", -WALK_IN_DROP);
    assert.equal(floored.map.izzy.victoria, 1);
    assert.equal(floored.applied, -1);
  });

  it("harem needs every pair at 5", () => {
    const map = blankOpinions();
    assert.equal(haremOpinionsOk(map, ["victoria", "ronnie"]), true);
    assert.equal(haremOpinionsOk(map, ["izzy", "ronnie"]), false);
    const up = shiftOpinion(shiftOpinion(map, {}, "izzy", "ronnie", 1).map, {}, "ronnie", "izzy", 1).map;
    assert.equal(haremOpinionsOk(up, ["izzy", "ronnie"]), true);
  });

  it("a group invite has to say so", () => {
    assert.equal(disclosedHarem("be my girlfriend", ["victoria"]), false);
    assert.equal(disclosedHarem("join us, both of you, I'm already with Victoria", ["victoria"]), true);
  });
});

describe("shower clock", () => {
  it("spends half a period and only then moves the part of the day", () => {
    assert.equal(SHOWER_TURNS, 5);
    const halfway = spendTurns(10, 5, "Morning", "Monday");
    assert.equal(halfway.timeOfDay, "Morning");
    assert.equal(halfway.turnsUntilTime, 5);
    assert.equal(halfway.periods, 0);
    const next = spendTurns(5, 5, "Morning", "Monday");
    assert.equal(next.timeOfDay, "Afternoon");
    assert.equal(next.turnsUntilTime, 10);
    assert.equal(next.periods, 1);
  });
});

describe("class bonus", () => {
  it("two classes in one scene still add only 1", () => {
    assert.equal(cappedClassBonus([1, 1]), 1);
    assert.equal(cappedClassBonus([0, 0]), 0);
    assert.equal(cappedClassBonus([1]), 1);
  });
});
