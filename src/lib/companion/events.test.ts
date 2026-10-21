import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  beggedOff,
  dareBegFace,
  dareBegSpoken,
  effortThanks,
  findEvent,
  girlWantsToSpray,
  metersWarm,
  planWolfSpray,
  resolveLines,
  rollEvent,
  skunkReaction,
  triedToWard,
  wardEffort,
  wolfChance,
  approachScript,
} from "./events.ts";
import type { TimeOfDay } from "./types.ts";

const trail = {
  started: true,
  dayPhase: "playing",
  izzyHere: true,
  present: ["izzy"],
  location: "trail",
  timeOfDay: "Afternoon" as TimeOfDay,
  incident: null,
};

describe("events", () => {
  it("raises the wolf chance after dark", () => {
    assert.equal(wolfChance("Morning"), 0.02);
    assert.equal(wolfChance("Afternoon"), 0.02);
    assert.equal(wolfChance("Evening"), 0.04);
    assert.equal(wolfChance("Night"), 0.04);
  });

  it("only rolls on the nature trail, with someone there, and nothing else underway", () => {
    assert.equal(rollEvent(trail, () => 0), "wolf");
    assert.equal(rollEvent(trail, () => 0.02), null);
    assert.equal(rollEvent({ ...trail, timeOfDay: "Night" }, () => 0.03), "wolf");
    assert.equal(rollEvent({ ...trail, timeOfDay: "Night" }, () => 0.04), null);
    assert.equal(rollEvent({ ...trail, location: "library" }, () => 0), null);
    assert.equal(rollEvent({ ...trail, present: [] }, () => 0), null);
    assert.equal(rollEvent({ ...trail, izzyHere: false }, () => 0), null);
    assert.equal(
      rollEvent(
        { ...trail, incident: { id: "wolf", phase: "threat", girls: ["izzy"], wolf: "snarl", sprayers: [] } },
        () => 0,
      ),
      null,
    );
  });

  it("matches the event name and nothing else", () => {
    assert.equal(findEvent("Wolf Attack!")?.id, "wolf");
    assert.equal(findEvent("wolf attack")?.id, "wolf");
    assert.equal(findEvent("wolf")?.id, "wolf");
    assert.equal(findEvent(""), null);
    assert.equal(findEvent("bear attack"), null);
  });

  it("treats a real attempt to drive the wolf off as a ward, and fear as not one", () => {
    assert.equal(triedToWard("I shout and wave my arms"), true);
    assert.equal(triedToWard("I stand in front of her"), true);
    assert.equal(triedToWard("I throw a rock"), true);
    assert.equal(triedToWard("I try to scare it off"), true);
    assert.equal(triedToWard("I'm scared"), false);
    assert.equal(triedToWard("I freeze"), false);
    assert.equal(triedToWard("I hide behind Izzy"), false);
    assert.equal(triedToWard(""), false);
  });

  it("lets Vicky and Izzy spray anyway, and lets Ronnie stand down only if the stand holds", () => {
    assert.equal(girlWantsToSpray("victoria", "stood"), true);
    assert.equal(girlWantsToSpray("izzy", "failed"), true);
    assert.equal(girlWantsToSpray("ronnie", "stood"), false);
    assert.equal(girlWantsToSpray("ronnie", "failed"), true);
    assert.equal(girlWantsToSpray("ronnie", "none"), true);
    const stood = planWolfSpray(["izzy", "victoria", "ronnie"], "stood", []);
    assert.deepEqual(stood.sprayers, ["izzy", "victoria"]);
    assert.deepEqual(stood.held, ["ronnie"]);
    const failed = planWolfSpray(["izzy", "victoria", "ronnie"], "failed", []);
    assert.deepEqual(failed.sprayers, ["izzy", "victoria", "ronnie"]);
    const dry = planWolfSpray(["victoria"], "none", ["victoria"]);
    assert.deepEqual(dry.sprayers, []);
    assert.deepEqual(dry.blocked, ["victoria"]);
  });

  it("treats a written failure as a try that did not stop the wolf", () => {
    assert.equal(wardEffort("I shout and wave my arms but it doesn't seem to be working"), "failed");
    assert.equal(wardEffort("I throw a rock. It's not very effective."), "failed");
    assert.equal(wardEffort("I yell at the wolf. The wolf doesn't seem to care."), "failed");
    assert.equal(wardEffort("I stand in front of her. The wolf keeps coming closer."), "failed");
    assert.equal(wardEffort("I try to scare it off. It's not helping."), "failed");
    assert.equal(wardEffort("I shout and wave my arms"), "stood");
    assert.equal(wardEffort("I'm scared"), "none");
    assert.equal(wardEffort(""), "none");
    assert.equal(effortThanks("stood").trust, 2);
    assert.equal(effortThanks("stood").bonding, 2);
    assert.equal(effortThanks("failed").trust, 1);
    assert.equal(effortThanks("failed").bonding, 1);
    assert.equal(effortThanks("none").trust, 0);
    const failed = resolveLines(planWolfSpray(["ronnie"], "failed", []), "failed");
    assert.match(failed.map((line) => line.text).join("\n"), /saw the try/i);
    assert.equal(failed.some((line) => line.role === "ronnie" && line.expression === "spray"), true);
    const held = resolveLines(planWolfSpray(["ronnie"], "stood", []), "stood");
    assert.equal(held.some((line) => line.expression === "spray"), false);
    assert.match(held.map((line) => line.text).join("\n"), /hold your ground/i);
  });

  it("keeps exactly 50 on the low path", () => {
    assert.equal(metersWarm(50, 90), false);
    assert.equal(metersWarm(80, 50), false);
    assert.equal(metersWarm(51, 51), true);
  });

  it("applies the accidentally-skunked reactions", () => {
    const izzyLow = skunkReaction("izzy", "disgusted", 80, 80);
    assert.equal(izzyLow.trustDelta, -5);
    assert.equal(izzyLow.bondingDelta, -5);
    const ronnieMad = skunkReaction("ronnie", "disgusted", 10, 10);
    assert.equal(ronnieMad.trustDelta, 0);
    assert.equal(ronnieMad.bondingDelta, 0);
    const vickyKind = skunkReaction("victoria", "understanding", 10, 10);
    assert.equal(vickyKind.trustDelta, 10);
    const ronnieKind = skunkReaction("ronnie", "understanding", 10, 10);
    assert.equal(ronnieKind.trustDelta, 5);
    assert.equal(ronnieKind.bondingDelta, 5);
    const izzyCold = skunkReaction("izzy", "aroused", 50, 90);
    assert.equal(izzyCold.trustDelta, -3);
    assert.equal(izzyCold.invite, false);
    const izzyWarm = skunkReaction("izzy", "aroused", 51, 51);
    assert.equal(izzyWarm.trustDelta, 10);
    assert.equal(izzyWarm.invite, true);
    const vickyCold = skunkReaction("victoria", "aroused", 40, 40);
    assert.equal(vickyCold.trustDelta, -5);
    assert.equal(vickyCold.invite, false);
    const vickyWarm = skunkReaction("victoria", "aroused", 60, 60);
    assert.equal(vickyWarm.trustDelta, 10);
    assert.equal(vickyWarm.bondingDelta, 10);
    assert.equal(vickyWarm.invite, false);
    assert.equal(vickyWarm.dare, true);
    assert.equal(vickyWarm.expression, "flirty");
    assert.match(vickyWarm.line, /dirty boy/);
    assert.match(vickyWarm.line, /Mommy's spray is for keeping you safe/);
    assert.match(vickyWarm.line, /real spray/);
    assert.match(skunkReaction("victoria", "aroused", 80, 80, "female").line, /dirty girl/);
    const ronnieCold = skunkReaction("ronnie", "aroused", 40, 80);
    assert.equal(ronnieCold.trustDelta, 2);
    assert.equal(ronnieCold.dare, false);
    const ronnieWarm = skunkReaction("ronnie", "aroused", 80, 80);
    assert.equal(ronnieWarm.trustDelta, 0);
    assert.equal(ronnieWarm.bondingDelta, 0);
    assert.equal(ronnieWarm.dare, true);
  });

  it("hears a beg and ignores a bluff that isn't one", () => {
    assert.equal(beggedOff("please don't"), true);
    assert.equal(beggedOff("no, wait"), true);
    assert.equal(beggedOff("I'm begging you"), true);
    assert.equal(beggedOff("do it"), false);
    assert.equal(beggedOff("no, go ahead and spray"), false);
    assert.equal(beggedOff(""), false);
  });

  it("has Victoria stand down like herself and still remember the interest", () => {
    const line = dareBegSpoken("victoria", "male");
    assert.match(line, /Good boy/);
    assert.match(line, /came to your senses/);
    assert.match(line, /very sweet/);
    assert.match(line, /far too potent/);
    assert.match(line, /clean you up/);
    assert.match(dareBegSpoken("victoria", "female"), /Good girl/);
    assert.equal(dareBegFace("victoria"), "flirty");
    assert.doesNotMatch(dareBegSpoken("ronnie"), /Good boy/);
  });

  it("writes the approach around what you were doing", () => {
    const racing = approachScript(["ronnie"], "race you to the creek");
    assert.match(racing.lines[0]!.text, /race/i);
    assert.equal(racing.expressions.ronnie, "scheming");
    const sitting = approachScript(["izzy", "victoria"], "we sit on the log");
    assert.match(sitting.lines[0]!.text, /ground/i);
    assert.equal(sitting.lines.filter((line) => line.role !== "narrator").length, 2);
  });
});
