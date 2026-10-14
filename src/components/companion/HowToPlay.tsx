import { CircleHelp, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LOCATIONS } from "@/lib/companion/locations";

export function HowToPlay({ tone }: { tone?: "title" }) {
  const [open, setOpen] = useState(false);
  if (!open) {
    if (tone === "title") {
      return (
        <button type="button" className="text-xs text-muted underline-offset-2 hover:underline" onClick={() => setOpen(true)}>
          How to play
        </button>
      );
    }
    return (
      <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="How to play">
        <CircleHelp />
      </Button>
    );
  }
  const places = Object.values(LOCATIONS);
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3">
      <div className="mb-8 w-full max-w-lg rounded-[var(--radius-xl)] border border-border bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-between px-5 py-4">
          <p className="font-display text-lg text-fg">How to play</p>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)} aria-label="Close">
            <X />
          </Button>
        </div>
        <div className="max-h-[min(70dvh,640px)] space-y-4 overflow-y-auto px-5 pb-5 text-sm leading-relaxed text-muted">
          <section>
            <h3 className="font-display text-base text-fg">Talking</h3>
            <p className="mt-1">
              Type what you say in the box. Actions go in asterisks, like classic roleplay: *I sit down
              next to her*. Thoughts go in braces: {"{I think she looks lovely}"}. She never hears a thought. If you
              sit and admire her, she sees you sit and look, not the private opinion inside it. Speech, actions,
              and thoughts stay on their own lines, in the order you wrote them, and the asides are italic. Under
              the box: @ with a place drops an invite, and
              the Places list can fill that in without sending. Reroll asks her to answer your last message
              again. Roll back removes that message and her reply so you can write a different one. Once she
              knows you, she may shorten your name. Tell her to use your full name if you don't want that.
            </p>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">Gamemodes</h3>
            <p className="mt-1">
              Casual is the regular game. Slow Romance cuts how fast Trust and Bonding rise. You can ask her
              on a date once both are at least 20. A tip shows up when you're there. A gift is welcome, not
              required. Fill in the day, the time, and the place. Homes and your apartment wait until the third
              date. The first date lasts one part of the day. The second and third last two. After it, you
              see how Trust and Bonding moved. One date opens the meters to 50, a second to 75, a third to 100.
              Standing her up hurts badly. If she walks in on a date with the other woman, Izzy loses trust
              in how you treat people. Victoria is less rattled. She is a little flattered you picked her, and
              she respects a cold decision. Either way, talk the one you stood up down or she sprays.
            </p>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">Gifts and going alone</h3>
            <p className="mt-1">
              You start with $100. Monday's pay is $20 for each shift you worked that week. Time Skips And
              Work is the stopwatch. From your apartment, Go to Work skips to the next part of the day and banks
              $20. Once a day, and not at night. If you aren't home, it tells you to travel there first.
              Reading at the Campus Library and Studying at the Study Hall each move the clock forward one
              part of the day, and you can do either again. Zzz is Sleep. It only lights up at your apartment,
              Izzy's dorm, Vicky's bedroom, or Ronnie's dorm, and only from Evening on. The shower button works
              in the room you're in, including her dorm. Sleep opens a recap of the day.
              Continue fades out and back in over a few seconds. You wake the next Morning, a little less
              stinky, and Monday adds your paycheck. At Night almost everywhere closes. Still open: the Quad,
              the Nature Trail, West Field, Marquee House, the dorm, Ronnie's dorm, your apartment, and Vicky's living room and bedroom.
              If you're alone when a place locks up, Places opens and marks what is closed. If she's with you,
              she says so, and she decides whether to invite you somewhere private, keep going somewhere still
              open, or say good night.
              At a shop, the dollar button buys a gift. The backpack shows what you're carrying. Trailhead
              Outfitters sells track shoes for $50. If you bring a gift, it stays in the bag until you meet
              her. Miss the date or stand her up and it comes back. Once she has it, it's gone. You can also
              go without one. Victoria is easier to please with a gift. Izzy, who is still in college, cares more when the gift
              clearly cost something. Places shows where each of them is. They don't know you can see that.
              Invite fills the box. Travel goes there yourself. Leave without a goodbye and Bonding drops.
              Their homes stay shut unless you're already together. She may leave for class, work, her
              daughter, or because the talk died, but not in the first five turns unless you offended her.
              Following her there is suspicious. Doing it twice in a row is worse.
            </p>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">Trust and Bonding</h3>
            <p className="mt-1">
              Trust is how you treat the skunkgirl parts of her. Bonding is whether you actually get along.
              Kindness, curiosity, and accepting her smell raise them. Mockery, early fetish talk, and cruelty
              drop them. At Trust 100 and Bonding 70 she may ask to be a couple.
            </p>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">Three skunkgirls</h3>
            <p className="mt-1">
              Isabella, Victoria, and Veronica ("Ronnie", Vicky's daughter) keep separate Trust and Bonding.
              Ronnie runs track, lifts at the campus gym, and teaches at Second Wind on Tuesday, Wednesday,
              Thursday, and Saturday afternoons. She is proud of her gas, not embarrassed, and makes it a
              competition. Play along and she likes you more. Up to three girls can share a scene.
              The place you start decides who you meet first. The gym is mostly Ronnie. The library leans Izzy. Neko Shelf is mostly Izzy. Hearth & Hobby, the furniture showroom,
              and the Italian restaurant are mostly Victoria. Line & Lumen is Victoria's desk on weekday
              afternoons. She'll talk design there, and not much else. Izzy is on campus in the morning and
              at Trailhead Outfitters on Monday, Wednesday, and Friday afternoons. Other times, she wanders.
              If you name one of them, she answers. "You guys" or "ladies" invites both. An unaddressed girl
              only speaks if she has something to add. A date set for later does not move you. The summons
              shows up on that day and at that time, and only then.
            </p>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">Relationship Type</h3>
            <p className="mt-1">
              Monogamous means one official girlfriend. If she finds out you were unfaithful, Trust and Bonding
              drop hard. Under 50, she may end it. After that, the other woman is an option. Skunkgirl Harem lets
              you be with both. Victoria needs more trust before she will share.
            </p>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">The day</h3>
            <p className="mt-1">
              A new game starts Monday afternoon. The day and the time sit at the top left: Morning, Afternoon,
              Evening, Night. Every ten replies from them moves the clock, wherever you already are. What you
              type does not count until she answers, so a scheduled goodbye is not cut off by the hour. You only
              change places when you travel alone, when she accepts an invite, or when you confirm a date
              that is actually due. She will not offer her dorm, or accept your apartment, unless you are
              already a couple. A date at her job, the study hall, or a lecture hall gets a no.
            </p>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">Spray</h3>
            <p className="mt-1">
              A defensive spray is for a real threat. If she has not been touched, she warns you first. Talk
              her down, or keep coming and she fires. Afterward the choices are Surrender or Be aroused. A real
              attack is much harder to come back from than a jumpscare. A pat or a spank is not a threat when
              she trusts you. Each of them has her own scent glands, about 8 to 14 sprays. Every spray uses hers, including angry and defensive. When hers are empty she cannot spray until they refill. If both of them spray, each one keeps her own kind — one can be intimate while the other is dominant — and you answer each window before you can type again.
            </p>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">Intimacy</h3>
            <p className="mt-1">
              Slow Romance: she will not have sex with you until you are a couple. Casual: before that, she
              only gets intimate if Trust and Bonding are both at least 50 and you have shown you want her
              farts or her spray. Until you are official, that is what the scene stays about. Most of the time
              she waits a couple of turns to see what the last fart or spray did. She does not wait when she
              is marking you, when she is being dominant, or when you ask for more. Then she will go again,
              including a fart on the next line. If she isn't feeling another one, she says what's actually going on, in her own words: not gassy, tank empty, out of gas. She doesn't just say she doesn't want to. A playful dare in public is her choice. Izzy usually goes along,
              and she will fart to get your attention if the other skunkgirl is there. Victoria usually won't. At night, an intimate scene does not move the clock, and she will not call the day over in the middle of it. When you
              want it to end, say so. That you are done, that you should stop, that you want to get dressed or
              cuddle. Then the night can close. How often a fart actually happens is a private roll. Izzy starts
              more likely than Victoria. Trust above 20 opens the chance a little. Each different place that
              sells food widens it for the rest of the day, and a second visit to the same place does not.
              Osteria Vale adds a little. Casa Luna adds the most, and the farts there can be the large ones,
              without the moans. Each fart in a row makes the next one a little less likely. A quiet reply
              brings that chance back up. If you ask her outright, that is her choice, not the roll. In public,
              Izzy usually goes along and Victoria usually does not.
            </p>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">Outfits</h3>
            <p className="mt-1">She changes with the place, the hour, and how close you are. You do not pick from a menu.</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>Campus clothes, lounge, her work vest, a date dress, sleep clothes, lingerie.</li>
              <li>
                Bonus Cosplay Outfits — talking about the things she loves can unlock one during intimacy at
                her dorm. There are two right now. More later. They stay out of public, and they do not mix.
              </li>
            </ul>
          </section>
          <section>
            <h3 className="font-display text-base text-fg">Places that exist</h3>
            <p className="mt-1">
              These are the only places an invite will go. Anywhere else will not move the scene.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              {places.map((place) => (
                <li key={place.id}>
                  <span className="text-fg">{place.name}.</span> {place.what} {place.blurb}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
