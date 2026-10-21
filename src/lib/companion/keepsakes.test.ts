import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { KEEPSAKE_CHANCE, nextKeepsake, offerKeepsakes, shelfCubbies } from "./keepsakes.ts";

const empty = {
  started: true,
  dayPhase: "playing",
  izzyHere: true,
  present: ["izzy"] as const,
  daySerial: 3,
  keepsakes: [] as string[],
  seenDay: {},
  roster: { izzy: { trust: 50, bonding: 50 }, victoria: { trust: 90, bonding: 90 }, ronnie: { trust: 40, bonding: 90 } },
};

describe("keepsakes", () => {
  it("paints twelve equal cubbies", () => {
    const spots = shelfCubbies();
    assert.equal(spots.length, 12);
    assert.equal(new Set(spots.map((spot) => `${spot.w}x${spot.h}`)).size, 1);
  });

  it("holds the first gift until both meters are 50", () => {
    assert.equal(nextKeepsake("izzy", [], 49, 80), null);
    assert.equal(nextKeepsake("izzy", [], 80, 49), null);
    assert.equal(nextKeepsake("izzy", [], 50, 50)?.id, "izzy-pin");
  });

  it("will not skip to the second gift", () => {
    assert.equal(nextKeepsake("izzy", [], 100, 100)?.id, "izzy-pin");
    assert.equal(nextKeepsake("izzy", ["izzy-pin"], 89, 100), null);
    assert.equal(nextKeepsake("izzy", ["izzy-pin"], 90, 90)?.id, "izzy-guide");
    assert.equal(nextKeepsake("izzy", ["izzy-pin", "izzy-guide"], 100, 100), null);
  });

  it("rolls once per girl per day, and a miss spends the day", () => {
    const hit = offerKeepsakes(empty, () => 0);
    assert.deepEqual(hit.gained.map((item) => item.id), ["izzy-pin"]);
    assert.equal(hit.seenDay.izzy, 3);
    const again = offerKeepsakes({ ...empty, seenDay: hit.seenDay, keepsakes: hit.keepsakes }, () => 0);
    assert.equal(again.changed, false);
    assert.equal(again.gained.length, 0);

    const miss = offerKeepsakes(empty, () => KEEPSAKE_CHANCE);
    assert.equal(miss.gained.length, 0);
    assert.equal(miss.changed, true);
    assert.equal(miss.seenDay.izzy, 3);
  });

  it("does not roll while she is offstage or the day is not in play", () => {
    assert.equal(offerKeepsakes({ ...empty, izzyHere: false }, () => 0).changed, false);
    assert.equal(offerKeepsakes({ ...empty, dayPhase: "summary" }, () => 0).changed, false);
    assert.equal(offerKeepsakes({ ...empty, started: false }, () => 0).changed, false);
  });

  it("rolls each girl on her own meters", () => {
    const both = offerKeepsakes(
      {
        ...empty,
        present: ["izzy", "victoria", "ronnie"],
        roster: {
          izzy: { trust: 90, bonding: 90 },
          victoria: { trust: 90, bonding: 90 },
          ronnie: { trust: 90, bonding: 40 },
        },
      },
      () => 0,
    );
    assert.deepEqual(both.gained.map((item) => item.id), ["izzy-pin", "vicky-swatch"]);
  });
});
