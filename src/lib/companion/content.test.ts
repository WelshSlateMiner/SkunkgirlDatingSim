import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { GIRLS, START_ODDS } from "./cast.ts";
import { GIFTS } from "./gifts.ts";
import { LOCATIONS } from "./locations.ts";
import { OUTFIT_LABEL, portraitSrc } from "./portraits.ts";
import { migrate, openingState } from "./save.ts";
import type { Expression, GameState, OutfitId, SprayKind } from "./types.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const FACES: Expression[] = ["embarrassed", "happy", "idle", "flirty", "laughing", "suspicious", "shy", "angry", "infodump", "aroused", "thinking", "scheming"];
const SPRAYS: SprayKind[] = ["angry", "consensual", "defensive", "dominant"];

function onDisk(urlPath: string) {
  const file = path.join(root, "public", urlPath.replace(/^\//, ""));
  assert.equal(existsSync(file), true, urlPath);
}

describe("content checks", () => {
  it("start odds sum to 100 and every gift names a real store and every girl", () => {
    for (const [place, table] of Object.entries(START_ODDS)) {
      assert.equal(Object.values(table!).reduce((sum, n) => sum + n, 0), 100, place);
      assert.ok(LOCATIONS[place as keyof typeof LOCATIONS]);
    }
    for (const gift of GIFTS) {
      assert.ok(LOCATIONS[gift.store], gift.id);
      for (const girl of GIRLS) assert.ok(gift[girl], `${gift.id} ${girl}`);
    }
  });

  it("every portrait the game can ask for is on disk, and each girl has a manifest", () => {
    for (const girl of ["izzy", "victoria", "ronnie", "mira"] as const) onDisk(`/art/${girl}/manifest.json`);
    for (const outfit of Object.keys(OUTFIT_LABEL) as OutfitId[]) {
      for (const face of FACES) onDisk(portraitSrc(outfit, face, "none", "izzy"));
      for (const kind of SPRAYS) onDisk(portraitSrc(outfit, "idle", kind, "izzy"));
    }
    for (const face of FACES) {
      onDisk(portraitSrc("casual", face, "none", "victoria", false, "library"));
      onDisk(portraitSrc("casual", face, "none", "victoria", true, "apartment"));
      onDisk(portraitSrc("casual", face, "none", "victoria", false, "italian"));
      onDisk(portraitSrc("casual", face, "none", "ronnie", false, "library"));
      onDisk(portraitSrc("casual", face, "none", "ronnie", false, "gym"));
      onDisk(portraitSrc("casual", face, "none", "ronnie", false, "ronnieDorm"));
      onDisk(portraitSrc("casual", face, "none", "mira", false, "library"));
      onDisk(portraitSrc("casual", face, "none", "mira", false, "miraDorm"));
    }
    for (const kind of SPRAYS) {
      onDisk(portraitSrc("casual", "idle", kind, "victoria", false, "library"));
      onDisk(portraitSrc("casual", "idle", kind, "victoria", true, "apartment"));
      onDisk(portraitSrc("casual", "idle", kind, "ronnie", false, "library"));
      onDisk(portraitSrc("casual", "idle", kind, "mira", false, "library"));
    }
  });

  it("a save drops unknown keys and folds the old gift flag into one id", () => {
    const dirty = { ...openingState("Tester"), leaked: "nope" } as GameState & { leaked?: string };
    const next = migrate(dirty);
    assert.equal((next as { leaked?: string }).leaked, undefined);
    assert.equal(next.version, 12);
    assert.equal(next.playerName, "Tester");
    const dated = openingState("Tester");
    dated.scheduledDate = {
      girl: "izzy",
      nth: 1,
      time: "Afternoon",
      place: "cafe",
      day: "Monday",
      giftId: "steam-card",
      giftHeld: true,
    } as GameState["scheduledDate"] & { giftHeld: boolean };
    const folded = migrate(dated);
    assert.equal(folded.heldGiftId, "steam-card");
    assert.equal((folded.scheduledDate as { giftHeld?: boolean } | null)?.giftHeld, undefined);
  });
});
