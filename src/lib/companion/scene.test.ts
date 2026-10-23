import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  anotherGirlFarted,
  extrasContract,
  localSceneExtras,
  logSceneFarts,
  parseExtras,
  resolveSceneExtras,
  sceneCastBrief,
  sceneLayout,
  sceneNames,
  sceneOrder,
  sceneOthers,
  sceneVoices,
} from "./scene.ts";

// Unknown ids sort last. The cast itself is GirlId.
type Fixture = "izzy" | "victoria" | "fixture";
const three: Fixture[] = ["fixture", "victoria", "izzy"];

describe("scene roster", () => {
  it("keeps the two-girl order unchanged", () => {
    assert.deepEqual(sceneOrder(["victoria", "izzy"]), ["izzy", "victoria"]);
    assert.deepEqual(sceneOrder(["izzy"]), ["izzy"]);
  });
  it("orders three, unknown ids last, capped at three", () => {
    assert.deepEqual(sceneOrder(three), ["izzy", "victoria", "fixture"]);
    assert.equal(sceneOrder([...three, "extra" as Fixture]).length, 3);
  });
  it("lists everyone but the focus", () => {
    assert.deepEqual(sceneOthers(three, "victoria"), ["izzy", "fixture"]);
  });
  it("names and lays out by head count", () => {
    assert.equal(sceneNames(["victoria", "izzy"]), "Izzy and Victoria");
    assert.match(sceneLayout(2).width, /-mx-/);
    assert.match(sceneLayout(3).width, /-mx-\[16%\]/);
    assert.equal(sceneLayout(1).height.includes("92dvh"), true);
    assert.equal(sceneLayout(2).height, sceneLayout(3).height);
  });
});

describe("scene fart log", () => {
  it("tracks farts and clears when one girl is left", () => {
    let log = logSceneFarts([], three, ["izzy"]);
    assert.deepEqual(log, ["izzy"]);
    assert.equal(anotherGirlFarted(log, "fixture"), true);
    assert.equal(anotherGirlFarted(log, "izzy"), false);
    log = logSceneFarts(log, ["izzy", "fixture"], []);
    assert.deepEqual(log, ["izzy"]);
    assert.deepEqual(logSceneFarts(log, ["fixture"], []), []);
  });
});

describe("third speaker", () => {
  const base = {
    present: three,
    covered: ["izzy", "victoria"] as Fixture[],
    holdGas: false,
    dry: () => false,
    mentionsFart: (t: string) => /fart/i.test(t),
    dryLine: () => "Nothing left.",
  };
  it("parses extras from model JSON", () => {
    const parsed = parseExtras([{ girl: "Fixture", dialogue: "Hi", fx: "fart", trustDelta: 50 }, "junk"]);
    assert.equal(parsed?.length, 1);
    assert.equal(parsed?.[0]?.girl, "fixture");
    assert.equal(parsed?.[0]?.trustDelta, 8);
    assert.equal(parseExtras(undefined), undefined);
  });
  it("drops voices for girls not here or already covered", () => {
    const v = sceneVoices<Fixture>(
      [
        { girl: "izzy", dialogue: "dup" },
        { girl: "fixture", dialogue: "me" },
        { girl: "fixture", dialogue: "again" },
      ],
      three,
      ["izzy", "victoria"],
    );
    assert.deepEqual(v.map((x) => x.dialogue), ["me"]);
  });
  it("resolves fart, held gas, and a dry gland", () => {
    const voices = [{ girl: "fixture" as Fixture, dialogue: "That fart was me.", fx: "fart" as const }];
    assert.equal(resolveSceneExtras({ ...base, voices })[0]?.fx, "fart");
    assert.equal(resolveSceneExtras({ ...base, voices, holdGas: true }).length, 0);
    const spray = [{ girl: "fixture" as Fixture, dialogue: "", fx: "spray" as const, sprayKind: "angry" as const }];
    assert.equal(resolveSceneExtras({ ...base, voices: spray })[0]?.sprayKind, "angry");
    const dry = resolveSceneExtras({ ...base, voices: spray, dry: () => true })[0];
    assert.equal(dry?.blocked, true);
    assert.equal(dry?.text, "Nothing left.");
  });
  it("offline brain answers for an addressed third girl only", () => {
    const opts = [() => ["Fixture line."], (g: Fixture) => (g === "fixture" ? /\bfix\b/i : undefined)] as const;
    assert.equal(localSceneExtras(three, "izzy", "hello there", ...opts), undefined);
    assert.equal(localSceneExtras(three, "izzy", "hey fix", ...opts)?.[0]?.dialogue, "Fixture line.");
    assert.equal(localSceneExtras(three, "izzy", "you guys ok?", ...opts)?.length, 1);
    assert.equal(localSceneExtras(["izzy", "victoria"], "izzy", "you guys ok?", ...opts), undefined);
  });
  it("adds prompt lines only with three or more", () => {
    assert.equal(sceneCastBrief(["izzy", "victoria"], "izzy"), "");
    assert.equal(extrasContract(["izzy", "victoria"], "izzy"), "");
    assert.match(sceneCastBrief(["izzy", "victoria", "ronnie"], "izzy"), /Ronnie speak through extras/);
    assert.match(extrasContract(["izzy", "victoria", "ronnie"], "victoria"), /"ronnie"/);
  });
});
