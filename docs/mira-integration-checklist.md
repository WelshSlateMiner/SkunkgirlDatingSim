# Mira integration checklist

Mira is not in the game. `GirlId` is still `"izzy" | "victoria" | "ronnie"`. Her facts are in [src/lib/companion/mira-bio.ts](src/lib/companion/mira-bio.ts). Nothing imports that file. `MIRA_ACTIVE` is false. The scene cap stays 3. Her dorm is drawn at `public/art/places/miraDorm.jpg` and is not a location.

Do not flip her into `GirlId` until `MIRA_OPEN` in that file is decided, and do not raise `MAX_SCENE_GIRLS` in the same pass. That test comes later.

## 0. Locked in the bio

Written. Do not re-decide these in a prompt.

- Name Mira. No surname. No stage name yet, on purpose: she thinks the name could make or break the career, and she has not found one that is perfect.
- Age 18. Performing arts. Idol career comes before school and romance.
- Dance assistant at Second Wind on Monday, Friday, and Sunday afternoons. Ronnie keeps Tuesday, Wednesday, Thursday, and Saturday yoga. Saturday afternoon Mira takes Ronnie's class as a client.
- Weekday mornings are class. Tuesday afternoon and Sunday morning she is at the gym filming bait clips. A 5% chance each day she skips the morning for the studio, the gym, or a beauty counter.
- Default fart window 1–2, then the shared food, intimacy, and class bonuses. Her own class is +1, and it does not stack with Ronnie's.
- Relationship at 90 Trust and 90 Bonding, mono or harem. Harem also needs every involved girl's opinion of the others at 5 or higher.
- The idol outfit is the plaid-plus set. Private is the Calvin Klein set.
- The opinion table is live for Izzy, Victoria, and Ronnie, and a new game no longer starts everyone at 5. Izzy is 4 toward Ronnie and 2 toward Victoria. Victoria is 8 toward Ronnie and 5 toward Izzy. Ronnie is 8 toward Victoria and 4 toward Izzy. Mira's row, and what they think of her, is in `MIRA_OPINIONS` and is not in the live table.
- Shop gifts have a dormant `mira` reaction. Dates do not read it.
- Keepsakes follow the 50 and 90 gates: a mixtape, then a USB of private rehearsals. Both images exist. Neither is in the live keepsake list.
- In person she holds her gas. A public dare costs up to 5 Trust and 3 Bonding. Online the gas is bait for the idol work. She is not selling sex.
- Wolf: she is already preparing to spray, and the player can still act first.
- Tail and ears stay the finished-sheet versions. Parents, jealousy, mark confrontation, and the rim preference are in the bio file, not in How to Play.

## 0b. Still open

The full list is `MIRA_OPEN` in the bio file. The ones that block activation:

- Whether the drawn plaid set is the JPOP idol costume.
- Start-location odds. She is not on the six-place table.
- The daily-attention formula, and what "directed at her" means in a group.
- Trust numbers for a bad date, a bad excuse, a public fart ask, and a breakup.
- Mono mode, the slow-mode third date, gland size, and consensual spray.
- Turning the drawn dorm into a LocationId. The painting exists. Travel and the shower stay off until she is active.

## 1. Dormant bio

Done. `src/lib/companion/mira-bio.ts` exports the facts and is not imported.

- [x] `MIRA_PROFILE`, schedule, haunts, instructor, date rules, keepsakes, night, intimacy, wolf, loyalty, what the other three know.
- [x] Dorm painted at `public/art/places/miraDorm.jpg` and described on `MIRA_DORM`. Not a location.
- [x] No flag that puts her in `present`.
