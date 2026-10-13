const MUTE_KEY = "izzy-audio-muted";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let sfx: GainNode | null = null;
let muted = false;

function ensureGraph() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC({ latencyHint: "interactive" });
    master = ctx.createGain();
    sfx = ctx.createGain();
    sfx.gain.value = 0.9;
    sfx.connect(master);
    master.connect(ctx.destination);
    muted = localStorage.getItem(MUTE_KEY) === "1";
    master.gain.value = muted ? 0 : 1;
  }
  return ctx;
}

export function isMuted() {
  return muted;
}

export function setMuted(next: boolean) {
  muted = next;
  if (typeof window !== "undefined") localStorage.setItem(MUTE_KEY, next ? "1" : "0");
  const node = master;
  const audio = ctx;
  if (node && audio) node.gain.setTargetAtTime(next ? 0 : 1, audio.currentTime, 0.03);
}

export function unlockAudio() {
  const audio = ensureGraph();
  if (!audio) return;
  if (audio.state === "suspended") void audio.resume();
  preloadSfx();
}

function brownNoise(seconds: number) {
  const audio = ctx!;
  const n = Math.floor(audio.sampleRate * seconds);
  const buf = audio.createBuffer(1, n, audio.sampleRate);
  const data = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < n; i++) {
    const white = Math.random() * 2 - 1;
    last = (last + 0.02 * white) / 1.02;
    data[i] = Math.max(-1, Math.min(1, last * 4.6));
  }
  return buf;
}

function buzz(when: number, freq: number, endFreq: number, dur: number, peak: number) {
  const audio = ctx!;
  const bus = sfx!;
  const osc = audio.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(freq, when);
  osc.frequency.exponentialRampToValueAtTime(Math.max(28, endFreq), when + dur);

  const lfo = audio.createOscillator();
  lfo.type = "sine";
  lfo.frequency.setValueAtTime(16 + Math.random() * 10, when);
  const lfoGain = audio.createGain();
  lfoGain.gain.value = freq * 0.18;
  lfo.connect(lfoGain);
  lfoGain.connect(osc.frequency);

  const g = audio.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(peak, when + 0.03);
  g.gain.exponentialRampToValueAtTime(peak * 0.45, when + dur * 0.45);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);

  osc.connect(g);
  g.connect(bus);
  osc.start(when);
  lfo.start(when);
  osc.stop(when + dur + 0.02);
  lfo.stop(when + dur + 0.02);
}

function whoosh(when: number, dur: number, peak: number, startHz: number, endHz: number) {
  const audio = ctx!;
  const bus = sfx!;
  const src = audio.createBufferSource();
  src.buffer = brownNoise(dur + 0.15);
  src.playbackRate.value = 0.85 + Math.random() * 0.3;

  const filter = audio.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 2.4;
  filter.frequency.setValueAtTime(startHz, when);
  filter.frequency.exponentialRampToValueAtTime(endHz, when + dur);

  const g = audio.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(peak, when + 0.04);
  g.gain.exponentialRampToValueAtTime(peak * 0.35, when + dur * 0.5);
  g.gain.exponentialRampToValueAtTime(0.0001, when + dur);

  src.connect(filter);
  filter.connect(g);
  g.connect(bus);
  src.start(when);
  src.stop(when + dur + 0.05);
}

export const FART_FILES = [
  "/sfx/fart01.mp3",
  "/sfx/fart02.mp3",
  "/sfx/fart03.mp3",
  "/sfx/fart04.mp3",
  "/sfx/fart05.mp3",
  "/sfx/fart06.mp3",
  "/sfx/fart07.mp3",
  "/sfx/fart08.mp3",
  "/sfx/fart09.mp3",
  "/sfx/fart10.mp3",
  "/sfx/fart11.mp3",
  "/sfx/fart12.mp3",
  "/sfx/fart13.mp3",
  "/sfx/fart14.mp3",
];

/** Most casual clips are small. A few are medium. Two are large. Sized by length and volume. */
const CASUAL_SIZE: Array<1 | 2 | 3> = [1, 1, 2, 1, 3, 1, 2, 1, 2, 2, 1, 2, 2, 3];

/** Full original clips, sigh included. Intimate fart-fetish scenes only. */
export const INTIMATE_FART_FILES = [
  "/sfx/intimate01.mp3",
  "/sfx/intimate02.mp3",
  "/sfx/intimate03.mp3",
  "/sfx/intimate04.mp3",
  "/sfx/intimate05.mp3",
  "/sfx/intimate06.mp3",
  "/sfx/intimate07.mp3",
  "/sfx/intimate08.mp3",
  "/sfx/intimate09.mp3",
  "/sfx/intimate10.mp3",
  "/sfx/intimate11.mp3",
  "/sfx/intimate12.mp3",
  "/sfx/intimate13.mp3",
  "/sfx/intimate14.mp3",
  "/sfx/intimate15.mp3",
  "/sfx/intimate17.mp3",
  "/sfx/intimate18.mp3",
  "/sfx/intimate19.mp3",
  "/sfx/intimate20.mp3",
  "/sfx/intimate21.mp3",
  "/sfx/intimate22.mp3",
  "/sfx/intimate23.mp3",
  "/sfx/intimate24.mp3",
  "/sfx/intimate25.mp3",
  "/sfx/intimate26.mp3",
  "/sfx/intimate27.mp3",
  "/sfx/intimate28.mp3",
  "/sfx/intimate29.mp3",
];

