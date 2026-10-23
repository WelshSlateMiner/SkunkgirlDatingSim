import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { dieHits, rangeSpan, shapeSpontaneousFart } from "./fart.ts";

describe("live fart window", () => {
  it("uses one span for every girl, including Ronnie", () => {
    assert.equal(rangeSpan("izzy", 6, [], 0, "library"), 2);
    assert.equal(rangeSpan("victoria", 6, [], 0, "library"), 1);
    assert.equal(rangeSpan("mira", 80, [], 0, "library"), 2);
    assert.equal(rangeSpan("ronnie", 80, [], 1, "gym"), 2);
    assert.equal(dieHits(2, 1), true);
    assert.equal(dieHits(2, 12), false);
    assert.equal(dieHits(0, 1), false);
  });

  it("a known miss strips a fart, and a known hit adds one if she forgot", () => {
    const miss = shapeSpontaneousFart("mira", 40, "library", [], 0, "fart", "She farts.", "Take that.", "roll", undefined, false, 0, false);
    assert.equal(miss.fx, "none");
    assert.equal(/fart/i.test(`${miss.narration} ${miss.dialogue}`), false);
    const hit = shapeSpontaneousFart("mira", 40, "library", [], 0, "none", "", "What?", "roll", undefined, false, 0, true);
    assert.equal(hit.fx, "fart");
    assert.match(`${hit.narration} ${hit.dialogue}`, /slips out|gets out/i);
  });
});
