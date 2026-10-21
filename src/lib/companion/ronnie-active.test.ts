import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { meetOdds, rollGirl, seedMeeting, otherGirl } from "@/lib/companion/cast";
import { FIRST_MEETS } from "@/lib/companion/locations";
import { blankState, migrate, openingState } from "@/lib/companion/save";
import { __turnForTests } from "@/lib/companion/store";
import { GLAND_MAX, onSprayCooldown, restTank, spendTank, stinkForSpray } from "@/lib/companion/spray";
import { baseRange, windowBonus } from "@/lib/companion/fart";
import { ronnieReactionTrust } from "@/lib/companion/ronnie-bio";
import { portraitSrc } from "@/lib/companion/portraits";
import type { GameState, IzzyTurn, TurnInput } from "@/lib/companion/types";

/** First roll in [0,1) that lands on Ronnie at this place. */
function ronnieRoll(place: (typeof FIRST_MEETS)[number]): number {
  for (let r = 0; r < 1; r += 0.005) if (rollGirl(place, r) === "ronnie") return r;
  return -1;
}

describe("Monday morning start, old meet odds", () => {
  it("opens on Monday morning", () => {
    const s = openingState("Tester", "library");
    assert.equal(s.weekday, "Monday");
    assert.equal(s.timeOfDay, "Morning");
  });
  for (const place of FIRST_MEETS) {
    it(`can meet Ronnie at ${place}`, () => {
      const odds = meetOdds(place);
      assert.ok(odds.ronnie > 0, "nonzero odds");
      const roll = ronnieRoll(place);
      assert.ok(roll >= 0);
      const s = seedMeeting(openingState("Tester", place), place, "mono", roll);
      assert.equal(s.focus, "ronnie");
      assert.deepEqual(s.present, ["ronnie"]);
      assert.equal(s.timeOfDay, "Morning");
    });
  }
});