/** Most intimate clips are large. A few are only medium. Sized by length and volume. */
const INTIMATE_SIZE: Array<1 | 2 | 3> = [
  3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3, 3, 2, 3, 3, 2, 2,
];

export function fartSizeFor(src: string): 1 | 2 | 3 {
  const casual = FART_FILES.indexOf(src);
  if (casual >= 0) return CASUAL_SIZE[casual] ?? 1;
  const intimate = INTIMATE_FART_FILES.indexOf(src);
  if (intimate >= 0) return INTIMATE_SIZE[intimate] ?? 3;
  return 1;
}

/** Debug /cycle_fart walks every clip. Casual first, then intimate. Not gated by scene. */
export const DEBUG_FART_CLIPS: { src: string; kind: "casual" | "intimate"; n: number; of: number }[] = [
  ...FART_FILES.map((src, i) => ({ src, kind: "casual" as const, n: i + 1, of: FART_FILES.length })),
  ...INTIMATE_FART_FILES.map((src, i) => ({
    src,
    kind: "intimate" as const,
    n: i + 1,
    of: INTIMATE_FART_FILES.length,
  })),
];

export function fartClipAt(index: number) {
  const clips = DEBUG_FART_CLIPS;
  if (!clips.length) return null;
  return clips[((index % clips.length) + clips.length) % clips.length]!;
}

let lastFart = "";
const buffers = new Map<string, AudioBuffer>();
const inflight = new Map<string, Promise<void>>();

function preloadOne(src: string) {
  const audio = ensureGraph();
  if (!audio || buffers.has(src) || inflight.has(src)) return;
  const job = fetch(src)
    .then((res) => res.arrayBuffer())
    .then((raw) => audio.decodeAudioData(raw.slice(0)))
    .then((buf) => {
      buffers.set(src, buf);
    })
    .catch(() => {
      /* keep the HTMLAudio fallback */
    })
    .finally(() => {
      inflight.delete(src);
    });
  inflight.set(src, job);
}

export function preloadSfx() {
  if (typeof window === "undefined") return;
  ensureGraph();
  for (const src of [...FART_FILES, ...INTIMATE_FART_FILES, ...SPRAY_FILES]) preloadOne(src);
}

function playDecoded(src: string, volume: number) {
  const audio = ensureGraph();
  const buf = buffers.get(src);
  if (!audio || !sfx || !buf) return false;
  if (audio.state === "suspended") void audio.resume();
  const node = audio.createBufferSource();
  node.buffer = buf;
  const gain = audio.createGain();
  gain.gain.value = volume;
  node.connect(gain);
  gain.connect(sfx);
  node.start();
  return true;
}

function playUrl(src: string, volume: number) {
  if (playDecoded(src, volume)) return Promise.resolve();
  const a = new Audio(src);
  a.preload = "auto";
  a.volume = volume;
  return a.play();
}

/** Larger clips with no moan. Casual size 2–3, plus intimate takes that are the fart itself. */
export const TABLE_FART_FILES = [
  "/sfx/fart03.mp3",
  "/sfx/fart05.mp3",
  "/sfx/fart07.mp3",
  "/sfx/fart09.mp3",
  "/sfx/fart10.mp3",
  "/sfx/fart12.mp3",
  "/sfx/fart13.mp3",
  "/sfx/fart14.mp3",
  "/sfx/intimate08.mp3",
  "/sfx/intimate22.mp3",
  "/sfx/intimate23.mp3",
  "/sfx/intimate27.mp3",
  "/sfx/intimate28.mp3",
];

export function pickFartSrc(kind: boolean | "casual" | "intimate" | "table" = "casual") {
  const mode = kind === true ? "intimate" : kind === false || kind === "casual" ? "casual" : kind;
  const files = mode === "intimate" ? INTIMATE_FART_FILES : mode === "table" ? TABLE_FART_FILES : FART_FILES;
  const pool = files.filter((src) => src !== lastFart);
  const src = pool[Math.floor(Math.random() * pool.length)] ?? files[0]!;
  lastFart = src;
  return src;
}

export function playFartSrc(src: string) {
  unlockAudio();
  if (muted) return;
  lastFart = src;
  if (typeof Audio !== "undefined") {
    void playUrl(src, 0.92).catch(() => synthFart());
    return;
  }
  synthFart();
}

function playFartFile(intimate = false) {
  const files = intimate ? INTIMATE_FART_FILES : FART_FILES;
  const pool = files.filter((src) => src !== lastFart);
  const src = pool[Math.floor(Math.random() * pool.length)] ?? files[0]!;
  lastFart = src;
  return playUrl(src, 0.92);
}

