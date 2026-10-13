/** Shortenings of a given name. Not titles, not comments on behavior. */

const DICT: Record<string, string[]> = {
  victoria: ["Vicky", "Vic"],
  victor: ["Vic"],
  jacob: ["Jake"],
  james: ["Jim"],
  alexander: ["Alex"],
  alexandra: ["Alex"],
  alexandria: ["Alex"],
  alexis: ["Alex"],
  elizabeth: ["Liz", "Beth"],
  elisabeth: ["Liz", "Beth"],
  jonathan: ["Jon"],
  johnathan: ["Jon"],
  christopher: ["Chris"],
  kristopher: ["Kris"],
  katherine: ["Kate", "Kat"],
  catherine: ["Kate", "Cat"],
  kathryn: ["Kate"],
  katharine: ["Kate"],
  jennifer: ["Jen"],
  jessica: ["Jess"],
  michael: ["Mike"],
  michaela: ["Mick"],
  nicholas: ["Nick"],
  nicole: ["Nikki"],
  daniel: ["Dan"],
  danielle: ["Dani"],
  daniela: ["Dani"],
  matthew: ["Matt"],
  mathew: ["Matt"],
  william: ["Will"],
  robert: ["Rob"],
  roberta: ["Bobbie"],
  roberto: ["Rob"],
  richard: ["Rick"],
  benjamin: ["Ben"],
  samuel: ["Sam"],
  samantha: ["Sam"],
  stephanie: ["Steph"],
  stephen: ["Steve"],
  steven: ["Steve"],
  rebecca: ["Becca"],
  patricia: ["Pat"],
  patrick: ["Pat"],
  nathaniel: ["Nate"],
  nathan: ["Nate"],
  anthony: ["Tony"],
  antonio: ["Tony"],
  joseph: ["Joe"],
  josephine: ["Josie"],
  thomas: ["Tom"],
  timothy: ["Tim"],
  andrew: ["Andy"],
  andrea: ["Andie"],
  abigail: ["Abby"],
  gabrielle: ["Gabby"],
  gabriella: ["Gabby"],
  gabriela: ["Gabby"],
  madison: ["Maddy"],
  madeline: ["Maddy"],
  madeleine: ["Maddy"],
  margaret: ["Maggie"],
  gregory: ["Greg"],
  jeffrey: ["Jeff"],
  geoffrey: ["Geoff"],
  phillip: ["Phil"],
  philip: ["Phil"],
  theodore: ["Theo"],
  theodora: ["Theo"],
  isabella: ["Bella"],
  isabel: ["Bella"],
  isabelle: ["Bella"],
  christina: ["Tina"],
  christine: ["Chris"],
  christian: ["Chris"],
  zachary: ["Zach"],
  zachariah: ["Zach"],
  dominic: ["Dom"],
  valerie: ["Val"],
  valeria: ["Val"],
  kimberly: ["Kim"],
  kimberley: ["Kim"],
  melanie: ["Mel"],
  melissa: ["Mel"],
  deborah: ["Deb"],
  theresa: ["Tess"],
  teresa: ["Tess"],
  natasha: ["Tash"],
  natalie: ["Nat"],
  cameron: ["Cam"],
  charles: ["Charlie"],
  charlotte: ["Charlie"],
  olivia: ["Liv"],
  emily: ["Em"],
  emilia: ["Em"],
  penelope: ["Penny"],
  frederick: ["Fred"],
  francesca: ["Fran"],
  francis: ["Frank"],
  franklin: ["Frank"],
  douglas: ["Doug"],
  raymond: ["Ray"],
  gwendolyn: ["Gwen"],
  reginald: ["Reg"],
  maximilian: ["Max"],
  maxwell: ["Max"],
  sebastian: ["Seb"],
  annabelle: ["Anna"],
  anastasia: ["Ana"],
  bartholomew: ["Bart"],
  lawrence: ["Larry"],
  laurence: ["Larry"],
  suzanne: ["Sue"],
  susan: ["Sue"],
  susannah: ["Sue"],
  cassandra: ["Cass"],
  cassidy: ["Cass"],
  tristan: ["Tris"],
  beatrice: ["Bea"],
  beatrix: ["Bea"],
  eleanor: ["Ellie"],
  leonardo: ["Leo"],
  leonard: ["Leo"],
  edward: ["Ed"],
  edmund: ["Ed"],
  eduardo: ["Ed"],
  harrison: ["Harry"],
  harold: ["Harry"],
  henry: ["Harry"],
  veronica: ["Ronnie"],
  jasmine: ["Jaz"],
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

export function givenName(full: string) {
  const token = full.trim().split(/\s+/)[0] ?? "";
  return token.replace(/[^A-Za-z]/g, "");
}

/** First-syllable clip for names the list doesn't know. Victoria → Vic, Samantha → Sam. */
function autoNick(given: string): string | null {
  if (given.length < 5) return null;
  const lower = given.toLowerCase();
  let i = 0;
  while (i < lower.length && !VOWELS.has(lower[i]!)) i++;
  if (i >= lower.length) return null;
  i++;
  while (i < lower.length && VOWELS.has(lower[i]!)) i++;
  if (i >= lower.length) return null;
  i++;
  if (i < lower.length - 1 && !VOWELS.has(lower[i]!) && !VOWELS.has(lower[i + 1]!)) i++;
  const stem = lower.slice(0, i);
  if (stem.length < 3 || stem.length >= lower.length) return null;
  return stem.charAt(0).toUpperCase() + stem.slice(1);
}

export function nicknamesFor(full: string): string[] {
  const given = givenName(full);
  if (given.length < 3) return [];
  const key = given.toLowerCase();
  const known = DICT[key];
  if (known?.length) return known.filter((n) => n.toLowerCase() !== key).slice(0, 2);
  const auto = autoNick(given);
  if (!auto || auto.toLowerCase() === key) return [];
  return [auto];
}

export function chosenNickname(full: string): string | null {
  return nicknamesFor(full)[0] ?? null;
}

/** What she should call them out loud right now. */
export function callThem(full: string, trust: number, nicknamesOff: boolean) {
  const name = givenName(full) || full.trim();
  if (!name) return "you";
  if (nicknamesOff || trust < 28) return name;
  return chosenNickname(full) ?? name;
}