describe("gland capacity and the one-turn wait", () => {
  it("spends 1, 2, or 3 from a fixed tank and prices the stink", () => {
    assert.deepEqual(GLAND_MAX, { izzy: 35, victoria: 40, ronnie: 30, mira: 25 });
    assert.equal(stinkForSpray(1), 10);
    assert.equal(stinkForSpray(2), 20);
    assert.equal(stinkForSpray(3), 30);
    const first = spendTank({ glandCap: 0, glandShots: 0, turnsSinceIntimateSpray: 0, glandDry: 0 }, "izzy", 2);
    assert.equal(first.spent, 2);
    assert.equal(first.tank.glandCap, 35);
    assert.equal(first.tank.glandShots, 2);
    assert.equal(onSprayCooldown(first.tank), true);
    const rested = restTank(first.tank);
    assert.equal(onSprayCooldown(rested), false);
    const drained = spendTank({ glandCap: 25, glandShots: 24, turnsSinceIntimateSpray: 1, glandDry: 0 }, "mira", 3);
    assert.equal(drained.spent, 1);
    assert.equal(drained.emptied, true);
  });
  it("says she is between classes when asked off campus", () => {
    const s = seedMeeting(openingState("Tester", "animeStore"), "animeStore", "mono", 0);
    assert.equal(s.focus, "izzy");
    const patch = __turnForTests.applyTurn(
      s,
      { say: "Why aren't you in class?", action: "" } as TurnInput,
      { narration: "", dialogue: "No idea.", expression: "idle", trustDelta: 0, bondingDelta: 0, fx: "none" },
    );
    const text = (patch.messages ?? []).map((m) => m.text).join(" ");
    assert.match(text, /between classes/i);
    assert.equal(patch.sprayKind ?? "none", "none");
  });
  it("will not spray again until she has answered once", () => {
    const s = seedMeeting(openingState("Tester", "library"), "library", "mono", 0);
    const charged = {
      ...s,
      glandCap: 35,
      glandShots: 2,
      turnsSinceIntimateSpray: 0,
      glandDry: 0,
    };
    const patch = __turnForTests.applyTurn(
      charged,
      { say: "spray again", action: "" } as TurnInput,
      {
        narration: "She sprays.",
        dialogue: "Take it.",
        expression: "spray",
        trustDelta: 0,
        bondingDelta: 0,
        fx: "spray",
        sprayed: true,
        sprayKind: "consensual",
        sprayLevel: 3,
      },
    );
    assert.equal(patch.sprayKind, "none");
    const text = (patch.messages ?? []).map((m) => m.text).join(" ");
    assert.match(text, /sink in|sit on you/i);
    assert.equal((patch.messages ?? []).some((m) => m.fx === "spray"), false);
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
  it("wears the dorm set at home and keeps the other kits", () => {
    assert.match(portraitSrc("casual", "idle", "none", "ronnie", false, "ronnieDorm"), /\/art\/ronnie\/home\/idle\.webp/);
    assert.match(portraitSrc("casual", "shy", "none", "ronnie", false, "apartment"), /\/art\/ronnie\/home\/shy\.webp/);
    assert.match(portraitSrc("casual", "idle", "consensual", "ronnie", false, "ronnieDorm"), /\/art\/ronnie\/home\/spray-consent\.webp/);
    assert.match(portraitSrc("casual", "idle", "none", "ronnie", false, "gym"), /\/art\/ronnie\/athletic\//);
    assert.match(portraitSrc("casual", "idle", "none", "ronnie", false, "cafe"), /\/art\/ronnie\/casual\//);
    assert.match(portraitSrc("casual", "flirty", "none", "ronnie", false, "ronnieDorm", false, true), /\/art\/ronnie\/dress\//);
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

import { START_ODDS, ronnieMorningDropIn, RONNIE_MORNING_DROP_IN, nextGirl, absentGirl } from "@/lib/companion/cast";
import { classifyInvite, datePlaces, isAwkwardPlace } from "@/lib/companion/outing";

describe("first-meeting odds table (exact)", () => {
  const want = {
    library: { izzy: 40, victoria: 20, ronnie: 20, mira: 20 },
    studyHall: { izzy: 40, victoria: 10, ronnie: 20, mira: 30 },
    trail: { izzy: 40, victoria: 10, ronnie: 40, mira: 10 },
    animeStore: { izzy: 50, victoria: 10, ronnie: 15, mira: 25 },
    craftStore: { izzy: 15, victoria: 45, ronnie: 25, mira: 15 },
    gym: { izzy: 5, victoria: 10, ronnie: 60, mira: 25 },
  } as const;
  it("every start location is in the table", () => {
    assert.deepEqual([...FIRST_MEETS].sort(), Object.keys(want).sort());
    assert.deepEqual(START_ODDS, want);
  });
  for (const [place, odds] of Object.entries(want)) {
    it(`${place} odds and roll bands`, () => {
      const got = meetOdds(place as never);
      for (const g of ["izzy", "victoria", "ronnie", "mira"] as const) assert.ok(Math.abs(got[g] - odds[g] / 100) < 1e-9);
      const counts = { izzy: 0, victoria: 0, ronnie: 0, mira: 0 };
      for (let i = 0; i < 1000; i++) counts[rollGirl(place as never, (i + 0.5) / 1000)]++;
      for (const g of ["izzy", "victoria", "ronnie", "mira"] as const) assert.equal(counts[g], odds[g] * 10);
    });
  }
});

describe("Ronnie morning drop-in", () => {
  it("only in the campus area", () => {
    for (const p of ["library", "studyHall", "classroom", "cafe", "campus", "trail", "gym", "field"] as const) {
      assert.equal(ronnieMorningDropIn(p, "izzy", "victoria", 0), true, p);
    }
    for (const p of ["mall", "yogaStudio", "craftStore", "animeStore", "dorm", "ronnieDorm", "firm"] as const) {
      assert.equal(ronnieMorningDropIn(p, "izzy", "victoria", 0), false, p);
    }
  });
  it("rolls against the chance and never drops in on herself", () => {
    assert.equal(ronnieMorningDropIn("library", "izzy", "victoria", RONNIE_MORNING_DROP_IN + 0.01), false);
    assert.equal(ronnieMorningDropIn("library", "ronnie", "izzy", 0), false);
    assert.equal(ronnieMorningDropIn("library", "izzy", "ronnie", 0), false);
  });
});

describe("poor dates are per girl", () => {
  it("the yoga studio is a poor date for Ronnie only", () => {
    assert.equal(isAwkwardPlace("yogaStudio", "ronnie"), true);
    assert.equal(isAwkwardPlace("yogaStudio", "izzy"), false);
    assert.equal(isAwkwardPlace("yogaStudio", "victoria"), false);
    assert.equal(isAwkwardPlace("yogaStudio"), false);
    assert.ok(!datePlaces(3, "ronnie").includes("yogaStudio"));
    assert.ok(datePlaces(3, "izzy").includes("yogaStudio"));
    assert.deepEqual(datePlaces(3, "izzy"), datePlaces(3, "victoria"));
    assert.deepEqual(datePlaces(3, "izzy"), datePlaces(3));
  });
  it("asking Ronnie on a date at the studio is refused", () => {
    const plan = classifyInvite(
      { location: "gym", focus: "ronnie", present: ["ronnie"], izzyHere: true, weekday: "Monday", timeOfDay: "Evening", pressedDuty: null },
      "want to go on a date at the yoga studio?",
      "yogaStudio",
      true,
    );
    assert.equal(plan?.blocked[0]?.girl, "ronnie");
    assert.equal(plan?.going.length, 0);
  });
});

describe("asked to skip work", () => {
  const at = { location: "yogaStudio", focus: "ronnie", present: ["ronnie"], izzyHere: true, weekday: "Tuesday", timeOfDay: "Afternoon" } as const;
  it("Ronnie refuses like Vicky: no press, work comes first", () => {
    const plan = classifyInvite({ ...at, pressedDuty: null } as never, "come to the cafe with me", "cafe", false);
    assert.equal(plan?.press, null);
    assert.equal(plan?.blocked[0]?.girl, "ronnie");
    assert.match(plan!.blocked[0]!.line, /nuts/i);
    assert.match(plan!.blocked[0]!.line, /Work comes first/);
  });
  it("Izzy still gets pressed", () => {
    const plan = classifyInvite(
      { location: "sportingGoods", focus: "izzy", present: ["izzy"], izzyHere: true, weekday: "Monday", timeOfDay: "Afternoon", pressedDuty: null },
      "come to the cafe with me",
      "cafe",
      false,
    );
    assert.equal(plan?.press, "izzy");
  });
});

describe("debug cast cycling", () => {
  it("change and add cover the cast", () => {
    assert.equal(nextGirl("izzy"), "victoria");
    assert.equal(nextGirl("victoria"), "ronnie");
    assert.equal(nextGirl("ronnie"), "mira");
    assert.equal(nextGirl("mira"), "izzy");
    assert.equal(absentGirl(["izzy", "victoria"]), "ronnie");
    assert.equal(absentGirl(["izzy", "victoria", "ronnie"]), "mira");
    assert.equal(absentGirl(["izzy", "victoria", "ronnie", "mira"]), null);
  });
});

import { ronnieDropInChance, RONNIE_HAUNT_DROP_IN, RONNIE_CAMPUS_DROP_IN } from "@/lib/companion/cast";

describe("Ronnie drop-ins outside the morning detour", () => {
  const free = ["Monday", "Evening"] as const; // no class, not a teaching day slot
  it("20% at her haunts when free (campus haunts too)", () => {
    for (const p of ["gym", "field", "library", "trail", "cafe", "naturalFoods", "sportingGoods", "animeStore"] as const) {
      assert.equal(ronnieDropInChance(p, ...free, ["izzy"]), RONNIE_HAUNT_DROP_IN, p);
    }
  });
  it("5% at campus spots that are not haunts", () => {
    for (const p of ["studyHall", "classroom", "campus"] as const) {
      assert.equal(ronnieDropInChance(p, ...free, ["izzy"]), RONNIE_CAMPUS_DROP_IN, p);
    }
  });
  it("0 elsewhere", () => {
    for (const p of ["mall", "burger", "firm", "dorm", "ronnieDorm", "yogaStudio"] as const) {
      assert.equal(ronnieDropInChance(p, ...free, ["izzy"]), 0, p);
    }
  });
  it("never in class or while teaching", () => {
    assert.equal(ronnieDropInChance("gym", "Monday", "Morning", ["izzy"]), 0);
    assert.equal(ronnieDropInChance("gym", "Tuesday", "Afternoon", ["izzy"]), 0);
    assert.equal(ronnieDropInChance("gym", "Monday", "Afternoon", ["izzy"]), RONNIE_HAUNT_DROP_IN);
  });
  it("never on herself, already here, at a full scene, or a place closed at night", () => {
    assert.equal(ronnieDropInChance("gym", ...free, ["ronnie"]), 0);
    assert.equal(ronnieDropInChance("gym", ...free, ["izzy", "ronnie"]), 0);
    assert.equal(ronnieDropInChance("gym", ...free, ["izzy", "victoria", "izzy"]), RONNIE_HAUNT_DROP_IN);
    assert.equal(ronnieDropInChance("gym", "Monday", "Night", ["izzy"]), 0);
    assert.equal(ronnieDropInChance("field", "Monday", "Night", ["izzy"]), RONNIE_HAUNT_DROP_IN);
  });
});

describe("group date to the yoga studio", () => {
  it("only Ronnie declines; the rest still go", () => {
    const plan = classifyInvite(
      { location: "cafe", focus: "izzy", present: ["izzy", "victoria", "ronnie"], izzyHere: true, weekday: "Monday", timeOfDay: "Evening", pressedDuty: null },
      "you guys want to go on a date at the yoga studio?",
      "yogaStudio",
      true,
    );
    assert.deepEqual(plan?.blocked.map((b) => b.girl), ["ronnie"]);
    assert.match(plan!.blocked[0]!.line, /Second Wind|my job/);
    assert.deepEqual([...(plan?.going ?? [])].sort(), ["izzy", "victoria"]);
    assert.equal(plan?.dateGoes, true);
  });
});