function synthFart() {
  if (!ctx || !sfx) return;
  const t = ctx.currentTime + 0.02;
  const roll = Math.random();

  if (roll < 0.34) {
    whoosh(t, 0.38, 0.72, 220, 90);
    buzz(t, 150, 62, 0.36, 0.22);
  } else if (roll < 0.68) {
    whoosh(t, 0.22, 0.55, 260, 140);
    buzz(t, 170, 80, 0.2, 0.18);
    whoosh(t + 0.16, 0.55, 0.8, 180, 70);
    buzz(t + 0.16, 120, 42, 0.52, 0.26);
  } else {
    whoosh(t, 0.85, 0.78, 160, 55);
    buzz(t, 110, 36, 0.8, 0.24);
    whoosh(t + 0.28, 0.4, 0.4, 120, 48);
  }
}

export function playFartAt(index: number) {
  unlockAudio();
  if (muted) return;
  const clip = fartClipAt(index);
  if (typeof Audio !== "undefined" && clip) {
    lastFart = clip.src;
    void playUrl(clip.src, 0.92).catch(() => synthFart());
    return;
  }
  synthFart();
}

function pickTwo(files: string[], avoid = ""): [string, string] {
  const pool = files.filter((src) => src !== avoid);
  const first = pool[Math.floor(Math.random() * pool.length)] ?? files[0]!;
  const rest = files.filter((src) => src !== first);
  const second = rest[Math.floor(Math.random() * rest.length)] ?? first;
  return [first, second];
}

export function playFartPair(intimate = false) {
  unlockAudio();
  if (muted) return;
  const files = intimate ? INTIMATE_FART_FILES : FART_FILES;
  const [a, b] = pickTwo(files, lastFart);
  lastFart = b;
  void playUrl(a, 0.9).catch(() => synthFart());
  void playUrl(b, 0.82).catch(() => undefined);
}

export function playSprayPair() {
  unlockAudio();
  if (muted) return;
  const [a, b] = pickTwo(SPRAY_FILES);
  void playUrl(a, 0.88).catch(() => undefined);
  void playUrl(b, 0.8).catch(() => undefined);
}

export function playFart(intimate = false) {
  unlockAudio();
  if (muted) return;
  if (typeof Audio !== "undefined") {
    void playFartFile(intimate).catch(() => synthFart());
    return;
  }
  synthFart();
}

const SPRAY_FILES = [
  "/sfx/spray1.mp3",
  "/sfx/spray2.mp3",
  "/sfx/spray2.wav",
  "/sfx/spray2b.mp3",
  "/sfx/spray4.mp3",
  "/sfx/spray5.mp3",
];

function playSprayFiles() {
  const pool = [...SPRAY_FILES];
  const picks: string[] = [];
  while (picks.length < 2 && pool.length) {
    const i = Math.floor(Math.random() * pool.length);
    picks.push(pool.splice(i, 1)[0]!);
  }
  for (const src of picks) {
    if (!playDecoded(src, 0.88)) void playUrl(src, 0.88).catch(() => undefined);
  }
}

export function playSpray() {
  unlockAudio();
  if (muted) return;
  if (typeof Audio !== "undefined") {
    try {
      playSprayFiles();
      return;
    } catch {
      /* fall through to synth */
    }
  }
  if (!ctx || !sfx) return;
  const t = ctx.currentTime + 0.02;

  function hiss(when: number, dur: number, peak: number, hp: number) {
    const audio = ctx!;
    const bus = sfx!;
    const src = audio.createBufferSource();
    src.buffer = brownNoise(dur + 0.2);
    src.playbackRate.value = 1.15 + Math.random() * 0.2;
    const high = audio.createBiquadFilter();
    high.type = "highpass";
    high.frequency.value = hp;
    high.Q.value = 0.7;
    const low = audio.createBiquadFilter();
    low.type = "lowpass";
    low.frequency.value = 7800;
    const g = audio.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.exponentialRampToValueAtTime(peak, when + 0.025);
    g.gain.exponentialRampToValueAtTime(peak * 0.45, when + dur * 0.4);
    g.gain.exponentialRampToValueAtTime(0.0001, when + dur);
    src.connect(high);
    high.connect(low);
    low.connect(g);
    g.connect(bus);
    src.start(when);
    src.stop(when + dur + 0.05);
  }

  whoosh(t, 0.18, 0.35, 90, 40);
  hiss(t + 0.06, 0.55, 0.92, 1600);
  whoosh(t + 0.06, 0.5, 0.55, 1100, 220);
  hiss(t + 0.16, 0.85, 1.0, 1200);
  whoosh(t + 0.16, 0.9, 0.7, 700, 140);
  hiss(t + 0.55, 1.6, 0.38, 2400);
  whoosh(t + 0.7, 1.2, 0.28, 400, 80);
}
