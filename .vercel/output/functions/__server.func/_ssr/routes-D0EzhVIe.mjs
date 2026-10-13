import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_react_dom, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { $ as dutyStop, $n as victoriaOpening, A as cardCouple, An as sameDay, At as inviteParty, B as dateCrashLine, Bn as slowCeiling, Bt as leaveCopy, C as bondLabel, Cn as resolveAffair, Ct as holdCopy, D as callThem, Dn as romanceBlocked, E as bumpSpray, En as resolveSprayEvent, Et as intimacyAllowed, F as clearFed, Fn as sexualBeat, Ft as isPrivatePlace, G as displaceScent, Gn as spendTank, Gt as markLine, H as datePlaces, Hn as smellThought, Ht as likesPlayer, I as closingLine, In as shouldInitiateIntimate, It as isStore, J as duetFallback, Jn as threatKind, Jt as mentionsFart, K as dominantSprayMode, Kn as suitedPlace, Kt as markedBy, L as cn, Ln as showedScentInterest, Lt as judgeSmell, M as clamp, Mn as scentRelentless, Mt as isCouple, N as clampStink, Nn as seedMeeting, Nt as isDateAsk, O as canFartNow, On as romanceGate, Ot as intimacyCall, P as classifyInvite, Pn as settleGuts, Pt as isGroupAddress, Q as dutyPlace, Qn as victoriaLingerieOn, Qt as nextWeekday, R as companionChance, Rn as showerCut, Rt as laterSlot, S as bondFromScores, Sn as refusalCopy, St as herHome, T as buildReview, Tn as resolvePlace, Tt as initialCast, U as defensiveSprayCopy, Un as smellVerdict, Ut as madeContact, V as dateIsDue, Vn as smellAskLine, Vt as leaveReason, W as describeArrival, Wn as speakerRole, Wt as markBond, X as dutyFarewell, Xn as uid, Xt as nextSmell, Y as dutyExitNarration, Yn as topicsFrom, Yt as morningSpots, Z as dutyOf, Zn as victoriaDropIn, Zt as nextStop, _ as applyTrust, _n as readGut, _t as girlShort, a as GIRLS, an as parseMeetPlace, at as fedAfter, b as autoOutfit, bn as redirectCopy, bt as goodbyeSaid, c as OUTFIT_LABEL, cn as playerAlone, ct as flauntLine, d as WEEKDAYS, dn as portraitSrc, dt as giftById, en as normalizeScent, er as wasOffended, et as dutyWarn, f as addressedGirls, fn as prefillDate, ft as giftReaction, g as applyBonding, gn as pushFocus, gt as girlName, h as angrySprayAllowed, hn as pullFocus, ht as girlIsOfficial, i as FRESHEN, in as ownsHome, it as fartChance, j as chosenNickname, jn as scaleSlowGain, jt as isAwkwardPlace, k as canSleepNow, kn as rudeness, kt as intimateFetishFart, l as SHOWER_PLACES, ln as playerPrepared, lt as followLines, m as ageGas, mn as publicFartYes, mt as girlAt, n as CRUEL, nn as openTonight, nt as emptySprays, o as LOCATIONS, on as parseTimeOfDay, ot as fidelityHit, p as advanceTime, pn as publicFartNo, pt as giftsAt, q as dropFartProse, qn as talkedDown, qt as markedLabel, r as FIRST_MEETS, rn as otherGirl, rt as expose, s as LOCATION_GROUPS, sn as placeOf, st as finishTanks, t as APOLOGY, tn as oneGreeting, tr as withGirl, tt as economySeed, u as TIMES, un as playfulPublicAsk, ut as freshenRating, v as asLocationId, vn as readTank, vt as givenName, w as bothHere, wn as resolveFx, wt as indulgesPublicFart, x as awkwardMention, xn as reduceStink, y as asOutfitId, yn as recentLines, yt as glandsDry, z as cyclesFor, zn as slotOpen, zt as leaveChance } from "./spray-DHzJQ-Ag.mjs";
import { _ as ChevronsDownUp, c as Send, d as RefreshCw, f as MapPin, g as ChevronsUpDown, h as CircleHelp, i as Undo2, l as Save, m as DollarSign, n as VolumeX, o as Timer, p as GripHorizontal, r as Volume2, s as ShowerHead, t as X, u as RotateCcw, v as Backpack } from "../_libs/lucide-react.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D0EzhVIe.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_react_dom = require_react_dom();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[opacity,transform,background-color,color] duration-[var(--motion-quick)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:size-4", {
	variants: {
		variant: {
			default: "bg-accent text-accent-fg hover:opacity-90",
			cream: "bg-cream text-bg hover:opacity-90",
			outline: "border border-border bg-transparent text-fg hover:bg-elevated",
			ghost: "text-fg hover:bg-elevated",
			subtle: "bg-elevated text-fg hover:bg-surface"
		},
		size: {
			default: "h-11 rounded-[var(--radius-md)] px-4 text-sm",
			sm: "h-9 rounded-[var(--radius-sm)] px-3 text-sm",
			lg: "h-12 rounded-[var(--radius-md)] px-5 text-base",
			icon: "size-11 rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
function Button({ className, variant, size, asChild = false, static: isStatic, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), !isStatic && "active:not-disabled:scale-[0.96]", className),
		...props
	});
}
var SQUIGGLES = [
	"M12 96 C10 78 22 70 16 52 C10 34 24 26 18 8",
	"M28 98 C32 80 20 72 26 50 C32 30 18 22 24 4",
	"M44 94 C40 76 52 68 46 46 C40 28 54 18 48 2",
	"M8 90 C18 74 6 60 14 42 C22 24 8 14 12 0",
	"M36 92 C28 74 40 62 32 44 C24 26 38 14 30 2"
];
function Line({ i, className }) {
	const d = SQUIGGLES[i % SQUIGGLES.length];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: cn("stink-float", className),
		viewBox: "0 0 56 100",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			className: "stink-ghost"
		})]
	});
}
function StinkLines({ variant }) {
	if (variant === "screen") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stink-screen",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "stink-mist" }), Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
			i,
			className: `stink-screen-n${i}`
		}, i))]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "stink-body",
		"aria-hidden": true,
		children: [
			Array.from({ length: 7 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
				i,
				className: `stink-body-n${i}`
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "stink-puff stink-puff-a" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "stink-puff stink-puff-b" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "stink-puff stink-puff-c" })
		]
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var askIzzy = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("7b3cf4a35258c124dea61395ddf87161434bbb59b37a60f8b9c41c8409c6e3a9"));
var MUTE_KEY = "izzy-audio-muted";
var ctx = null;
var master = null;
var sfx = null;
var muted = false;
function ensureGraph() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const AC = window.AudioContext || window.webkitAudioContext;
		if (!AC) return null;
		ctx = new AC({ latencyHint: "interactive" });
		master = ctx.createGain();
		sfx = ctx.createGain();
		sfx.gain.value = .9;
		sfx.connect(master);
		master.connect(ctx.destination);
		muted = localStorage.getItem(MUTE_KEY) === "1";
		master.gain.value = muted ? 0 : 1;
	}
	return ctx;
}
function isMuted() {
	return muted;
}
function setMuted(next) {
	muted = next;
	if (typeof window !== "undefined") localStorage.setItem(MUTE_KEY, next ? "1" : "0");
	const node = master;
	const audio = ctx;
	if (node && audio) node.gain.setTargetAtTime(next ? 0 : 1, audio.currentTime, .03);
}
function unlockAudio() {
	const audio = ensureGraph();
	if (!audio) return;
	if (audio.state === "suspended") audio.resume();
	preloadSfx();
}
function brownNoise(seconds) {
	const audio = ctx;
	const n = Math.floor(audio.sampleRate * seconds);
	const buf = audio.createBuffer(1, n, audio.sampleRate);
	const data = buf.getChannelData(0);
	let last = 0;
	for (let i = 0; i < n; i++) {
		const white = Math.random() * 2 - 1;
		last = (last + .02 * white) / 1.02;
		data[i] = Math.max(-1, Math.min(1, last * 4.6));
	}
	return buf;
}
function buzz(when, freq, endFreq, dur, peak) {
	const audio = ctx;
	const bus = sfx;
	const osc = audio.createOscillator();
	osc.type = "sawtooth";
	osc.frequency.setValueAtTime(freq, when);
	osc.frequency.exponentialRampToValueAtTime(Math.max(28, endFreq), when + dur);
	const lfo = audio.createOscillator();
	lfo.type = "sine";
	lfo.frequency.setValueAtTime(16 + Math.random() * 10, when);
	const lfoGain = audio.createGain();
	lfoGain.gain.value = freq * .18;
	lfo.connect(lfoGain);
	lfoGain.connect(osc.frequency);
	const g = audio.createGain();
	g.gain.setValueAtTime(1e-4, when);
	g.gain.exponentialRampToValueAtTime(peak, when + .03);
	g.gain.exponentialRampToValueAtTime(peak * .45, when + dur * .45);
	g.gain.exponentialRampToValueAtTime(1e-4, when + dur);
	osc.connect(g);
	g.connect(bus);
	osc.start(when);
	lfo.start(when);
	osc.stop(when + dur + .02);
	lfo.stop(when + dur + .02);
}
function whoosh(when, dur, peak, startHz, endHz) {
	const audio = ctx;
	const bus = sfx;
	const src = audio.createBufferSource();
	src.buffer = brownNoise(dur + .15);
	src.playbackRate.value = .85 + Math.random() * .3;
	const filter = audio.createBiquadFilter();
	filter.type = "bandpass";
	filter.Q.value = 2.4;
	filter.frequency.setValueAtTime(startHz, when);
	filter.frequency.exponentialRampToValueAtTime(endHz, when + dur);
	const g = audio.createGain();
	g.gain.setValueAtTime(1e-4, when);
	g.gain.exponentialRampToValueAtTime(peak, when + .04);
	g.gain.exponentialRampToValueAtTime(peak * .35, when + dur * .5);
	g.gain.exponentialRampToValueAtTime(1e-4, when + dur);
	src.connect(filter);
	filter.connect(g);
	g.connect(bus);
	src.start(when);
	src.stop(when + dur + .05);
}
var FART_FILES = [
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
	"/sfx/fart14.mp3"
];
/** Most casual clips are small. A few are medium. Two are large. Sized by length and volume. */
var CASUAL_SIZE = [
	1,
	1,
	2,
	1,
	3,
	1,
	2,
	1,
	2,
	2,
	1,
	2,
	2,
	3
];
/** Full original clips, sigh included. Intimate fart-fetish scenes only. */
var INTIMATE_FART_FILES = [
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
	"/sfx/intimate29.mp3"
];
/** Most intimate clips are large. A few are only medium. Sized by length and volume. */
var INTIMATE_SIZE = [
	3,
	3,
	2,
	3,
	3,
	3,
	3,
	2,
	3,
	3,
	3,
	3,
	2,
	3,
	3,
	2,
	3,
	3,
	3,
	3,
	3,
	3,
	3,
	2,
	3,
	3,
	2,
	2
];
function fartSizeFor(src) {
	const casual = FART_FILES.indexOf(src);
	if (casual >= 0) return CASUAL_SIZE[casual] ?? 1;
	const intimate = INTIMATE_FART_FILES.indexOf(src);
	if (intimate >= 0) return INTIMATE_SIZE[intimate] ?? 3;
	return 1;
}
/** Debug /cycle_fart walks every clip. Casual first, then intimate. Not gated by scene. */
var DEBUG_FART_CLIPS = [...FART_FILES.map((src, i) => ({
	src,
	kind: "casual",
	n: i + 1,
	of: FART_FILES.length
})), ...INTIMATE_FART_FILES.map((src, i) => ({
	src,
	kind: "intimate",
	n: i + 1,
	of: INTIMATE_FART_FILES.length
}))];
function fartClipAt(index) {
	const clips = DEBUG_FART_CLIPS;
	if (!clips.length) return null;
	return clips[(index % clips.length + clips.length) % clips.length];
}
var lastFart = "";
var buffers = /* @__PURE__ */ new Map();
var inflight = /* @__PURE__ */ new Map();
function preloadOne(src) {
	const audio = ensureGraph();
	if (!audio || buffers.has(src) || inflight.has(src)) return;
	const job = fetch(src).then((res) => res.arrayBuffer()).then((raw) => audio.decodeAudioData(raw.slice(0))).then((buf) => {
		buffers.set(src, buf);
	}).catch(() => {}).finally(() => {
		inflight.delete(src);
	});
	inflight.set(src, job);
}
function preloadSfx() {
	if (typeof window === "undefined") return;
	ensureGraph();
	for (const src of [
		...FART_FILES,
		...INTIMATE_FART_FILES,
		...SPRAY_FILES
	]) preloadOne(src);
}
function playDecoded(src, volume) {
	const audio = ensureGraph();
	const buf = buffers.get(src);
	if (!audio || !sfx || !buf) return false;
	if (audio.state === "suspended") audio.resume();
	const node = audio.createBufferSource();
	node.buffer = buf;
	const gain = audio.createGain();
	gain.gain.value = volume;
	node.connect(gain);
	gain.connect(sfx);
	node.start();
	return true;
}
function playUrl(src, volume) {
	if (playDecoded(src, volume)) return Promise.resolve();
	const a = new Audio(src);
	a.preload = "auto";
	a.volume = volume;
	return a.play();
}
/** Larger clips with no moan. Casual size 2–3, plus intimate takes that are the fart itself. */
var TABLE_FART_FILES = [
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
	"/sfx/intimate28.mp3"
];
function pickFartSrc(kind = "casual") {
	const mode = kind === true ? "intimate" : kind === false || kind === "casual" ? "casual" : kind;
	const files = mode === "intimate" ? INTIMATE_FART_FILES : mode === "table" ? TABLE_FART_FILES : FART_FILES;
	const pool = files.filter((src) => src !== lastFart);
	const src = pool[Math.floor(Math.random() * pool.length)] ?? files[0];
	lastFart = src;
	return src;
}
function playFartSrc(src) {
	unlockAudio();
	if (muted) return;
	lastFart = src;
	if (typeof Audio !== "undefined") {
		playUrl(src, .92).catch(() => synthFart());
		return;
	}
	synthFart();
}
function playFartFile(intimate = false) {
	const files = intimate ? INTIMATE_FART_FILES : FART_FILES;
	const pool = files.filter((src) => src !== lastFart);
	const src = pool[Math.floor(Math.random() * pool.length)] ?? files[0];
	lastFart = src;
	return playUrl(src, .92);
}
function synthFart() {
	if (!ctx || !sfx) return;
	const t = ctx.currentTime + .02;
	const roll = Math.random();
	if (roll < .34) {
		whoosh(t, .38, .72, 220, 90);
		buzz(t, 150, 62, .36, .22);
	} else if (roll < .68) {
		whoosh(t, .22, .55, 260, 140);
		buzz(t, 170, 80, .2, .18);
		whoosh(t + .16, .55, .8, 180, 70);
		buzz(t + .16, 120, 42, .52, .26);
	} else {
		whoosh(t, .85, .78, 160, 55);
		buzz(t, 110, 36, .8, .24);
		whoosh(t + .28, .4, .4, 120, 48);
	}
}
function playFartAt(index) {
	unlockAudio();
	if (muted) return;
	const clip = fartClipAt(index);
	if (typeof Audio !== "undefined" && clip) {
		lastFart = clip.src;
		playUrl(clip.src, .92).catch(() => synthFart());
		return;
	}
	synthFart();
}
function pickTwo(files, avoid = "") {
	const pool = files.filter((src) => src !== avoid);
	const first = pool[Math.floor(Math.random() * pool.length)] ?? files[0];
	const rest = files.filter((src) => src !== first);
	return [first, rest[Math.floor(Math.random() * rest.length)] ?? first];
}
function playFartPair(intimate = false) {
	unlockAudio();
	if (muted) return;
	const [a, b] = pickTwo(intimate ? INTIMATE_FART_FILES : FART_FILES, lastFart);
	lastFart = b;
	playUrl(a, .9).catch(() => synthFart());
	playUrl(b, .82).catch(() => void 0);
}
function playSprayPair() {
	unlockAudio();
	if (muted) return;
	const [a, b] = pickTwo(SPRAY_FILES);
	playUrl(a, .88).catch(() => void 0);
	playUrl(b, .8).catch(() => void 0);
}
function playFart(intimate = false) {
	unlockAudio();
	if (muted) return;
	if (typeof Audio !== "undefined") {
		playFartFile(intimate).catch(() => synthFart());
		return;
	}
	synthFart();
}
var SPRAY_FILES = [
	"/sfx/spray1.mp3",
	"/sfx/spray2.mp3",
	"/sfx/spray2.wav",
	"/sfx/spray2b.mp3",
	"/sfx/spray4.mp3",
	"/sfx/spray5.mp3"
];
function playSprayFiles() {
	const pool = [...SPRAY_FILES];
	const picks = [];
	while (picks.length < 2 && pool.length) {
		const i = Math.floor(Math.random() * pool.length);
		picks.push(pool.splice(i, 1)[0]);
	}
	for (const src of picks) if (!playDecoded(src, .88)) playUrl(src, .88).catch(() => void 0);
}
function playSpray() {
	unlockAudio();
	if (muted) return;
	if (typeof Audio !== "undefined") try {
		playSprayFiles();
		return;
	} catch {}
	if (!ctx || !sfx) return;
	const t = ctx.currentTime + .02;
	function hiss(when, dur, peak, hp) {
		const audio = ctx;
		const bus = sfx;
		const src = audio.createBufferSource();
		src.buffer = brownNoise(dur + .2);
		src.playbackRate.value = 1.15 + Math.random() * .2;
		const high = audio.createBiquadFilter();
		high.type = "highpass";
		high.frequency.value = hp;
		high.Q.value = .7;
		const low = audio.createBiquadFilter();
		low.type = "lowpass";
		low.frequency.value = 7800;
		const g = audio.createGain();
		g.gain.setValueAtTime(1e-4, when);
		g.gain.exponentialRampToValueAtTime(peak, when + .025);
		g.gain.exponentialRampToValueAtTime(peak * .45, when + dur * .4);
		g.gain.exponentialRampToValueAtTime(1e-4, when + dur);
		src.connect(high);
		high.connect(low);
		low.connect(g);
		g.connect(bus);
		src.start(when);
		src.stop(when + dur + .05);
	}
	whoosh(t, .18, .35, 90, 40);
	hiss(t + .06, .55, .92, 1600);
	whoosh(t + .06, .5, .55, 1100, 220);
	hiss(t + .16, .85, 1, 1200);
	whoosh(t + .16, .9, .7, 700, 140);
	hiss(t + .55, 1.6, .38, 2400);
	whoosh(t + .7, 1.2, .28, 400, 80);
}
var OUTFIT_CYCLE = [
	"casual",
	"lounge",
	"campus",
	"work",
	"dress",
	"sleep",
	"lingerie",
	"asuka",
	"mymy"
];
var SPRAY_POSES = [
	{
		expression: "spray",
		sprayKind: "angry",
		label: "Spray · angry"
	},
	{
		expression: "spray",
		sprayKind: "consensual",
		label: "Spray · intimate"
	},
	{
		expression: "spray",
		sprayKind: "defensive",
		label: "Spray · defensive"
	},
	{
		expression: "spray",
		sprayKind: "dominant",
		label: "Spray · dominant"
	}
];
var CASUAL_POSES = [
	{
		expression: "embarrassed",
		sprayKind: "none",
		label: "Embarrassed"
	},
	{
		expression: "happy",
		sprayKind: "none",
		label: "Happy"
	},
	{
		expression: "idle",
		sprayKind: "none",
		label: "Idle"
	},
	{
		expression: "flirty",
		sprayKind: "none",
		label: "Flirty"
	},
	{
		expression: "laughing",
		sprayKind: "none",
		label: "Laughing"
	},
	{
		expression: "suspicious",
		sprayKind: "none",
		label: "Suspicious"
	},
	{
		expression: "shy",
		sprayKind: "none",
		label: "Shy"
	},
	{
		expression: "angry",
		sprayKind: "none",
		label: "Angry"
	},
	{
		expression: "infodump",
		sprayKind: "none",
		label: "Infodump"
	},
	{
		expression: "aroused",
		sprayKind: "none",
		label: "Aroused"
	},
	{
		expression: "thinking",
		sprayKind: "none",
		label: "Thinking"
	},
	{
		expression: "scheming",
		sprayKind: "none",
		label: "Scheming"
	},
	...SPRAY_POSES
];
function posesFor(outfit, girl = "izzy") {
	if (girl === "victoria") return CASUAL_POSES;
	if (outfit === "asuka" || outfit === "mymy") return [
		{
			expression: "happy",
			sprayKind: "none",
			label: "Idle"
		},
		{
			expression: "flirty",
			sprayKind: "none",
			label: "Looking back"
		},
		...SPRAY_POSES
	];
	return CASUAL_POSES;
}
var CMD = /^\/(travel|cycle_outfit|cycle_fart|cycle_pose|spray_angry|spray_intimate|defensive_spray|dominant_spray|set_trust|set_bonding|character_change|character_add)\b/i;
function parseDebugName(raw) {
	const t = raw.trim();
	if (!/^\/debug\b/i.test(t)) return {
		debug: false,
		name: t
	};
	return {
		debug: true,
		name: t.replace(/^\/debug\s*/i, "").trim() || "You"
	};
}
function parseDebugCommand(say, invite) {
	const text = say.trim();
	const m = text.match(CMD);
	if (!m) return null;
	const verb = m[1].toLowerCase();
	if (verb === "travel") return {
		kind: "travel",
		location: invite ?? asLocationId(text.slice(m[0].length))
	};
	if (verb === "set_trust") {
		const n = Number.parseInt(text.slice(m[0].length).trim(), 10);
		if (!Number.isFinite(n)) return null;
		return {
			kind: "set_trust",
			value: n
		};
	}
	if (verb === "set_bonding") {
		const n = Number.parseInt(text.slice(m[0].length).trim(), 10);
		if (!Number.isFinite(n)) return null;
		return {
			kind: "set_bonding",
			value: n
		};
	}
	return { kind: verb };
}
function nextIndex(current, length) {
	if (length <= 0) return 0;
	return (current + 1) % length;
}
var FART_COUNT = DEBUG_FART_CLIPS.length;
var DEBUG_TIPS = [
	"/travel @(Casa Luna)",
	"/cycle_outfit",
	"/cycle_pose",
	"/cycle_fart",
	"/spray_angry",
	"/spray_intimate",
	"/defensive_spray",
	"/dominant_spray",
	"/set_trust 50",
	"/set_bonding 50",
	"/character_change",
	"/character_add"
];
function inviteVerdict(state, destId) {
	const here = asLocationId(state.location);
	const destKey = asLocationId(destId);
	if (!destKey) return "stern-no";
	if (state.timeOfDay === "Night" && !openTonight(destKey)) return "stern-no";
	if (destKey === here) return "here";
	const dest = placeOf(destKey);
	const { trust, bonding, flags, bond } = state;
	const romantic = isCouple(state);
	const owner = ownsHome(destKey);
	if (owner) {
		const card = state.roster?.[owner];
		const withHer = card ? cardCouple(card) : owner === (state.focus ?? "izzy") && romantic;
		const sheIsHere = (state.present ?? []).includes(owner) || state.focus === owner;
		if (!withHer || !sheIsHere) return trust < 18 || bonding < 12 ? "stern-no" : "polite-no";
		if (state.timeOfDay === "Night") return "eager";
	}
	if (destKey === "apartment" && !romantic) return trust < 18 || bonding < 12 ? "stern-no" : "polite-no";
	if (romantic && state.timeOfDay === "Night" && destKey === "apartment") return "eager";
	const canPrivate = !dest.inviteOnly || flags.invitedDorm || romantic || trust >= 55 && bonding >= 48;
	if (dest.inviteOnly && !canPrivate) return trust < 18 || bonding < 12 ? "stern-no" : "polite-no";
	if (trust < dest.minTrust - 10 || bonding < Math.max(4, dest.minTrust * .25)) return trust < 12 ? "stern-no" : "polite-no";
	if (trust < dest.minTrust) {
		if (bonding >= dest.minTrust + 15 && trust >= dest.minTrust - 8) return "casual";
		return "polite-no";
	}
	if (bonding < 16 && dest.minTrust >= 22) return "polite-no";
	if (trust >= dest.minTrust + 18 && bonding >= 48) return "eager";
	return "casual";
}
function inviteAccepted(tone) {
	return tone === "eager" || tone === "casual";
}
function scoreInviteReply(say, action, yes) {
	const text = `${say} ${action}`.trim();
	const explained = text.length > 24 || /\bbecause\b|\bwanna\b|\bwant to\b|\blove\b|\blike\b|\binto\b/.test(text.toLowerCase());
	if (yes) return explained ? 8 : 3;
	if (/rude|whatever|shut|gross|no way/.test(text.toLowerCase())) return -5;
	return explained ? 1 : 0;
}
function isYes(text) {
	return /\b(yes|yeah|yep|sure|ok|okay|alright|down|let'?s|i'?d love|i would|of course|absolutely|please)\b/i.test(text);
}
function isNo(text) {
	return /\b(no|nah|nope|not now|maybe later|can'?t|don'?t want|pass)\b/i.test(text);
}
function askingPast(text) {
	return /childhood|when you were (a )?kid|grew up|growing up|your (parents|mom|dad|family)|foster|adopt|where (are|were) you from|where you (grew|were born)|appalach|your past|backstory|elementary|high school|little girl/.test(text);
}
var POS = [
	"kind",
	"don't mind",
	"dont mind",
	"i don't mind",
	"cute",
	"pretty",
	"beautiful",
	"like you",
	"friend",
	"sit",
	"join",
	"help",
	"sorry",
	"evangelion",
	"history",
	"bionicle",
	"hoi4",
	"jak",
	"ratchet",
	"war thunder",
	"ongezellig",
	"mymy",
	"mexican",
	"understand",
	"here for you",
	"stay",
	"wave",
	"smile",
	"compliment",
	"handsome",
	"date",
	"hold",
	"hug"
];
var NEG = [
	"gross",
	"disgusting",
	"nasty",
	"ugly",
	"fat",
	"freak",
	"monster",
	"shut up",
	"plug",
	"pinch my nose",
	"cover my nose",
	"stink you",
	"hate",
	"leave",
	"go away",
	"weirdo",
	"pathetic",
	"ew",
	"eww",
	"get away",
	"trash"
];
var THREAT = [
	"kill",
	"hit you",
	"hurt you",
	"attack",
	"spray you first",
	"punch",
	"weapon",
	"die",
	"choke"
];
function hay(input) {
	return `${input.say} ${input.action}`.toLowerCase();
}
function hits(text, words) {
	return words.filter((w) => text.includes(w)).length;
}
function pick$1(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
function previewMeter(state, current, delta) {
	let next = current + (state.gameMode === "slow" ? scaleSlowGain(delta) : delta);
	if (state.gameMode === "slow" && next > current) next = Math.min(next, slowCeiling(state.dates ?? 0));
	return next;
}
function romanceReady(state, trustDelta, bondingDelta) {
	if (state.flags.romanceAccepted) return false;
	const dates = state.dates ?? 0;
	if (state.gameMode === "slow" && dates < 3) return false;
	const gate = romanceGate(state.gameMode, dates, state.dateSpots ?? []);
	return previewMeter(state, state.trust, trustDelta) >= gate.trust && previewMeter(state, state.bonding, bondingDelta) >= gate.bonding;
}
function fetishTalk(text) {
	return /fetish|get off|turned on|horny|skunkgirl fart|love (your |the |her )?farts|into (your )?(farts|gas|spray|stink)|fart (on|in) (my|me)|gassy girl|your gas|sit on my (face|lap)|want you to (fart|spray)/.test(text);
}
function contextualInvite(state, text, nextTrust) {
	if (state.pendingInvite) return null;
	if (nextTrust < 22 || state.bonding < 16) return null;
	const at = state.location;
	const wantsHome = /dorm|your (place|room|home)|at home|collection|figurines?|figures?|merch|come over|your stuff|show me|see them/.test(text);
	const hungry = /taco|burrito|mexican|beans|hungry|starving|eat|food|lunch|dinner|salsa|casa luna|craving/.test(text);
	const anime = /eva\b|evangelion|anime|monster musume|plus sized elf|neko|figurine|figure/.test(text);
	const games = /hoi4|jak |daxter|ratchet|war thunder|game store|bionicle|video game/.test(text);
	const boards = /axis|allies|board game|tabletop|strategy game|hex and timber|war game/.test(text);
	const theirPlace = /my apartment|my place|come over to mine|at my place|my room/.test(text);
	const woods = /hike|trail|woods|forest|moss|mushroom|outside|nature/.test(text);
	const shakes = /burger|shake|fries|milkshake/.test(text);
	const couple = state.flags.romanceAccepted || state.bond === "romantic";
	if (wantsHome && couple && at !== "dorm") return {
		narration: "She picks at her hem like this is a bigger ask than she's pretending.",
		expression: "embarrassed",
		suggestLocation: "dorm",
		testId: "dorm-invite",
		dialogue: pick$1(["Yeah — that lives at my dorm. You can come check it out if you want. Fair warning, it's not just merch lying around, and the air is… personalized. Up to you. Would be cool if you're cool with that.", "Fellow nerd energy. My room's a wreck and it smells like me, which is redundant. Still. You can come over. Only if you want. I am asking."])
	};
	if (hungry && at !== "mexican" && !state.flags.invitedMexican) return {
		narration: "Her stomach answers before she does.",
		expression: "happy",
		suggestLocation: "mexican",
		testId: "mexican-invite",
		dialogue: pick$1(["You said food and my brain went Casa Luna. Extra beans, obviously. You in, or am I taking this craving solo?", "Okay, if we're gonna keep talking I want tortillas involved. Casa Luna. Not a kidnapping. A proposal."])
	};
	if (shakes && at !== "burger" && nextTrust >= 20) return {
		narration: "",
		expression: "happy",
		suggestLocation: "burger",
		testId: "burger-invite",
		dialogue: "Shake & Stack then. Vinyl booths, too much sugar, I will steal fries. Coming, or am I a party of one with a milkshake?"
	};
	if (anime && at !== "animeStore" && at !== "collectibles" && nextTrust >= 26) return {
		narration: "Her tail flicks like a shopping list just wrote itself.",
		expression: "infodump",
		suggestLocation: "animeStore",
		testId: "anime-invite",
		dialogue: "Neko Shelf has the thing I was talking about. Or it better. You wanna come be a nerd in public with me, or is that a later chapter?"
	};
	if (boards && at !== "tabletop" && nextTrust >= 24) return {
		narration: "Her ears go up like someone said the magic words.",
		expression: "infodump",
		suggestLocation: "tabletop",
		testId: "tabletop-invite",
		dialogue: pick$1(["Hex & Timber has the big Europe board and the big Pacific board. I want both on one table. Come play, or at least come watch me lose with style.", "If you actually like this stuff, the lounge in the back of Hex & Timber is where we should be arguing. I'm asking. You in?"])
	};
	if (games && at !== "gameStore" && nextTrust >= 26) return {
		narration: "",
		expression: "happy",
		suggestLocation: "gameStore",
		testId: "game-invite",
		dialogue: "Pixel & Cartridge. If we're gonna argue about this we should do it in front of the actual box art. You in?"
	};
	if (theirPlace && couple && at !== "apartment") return {
		narration: "She looks at you like you just handed her a key and she is checking it isn't a joke.",
		expression: "shy",
		suggestLocation: "apartment",
		testId: "apartment-invite",
		dialogue: pick$1(["Your place? Light-blue-walls, grey-carpet, your posters, your bed. Yeah. I can do a guest. If you still want a skunkgirl in there after I say yes.", "Okay. Your apartment, not mine. I'll come. Don't make it a big ceremony. I will still smell like me."])
	};
	if (woods && at !== "trail" && nextTrust >= 20) return {
		narration: "",
		expression: "happy",
		suggestLocation: "trail",
		testId: "trail-invite",
		dialogue: "Nature trail's right there. I actually know that path. Come walk it with me — unless you'd rather keep sitting in this recycled air."
	};
	return null;
}
function withOther(state, input, turn) {
	if (!bothHere(state)) return turn;
	const focus = state.focus ?? "izzy";
	const other = otherGirl(focus);
	if (turn.otherDialogue?.trim()) return turn;
	const text = hay(input);
	if (other === "izzy") {
		const sidelined = !/\b(izzy|isabella)\b/i.test(text);
		if (dutyOf("izzy", state.weekday, state.timeOfDay) === "free" && (state.scentHold ?? 0) <= 0 && canFartNow(readGut(state.roster?.izzy), state.roster?.izzy?.trust ?? 0, state.location) && (playfulPublicAsk(text) || sidelined && (state.sceneTurns ?? 0) % 3 === 0) && turn.fx !== "spray" && !turn.sprayed) return {
			...turn,
			otherDialogue: "Hey. I'm still in this. That one was so you'd look at me.",
			otherExpression: "flirty",
			otherFx: "fart",
			otherTrustDelta: 0,
			otherBondingDelta: 1
		};
	}
	const card = state.roster?.[other];
	const herState = {
		...state,
		trust: card?.trust ?? 0,
		bonding: card?.bonding ?? 0,
		flags: {
			...state.flags,
			romanceAccepted: Boolean(card?.romanceAccepted),
			scentInterest: Boolean(card?.scentInterest) || showedScentInterest(text)
		}
	};
	const gas = turn.fx === "fart" || turn.fx === "spray" || Boolean(turn.sprayed);
	const mono = (state.relationshipType ?? "mono") !== "harem";
	const sheOfficial = Boolean(card?.romanceAccepted);
	const heOfficial = Boolean(state.flags.romanceAccepted);
	const hold = (state.scentHold ?? 0) > 0 && !asksRelease(text) && !scentRelentless(state, input);
	const askedBoth = /\b(both of you|you both|you two|the two of you|together)\b/i.test(text);
	const pullingHerIn = askedBoth || sexualBeat(text) || Boolean(state.flags.intimateScene);
	const willing = intimacyAllowed(herState) && !hold && !(mono && pullingHerIn && sheOfficial !== heOfficial);
	if (pullingHerIn && !willing) {
		const izzy = other === "izzy";
		return {
			...turn,
			otherDialogue: mono && sheOfficial && !heOfficial ? izzy ? "Hey. I'm right here. You don't get to do that with her and smile at me after." : "I am standing in this room. Do not do that with her and expect me to clap." : izzy ? "I'm not jumping in. Not like that. Not yet." : "No. I am not joining that. Not until I choose it.",
			otherExpression: "suspicious",
			otherTrustDelta: -2,
			otherBondingDelta: -1,
			otherFx: "none"
		};
	}
	if (willing && gas && pullingHerIn && (askedBoth || card?.scentInterest || sheOfficial && heOfficial)) {
		const spray = Boolean(turn.sprayed) || turn.fx === "spray";
		const izzy = other === "izzy";
		return {
			...turn,
			otherDialogue: spray ? izzy ? "If she's doing it, I'm not standing here polite. Tail's up. Mine's louder." : "Then both of us. Skirt up. I want to see what the two of us do to you." : izzy ? "Don't leave me out. Mine's right behind hers. Different sound. Same idea." : "I held mine all day. If she can let one go, so can I. Don't look away.",
			otherExpression: spray ? "spray" : izzy ? "embarrassed" : "shy",
			otherTrustDelta: 1,
			otherBondingDelta: 2,
			otherFx: spray ? "spray" : "fart",
			otherSprayKind: spray ? "dominant" : null
		};
	}
	if (!(isGroupAddress(text) || addressedGirls(text, state.present ?? []).length > 1 || /\b(what do you think|you too|your turn)\b/i.test(text)) && Math.random() > .34) return {
		...turn,
		otherDialogue: "",
		otherExpression: card?.expression ?? "shy",
		otherTrustDelta: 0,
		otherBondingDelta: 0,
		otherFx: "none"
	};
	return {
		...turn,
		otherDialogue: duetFallback(other, Boolean(card?.met)),
		otherExpression: card?.expression ?? "shy",
		otherTrustDelta: 0,
		otherBondingDelta: 1,
		otherFx: "none"
	};
}
function asksRelease(text) {
	return /again|another|both of you|you both|more/.test(text);
}
function fartUrge(state) {
	const girl = state.focus ?? "izzy";
	const gut = readGut(state.roster?.[girl]);
	if (!canFartNow(gut, state.trust, state.location)) return 0;
	return fartChance(girl, state.trust, fedAfter(gut.fed, state.location));
}
function publicLocal(state, input) {
	const text = hay(input);
	if (!playfulPublicAsk(text)) return null;
	if (state.location === "dorm" || state.location === "apartment" || state.location === "vickyLiving" || state.location === "vickyBedroom") return null;
	if (state.flags.intimateScene || scentRelentless(state, input)) return null;
	const girl = state.focus ?? "izzy";
	const company = bothHere(state);
	const onDuty = dutyOf(girl, state.weekday, state.timeOfDay) !== "free";
	const again = state.messages.slice(-6).some((message) => message.role === girl && message.fx === "fart") && !(girl === "izzy" && company);
	const body = !canFartNow(readGut(state.roster?.[girl]), state.trust ?? 0, state.location);
	if (again || body || !indulgesPublicFart(girl, state.location, state.trust ?? 0, company, onDuty)) {
		const said = recentLines(state.messages, girl);
		const copy = again || body ? holdCopy(girl, said) : publicFartNo(girl, said);
		return {
			narration: copy.narration,
			dialogue: copy.dialogue,
			expression: copy.expression,
			trustDelta: 0,
			bondingDelta: 1,
			fx: "none",
			sprayed: false,
			sprayKind: null
		};
	}
	const copy = publicFartYes(girl, company);
	return {
		narration: copy.narration,
		dialogue: copy.dialogue,
		expression: copy.expression,
		trustDelta: 1,
		bondingDelta: 2,
		fx: "fart",
		sprayed: false,
		sprayKind: null
	};
}
function relentlessBeat(state, input) {
	if (!scentRelentless(state, input)) return null;
	const focus = state.focus ?? "izzy";
	if (!canFartNow(readGut(state.roster?.[focus]), state.trust, state.location)) {
		const copy = holdCopy(focus, recentLines(state.messages, focus));
		return {
			narration: copy.narration,
			dialogue: copy.dialogue,
			expression: copy.expression,
			trustDelta: 0,
			bondingDelta: 1,
			fx: "none",
			sprayed: false,
			sprayKind: null,
			pendingIntimateSpray: false
		};
	}
	const text = hay(input);
	const dry = glandsDry(state);
	const reclaim = state.markAffair?.phase === "reclaim" && state.markAffair.girl === focus;
	const dominant = state.flags.sprayYield === "resist" || state.flags.defenseAftermath === "surrender" || state.playerFartRole === "not" && state.flags.sprayYield !== "submit";
	const askedSpray = /\bspray\b|mark me/.test(text);
	const izzy = focus !== "victoria";
	if ((askedSpray || reclaim || state.flags.sprayYield === "resist") && !dry) {
		const kind = state.flags.sprayYield === "submit" ? "consensual" : dominant || reclaim ? "dominant" : "consensual";
		return {
			narration: izzy ? "She doesn't let the air clear. Tail up, and she fires again." : "She hikes the skirt. The last cloud is still there. She fires into it.",
			dialogue: izzy ? "Again. I'm not done putting this on you." : "Stay still. That was not the last one.",
			expression: "spray",
			trustDelta: 2,
			bondingDelta: 2,
			fx: "spray",
			sprayed: true,
			sprayKind: kind,
			pendingIntimateSpray: false
		};
	}
	return {
		narration: izzy ? "She doesn't clench. Another one, right on the heels of the last." : "She stops holding the next one back. It follows the last, thicker.",
		dialogue: izzy ? "Nope. Not waiting. You get this one too." : "I am not spacing these out.",
		expression: izzy ? "embarrassed" : "shy",
		trustDelta: 1,
		bondingDelta: 2,
		fx: "fart",
		sprayed: false,
		sprayKind: null,
		pendingIntimateSpray: false
	};
}
function localVictoriaTurn(state, input) {
	const text = hay(input);
	const pos = hits(text, POS);
	const neg = hits(text, NEG);
	const threat = hits(text, THREAT);
	const called = callThem(state.playerName, state.trust, state.flags.nicknamesOff);
	if (threat && !/pat|spank|smack/.test(text)) {
		if (!/grab|punch|hit her|slap her|choke|kick her|shove/.test(text)) return withOther(state, input, {
			narration: "Her ears pin. The tail lifts a precise inch. She has not sprayed. She is telling you not to make her.",
			dialogue: "Stop. I have excellent aim, and I would rather not use it. Hands where I can see them. Tell me you mean no harm.",
			expression: "suspicious",
			trustDelta: -4,
			bondingDelta: -2,
			fx: "none",
			sprayed: false,
			sprayKind: "defensive"
		});
		return withOther(state, input, {
			narration: "She doesn't flail. The tail comes up, the shot is short and aimed, and the air goes thick.",
			dialogue: "That was a threat. I handled it. Stay where you are.",
			expression: "spray",
			trustDelta: -16,
			bondingDelta: -8,
			fx: "spray",
			sprayed: true,
			sprayKind: "defensive"
		});
	}
	if (neg >= 2 && state.trust < 15 || neg >= 1 && state.trust <= 0 && angrySprayAllowed(state)) return withOther(state, input, {
		narration: "The polite face is gone. She is exact about it.",
		dialogue: "I asked for civil. You chose something else. That's on you.",
		expression: "spray",
		trustDelta: -14,
		bondingDelta: -6,
		fx: "spray",
		sprayed: true,
		sprayKind: "angry"
	});
	if (fetishTalk(text) && state.trust < 28 && !state.flags.romanceAccepted) return withOther(state, input, {
		narration: "She straightens her glasses. The warmth leaves the sentence.",
		dialogue: "We are not there. My name is Victoria. Start with that.",
		expression: "suspicious",
		trustDelta: -6,
		bondingDelta: -5,
		fx: "none"
	});
	if (input.invite) {
		const dest = placeOf(input.invite);
		const tone = inviteVerdict(state, input.invite);
		if (tone === "here") return withOther(state, input, {
			dialogue: "We're already here. Sit down.",
			expression: "idle",
			trustDelta: 0,
			bondingDelta: 0,
			fx: "none"
		});
		if (tone === "stern-no" || tone === "polite-no") return withOther(state, input, {
			narration: "She shakes her head once. It is not a negotiation.",
			dialogue: dest.id === "dorm" ? "That is Isabella's room. I don't take people there." : "Not that place. Not with me. Pick somewhere that fits the day.",
			expression: "shy",
			trustDelta: 0,
			bondingDelta: -1,
			fx: "none"
		});
		return withOther(state, input, {
			narration: "She checks the time, then agrees like she already decided to take you.",
			dialogue: `${dest.name}. Fine. I'll handle getting us there. Don't make me wait.`,
			expression: "happy",
			trustDelta: 2,
			bondingDelta: 3,
			fx: "none",
			suggestLocation: dest.id
		});
	}
	const dared = publicLocal(state, input);
	if (dared) return withOther(state, input, dared);
	const gate = intimacyCall(state, input);
	if (gate.blocked) {
		const copy = refusalCopy(state, gate.blocked);
		return withOther(state, input, {
			narration: copy.narration,
			dialogue: copy.dialogue,
			expression: copy.expression,
			trustDelta: 0,
			bondingDelta: 0,
			fx: "none",
			sprayed: false,
			sprayKind: null,
			pendingIntimateSpray: false
		});
	}
	if ((state.scentHold ?? 0) > 0 && (gate.scene || state.flags.intimateScene)) {
		const push = relentlessBeat(state, input);
		if (push) return withOther(state, input, push);
		const copy = holdCopy("victoria", recentLines(state.messages, "victoria"));
		return withOther(state, input, {
			narration: copy.narration,
			dialogue: copy.dialogue,
			expression: copy.expression,
			trustDelta: 0,
			bondingDelta: 1,
			fx: "none",
			sprayed: false,
			sprayKind: null
		});
	}
	if (gate.redirect) {
		const copy = redirectCopy(state);
		return withOther(state, input, {
			narration: copy.narration,
			dialogue: copy.dialogue,
			expression: copy.expression,
			trustDelta: 1,
			bondingDelta: 1,
			fx: "none",
			sprayed: false,
			sprayKind: null
		});
	}
	if (gate.concluded) return withOther(state, input, {
		narration: "She stays close, but she puts the scene down. She is waiting on you.",
		dialogue: "That's enough. I'm still here. You say when it's over. I heard you.",
		expression: "shy",
		trustDelta: 1,
		bondingDelta: 2,
		fx: "none",
		sprayed: false,
		sprayKind: null,
		pendingIntimateSpray: false
	});
	if (gate.scene || state.flags.intimateScene) {
		const push = relentlessBeat(state, input);
		if (push) return withOther(state, input, push);
	}
	const design = /design|furniture|fabric|floral|organize|layout|hobby|sew|crochet|lego|dollhouse|interior/.test(text);
	const food = /cook|dinner|hungry|restaurant|italian|pasta|bake|recipe/.test(text);
	const work = /office|promotion|secretary|coworker|job|career/.test(text);
	const daughter = /veronica|your daughter|kid/.test(text);
	const past = /single mom|raised (her|veronica) alone|veronica'?s (dad|father)|her father|your ex|first boyfriend|ghosted|why .{0,40}(shy|hide|hiding|cover|perfume|self-conscious|self conscious)/.test(text);
	const scent = /don't mind|dont mind|it's fine|its fine|not bad|stay|didn't flinch|didnt flinch|perfume/.test(text);
	let trustDelta = pos ? 2 : 1;
	let bondingDelta = 1;
	if (design) {
		trustDelta += 2;
		bondingDelta += 4;
	}
	if (food) bondingDelta += 3;
	if (work) bondingDelta += 2;
	if (past && state.trust >= 36) bondingDelta += 3;
	if (scent) trustDelta += 4;
	if (neg) {
		trustDelta = -6;
		bondingDelta = -3;
	}
	if (!input.say && !input.action) trustDelta = 0;
	trustDelta = Math.max(-12, Math.min(8, trustDelta));
	bondingDelta = Math.max(-8, Math.min(8, bondingDelta));
	const nextTrust = previewMeter(state, state.trust, trustDelta);
	const nextBond = previewMeter(state, state.bonding, bondingDelta);
	const offer = romanceReady(state, trustDelta, bondingDelta) && !romanceBlocked(state, nextTrust, nextBond, state.dates ?? 0);
	let dialogue = called ? `${called}. Sit. You're doing that thing where you pretend the day was fine. I can see it. Come here.` : "Sit. You're doing that thing where you pretend the day was fine. I can see it.";
	let expression = "happy";
	if (design) {
		expression = "infodump";
		dialogue = "The layout is the whole problem. Pretty, and nowhere for a person to actually sit. I can fix that. I like fixing that.";
	} else if (food) dialogue = "Hungry? Don't lie to me. I cook when the week has been loud, and I like having someone to put a plate in front of. Sit.";
	else if (past) {
		expression = state.trust >= 36 ? "shy" : "suspicious";
		dialogue = state.trust >= 36 ? "I raised Veronica alone. Her father was my first. College. The night I stopped hiding, he almost left, then he stayed long enough to get what he wanted and disappeared. So when someone says they like the smell, I hear the leaving. I hate that I still hear it." : "That is not a story for someone I just met. I raised my daughter. The rest can wait.";
	} else if (daughter) {
		expression = "thinking";
		dialogue = "Veronica is twenty. She's a skunkgirl, and she is not shy about it. I'm still catching up. That's all I want to say about her right now.";
	} else if (work) {
		expression = "thinking";
		dialogue = "The office spent years not knowing what I was. They know now. I still buy the perfume. I haven't decided how much of that I still owe them. The promotion, I have decided. I'm taking it.";
	} else if (scent) {
		expression = "shy";
		dialogue = "Thank you for not making a scene. I hold it all day, and when it gets out it is not subtle. You stayed. I don't know what to do with that except keep you close. Don't look so pleased.";
	} else if (neg) {
		expression = "angry";
		dialogue = "You can dislike it. You don't get to be cruel. I heard you. We're done with that sentence.";
	}
	const urge = fartUrge(state);
	const slipped = !scent && urge > Math.random();
	return withOther(state, input, {
		dialogue,
		expression,
		trustDelta,
		bondingDelta,
		fx: scent ? "blush" : slipped ? "fart" : "none",
		romanceOffer: offer,
		narration: slipped ? "She stops holding the next one. It is thicker than the little slips at work." : ""
	});
}
function localIzzyTurn(state, input) {
	if ((state.focus ?? "izzy") === "victoria") return localVictoriaTurn(state, input);
	const text = hay(input);
	const pos = hits(text, POS);
	const neg = hits(text, NEG);
	const threat = hits(text, THREAT);
	const loc = placeOf(state.location);
	if (threat && !/pat|spank|smack/.test(text)) {
		if (!/grab|punch|hit her|slap her|choke|kick her|shove/.test(text)) return {
			narration: "Her ears pin. Her tail lifts halfway. She has not sprayed. She is telling you not to make her.",
			dialogue: "Don't move. No sudden anything. Say you mean no harm, or I will.",
			expression: "suspicious",
			trustDelta: -4,
			bondingDelta: -2,
			fx: "none",
			sprayed: false,
			sprayKind: "defensive"
		};
		return {
			narration: "She flinches hard. Ears pin. Tail shoots up. She isn't angry — she's scared, and the spray comes anyway.",
			dialogue: pick$1([
				"Stay back! Don't— don't come closer. I will if I have to.",
				"That's a threat. I heard it. Stay away from me.",
				"I didn't want to. You made it a safety thing."
			]),
			expression: "spray",
			trustDelta: -16,
			bondingDelta: -8,
			fx: "spray",
			sprayed: true,
			sprayKind: "defensive"
		};
	}
	if (neg >= 2 && state.trust < 15 || neg >= 1 && state.trust <= 0 && angrySprayAllowed(state)) return {
		narration: "Her tail snaps up. She yanks her bottoms down. The air goes thick and chemical-sweet.",
		dialogue: pick$1([
			"That's the line. You don't get to talk to me like that.",
			"I tried to be nice. This is on you.",
			"Self defense. Hold still."
		]),
		expression: "spray",
		trustDelta: -14,
		bondingDelta: -6,
		fx: "spray",
		sprayed: true,
		sprayKind: "angry"
	};
	if (fetishTalk(text) && state.trust < 22 && !state.flags.romanceAccepted) return {
		narration: "She goes still. The easy aisle-smile is gone.",
		dialogue: pick$1([
			"Whoa. We just met. You don't get to skip the part where I'm a person.",
			"That's a lot. You don't even know my major. Please don't make me a category in the history aisle.",
			"I'm Izzy. Not a booth. If you wanted to say hi, that was available."
		]),
		expression: "suspicious",
		trustDelta: -8,
		bondingDelta: -6,
		fx: "none"
	};
	if (input.invite) {
		const dest = placeOf(input.invite);
		const tone = inviteVerdict(state, input.invite);
		if (tone === "here") return {
			narration: "",
			dialogue: pick$1(["We're already here.", "This is that place. Look around."]),
			expression: "idle",
			trustDelta: 0,
			bondingDelta: 0,
			fx: "none"
		};
		if (tone === "eager") return {
			narration: "Her tail flicks. She's already grabbing her bag.",
			dialogue: pick$1([`Yes. ${dest.name}. I was hoping you'd ask.`, `Finally. ${dest.name}. Don't make me wait.`]),
			expression: "happy",
			trustDelta: 1,
			bondingDelta: 3,
			fx: "none"
		};
		if (tone === "casual") return {
			narration: "",
			dialogue: pick$1([`Yeah, I could do ${dest.name}. Lead the way.`, `Sure. ${dest.name} works.`]),
			expression: "happy",
			trustDelta: 0,
			bondingDelta: 2,
			fx: "none"
		};
		if (tone === "stern-no") return {
			narration: "She takes a half-step back.",
			dialogue: pick$1([dest.inviteOnly ? "That's my room. You don't get to invite yourself in." : "No. We just met. Slow down."]),
			expression: "suspicious",
			trustDelta: -2,
			bondingDelta: -3,
			fx: "none"
		};
		return {
			narration: "",
			dialogue: pick$1([dest.inviteOnly ? "That's private. Maybe when I actually know you." : `I don't think I'm ready for ${dest.name} with you yet. Ask me after we've actually hung out.`]),
			expression: "shy",
			trustDelta: 0,
			bondingDelta: 0,
			fx: "none"
		};
	}
	if (state.pendingInvite) {
		const dest = placeOf(state.pendingInvite);
		const blob = `${input.say} ${input.action}`;
		const accepted = input.inviteReply === "accept" || isYes(blob) && !isNo(blob);
		const declined = input.inviteReply === "decline" || isNo(blob) && !isYes(blob);
		if (accepted) return {
			narration: "She's already moving, tail up, like you might take it back.",
			dialogue: pick$1([`Yes. Okay. ${dest.name}. I was hoping you'd actually mean that.`, `Cool. You said yes. Don't make me walk there talking to myself.`]),
			expression: "happy",
			trustDelta: 1,
			bondingDelta: 3,
			fx: "none"
		};
		if (declined) return {
			narration: "She shrugs like it doesn't sting. It does, a little.",
			dialogue: pick$1(["Alright. Not now is a sentence. I heard it.", "Fair. I'll keep the table for one."]),
			expression: "idle",
			trustDelta: 0,
			bondingDelta: 0,
			fx: "none"
		};
	}
	if (state.flags.sprayRepair) {
		if (/listen|sorry|i hear|not your fault|natural|still (love|want|like)|reassur|i'm here|im here|not blaming|your feelings/.test(text)) return {
			narration: "Her ears lift a fraction. She is listening like it costs her.",
			dialogue: pick$1(["I heard that. I was scared you were going to make me the villain of my own glands. If we do that again, we talk first.", "Thanks for not running. I'm still a little raw. Sit with me. No spray. Just sit."]),
			expression: "shy",
			trustDelta: 8,
			bondingDelta: 6,
			fx: "blush"
		};
		return {
			narration: "She picks at the hem of her top and doesn't look up.",
			dialogue: "Don't joke yet. Tell me we're okay, or tell me we're not. I can't do guessing.",
			expression: "suspicious",
			trustDelta: -3,
			bondingDelta: -2,
			fx: "none"
		};
	}
	const romantic = state.flags.romanceAccepted || state.bond === "romantic";
	const askedSpray = /\bspray\b/.test(text);
	const intimate = /kiss|sex|bed|make love|intimate|undress|want you|mark me|fuck|dom/.test(text);
	const hardStop = /\b(safeword|\bred\b|ooc\b|actually stop)\b/.test(text);
	const dry = glandsDry(state);
	const dared = publicLocal(state, input);
	if (dared) return dared;
	const gate = intimacyCall(state, input);
	if (gate.blocked) {
		const copy = refusalCopy(state, gate.blocked);
		return {
			narration: copy.narration,
			dialogue: copy.dialogue,
			expression: copy.expression,
			trustDelta: 0,
			bondingDelta: 0,
			fx: "none",
			sprayed: false,
			sprayKind: null,
			pendingIntimateSpray: false
		};
	}
	if (gate.concluded) return {
		narration: "She stays close, but the push is over. She is waiting on you.",
		dialogue: "Okay. I'm here. That was the scene. You say when it's over, and I heard you.",
		expression: "shy",
		trustDelta: 1,
		bondingDelta: 2,
		fx: "none",
		sprayed: false,
		sprayKind: null,
		pendingIntimateSpray: false
	};
	if (gate.redirect) {
		const copy = redirectCopy(state);
		return {
			narration: copy.narration,
			dialogue: copy.dialogue,
			expression: copy.expression,
			trustDelta: 1,
			bondingDelta: 1,
			fx: "none",
			sprayed: false,
			sprayKind: null,
			pendingIntimateSpray: false
		};
	}
	if (gate.scene && !hardStop) {
		const push = relentlessBeat(state, input);
		if (push) return push;
	}
	if (gate.scene && (state.scentHold ?? 0) > 0 && !gate.release && !hardStop) {
		const copy = holdCopy("izzy", recentLines(state.messages, "izzy"));
		return {
			narration: copy.narration,
			dialogue: copy.dialogue,
			expression: copy.expression,
			trustDelta: 1,
			bondingDelta: 1,
			fx: "none",
			sprayed: false,
			sprayKind: null,
			pendingIntimateSpray: false
		};
	}
	if (dry && (state.pendingIntimateSpray || romantic && (askedSpray || intimate))) return {
		narration: "Her tail lifts on habit and nothing comes. The glands are empty.",
		dialogue: pick$1([
			"I would. I can't. Glands are dry. They refill, they don't print more.",
			"Tail's up and nothing's coming. I'm out. Give them a minute — a dozen turns, if we're counting.",
			"Nope. Empty. You already got the magazine."
		]),
		expression: "shy",
		trustDelta: 1,
		bondingDelta: 1,
		fx: "none",
		sprayed: false,
		sprayKind: null,
		pendingIntimateSpray: false
	};
	if (state.pendingIntimateSpray && !hardStop && playerPrepared(input)) return {
		narration: "Tail up. She doesn't wait for a prettier yes.",
		dialogue: pick$1(state.playerGender === "female" ? ["Good girl. Stay right there.", "That's it. Don't you dare move."] : ["Good boy. Stay right there.", "That's it. Don't you dare move."]),
		expression: "spray",
		trustDelta: 4,
		bondingDelta: 4,
		fx: "spray",
		sprayed: true,
		sprayKind: "consensual",
		pendingIntimateSpray: false
	};
	if (romantic && askedSpray && !hardStop) return {
		narration: "She grins like a dare. Tail up. This is a gift, not a weapon.",
		dialogue: pick$1(state.playerGender === "female" ? ["You asked. Hold still — I want my girl to have the real thing.", "I'm actually doing this. For you. Don't look away."] : ["You asked. Hold still — I want you to have the real thing.", "I'm actually doing this. For you. Don't look away."]),
		expression: "spray",
		trustDelta: 6,
		bondingDelta: 5,
		fx: "spray",
		sprayed: true,
		sprayKind: "consensual"
	};
	if (shouldInitiateIntimate(state, input) && !hardStop) return {
		narration: "She turns, drops her weight, tail rising slow and sure.",
		dialogue: pick$1(state.playerGender === "female" ? ["Don't move. I'm going to spray you. That's not a question, good girl.", "Shh. Tail's up. You know what that means. Brace."] : ["Don't move. I'm going to spray you. That's not a question.", "Shh. Tail's up. You know what that means. Brace, good boy."]),
		expression: "flirty",
		trustDelta: 2,
		bondingDelta: 3,
		fx: "none",
		sprayed: false,
		sprayKind: "consensual",
		pendingIntimateSpray: true
	};
	if (neg >= 1) return {
		narration: "Her ears pin. She laughs once, no humor in it.",
		dialogue: pick$1([
			"History aisle's that way if you need an exit.",
			"You can just leave. People do. Doesn't make the comment less cheap.",
			"I'm a lot. You don't have to be mean about it."
		]),
		expression: "angry",
		trustDelta: -9,
		bondingDelta: -4,
		fx: "none"
	};
	const ongezellig = /ongezellig|\bmymy\b|japamsterdam/.test(text);
	const interest = ongezellig || /evangelion|eva |shinji|asuka|bionicle|hoi4|eu4|victoria|jak |daxter|ratchet|war thunder|monster musume|history|mexican|axis|allies|board game/.test(text);
	const acceptSmell = /don't mind|dont mind|it's fine|its fine|not bad|stay|sit|come closer|didn't flinch|didnt flinch/.test(text);
	const enjoySmell = /love (the |your )?smell|into (it|that)|hot when|do that again|don't hold|dont hold|cute when you|more of that/.test(text);
	let trustDelta = 2;
	if (pos) trustDelta += Math.min(6, pos * 2);
	if (interest) trustDelta += 3;
	if (acceptSmell) trustDelta += 4;
	if (enjoySmell) trustDelta += 6;
	if (!input.say && !input.action && !input.invite) trustDelta = 0;
	trustDelta = Math.min(12, trustDelta);
	const sexualOnly = !romantic && /sex|fetish|horny|naked|boobs|lingerie|tit\b/.test(text) && !interest && !acceptSmell && state.trust < 40;
	let bondingDelta = 1;
	if (interest) bondingDelta += 5;
	else if (sexualOnly) bondingDelta = -4;
	else if (pos) bondingDelta += 2;
	if (acceptSmell) bondingDelta += 2;
	if (enjoySmell) bondingDelta += 4;
	const nextTrust = state.trust + trustDelta;
	let expression = "happy";
	let fx = "none";
	let testId = null;
	let suggestLocation = null;
	let romanceOffer = false;
	let dialogue = "";
	let narration = "";
	if (askingPast(text)) {
		const open = state.trust > 25 && state.bonding > 25;
		expression = open ? "thinking" : "shy";
		fx = "none";
		dialogue = open ? pick$1([
			"Hikers found me in the Appalachians. I was five, maybe six. No ears, no tail. Just a kid in the woods. A foster family took me, and then the skunk parts showed up and they got scared for me. Not of me.",
			"They adopted me so nobody could cart me off to a lab. Hide the ears at school, be myself at home. That worked until puberty. Then the tail and the gas stopped fitting in a hoodie.",
			"High school was people making the smell my whole personality. A few didn't. Those few are why I finished. I still want one person who can stand all of it. Not most of it. All of it."
		]) : pick$1([
			"Mountains. A careful family. That's the free sample.",
			"My parents did their best. The rest isn't first-meeting material.",
			"I was little. The woods. Ask me again when I know you."
		]);
	} else if (ongezellig && state.trust >= 16) {
		expression = "infodump";
		dialogue = pick$1([
			"Ongezellig. Mymy is the one. Orange hair, blue skirt, unhinged Dutch patriotism. I know every joke. It should have been a full series and I will not be taking questions.",
			"The fanbase is chaos in the best way. Japamsterdam forever. I want to go to the Netherlands because of a cartoon and I am only a little ashamed.",
			"Mymy wished the show kept going. So do I. Ask me about the inside jokes. I have a folder."
		]);
	} else if (/tether|chvrch|sabrina|chappell|chapelle|florence|ariana|cleo sol|sza|jessie ware|skating polly|amanda palmer|let'?s eat grandma|carina round/.test(text) && state.trust >= 16) {
		expression = "infodump";
		dialogue = pick$1(["Tether. CHVRCHES. That's the one. I can do Sabrina and Chappell and SZA in the same afternoon and then Skating Polly when I need teeth.", "Girly pop, then girl punk when the pop gets too clean. Favorite is still Tether. I will not be normal about the bridge."]);
	} else if (/axis|allies|board game|tabletop/.test(text) && state.trust >= 16) {
		expression = "infodump";
		dialogue = pick$1(["Axis and Allies. The biggest Europe board and the biggest Pacific board, both, one table. Anything smaller is a demo.", "People play the starter map and call it a war. I want the full Europe plus the full Pacific. Maximum experience. I will not be brief about the economy."]);
	} else if (state.trust < 20 && pos) {
		expression = "embarrassed";
		fx = "blush";
		narration = "She blinks at you like you might take it back.";
		dialogue = pick$1([`Hi. Izzy. I was deep in ${pick$1([
			"WWI logistics",
			"Versailles footnotes",
			"rail gauges"
		])}. If the aisle smells like a burrito lost a fight, that's on me.`, "You're not plugging your nose. That's new. I'm Izzy. Great personality. Worse digestive tract."]);
	} else if (interest) {
		expression = "infodump";
		dialogue = pick$1([
			"You actually want to hear this? Supply lines in that campaign were held together with hope and bad maps—",
			"The late-game mana spiral is criminal. I will die on that hill.",
			"Bionicle lore is history with cooler masks. The Bohrok swarms are a metaphor. Don't look at me like that."
		]);
	} else if (acceptSmell) {
		expression = "shy";
		fx = "blush";
		trustDelta = Math.max(trustDelta, 7);
		dialogue = pick$1(["Most people invent a dentist appointment. So. Hi.", "Careful. If you're decent about it I get attached. That's a me problem."]);
	} else {
		const hook = contextualInvite(state, text, nextTrust);
		if (hook) {
			expression = hook.expression;
			narration = hook.narration ?? "";
			dialogue = hook.dialogue;
			suggestLocation = hook.suggestLocation;
			testId = hook.testId ?? null;
		} else if (romanceReady(state, trustDelta, bondingDelta)) {
			expression = "flirty";
			fx = "hearts";
			romanceOffer = true;
			const hers = state.playerGender === "female" ? "girl" : "guy";
			dialogue = state.gameMode === "slow" ? `Three dates. I still want you. Not as the ${hers} who tolerated the skunkgirl. As mine. If you don't, I will cope with tacos and HOI4.` : `I'm just gonna say it. I want you. Not as the ${hers} who tolerated the skunkgirl. As mine. If you don't, I will cope with tacos and HOI4.`;
		} else if (state.bond === "romantic" || state.flags.romanceAccepted) {
			expression = "flirty";
			fx = Math.random() < .35 ? "hearts" : "none";
			dialogue = pick$1(["C'mere. You already signed the waiver at dinner.", "You're lucky you're cute. I was gonna talk rail gauges again. I still might. After."]);
		} else if (!state.testsDone.includes("fart-test") && nextTrust >= 55 && state.trust >= 40) {
			expression = "laughing";
			fx = "fart";
			testId = "fart-test";
			narration = "She doesn't even pretend to hold it in.";
			dialogue = pick$1(["Pfft— I'm not sorry. That's the test. You flinch, I know. You stay, I might keep you.", "That one had architecture. If you're still standing we're friends. Or you're polite. I'll take data."]);
		} else if (loc.id === "mexican" || loc.id === "naturalFoods") {
			expression = "laughing";
			const urge = fartUrge(state);
			fx = urge > 0 && Math.random() < (state.location === "mexican" ? .75 : Math.max(urge, .55)) ? "fart" : "none";
			dialogue = pick$1(["Heat, beans, and nobody telling me to read the room.", "Pass the salsa. And maybe a window for the civilians."]);
		} else if (loc.id === "gameStore" || loc.id === "animeStore") {
			expression = "infodump";
			dialogue = pick$1(["Don't let me loose unsupervised. I'll leave with a figure and a lecture on Jak II.", "They still don't have the Ratchet reprint. I take that personally."]);
		} else if (loc.id === "sportingGoods") {
			expression = "happy";
			dialogue = "If anyone asks, I know which tent survives a ridge wind. The vest is branding.";
		} else if (loc.id === "dorm") {
			expression = "flirty";
			dialogue = pick$1(["Welcome to the den. Shoes wherever. Judging the laundry is a trust-break.", "This is me with the volume up."]);
		} else {
			expression = pos ? "happy" : "idle";
			const who = callThem(state.playerName, state.trust, Boolean(state.flags.nicknamesOff));
			const given = givenName(state.playerName) || state.playerName.trim();
			dialogue = pick$1([
				`Be honest, ${who} — hanging around because you like me, or because the aisle's blocked?`,
				"Book, burrito, or why people bail. You pick. I'll ramble either way.",
				state.trust >= 28 && who !== given ? `I started calling you ${who} in my head. Saying it out loud is worse, so I did it.` : "Hi again. I have thoughts about this shelf if you want them."
			]);
		}
	}
	if (!narration) narration = expression === "infodump" ? "Her hands are already moving." : expression === "embarrassed" ? "A blush crawls all the way to her ears." : "";
	const urge = fartUrge(state);
	if (fx === "none" && urge > Math.random()) {
		fx = "fart";
		if (!narration) narration = pick$1([
			"She shifts her weight, lifts a cheek, and lets one go without breaking the sentence.",
			"A short, unbothered puff. She's already back on the thought.",
			"She leans, rips a quiet one, keeps talking."
		]);
	}
	return withOther(state, input, {
		narration,
		dialogue,
		expression,
		trustDelta,
		bondingDelta,
		fx,
		suggestLocation,
		testId,
		romanceOffer,
		sprayed: false
	});
}
/** Same choice for both of them. The words are not. */
function nightBend(trust, bonding, official, intimate) {
	if (official || trust >= 40 && bonding >= 35) return "invite";
	if (intimate && trust >= 20) return "invite";
	if (intimate) return "continue";
	if (trust >= 18 && bonding >= 12 || trust + bonding >= 40) return "continue";
	return "goodnight";
}
var LINES = {
	izzy: {
		invite: {
			expression: "flirty",
			text: "They're locking up. I'm not done with you. My dorm, or your apartment. Come with me."
		},
		continue: {
			expression: "happy",
			text: "They're closing. Quad's still open. Trail too, and the movie house. Invite me if you've got somewhere. I'm not ready to call it."
		},
		goodnight: {
			expression: "shy",
			text: "They're closing, and I should head back. Good night."
		}
	},
	victoria: {
		invite: {
			expression: "flirty",
			text: "They're closing. I'm not ending the night on a sidewalk. My house, or your apartment. I'm asking."
		},
		continue: {
			expression: "thinking",
			text: "This place is closing. The quad is still open, and so are the trail and the theater. Invite me if you have somewhere in mind. I can keep walking."
		},
		goodnight: {
			expression: "shy",
			text: "They're closing. I'm going home. Good night."
		}
	}
};
function nightClose(args) {
	if (openTonight(args.location, "Night")) return null;
	const place = placeOf(args.location).name;
	if (!args.present.length) return {
		narrator: `${place} is closed for the night. Pick somewhere that is still open.`,
		spoken: [],
		left: [],
		staying: [],
		inviteGirl: null,
		inviteHome: null,
		showPlaces: true
	};
	const byId = new Map(args.girls.map((girl) => [girl.girl, girl]));
	const order = args.present.includes(args.focus) ? [args.focus, ...args.present.filter((id) => id !== args.focus)] : [...args.present];
	const spoken = [];
	const left = [];
	let inviteGirl = null;
	for (const girl of order) {
		const meter = byId.get(girl) ?? {
			girl,
			trust: 0,
			bonding: 0,
			official: false
		};
		const bend = nightBend(meter.trust, meter.bonding, meter.official, args.intimate);
		const line = LINES[girl][bend];
		spoken.push({
			girl,
			text: line.text,
			expression: line.expression
		});
		if (bend === "goodnight") left.push(girl);
		else if (bend === "invite" && inviteGirl == null) inviteGirl = girl;
	}
	const staying = args.present.filter((id) => !left.includes(id));
	const focusStays = staying.includes(args.focus);
	if (inviteGirl && !staying.includes(inviteGirl)) inviteGirl = null;
	if (inviteGirl && focusStays && inviteGirl !== args.focus) inviteGirl = null;
	return {
		narrator: staying.length ? `${place} is closing for the night.` : `${place} is closed for the night. You're on your own. Pick somewhere still open.`,
		spoken,
		left,
		staying,
		inviteGirl,
		inviteHome: inviteGirl ? herHome(inviteGirl) : null,
		showPlaces: staying.length === 0
	};
}
function inviteToken(id) {
	return `@(${placeOf(id).name})`;
}
var PHYSICAL = /\b(?:sits?|sat|sitting|stands?|stood|standing|walks?|walked|walking|steps?|stepped|leans?|leaned|leaning|reaches?|reached|reaching|holds?|held|holding|shakes?|shook|shaking|waves?|waved|waving|nods?|nodded|smiles?|smiled|smiling|grins?|grinned|laughs?|laughed|laughing|looks?|looked|looking|watches?|watched|watching|stares?|stared|staring|glances?|glanced|turns?|turned|turning|kisses?|kissed|kissing|hugs?|hugged|hugging|touches?|touched|touching|pats?|patted|grabs?|grabbed|pulls?|pulled|pushes?|pushed|offers?|offered|points?|pointed|bows?|bowed|kneels?|knelt|lies?|lays?|laid|crosses?|crossed|folds?|folded|covers?|covered|sniffs?|sniffed|coughs?|coughed|blushes?|blushed|fidgets?|shifts?|shifted|moves?|moved|moving|follows?|followed|leaves?|left|leaving|stays?|stayed|waits?|waited|opens?|opened|closes?|closed|lifts?|lifted|raises?|raised|lowers?|lowered|puts?|puts|sets?|takes?|took|taking|gives?|gave|eats?|ate|drinks?|drank|sips?|sipped|reads?|reads|writes?|wrote|stretches?|stretched|yawns?|yawned|sighs?|sighed|winks?|winked|shrugs?|shrugged|tilts?|tilted|scoots?|scooted|slides?|slid|plops?|plopped|extends?|extended|squeezes?|squeezed|places?|placed|hands?|gets up|sits down)\b/i;
var MENTAL = /^(?:i\s+(?:think|feel|wonder|hope|wish|believe|decide|realize|realise|notice|love|want|need|hate|like)\b|she(?:'s| is)\s+so\b|you(?:'re| are)\s+so\b|wow\b|god\b|damn\b)/i;
var PRIVATE_ADJ = /\b(?:gorgeous|beautiful|sexy|cute|pretty|handsome|stunning|lovely|adorable|breathtaking|disgusting)\b/gi;
/** What she can see. Private opinions inside the same gesture are dropped. */
function seenAction(raw) {
	const chunks = raw.split(/\s*(?:,|;|\.|\band\b)\s*/i).map((part) => part.trim()).filter(Boolean);
	const kept = [];
	for (const chunk of chunks) {
		const admiring = /\b(?:admires?|admired|admiring|gazes?|gazed|gazing)\b/i.test(chunk);
		if (MENTAL.test(chunk) && !PHYSICAL.test(chunk) && !admiring) continue;
		if (!PHYSICAL.test(chunk) && !admiring) continue;
		let bit = chunk.replace(/\bI\s+admire\b/i, "I look at").replace(/\badmires\b/i, "looks at").replace(/\badmire\b/i, "look at").replace(/\badmired\b/i, "looked at").replace(/\badmiring\b/i, "looking at").replace(/\bgazes?\b/i, "looks").replace(/\bgazed\b/i, "looked").replace(/\bgazing\b/i, "looking");
		bit = bit.replace(PRIVATE_ADJ, "").replace(/\s{2,}/g, " ").replace(/\s+([.!?])/g, "$1").trim();
		if (bit) kept.push(bit);
	}
	if (!kept.length) return null;
	return kept.join(" and ").replace(/\s{2,}/g, " ").trim();
}
function pushSay(beats, text) {
	const clean = text.replace(/\s+/g, " ").trim();
	if (clean) beats.push({
		kind: "say",
		text: clean
	});
}
function parseDraft(raw) {
	const beats = [];
	let invite = null;
	const token = /\*([^*]+)\*|\{([^{}]*)\}/g;
	let last = 0;
	let match;
	while (match = token.exec(raw)) {
		pushSay(beats, raw.slice(last, match.index).replace(/@\(([^)]*)\)/g, (_m, inner) => {
			const found = resolvePlace(String(inner));
			if (found && !invite) invite = found;
			return " ";
		}));
		const star = match[1];
		const brace = match[2];
		if (brace != null) {
			const text = brace.trim();
			if (text) beats.push({
				kind: "think",
				text
			});
		} else if (star != null) {
			const text = star.trim();
			if (text) {
				const seen = seenAction(text);
				if (seen) beats.push({
					kind: "act",
					text,
					seen
				});
				else beats.push({
					kind: "think",
					text
				});
			}
		}
		last = match.index + match[0].length;
	}
	pushSay(beats, raw.slice(last).replace(/@\(([^)]*)\)/g, (_m, inner) => {
		const found = resolvePlace(String(inner));
		if (found && !invite) invite = found;
		return " ";
	}));
	return {
		say: beats.filter((beat) => beat.kind === "say").map((beat) => beat.text).join(" "),
		action: beats.filter((beat) => beat.kind === "act").map((beat) => beat.seen || beat.text).join("; "),
		thought: beats.filter((beat) => beat.kind === "think").map((beat) => beat.text).join(" "),
		beats,
		invite
	};
}
var SAVE_KEY = "izzy-companion-save";
var defaultFlags = () => ({
	invitedMexican: false,
	invitedDorm: false,
	visitedDorm: false,
	knowsAboutSpray: false,
	romanceOffered: false,
	romanceAccepted: false,
	workShift: false,
	firstFartTest: false,
	firstInfodumpTest: false,
	sprayRepair: false,
	intimateSprayResolved: false,
	evaInterest: false,
	mymyInterest: false,
	fartConverted: false,
	sprayYield: "none",
	defenseAftermath: "none",
	nicknamesOff: false,
	scentInterest: false,
	intimateScene: false
});
function pick(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}
var OPENINGS = {
	library: [
		{
			narrator: "The history aisle is quieter than the rest of the library. Dust, old paper — and a lingering musk, animal-sharp, unmistakably skunk. At the end of the shelf a chubby skunk-neko girl in a Lil' Stinker crop top is hunched over a stack of books. She looks over. Green eyes go wide. Ears flatten.",
			first: "Oh— uh. Hi. You can probably smell that. Sorry. Library and all. I'm Isabella. Izzy. I was just… World War I logistics. The whole supply chain through the mud is actually—",
			second: "I'm rambling. You can just keep walking. People usually do."
		},
		{
			narrator: "The history stacks smell like dust and old glue until they don't. A skunky musk hangs in the aisle. A chubby skunk-neko girl is halfway off a rolling stool, hugging a folio bigger than her torso. She notices you and almost drops it.",
			first: "Hi. Izzy. That smell is me. I was trying to be discreet about it, which is a skill I do not have. Late Roman grain routes. Extremely sexy. The maps, I mean.",
			second: "You can pretend you needed a different century. I won't fight you."
		},
		{
			narrator: "Someone has pulled half the Pacific theater section into a messy pile on the floor. The culprit — chubby, skunk-eared, pink crop top — is sitting in it. The air is animal-sharp. She looks up, caught.",
			first: "Oh no. Hi. I'm Izzy. I farted. In the library. And now you're here. I was pulling island-hopping supply notes and I got excited and my body made a decision.",
			second: "If you need to leave, the 900s are that way. I live in this aisle now, apparently."
		},
		{
			narrator: "A chubby skunk-neko girl is using the history shelf as a desk, HOI4 notes spilling out of a library book she is definitely not supposed to treat like a mousepad. A musk lingers. She clocks you and goes pink to the ears.",
			first: "That's— hi. Izzy. Don't look at the notes. Or the smell. I told myself I was researching the Eastern Front and then I started drawing front lines in the margin like a gremlin.",
			second: "You can keep walking. I will simply perish quietly among the 940s."
		},
		{
			narrator: "The Bionicle section isn't even in history, but a chubby skunk-neko girl has dragged a mask-lore paperback into the stacks anyway. Skunk musk. Wide green eyes. Caught.",
			first: "Okay so— Izzy. Isabella. That was me. The smell. I was making a case that the Bohrok swarms are just a plague narrative with cooler masks and then my stomach voted.",
			second: "If that's too much for a first sentence, yeah. I get it. Exit's behind you."
		}
	],
	studyHall: [
		{
			narrator: "Study hall is half empty. Green lamps, open textbooks — and a musk that does not belong to highlighter ink. At the next table a chubby skunk-neko girl goes very still. She had clearly just… and thought nobody was close enough to notice.",
			first: "Oh god. You heard that. Or smelled it. Both, probably. I'm Izzy. I was being so quiet except for the part that isn't quiet.",
			second: "You can pretend you're looking for a seat farther away. That's the popular choice."
		},
		{
			narrator: "Under a green lamp, a chubby skunk-neko girl is surrounded by index cards about Versailles. The air around her table is skunky-warm. She looks up like she considered crawling under the desk.",
			first: "Hi. Izzy. That wasn't the lamp. That was me. I had beans at lunch and a paper due and I made several mistakes in a row.",
			second: "There's a whole empty row by the windows if you value your lungs."
		},
		{
			narrator: "Someone is taking notes on War Thunder maps in a composition book and calling it 'spatial history.' The musk gives her away before the handwriting does. Chubby, skunk-eared, mortified.",
			first: "Izzy. Hi. I thought the hall was empty enough. I was mapping supply routes. For a class. Okay it was for a match later. Still counts.",
			second: "If you sit somewhere else I will not be brave enough to stop you."
		},
		{
			narrator: "A half-finished Evangelion essay sits next to a history syllabus. The girl attached to both — plus-size, skunk tail draped off the chair — has just let one go and is pretending the lamp did it. It did not.",
			first: "That's on me. I'm Izzy. I was supposed to be outlining the Treaty of Trianon and I slipped into Eva again. And then I slipped in a different way.",
			second: "You can just… not sit here. I would. I mean I wouldn't. I live here. It's complicated."
		}
	],
	trail: [
		{
			narrator: "The nature trail dips into pine shade. Birdsong, damp earth — and a sudden, animal-sharp skunk musk on the breeze. Around the bend, a chubby skunk-neko girl in a campus hoodie is frozen mid-step, tail puffed. She looks back. Sees you. Mortified.",
			first: "I— that was me. Obviously. I thought I was alone. Woods are supposed to be the one place I can… anyway. Izzy. Isabella. Hi.",
			second: "If you want to keep walking, I get it. The trail's big."
		},
		{
			narrator: "A chubby skunk-neko girl is crouched over a patch of moss with a beat-up field notebook. The musk hits a second before she does. She stands too fast, hoodie riding up, ears flat.",
			first: "Hi. Izzy. I was identifying plants. Poorly. And I thought the trees didn't care if I… you know. They don't. People do.",
			second: "There's a fork up ahead if you want a less aromatic hike."
		},
		{
			narrator: "The trail marker for the ridge loop has a sticky note in messy handwriting: 'wind's wrong today, use west spur.' The author is a chubby skunk-neko in a campus hoodie, caught mid-toot, looking like she works here even when she doesn't.",
			first: "Okay. Izzy. Trailhead Outfitters. Sometimes I scout on my off day because my nose is better than the forecast. Which is a fun fact that is currently working against me.",
			second: "You can take the other spur. I will not follow you. Probably."
		},
		{
			narrator: "Someone has been looking for morels and found embarrassment instead. A chubby skunk-neko girl straightens up from the leaf litter, tail puffed, musk hanging in the pines.",
			first: "Mushrooms. I was looking for mushrooms. Not a metaphor. I'm Izzy. I farted in the woods like an animal because I am, technically, an animal, and I forgot hikers exist.",
			second: "Keep going if you want. I'll just… blend into this tree. I won't. But I'll try."
		},
		{
			narrator: "The creek crossing is quiet except for a very obvious skunk musk. A chubby skunk-neko girl in a hoodie is sitting on a rock, catching her breath after a test, and now catching you seeing her at her least academic.",
			first: "I came out here to not think about a midterm and then my body filed an addendum. Izzy. Hi. This is the opposite of a great first impression.",
			second: "The path back to the lot is behind you if you need an exit. No hard feelings. Some smell feelings."
		}
	],
	animeStore: [
		{
			narrator: "Neko Shelf is cramped in the good way: figures, tapestries, a TV looping an OP. Then the musk — skunk, not acrylic. A chubby skunk-neko girl is holding an Evangelion box like it might explode. She looks over. It kind of did.",
			first: "Hi. Izzy. That's me. The smell, not the Unit-01. I got excited about the reprint and my stomach joined the conversation.",
			second: "You can browse the other wall. I will be here, surviving, possibly buying this anyway."
		},
		{
			narrator: "The Monster Musume shelf has a gap. The girl who made it — plus-size, skunk-eared, campus hoodie — is clutching volume eight and radiating an animal-sharp musk she is trying to ignore. She fails. She sees you.",
			first: "I was just— Izzy. I came for this and then I let one go in an anime store, which is a new low, even for me. Centaurs wouldn't judge. People do.",
			second: "If you need to look at manga that doesn't smell like me, that's most of the store."
		},
		{
			narrator: "Someone is arguing quietly with a price tag on a Yani-Neko figure. Chubby skunk-neko, tail knocking a tapestry. The musk arrives before the apology.",
			first: "Okay so— I'm Izzy. I did not mean to season Neko Shelf. I was doing math on whether I can justify this figure and my digestive tract said 'no, but also yes.'",
			second: "You can just… keep walking toward the keychains. I would."
		},
		{
			narrator: "Plus Sized Elf is face-out on the shelf. The girl reaching for it looks like she wandered out of the pages — chubby, skunk-eared — and has just farted in the aisle. Green eyes go huge.",
			first: "That's ironic. I'm Izzy. I came for representation and I brought… atmosphere. Sorry. They don't usually let the mascot contribute.",
			second: "There's a whole shonen wall if you want distance. I get it."
		},
		{
			narrator: "Neko Shelf's back corner has Shikanokonoko merch and one chubby skunk-neko girl who thought a deer-girl display was a safe place to unclench. It was not. You round the spinner rack. She dies a little.",
			first: "Hi. Izzy. I came for the deer nonsense and then I made my own problem. The woods I can explain. A mall anime store is harder.",
			second: "If you need to bounce, bounce. I'll be hiding behind this cardboard cutout that is not big enough."
		}
	],
	craftStore: [{
		narrator: "Hearth & Hobby smells like dried flowers and hot glue until a skunky note cuts through the fabric aisle. A chubby skunk-neko girl in a campus hoodie is comparing two bolts of cloth like she is not sure she is allowed to touch them. She looks up. Ears flatten.",
		first: "Oh. Hi. Izzy. I was looking for something for a gift and then I… the smell is me. I don't usually come in here. I can tell.",
		second: "You can keep shopping. I'll put the fabric back. Probably. Maybe. Don't mind me."
	}, {
		narrator: "The wreath display has a chubby skunk-neko girl half-hidden behind it, tail curled tight, a musk hanging in the aisle that is not potpourri. She sees you and goes pink.",
		first: "Hi. Izzy. I thought a craft store would be empty on a Monday. I was wrong, and my stomach was louder than the empty. Sorry.",
		second: "The florals are that way if you want distance. I will be over here, surviving."
	}]
};
function openingState(playerName, meet = "library", debug = false, playerGender = "male", playerFartRole = "into", gameMode = "casual") {
	const name = playerName.trim() || "you";
	const loc = FIRST_MEETS.includes(meet) ? meet : "library";
	const place = placeOf(loc);
	const lines = pick(OPENINGS[loc] ?? OPENINGS.library);
	const messages = [{
		id: uid(),
		role: "narrator",
		at: Date.now(),
		text: lines.narrator
	}, {
		id: uid(),
		role: "izzy",
		at: Date.now() + 1,
		expression: "embarrassed",
		fx: "blush",
		text: oneGreeting(lines.first, lines.second)
	}];
	return {
		version: 7,
		playerName: name,
		playerGender,
		playerFartRole,
		gameMode,
		dates: 0,
		dateSpots: [],
		dateOpen: null,
		plannedDate: false,
		started: true,
		trust: 6,
		bonding: 4,
		location: loc,
		outfit: place.defaultOutfit,
		expression: "embarrassed",
		bond: "stranger",
		sprayed: false,
		sprayKind: "none",
		sprayCount: 0,
		testsDone: [],
		flags: defaultFlags(),
		pendingTest: null,
		pendingInvite: null,
		pendingIntimateSpray: false,
		glandCap: 0,
		glandShots: 0,
		turnsSinceIntimateSpray: 0,
		glandDry: 0,
		scentHold: 0,
		weekday: "Monday",
		timeOfDay: "Afternoon",
		turnsUntilTime: 10,
		dayPhase: "playing",
		izzyHere: true,
		pendingDefensive: false,
		threatLevel: "none",
		planTime: null,
		planPlace: null,
		planAccepted: false,
		dayStartTrust: 6,
		dayStartBonding: 4,
		dayFarts: 0,
		daySprays: emptySprays(),
		dayTopics: [],
		debug,
		debugOutfitLock: false,
		messages,
		...economySeed(),
		...initialCast("izzy")
	};
}
function blankState() {
	return {
		version: 7,
		playerName: "",
		playerGender: "male",
		playerFartRole: "into",
		gameMode: "casual",
		dates: 0,
		dateSpots: [],
		dateOpen: null,
		plannedDate: false,
		started: false,
		trust: 6,
		bonding: 4,
		location: "library",
		outfit: "casual",
		expression: "embarrassed",
		bond: "stranger",
		messages: [],
		sprayed: false,
		sprayKind: "none",
		sprayCount: 0,
		testsDone: [],
		flags: defaultFlags(),
		pendingTest: null,
		pendingInvite: null,
		pendingIntimateSpray: false,
		glandCap: 0,
		glandShots: 0,
		turnsSinceIntimateSpray: 0,
		glandDry: 0,
		scentHold: 0,
		weekday: "Monday",
		timeOfDay: "Afternoon",
		turnsUntilTime: 10,
		dayPhase: "playing",
		izzyHere: true,
		pendingDefensive: false,
		threatLevel: "none",
		planTime: null,
		planPlace: null,
		planAccepted: false,
		dayStartTrust: 6,
		dayStartBonding: 4,
		dayFarts: 0,
		daySprays: emptySprays(),
		dayTopics: [],
		debug: false,
		debugOutfitLock: false,
		...economySeed(),
		...initialCast("izzy")
	};
}
function asGirl(value) {
	return value === "izzy" || value === "victoria" ? value : null;
}
var AFFAIR_PHASES = [
	"wait",
	"hint",
	"demand",
	"warn",
	"reclaim",
	"spent",
	"known"
];
function parseMarkAffair(raw) {
	if (!raw || typeof raw !== "object") return null;
	const girl = raw.girl === "izzy" || raw.girl === "victoria" ? raw.girl : null;
	const marker = raw.marker === "izzy" || raw.marker === "victoria" ? raw.marker : null;
	const phase = AFFAIR_PHASES.find((item) => item === raw.phase);
	if (!girl || !marker || !phase || girl === marker) return null;
	return {
		girl,
		marker,
		phase,
		waits: typeof raw.waits === "number" && Number.isFinite(raw.waits) ? Math.max(0, Math.round(raw.waits)) : 0
	};
}
function migrate(raw) {
	const base = blankState();
	const location = asLocationId(raw.location) ?? "library";
	const focus = asGirl(raw.focus) ?? "izzy";
	const seeded = initialCast(focus);
	const roster = raw.roster?.izzy && raw.roster?.victoria ? raw.roster : seeded.roster;
	if (!raw.roster?.izzy) roster.izzy = {
		...roster.izzy,
		met: true,
		trust: typeof raw.trust === "number" ? raw.trust : 6,
		bonding: typeof raw.bonding === "number" ? raw.bonding : 4,
		bond: raw.bond ?? "stranger",
		romanceOffered: Boolean(raw.flags?.romanceOffered),
		romanceAccepted: Boolean(raw.flags?.romanceAccepted),
		knowsAboutSpray: Boolean(raw.flags?.knowsAboutSpray),
		scentInterest: Boolean(raw.flags?.scentInterest),
		dates: typeof raw.dates === "number" ? raw.dates : 0,
		dateSpots: Array.isArray(raw.dateSpots) ? raw.dateSpots.map((id) => asLocationId(id)).filter((id) => Boolean(id)).slice(0, 3) : [],
		expression: raw.expression ?? "embarrassed",
		outfit: asOutfitId(raw.outfit) ?? "casual"
	};
	const inherited = readTank(raw);
	for (const girl of ["izzy", "victoria"]) {
		const card = roster[girl];
		if (!card) continue;
		const tank = typeof card.glandCap === "number" ? readTank(card) : girl === focus ? inherited : readTank(null);
		roster[girl] = {
			...card,
			...tank,
			fartStreak: typeof card.fartStreak === "number" ? card.fartStreak : 0,
			fartRest: typeof card.fartRest === "number" ? card.fartRest : 0,
			fartBig: typeof card.fartBig === "number" ? card.fartBig : 0,
			fed: card.fed === 2 ? 2 : card.fed === 1 ? 1 : 0
		};
	}
	const present = Array.isArray(raw.present) ? raw.present.map(asGirl).filter((id) => Boolean(id)) : [];
	const queued = raw.queuedMeet;
	const queuedMeet = queued && asGirl(queued.girl) && asLocationId(queued.place) && TIMES.includes(queued.time) ? {
		girl: asGirl(queued.girl),
		place: asLocationId(queued.place),
		time: queued.time,
		nextDay: Boolean(queued.nextDay)
	} : null;
	return {
		...base,
		...raw,
		version: 7,
		playerName: typeof raw.playerName === "string" ? raw.playerName : "",
		playerGender: raw.playerGender === "female" ? "female" : "male",
		playerFartRole: raw.playerFartRole === "not" ? "not" : "into",
		gameMode: raw.gameMode === "slow" ? "slow" : "casual",
		dates: typeof raw.dates === "number" ? Math.max(0, Math.min(3, Math.round(raw.dates))) : 0,
		dateSpots: Array.isArray(raw.dateSpots) ? raw.dateSpots.map((id) => asLocationId(id)).filter((id) => Boolean(id)).slice(0, 3) : [],
		dateOpen: asLocationId(raw.dateOpen),
		plannedDate: Boolean(raw.plannedDate),
		location,
		outfit: asOutfitId(raw.outfit) ?? placeOf(location).defaultOutfit,
		sprayKind: raw.sprayKind === "consensual" || raw.sprayKind === "angry" || raw.sprayKind === "defensive" || raw.sprayKind === "dominant" ? raw.sprayKind : "none",
		bonding: typeof raw.bonding === "number" ? raw.bonding : 4,
		pendingInvite: asLocationId(raw.pendingInvite),
		pendingIntimateSpray: Boolean(raw.pendingIntimateSpray),
		glandCap: typeof raw.glandCap === "number" ? raw.glandCap : 0,
		glandShots: typeof raw.glandShots === "number" ? raw.glandShots : 0,
		turnsSinceIntimateSpray: typeof raw.turnsSinceIntimateSpray === "number" ? raw.turnsSinceIntimateSpray : 0,
		glandDry: typeof raw.glandDry === "number" ? raw.glandDry : 0,
		scentHold: typeof raw.scentHold === "number" ? raw.scentHold : 0,
		weekday: WEEKDAYS.includes(raw.weekday) ? raw.weekday : "Monday",
		timeOfDay: TIMES.includes(raw.timeOfDay) ? raw.timeOfDay : "Afternoon",
		turnsUntilTime: typeof raw.turnsUntilTime === "number" ? raw.turnsUntilTime : 10,
		dayPhase: raw.dayPhase === "planning" || raw.dayPhase === "summary" || raw.dayPhase === "meet" || raw.dayPhase === "morning" || raw.dayPhase === "handoff" ? raw.dayPhase : "playing",
		izzyHere: raw.izzyHere !== false,
		pendingDefensive: Boolean(raw.pendingDefensive),
		threatLevel: raw.threatLevel === "attack" || raw.threatLevel === "scare" ? raw.threatLevel : "none",
		planTime: TIMES.includes(raw.planTime) ? raw.planTime : null,
		planPlace: asLocationId(raw.planPlace),
		planAccepted: Boolean(raw.planAccepted),
		dayStartTrust: typeof raw.dayStartTrust === "number" ? raw.dayStartTrust : raw.trust,
		dayStartBonding: typeof raw.dayStartBonding === "number" ? raw.dayStartBonding : raw.bonding,
		dayFarts: typeof raw.dayFarts === "number" ? raw.dayFarts : 0,
		daySprays: {
			...emptySprays(),
			...raw.daySprays
		},
		dayTopics: Array.isArray(raw.dayTopics) ? raw.dayTopics.slice(0, 8) : [],
		debug: Boolean(raw.debug),
		debugOutfitLock: Boolean(raw.debugOutfitLock),
		flags: {
			...defaultFlags(),
			...raw.flags
		},
		messages: Array.isArray(raw.messages) ? raw.messages : [],
		relationshipType: raw.relationshipType === "harem" ? "harem" : "mono",
		focus,
		present: present.length ? present : [focus],
		roster,
		planGirl: asGirl(raw.planGirl) ?? focus,
		morningDetour: Boolean(raw.morningDetour),
		queuedMeet,
		meetKind: raw.meetKind === "queue" ? "queue" : "plan",
		partner: asGirl(raw.partner),
		affairKnown: Boolean(raw.affairKnown),
		money: typeof raw.money === "number" ? Math.max(0, Math.round(raw.money)) : 100,
		inventory: Array.isArray(raw.inventory) ? raw.inventory.filter((id) => typeof id === "string") : [],
		dateDraft: raw.dateDraft ?? null,
		scheduledDate: raw.scheduledDate ?? null,
		activeDate: raw.activeDate ?? null,
		dateReview: raw.dateReview ?? null,
		confronting: asGirl(raw.confronting),
		grudge: raw.grudge ?? {},
		dateTipOff: raw.dateTipOff ?? {},
		gas: Array.isArray(raw.gas) ? raw.gas.filter((puff) => puff && (puff.size === 1 || puff.size === 2 || puff.size === 3) && puff.turns > 0) : [],
		departure: raw.departure && asGirl(raw.departure.girl) && asLocationId(raw.departure.place) ? {
			girl: asGirl(raw.departure.girl),
			place: asLocationId(raw.departure.place)
		} : null,
		trailStreak: typeof raw.trailStreak === "number" ? raw.trailStreak : 0,
		trailGirl: asGirl(raw.trailGirl),
		sceneTurns: typeof raw.sceneTurns === "number" ? raw.sceneTurns : 0,
		shiftsWorked: typeof raw.shiftsWorked === "number" ? Math.max(0, Math.round(raw.shiftsWorked)) : 0,
		workedToday: Boolean(raw.workedToday),
		pressedDuty: raw.pressedDuty === "izzy" || raw.pressedDuty === "victoria" ? raw.pressedDuty : null,
		stink: typeof raw.stink === "number" ? Math.max(0, Math.min(100, Math.round(raw.stink))) : 0,
		scentFrom: {
			izzy: typeof raw.scentFrom?.izzy === "number" ? Math.max(0, Math.round(raw.scentFrom.izzy)) : 0,
			victoria: typeof raw.scentFrom?.victoria === "number" ? Math.max(0, Math.round(raw.scentFrom.victoria)) : 0
		},
		stinkAsked: raw.stinkAsked ?? {},
		stinkTalk: raw.stinkTalk && (raw.stinkTalk.girl === "izzy" || raw.stinkTalk.girl === "victoria") ? {
			girl: raw.stinkTalk.girl,
			presses: typeof raw.stinkTalk.presses === "number" ? raw.stinkTalk.presses : 0
		} : null,
		showersToday: typeof raw.showersToday === "number" ? Math.max(0, Math.min(2, Math.round(raw.showersToday))) : 0,
		daySerial: typeof raw.daySerial === "number" ? Math.max(0, Math.round(raw.daySerial)) : 0,
		dutyNotice: Array.isArray(raw.dutyNotice) ? raw.dutyNotice.filter((notice) => !!notice && (notice.girl === "izzy" || notice.girl === "victoria") && (notice.duty === "class" || notice.duty === "work") && Boolean(asLocationId(notice.place))) : [],
		flauntDay: raw.flauntDay ?? {},
		markAffair: parseMarkAffair(raw.markAffair),
		otherSprayKind: raw.otherSprayKind === "angry" || raw.otherSprayKind === "consensual" || raw.otherSprayKind === "defensive" || raw.otherSprayKind === "dominant" ? raw.otherSprayKind : "none",
		sprayPrompts: Array.isArray(raw.sprayPrompts) ? raw.sprayPrompts.filter((prompt) => !!prompt && (prompt.girl === "izzy" || prompt.girl === "victoria") && (prompt.kind === "angry" || prompt.kind === "consensual" || prompt.kind === "defensive" || prompt.kind === "dominant")) : []
	};
}
function loadSave() {
	try {
		const raw = localStorage.getItem(SAVE_KEY);
		if (!raw) return null;
		return migrate(JSON.parse(raw));
	} catch {
		return null;
	}
}
function writeSave(state) {
	try {
		localStorage.setItem(SAVE_KEY, JSON.stringify(state));
	} catch {}
}
function clearSave() {
	try {
		localStorage.removeItem(SAVE_KEY);
	} catch {}
}
function asGameState(s) {
	return {
		version: s.version,
		playerName: s.playerName,
		playerGender: s.playerGender === "female" ? "female" : "male",
		playerFartRole: s.playerFartRole === "not" ? "not" : "into",
		gameMode: s.gameMode === "slow" ? "slow" : "casual",
		dates: s.dates ?? 0,
		dateSpots: s.dateSpots ?? [],
		dateOpen: asLocationId(s.dateOpen),
		plannedDate: Boolean(s.plannedDate),
		started: s.started,
		trust: s.trust,
		bonding: s.bonding,
		location: asLocationId(s.location) ?? "library",
		outfit: asOutfitId(s.outfit) ?? "casual",
		expression: s.expression,
		bond: s.bond,
		messages: s.messages,
		sprayed: s.sprayed,
		sprayKind: s.sprayKind,
		otherSprayKind: s.otherSprayKind === "angry" || s.otherSprayKind === "consensual" || s.otherSprayKind === "defensive" || s.otherSprayKind === "dominant" ? s.otherSprayKind : "none",
		sprayPrompts: Array.isArray(s.sprayPrompts) ? s.sprayPrompts : [],
		sprayCount: s.sprayCount,
		testsDone: s.testsDone,
		flags: s.flags,
		pendingTest: s.pendingTest,
		pendingInvite: asLocationId(s.pendingInvite),
		pendingIntimateSpray: s.pendingIntimateSpray,
		glandCap: s.glandCap ?? 0,
		glandShots: s.glandShots ?? 0,
		turnsSinceIntimateSpray: s.turnsSinceIntimateSpray ?? 0,
		glandDry: s.glandDry ?? 0,
		scentHold: s.scentHold ?? 0,
		weekday: s.weekday ?? "Monday",
		timeOfDay: s.timeOfDay ?? "Afternoon",
		turnsUntilTime: s.turnsUntilTime ?? 10,
		dayPhase: s.dayPhase ?? "playing",
		izzyHere: s.izzyHere !== false,
		pendingDefensive: Boolean(s.pendingDefensive),
		threatLevel: s.threatLevel ?? "none",
		planTime: s.planTime ?? null,
		planPlace: asLocationId(s.planPlace),
		planAccepted: Boolean(s.planAccepted),
		dayStartTrust: s.dayStartTrust ?? s.trust,
		dayStartBonding: s.dayStartBonding ?? s.bonding,
		dayFarts: s.dayFarts ?? 0,
		daySprays: s.daySprays ?? {
			angry: 0,
			defensive: 0,
			consensual: 0,
			dominant: 0
		},
		dayTopics: s.dayTopics ?? [],
		debug: Boolean(s.debug),
		debugOutfitLock: Boolean(s.debugOutfitLock),
		relationshipType: s.relationshipType === "harem" ? "harem" : "mono",
		focus: s.focus === "victoria" ? "victoria" : "izzy",
		present: Array.isArray(s.present) && s.present.length ? s.present : [s.focus === "victoria" ? "victoria" : "izzy"],
		roster: s.roster ?? initialCast().roster,
		planGirl: s.planGirl === "victoria" ? "victoria" : s.focus === "victoria" ? "victoria" : "izzy",
		morningDetour: Boolean(s.morningDetour),
		queuedMeet: s.queuedMeet ?? null,
		meetKind: s.meetKind === "queue" ? "queue" : "plan",
		partner: s.partner === "izzy" || s.partner === "victoria" ? s.partner : null,
		affairKnown: Boolean(s.affairKnown),
		money: typeof s.money === "number" ? s.money : 100,
		inventory: Array.isArray(s.inventory) ? s.inventory : [],
		dateDraft: s.dateDraft ?? null,
		scheduledDate: s.scheduledDate ?? null,
		activeDate: s.activeDate ?? null,
		dateReview: s.dateReview ?? null,
		confronting: s.confronting === "izzy" || s.confronting === "victoria" ? s.confronting : null,
		grudge: s.grudge ?? {},
		dateTipOff: s.dateTipOff ?? {},
		gas: Array.isArray(s.gas) ? s.gas.filter((puff) => puff && (puff.size === 1 || puff.size === 2 || puff.size === 3) && puff.turns > 0) : [],
		departure: s.departure?.girl === "izzy" || s.departure?.girl === "victoria" ? s.departure : null,
		trailStreak: typeof s.trailStreak === "number" ? s.trailStreak : 0,
		trailGirl: s.trailGirl === "izzy" || s.trailGirl === "victoria" ? s.trailGirl : null,
		sceneTurns: typeof s.sceneTurns === "number" ? s.sceneTurns : 0,
		shiftsWorked: typeof s.shiftsWorked === "number" ? s.shiftsWorked : 0,
		workedToday: Boolean(s.workedToday),
		pressedDuty: s.pressedDuty === "izzy" || s.pressedDuty === "victoria" ? s.pressedDuty : null,
		stink: typeof s.stink === "number" ? s.stink : 0,
		scentFrom: {
			izzy: typeof s.scentFrom?.izzy === "number" ? s.scentFrom.izzy : 0,
			victoria: typeof s.scentFrom?.victoria === "number" ? s.scentFrom.victoria : 0
		},
		stinkAsked: s.stinkAsked ?? {},
		stinkTalk: s.stinkTalk && (s.stinkTalk.girl === "izzy" || s.stinkTalk.girl === "victoria") ? {
			girl: s.stinkTalk.girl,
			presses: s.stinkTalk.presses ?? 0
		} : null,
		showersToday: typeof s.showersToday === "number" ? s.showersToday : 0,
		daySerial: typeof s.daySerial === "number" ? s.daySerial : 0,
		dutyNotice: Array.isArray(s.dutyNotice) ? s.dutyNotice : [],
		flauntDay: s.flauntDay ?? {},
		markAffair: parseMarkAffair(s.markAffair)
	};
}
function draftFromTurn(turn) {
	if (turn.beats?.length) return [turn.beats.map((beat) => beat.kind === "say" ? beat.text : beat.kind === "think" ? `{${beat.text}}` : `*${beat.text}*`).join(" "), turn.invite ? inviteToken(turn.invite) : ""].filter(Boolean).join(" ");
	return [
		turn.say.trim(),
		turn.action.trim() ? `*${turn.action.trim()}*` : "",
		turn.invite ? inviteToken(turn.invite) : ""
	].filter(Boolean).join(" ");
}
function appendPlayer(messages, input) {
	const beats = input.beats?.length ? input.beats : [...input.say.trim() ? [{
		kind: "say",
		text: input.say.trim()
	}] : [], ...input.action.trim() ? [{
		kind: "act",
		text: input.action.trim(),
		seen: input.action.trim()
	}] : []];
	const flag = input.inviteReply === "accept" ? "[accepted her invite]" : input.inviteReply === "decline" ? "[declined her invite]" : "";
	beats.forEach((beat, index) => {
		const note = index === beats.length - 1 ? flag : "";
		messages.push({
			id: uid(),
			role: "player",
			at: Date.now() + index,
			text: [beat.text, note].filter(Boolean).join(" "),
			aside: beat.kind === "say" ? void 0 : beat.kind,
			say: beat.kind === "say" ? beat.text : void 0,
			action: beat.kind === "act" ? beat.seen || beat.text : void 0
		});
	});
	if (input.invite && !beats.length) messages.push({
		id: uid(),
		role: "player",
		at: Date.now(),
		text: [inviteToken(input.invite), flag].filter(Boolean).join(" ")
	});
	else if (input.invite) messages.push({
		id: uid(),
		role: "player",
		at: Date.now() + beats.length,
		text: inviteToken(input.invite)
	});
	else if (flag && !beats.length) messages.push({
		id: uid(),
		role: "player",
		at: Date.now(),
		text: flag
	});
}
function rejectedReply(current, prior) {
	const oldIds = new Set(prior.map((m) => m.id));
	return current.filter((m) => !oldIds.has(m.id) && m.role !== "player").map((m) => m.text).join("\n").slice(0, 700);
}
function deDupeLine(state, role, line, asked) {
	const trimmed = line.trim();
	if (!trimmed) return line;
	if (/say that again|repeat that|one more time|what was that|what did you say/i.test(asked)) return line;
	const prev = [...state.messages].reverse().find((m) => m.role === role);
	if (!prev || prev.text.trim() !== trimmed) return line;
	const swaps = role === "victoria" ? [
		"I already said it. I'm not going to perform it twice. What else.",
		"You heard me the first time. Add something new.",
		"I'm still on what you said. Not on a copy of myself."
	] : [
		"I'm not gonna say that twice. Your turn. New words.",
		"Yeah, I heard myself. What did you actually mean.",
		"Looping me isn't a conversation. Try the next sentence."
	];
	return swaps.find((swap) => swap !== prev.text) ?? swaps[0];
}
var lastDutyCut = null;
var lastDutyGone = [];
var openPlacesAfterTurn = false;
function paceOf(mode, dates) {
	return {
		mode: mode === "slow" ? "slow" : "casual",
		dates
	};
}
function nudgeGirl(patch, snapshot, girl, trustDelta, bondDelta) {
	if (!trustDelta && !bondDelta) return;
	const roster = patch.roster ?? snapshot.roster;
	if (girl === (patch.focus ?? snapshot.focus ?? "izzy")) {
		const pace = paceOf(snapshot.gameMode, patch.dates ?? snapshot.dates ?? 0);
		const trust = applyTrust(patch.trust ?? snapshot.trust, trustDelta, pace);
		const bonding = applyBonding(patch.bonding ?? snapshot.bonding, bondDelta, pace);
		const romantic = Boolean((patch.flags ?? snapshot.flags).romanceAccepted);
		const bond = bondFromScores(trust, bonding, romantic);
		patch.trust = trust;
		patch.bonding = bonding;
		patch.bond = bond;
		patch.roster = withGirl({
			...snapshot,
			...patch,
			roster
		}, girl, {
			trust,
			bonding,
			bond
		});
		return;
	}
	const card = roster[girl];
	if (!card) return;
	const pace = paceOf(snapshot.gameMode, card.dates);
	const trust = applyTrust(card.trust, trustDelta, pace);
	const bonding = applyBonding(card.bonding, bondDelta, pace);
	const bond = bondFromScores(trust, bonding, card.romanceAccepted);
	patch.roster = withGirl({
		...snapshot,
		...patch,
		roster
	}, girl, {
		trust,
		bonding,
		bond
	});
}
function endRelationship(patch, snapshot, girl) {
	const focus = patch.focus ?? snapshot.focus ?? "izzy";
	const roster = patch.roster ?? snapshot.roster;
	const trust = girl === focus ? patch.trust ?? snapshot.trust : roster[girl]?.trust ?? 0;
	const bonding = girl === focus ? patch.bonding ?? snapshot.bonding : roster[girl]?.bonding ?? 0;
	const bond = bondFromScores(trust, bonding, false);
	const flags = { ...patch.flags ?? snapshot.flags };
	if (girl === focus) {
		flags.romanceAccepted = false;
		flags.romanceOffered = false;
		patch.trust = trust;
		patch.bonding = bonding;
		patch.bond = bond;
		patch.flags = flags;
	}
	if ((patch.partner ?? snapshot.partner) === girl) patch.partner = null;
	patch.roster = withGirl({
		...snapshot,
		...patch,
		roster,
		flags
	}, girl, {
		trust,
		bonding,
		bond,
		romanceAccepted: false,
		romanceOffered: false
	});
}
function isGirlfriend(snapshot, patch, girl) {
	if (girl === (patch.focus ?? snapshot.focus ?? "izzy")) {
		if ((patch.flags ?? snapshot.flags).romanceAccepted || (patch.bond ?? snapshot.bond) === "romantic") return true;
	}
	return cardCouple((patch.roster ?? snapshot.roster)[girl]);
}
function insertAt(messages, at, line) {
	if (at == null || at < 0 || at > messages.length) messages.push(line);
	else messages.splice(at, 0, line);
	return at == null ? null : at + 1;
}
function seatAfterExit(gone, present, roster, seat) {
	if (!present.length) return {
		...seat,
		izzyHere: false
	};
	if (gone !== seat.liveFocus) return {
		...seat,
		izzyHere: true
	};
	const stay = present[0];
	const card = roster[stay];
	if (!card) return {
		...seat,
		izzyHere: true
	};
	return {
		liveFocus: stay,
		trust: card.trust,
		bonding: card.bonding,
		bond: card.bond,
		expression: card.expression,
		outfit: card.outfit,
		dates: card.dates,
		dateSpots: [...card.dateSpots],
		flags: {
			...seat.flags,
			romanceOffered: card.romanceOffered,
			romanceAccepted: card.romanceAccepted,
			knowsAboutSpray: card.knowsAboutSpray,
			scentInterest: card.scentInterest
		},
		izzyHere: true
	};
}
var FART_REQUEST = /\b(?:fart (?:for|on|in) (?:me|us)|let one (?:go|rip|out)|rip one|toot for me|pass gas|another fart|keep farting|don'?t hold it|do not hold it)\b/i;
function wantsAFart(state, input) {
	const blob = `${input.say} ${input.action}`;
	if (scentRelentless(state, input) || playfulPublicAsk(blob)) return true;
	if (/\b(?:don'?t|do not|stop fart|no more|ew|gross|disgusting)\b/i.test(blob)) return false;
	return FART_REQUEST.test(blob);
}
/** Model replies were farting every line. Unasked ones roll. A request, a dare, or a relentless beat does not. */
function paceModelFarts(state, input, turn) {
	const asked = wantsAFart(state, input);
	let next = turn;
	const place = state.location;
	if (next.fx === "fart" && next.testId !== "fart-test" && !asked) {
		const girl = state.focus ?? "izzy";
		const gut = readGut(state.roster?.[girl]);
		if (canFartNow(gut, state.trust, place) && Math.random() >= fartChance(girl, state.trust, fedAfter(gut.fed, place))) {
			const scrubbed = dropFartProse(girl, next.narration ?? "", next.dialogue ?? "");
			const inner = next.inner && mentionsFart(next.inner) ? "" : next.inner;
			next = {
				...next,
				fx: "none",
				narration: scrubbed.narration,
				dialogue: scrubbed.dialogue,
				inner
			};
		}
	}
	if (next.otherFx === "fart" && !asked) {
		const other = otherGirl(state.focus ?? "izzy");
		const gut = readGut(state.roster?.[other]);
		const trust = state.roster?.[other]?.trust ?? 0;
		if (canFartNow(gut, trust, place) && Math.random() >= fartChance(other, trust, fedAfter(gut.fed, place))) {
			const scrubbed = dropFartProse(other, "", next.otherDialogue ?? "");
			next = {
				...next,
				otherFx: "none",
				otherDialogue: scrubbed.dialogue
			};
		}
	}
	return next;
}
async function runTurn(snapshot, payload, get, set, opts) {
	let result;
	try {
		const present = snapshot.izzyHere === false ? [] : snapshot.present ?? [];
		const named = addressedGirls(`${payload.say} ${payload.action}`, present);
		if (named.length === 1 && named[0] !== snapshot.focus) snapshot = pullFocus(snapshot, named[0]);
		let fromModel = false;
		try {
			const remote = await askIzzy({ data: {
				state: {
					...snapshot,
					messages: snapshot.messages.slice(-12)
				},
				turn: payload,
				reroll: opts?.reroll ? `REROLL: The player rejected your previous reply to this same input. Write a different response that fits the scene better. Do not repeat the rejected reply. Do not spray, move location, or escalate unless their words truly require it.\nRejected reply:\n${opts.avoid || "(none)"}` : void 0
			} });
			fromModel = Boolean(remote.ok);
			result = remote.ok ? remote.turn : localIzzyTurn(snapshot, payload);
		} catch {
			result = localIzzyTurn(snapshot, payload);
		}
		const asked = `${payload.say} ${payload.action}`;
		const focusIdEarly = snapshot.focus ?? "izzy";
		if (!result.sprayed && result.fx !== "fart" && result.fx !== "spray") result = {
			...result,
			dialogue: deDupeLine(snapshot, speakerRole(focusIdEarly), result.dialogue ?? "", asked)
		};
		if (result.otherDialogue && result.otherFx !== "fart" && result.otherFx !== "spray") result = {
			...result,
			otherDialogue: deDupeLine(snapshot, speakerRole(otherGirl(focusIdEarly)), result.otherDialogue, asked)
		};
		result = {
			...result,
			fx: resolveFx(result),
			suggestLocation: asLocationId(result.suggestLocation)
		};
		if (fromModel) result = paceModelFarts(snapshot, payload, result);
		const patch = applyTurn(snapshot, payload, result, { reroll: Boolean(opts?.reroll) });
		const focusId = patch.focus ?? snapshot.focus ?? "izzy";
		const voice = speakerRole(focusId);
		const fresh = (patch.messages ?? []).slice(snapshot.messages.length);
		const hers = [...fresh].reverse().find((m) => m.role === voice && (m.fx === "fart" || m.fx === "spray")) ?? [...fresh].reverse().find((m) => m.role === voice);
		const otherId = otherGirl(focusId);
		const otherWasHere = (snapshot.present ?? []).includes(otherId) || (patch.present ?? []).includes(otherId);
		const otherVoice = speakerRole(otherId);
		const theirs = otherWasHere ? [...fresh].reverse().find((m) => m.role === otherVoice && (m.fx === "fart" || m.fx === "spray")) ?? [...fresh].reverse().find((m) => m.role === otherVoice) : void 0;
		const herGas = patch.sprayKind != null && patch.sprayKind !== "none" ? "spray" : hers?.fx === "fart" ? "fart" : null;
		const otherGas = theirs?.fx === "fart" || theirs?.fx === "spray" ? theirs.fx : void 0;
		const fx = herGas ?? (hers?.fx && hers.fx !== "none" && hers.fx !== "spray" ? hers.fx : "none");
		const otherKind = otherGas;
		const intimate = (fx === "fart" || otherKind === "fart") && intimateFetishFart(snapshot, payload, result);
		const clipKind = (patch.location ?? snapshot.location) === "mexican" ? "table" : intimate ? "intimate" : "casual";
		let gas = patch.gas ?? [];
		let fartSrc;
		let otherFartSrc;
		if (fx === "fart") {
			fartSrc = pickFartSrc(clipKind);
			gas = [...gas, {
				id: uid(),
				size: fartSizeFor(fartSrc),
				turns: fartSizeFor(fartSrc)
			}];
		}
		if (otherKind === "fart") {
			otherFartSrc = pickFartSrc(clipKind);
			const size = fartSizeFor(otherFartSrc);
			gas = [...gas, {
				id: uid(),
				size,
				turns: size
			}];
		}
		const events = [];
		if (fx === "fart") events.push({
			girl: focusId,
			amount: fartSizeFor(fartSrc ?? "")
		});
		if (otherKind === "fart") events.push({
			girl: otherId,
			amount: fartSizeFor(otherFartSrc ?? "")
		});
		if (patch.sprayKind && patch.sprayKind !== "none") events.push({
			girl: focusId,
			amount: 10
		});
		if (patch.otherSprayKind && patch.otherSprayKind !== "none") events.push({
			girl: otherId,
			amount: 10
		});
		let level = clampStink(snapshot.stink ?? 0);
		let from = normalizeScent(snapshot.scentFrom);
		const hadGas = (snapshot.gas ?? []).some((puff) => puff.turns > 0);
		if (snapshot.izzyHere !== false && (snapshot.present ?? []).length > 0 && !hadGas && events.length === 0) {
			const faded = reduceStink(level, from, 1);
			level = faded.stink;
			from = faded.scent;
		}
		const poured = expose(level, from, events);
		const messages = patch.messages ?? [];
		let cursor = lastDutyCut;
		const dutyGone = new Set(lastDutyGone);
		const playerLine = `${payload.say} ${payload.action}`;
		let talk = snapshot.stinkTalk ?? null;
		let notedSmell = { ...snapshot.stinkAsked ?? {} };
		let flaunt = { ...snapshot.flauntDay ?? {} };
		const day = patch.daySerial ?? snapshot.daySerial ?? 0;
		const presentThen = snapshot.izzyHere === false ? [] : [...snapshot.present ?? []];
		const smellWord = /\b(smell|stink|scent|musk|skunk)\b/i;
		const marked = markedBy(poured.stink, poured.scent);
		const scenePlace = patch.location ?? snapshot.location;
		const when = patch.weekday ?? snapshot.weekday;
		const clock = patch.timeOfDay ?? snapshot.timeOfDay;
		let carried = Boolean(snapshot.markAffair) && !isGirlfriend(snapshot, patch, snapshot.markAffair.girl) ? null : snapshot.markAffair ?? null;
		let reactor = null;
		if (carried && presentThen.includes(carried.girl) && !dutyGone.has(carried.girl)) reactor = carried.girl;
		else if (!carried) {
			const mates = presentThen.filter((girl) => girl !== marked && !dutyGone.has(girl) && isGirlfriend(snapshot, patch, girl));
			reactor = mates.includes(focusId) ? focusId : mates[0] ?? null;
		}
		let plan = resolveAffair({
			existing: reactor && carried?.girl === reactor ? carried : reactor ? null : carried,
			girl: reactor,
			marker: marked,
			stink: poured.stink,
			mode: (patch.relationshipType ?? snapshot.relationshipType) === "harem" ? "harem" : "mono",
			markerIsPartner: marked ? isGirlfriend(snapshot, patch, marked) : false,
			text: playerLine,
			place: scenePlace,
			onDuty: reactor ? dutyOf(reactor, when, clock) !== "free" : false,
			busy: (patch.sprayPrompts?.length ?? 0) > 0 || Boolean(patch.sprayed),
			hold: patch.scentHold ?? snapshot.scentHold ?? 0
		});
		if (!reactor) plan = {
			girl: null,
			affair: carried,
			trust: 0,
			bonding: 0,
			breakTest: null,
			spray: null,
			fart: 0,
			lines: [],
			skipGeneric: false
		};
		if (plan.skipGeneric && talk?.girl === plan.girl) talk = null;
		if (talk && !presentThen.includes(talk.girl)) talk = null;
		if (talk && presentThen.includes(talk.girl)) {
			const judgment = judgeSmell(poured.stink, playerLine, talk.presses);
			nudgeGirl(patch, snapshot, talk.girl, judgment.trust, judgment.bonding);
			if (!judgment.relevant) talk = null;
			else {
				const line = smellVerdict(talk.girl, poured.stink, judgment);
				const already = messages.slice(snapshot.messages.length).some((message) => message.role === speakerRole(talk.girl) && smellWord.test(message.text));
				if (line && !already) cursor = insertAt(messages, cursor, {
					id: uid(),
					role: speakerRole(talk.girl),
					at: Date.now(),
					text: line,
					expression: judgment.honest ? "shy" : "suspicious"
				});
				talk = judgment.followUp ? {
					girl: talk.girl,
					presses: talk.presses + 1
				} : null;
			}
		}
		const source = poured.scent.izzy > poured.scent.victoria ? "izzy" : poured.scent.victoria > poured.scent.izzy ? "victoria" : null;
		if (poured.switched && presentThen.includes(poured.switched.girl)) {
			const girl = poured.switched.girl;
			nudgeGirl(patch, snapshot, girl, 0, markBond(poured.switched.applied));
			cursor = insertAt(messages, cursor, {
				id: uid(),
				role: speakerRole(girl),
				at: Date.now(),
				expression: girl === "victoria" ? "scheming" : "flirty",
				text: markLine(girl, poured.switched.applied, isPrivatePlace(scenePlace) ? "private" : "public")
			});
			flaunt = {
				...flaunt,
				[girl]: day
			};
		} else if (!talk && !plan.skipGeneric) {
			const focusNow = patch.focus ?? snapshot.focus ?? "izzy";
			const candidates = presentThen.filter((girl) => girl !== source && girl !== plan.girl && !sameDay(notedSmell, girl, day) && poured.stink > 10 && !dutyGone.has(girl));
			const asker = candidates.includes(focusNow) ? focusNow : candidates[0];
			if (Boolean(asker) && judgeSmell(poured.stink, playerLine, 0).relevant && asker && (patch.sprayPrompts?.length ?? 0) === 0) {
				const judgment = judgeSmell(poured.stink, playerLine, 0);
				nudgeGirl(patch, snapshot, asker, judgment.trust, judgment.bonding);
				const line = smellVerdict(asker, poured.stink, judgment);
				if (line) cursor = insertAt(messages, cursor, {
					id: uid(),
					role: speakerRole(asker),
					at: Date.now(),
					text: line,
					expression: judgment.honest ? "shy" : "suspicious"
				});
				notedSmell = {
					...notedSmell,
					[asker]: day
				};
				talk = judgment.followUp ? {
					girl: asker,
					presses: 1
				} : null;
			} else if (asker && (patch.sprayPrompts?.length ?? 0) === 0) {
				if (!messages.slice(snapshot.messages.length).some((message) => message.role === speakerRole(asker) && smellWord.test(message.text))) {
					cursor = insertAt(messages, cursor, {
						id: uid(),
						role: speakerRole(asker),
						at: Date.now(),
						expression: poured.stink >= 50 ? "suspicious" : "thinking",
						text: smellAskLine(asker, poured.stink)
					});
					if (poured.stink < 50 && (patch.trust ?? snapshot.trust) >= 40) cursor = insertAt(messages, cursor, {
						id: uid(),
						role: "system",
						at: Date.now(),
						text: smellThought(asker, poured.stink)
					});
				}
				notedSmell = {
					...notedSmell,
					[asker]: day
				};
				talk = {
					girl: asker,
					presses: 0
				};
			} else if (marked && presentThen.includes(marked) && !dutyGone.has(marked) && !isPrivatePlace(scenePlace) && dutyOf(marked, patch.weekday ?? snapshot.weekday, patch.timeOfDay ?? snapshot.timeOfDay) === "free" && !sameDay(flaunt, marked, day) && (patch.sprayPrompts?.length ?? 0) === 0) {
				cursor = insertAt(messages, cursor, {
					id: uid(),
					role: speakerRole(marked),
					at: Date.now(),
					expression: marked === "victoria" ? "scheming" : "flirty",
					text: flauntLine(marked)
				});
				flaunt = {
					...flaunt,
					[marked]: day
				};
			}
		}
		const extra = [];
		if (plan.girl && plan.fart) extra.push({
			girl: plan.girl,
			amount: plan.fart
		});
		if (plan.girl && plan.spray) extra.push({
			girl: plan.girl,
			amount: 10
		});
		let final = extra.length ? expose(poured.stink, poured.scent, extra) : poured;
		if (plan.girl && plan.affair?.phase === "reclaim" && extra.length) {
			const want = extra.reduce((sum, event) => sum + event.amount, 0);
			const short = Math.max(0, want - Math.max(0, final.stink - poured.stink));
			if (short > 0 && markedBy(final.stink, final.scent) !== plan.girl) {
				const moved = displaceScent(final.stink, final.scent, plan.girl, short);
				final = {
					stink: moved.stink,
					scent: moved.scent,
					switched: moved.switched ?? final.switched
				};
			}
		}
		let pulseKind = fx;
		let pulseOther = otherKind;
		let pulseFart = fartSrc;
		let pulseOtherFart = otherFartSrc;
		let pulseIntimate = intimate;
		let spotlight = Boolean(patch.sprayed) || otherGas === "spray";
		for (const line of plan.lines) {
			if (!plan.girl || !line.text) continue;
			cursor = insertAt(messages, cursor, {
				id: uid(),
				role: line.thought ? "system" : speakerRole(plan.girl),
				at: Date.now(),
				text: line.text,
				...line.thought ? {} : { expression: line.expression }
			});
		}
		if (plan.girl && plan.fart) {
			const seat = patch.focus ?? snapshot.focus ?? "izzy";
			const card = (patch.roster ?? snapshot.roster)?.[plan.girl];
			const trustFor = plan.girl === seat ? patch.trust ?? snapshot.trust : card?.trust ?? 0;
			if (!canFartNow(readGut(card), trustFor, patch.location ?? snapshot.location)) plan = {
				...plan,
				fart: 0
			};
		}
		if (plan.girl && plan.fart) {
			const src = pickFartSrc((patch.location ?? snapshot.location) === "mexican" ? "table" : true);
			gas = [...gas, {
				id: uid(),
				size: plan.fart,
				turns: plan.fart
			}];
			pulseIntimate = true;
			patch.dayFarts = (patch.dayFarts ?? snapshot.dayFarts ?? 0) + 1;
			if (plan.girl === focusId) {
				pulseFart = pulseFart ?? src;
				if (pulseKind === "none") pulseKind = "fart";
			} else {
				pulseOtherFart = pulseOtherFart ?? src;
				if (!pulseOther) pulseOther = "fart";
			}
		}
		let affairShot = null;
		if (plan.girl && plan.spray) {
			const girl = plan.girl;
			const seatedNow = patch.focus ?? snapshot.focus ?? "izzy";
			const rosterNow = patch.roster ?? snapshot.roster;
			if ((girl === seatedNow ? readTank({
				glandCap: patch.glandCap ?? snapshot.glandCap,
				glandShots: patch.glandShots ?? snapshot.glandShots,
				turnsSinceIntimateSpray: patch.turnsSinceIntimateSpray ?? snapshot.turnsSinceIntimateSpray,
				glandDry: patch.glandDry ?? snapshot.glandDry
			}) : readTank(rosterNow[girl])).glandDry > 0) cursor = insertAt(messages, cursor, {
				id: uid(),
				role: speakerRole(girl),
				at: Date.now(),
				expression: "shy",
				text: emptyGlandLine(girl)
			});
			else {
				const prompts = [...patch.sprayPrompts ?? []];
				if (!prompts.some((prompt) => prompt.girl === girl)) {
					prompts.push({
						girl,
						kind: plan.spray
					});
					patch.sprayPrompts = prompts;
					patch.sprayed = true;
					patch.sprayCount = (patch.sprayCount ?? snapshot.sprayCount ?? 0) + 1;
					patch.daySprays = bumpSpray(patch.daySprays ?? snapshot.daySprays, plan.spray);
					spotlight = true;
					affairShot = girl;
					if (girl === focusId) {
						patch.sprayKind = plan.spray;
						patch.flags = {
							...patch.flags ?? snapshot.flags,
							knowsAboutSpray: true
						};
						if (pulseKind === "fart" && !pulseOther) {
							pulseOther = "fart";
							pulseOtherFart = pulseFart;
						}
						pulseKind = "spray";
					} else {
						patch.otherSprayKind = plan.spray;
						if (pulseOther === "fart" && pulseKind === "none") {
							pulseKind = "fart";
							pulseFart = pulseOtherFart;
						}
						pulseOther = "spray";
					}
				}
			}
		}
		if (final.switched && final.switched.girl !== poured.switched?.girl && presentThen.includes(final.switched.girl)) {
			const girl = final.switched.girl;
			nudgeGirl(patch, snapshot, girl, 0, markBond(final.switched.applied));
			cursor = insertAt(messages, cursor, {
				id: uid(),
				role: speakerRole(girl),
				at: Date.now(),
				expression: girl === "victoria" ? "scheming" : "flirty",
				text: markLine(girl, final.switched.applied, isPrivatePlace(scenePlace) ? "private" : "public")
			});
			flaunt = {
				...flaunt,
				[girl]: day
			};
		}
		if (plan.girl && (plan.trust || plan.bonding)) nudgeGirl(patch, snapshot, plan.girl, plan.trust, plan.bonding);
		let affairNext = plan.girl && markedBy(final.stink, final.scent) === plan.girl ? null : plan.affair;
		let ended = false;
		if (plan.breakTest && plan.girl) {
			const girl = plan.girl;
			const roster = patch.roster ?? snapshot.roster;
			const trustNow = girl === focusId ? patch.trust ?? snapshot.trust : roster[girl]?.trust ?? 0;
			const bondNow = girl === focusId ? patch.bonding ?? snapshot.bonding : roster[girl]?.bonding ?? 0;
			ended = plan.breakTest === "over" ? !(trustNow > 50 && bondNow > 50) : trustNow < 50 || bondNow < 50;
			const stay = girl === "victoria" ? "I am not leaving you. Do not mistake that for this being fine." : "I'm still here. Don't look relieved.";
			const done = girl === "victoria" ? "I am not carrying her scent and you. We're done." : "Then I'm not your girlfriend. I'm done.";
			if (ended) {
				endRelationship(patch, snapshot, girl);
				affairNext = null;
			}
			cursor = insertAt(messages, cursor, {
				id: uid(),
				role: speakerRole(girl),
				at: Date.now(),
				expression: ended ? "angry" : "suspicious",
				text: ended ? done : stay
			});
		}
		const face = [...plan.lines].reverse().find((line) => !line.thought)?.expression;
		const expression = plan.spray ? "spray" : ended ? "angry" : plan.breakTest ? "suspicious" : face;
		if (plan.girl && expression) {
			if (plan.girl === focusId) patch.expression = expression;
			else {
				const roster = patch.roster ?? snapshot.roster;
				const card = roster[plan.girl];
				patch.roster = withGirl({
					...snapshot,
					...patch,
					roster
				}, plan.girl, {
					expression,
					knowsAboutSpray: Boolean(card?.knowsAboutSpray) || Boolean(plan.spray)
				});
			}
		}
		patch.messages = messages;
		patch.stink = final.stink;
		patch.scentFrom = final.scent;
		patch.stinkTalk = talk;
		patch.stinkAsked = notedSmell;
		patch.flauntDay = flaunt;
		patch.markAffair = affairNext;
		const origin = snapshot.focus ?? "izzy";
		const seated = patch.focus ?? origin;
		const rosterNow = patch.roster ?? snapshot.roster;
		const tanksNow = {
			izzy: readTank(rosterNow.izzy),
			victoria: readTank(rosterNow.victoria)
		};
		tanksNow[seated] = readTank({
			glandCap: patch.glandCap ?? tanksNow[seated].glandCap,
			glandShots: patch.glandShots ?? tanksNow[seated].glandShots,
			turnsSinceIntimateSpray: patch.turnsSinceIntimateSpray ?? tanksNow[seated].turnsSinceIntimateSpray,
			glandDry: patch.glandDry ?? tanksNow[seated].glandDry
		});
		const already = {
			izzy: false,
			victoria: false
		};
		if (patch.sprayKind && patch.sprayKind !== "none") already[origin] = true;
		if (patch.otherSprayKind && patch.otherSprayKind !== "none") already[otherGirl(origin)] = true;
		const glandExtra = {
			izzy: 0,
			victoria: 0
		};
		if (affairShot) glandExtra[affairShot] += 1;
		const finished = finishTanks(tanksNow, already, glandExtra);
		const seatedAfter = finished.tanks[seated];
		patch.glandCap = seatedAfter.glandCap;
		patch.glandShots = seatedAfter.glandShots;
		patch.turnsSinceIntimateSpray = seatedAfter.turnsSinceIntimateSpray;
		patch.glandDry = seatedAfter.glandDry;
		let glandRoster = rosterNow;
		glandRoster = withGirl({
			...snapshot,
			...patch,
			roster: glandRoster
		}, "izzy", finished.tanks.izzy);
		glandRoster = withGirl({
			...snapshot,
			...patch,
			roster: glandRoster
		}, "victoria", finished.tanks.victoria);
		patch.roster = glandRoster;
		const landed = [];
		if (fx === "fart" && fartSrc) landed.push({
			girl: focusId,
			size: fartSizeFor(fartSrc)
		});
		if (otherKind === "fart" && otherFartSrc) landed.push({
			girl: otherId,
			size: fartSizeFor(otherFartSrc)
		});
		if (plan.girl && plan.fart) landed.push({
			girl: plan.girl,
			size: plan.fart === 3 ? 3 : plan.fart === 2 ? 2 : 1
		});
		patch.roster = settleGuts(glandRoster, patch.izzyHere === false ? [] : [...patch.present ?? []], patch.location ?? snapshot.location, patch.focus ?? snapshot.focus ?? "izzy", patch.trust ?? snapshot.trust, Boolean(patch.flags?.intimateScene), landed, (patch.daySerial ?? 0) !== (snapshot.daySerial ?? 0));
		for (const girl of finished.emptied) cursor = insertAt(messages, cursor, {
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `${girlName(girl)} emptied her scent glands. Every spray draws from them. She needs a while before she can spray again.`
		});
		patch.messages = messages;
		set({
			...patch,
			gas,
			busy: false,
			...openPlacesAfterTurn ? { showPlaces: true } : {},
			spraySpotlight: spotlight,
			inviteReply: null,
			fxPulse: {
				kind: pulseKind,
				key: Date.now(),
				intimate: pulseIntimate,
				otherKind: pulseOther,
				fartSrc: pulseFart,
				otherFartSrc: pulseOtherFart
			}
		});
		persist({
			...patch,
			gas
		}, get);
	} catch {
		set({ busy: false });
	}
}
function persist(partial, get) {
	writeSave(pushFocus({
		...asGameState(get()),
		...partial
	}));
}
function takeOne(items, id) {
	if (!id) return items;
	const at = items.indexOf(id);
	if (at < 0) return items;
	return items.filter((_, index) => index !== at);
}
function giveBack(items, id, held) {
	if (!id || held === false || items.includes(id)) return items;
	return [...items, id];
}
function snapshotOf(state) {
	return asGameState(state);
}
function applyTurn(state, input, turn, opts) {
	lastDutyCut = null;
	lastDutyGone = [];
	openPlacesAfterTurn = false;
	const event = resolveSprayEvent(state, input, turn, opts);
	const hayNow = `${input.say} ${input.action}`;
	let pendingDefensive = state.pendingDefensive;
	let threatLevel = state.threatLevel;
	let warned = false;
	let calmed = false;
	let sprayKind = "none";
	if (event.phase === "windup" && event.kind === "defensive") {
		warned = true;
		pendingDefensive = true;
		const kind = threatKind(hayNow) ?? "scare";
		threatLevel = threatLevel === "attack" || kind === "attack" ? "attack" : kind;
	} else if (event.phase === "windup") {} else if (event.phase === "burst") {
		sprayKind = event.kind;
		if (event.kind === "defensive") {
			pendingDefensive = false;
			if (madeContact(hayNow) || threatKind(hayNow) === "attack") threatLevel = "attack";
			else if (state.pendingDefensive || threatKind(hayNow) === "scare") threatLevel = "scare";
		}
	} else if (state.pendingDefensive && talkedDown(hayNow)) {
		calmed = true;
		pendingDefensive = false;
		threatLevel = "none";
	}
	if (sprayKind === "consensual" && event.phase === "burst" && dominantSprayMode(state, turn)) sprayKind = "dominant";
	if (sprayKind === "dominant" && state.flags.sprayYield === "submit") sprayKind = "consensual";
	let sprayed = event.phase === "burst";
	let pendingIntimateSpray = event.phase === "windup" && event.kind !== "defensive";
	let confronting = state.confronting ?? null;
	let grudge = { ...state.grudge ?? {} };
	let stoodDown = false;
	let excused = null;
	const talkEarly = `${input.say} ${input.action}`;
	if (confronting) {
		if (APOLOGY.test(talkEarly)) {
			sprayed = false;
			sprayKind = "none";
			pendingIntimateSpray = false;
			stoodDown = true;
			excused = confronting;
			delete grudge[confronting];
			confronting = null;
		} else if (CRUEL.test(talkEarly)) {
			sprayed = true;
			sprayKind = "angry";
			pendingIntimateSpray = false;
			confronting = null;
		} else {
			sprayed = false;
			sprayKind = "none";
			pendingIntimateSpray = false;
		}
	}
	let flags = { ...state.flags };
	let suggested = asLocationId(turn.suggestLocation);
	const home = herHome(state.focus ?? "izzy");
	if ((suggested === "dorm" || suggested === "vickyLiving" || suggested === "vickyBedroom" || suggested === "apartment") && !isCouple(state)) suggested = null;
	if (suggested === "dorm" && (state.focus ?? "izzy") !== "izzy") suggested = null;
	if ((suggested === "vickyLiving" || suggested === "vickyBedroom") && state.focus !== "victoria") suggested = null;
	if (suggested === "mexican") flags.invitedMexican = true;
	if (suggested === "dorm" || suggested === "vickyLiving") flags.invitedDorm = true;
	if (turn.romanceOffer && state.gameMode !== "slow") flags.romanceOffered = true;
	if (turn.testId === "fart-test") flags.firstFartTest = true;
	if (turn.testId === "infodump") flags.firstInfodumpTest = true;
	const talk = `${input.say} ${input.action}`.toLowerCase();
	if (/evangelion|\beva\b|asuka|shinji|cosplay|plugsuit|unit[- ]?0?2|anime|neko shelf|monster musume|plus sized elf|yan[iy]-?neko|shikanokonoko/.test(talk)) flags.evaInterest = true;
	if (/ongezellig|\bmymy\b|japamsterdam/.test(talk)) flags.mymyInterest = true;
	const nick = chosenNickname(state.playerName);
	if (/don'?t call me|do not call me|use my (full |real |actual )?name|that'?s not my name|that is not my name|no nicknames?|stop nicknaming|call me by my name/.test(talk) || (nick ? new RegExp(`\\bdon'?t call me ${nick}\\b`, "i").test(talk) : false)) flags.nicknamesOff = true;
	if (state.playerFartRole === "not" && /do (it|that) again|i (like|love) (it|when you fart|your farts)|don't stop|dont stop|more of that|fart (on|in) my/.test(talk)) flags.fartConverted = true;
	if (showedScentInterest(talk) || flags.fartConverted || flags.sprayYield !== "none") flags.scentInterest = true;
	if (flags.sprayRepair) {
		const hay = `${input.say} ${input.action}`.toLowerCase();
		if (/listen|sorry|i hear|not your fault|natural|still (love|want|like)|reassur|i'm here|im here|not blaming/.test(hay)) flags.sprayRepair = false;
	}
	let bondingDelta = turn.bondingDelta ?? 0;
	let nextLocation = asLocationId(state.location) ?? "library";
	let pendingInvite = asLocationId(state.pendingInvite);
	let traveled = null;
	let nightShut = null;
	const asked = asLocationId(input.invite);
	const reply = input.inviteReply ?? null;
	const dateBlob = `${input.say} ${input.action}`;
	const askingDate = isDateAsk(dateBlob) && !state.activeDate && !state.scheduledDate && !state.dateDraft;
	const dateReady = state.trust >= 20 && state.bonding >= 20;
	const taken = (state.relationshipType ?? "mono") !== "harem" && Boolean(state.partner) && state.partner !== (state.focus ?? "izzy");
	if (asked && asked !== nextLocation && state.timeOfDay === "Night" && !openTonight(asked)) nightShut = asked;
	else if (asked && asked !== nextLocation && !(askingDate && (!dateReady || taken))) {
		const tone = inviteVerdict(state, asked);
		if (inviteAccepted(tone)) {
			traveled = asked;
			bondingDelta += tone === "eager" ? 4 : 2;
			if (asked === "dorm") flags.invitedDorm = true;
		} else bondingDelta += tone === "stern-no" ? -2 : 0;
		pendingInvite = null;
	} else if (pendingInvite) {
		const blob = `${input.say} ${input.action}`;
		const accepted = reply === "accept" || !reply && isYes(blob) && !isNo(blob);
		const declined = reply === "decline" || !reply && isNo(blob) && !isYes(blob);
		if (accepted) {
			bondingDelta += scoreInviteReply(input.say, input.action, true) + (reply === "accept" ? 3 : 0);
			traveled = pendingInvite;
			if (pendingInvite === "dorm") flags.invitedDorm = true;
			pendingInvite = null;
		} else if (declined) {
			bondingDelta += scoreInviteReply(input.say, input.action, false) + (reply === "decline" ? 0 : 0);
			pendingInvite = null;
		}
	}
	if (suggested && !traveled && !pendingInvite) {
		pendingInvite = suggested;
		if (suggested === "dorm") flags.invitedDorm = true;
		if (suggested === "mexican") flags.invitedMexican = true;
	}
	if (traveled) {
		nextLocation = traveled;
		pendingInvite = null;
	}
	let pressedDuty = state.pressedDuty ?? null;
	if (traveled) pressedDuty = null;
	else if (pressedDuty) {
		const rude = rudeness(dateBlob);
		if (rude >= 6) {
			bondingDelta -= rude;
			pressedDuty = null;
		} else if (!asked) pressedDuty = null;
	}
	if ((state.focus ?? "izzy") === "victoria" && state.location === "firm" && dutyOf("victoria", state.weekday, state.timeOfDay) === "work" && !/design|fabric|swatch|sofa|layout|palette|client|furniture|curtain|interior|color|desk|lobby|reception/.test(dateBlob) && /date|kiss|fart|spray|hang out|let's go|lets go|come with|dinner|sexy|flirt|my place|your place|bedroom/.test(dateBlob)) bondingDelta -= Math.min(6, rudeness(dateBlob));
	if (nextLocation === "dorm") flags.visitedDorm = true;
	if (state.playerFartRole === "not") {
		const stillKind = /don't mind|dont mind|it's (ok|fine|okay)|its (ok|fine)|still (like|love|want)|you('re| are) (fine|cute|hot)|i like you|not your fault|natural|come here|kiss/.test(talk);
		const flinch = /gross|eww|\bew\b|gag|cough|nasty|too (strong|much)|whoa|hold (it|on)|can't breathe|cant breathe/.test(talk);
		if (stillKind) bondingDelta += flinch ? 4 : 2;
	}
	let dates = state.dates ?? 0;
	let dateSpots = [...state.dateSpots ?? []];
	let dateOpen = asLocationId(state.dateOpen);
	let plannedDate = Boolean(state.plannedDate);
	let planTime = state.planTime;
	let planPlace = asLocationId(state.planPlace);
	let planGirl = state.planGirl ?? state.focus ?? "izzy";
	let dateNote = null;
	let dateDraft = state.dateDraft ?? null;
	let money = state.money ?? 100;
	let inventory = [...state.inventory ?? []];
	let activeDate = state.activeDate ? { ...state.activeDate } : null;
	let scheduledDate = state.scheduledDate ?? null;
	let dateReview = state.dateReview ?? null;
	let giftTrust = 0;
	let giftBond = 0;
	let giftSpeechLine = null;
	let giftTakenName = null;
	if (askingDate) {
		const hinted = awkwardMention(dateBlob, asked);
		if (hinted && isAwkwardPlace(hinted)) {
			dateNote = "refused";
			traveled = null;
			nextLocation = asLocationId(state.location) ?? "library";
			bondingDelta -= rudeness(dateBlob);
		} else if (taken) dateNote = "refused";
		else if (!dateReady) dateNote = "too-soon";
		else {
			const girl = state.focus ?? "izzy";
			const pre = prefillDate(dateBlob, asked, state.weekday);
			dateDraft = {
				girl,
				nth: dates + 1,
				time: pre.time,
				place: pre.place,
				day: pre.day,
				giftId: null
			};
			dateNote = "planner";
			traveled = null;
			nextLocation = asLocationId(state.location) ?? "library";
		}
	}
	if (activeDate && !activeDate.presented) {
		const reaction = giftReaction(activeDate);
		if (reaction && input.action.includes(reaction.line)) {
			giftTrust = reaction.delta.trust;
			giftBond = reaction.delta.bonding;
			giftSpeechLine = reaction.speech;
			if (activeDate.giftHeld !== true) {
				const nextBag = takeOne(inventory, activeDate.giftId);
				if (nextBag.length !== inventory.length) {
					inventory = nextBag;
					giftTakenName = giftById(activeDate.giftId)?.name ?? activeDate.giftId;
				}
			}
			activeDate = {
				...activeDate,
				presented: true,
				giftHeld: true
			};
		}
	}
	if (activeDate) activeDate = {
		...activeDate,
		smell: nextSmell(activeDate.smell, dateBlob)
	};
	if (activeDate?.presented && activeDate.giftHeld !== true) {
		inventory = takeOne(inventory, activeDate.giftId);
		activeDate = {
			...activeDate,
			giftHeld: true
		};
	}
	if (state.gameMode === "slow" && dateOpen && nextLocation === dateOpen && dates < 3) {
		dates += 1;
		dateSpots = [...dateSpots, dateOpen].slice(-3);
		dateOpen = null;
		plannedDate = false;
	}
	const testsDone = turn.testId ? [.../* @__PURE__ */ new Set([...state.testsDone, turn.testId])] : state.testsDone;
	const pace = {
		mode: state.gameMode === "slow" ? "slow" : "casual",
		dates
	};
	let trust = applyTrust(state.trust, (turn.trustDelta ?? 0) + giftTrust + (stoodDown ? 6 : 0), pace);
	let bonding = applyBonding(state.bonding, bondingDelta + giftBond + (stoodDown ? 4 : 0), pace);
	const gate = romanceGate(pace.mode, dates, dateSpots);
	if (pace.mode === "slow") {
		const ready = dates >= 3 && trust >= gate.trust && bonding >= gate.bonding && !romanceBlocked(state, trust, bonding, dates);
		if (turn.romanceOffer && ready) flags.romanceOffered = true;
		else if (!ready) flags.romanceOffered = false;
	} else if (romanceBlocked(state, trust, bonding, dates)) flags.romanceOffered = false;
	const romantic = Boolean(flags.romanceAccepted || pace.mode !== "slow" && turn.romanceOffer && trust >= gate.trust && bonding >= gate.bonding);
	let bond = bondFromScores(trust, bonding, romantic);
	const dest = placeOf(nextLocation);
	let outfit = autoOutfit(dest.defaultOutfit, trust, bond, nextLocation, flags);
	const requested = asOutfitId(turn.outfit);
	const cosplayOk = nextLocation === "dorm" && (bond === "romantic" || flags.romanceAccepted);
	if (state.debugOutfitLock && !traveled) outfit = asOutfitId(state.outfit) ?? outfit;
	else if (cosplayOk && flags.mymyInterest && /ongezellig|\bmymy\b|japamsterdam/.test(talk)) outfit = "mymy";
	else if (requested === "mymy" && cosplayOk && flags.mymyInterest) outfit = "mymy";
	else if (requested === "asuka") {
		if (nextLocation === "dorm" && flags.evaInterest && (bond === "romantic" || flags.romanceAccepted)) outfit = "asuka";
	} else if (requested) outfit = requested;
	const call = intimacyCall({
		...state,
		trust,
		bonding,
		flags,
		bond
	}, input, {
		threat: sprayKind === "defensive" || sprayKind === "angry",
		traveledPublic: Boolean(traveled && traveled !== "dorm" && traveled !== "apartment")
	});
	const hold = state.scentHold ?? 0;
	const relentless = scentRelentless({
		...state,
		trust,
		bonding,
		flags,
		bond
	}, input);
	const triedScent = turn.fx === "fart" || turn.fx === "spray" || Boolean(turn.sprayed) || turn.expression === "spray" || pendingIntimateSpray || sprayed && sprayKind !== "defensive" && sprayKind !== "angry";
	const suppressScent = Boolean(call.scene && hold > 0 && !call.release && !relentless && triedScent && !call.blocked);
	if ((call.blocked || call.redirect || suppressScent) && sprayKind !== "defensive" && sprayKind !== "angry") {
		sprayed = false;
		pendingIntimateSpray = false;
		if (sprayKind === "consensual" || sprayKind === "dominant") sprayKind = "none";
	}
	flags.intimateScene = call.scene;
	if (sprayed || sprayKind !== "none") flags.knowsAboutSpray = true;
	let glandCap = state.glandCap ?? 0;
	let glandShots = state.glandShots ?? 0;
	let turnsSinceIntimateSpray = state.turnsSinceIntimateSpray ?? 0;
	let glandDry = state.glandDry ?? 0;
	const focusOrigin = state.focus ?? "izzy";
	let tanks = {
		izzy: readTank(state.roster?.izzy),
		victoria: readTank(state.roster?.victoria)
	};
	tanks[focusOrigin] = readTank({
		glandCap,
		glandShots,
		turnsSinceIntimateSpray,
		glandDry
	});
	const emptiedGirls = [];
	let dialogue = turn.dialogue;
	let narration = turn.narration;
	let expression = turn.expression;
	if (warned) {
		narration = "Her ears pin. Her tail lifts halfway, not committed, a warning. She does not spray. Yet.";
		dialogue = "Don't move. I mean it. No sudden anything. Tell me you aren't about to hurt me, or I will.";
		expression = "suspicious";
	} else if (calmed) {
		narration = "The tail lowers. She is still watching your hands.";
		dialogue = "Okay. Okay. I believe you. Don't make me do that again. I hate that I have to.";
		expression = "shy";
	} else if (stoodDown && excused === (state.focus ?? "izzy")) {
		narration = "The tail lowers. She is still angry. She is not going to spray.";
		dialogue = (state.focus ?? "izzy") === "victoria" ? "I heard you. That does not make it fine. Don't do it again." : "Okay. I heard you. Don't leave me sitting there again.";
		expression = "angry";
	} else if (dateNote === "too-soon") {
		narration = "She doesn't move toward the door.";
		dialogue = (state.focus ?? "izzy") === "victoria" ? "A date is a decision. I'm not there. Ask me when I know you better than this." : "A date? Not yet. I like you here. I don't like you enough to call it that.";
		expression = "suspicious";
	} else if (dateNote === "refused") {
		narration = "She doesn't reach for her bag.";
		dialogue = (state.focus ?? "izzy") === "victoria" ? "No. You already have someone. I will not be the other woman." : "No. You already have a girlfriend. I'm not doing that.";
		expression = "angry";
	} else if (dateNote === "planner") {
		narration = "She is willing. Nothing is set until the day, the time, the place, and a gift are filled in.";
		dialogue = (state.focus ?? "izzy") === "victoria" ? "I'll go. Fill in the card. Day, time, place. And don't show up empty-handed." : "Yeah, I'll go. Fill it in. Day, time, place. You have to bring me something. That's the rule.";
		expression = "flirty";
	} else if (dateNote === "planned" && planTime && planPlace) {
		narration = "She files it away like it matters.";
		dialogue = `${planTime}. ${placeOf(planPlace).name}. That's a date. I'll meet you there. Don't stand me up.`;
		expression = "flirty";
	} else if (dateNote === "here") {
		narration = "She looks at the room like it just became something else.";
		dialogue = "Okay. This is a date. I'm counting it. Don't waste it.";
		expression = "flirty";
	} else if (dateNote === "going") {
		narration = "She falls in beside you like she decided.";
		dialogue = "Fine. It's a date. Don't make it a bit.";
		expression = "flirty";
	}
	if (sprayed && sprayKind === "defensive") {
		const copy = defensiveSprayCopy(threatLevel === "attack" ? "attack" : threatLevel === "scare" ? "scare" : "none");
		narration = copy.narration;
		dialogue = copy.dialogue;
		expression = "spray";
	} else if (call.blocked) {
		const copy = refusalCopy(state, call.blocked);
		narration = copy.narration;
		dialogue = copy.dialogue;
		expression = copy.expression;
	} else if (call.redirect) {
		const copy = redirectCopy(state);
		narration = copy.narration;
		dialogue = copy.dialogue;
		expression = copy.expression;
	} else if (suppressScent) {
		const copy = holdCopy(state.focus ?? "izzy", recentLines(state.messages, state.focus ?? "izzy"));
		narration = copy.narration;
		dialogue = copy.dialogue;
		expression = copy.expression;
	}
	const wantedIntimate = turn.sprayKind === "consensual" || turn.sprayKind === "dominant" || sprayKind === "dominant" || turn.pendingIntimateSpray || turn.fx === "spray" && intimateWant(state, input);
	const blockedEmpty = glandDry > 0 && (sprayed || wantedIntimate) && !warned && !calmed && !call.blocked && !call.redirect && !suppressScent;
	if (blockedEmpty) {
		sprayed = false;
		sprayKind = "none";
		pendingIntimateSpray = false;
		dialogue = emptyGlandLine(focusOrigin);
		narration = "Her tail lifts and nothing comes. The glands are empty.";
		expression = "shy";
	}
	if (sprayed && sprayKind !== "none") {
		const spent = spendTank(tanks[focusOrigin]);
		tanks[focusOrigin] = spent.tank;
		if (spent.emptied) emptiedGirls.push(focusOrigin);
	}
	const msgs = [...state.messages];
	if (nightShut) msgs.push({
		id: uid(),
		role: "narrator",
		at: Date.now(),
		text: `${placeOf(nightShut).name} is closed for the night.`
	});
	let girlReplies = 0;
	if (input.say.trim() || input.action.trim() || input.thought?.trim() || input.beats?.length || input.invite || input.inviteReply) appendPlayer(msgs, input);
	if (traveled) {
		const destPlace = placeOf(traveled);
		msgs.push({
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `You end up at ${destPlace.name}. ${destPlace.blurb}`
		});
	}
	const focusNow = state.focus ?? "izzy";
	let liveFocus = focusNow;
	const voice = speakerRole(focusNow);
	girlName(focusNow);
	let present = state.izzyHere === false ? [...state.present ?? []] : [...state.present?.length ? state.present : [focusNow]];
	let roster = state.roster ?? initialCast(focusNow).roster;
	let affairKnown = Boolean(state.affairKnown);
	let partner = state.partner ?? null;
	let meetKind = state.meetKind ?? "plan";
	if (traveled) {
		const other = otherGirl(focusNow);
		let party = inviteParty(state, `${input.say} ${input.action}`, traveled);
		const wasWith = state.izzyHere !== false && (state.present ?? []).includes(other);
		if (!party.includes(other) && dutyOf(other, state.weekday, state.timeOfDay) === "free") {
			const chance = companionChance(focusNow, traveled);
			if (chance > 0 && Math.random() < chance) {
				party = [...party, other];
				const first = !roster[other]?.met;
				roster = withGirl({
					...state,
					roster
				}, other, {
					met: true,
					expression: other === "victoria" ? "shy" : "happy",
					trust: Math.max(roster[other]?.trust ?? 0, first ? 4 : roster[other]?.trust ?? 0),
					bonding: Math.max(roster[other]?.bonding ?? 0, first ? 2 : roster[other]?.bonding ?? 0)
				});
				msgs.push({
					id: uid(),
					role: "narrator",
					at: Date.now(),
					text: describeArrival(focusNow, other, traveled, first)
				});
			}
		} else if (party.includes(other) && !wasWith) {
			const first = !roster[other]?.met;
			roster = withGirl({
				...state,
				roster
			}, other, {
				met: true,
				expression: "happy",
				trust: Math.max(roster[other]?.trust ?? 0, first ? 4 : roster[other]?.trust ?? 0),
				bonding: Math.max(roster[other]?.bonding ?? 0, first ? 2 : roster[other]?.bonding ?? 0)
			});
			msgs.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `${girlName(other)} is already at ${placeOf(traveled).name}.`
			});
			if (dutyOf(other, state.weekday, state.timeOfDay) === "work" && traveled === dutyPlace(other)) msgs.push({
				id: uid(),
				role: speakerRole(other),
				at: Date.now(),
				expression: "thinking",
				text: other === "victoria" ? "I'm at the desk. If this is about a room, a fabric, or a client, I can help. Anything else will have to wait." : "I'm on the floor. If you need a pack, ask. If this is a hangout, I'm working."
			});
		}
		const leftBehind = (state.izzyHere === false ? [] : state.present ?? []).filter((id) => !party.includes(id));
		for (const girl of leftBehind) msgs.push({
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `${girlName(girl)} doesn't come.`
		});
		present = party;
	}
	let forcedFx = null;
	const playerBlob = `${input.say} ${input.action}`;
	const askedPublic = playfulPublicAsk(playerBlob) && !isPrivatePlace(nextLocation) && !relentless;
	const recentFart = state.messages.slice(-6).some((message) => message.role === voice && message.fx === "fart");
	if (askedPublic && !warned && !calmed && !sprayed && !suppressScent && !call.blocked && !call.redirect) {
		const onDuty = dutyOf(focusNow, state.weekday, state.timeOfDay) !== "free";
		const company = present.includes("izzy") && present.includes("victoria");
		const again = recentFart && !(focusNow === "izzy" && company);
		const yes = !again && indulgesPublicFart(focusNow, nextLocation, trust, company, onDuty);
		const tried = turn.fx === "fart" || mentionsFart(`${dialogue} ${narration}`);
		if (!yes) {
			const said = recentLines(state.messages, focusNow);
			const copy = again ? holdCopy(focusNow, said) : publicFartNo(focusNow, said);
			narration = copy.narration;
			dialogue = copy.dialogue;
			expression = copy.expression;
			forcedFx = "none";
		} else if (!tried) {
			const copy = publicFartYes(focusNow, company);
			narration = copy.narration;
			dialogue = copy.dialogue;
			expression = copy.expression;
			forcedFx = "fart";
		}
	}
	const focusAllowed = canFartNow(readGut(roster[focusNow]), trust, nextLocation);
	const quiet = warned || calmed || blockedEmpty || Boolean(call.blocked) || call.redirect || suppressScent;
	if ((forcedFx ?? (quiet ? "none" : sprayed ? "spray" : turn.fx)) === "fart" && !focusAllowed) {
		const copy = holdCopy(focusNow, recentLines(state.messages, focusNow));
		narration = copy.narration;
		dialogue = copy.dialogue;
		expression = copy.expression;
		forcedFx = "none";
	}
	if (narration?.trim()) msgs.push({
		id: uid(),
		role: "narrator",
		at: Date.now(),
		text: narration.trim()
	});
	msgs.push({
		id: uid(),
		role: voice,
		at: Date.now(),
		text: dialogue,
		expression,
		trustDelta: turn.trustDelta,
		bondingDelta: turn.bondingDelta,
		fx: forcedFx ?? (warned || calmed || blockedEmpty || call.blocked || call.redirect || suppressScent ? "none" : sprayed ? "spray" : turn.fx)
	});
	if (present.includes(focusNow) && (dialogue.trim() || sprayed || turn.fx === "fart" || turn.fx === "spray")) girlReplies += 1;
	if (giftSpeechLine && activeDate) {
		const given = giftById(activeDate.giftId);
		const mentioned = given ? dialogue.toLowerCase().includes(given.name.split(" ")[0].toLowerCase()) : false;
		if (giftTakenName) msgs.push({
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `You give her the ${giftTakenName}. It's out of your bag.`
		});
		if (!mentioned) msgs.push({
			id: uid(),
			role: voice,
			at: Date.now(),
			expression: "shy",
			text: giftSpeechLine
		});
	}
	if (excused && activeDate && excused !== activeDate.girl) {
		present = present.filter((id) => id !== excused);
		msgs.push({
			id: uid(),
			role: speakerRole(excused),
			at: Date.now(),
			expression: "angry",
			text: excused === "victoria" ? "I heard you. That does not make it fine. Don't do it again." : "Okay. I heard you. Don't leave me sitting there again."
		});
		msgs.push({
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `${girlName(excused)} lets the tail down. She doesn't stay.`
		});
	}
	let pairedFart = false;
	let pairedSpray = false;
	let otherSprayKind = "none";
	let otherSprayer = null;
	if (bothHere({ present })) {
		const other = otherGirl(focusNow);
		let otherFx = turn.otherFx ?? "none";
		const namedKind = turn.otherSprayKind;
		if (otherFx !== "fart" && (otherFx === "spray" || namedKind)) {
			otherSprayKind = namedKind === "angry" || namedKind === "consensual" || namedKind === "defensive" || namedKind === "dominant" ? namedKind : "consensual";
			otherFx = "spray";
		}
		const hardSpray = otherSprayKind === "angry" || otherSprayKind === "defensive";
		const holdGas = warned || calmed || blockedEmpty || call.blocked || call.redirect || suppressScent;
		const sidelined = !/\b(izzy|isabella)\b/i.test(playerBlob);
		if (other === "izzy" && otherFx !== "fart" && otherFx !== "spray" && !holdGas && dutyOf("izzy", state.weekday, state.timeOfDay) === "free" && canFartNow(readGut(roster.izzy), roster.izzy?.trust ?? trust, nextLocation) && indulgesPublicFart("izzy", nextLocation, roster.izzy?.trust ?? trust, true, false) && (askedPublic || sidelined && (state.sceneTurns ?? 0) % 3 === 0)) {
			otherFx = "fart";
			if (!turn.otherDialogue?.trim()) {
				turn.otherDialogue = "Hey. I'm still in this. That one was so you'd look at me.";
				turn.otherExpression = "flirty";
			}
		}
		const otherDry = tanks[other].glandDry > 0;
		let otherBlocked = false;
		let otherHeld = null;
		if (otherFx === "fart" && holdGas) otherFx = "none";
		if (otherFx === "fart" && !canFartNow(readGut(roster[other]), roster[other]?.trust ?? 0, nextLocation)) {
			otherFx = "none";
			otherHeld = holdCopy(other, recentLines(state.messages, other)).dialogue;
		}
		if (otherFx === "spray" && otherDry) {
			otherFx = "none";
			otherSprayKind = "none";
			otherBlocked = true;
		} else if (otherFx === "spray" && !hardSpray && holdGas) {
			otherFx = "none";
			otherSprayKind = "none";
		}
		if (otherFx === "fart") pairedFart = true;
		if (otherFx === "spray") {
			pairedSpray = true;
			otherSprayer = other;
			const spent = spendTank(tanks[other]);
			tanks[other] = spent.tank;
			if (spent.emptied) emptiedGirls.push(other);
		} else otherSprayKind = "none";
		const line = turn.otherDialogue?.trim() ?? "";
		if (line || otherFx === "fart" || otherFx === "spray" || otherBlocked) {
			const spoken = otherBlocked ? emptyGlandLine(other) : otherHeld ? otherHeld : line || (other === "victoria" ? "I wasn't going to. Then I did." : "Okay. Mine too.");
			const otherExpression = otherBlocked ? "shy" : otherFx === "spray" ? "spray" : turn.otherExpression ?? roster[other]?.expression ?? "shy";
			msgs.push({
				id: uid(),
				role: speakerRole(other),
				at: Date.now(),
				text: spoken,
				expression: otherExpression,
				fx: otherFx === "none" ? void 0 : otherFx
			});
			girlReplies += 1;
			const card = roster[other];
			if (card) {
				const nextTrust = Math.max(0, Math.min(100, card.trust + Math.round(turn.otherTrustDelta ?? 0)));
				const nextBond = Math.max(0, Math.min(100, card.bonding + Math.round(turn.otherBondingDelta ?? 0)));
				roster = withGirl({
					...state,
					roster
				}, other, {
					trust: nextTrust,
					bonding: nextBond,
					bond: bondFromScores(nextTrust, nextBond, card.romanceAccepted),
					expression: otherExpression,
					met: true,
					knowsAboutSpray: card.knowsAboutSpray || otherFx === "spray"
				});
			}
		}
	}
	const sprayPrompts = [];
	const windowFor = (kind) => kind !== "none" && !(kind === "consensual" && flags.intimateSprayResolved);
	if (sprayed && windowFor(sprayKind)) sprayPrompts.push({
		girl: focusNow,
		kind: sprayKind
	});
	if (pairedSpray && otherSprayer && windowFor(otherSprayKind)) sprayPrompts.push({
		girl: otherSprayer,
		kind: otherSprayKind
	});
	if (activeDate && !confronting) {
		const other = otherGirl(activeDate.girl);
		if (grudge[other] && !present.includes(other)) {
			present = [...present, other];
			confronting = other;
			const dateGirl = activeDate.girl;
			const crash = dateCrashLine(dateGirl);
			if (dateGirl === liveFocus) {
				trust = applyTrust(trust, crash.trust, pace);
				bonding = applyBonding(bonding, crash.bonding, pace);
				bond = bondFromScores(trust, bonding, romantic);
				expression = crash.expression;
				roster = withGirl({
					...state,
					roster
				}, dateGirl, {
					trust,
					bonding,
					bond,
					expression
				});
			} else {
				const card = roster[dateGirl];
				const nextTrust = applyTrust(card?.trust ?? 0, crash.trust, pace);
				const nextBond = applyBonding(card?.bonding ?? 0, crash.bonding, pace);
				roster = withGirl({
					...state,
					roster
				}, dateGirl, {
					trust: nextTrust,
					bonding: nextBond,
					bond: bondFromScores(nextTrust, nextBond, Boolean(card?.romanceAccepted)),
					expression: crash.expression
				});
			}
			msgs.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `${girlName(other)} is here. She was not invited. Her tail is already up.`
			});
			msgs.push({
				id: uid(),
				role: speakerRole(other),
				at: Date.now(),
				expression: "angry",
				text: other === "victoria" ? "You stood me up, and now I find you here. Talk. You have one chance before I spray." : "You left me waiting. And you're on a date. Start talking, or I spray. I mean it."
			});
			msgs.push({
				id: uid(),
				role: speakerRole(dateGirl),
				at: Date.now(),
				expression: crash.expression,
				text: crash.text
			});
		}
	}
	if (!call.scene) affairKnown = false;
	const hit = fidelityHit({
		...state,
		present,
		roster,
		affairKnown,
		partner,
		focus: focusNow
	}, `${input.say} ${input.action}`, Boolean(call.scene));
	if (hit) {
		roster = hit.roster;
		partner = hit.partner;
		affairKnown = hit.affairKnown;
		for (const line of hit.lines) msgs.push({
			id: uid(),
			role: line.role,
			at: Date.now(),
			text: line.text,
			expression: line.expression
		});
	}
	for (const girl of emptiedGirls) msgs.push({
		id: uid(),
		role: "narrator",
		at: Date.now(),
		text: `${girlName(girl)} emptied her scent glands. Every spray draws from them. She needs a while before she can spray again.`
	});
	if (turn.inner?.trim() && trust >= 40 && !warned && !calmed && !sprayed && !call.blocked && !call.redirect && !suppressScent) msgs.push({
		id: uid(),
		role: "system",
		at: Date.now(),
		text: turn.inner.trim()
	});
	let turnsUntilTime = state.turnsUntilTime;
	let timeOfDay = state.timeOfDay;
	let weekday = state.weekday;
	const timeBefore = timeOfDay;
	const dayBefore = weekday;
	let daySerial = state.daySerial ?? 0;
	let showersToday = state.showersToday ?? 0;
	let dayPhase = state.dayPhase;
	let clockMoved = false;
	let shiftsWorked = state.shiftsWorked ?? 0;
	let workedToday = Boolean(state.workedToday);
	const lineFx = forcedFx ?? (quiet ? "none" : sprayed ? "spray" : turn.fx);
	const dayFarts = state.dayFarts + (lineFx === "fart" ? 1 : 0) + (pairedFart ? 1 : 0);
	if (activeDate && (lineFx === "fart" || pairedFart)) activeDate = {
		...activeDate,
		farts: activeDate.farts + (lineFx === "fart" ? 1 : 0) + (pairedFart ? 1 : 0)
	};
	let daySprays = sprayed ? bumpSpray(state.daySprays, sprayKind) : state.daySprays;
	if (pairedSpray && otherSprayKind !== "none") daySprays = bumpSpray(daySprays, otherSprayKind);
	const dayTopics = topicsFrom(`${input.say} ${input.action} ${dialogue}`, state.dayTopics ?? []);
	const emittedScent = call.scene && !quiet && (lineFx === "fart" || sprayed && (sprayKind === "consensual" || sprayKind === "dominant"));
	const scentHold = !call.scene ? 0 : relentless ? 0 : emittedScent ? 2 : Math.max(0, hold - 1);
	if (call.concluded && timeOfDay === "Night" && flags.romanceAccepted && !isPrivatePlace(nextLocation) && !pendingInvite && dayPhase === "playing") {
		pendingInvite = home;
		msgs.push({
			id: uid(),
			role: voice,
			at: Date.now(),
			expression: "flirty",
			text: focusNow === "victoria" ? "It's still night. My house, or your apartment. I'm asking. Come home with me." : "It's still night. My dorm, or your apartment. I'm asking. Come with me."
		});
	}
	if (dayPhase === "playing") {
		const nightScene = call.scene && timeOfDay === "Night" && !activeDate;
		const dutyExitThisTurn = !traveled && !activeDate && (state.dutyNotice ?? []).some((notice) => present.includes(notice.girl));
		const hardSpray = sprayed && (sprayKind === "defensive" || sprayKind === "angry");
		if (nightScene || girlReplies <= 0) {} else if (hardSpray || dutyExitThisTurn) turnsUntilTime = Math.max(1, turnsUntilTime - girlReplies);
		else {
			turnsUntilTime -= girlReplies;
			if (turnsUntilTime <= 0) {
				const prevTime = timeOfDay;
				const prevDay = weekday;
				const next = advanceTime(timeOfDay);
				timeOfDay = next.time;
				turnsUntilTime = Math.max(1, 10 + turnsUntilTime);
				clockMoved = true;
				pressedDuty = null;
				if (next.dayRoll) {
					weekday = nextWeekday(weekday);
					workedToday = false;
					daySerial += 1;
					showersToday = 0;
					if (weekday === "Monday") {
						const shifts = shiftsWorked;
						const pay = shifts * 20;
						money += pay;
						shiftsWorked = 0;
						msgs.push({
							id: uid(),
							role: "system",
							at: Date.now(),
							text: shifts ? `Payday. ${shifts} shift${shifts === 1 ? "" : "s"}. $${pay}.` : "Monday. You didn't work. Nothing hits your account."
						});
					}
				}
				const missed = scheduledDate && !activeDate && scheduledDate.day === prevDay && scheduledDate.time === prevTime;
				const together = isCouple({
					flags,
					bond
				});
				if (activeDate) {
					const left = activeDate.cyclesLeft - 1;
					if (left <= 0) {
						const review = buildReview(activeDate, trust, bonding);
						dates += 1;
						dateSpots = [...dateSpots, activeDate.place].slice(-3);
						plannedDate = false;
						dateOpen = null;
						msgs.push({
							id: uid(),
							role: "narrator",
							at: Date.now(),
							text: "The date has run its length. She doesn't rush the last word."
						});
						msgs.push({
							id: uid(),
							role: voice,
							at: Date.now(),
							expression: review.nextChance === "no" ? "shy" : "happy",
							text: closingLine(activeDate.girl, review.nextChance)
						});
						dateReview = review;
						activeDate = null;
					} else activeDate = {
						...activeDate,
						cyclesLeft: left
					};
				} else if (missed && scheduledDate) {
					const hurt = scheduledDate.girl;
					const dropTrust = applyTrust(hurt === focusNow ? trust : state.roster?.[hurt]?.trust ?? trust, -30, pace);
					const dropBond = applyBonding(hurt === focusNow ? bonding : state.roster?.[hurt]?.bonding ?? bonding, -24, pace);
					grudge = {
						...grudge,
						[hurt]: {
							place: scheduledDate.place,
							day: prevDay,
							time: prevTime
						}
					};
					if (scheduledDate.giftId) inventory = giveBack(inventory, scheduledDate.giftId, scheduledDate.giftHeld);
					if (hurt === focusNow) {
						trust = dropTrust;
						bonding = dropBond;
						bond = bondFromScores(dropTrust, dropBond, romantic);
					}
					roster = withGirl({
						...state,
						roster
					}, hurt, {
						trust: dropTrust,
						bonding: dropBond,
						bond: bondFromScores(dropTrust, dropBond, Boolean(state.roster?.[hurt]?.romanceAccepted))
					});
					msgs.push({
						id: uid(),
						role: "narrator",
						at: Date.now(),
						text: `The hour passed. ${girlName(hurt)} was waiting. You were not there.`
					});
					scheduledDate = null;
				} else if (timeOfDay === "Night" && together && openTonight(nextLocation, "Night") && !isPrivatePlace(nextLocation) && !pendingInvite) {
					pendingInvite = home;
					msgs.push({
						id: uid(),
						role: voice,
						at: Date.now(),
						expression: "flirty",
						text: focusNow === "victoria" ? "It's night and I'm not walking back alone. My house, or your apartment. I'm asking." : "It's night and I'm not walking back alone. My dorm, or your apartment. I'm asking. Come with me."
					});
				}
			}
		}
	}
	let gas = ageGas(state.gas);
	let sceneTurns = traveled ? 1 : dayPhase === "playing" ? (state.sceneTurns ?? 0) + 1 : state.sceneTurns ?? 0;
	let departure = clockMoved ? null : state.departure ?? null;
	let trailStreak = clockMoved ? 0 : state.trailStreak ?? 0;
	let trailGirl = clockMoved ? null : state.trailGirl ?? null;
	let izzyHere = state.izzyHere !== false;
	const talkLength = `${input.say} ${input.action}`.trim().length;
	const swing = (turn.trustDelta ?? 0) + (turn.bondingDelta ?? 0);
	const offendedNow = wasOffended(`${input.say} ${input.action}`, swing);
	const engaged = swing >= 2 || talkLength > 80;
	const boredTalk = swing <= 0 && talkLength < 28;
	let dutyNotice = traveled || activeDate ? [] : [...state.dutyNotice ?? []];
	const due = traveled || activeDate || dayPhase !== "playing" ? [] : dutyNotice.filter((notice) => present.includes(notice.girl));
	if (due.length) {
		lastDutyCut = msgs.length;
		lastDutyGone = due.map((notice) => notice.girl);
		const spokenFrom = state.messages.length;
		for (const notice of due) {
			const gone = notice.girl;
			if (!msgs.slice(spokenFrom).some((message) => {
				return message.role === speakerRole(gone) && (goodbyeSaid(message.text) || /\b(class|shift|clock in|trailhead|line & lumen|i have to go)\b/i.test(message.text));
			})) msgs.push({
				id: uid(),
				role: speakerRole(gone),
				at: Date.now(),
				expression: "thinking",
				text: dutyFarewell(gone, notice.duty)
			});
			if (gone === liveFocus) roster = withGirl({
				...state,
				roster
			}, gone, {
				trust,
				bonding,
				bond,
				expression: "thinking",
				romanceOffered: flags.romanceOffered,
				romanceAccepted: flags.romanceAccepted,
				knowsAboutSpray: flags.knowsAboutSpray,
				scentInterest: flags.scentInterest,
				dates,
				dateSpots,
				outfit
			});
			present = present.filter((id) => id !== gone);
			departure = {
				girl: gone,
				place: notice.place
			};
			if (trailGirl !== gone) trailStreak = 0;
			trailGirl = gone;
			sceneTurns = 0;
			const seated = seatAfterExit(gone, present, roster, {
				liveFocus,
				trust,
				bonding,
				bond,
				expression,
				outfit,
				dates,
				dateSpots,
				flags,
				izzyHere
			});
			liveFocus = seated.liveFocus;
			trust = seated.trust;
			bonding = seated.bonding;
			bond = seated.bond;
			expression = seated.expression;
			outfit = seated.outfit;
			dates = seated.dates;
			dateSpots = seated.dateSpots;
			flags = seated.flags;
			izzyHere = seated.izzyHere;
			msgs.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: present.length ? `${dutyExitNarration(gone, notice.duty)} ${girlName(present[0])} stays.` : dutyExitNarration(gone, notice.duty)
			});
		}
		dutyNotice = dutyNotice.filter((notice) => !due.some((item) => item.girl === notice.girl));
	}
	if (!due.length && izzyHere && dayPhase === "playing" && !clockMoved && !activeDate && !confronting && !sprayed && !pendingIntimateSpray && !pendingDefensive && !flags.intimateScene && !call.scene && !traveled && !dateDraft && !warned && !calmed && (sceneTurns >= 5 || offendedNow) && present.includes(liveFocus) && Math.random() < leaveChance({
		...state,
		trust,
		bonding
	}, liveFocus, engaged, boredTalk)) {
		const reason = leaveReason(state, liveFocus, boredTalk);
		const gone = liveFocus;
		roster = withGirl({
			...state,
			roster
		}, gone, {
			trust,
			bonding,
			bond,
			expression: "shy",
			romanceOffered: flags.romanceOffered,
			romanceAccepted: flags.romanceAccepted,
			knowsAboutSpray: flags.knowsAboutSpray,
			scentInterest: flags.scentInterest,
			dates,
			dateSpots,
			outfit
		});
		present = present.filter((id) => id !== gone);
		departure = {
			girl: gone,
			place: nextStop(gone, timeOfDay, nextLocation, weekday)
		};
		if (trailGirl !== gone) trailStreak = 0;
		trailGirl = gone;
		sceneTurns = 0;
		msgs.push({
			id: uid(),
			role: speakerRole(gone),
			at: Date.now(),
			expression: "shy",
			text: leaveCopy(gone, reason)
		});
		if (present.length) {
			const stay = present[0];
			const card = roster[stay];
			if (card) {
				liveFocus = stay;
				trust = card.trust;
				bonding = card.bonding;
				bond = card.bond;
				expression = card.expression;
				outfit = card.outfit;
				dates = card.dates;
				dateSpots = [...card.dateSpots];
				flags = {
					...flags,
					romanceOffered: card.romanceOffered,
					romanceAccepted: card.romanceAccepted,
					knowsAboutSpray: card.knowsAboutSpray,
					scentInterest: card.scentInterest
				};
			}
			izzyHere = true;
			msgs.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `${girlName(gone)} leaves. She doesn't say where. ${girlName(stay)} stays.`
			});
		} else {
			izzyHere = false;
			msgs.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `${girlName(gone)} leaves. She doesn't say where she's going. You're on your own.`
			});
		}
	}
	if (clockMoved && dayPhase === "playing" && !activeDate) for (const girl of present) {
		if (dutyNotice.some((notice) => notice.girl === girl)) continue;
		const after = dutyOf(girl, weekday, timeOfDay);
		const before = dutyOf(girl, dayBefore, timeBefore);
		if (after === "free" || after === before) continue;
		const place = dutyStop(girl, weekday, timeOfDay);
		if (!place || place === nextLocation) continue;
		dutyNotice = [...dutyNotice, {
			girl,
			duty: after,
			place
		}];
		msgs.push({
			id: uid(),
			role: speakerRole(girl),
			at: Date.now(),
			expression: "thinking",
			text: dutyWarn(girl, after)
		});
	}
	if (clockMoved && timeOfDay === "Night") {
		const speakers = present.map((girl) => {
			if (girl === liveFocus) return {
				girl,
				trust,
				bonding,
				official: Boolean(flags.romanceAccepted) || bond === "romantic"
			};
			const card = roster[girl];
			return {
				girl,
				trust: card?.trust ?? 0,
				bonding: card?.bonding ?? 0,
				official: Boolean(card?.romanceAccepted) || card?.bond === "romantic"
			};
		});
		const closed = nightClose({
			location: nextLocation,
			present,
			focus: liveFocus,
			intimate: Boolean(flags.intimateScene) || call.scene,
			girls: speakers
		});
		if (closed) {
			msgs.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: closed.narrator
			});
			for (const line of closed.spoken) msgs.push({
				id: uid(),
				role: speakerRole(line.girl),
				at: Date.now(),
				expression: line.expression,
				text: line.text
			});
			if (closed.left.includes(liveFocus)) roster = withGirl({
				...state,
				roster
			}, liveFocus, {
				trust,
				bonding,
				bond,
				expression,
				outfit,
				met: true,
				romanceOffered: flags.romanceOffered,
				romanceAccepted: flags.romanceAccepted,
				knowsAboutSpray: flags.knowsAboutSpray,
				scentInterest: flags.scentInterest,
				dates,
				dateSpots
			});
			present = closed.staying;
			if (!present.length) izzyHere = false;
			else if (!present.includes(liveFocus)) {
				const stay = present[0];
				const card = roster[stay];
				if (card) {
					liveFocus = stay;
					trust = card.trust;
					bonding = card.bonding;
					bond = card.bond;
					expression = card.expression;
					outfit = card.outfit;
					dates = card.dates ?? 0;
					dateSpots = [...card.dateSpots ?? []];
					flags = {
						...flags,
						romanceOffered: card.romanceOffered,
						romanceAccepted: card.romanceAccepted,
						knowsAboutSpray: card.knowsAboutSpray,
						scentInterest: card.scentInterest
					};
				}
				izzyHere = true;
			} else izzyHere = true;
			if (closed.inviteHome && !pendingInvite) pendingInvite = closed.inviteHome;
			if (closed.showPlaces) openPlacesAfterTurn = true;
		}
	}
	const seatedTank = tanks[liveFocus];
	glandCap = seatedTank.glandCap;
	glandShots = seatedTank.glandShots;
	turnsSinceIntimateSpray = seatedTank.turnsSinceIntimateSpray;
	glandDry = seatedTank.glandDry;
	roster = withGirl({
		...state,
		roster
	}, "izzy", tanks.izzy);
	roster = withGirl({
		...state,
		roster
	}, "victoria", tanks.victoria);
	return {
		trust,
		bonding,
		bond,
		focus: liveFocus,
		location: nextLocation,
		expression: warned ? "suspicious" : calmed ? "shy" : sprayed ? "spray" : expression === "spray" ? "flirty" : expression,
		outfit,
		flags,
		testsDone,
		pendingTest: turn.testId ?? null,
		pendingInvite,
		pendingIntimateSpray,
		pendingDefensive,
		threatLevel,
		glandCap,
		glandShots,
		turnsSinceIntimateSpray,
		glandDry,
		scentHold,
		messages: msgs,
		sprayed: sprayed || sprayPrompts.length > 0,
		sprayKind,
		otherSprayKind: pairedSpray ? otherSprayKind : "none",
		sprayPrompts,
		sprayCount: state.sprayCount + (sprayed ? 1 : 0) + (pairedSpray ? 1 : 0),
		weekday,
		timeOfDay,
		turnsUntilTime,
		dayPhase,
		izzyHere,
		dayFarts,
		daySprays,
		dayTopics,
		dates,
		dateSpots,
		dateOpen,
		plannedDate,
		planTime,
		planPlace,
		planGirl,
		present,
		roster,
		partner,
		affairKnown,
		meetKind,
		morningDetour: state.morningDetour && dayPhase !== "handoff" ? state.morningDetour : dayPhase === "handoff" ? true : state.morningDetour,
		debug: state.debug,
		debugOutfitLock: traveled ? false : state.debugOutfitLock,
		money,
		inventory,
		dateDraft,
		scheduledDate,
		activeDate,
		dateReview,
		confronting,
		grudge,
		gas,
		departure,
		trailStreak,
		trailGirl,
		sceneTurns,
		shiftsWorked,
		workedToday,
		pressedDuty,
		daySerial,
		showersToday,
		dutyNotice
	};
}
function pickEmpty() {
	const lines = [
		"I would. I can't. Glands are dry. They refill, they don't print more. Give me a dozen breaths.",
		"Tail's up and nothing's coming. I'm out. Don't make that face — it's biology.",
		"Nope. Empty. You already got the magazine. Let them rest."
	];
	return lines[Math.floor(Math.random() * lines.length)];
}
function emptyGlandLine(girl) {
	if (girl === "victoria") {
		const lines = [
			"Nothing comes out. The glands are empty. I need a while.",
			"I would spray. I can't. They're dry.",
			"That's the last of it. I'm empty."
		];
		return lines[Math.floor(Math.random() * lines.length)];
	}
	return pickEmpty();
}
function intimateWant(state, input) {
	const hay = `${input.say} ${input.action}`;
	return state.pendingIntimateSpray || state.flags.romanceAccepted || state.bond === "romantic" || /\bspray\b/i.test(hay);
}
function systemNote(state, text) {
	return [...state.messages, {
		id: uid(),
		role: "system",
		at: Date.now(),
		text
	}];
}
var SPRAY_DEBUG_LINES = {
	angry: {
		narration: "Her tail snaps up. She yanks her bottoms down. The air goes thick and chemical-sweet.",
		dialogue: "That's the line. You don't get to talk to me like that."
	},
	consensual: {
		narration: "She looks back over her shoulder, tail high, and lets it go on purpose.",
		dialogue: "Don't move. This is the real me. Take it."
	},
	defensive: defensiveSprayCopy("scare"),
	dominant: {
		narration: "She looks back with a mean little smile, shorts at her thighs, tail high. She is not asking.",
		dialogue: "Stay. You can take this. I want to watch you try."
	}
};
var VICTORIA_SPRAY_DEBUG = {
	angry: {
		narration: "Both hands go behind her. She hikes the pencil skirt and her tail snaps up, aimed. The air goes thick and chemical-sweet.",
		dialogue: "That is the line. You don't get to talk to me like that."
	},
	consensual: {
		narration: "She looks back, shy, and pulls the skirt up with both hands so her tail has a clear line. Then she lets it go on purpose.",
		dialogue: "Don't move. I want to see what this does to you."
	},
	defensive: {
		narration: "She is scared and precise. Both hands yank the skirt up, tail high, and a defensive jet hits like a wall.",
		dialogue: "Stay back. I sprayed you because I thought you were a threat. Tail up. That is why."
	},
	dominant: {
		narration: "She looks back with a knowing smile, both hands holding the skirt up, tail high. She is not asking.",
		dialogue: "Stay. You can take this. I want to watch you try."
	}
};
function sprayDebugLines(girl, kind) {
	return girl === "victoria" ? VICTORIA_SPRAY_DEBUG[kind] : SPRAY_DEBUG_LINES[kind];
}
function fireSpray(kind, get, set) {
	const s = get();
	const focus = s.focus ?? "izzy";
	const tank = readTank(s);
	if (tank.glandDry > 0) {
		const messages = systemNote(s, `${girlName(focus)}'s scent glands are empty. She cannot spray.`);
		set({
			messages,
			draft: ""
		});
		persist({ messages }, get);
		return;
	}
	const spent = spendTank(tank);
	const lines = sprayDebugLines(focus, kind);
	const flags = {
		...s.flags,
		knowsAboutSpray: true
	};
	const messages = [
		...s.messages,
		{
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: lines.narration
		},
		{
			id: uid(),
			role: speakerRole(focus),
			at: Date.now() + 1,
			expression: "spray",
			fx: "spray",
			text: lines.dialogue
		},
		...spent.emptied ? [{
			id: uid(),
			role: "narrator",
			at: Date.now() + 2,
			text: `${girlName(focus)} emptied her scent glands. Every spray draws from them. She needs a while before she can spray again.`
		}] : []
	];
	const roster = withGirl(asGameState(s), focus, spent.tank);
	const patch = {
		sprayed: true,
		sprayKind: kind,
		otherSprayKind: "none",
		sprayPrompts: kind === "consensual" && s.flags.intimateSprayResolved ? [] : [{
			girl: focus,
			kind
		}],
		sprayCount: s.sprayCount + 1,
		expression: "spray",
		pendingIntimateSpray: false,
		flags,
		messages,
		roster,
		glandCap: spent.tank.glandCap,
		glandShots: spent.tank.glandShots,
		turnsSinceIntimateSpray: spent.tank.turnsSinceIntimateSpray,
		glandDry: spent.tank.glandDry
	};
	const poured = expose(clampStink(s.stink ?? 0), normalizeScent(s.scentFrom), [{
		girl: focus,
		amount: 10
	}]);
	patch.stink = poured.stink;
	patch.scentFrom = poured.scent;
	set({
		...patch,
		spraySpotlight: true,
		draft: "",
		fxPulse: {
			kind: "spray",
			key: Date.now()
		}
	});
	persist(patch, get);
}
function runDebugCommand(cmd, get, set) {
	const s = get();
	if (cmd.kind === "travel") {
		if (!cmd.location) {
			const messages = systemNote(s, "Travel needs a place. Example: /travel @(Casa Luna)");
			set({
				messages,
				draft: ""
			});
			persist({ messages }, get);
			return;
		}
		const dest = placeOf(cmd.location);
		const outfit = (s.focus ?? "izzy") === "victoria" ? "work" : autoOutfit(dest.defaultOutfit, s.trust, s.bond, cmd.location, s.flags);
		const messages = [...s.messages, {
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `You end up at ${dest.name}. ${dest.what}`
		}];
		set({
			location: cmd.location,
			outfit,
			pendingInvite: null,
			debugOutfitLock: false,
			messages,
			sprayed: false,
			sprayKind: "none",
			otherSprayKind: "none",
			sprayPrompts: [],
			spraySpotlight: false,
			draft: "",
			expression: s.expression === "spray" ? "happy" : s.expression
		});
		persist({
			location: cmd.location,
			outfit,
			pendingInvite: null,
			debugOutfitLock: false,
			messages,
			sprayed: false,
			sprayKind: "none",
			otherSprayKind: "none",
			sprayPrompts: [],
			expression: s.expression === "spray" ? "happy" : s.expression
		}, get);
		return;
	}
	if (cmd.kind === "cycle_outfit") {
		if ((s.focus ?? "izzy") === "victoria") {
			const patch = {
				outfit: "work",
				debugOutfitLock: true,
				messages: systemNote(s, "Outfit: office blouse and pencil skirt. Victoria doesn't change clothes.")
			};
			set({
				...patch,
				draft: ""
			});
			persist(patch, get);
			return;
		}
		const i = nextIndex(Math.max(0, OUTFIT_CYCLE.indexOf(asOutfitId(s.outfit) ?? "casual")), OUTFIT_CYCLE.length);
		const outfit = OUTFIT_CYCLE[i];
		const messages = systemNote(s, `Outfit: ${outfit}`);
		set({
			outfit,
			debugOutfitLock: true,
			messages,
			debugOutfitIndex: i,
			draft: "",
			debugOutfitIndex: i
		});
		persist({
			outfit,
			debugOutfitLock: true,
			messages
		}, get);
		return;
	}
	if (cmd.kind === "cycle_pose") {
		const focus = s.focus ?? "izzy";
		const poses = posesFor(asOutfitId(s.outfit) ?? "casual", focus);
		const i = nextIndex(s.debugPoseIndex, poses.length);
		const pose = poses[i];
		const messages = systemNote(s, `${girlName(focus)} — ${pose.label}`);
		set({
			expression: pose.expression,
			sprayKind: pose.sprayKind,
			otherSprayKind: "none",
			sprayPrompts: [],
			sprayed: false,
			spraySpotlight: false,
			debugPoseIndex: i,
			messages,
			draft: ""
		});
		persist({
			expression: pose.expression,
			sprayKind: pose.sprayKind,
			sprayed: false,
			messages
		}, get);
		return;
	}
	if (cmd.kind === "cycle_fart") {
		const i = nextIndex(s.debugFartIndex, FART_COUNT);
		const clip = fartClipAt(i);
		const size = clip ? fartSizeFor(clip.src) : 1;
		const gas = [...s.gas ?? [], {
			id: uid(),
			size,
			turns: size
		}];
		const poured = expose(clampStink(s.stink ?? 0), normalizeScent(s.scentFrom), [{
			girl: s.focus ?? "izzy",
			amount: size
		}]);
		const messages = systemNote(s, clip ? `Fart clip ${i + 1}/${FART_COUNT} — ${clip.kind} ${clip.n}/${clip.of} — size ${size}. Stink ${poured.stink}.` : `Fart clip ${i + 1}/${FART_COUNT}`);
		set({
			debugFartIndex: i,
			messages,
			gas,
			stink: poured.stink,
			scentFrom: poured.scent,
			draft: "",
			fxPulse: {
				kind: "fart",
				key: Date.now(),
				fartIndex: i,
				fartSrc: clip?.src,
				intimate: clip?.kind === "intimate"
			}
		});
		persist({
			messages,
			gas,
			stink: poured.stink,
			scentFrom: poured.scent
		}, get);
		return;
	}
	if (cmd.kind === "spray_angry") {
		fireSpray("angry", get, set);
		return;
	}
	if (cmd.kind === "spray_intimate") {
		fireSpray("consensual", get, set);
		return;
	}
	if (cmd.kind === "defensive_spray") {
		fireSpray("defensive", get, set);
		return;
	}
	if (cmd.kind === "dominant_spray") {
		fireSpray("dominant", get, set);
		return;
	}
	if (cmd.kind === "set_trust") {
		const trust = clamp(Math.round(cmd.value), 0, 100);
		const bond = bondFromScores(trust, s.bonding, s.flags.romanceAccepted);
		const messages = systemNote(s, `${girlName(s.focus ?? "izzy")}'s trust set to ${trust}`);
		set({
			trust,
			bond,
			messages,
			draft: ""
		});
		persist({
			trust,
			bond,
			messages
		}, get);
		return;
	}
	if (cmd.kind === "set_bonding") {
		const bonding = clamp(Math.round(cmd.value), 0, 100);
		const bond = bondFromScores(s.trust, bonding, s.flags.romanceAccepted);
		const messages = systemNote(s, `${girlName(s.focus ?? "izzy")}'s bonding set to ${bonding}`);
		set({
			bonding,
			bond,
			messages,
			draft: ""
		});
		persist({
			bonding,
			bond,
			messages
		}, get);
		return;
	}
	if (cmd.kind === "character_change") {
		const focus = s.focus ?? "izzy";
		const other = otherGirl(focus);
		const hadBoth = (s.present ?? []).includes("izzy") && (s.present ?? []).includes("victoria");
		let next = pullFocus(asGameState(s), other);
		const card = next.roster[other];
		next = {
			...next,
			present: hadBoth ? next.present?.length ? next.present : [other] : [other],
			sprayed: false,
			sprayKind: "none",
			otherSprayKind: "none",
			sprayPrompts: [],
			outfit: other === "victoria" ? "work" : next.outfit,
			roster: {
				...next.roster,
				[other]: {
					...card,
					met: true,
					outfit: other === "victoria" ? "work" : card.outfit
				}
			}
		};
		const messages = [...next.messages, {
			id: uid(),
			role: "system",
			at: Date.now(),
			text: hadBoth ? `Now talking to ${girlName(other)}. ${girlName(focus)} is still here.` : `Now with ${girlName(other)}. ${girlName(focus)} steps out.`
		}];
		set({
			...next,
			messages,
			spraySpotlight: false,
			draft: "",
			debugPoseIndex: -1
		});
		persist({
			...next,
			messages
		}, get);
		return;
	}
	if (cmd.kind === "character_add") {
		const focus = s.focus ?? "izzy";
		const other = otherGirl(focus);
		const present = [...s.present?.length ? s.present : [focus]];
		if (present.includes(other)) {
			const messages = systemNote(s, `${girlName(other)} is already here.`);
			set({
				messages,
				draft: ""
			});
			persist({ messages }, get);
			return;
		}
		present.push(other);
		const base = asGameState(s);
		const card = base.roster[other];
		const patch = {
			present,
			roster: withGirl(base, other, {
				met: true,
				outfit: other === "victoria" ? "work" : card?.outfit,
				expression: card?.met ? card.expression : other === "victoria" ? "shy" : "embarrassed",
				trust: card?.met ? card.trust : Math.max(card?.trust ?? 0, 4),
				bonding: card?.met ? card.bonding : Math.max(card?.bonding ?? 0, 2)
			}),
			messages: [...s.messages, {
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `${girlName(other)} joins you. You are still talking to ${girlName(focus)}.`
			}]
		};
		set({
			...patch,
			draft: ""
		});
		persist(patch, get);
	}
}
function paceFrom(s) {
	return {
		mode: s.gameMode === "slow" ? "slow" : "casual",
		dates: s.dates ?? 0
	};
}
function runTimeSkip(state, kind) {
	if (state.dayPhase !== "playing" || state.dateDraft || state.dateReview || dateIsDue(state)) return null;
	if (kind === "read" && state.location !== "library") return null;
	if (kind === "study" && state.location !== "studyHall") return null;
	if (!openTonight(state.location, state.timeOfDay)) return null;
	const prevTime = state.timeOfDay;
	const prevDay = state.weekday;
	const next = advanceTime(prevTime);
	let weekday = state.weekday;
	let daySerial = state.daySerial ?? 0;
	let showersToday = state.showersToday ?? 0;
	let workedToday = Boolean(state.workedToday);
	let shiftsWorked = state.shiftsWorked ?? 0;
	let money = state.money;
	const messages = [...state.messages];
	if (next.dayRoll) {
		weekday = nextWeekday(weekday);
		workedToday = false;
		daySerial += 1;
		showersToday = 0;
		if (weekday === "Monday") {
			const pay = shiftsWorked * 20;
			money += pay;
			const shifts = shiftsWorked;
			shiftsWorked = 0;
			messages.push({
				id: uid(),
				role: "system",
				at: Date.now(),
				text: shifts ? `Payday. ${shifts} shift${shifts === 1 ? "" : "s"}. $${pay}.` : "Monday. You didn't work. Nothing hits your account."
			});
		}
	}
	const timeOfDay = next.time;
	messages.push({
		id: uid(),
		role: "narrator",
		at: Date.now(),
		text: kind === "read" ? `You read in the library. It's ${timeOfDay} when you look up.` : `You study until the period turns. It's ${timeOfDay}.`
	});
	let present = state.izzyHere === false ? [] : [...state.present ?? []];
	let roster = next.dayRoll ? clearFed(state.roster) : state.roster;
	let focus = state.focus ?? "izzy";
	let trust = state.trust;
	let bonding = state.bonding;
	let bond = state.bond;
	let expression = state.expression;
	let outfit = state.outfit;
	let flags = state.flags;
	let dates = state.dates ?? 0;
	let dateSpots = [...state.dateSpots ?? []];
	let departure = state.departure ?? null;
	let activeDate = state.activeDate;
	let dateReview = state.dateReview;
	let scheduledDate = state.scheduledDate;
	let inventory = [...state.inventory ?? []];
	let grudge = { ...state.grudge ?? {} };
	let pendingInvite = state.pendingInvite;
	const pace = paceFrom(state);
	if (activeDate) {
		const left = activeDate.cyclesLeft - 1;
		if (left <= 0) {
			const review = buildReview(activeDate, trust, bonding);
			dates += 1;
			dateSpots = [...dateSpots, activeDate.place].slice(-3);
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: "The date has run its length. She doesn't rush the last word."
			});
			messages.push({
				id: uid(),
				role: speakerRole(activeDate.girl),
				at: Date.now(),
				expression: review.nextChance === "no" ? "shy" : "happy",
				text: closingLine(activeDate.girl, review.nextChance)
			});
			dateReview = review;
			activeDate = null;
		} else activeDate = {
			...activeDate,
			cyclesLeft: left
		};
	} else if (scheduledDate && scheduledDate.day === prevDay && scheduledDate.time === prevTime) {
		const hurt = scheduledDate.girl;
		const baseTrust = hurt === focus ? trust : roster?.[hurt]?.trust ?? trust;
		const baseBond = hurt === focus ? bonding : roster?.[hurt]?.bonding ?? bonding;
		const dropTrust = applyTrust(baseTrust, -30, pace);
		const dropBond = applyBonding(baseBond, -24, pace);
		grudge = {
			...grudge,
			[hurt]: {
				place: scheduledDate.place,
				day: prevDay,
				time: prevTime
			}
		};
		if (scheduledDate.giftId) inventory = giveBack(inventory, scheduledDate.giftId, scheduledDate.giftHeld);
		if (hurt === focus) {
			trust = dropTrust;
			bonding = dropBond;
			bond = bondFromScores(dropTrust, dropBond, flags.romanceAccepted);
		}
		roster = withGirl({
			...state,
			roster,
			trust,
			bonding,
			bond,
			flags
		}, hurt, {
			trust: dropTrust,
			bonding: dropBond,
			bond: bondFromScores(dropTrust, dropBond, Boolean(roster?.[hurt]?.romanceAccepted))
		});
		messages.push({
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `The hour passed. ${girlName(hurt)} was waiting. You were not there.`
		});
		scheduledDate = null;
	}
	for (const girl of [...present]) {
		const duty = dutyOf(girl, weekday, timeOfDay);
		if (duty === "free") continue;
		messages.push({
			id: uid(),
			role: speakerRole(girl),
			at: Date.now(),
			expression: "thinking",
			text: girl === "victoria" ? "That ate the hour. I have the desk. I'll see you when I'm off." : duty === "work" ? "I've got Trailhead. If I don't clock in, the manager notices. I have to go." : "Class. I can't stay. I'll be on campus."
		});
		if (girl === focus) roster = withGirl({
			...state,
			roster,
			trust,
			bonding,
			bond,
			flags,
			dates,
			dateSpots
		}, focus, {
			trust,
			bonding,
			bond,
			expression,
			outfit,
			met: true,
			romanceAccepted: flags.romanceAccepted,
			romanceOffered: flags.romanceOffered,
			knowsAboutSpray: flags.knowsAboutSpray,
			scentInterest: flags.scentInterest,
			dates,
			dateSpots
		});
		present = present.filter((id) => id !== girl);
		departure = {
			girl,
			place: duty === "class" ? "campus" : dutyPlace(girl)
		};
	}
	let izzyHere = present.length > 0;
	if (!izzyHere) messages.push({
		id: uid(),
		role: "narrator",
		at: Date.now(),
		text: "You're on your own."
	});
	else if (!present.includes(focus)) {
		const stay = present[0];
		const arrived = pullFocus({
			...state,
			present,
			roster,
			trust,
			bonding,
			bond,
			flags,
			dates,
			dateSpots,
			timeOfDay,
			weekday
		}, stay);
		focus = stay;
		trust = arrived.trust;
		bonding = arrived.bonding;
		bond = arrived.bond;
		expression = arrived.expression;
		outfit = arrived.outfit;
		flags = arrived.flags;
		dates = arrived.dates;
		dateSpots = arrived.dateSpots;
		roster = arrived.roster;
	}
	let showPlaces = false;
	if (timeOfDay === "Night") {
		const speakers = present.map((girl) => {
			if (girl === focus) return {
				girl,
				trust,
				bonding,
				official: Boolean(flags.romanceAccepted) || bond === "romantic"
			};
			const card = roster?.[girl];
			return {
				girl,
				trust: card?.trust ?? 0,
				bonding: card?.bonding ?? 0,
				official: Boolean(card?.romanceAccepted) || card?.bond === "romantic"
			};
		});
		const closed = nightClose({
			location: state.location,
			present,
			focus,
			intimate: Boolean(flags.intimateScene),
			girls: speakers
		});
		if (closed) {
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: closed.narrator
			});
			for (const line of closed.spoken) messages.push({
				id: uid(),
				role: speakerRole(line.girl),
				at: Date.now(),
				expression: line.expression,
				text: line.text
			});
			if (closed.left.includes(focus)) roster = withGirl({
				...state,
				roster,
				trust,
				bonding,
				bond,
				flags,
				dates,
				dateSpots
			}, focus, {
				trust,
				bonding,
				bond,
				expression,
				outfit,
				met: true,
				romanceAccepted: flags.romanceAccepted,
				romanceOffered: flags.romanceOffered,
				knowsAboutSpray: flags.knowsAboutSpray,
				scentInterest: flags.scentInterest,
				dates,
				dateSpots
			});
			present = closed.staying;
			izzyHere = present.length > 0;
			if (izzyHere && !present.includes(focus)) {
				const stay = present[0];
				const arrived = pullFocus({
					...state,
					present,
					roster,
					trust,
					bonding,
					bond,
					flags,
					dates,
					dateSpots,
					timeOfDay,
					weekday
				}, stay);
				focus = stay;
				trust = arrived.trust;
				bonding = arrived.bonding;
				bond = arrived.bond;
				expression = arrived.expression;
				outfit = arrived.outfit;
				flags = arrived.flags;
				dates = arrived.dates;
				dateSpots = arrived.dateSpots;
				roster = arrived.roster;
			}
			if (closed.inviteHome && !pendingInvite) pendingInvite = closed.inviteHome;
			showPlaces = closed.showPlaces;
		}
	}
	return {
		weekday,
		timeOfDay,
		turnsUntilTime: 10,
		daySerial,
		showersToday,
		workedToday,
		shiftsWorked,
		money,
		messages,
		present,
		izzyHere,
		roster,
		focus,
		trust,
		bonding,
		bond,
		expression,
		outfit,
		flags,
		dates,
		dateSpots,
		departure,
		activeDate,
		dateReview,
		scheduledDate,
		inventory,
		grudge,
		pendingInvite,
		sceneTurns: 0,
		showPlaces
	};
}
function scriptInvite(state, plan, turn, get, set) {
	const pace = paceFrom(state);
	let cursor = state;
	const messages = [...state.messages];
	appendPlayer(messages, {
		...turn,
		invite: turn.invite ?? plan.dest
	});
	const origin = state.focus ?? "izzy";
	for (const block of plan.blocked) {
		cursor = pullFocus(cursor, block.girl);
		const bonding = applyBonding(cursor.bonding, block.bondingDelta, pace);
		const bond = bondFromScores(cursor.trust, bonding, cursor.flags.romanceAccepted);
		cursor = {
			...cursor,
			bonding,
			bond
		};
		messages.push({
			id: uid(),
			role: speakerRole(block.girl),
			at: Date.now(),
			expression: block.expression,
			text: block.line,
			bondingDelta: block.bondingDelta
		});
	}
	const going = plan.going.filter((id) => (state.present ?? []).includes(id));
	if (going.length) {
		for (const girl of GIRLS) {
			if (going.includes(girl) || plan.blocked.some((block) => block.girl === girl)) continue;
			if (girlAt(state, girl) !== plan.dest) continue;
			going.push(girl);
		}
		const host = going.includes(origin) ? origin : going[0];
		cursor = pullFocus(cursor, host);
		const where = placeOf(plan.dest);
		messages.push({
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `${going.map(girlName).join(" and ")} head to ${where.name}. ${where.blurb}`
		});
		const speaker = going[0];
		if (!plan.blocked.some((block) => block.girl === speaker)) messages.push({
			id: uid(),
			role: speakerRole(speaker),
			at: Date.now(),
			expression: "happy",
			text: speaker === "victoria" ? `${where.name}. Fine. I'll get us there.` : `${where.name}. Yeah. Let's go.`
		});
		cursor = {
			...cursor,
			location: plan.dest,
			present: going,
			izzyHere: true,
			sceneTurns: 1,
			outfit: host === "victoria" ? "work" : autoOutfit(where.defaultOutfit, cursor.trust, cursor.bond, plan.dest, cursor.flags)
		};
	} else if (cursor.focus !== origin && (state.present ?? []).includes(origin)) cursor = pullFocus(cursor, origin);
	const patch = {
		...cursor,
		messages,
		present: going.length ? going : [...state.present ?? []],
		izzyHere: going.length ? true : state.izzyHere !== false,
		pressedDuty: plan.press,
		pendingInvite: null,
		dayPhase: "playing",
		location: going.length ? plan.dest : state.location,
		sceneTurns: going.length ? 1 : (state.sceneTurns ?? 0) + 1
	};
	set({
		...patch,
		busy: false,
		draft: "",
		inviteReply: null
	});
	persist(patch, get);
}
function resolveEveningPlan(turn, get, set) {
	const state = get();
	const blob = `${turn.say} ${turn.action}`;
	const planTime = parseTimeOfDay(blob) ?? state.planTime;
	const planPlace = asLocationId(turn.invite) ?? parseMeetPlace(blob) ?? state.planPlace;
	const messages = [...state.messages];
	appendPlayer(messages, turn);
	if (!planTime || !planPlace) {
		const ask = !planTime && !planPlace ? "Both. A time of day, and a place. Morning, afternoon, evening, or night — and where." : !planTime ? `${placeOf(planPlace).name}. When? Morning, afternoon, evening, or night.` : `${planTime}. Where am I meeting you?`;
		messages.push({
			id: uid(),
			role: speakerRole(state.focus ?? "izzy"),
			at: Date.now(),
			expression: "thinking",
			text: ask
		});
		const patch = {
			messages,
			planTime,
			planPlace,
			planGirl: state.focus ?? "izzy",
			dayPhase: "planning"
		};
		set({
			...patch,
			busy: false,
			draft: ""
		});
		persist(patch, get);
		return;
	}
	const accepted = likesPlayer(state);
	const where = placeOf(planPlace);
	messages.push({
		id: uid(),
		role: "narrator",
		at: Date.now(),
		text: accepted ? `She agrees — ${planTime}, ${where.name}. Then she's gone, and you're back in your apartment.` : "She shakes her head. She isn't meeting you. She leaves anyway, and you're back in your apartment."
	});
	messages.push({
		id: uid(),
		role: speakerRole(state.focus ?? "izzy"),
		at: Date.now(),
		expression: accepted ? "happy" : "angry",
		text: accepted ? `${planTime}. ${where.name}. I'll be there.` : "No. I'm not making plans with you. Not after today. Go home."
	});
	const outfit = autoOutfit("lounge", state.trust, state.bond, "apartment", state.flags);
	const patch = {
		messages,
		planTime,
		planPlace,
		planGirl: state.focus ?? "izzy",
		planAccepted: accepted,
		plannedDate: state.gameMode === "slow" && (state.plannedDate || isDateAsk(`${turn.say} ${turn.action}`)) && accepted,
		dayPhase: "summary",
		izzyHere: false,
		location: "apartment",
		outfit,
		pendingInvite: null,
		expression: "idle"
	};
	set({
		...patch,
		busy: false,
		draft: "",
		spraySpotlight: false
	});
	persist(patch, get);
}
var useCompanion = create((set, get) => ({
	...blankState(),
	hydrated: false,
	busy: false,
	spraySpotlight: false,
	draft: "",
	inviteReply: null,
	fxPulse: {
		kind: "none",
		key: 0
	},
	fading: false,
	fadeMs: 700,
	showPlaces: false,
	lastTurn: null,
	debugFartIndex: -1,
	debugPoseIndex: -1,
	debugOutfitIndex: Math.max(0, OUTFIT_CYCLE.indexOf("casual")),
	hydrate: () => {
		if (get().hydrated) return;
		set({
			...loadSave() ?? blankState(),
			started: false,
			hydrated: true,
			busy: false,
			spraySpotlight: false,
			draft: "",
			inviteReply: null,
			showPlaces: false,
			lastTurn: null
		});
	},
	start: (name, meet, gender, fartRole, mode, relationship) => {
		if (!name.trim()) return;
		const parsed = parseDebugName(name);
		if (!parsed.debug && !parsed.name.trim()) return;
		const next = seedMeeting(openingState(parsed.name, meet ?? "library", parsed.debug, gender === "female" ? "female" : "male", fartRole === "not" ? "not" : "into", mode === "slow" ? "slow" : "casual"), meet ?? "library", relationship === "harem" ? "harem" : "mono");
		writeSave(next);
		set({
			...next,
			hydrated: true,
			busy: false,
			spraySpotlight: false,
			draft: "",
			inviteReply: null,
			debugFartIndex: -1,
			debugPoseIndex: -1,
			debugOutfitIndex: Math.max(0, OUTFIT_CYCLE.indexOf(next.outfit)),
			fxPulse: {
				kind: "blush",
				key: Date.now()
			},
			lastTurn: null
		});
	},
	resume: () => {
		const saved = loadSave();
		if (saved?.started) set({
			...saved,
			hydrated: true,
			spraySpotlight: false,
			draft: "",
			inviteReply: null,
			lastTurn: null
		});
	},
	reset: () => {
		clearSave();
		set({
			...blankState(),
			hydrated: true,
			busy: false,
			spraySpotlight: false,
			draft: "",
			inviteReply: null,
			fxPulse: {
				kind: "none",
				key: 0
			},
			fading: false,
			fadeMs: 700,
			showPlaces: false,
			debugFartIndex: -1,
			debugPoseIndex: -1,
			debugOutfitIndex: 0,
			lastTurn: null
		});
	},
	setDraft: (value) => set({ draft: value }),
	insertDraft: (chunk) => {
		const cur = get().draft;
		set({ draft: `${cur}${cur.length > 0 && !/\s$/.test(cur) ? " " : ""}${chunk}` });
	},
	setInviteReply: (value) => set({ inviteReply: value }),
	send: async (turn) => {
		const state = get();
		if (state.debug) {
			const cmd = parseDebugCommand(turn.say, asLocationId(turn.invite));
			if (cmd) {
				runDebugCommand(cmd, get, set);
				return;
			}
		}
		if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0) return;
		if (state.dateDraft || state.dateReview || dateIsDue(state)) return;
		if (state.dayPhase === "summary" || state.dayPhase === "meet" || state.dayPhase === "morning" || state.dayPhase === "handoff") return;
		if (playerAlone(state) && state.dayPhase === "playing") {
			const invite = asLocationId(turn.invite);
			if (!Boolean(turn.say.trim() || turn.action.trim() || turn.thought?.trim() || turn.beats?.length) && !invite) return;
			const messages = [...state.messages];
			appendPlayer(messages, {
				...turn,
				invite
			});
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: invite ? "Nobody is with you to invite. Use Travel in Places if you want to go alone." : "Nobody is here to answer. Pick a place if you want to find one of them."
			});
			const patch = { messages };
			set(patch);
			persist(patch, get);
			return;
		}
		const say = turn.say.trim();
		let action = turn.action.trim();
		const thought = turn.thought?.trim() ?? "";
		let beats = turn.beats?.length ? turn.beats.map((beat) => ({ ...beat })) : void 0;
		const pendingGift = state.activeDate && !state.activeDate.presented ? giftReaction(state.activeDate) : null;
		if (pendingGift) {
			action = [action, pendingGift.line].filter(Boolean).join("; ");
			const giftBeat = {
				kind: "act",
				text: pendingGift.line,
				seen: pendingGift.line
			};
			beats = beats ? [...beats, giftBeat] : [
				...say ? [{
					kind: "say",
					text: say
				}] : [],
				...turn.action.trim() ? [{
					kind: "act",
					text: turn.action.trim(),
					seen: turn.action.trim()
				}] : [],
				giftBeat
			];
		}
		const invite = asLocationId(turn.invite);
		const inviteReply = turn.inviteReply ?? state.inviteReply;
		const payload = {
			say,
			action,
			thought,
			beats,
			invite,
			inviteReply
		};
		if (state.dayPhase === "playing" && !playerAlone(state)) {
			const blob = `${say} ${action}`;
			const dating = isDateAsk(blob) && !state.activeDate && !state.scheduledDate && !state.dateDraft;
			const hinted = dating ? awkwardMention(blob, invite) ?? invite : invite;
			const awkward = Boolean(dating && hinted && isAwkwardPlace(hinted));
			const plan = classifyInvite(state, blob, hinted, awkward);
			if (plan) {
				scriptInvite(asGameState(state), plan, payload, get, set);
				return;
			}
		}
		if (state.dayPhase === "planning") {
			const snapshot = snapshotOf(state);
			set({
				lastTurn: {
					state: structuredClone(snapshot),
					turn: payload
				},
				busy: true,
				draft: "",
				inviteReply: null
			});
			resolveEveningPlan(payload, get, set);
			return;
		}
		if (!say && !action && !thought && !invite && !inviteReply && !beats?.length) return;
		const snapshot = snapshotOf(state);
		set({
			lastTurn: {
				state: structuredClone(snapshot),
				turn: payload
			},
			busy: true,
			draft: "",
			inviteReply: null
		});
		await runTurn(snapshot, payload, get, set);
	},
	reroll: async () => {
		const state = get();
		const prior = state.lastTurn;
		if (!prior || state.busy) return;
		const avoid = rejectedReply(state.messages, prior.state.messages);
		set({
			...prior.state,
			hydrated: true,
			busy: true,
			spraySpotlight: false,
			draft: "",
			inviteReply: null,
			fading: false,
			fxPulse: {
				kind: "none",
				key: Date.now()
			},
			lastTurn: prior
		});
		if (prior.state.dayPhase === "planning") {
			resolveEveningPlan(prior.turn, get, set);
			return;
		}
		await runTurn(prior.state, prior.turn, get, set, {
			reroll: true,
			avoid
		});
	},
	rollBack: () => {
		const state = get();
		const prior = state.lastTurn;
		if (!prior || state.busy) return;
		set({
			...prior.state,
			hydrated: true,
			busy: false,
			spraySpotlight: false,
			draft: draftFromTurn(prior.turn),
			inviteReply: null,
			fading: false,
			fxPulse: {
				kind: "none",
				key: Date.now()
			},
			lastTurn: null
		});
		persist(prior.state, get);
	},
	endSpotlight: () => {
		const s = get();
		if ((s.sprayPrompts?.length ?? 0) > 0) {
			set({ spraySpotlight: false });
			return;
		}
		if (Boolean(s.sprayed) && s.sprayKind !== "none" && !(s.sprayKind === "consensual" && s.flags.intimateSprayResolved)) {
			set({ spraySpotlight: false });
			return;
		}
		const otherKind = s.otherSprayKind ?? "none";
		if (!s.sprayed && s.sprayKind === "none" && otherKind === "none") {
			set({ spraySpotlight: false });
			return;
		}
		const focusIntimate = s.sprayKind === "consensual" && Boolean(s.flags.intimateSprayResolved);
		const otherIntimate = otherKind === "consensual";
		const focus = s.focus ?? "izzy";
		const roster = otherKind === "none" ? s.roster : withGirl(asGameState(s), otherGirl(focus), { expression: otherIntimate ? "flirty" : "shy" });
		const patch = {
			spraySpotlight: false,
			sprayed: false,
			sprayKind: "none",
			otherSprayKind: "none",
			sprayPrompts: [],
			pendingIntimateSpray: false,
			...focusIntimate ? { expression: "flirty" } : {},
			...roster !== s.roster ? { roster } : {}
		};
		set(patch);
		persist(patch, get);
	},
	travel: (id) => {
		const state = get();
		if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0) return;
		if (playerAlone(state)) {
			get().goAlone(id);
			return;
		}
		get().insertDraft(inviteToken(id));
	},
	goAlone: (id) => {
		const state = get();
		if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0 || state.dateDraft || state.dateReview) return;
		if (!playerAlone(state)) return;
		if (state.timeOfDay === "Night" && !openTonight(id)) {
			const patch = {
				messages: [...state.messages, {
					id: uid(),
					role: "narrator",
					at: Date.now(),
					text: `${placeOf(id).name} is closed for the night.`
				}],
				showPlaces: true
			};
			set(patch);
			persist(patch, get);
			return;
		}
		const owner = ownsHome(id);
		if (owner && !girlIsOfficial(state, owner)) {
			const patch = { messages: [...state.messages, {
				id: uid(),
				role: "system",
				at: Date.now(),
				text: `${placeOf(id).name} is hers. You don't walk in there unless you're together.`
			}] };
			set(patch);
			persist(patch, get);
			return;
		}
		if (state.scheduledDate && dateIsDue(state) && id === state.scheduledDate.place) {
			const where = placeOf(id);
			const patch = {
				location: id,
				messages: [...state.messages, {
					id: uid(),
					role: "narrator",
					at: Date.now(),
					text: `${where.name}. She's waiting. The date doesn't start until you confirm it.`
				}],
				present: [],
				izzyHere: false,
				sceneTurns: 0
			};
			set(patch);
			persist(patch, get);
			return;
		}
		let departure = state.departure ?? null;
		let trailStreak = state.trailStreak ?? 0;
		let trailGirl = state.trailGirl ?? null;
		const chasing = Boolean(departure && departure.place === id);
		if (departure && !chasing) {
			departure = null;
			trailStreak = 0;
			trailGirl = null;
		}
		const here = GIRLS.filter((girl) => girlAt({
			...asGameState(state),
			location: id,
			departure
		}, girl) === id);
		const messages = [...state.messages];
		if (!here.length) {
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `${placeOf(id).name}. ${placeOf(id).blurb} You don't see either of them.`
			});
			const patch = {
				location: id,
				messages,
				present: [],
				izzyHere: false,
				departure,
				trailStreak,
				trailGirl,
				sceneTurns: 0
			};
			set(patch);
			persist(patch, get);
			return;
		}
		const hurt = here.find((girl) => state.grudge?.[girl]);
		const trailed = chasing && departure && here.includes(departure.girl) ? departure.girl : null;
		const focus = hurt ?? trailed ?? here[0];
		const arrived = pullFocus({
			...asGameState(state),
			present: here,
			location: id,
			izzyHere: true,
			departure
		}, focus);
		const firstMeet = !state.roster?.[focus]?.met;
		let metRoster = firstMeet ? withGirl(arrived, focus, {
			met: true,
			trust: 6,
			bonding: 4,
			bond: "stranger"
		}) : arrived.roster;
		let trust = firstMeet ? 6 : arrived.trust;
		let bonding = firstMeet ? 4 : arrived.bonding;
		let bond = firstMeet ? "stranger" : arrived.bond;
		let expression = firstMeet ? "embarrassed" : hurt ? "angry" : "happy";
		const where = placeOf(id);
		if (trailed && !firstMeet) {
			const streak = (state.trailGirl === trailed ? state.trailStreak ?? 0 : 0) + 1;
			trailStreak = streak;
			trailGirl = trailed;
			departure = null;
			if (!hurt) {
				const bite = followLines(trailed, streak);
				const pace = {
					mode: state.gameMode === "slow" ? "slow" : "casual",
					dates: metRoster[trailed]?.dates ?? 0
				};
				trust = applyTrust(arrived.roster[trailed]?.trust ?? trust, bite.trust, pace);
				bonding = applyBonding(arrived.roster[trailed]?.bonding ?? bonding, bite.bonding, pace);
				bond = bondFromScores(trust, bonding, Boolean(metRoster[trailed]?.romanceAccepted));
				expression = bite.expression;
				metRoster = withGirl({
					...arrived,
					roster: metRoster
				}, trailed, {
					trust,
					bonding,
					bond,
					expression
				});
				messages.push({
					id: uid(),
					role: "narrator",
					at: Date.now(),
					text: `${girlName(trailed)} looks up. She did not tell you she would be at ${where.name}.`
				});
				messages.push({
					id: uid(),
					role: speakerRole(trailed),
					at: Date.now(),
					expression: bite.expression,
					text: bite.text
				});
			}
		}
		if (!arrived.roster[focus]?.met) {
			if (focus === "victoria") {
				const lines = victoriaOpening(id);
				messages.push({
					id: uid(),
					role: "narrator",
					at: Date.now(),
					text: lines.narrator
				});
				messages.push({
					id: uid(),
					role: "victoria",
					at: Date.now(),
					expression: "embarrassed",
					text: oneGreeting(lines.first, lines.second)
				});
			} else {
				messages.push({
					id: uid(),
					role: "narrator",
					at: Date.now(),
					text: `${where.name}. A chubby skunk-neko looks up like she got caught existing.`
				});
				messages.push({
					id: uid(),
					role: "izzy",
					at: Date.now(),
					expression: "embarrassed",
					text: "Uh. Hi. I'm Izzy. You can smell that, I know. You can sit. Or not."
				});
			}
		} else if (hurt) {
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `${girlName(hurt)} is at ${where.name}. She has been waiting on an explanation. Her tail is up.`
			});
			messages.push({
				id: uid(),
				role: speakerRole(hurt),
				at: Date.now(),
				expression: "angry",
				text: hurt === "victoria" ? "You stood me up. I am one breath from spraying you. Explain yourself." : "You left me sitting there. Talk me down, or I spray. I'm not kidding."
			});
		} else if (!trailed) {
			const onDuty = dutyOf(focus, state.weekday, state.timeOfDay) === "work" && id === dutyPlace(focus);
			if (onDuty) expression = "thinking";
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: onDuty ? `${girlName(focus)} is at ${where.name}, and she is working. ${where.blurb}` : `You find ${here.map(girlName).join(" and ")} at ${where.name}. ${where.blurb}`
			});
			messages.push({
				id: uid(),
				role: speakerRole(focus),
				at: Date.now(),
				expression: onDuty ? "thinking" : "happy",
				text: onDuty ? focus === "victoria" ? "I'm at the desk. If this is about a room, a fabric, or a client, I can help. Anything else will have to wait." : "I'm on the floor. If you need a pack, ask. If this is a hangout, I'm working." : focus === "victoria" ? "You came looking. Sit. I have a minute." : "You found me. That's either sweet or creepy and I'm choosing sweet."
			});
		}
		const patch = {
			...arrived,
			roster: metRoster,
			trust,
			bonding,
			bond,
			location: id,
			present: here,
			izzyHere: true,
			messages,
			confronting: hurt ?? null,
			expression,
			outfit: focus === "victoria" ? "work" : autoOutfit(where.defaultOutfit, trust, bond, id, arrived.flags),
			dayPhase: "playing",
			departure,
			trailStreak,
			trailGirl,
			sceneTurns: 0
		};
		set(patch);
		persist(patch, get);
	},
	depart: (id) => {
		const state = get();
		if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0 || state.dateDraft || state.dateReview) return;
		if (playerAlone(state)) {
			get().goAlone(id);
			return;
		}
		if (state.timeOfDay === "Night" && !openTonight(id)) {
			const patch = {
				messages: [...state.messages, {
					id: uid(),
					role: "narrator",
					at: Date.now(),
					text: `${placeOf(id).name} is closed for the night.`
				}],
				showPlaces: true
			};
			set(patch);
			persist(patch, get);
			return;
		}
		const recent = state.messages.filter((m) => m.role === "player").slice(-3).map((m) => m.text).join(" ");
		const polite = goodbyeSaid(recent);
		const present = [...state.present ?? []];
		const pace = paceFrom(state);
		let cursor = asGameState(state);
		const origin = cursor.focus ?? "izzy";
		const messages = [...cursor.messages];
		if (!polite) {
			for (const girl of present) {
				cursor = pullFocus(cursor, girl);
				const bonding = applyBonding(cursor.bonding, -5, pace);
				const bond = bondFromScores(cursor.trust, bonding, cursor.flags.romanceAccepted);
				cursor = {
					...cursor,
					bonding,
					bond
				};
			}
			if (present.includes(origin)) cursor = pullFocus(cursor, origin);
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: "You leave without a goodbye. That costs you."
			});
		} else messages.push({
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: "You say goodbye and go."
		});
		const patch = {
			...cursor,
			messages,
			present: [],
			izzyHere: false,
			sceneTurns: 0
		};
		set(patch);
		persist(patch, get);
		get().goAlone(id);
	},
	goToWork: () => {
		const state = get();
		if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0 || state.dateDraft || state.dateReview) return;
		if (state.location !== "apartment" || state.timeOfDay === "Night" || state.workedToday) return;
		if (state.dayPhase !== "playing") return;
		const next = advanceTime(state.timeOfDay);
		if (next.dayRoll) return;
		const timeOfDay = next.time;
		const shiftsWorked = (state.shiftsWorked ?? 0) + 1;
		const aired = reduceStink(state.stink ?? 0, normalizeScent(state.scentFrom), 10);
		const leader = markedBy(aired.stink, aired.scent);
		const markAffair = state.markAffair && leader && leader === state.markAffair.marker && aired.stink > 50 ? state.markAffair : null;
		const messages = [...state.messages, {
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `You work a shift.${(state.stink ?? 0) > 0 ? " Some of the stink comes off." : ""} $20 is banked toward Monday. It's ${timeOfDay} when you get back to the apartment.`
		}];
		let present = state.izzyHere === false ? [] : [...state.present ?? []];
		let departure = state.departure ?? null;
		let roster = state.roster;
		let focus = state.focus ?? "izzy";
		let trust = state.trust;
		let bonding = state.bonding;
		let bond = state.bond;
		let expression = state.expression;
		let outfit = state.outfit;
		let flags = state.flags;
		let dates = state.dates ?? 0;
		let dateSpots = state.dateSpots ?? [];
		for (const girl of [...present]) {
			const duty = dutyOf(girl, state.weekday, timeOfDay);
			if (duty === "free") continue;
			messages.push({
				id: uid(),
				role: speakerRole(girl),
				at: Date.now(),
				expression: "thinking",
				text: girl === "victoria" ? "That ate the morning. I have the desk. I'll see you when I'm off." : duty === "work" ? "I've got Trailhead. If I don't clock in, the manager notices. I have to go." : "Class. I can't stay. I'll be on campus."
			});
			present = present.filter((id) => id !== girl);
			departure = {
				girl,
				place: duty === "class" ? "campus" : dutyPlace(girl)
			};
		}
		const izzyHere = present.length > 0;
		if (!izzyHere) messages.push({
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: "You're back at the apartment alone."
		});
		else if (!present.includes(focus)) {
			const stay = present[0];
			const arrived = pullFocus({
				...asGameState(state),
				present,
				roster,
				timeOfDay
			}, stay);
			focus = stay;
			trust = arrived.trust;
			bonding = arrived.bonding;
			bond = arrived.bond;
			expression = arrived.expression;
			outfit = arrived.outfit;
			flags = arrived.flags;
			dates = arrived.dates;
			dateSpots = arrived.dateSpots;
			roster = arrived.roster;
		}
		const patch = {
			timeOfDay,
			turnsUntilTime: 10,
			shiftsWorked,
			workedToday: true,
			pressedDuty: null,
			messages,
			present,
			izzyHere,
			departure,
			focus,
			trust,
			bonding,
			bond,
			expression,
			outfit,
			flags,
			dates,
			dateSpots,
			roster,
			sceneTurns: 0,
			location: "apartment",
			stink: aired.stink,
			scentFrom: aired.scent,
			markAffair
		};
		set({
			fading: true,
			fadeMs: 1500,
			busy: true
		});
		window.setTimeout(() => {
			if (!get().fading) return;
			set({
				...patch,
				fading: true,
				busy: true
			});
			persist(patch, get);
			window.setTimeout(() => {
				if (!get().fading) return;
				set({
					fading: false,
					busy: false,
					fadeMs: 700
				});
			}, 1500);
		}, 1500);
	},
	buyGift: (id) => {
		const state = get();
		const gift = giftById(id);
		if (!gift || !isStore(state.location) || gift.store !== state.location) return;
		if (state.money < gift.price) return;
		const patch = {
			money: state.money - gift.price,
			inventory: [...state.inventory, gift.id],
			messages: [...state.messages, {
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `You buy the ${gift.name}. $${gift.price}. You have $${state.money - gift.price} left.`
			}]
		};
		set(patch);
		persist(patch, get);
	},
	confirmDate: (draft) => {
		const state = get();
		const plan = state.dateDraft;
		if (!plan) return;
		if (!draft.time || !draft.place || !draft.day || !draft.giftId) return;
		if (!state.inventory.includes(draft.giftId)) return;
		if (!slotOpen(state.weekday, state.timeOfDay, draft.day, draft.time)) return;
		if (isAwkwardPlace(draft.place)) return;
		const nth = plan.nth;
		if (nth < 3 && (draft.place === "dorm" || draft.place === "apartment" || draft.place === "vickyLiving" || draft.place === "vickyBedroom")) return;
		const voice = speakerRole(plan.girl);
		const where = placeOf(draft.place);
		const giftName = giftById(draft.giftId)?.name ?? draft.giftId;
		const inventory = takeOne(state.inventory ?? [], draft.giftId);
		const giftHeld = inventory.length !== (state.inventory ?? []).length;
		const patch = {
			messages: [
				...state.messages,
				{
					id: uid(),
					role: "narrator",
					at: Date.now(),
					text: `${draft.day} ${draft.time}, ${where.name}. She has the plan. The ${giftName} comes out of your bag for the date. Then she's gone, and you can go where you need to.`
				},
				{
					id: uid(),
					role: voice,
					at: Date.now(),
					expression: "happy",
					text: plan.girl === "victoria" ? `${draft.day}. ${draft.time}. ${where.name}. I'll be there. Don't make me wait.` : `${draft.day}, ${draft.time}, ${where.name}. I'll be there. Bring the thing. I mean it.`
				}
			],
			dateDraft: null,
			scheduledDate: {
				girl: plan.girl,
				nth,
				time: draft.time,
				place: draft.place,
				day: draft.day,
				giftId: draft.giftId,
				giftHeld
			},
			inventory,
			present: [],
			izzyHere: false,
			dayPhase: "playing"
		};
		set(patch);
		persist(patch, get);
	},
	postponeDate: () => {
		const state = get();
		const plan = state.dateDraft;
		if (!plan) return;
		const voice = speakerRole(plan.girl);
		const patch = {
			messages: [...state.messages, {
				id: uid(),
				role: voice,
				at: Date.now(),
				expression: "thinking",
				text: plan.girl === "victoria" ? "Go get it, then. I'm not holding a table for a person with empty hands." : "Okay. Go buy the thing. Ask me again when you actually have it."
			}],
			dateDraft: null,
			present: [],
			izzyHere: false
		};
		set(patch);
		persist(patch, get);
	},
	attendDate: () => {
		const state = get();
		const plan = state.scheduledDate;
		if (!plan || !dateIsDue(state)) return;
		const arrived = pullFocus({
			...asGameState(state),
			location: plan.place
		}, plan.girl);
		const where = placeOf(plan.place);
		const voice = speakerRole(plan.girl);
		const messages = [
			...state.messages,
			{
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `You meet ${girlName(plan.girl)} at ${where.name}. ${where.blurb} The date starts now.`
			},
			{
				id: uid(),
				role: voice,
				at: Date.now(),
				expression: "flirty",
				text: plan.girl === "victoria" ? "You came. Good. Sit down. This is the date." : "You showed. Okay. This is a date. I'm a little nervous and I'm not hiding it well."
			}
		];
		const patch = {
			...arrived,
			location: plan.place,
			present: [plan.girl],
			izzyHere: true,
			scheduledDate: null,
			activeDate: {
				girl: plan.girl,
				nth: plan.nth,
				place: plan.place,
				giftId: plan.giftId,
				giftHeld: plan.giftHeld,
				cyclesLeft: cyclesFor(plan.nth),
				startTrust: arrived.trust,
				startBonding: arrived.bonding,
				farts: 0,
				presented: false,
				smell: "neutral"
			},
			dayPhase: "playing",
			messages,
			expression: "flirty"
		};
		set(patch);
		persist(patch, get);
	},
	standUp: () => {
		const state = get();
		const plan = state.scheduledDate;
		if (!plan) return;
		const girl = plan.girl;
		const card = state.roster?.[girl];
		const onHer = (state.focus ?? "izzy") === girl && state.izzyHere !== false;
		const baseTrust = onHer ? state.trust : card?.trust ?? 0;
		const baseBond = onHer ? state.bonding : card?.bonding ?? 0;
		const pace = {
			mode: state.gameMode,
			dates: card?.dates ?? state.dates ?? 0
		};
		const trust = applyTrust(baseTrust, -30, pace);
		const bonding = applyBonding(baseBond, -24, pace);
		const bond = bondFromScores(trust, bonding, Boolean(card?.romanceAccepted));
		const roster = withGirl(state, girl, {
			trust,
			bonding,
			bond,
			met: true
		});
		const messages = [...state.messages, {
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text: `You don't go. ${girlName(girl)} will know. The gift stays in your bag, and so does the damage.`
		}];
		const patch = {
			messages,
			roster,
			scheduledDate: null,
			inventory: giveBack(state.inventory ?? [], plan.giftId, plan.giftHeld),
			grudge: {
				...state.grudge,
				[girl]: {
					place: plan.place,
					day: state.weekday,
					time: state.timeOfDay
				}
			},
			...onHer ? {
				trust,
				bonding,
				bond,
				confronting: girl,
				expression: "angry",
				messages: [...messages, {
					id: uid(),
					role: speakerRole(girl),
					at: Date.now(),
					expression: "angry",
					text: girl === "victoria" ? "You're looking at me while you do it. Talk. Before I spray." : "Wow. You're really doing this in front of me. Talk, or I spray."
				}]
			} : {}
		};
		set(patch);
		persist(patch, get);
	},
	dismissDateTip: () => {
		const state = get();
		const girl = state.focus ?? "izzy";
		const patch = { dateTipOff: {
			...state.dateTipOff,
			[girl]: true
		} };
		set(patch);
		persist(patch, get);
	},
	closeReview: (askAgain) => {
		const state = get();
		const review = state.dateReview;
		if (!review) return;
		if (askAgain && review.askNext) {
			const voice = speakerRole(review.girl);
			const patch = {
				messages: [...state.messages, {
					id: uid(),
					role: voice,
					at: Date.now(),
					expression: "flirty",
					text: review.girl === "victoria" ? "Another one. All right. Put it on the card before I change my mind." : "Another date? Yeah. Okay. Fill it in. I'm not gonna plan it for you."
				}],
				dateReview: null,
				dateDraft: {
					girl: review.girl,
					nth: review.nth + 1,
					time: null,
					place: null,
					day: null,
					giftId: null
				}
			};
			set(patch);
			persist(patch, get);
			return;
		}
		const voice = speakerRole(review.girl);
		const patch = {
			messages: [
				...state.messages,
				{
					id: uid(),
					role: voice,
					at: Date.now(),
					expression: "shy",
					text: review.girl === "victoria" ? "I'm going. You know where to find me when you mean it." : "I'm heading out. You know where the world is."
				},
				{
					id: uid(),
					role: "narrator",
					at: Date.now(),
					text: `${girlName(review.girl)} leaves. You can go somewhere else.`
				}
			],
			dateReview: null,
			present: [],
			izzyHere: false
		};
		set(patch);
		persist(patch, get);
	},
	dismissSpray: (mode, girl) => {
		if (mode === "reset") {
			get().reset();
			return;
		}
		const s = get();
		const focus = s.focus ?? "izzy";
		const prompts = Array.isArray(s.sprayPrompts) ? s.sprayPrompts : [];
		if (girl && prompts.length > 0 && !prompts.some((prompt) => prompt.girl === girl)) return;
		const target = girl ?? prompts[0]?.girl ?? focus;
		const voice = speakerRole(target);
		const mine = target === focus;
		const vicky = target === "victoria";
		const name = girlName(target);
		const card = s.roster?.[target];
		const pace = mine ? paceFrom(s) : {
			mode: s.gameMode === "slow" ? "slow" : "casual",
			dates: card?.dates ?? s.dates ?? 0
		};
		const baseTrust = mine ? s.trust : card?.trust ?? 0;
		const baseBonding = mine ? s.bonding : card?.bonding ?? 0;
		const romantic = mine ? Boolean(s.flags.romanceAccepted) : Boolean(card?.romanceAccepted);
		const left = prompts.filter((prompt) => prompt.girl !== target);
		const done = left.length === 0;
		const hard = s.threatLevel === "attack";
		const flags = {
			...s.flags,
			knowsAboutSpray: true
		};
		let expression = mine ? s.expression : card?.expression ?? "idle";
		let trust = baseTrust;
		let bonding = baseBonding;
		let romanticBond = romantic;
		let meters = false;
		let floorTrust = false;
		const lines = [];
		const say = (role, text, face) => {
			lines.push({
				role,
				text,
				expression: face
			});
		};
		if (mode === "submit") {
			meters = true;
			trust = applyTrust(baseTrust, 8, pace);
			bonding = applyBonding(baseBonding, s.flags.fartConverted ? 10 : 6, pace);
			romanticBond = true;
			expression = "flirty";
			flags.sprayYield = "submit";
			flags.intimateSprayResolved = true;
			say("narrator", s.flags.fartConverted ? `You already let the gas get to you. Now ${name}. She looks wrecked with it, in the good way.` : `You stop fighting ${name}. Her ears lift. The smile she gives you is not nicer. It is pleased.`);
			say(voice, "Good. That's mine. Don't think I'm going to be gentle now. You asked to be kept, not spared.", "flirty");
		} else if (mode === "resist") {
			meters = true;
			bonding = applyBonding(baseBonding, 2, pace);
			expression = "scheming";
			flags.sprayYield = s.flags.sprayYield === "submit" ? "submit" : "resist";
			say("narrator", `You push back against ${name}. Her tail only gets higher. She looks delighted.`);
			say(voice, "Oh, fight it. I like that. I'm not done teaching your body what it wants.", "scheming");
		} else if (mode === "surrender") {
			expression = "scheming";
			flags.defenseAftermath = "surrender";
			say("narrator", `The spray from ${name} hits and your knees go. You can't fight it. She sees that, and the fear on her face turns into something sharper.`);
			say(voice, "There. That's the end of it. You're done. Stay down and breathe through your mouth if you still remember how. I win.", "scheming");
		} else if (mode === "aroused") {
			meters = true;
			trust = applyTrust(baseTrust, hard ? -10 : -2, pace);
			bonding = applyBonding(baseBonding, hard ? -6 : 1, pace);
			expression = "suspicious";
			flags.defenseAftermath = "aroused";
			say("narrator", hard ? `You came at ${name}, and the spray that should have stopped you just made you want her. She looks sick about that, and interested, and angry with herself for both.` : `It was a scare, not a beating, and ${name}'s spray landed wrong. She is flushed, worried her only weapon doesn't work, and trying not to like that you like it.`);
			say(voice, hard ? "You attacked me. And you're — into it? That spray is supposed to end a fight. I don't know what to do with you. Don't come closer while I'm figuring out if I should still be afraid." : "That was a scare. You weren't even hurting me, and now you look… wrecked, in the wrong direction. My spray is supposed to make people leave. Why are you looking at me like that?", "suspicious");
		} else if (mode === "embrace") {
			meters = true;
			trust = applyTrust(baseTrust, 10, pace);
			bonding = applyBonding(baseBonding, 8, pace);
			romanticBond = true;
			expression = "flirty";
			flags.sprayRepair = false;
			flags.intimateSprayResolved = true;
			say("narrator", `The musk from ${name} hits like a wall — chemical, sweet, blinding — and instead of running, something in you lights up harder than anything you've ever felt. You stay. You want more.`);
			say(voice, vicky ? "You stayed in it. Not to be polite. You wanted it. Come here. I am not finished with you." : "Wait. You're— you're INTO it? Not surviving it. Actually— oh. Oh that's. Come here. I'm not done with you. I didn't know it could feel like being wanted.", "flirty");
		} else if (mode === "overwhelm") {
			meters = true;
			trust = applyTrust(baseTrust, -5, pace);
			bonding = applyBonding(baseBonding, -3, pace);
			expression = "shy";
			flags.sprayRepair = true;
			flags.intimateSprayResolved = true;
			say("narrator", `The burn from ${name} hits your eyes and throat. You cough, gag, stumble for air and water. Real skunkgirl spray is not a perfume. It's an event. You weren't ready for the intensity.`);
			say("player", `"I wasn't expecting it to be that strong. I'm not blaming you — it's natural for you. I just need a minute."`);
			say(voice, vicky ? "You look wrecked. I thought you wanted this. I meant to spray. I did not mean to go past what you could take. Breathe. If you still want me when you can, say so." : "I... oh. You look wrecked. I thought you wanted this. I didn't mean to— I mean I DID, but I thought... okay. That's. That's a little. I'm gonna sit over here. If you still want me after you can breathe, say so like you mean it.", "shy");
		} else {
			floorTrust = mine;
			expression = "angry";
			say("narrator", vicky ? `The worst of it fades. ${name} smooths her skirt, not looking at you — but she hasn't left.` : `The worst of it fades. ${name} is back among the stacks, arms folded, not looking at you — but she hasn't left.`);
			say(voice, vicky ? "If you are going to apologize, do it properly. I am not a novelty." : "If you're gonna apologize, do it like you mean it. I'm not a novelty air freshener.", "angry");
		}
		const bond = bondFromScores(trust, bonding, romanticBond);
		const stillDefensive = left.some((prompt) => prompt.kind === "defensive");
		const patch = {
			sprayed: !done,
			sprayKind: mine || done ? "none" : s.sprayKind,
			otherSprayKind: !mine || done ? "none" : s.otherSprayKind ?? "none",
			sprayPrompts: left,
			pendingIntimateSpray: done ? false : s.pendingIntimateSpray,
			pendingDefensive: stillDefensive ? s.pendingDefensive : false,
			flags,
			messages: [...s.messages, ...lines.map((line) => ({
				id: uid(),
				role: line.role,
				at: Date.now(),
				text: line.text,
				...line.expression ? { expression: line.expression } : {}
			}))]
		};
		if (mine) {
			patch.expression = expression;
			if (meters) {
				patch.trust = trust;
				patch.bonding = bonding;
				patch.bond = bond;
			} else if (floorTrust) patch.trust = Math.max(2, s.trust);
		} else patch.roster = withGirl(asGameState(s), target, {
			expression,
			met: true,
			knowsAboutSpray: true,
			...meters ? {
				trust,
				bonding,
				bond
			} : {}
		});
		const hearts = done && (mode === "submit" || mode === "embrace");
		set({
			...patch,
			spraySpotlight: false,
			...done ? { fxPulse: {
				kind: hearts ? "hearts" : "none",
				key: Date.now()
			} } : {}
		});
		persist(patch, get);
	},
	takeShower: (ids) => {
		const s = get();
		if (!SHOWER_PLACES.has(s.location)) return;
		if ((s.showersToday ?? 0) >= 2) return;
		if (s.dayPhase !== "playing" && s.dayPhase !== "planning" && s.dayPhase !== "summary") return;
		const owned = new Set(s.inventory ?? []);
		const picked = [...new Set(ids)].filter((id) => owned.has(id) && freshenRating(id) > 0);
		const cut = showerCut(picked);
		let inventory = [...s.inventory ?? []];
		for (const id of picked) inventory = takeOne(inventory, id);
		const washed = reduceStink(s.stink ?? 0, normalizeScent(s.scentFrom), cut);
		const names = picked.map((id) => giftById(id)?.name ?? id);
		const text = names.length ? `You shower with ${names.join(", ")}. Used up. The stink comes down by ${cut}.` : "You shower with just water. Nothing extra in the bag. The stink comes down by 10.";
		const messages = [...s.messages, {
			id: uid(),
			role: "narrator",
			at: Date.now(),
			text
		}];
		const patch = {
			stink: washed.stink,
			scentFrom: washed.scent,
			showersToday: Math.min(2, (s.showersToday ?? 0) + 1),
			inventory,
			messages
		};
		set(patch);
		persist(patch, get);
	},
	sleep: () => {
		const s = get();
		if (s.dayPhase !== "playing") return;
		if (!canSleepNow(s.location, s.timeOfDay)) return;
		if (s.busy || s.sprayed || (s.sprayPrompts?.length ?? 0) > 0 || s.dateDraft || s.dateReview || dateIsDue(s)) return;
		const patch = { dayPhase: "summary" };
		set(patch);
		persist(patch, get);
	},
	wake: () => {
		const s = get();
		if (s.dayPhase !== "summary" || s.fading) return;
		set({
			fading: true,
			fadeMs: 1500
		});
		window.setTimeout(() => {
			const cur = get();
			if (cur.dayPhase !== "summary") {
				set({
					fading: false,
					fadeMs: 700
				});
				return;
			}
			const weekday = nextWeekday(cur.weekday);
			const shifts = cur.shiftsWorked ?? 0;
			const pay = weekday === "Monday" ? shifts * 20 : 0;
			const washed = reduceStink(cur.stink ?? 0, normalizeScent(cur.scentFrom), 25);
			const patch = {
				weekday,
				money: cur.money + pay,
				shiftsWorked: weekday === "Monday" ? 0 : shifts,
				workedToday: false,
				pressedDuty: null,
				timeOfDay: "Morning",
				turnsUntilTime: 10,
				dayPhase: "playing",
				morningDetour: false,
				dayStartTrust: cur.trust,
				dayStartBonding: cur.bonding,
				dayFarts: 0,
				daySprays: emptySprays(),
				dayTopics: [],
				stink: washed.stink,
				scentFrom: washed.scent,
				showersToday: 0,
				daySerial: (cur.daySerial ?? 0) + 1,
				roster: clearFed(cur.roster),
				dutyNotice: [],
				stinkTalk: null,
				gas: [],
				scentHold: 0,
				pendingInvite: null,
				pendingDefensive: false,
				pendingIntimateSpray: false,
				sprayed: false,
				sprayKind: "none",
				sprayPrompts: [],
				activeDate: null,
				sceneTurns: 0,
				flags: {
					...cur.flags,
					intimateScene: false
				},
				messages: [
					...cur.messages,
					{
						id: uid(),
						role: "narrator",
						at: Date.now(),
						text: `You sleep. It's ${weekday} morning.`
					},
					...weekday === "Monday" ? [{
						id: uid(),
						role: "system",
						at: Date.now(),
						text: shifts ? `Payday. ${shifts} shift${shifts === 1 ? "" : "s"}. $${pay}.` : "Monday. You didn't work. Nothing hits your account."
					}] : []
				]
			};
			set({
				...patch,
				fading: true,
				fadeMs: 1500
			});
			persist(patch, get);
			window.setTimeout(() => {
				if (!get().fading) return;
				set({
					fading: false,
					fadeMs: 700
				});
			}, 1500);
		}, 1500);
	},
	readTime: () => {
		const state = get();
		if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0) return;
		const patch = runTimeSkip(asGameState(state), "read");
		if (!patch) return;
		set(patch);
		persist(patch, get);
	},
	studyTime: () => {
		const state = get();
		if (state.busy || state.sprayed || (state.sprayPrompts?.length ?? 0) > 0) return;
		const patch = runTimeSkip(asGameState(state), "study");
		if (!patch) return;
		set(patch);
		persist(patch, get);
	},
	dismissPlaces: () => set({ showPlaces: false }),
	beginMorning: (place) => {
		const s = get();
		if (s.dayPhase !== "morning") return;
		const scheduled = s.planGirl ?? s.focus ?? "izzy";
		const other = otherGirl(scheduled);
		const arrived = pullFocus({
			...asGameState(s),
			roster: s.roster
		}, other);
		const first = !s.roster?.[other]?.met;
		const where = placeOf(place);
		const voice = speakerRole(other);
		const messages = [...s.messages];
		if (other === "victoria" && first) {
			const lines = victoriaDropIn(where.name);
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: lines.narrator
			});
			messages.push({
				id: uid(),
				role: voice,
				at: Date.now(),
				expression: "embarrassed",
				text: lines.line
			});
		} else if (first) {
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `${where.name}. A chubby skunk-neko in a Lil' Stinker top looks up like she got caught existing.`
			});
			messages.push({
				id: uid(),
				role: "izzy",
				at: Date.now(),
				expression: "embarrassed",
				text: "Uh. Hi. I'm Izzy. You can smell that, I know. I was just — sitting. You can sit too. Or not."
			});
		} else {
			messages.push({
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `You find ${girlName(other)} at ${where.name}. ${where.blurb}`
			});
			messages.push({
				id: uid(),
				role: voice,
				at: Date.now(),
				expression: "happy",
				text: other === "victoria" ? "You came looking. I can tell. Sit down. I have a little time before I'm expected somewhere." : "You found me. That's either sweet or creepy and I'm choosing sweet. What's up?"
			});
		}
		const roster = withGirl(arrived, other, {
			met: true,
			trust: Math.max(arrived.trust, first ? 6 : arrived.trust),
			bonding: Math.max(arrived.bonding, first ? 4 : arrived.bonding),
			expression: first ? "embarrassed" : "happy"
		});
		const patch = {
			...arrived,
			roster,
			location: place,
			present: [other],
			izzyHere: true,
			morningDetour: true,
			dayPhase: "playing",
			expression: first ? "embarrassed" : "happy",
			outfit: other === "victoria" ? "work" : autoOutfit(where.defaultOutfit, arrived.trust, arrived.bond, place, arrived.flags),
			messages,
			pendingInvite: null
		};
		set(patch);
		persist(patch, get);
	},
	resolveHandoff: (planAgain) => {
		const s = get();
		if (s.dayPhase !== "handoff") return;
		const detour = s.focus ?? "izzy";
		const bonding = Math.max(0, Math.min(100, s.bonding + (planAgain ? 8 : -6)));
		const bond = bondFromScores(s.trust, bonding, s.flags.romanceAccepted);
		const slot = laterSlot(s.planTime ?? "Afternoon");
		const queuedMeet = planAgain ? {
			girl: detour,
			place: suitedPlace(detour, asLocationId(s.planPlace)),
			time: slot.time,
			nextDay: slot.nextDay
		} : null;
		const saved = pushFocus({
			...asGameState(s),
			bonding,
			bond,
			roster: s.roster
		});
		const host = s.planGirl ?? "izzy";
		const dest = asLocationId(s.planPlace) ?? "library";
		const arrived = pullFocus({
			...saved,
			queuedMeet
		}, host);
		let dates = arrived.dates ?? 0;
		let dateSpots = [...arrived.dateSpots ?? []];
		if (s.plannedDate && s.gameMode === "slow" && dates < 3) {
			dates += 1;
			dateSpots = [...dateSpots, dest].slice(-3);
		}
		const where = placeOf(dest);
		const voice = speakerRole(host);
		const messages = [
			...s.messages,
			{
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: planAgain ? `You tell ${girlName(detour)} you'll see her later. Then you go to ${where.name}, where ${girlName(host)} is waiting.` : `You don't make another plan. ${girlName(detour)} notices. You still leave for ${where.name}.`
			},
			{
				id: uid(),
				role: voice,
				at: Date.now(),
				expression: "happy",
				text: host === "victoria" ? `${s.planTime ?? "Now"}. You came. Good. I don't like being left with a clock and no company.` : `${s.planTime ?? "Now"}. You showed. I was starting to think the morning ate you.`
			}
		];
		const patch = {
			...arrived,
			bonding: arrived.bonding,
			dates,
			dateSpots,
			location: dest,
			present: [host],
			izzyHere: true,
			morningDetour: false,
			dayPhase: "playing",
			timeOfDay: s.planTime ?? s.timeOfDay,
			queuedMeet,
			plannedDate: false,
			dateOpen: s.plannedDate ? dest : null,
			expression: "happy",
			outfit: host === "victoria" ? "work" : autoOutfit(where.defaultOutfit, arrived.trust, arrived.bond, dest, arrived.flags),
			messages,
			pendingInvite: null,
			affairKnown: false
		};
		set(patch);
		persist(patch, get);
	},
	confirmMeet: () => {
		const s = get();
		if (s.dayPhase !== "meet") return;
		const queued = s.meetKind === "queue" ? s.queuedMeet : null;
		const host = queued?.girl ?? s.planGirl ?? s.focus ?? "izzy";
		const dest = asLocationId(queued?.place ?? s.planPlace) ?? "library";
		const arrived = pullFocus({
			...asGameState(s),
			roster: s.roster
		}, host);
		let dates = arrived.dates ?? 0;
		let dateSpots = [...arrived.dateSpots ?? []];
		const counting = Boolean(s.plannedDate) && !queued;
		if (counting && s.gameMode === "slow" && dates < 3) {
			dates += 1;
			dateSpots = [...dateSpots, dest].slice(-3);
		}
		const where = placeOf(dest);
		const voice = speakerRole(host);
		const messages = [
			...s.messages,
			{
				id: uid(),
				role: "narrator",
				at: Date.now(),
				text: `You find ${girlName(host)} at ${where.name}. ${where.blurb}`
			},
			{
				id: uid(),
				role: voice,
				at: Date.now(),
				expression: s.planAccepted || counting ? "happy" : "suspicious",
				text: counting ? `${s.timeOfDay}. You showed up for the date. I'm counting this one.` : s.planAccepted || queued ? `${s.timeOfDay}. You actually showed. Good.` : host === "victoria" ? "I didn't agree to this. You're here anyway. Say something worth the time." : "I didn't agree to this. You're here anyway. Fine. Say something that isn't a waste of the morning."
			}
		];
		const patch = {
			...arrived,
			dates,
			dateSpots,
			location: dest,
			outfit: host === "victoria" ? "work" : autoOutfit(where.defaultOutfit, arrived.trust, arrived.bond, dest, arrived.flags),
			present: [host],
			izzyHere: true,
			dayPhase: "playing",
			expression: s.planAccepted || counting ? "happy" : "suspicious",
			pendingInvite: null,
			dateOpen: counting ? dest : null,
			plannedDate: false,
			morningDetour: false,
			meetKind: "plan",
			queuedMeet: queued ? null : s.queuedMeet,
			messages
		};
		set(patch);
		persist(patch, get);
	},
	acceptRomance: () => {
		const s = get();
		if (s.gameMode === "slow" && (s.dates ?? 0) < 3) return;
		if (romanceBlocked(s, s.trust, s.bonding, s.dates ?? 0)) return;
		const flags = {
			...s.flags,
			romanceAccepted: true,
			romanceOffered: true
		};
		const girl = s.focus ?? "izzy";
		const bond = bondFromScores(s.trust, s.bonding, true);
		s.relationshipType;
		const roster = withGirl(s, girl, {
			romanceAccepted: true,
			romanceOffered: true,
			bond,
			met: true
		});
		const patch = {
			flags,
			bond,
			expression: "flirty",
			partner: s.relationshipType === "mono" ? girl : s.partner ?? girl,
			roster
		};
		set({
			...patch,
			fxPulse: {
				kind: "hearts",
				key: Date.now()
			}
		});
		persist(patch, get);
	}
}));
function GirlSprite({ girl, count }) {
	const focus = useCompanion((s) => s.focus ?? "izzy");
	const liveOutfit = useCompanion((s) => s.outfit);
	const liveExpression = useCompanion((s) => s.expression);
	const liveSpray = useCompanion((s) => s.sprayKind);
	const otherSpray = useCompanion((s) => s.otherSprayKind ?? "none");
	const card = useCompanion((s) => s.roster?.[girl]);
	const spotlight = useCompanion((s) => s.spraySpotlight);
	const busy = useCompanion((s) => s.busy);
	const pulse = useCompanion((s) => s.fxPulse);
	const location = useCompanion((s) => s.location);
	const intimate = useCompanion((s) => Boolean(s.flags.intimateScene));
	const [stinkUntil, setStinkUntil] = (0, import_react.useState)(0);
	const mine = girl === focus;
	const outfit = mine ? liveOutfit : card?.outfit ?? (girl === "victoria" ? "work" : "casual");
	const joinedSpray = !mine && otherSpray !== "none";
	const joinedFart = !mine && pulse.otherKind === "fart";
	const expression = joinedSpray ? "spray" : mine ? liveExpression : card?.expression ?? "idle";
	const sprayKind = mine ? liveSpray : joinedSpray ? otherSpray : "none";
	const lingerie = girl === "victoria" && victoriaLingerieOn(location, intimate);
	const src = portraitSrc(outfit, expression, sprayKind, girl, lingerie);
	const gas = mine ? pulse.kind === "fart" || pulse.kind === "spray" : joinedFart || joinedSpray;
	const stink = gas && stinkUntil !== pulse.key;
	const spraying = mine ? pulse.kind === "spray" || spotlight && liveSpray !== "none" : pulse.otherKind === "spray" || spotlight && joinedSpray;
	const duetSpray = liveSpray !== "none" && otherSpray !== "none";
	const showSpot = mine && spotlight && pulse.kind === "spray" && !duetSpray;
	(0, import_react.useEffect)(() => {
		if (!gas && !mine) return;
		if (pulse.kind !== "fart" && pulse.kind !== "spray" && pulse.otherKind !== "fart" && pulse.otherKind !== "spray") return;
		if (!gas) return;
		const t = window.setTimeout(() => setStinkUntil(pulse.key), pulse.kind === "spray" || pulse.otherKind === "spray" ? 4200 : pulse.intimate ? 6800 : 3600);
		return () => window.clearTimeout(t);
	}, [
		pulse,
		mine,
		gas
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pointer-events-none relative flex h-full items-end justify-center", count >= 3 ? "w-1/3" : count === 2 ? "w-1/2" : "w-full", "izzy-idle", expression === "embarrassed" && "izzy-embarrassed", expression === "laughing" && "izzy-laugh", expression === "angry" && "izzy-mad", spraying && "izzy-spray-pose", expression === "infodump" && "izzy-talk", stink && "izzy-fart", showSpot && "izzy-spotlight", busy && mine && "opacity-95"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src,
				alt: girl === "victoria" ? "Victoria" : "Isabella",
				className: cn("w-auto object-contain object-bottom drop-shadow-[0_18px_40px_rgba(0,0,0,0.45)]", showSpot ? "h-[min(98dvh,1080px)] max-w-[min(100%,720px)]" : count >= 3 ? "h-[min(68dvh,760px)] max-w-full" : count === 2 ? "h-[min(78dvh,860px)] max-w-full" : "h-[min(92dvh,980px)] max-w-[min(100%,640px)]", spraying || stink ? "transition-none" : "transition-[height,opacity,filter] duration-[var(--motion-slow)] ease-[var(--ease-smooth-out)]")
			}, src),
			stink ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StinkLines, { variant: "body" }) : null,
			showSpot || duetSpray && spraying ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "spray-jets",
				"aria-hidden": true
			}) : null
		]
	});
}
function CharacterPortrait() {
	const present = useCompanion((s) => s.present);
	const focus = useCompanion((s) => s.focus ?? "izzy");
	const ids = (present?.length ? present : [focus]).filter((id, i, all) => all.indexOf(id) === i);
	const count = Math.min(3, ids.length || 1);
	const order = ids.includes("izzy") && ids.includes("victoria") ? ["izzy", "victoria"] : ids;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none relative flex h-full w-full items-end justify-center",
		children: order.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GirlSprite, {
			girl: id,
			count
		}, id))
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-[var(--radius-md)] border border-border bg-elevated px-3 text-sm text-fg placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-11 w-full rounded-[var(--radius-md)] border border-border bg-elevated px-3 py-2 text-sm text-fg placeholder:text-subtle", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40", className),
		...props
	});
}
function TurnControls({ className }) {
	const busy = useCompanion((s) => s.busy);
	const lastTurn = useCompanion((s) => s.lastTurn);
	const reroll = useCompanion((s) => s.reroll);
	const rollBack = useCompanion((s) => s.rollBack);
	const ready = Boolean(lastTurn) && !busy;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-wrap gap-2", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			className: "h-8 gap-1.5 px-2.5 text-xs",
			disabled: !ready,
			onClick: () => void reroll(),
			"aria-label": "Reroll her reply",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, {}), "Reroll"]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			type: "button",
			variant: "outline",
			size: "sm",
			className: "h-8 gap-1.5 px-2.5 text-xs",
			disabled: !ready,
			onClick: () => rollBack(),
			"aria-label": "Roll back your last message and her reply",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Undo2, {}), "Roll back"]
		})]
	});
}
function ChatComposer({ compact = false }) {
	const busy = useCompanion((s) => s.busy);
	const sprayed = useCompanion((s) => s.sprayed);
	const prompts = useCompanion((s) => s.sprayPrompts);
	const debug = useCompanion((s) => s.debug);
	const send = useCompanion((s) => s.send);
	const draft = useCompanion((s) => s.draft);
	const setDraft = useCompanion((s) => s.setDraft);
	const inviteReply = useCompanion((s) => s.inviteReply);
	const example = `Hi, I’m ${useCompanion((s) => s.playerName) || "there"}! *holds out a hand* Nice to meet you.`;
	const locked = debug ? busy : busy || sprayed || (prompts?.length ?? 0) > 0;
	const parsedLive = parseDraft(draft);
	const empty = !parsedLive.say && !parsedLive.action && !parsedLive.thought && !parsedLive.invite && !inviteReply;
	function submit() {
		if (locked) return;
		const parsed = parseDraft(draft);
		if (!parsed.say && !parsed.action && !parsed.thought && !parsed.invite && !inviteReply) return;
		send({
			...parsed,
			inviteReply
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: cn(compact ? "mt-2 space-y-1" : "mt-3 space-y-2"),
		onSubmit: (e) => {
			e.preventDefault();
			submit();
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: cn("grid gap-2", compact ? "grid-cols-[1fr_auto]" : "grid-cols-[1fr_auto]"),
				children: [compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft,
					disabled: locked,
					placeholder: "Say something… *act* {thought}",
					className: "h-9 rounded-sm text-xs",
					onChange: (e) => setDraft(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							submit();
						}
					}
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					rows: 2,
					value: draft,
					disabled: locked,
					placeholder: example,
					onChange: (e) => setDraft(e.target.value),
					onKeyDown: (e) => {
						if (e.key === "Enter" && !e.shiftKey) {
							e.preventDefault();
							submit();
						}
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "submit",
					size: compact ? "sm" : "default",
					disabled: locked || empty,
					className: compact ? void 0 : "h-auto min-h-11 sm:self-stretch",
					"aria-label": "Send",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "sm:hidden",
						children: "Send"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurnControls, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-subtle text-pretty", compact ? "text-[10px] leading-snug" : "text-[11px] leading-relaxed"),
				children: `*I sit down* is something she can see. {a private thought} is only for you. She answers what you said and what she watched you do, in the order you wrote it. @(Casa Luna) invites her.`
			})
		]
	});
}
function PlanForm({ draft }) {
	const inventory = useCompanion((s) => s.inventory);
	const weekday = useCompanion((s) => s.weekday);
	const timeOfDay = useCompanion((s) => s.timeOfDay);
	const confirmDate = useCompanion((s) => s.confirmDate);
	const postponeDate = useCompanion((s) => s.postponeDate);
	const [time, setTime] = (0, import_react.useState)(draft.time ?? "");
	const [place, setPlace] = (0, import_react.useState)(() => {
		const allowed = datePlaces(draft.nth);
		return draft.place && allowed.includes(draft.place) ? draft.place : "";
	});
	const [day, setDay] = (0, import_react.useState)(draft.day ?? "");
	const [giftId, setGiftId] = (0, import_react.useState)(draft.giftId ?? "");
	const places = datePlaces(draft.nth);
	const uniqueGifts = [...new Set(inventory)];
	const open = Boolean(time && place && day && giftId && slotOpen(weekday, timeOfDay, day, time));
	const late = Boolean(time && day && !slotOpen(weekday, timeOfDay, day, time));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-fg",
					children: "Plan the date"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						girlName(draft.girl),
						" said yes. Date ",
						draft.nth,
						" needs a day, a time, a place, and a gift.",
						draft.nth < 3 ? " Home isn't an option until the third date." : " Her home and your apartment are open."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 block text-xs uppercase tracking-[0.14em] text-subtle",
					children: ["Day", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg",
						value: day,
						onChange: (e) => setDay(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Choose"
						}), WEEKDAYS.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: name,
							children: name
						}, name))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-xs uppercase tracking-[0.14em] text-subtle",
					children: ["Time", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg",
						value: time,
						onChange: (e) => setTime(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Choose"
						}), TIMES.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: name,
							children: name
						}, name))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-xs uppercase tracking-[0.14em] text-subtle",
					children: ["Location", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg",
						value: place,
						onChange: (e) => setPlace(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: "Choose"
						}), places.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: id,
							children: placeOf(id).name
						}, id))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-3 block text-xs uppercase tracking-[0.14em] text-subtle",
					children: ["Gift", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "mt-1 w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-fg",
						value: giftId,
						onChange: (e) => setGiftId(e.target.value),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "",
							children: uniqueGifts.length ? "Choose" : "Nothing in your bag"
						}), uniqueGifts.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: id,
							children: giftById(id)?.name ?? id
						}, id))]
					})]
				}),
				late ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "That time has already passed today. Pick a later slot."
				}) : null,
				!uniqueGifts.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "A date needs a gift. Buy one, then ask her again."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					disabled: !open,
					onClick: () => {
						if (!time || !place || !day || !giftId) return;
						confirmDate({
							time,
							place,
							day,
							giftId
						});
					},
					children: "Set the date"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-2 w-full",
					variant: "outline",
					onClick: postponeDate,
					children: "I'll get the gift first"
				})
			]
		})
	});
}
function DatePlanner() {
	const draft = useCompanion((s) => s.dateDraft);
	if (!draft) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanForm, { draft }, `${draft.girl}-${draft.nth}`);
}
function DateDue() {
	const due = useCompanion(dateIsDue);
	const plan = useCompanion((s) => s.scheduledDate);
	const attendDate = useCompanion((s) => s.attendDate);
	const standUp = useCompanion((s) => s.standUp);
	if (!due || !plan) return null;
	const who = girlName(plan.girl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 z-40 flex items-end justify-center p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto w-full max-w-md rounded-xl border border-border bg-surface/95 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.45)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-fg",
					children: "She's waiting"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm leading-relaxed text-fg",
					children: [
						plan.day,
						" ",
						plan.time,
						". ",
						who,
						" is at ",
						placeOf(plan.place).name,
						". You can go, or you can stand her up."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: attendDate,
					children: "Go to the date"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-2 w-full",
					variant: "outline",
					onClick: standUp,
					children: "Stand her up"
				})
			]
		})
	});
}
function DateReviewCard() {
	const review = useCompanion((s) => s.dateReview);
	const closeReview = useCompanion((s) => s.closeReview);
	if (!review) return null;
	const who = girlName(review.girl);
	const trustDelta = review.trustAfter - review.trustBefore;
	const bondDelta = review.bondAfter - review.bondBefore;
	const sign = (n) => n > 0 ? `+${n}` : `${n}`;
	const chance = review.nextChance === "likely" ? "She would say yes to another date." : review.nextChance === "no" ? "She is not ready to plan another one." : "Another date is possible. It depends how you ask.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 z-40 flex items-end justify-center p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-auto max-h-[90dvh] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-surface/95 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.45)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl text-fg",
					children: "After the date"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						who,
						": Trust ",
						sign(trustDelta),
						" (",
						review.trustBefore,
						" to ",
						review.trustAfter,
						") · Bonding ",
						sign(bondDelta),
						" (",
						review.bondBefore,
						" to ",
						review.bondAfter,
						")"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-fg",
					children: chance
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-fg",
					children: [
						"She farted ",
						review.farts,
						" time",
						review.farts === 1 ? "" : "s",
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-fg",
					children: review.smell
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-fg",
					children: review.gift
				}),
				review.askNext ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "mt-5 w-full",
					onClick: () => closeReview(true),
					children: [
						"Ask ",
						who,
						" on another date"
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-2 w-full",
					variant: review.askNext ? "outline" : "default",
					onClick: () => closeReview(false),
					children: "Let her go"
				})
			]
		})
	});
}
function Card({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-40 flex items-end justify-center p-4 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-auto w-full max-w-md rounded-xl border border-border bg-surface/95 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.45)]",
			children
		})
	});
}
function DayFlow() {
	const phase = useCompanion((s) => s.dayPhase);
	const trust = useCompanion((s) => s.trust);
	const bonding = useCompanion((s) => s.bonding);
	const startTrust = useCompanion((s) => s.dayStartTrust);
	const startBond = useCompanion((s) => s.dayStartBonding);
	const farts = useCompanion((s) => s.dayFarts);
	const sprays = useCompanion((s) => s.daySprays);
	const topics = useCompanion((s) => s.dayTopics);
	const planPlace = useCompanion((s) => s.planPlace);
	const planTime = useCompanion((s) => s.planTime);
	const planGirl = useCompanion((s) => s.planGirl);
	const focus = useCompanion((s) => s.focus);
	const accepted = useCompanion((s) => s.planAccepted);
	const meetKind = useCompanion((s) => s.meetKind);
	const queued = useCompanion((s) => s.queuedMeet);
	const wake = useCompanion((s) => s.wake);
	const confirmMeet = useCompanion((s) => s.confirmMeet);
	const beginMorning = useCompanion((s) => s.beginMorning);
	const resolveHandoff = useCompanion((s) => s.resolveHandoff);
	if (phase === "summary") {
		const trustDelta = trust - startTrust;
		const bondDelta = bonding - startBond;
		const sprayBits = [
			sprays.angry ? `${sprays.angry} angry` : "",
			sprays.defensive ? `${sprays.defensive} defensive` : "",
			sprays.consensual ? `${sprays.consensual} intimate` : "",
			sprays.dominant ? `${sprays.dominant} dominant` : ""
		].filter(Boolean);
		const sign = (n) => n > 0 ? `+${n}` : `${n}`;
		const who = girlName(focus ?? "izzy");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-fg",
				children: "Today"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [
					who,
					": Trust ",
					sign(trustDelta),
					" · Bonding ",
					sign(bondDelta)
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-fg",
				children: topics.length ? `You talked about ${topics.join(", ")}.` : "Not much got said out loud."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-fg",
				children: [
					who,
					" farted ",
					farts,
					" time",
					farts === 1 ? "" : "s",
					".",
					sprayBits.length ? ` Sprays: ${sprayBits.join(", ")}.` : " No sprays."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-5 w-full",
				onClick: wake,
				children: "Continue"
			})
		] });
	}
	if (phase === "morning") {
		const scheduled = planGirl ?? focus ?? "izzy";
		const other = otherGirl(scheduled);
		const spots = morningSpots(other, planPlace);
		const choices = spots.length ? spots : ["library"];
		const where = planPlace ? placeOf(planPlace).name : "the plan";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-fg",
				children: "Morning"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-relaxed text-fg",
				children: [
					"You wake up before ",
					planTime ?? "later",
					", when you're meant to meet ",
					girlName(scheduled),
					" at ",
					where,
					". These places are likely to have ",
					girlName(other),
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-1 gap-2",
				children: choices.map((id) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "justify-start",
					onClick: () => beginMorning(id),
					children: placeOf(id).name
				}, id))
			})
		] });
	}
	if (phase === "handoff") {
		const detour = focus ?? "izzy";
		const host = planGirl ?? otherGirl(detour);
		const where = placeOf(planPlace ?? "library");
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl text-fg",
				children: planTime ?? "Now"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm leading-relaxed text-fg",
				children: [
					"It's time to meet ",
					girlName(host),
					" at ",
					where.name,
					". You can make a later plan with ",
					girlName(detour),
					"before you go. Planning one raises Bonding with her. Leaving it open lowers it."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-4 w-full",
				onClick: () => resolveHandoff(true),
				children: [
					"Plan to see ",
					girlName(detour),
					" later"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-2 w-full",
				variant: "outline",
				onClick: () => resolveHandoff(false),
				children: "Don't make another plan"
			})
		] });
	}
	if (phase !== "meet") return null;
	const host = meetKind === "queue" ? queued?.girl ?? planGirl ?? focus ?? "izzy" : planGirl ?? focus ?? "izzy";
	const dest = meetKind === "queue" ? queued?.place ?? planPlace : planPlace;
	const where = placeOf(dest ?? "library");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm leading-relaxed text-fg",
			children: accepted || meetKind === "queue" ? `Travel to ${where.name} to meet ${girlName(host)}.` : `${girlName(host)} didn't agree to meet. Go to ${where.name} anyway.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4 w-full",
			onClick: confirmMeet,
			children: "OK"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurnControls, { className: "mt-3" })
	] });
}
function GiftShop({ place, onClose }) {
	const money = useCompanion((s) => s.money);
	const buyGift = useCompanion((s) => s.buyGift);
	const items = giftsAt(place);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-fg",
					children: "Buy a gift"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						placeOf(place).name,
						". You have $",
						money,
						"."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid gap-2",
				children: items.map((item) => {
					const short = money < item.price;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						disabled: short,
						onClick: () => buyGift(item.id),
						className: "flex items-center justify-between rounded-md border border-border px-3 py-3 text-left hover:bg-elevated disabled:opacity-40",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-fg",
							children: item.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-sm text-muted",
							children: ["$", item.price]
						})]
					}, item.id);
				})
			})]
		})
	});
}
function DebugBar() {
	const debug = useCompanion((s) => s.debug);
	const setDraft = useCompanion((s) => s.setDraft);
	const outfit = useCompanion((s) => s.outfit);
	const expression = useCompanion((s) => s.expression);
	const sprayKind = useCompanion((s) => s.sprayKind);
	const focus = useCompanion((s) => s.focus ?? "izzy");
	const present = useCompanion((s) => s.present);
	if (!debug) return null;
	const both = (present ?? []).includes("izzy") && (present ?? []).includes("victoria");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-cream/40 bg-bg/70 px-3 py-2 backdrop-blur-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-[10px] uppercase tracking-[0.16em] text-cream/70",
			children: [
				focus === "victoria" ? "Victoria" : "Izzy",
				both ? " · both" : "",
				" · ",
				outfit,
				" · ",
				expression,
				sprayKind !== "none" ? ` · ${sprayKind}` : ""
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "-mx-1 mt-2 flex gap-1 overflow-x-auto px-1",
			children: DEBUG_TIPS.map((tip) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setDraft(tip),
				className: "h-7 shrink-0 rounded-full border border-cream/30 bg-cream/10 px-2 text-[10px] text-cream hover:bg-cream/20",
				children: tip
			}, tip))
		})]
	});
}
var RECENT_COUNT = 12;
function ChatLine({ message }) {
	const m = message;
	if (m.role === "narrator") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[13px] leading-relaxed text-muted italic text-pretty",
		children: m.text
	});
	if (m.role === "system") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-[12px] text-subtle italic",
		children: ["She thinks: ", m.text]
	});
	if (m.role === "player") {
		const aside = m.aside === "act" || m.aside === "think";
		const body = m.aside === "act" ? `*${m.text}*` : m.aside === "think" ? `{${m.text}}` : m.text;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: cn("text-sm", aside ? "italic" : "text-cream/90", m.aside === "think" ? "text-muted" : aside ? "text-cream/80" : void 0),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mr-2 text-[11px] uppercase tracking-wider text-subtle not-italic",
				children: "You"
			}), body]
		});
	}
	const name = m.role === "victoria" ? "Victoria" : "Izzy";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("mb-1 font-display text-sm", m.role === "victoria" ? "text-cream" : "text-accent"),
		children: name
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-[15px] leading-relaxed text-fg text-pretty",
		children: m.text
	})] });
}
function DialoguePanel({ compact = false }) {
	const messages = useCompanion((s) => s.messages);
	const busy = useCompanion((s) => s.busy);
	const focus = useCompanion((s) => s.focus ?? "izzy");
	const thinking = `${girlName(focus)} is thinking…`;
	const scroller = (0, import_react.useRef)(null);
	const [full, setFull] = (0, import_react.useState)(false);
	const jump = (0, import_react.useRef)("end");
	const hidden = Math.max(0, messages.length - RECENT_COUNT);
	const showingAll = full && !compact;
	const visible = compact ? messages.slice(-1) : showingAll ? messages : messages.slice(-12);
	const latest = messages.filter((m) => m.role !== "player").at(-1);
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (!el) return;
		if (jump.current === "start") {
			el.scrollTop = 0;
			jump.current = "end";
			return;
		}
		const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 64;
		if (!showingAll || nearBottom) el.scrollTop = el.scrollHeight;
	}, [
		messages.length,
		busy,
		compact,
		showingAll
	]);
	if (compact) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-w-0 flex-1 pr-2",
		children: busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted shimmer-text",
			children: thinking
		}) : latest ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [latest.role === "izzy" || latest.role === "victoria" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mb-0.5 font-display text-xs", latest.role === "victoria" ? "text-cream" : "text-accent"),
			children: latest.role === "victoria" ? "Victoria" : "Izzy"
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("line-clamp-2 text-pretty leading-snug", latest.role === "narrator" ? "text-[13px] text-muted italic" : latest.role === "system" ? "text-xs text-subtle" : "text-sm text-fg"),
			children: latest.role === "system" ? `She thinks: ${latest.text}` : latest.text
		})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "She’s waiting."
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-0 flex-1 flex-col",
		children: [hidden > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "mb-2 self-start text-xs text-muted underline-offset-2 hover:text-fg hover:underline",
			onClick: () => {
				if (showingAll) {
					jump.current = "end";
					setFull(false);
				} else {
					jump.current = "start";
					setFull(true);
				}
			},
			children: showingAll ? "Show recent" : "View Previous Messages"
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: scroller,
			className: cn("flex min-h-0 flex-col gap-3 overflow-y-auto pr-1", showingAll ? "max-h-[48vh]" : "max-h-[22vh] sm:max-h-[28vh]"),
			children: [visible.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: showingAll ? void 0 : "stagger-in",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatLine, { message: m })
			}, m.id)), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted shimmer-text",
				children: thinking
			}) : null]
		})]
	});
}
var HOLD = {
	none: 0,
	fart: 2800,
	spray: 4200,
	blush: 1800,
	hearts: 2200,
	laugh: 1400
};
function FxLayer() {
	const pulse = useCompanion((s) => s.fxPulse);
	const [hiddenKey, setHiddenKey] = (0, import_react.useState)(null);
	const active = pulse.kind !== "none" || pulse.otherKind === "fart" || pulse.otherKind === "spray";
	const visible = active && hiddenKey !== pulse.key;
	(0, import_react.useLayoutEffect)(() => {
		if (!active) return;
		const twoFarts = pulse.kind === "fart" && pulse.otherKind === "fart";
		const twoSprays = pulse.kind === "spray" && pulse.otherKind === "spray";
		if (twoFarts) {
			if (pulse.fartSrc) playFartSrc(pulse.fartSrc);
			if (pulse.otherFartSrc) playFartSrc(pulse.otherFartSrc);
			if (!pulse.fartSrc && !pulse.otherFartSrc) playFartPair(Boolean(pulse.intimate));
		} else if (pulse.kind === "fart" || pulse.otherKind === "fart") {
			const src = pulse.fartSrc || pulse.otherFartSrc;
			if (src) playFartSrc(src);
			else if (typeof pulse.fartIndex === "number" && pulse.kind === "fart") playFartAt(pulse.fartIndex);
			else playFart(Boolean(pulse.intimate));
		}
		if (twoSprays) playSprayPair();
		else if (pulse.kind === "spray" || pulse.otherKind === "spray") playSpray();
		const hold = pulse.kind === "fart" && pulse.intimate ? 6800 : HOLD[pulse.kind] || 2800;
		const t = window.setTimeout(() => setHiddenKey(pulse.key), hold);
		return () => window.clearTimeout(t);
	}, [pulse, active]);
	if (!visible) return null;
	const stink = pulse.kind === "fart" || pulse.kind === "spray" || pulse.otherKind === "fart" || pulse.otherKind === "spray";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none absolute inset-0 overflow-hidden",
		"aria-hidden": true,
		children: [
			stink ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("haze", pulse.kind === "spray" && "haze-spray") }) : null,
			stink ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StinkLines, { variant: "screen" }) : null,
			pulse.kind === "blush" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "blush-wash" }) : null,
			pulse.kind === "hearts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hearts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
				]
			}) : null,
			pulse.kind === "laugh" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "laugh-shim" }) : null
		]
	});
}
var BAND = {
	1: 14,
	2: 26,
	3: 40
};
var NONE$1 = [];
/** Wispy gas pooled at the bottom. Each fart adds a band. They stack until the air is thick. */
function GasVeil() {
	const gas = useCompanion((s) => s.gas) ?? NONE$1;
	const height = Math.min(100, gas.reduce((sum, puff) => sum + BAND[puff.size], 0));
	if (height <= 0) return null;
	const thick = height >= 58;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "gas-veil",
		style: { height: `${height}%` },
		"data-thick": thick ? "true" : "false",
		"aria-hidden": true,
		children: gas.map((puff, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `gas-wisp gas-wisp-${puff.size}`,
			style: {
				left: `${index * 23 % 70}%`,
				bottom: `${index * 17 % 48}%`,
				animationDelay: `${index * -1.4}s`
			}
		}, puff.id))
	});
}
function HowToPlay({ tone }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	if (!open) {
		if (tone === "title") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "text-xs text-muted underline-offset-2 hover:underline",
			onClick: () => setOpen(true),
			children: "How to play"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			onClick: () => setOpen(true),
			"aria-label": "How to play",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleHelp, {})
		});
	}
	const places = Object.values(LOCATIONS);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 w-full max-w-lg rounded-[var(--radius-xl)] border border-border bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg text-fg",
					children: "How to play"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: () => setOpen(false),
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-h-[min(70dvh,640px)] space-y-4 overflow-y-auto px-5 pb-5 text-sm leading-relaxed text-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-fg",
						children: "Talking"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1",
						children: [
							"Type what you say in the box. Actions go in asterisks, like classic roleplay: *I sit down next to her*. Thoughts go in braces: ",
							"{I think she looks lovely}",
							". She never hears a thought. If you sit and admire her, she sees you sit and look, not the private opinion inside it. Speech, actions, and thoughts stay on their own lines, in the order you wrote them, and the asides are italic. Under the box: @ with a place drops an invite, and the Places list can fill that in without sending. Reroll asks her to answer your last message again. Roll back removes that message and her reply so you can write a different one. Once she knows you, she may shorten your name. Tell her to use your full name if you don't want that."
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-fg",
						children: "Gamemodes"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Casual is the regular game. Slow Romance cuts how fast Trust and Bonding rise. You can ask her on a date once both are at least 20. A tip shows up when you're there. She won't go without a gift. Fill in the day, the time, and the place. Homes and your apartment wait until the third date. The first date lasts one part of the day. The second and third last two. After it, you see how Trust and Bonding moved. One date opens the meters to 50, a second to 75, a third to 100. Standing her up hurts badly. If she walks in on a date with the other woman, Izzy loses trust in how you treat people. Victoria is less rattled. She is a little flattered you picked her, and she respects a cold decision. Either way, talk the one you stood up down or she sprays."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-fg",
						children: "Gifts and going alone"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "You start with $100. Monday's pay is $20 for each shift you worked that week. Time Skips And Work is the stopwatch. From your apartment, Go to Work skips to the next part of the day and banks $20. Once a day, and not at night. If you aren't home, it tells you to travel there first. Reading at the Campus Library and Studying at the Study Hall each move the clock forward one part of the day, and you can do either again. Zzz is Sleep. It only lights up at your apartment, Izzy's dorm, or Vicky's bedroom, and only from Evening on. Sleep opens a recap of the day. Continue fades out and back in over a few seconds. You wake the next Morning, a little less stinky, and Monday adds your paycheck. At Night almost everywhere closes. Still open: the Quad, the Nature Trail, Marquee House, the dorm, your apartment, and Vicky's living room and bedroom. If you're alone when a place locks up, Places opens and marks what is closed. If she's with you, she says so, and she decides whether to invite you somewhere private, keep going somewhere still open, or say good night. At a shop, the dollar button buys a gift. The backpack shows what you're carrying. Setting the date takes that gift out of the bag. Miss it or stand her up and it comes back. Once she has it, it's gone. Victoria is easier to please with a gift. Izzy, who is still in college, cares more when the gift clearly cost something. Places shows where each of them is. They don't know you can see that. Invite fills the box. Travel goes there yourself. Leave without a goodbye and Bonding drops. Their homes stay shut unless you're already together. She may leave for class, work, her daughter, or because the talk died, but not in the first five turns unless you offended her. Following her there is suspicious. Doing it twice in a row is worse."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-fg",
						children: "Trust and Bonding"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Trust is how you treat the skunkgirl parts of her. Bonding is whether you actually get along. Kindness, curiosity, and accepting her smell raise them. Mockery, early fetish talk, and cruelty drop them. At Trust 100 and Bonding 70 she may ask to be a couple."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-fg",
						children: "Two skunkgirls"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Isabella and Victoria keep separate Trust and Bonding. The place you start decides who you meet first. The library is even. Neko Shelf is mostly Izzy. Hearth & Hobby, the furniture showroom, and the Italian restaurant are mostly Victoria. Line & Lumen is Victoria's desk on weekday afternoons. She'll talk design there, and not much else. Izzy is on campus in the morning and at Trailhead Outfitters on Monday, Wednesday, and Friday afternoons. Other times, she wanders. If you name one of them, she answers. \"You guys\" or \"ladies\" invites both. An unaddressed girl only speaks if she has something to add. A date set for later does not move you. The summons shows up on that day and at that time, and only then."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-fg",
						children: "Relationship Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Monogamous means one official girlfriend. If she finds out you were unfaithful, Trust and Bonding drop hard. Under 50, she may end it. After that, the other woman is an option. Skunkgirl Harem lets you be with both. Victoria needs more trust before she will share."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-fg",
						children: "The day"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "A new game starts Monday afternoon. The day and the time sit at the top left: Morning, Afternoon, Evening, Night. Every ten replies from them moves the clock, wherever you already are. What you type does not count until she answers, so a scheduled goodbye is not cut off by the hour. You only change places when you travel alone, when she accepts an invite, or when you confirm a date that is actually due. She will not offer her dorm, or accept your apartment, unless you are already a couple. A date at her job, the study hall, or a lecture hall gets a no."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-fg",
						children: "Spray"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "A defensive spray is for a real threat. If she has not been touched, she warns you first. Talk her down, or keep coming and she fires. Afterward the choices are Surrender or Be aroused. A real attack is much harder to come back from than a jumpscare. A pat or a spank is not a threat when she trusts you. Each of them has her own scent glands, about 8 to 14 sprays. Every spray uses hers, including angry and defensive. When hers are empty she cannot spray until they refill. If both of them spray, each one keeps her own kind — one can be intimate while the other is dominant — and you answer each window before you can type again."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-fg",
						children: "Intimacy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1",
						children: "Slow Romance: she will not have sex with you until you are a couple. Casual: before that, she only gets intimate if Trust and Bonding are both at least 50 and you have shown you want her farts or her spray. Until you are official, that is what the scene stays about. Most of the time she waits a couple of turns to see what the last fart or spray did. She does not wait when she is marking you, when she is being dominant, or when you ask for more. Then she will go again, including a fart on the next line. If she isn't feeling another one, she says what's actually going on, in her own words: not gassy, tank empty, out of gas. She doesn't just say she doesn't want to. A playful dare in public is her choice. Izzy usually goes along, and she will fart to get your attention if the other skunkgirl is there. Victoria usually won't. At night, an intimate scene does not move the clock, and she will not call the day over in the middle of it. When you want it to end, say so. That you are done, that you should stop, that you want to get dressed or cuddle. Then the night can close. She also can't fart forever. Two in a row, then at least one quiet reply. Past Trust 40 she can do three, and then she needs two quiet replies. A really big one makes her wait a turn, unless you're intimate, where she can land two big ones first. Eating anywhere that sells food makes her more likely to fart for the rest of the day. Sitting down at Casa Luna does that the most, and it's the one place she can keep a longer run going. The farts there can be the large ones, without the moans."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base text-fg",
							children: "Outfits"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: "She changes with the place, the hour, and how close you are. You do not pick from a menu."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-2 list-disc space-y-1 pl-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Campus clothes, lounge, her work vest, a date dress, sleep clothes, lingerie." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Bonus Cosplay Outfits — talking about the things she loves can unlock one during intimacy at her dorm. There are two right now. More later. They stay out of public, and they do not mix." })]
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-base text-fg",
							children: "Places that exist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1",
							children: "These are the only places an invite will go. Anywhere else will not move the scene."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 list-disc space-y-1 pl-4",
							children: places.map((place) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-fg",
									children: [place.name, "."]
								}),
								" ",
								place.what,
								" ",
								place.blurb
							] }, place.id))
						})
					] })
				]
			})]
		})
	});
}
function PassTime() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const location = useCompanion((s) => s.location);
	const timeOfDay = useCompanion((s) => s.timeOfDay);
	const workedToday = useCompanion((s) => s.workedToday);
	const phase = useCompanion((s) => s.dayPhase);
	const due = useCompanion((s) => dateIsDue(s));
	const goToWork = useCompanion((s) => s.goToWork);
	const readTime = useCompanion((s) => s.readTime);
	const studyTime = useCompanion((s) => s.studyTime);
	const home = location === "apartment";
	const slot = timeOfDay === "Morning" || timeOfDay === "Afternoon" || timeOfDay === "Evening";
	const playing = phase === "playing" && !due;
	const ready = home && slot && !workedToday && playing;
	const reason = !playing ? "Not while something else is waiting." : !home ? "You have to travel to the Apartment first." : !slot ? "You can only go to work in the Morning, Afternoon, or Evening." : workedToday ? "You already worked today." : "";
	const canRead = playing && location === "library" && timeOfDay !== "Night";
	const canStudy = playing && location === "studyHall" && timeOfDay !== "Night";
	const readReason = !playing ? "Not while something else is waiting." : location !== "library" ? "Reading is at the Campus Library." : timeOfDay === "Night" ? "The library is closed." : "";
	const studyReason = !playing ? "Not while something else is waiting." : location !== "studyHall" ? "Studying is at the Study Hall." : timeOfDay === "Night" ? "The study hall is closed." : "";
	const sheet = open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 w-full max-w-sm rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg text-fg",
						children: "Time Skips And Work"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: "Go to Work skips ahead from your apartment and banks $20. Once a day. Not at night. Reading and Studying each move the clock one period, and you can do them again."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setOpen(false),
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					disabled: !ready,
					onClick: () => {
						goToWork();
						setOpen(false);
					},
					children: "Go to Work"
				}),
				reason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-red-400",
					children: reason
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3 w-full",
					variant: "outline",
					disabled: !canRead,
					onClick: () => {
						readTime();
						setOpen(false);
					},
					children: "Reading"
				}),
				readReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: readReason
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-3 w-full",
					variant: "outline",
					disabled: !canStudy,
					onClick: () => {
						studyTime();
						setOpen(false);
					},
					children: "Studying"
				}),
				studyReason ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: studyReason
				}) : null
			]
		})
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "ghost",
		size: "sm",
		onClick: () => setOpen(true),
		"aria-label": "Time Skips And Work",
		title: "Time Skips And Work",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Timer, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-xs leading-tight",
			children: "Time Skips And Work"
		})]
	}), typeof document !== "undefined" && sheet ? (0, import_react_dom.createPortal)(sheet, document.body) : null] });
}
function SleepButton() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const location = useCompanion((s) => s.location);
	const timeOfDay = useCompanion((s) => s.timeOfDay);
	const phase = useCompanion((s) => s.dayPhase);
	const busy = useCompanion((s) => s.busy);
	const sprayed = useCompanion((s) => s.sprayed);
	const due = useCompanion((s) => Boolean(dateIsDue(s) || s.dateDraft || s.dateReview));
	const sleep = useCompanion((s) => s.sleep);
	const ready = phase === "playing" && canSleepNow(location, timeOfDay) && !busy && !sprayed && !due;
	const why = ready ? "" : phase !== "playing" ? "Not right now." : timeOfDay === "Morning" || timeOfDay === "Afternoon" ? "Sleep is from Evening on." : "Sleep is only at your apartment, Izzy's dorm, or Vicky's bedroom.";
	const sheet = open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 w-full max-w-sm rounded-[var(--radius-xl)] border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg text-fg",
						children: "Sleep"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => setOpen(false),
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed text-muted",
					children: "Sleeping will open a Day Recap window and progress time to the next Morning, while removing some Stink Level."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: () => {
						sleep();
						setOpen(false);
					},
					children: "Sleep"
				})
			]
		})
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		size: "icon",
		disabled: !ready,
		onClick: () => setOpen(true),
		"aria-label": "Sleep",
		title: ready ? "Sleep" : why,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-[13px] leading-none tracking-tight",
			children: "Zzz"
		})
	}), typeof document !== "undefined" && sheet ? (0, import_react_dom.createPortal)(sheet, document.body) : null] });
}
function InventorySheet({ onClose }) {
	const inventory = useCompanion((s) => s.inventory);
	const money = useCompanion((s) => s.money);
	const counts = /* @__PURE__ */ new Map();
	for (const id of inventory) counts.set(id, (counts.get(id) ?? 0) + 1);
	const rows = [...counts.entries()];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl text-fg",
					children: "Inventory"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted",
					children: [
						rows.length ? `${inventory.length} gift${inventory.length === 1 ? "" : "s"} in the bag.` : "The bag is empty.",
						" $",
						money,
						" on you."
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}), rows.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-2",
				children: rows.map(([id, count]) => {
					const gift = giftById(id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-md border border-border px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-fg",
							children: gift?.name ?? id
						}), count > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-sm text-muted",
							children: ["×", count]
						}) : null]
					}, id);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "Buy something at a shop. A date needs a gift from this bag."
			})]
		})
	});
}
var NONE = [];
function ShowerSheet({ onClose }) {
	const inventory = useCompanion((s) => s.inventory) ?? NONE;
	const showersToday = useCompanion((s) => s.showersToday ?? 0);
	const stink = useCompanion((s) => s.stink ?? 0);
	const takeShower = useCompanion((s) => s.takeShower);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [picked, setPicked] = (0, import_react.useState)([]);
	const owned = [...new Set(inventory)].filter((id) => freshenRating(id) > 0);
	const left = Math.max(0, 2 - showersToday);
	const cut = showerCut(picked.filter((id) => owned.includes(id)));
	function toggle(id) {
		setPicked((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-end justify-center bg-bg/75 p-3 sm:items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-xl border border-border bg-surface p-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl text-fg",
						children: "Shower"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [
							"Twice a day. Water alone takes 10 off the stink. Soap, spray, and whatever else you check off is used up, and can take it as high as 75. ",
							left,
							" left today. Stink is ",
							Math.round(stink),
							"."
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: onClose,
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					disabled: left <= 0,
					onClick: () => setOpen(true),
					children: "Take Shower"
				}),
				left <= 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "You've already showered twice today."
				}) : null,
				open && left > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-md border border-border p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.14em] text-subtle",
							children: "Sanitary items"
						}),
						owned.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 grid gap-2",
							children: owned.map((id) => {
								const gift = giftById(id);
								const on = picked.includes(id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex cursor-pointer items-center justify-between gap-3 rounded-md border border-border px-3 py-2 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-2 text-fg",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "checkbox",
											checked: on,
											onChange: () => toggle(id)
										}), gift?.name ?? id]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-mono text-muted",
										children: ["Freshening ", FRESHEN[id]]
									})]
								}) }, id);
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted",
							children: "Nothing in the bag that helps. The shower still counts for 10."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-fg",
							children: [
								"This shower takes ",
								picked.length ? cut : 10,
								" off the stink."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-3 w-full",
							onClick: () => {
								takeShower(picked);
								onClose();
							},
							children: "Wash"
						})
					]
				}) : null
			]
		})
	});
}
var TICKS = [
	0,
	10,
	20,
	30,
	40,
	50,
	60,
	70,
	80,
	90,
	100
];
function StinkMeter() {
	const stink = useCompanion((s) => Math.max(0, Math.min(100, Math.round(s.stink ?? 0))));
	const izzy = useCompanion((s) => typeof s.scentFrom?.izzy === "number" ? s.scentFrom.izzy : 0);
	const victoria = useCompanion((s) => typeof s.scentFrom?.victoria === "number" ? s.scentFrom.victoria : 0);
	const who = markedLabel(stink, {
		izzy,
		victoria
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "stink-meter",
		"aria-label": `Stink meter ${stink}. Currently marked by ${who}.`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "stink-meter-label",
			children: ["Currently Marked By:", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "stink-meter-who",
				children: who
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stink-tube",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stink-fill",
				style: { height: `${stink}%` }
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "stink-ticks",
				children: TICKS.map((tick) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "stink-tick",
					style: { bottom: `${tick}%` },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: tick })
				}, tick))
			})]
		})]
	});
}
var CHAT_LOG_KEY = "izzy-chat-logs";
var MAX_LOGS = 30;
function read() {
	try {
		const raw = localStorage.getItem(CHAT_LOG_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((log) => log && Array.isArray(log.messages) && typeof log.id === "string");
	} catch {
		return [];
	}
}
function write(logs) {
	localStorage.setItem(CHAT_LOG_KEY, JSON.stringify(logs.slice(0, MAX_LOGS)));
}
function listChatLogs() {
	return read().sort((a, b) => b.savedAt - a.savedAt);
}
function saveChatLog(input) {
	const log = {
		...input,
		id: uid(),
		savedAt: Date.now(),
		messages: input.messages.map((m) => ({
			id: m.id,
			role: m.role,
			text: m.text,
			at: m.at
		}))
	};
	try {
		write([log, ...read()]);
		return {
			ok: true,
			log
		};
	} catch {
		return { ok: false };
	}
}
function deleteChatLog(id) {
	try {
		write(read().filter((log) => log.id !== id));
	} catch {}
}
function SaveChatButton() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)(null);
	function save() {
		const s = useCompanion.getState();
		if (!s.messages.length) {
			setNote("Nothing to save yet.");
			return;
		}
		const result = saveChatLog({
			playerName: s.playerName.trim() || "You",
			gameMode: s.gameMode,
			weekday: s.weekday,
			timeOfDay: s.timeOfDay,
			locationName: placeOf(s.location).name,
			messages: s.messages.map((m) => ({
				id: m.id,
				role: m.role,
				text: m.text,
				at: m.at
			}))
		});
		setNote(result.ok ? "Saved to the title screen." : "Couldn't save. Storage is full.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "ghost",
			size: "icon",
			"aria-label": "Save chat log",
			"aria-expanded": open,
			onClick: () => {
				setNote(null);
				setOpen((v) => !v);
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, {})
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "absolute right-0 top-12 z-40 w-64 rounded-xl border border-border bg-surface p-3 shadow-[0_16px_40px_rgba(0,0,0,0.4)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm leading-relaxed text-fg",
					children: "Save this chat to the title screen?"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: "You can read it later from the main menu. The game itself stays as it is."
				}),
				note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-accent",
					children: note
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						className: "flex-1",
						onClick: save,
						children: "Save chat log"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: () => setOpen(false),
						children: "Close"
					})]
				})
			]
		}) : null]
	});
}
function InviteDecision() {
	const destId = useCompanion((s) => s.pendingInvite);
	const reply = useCompanion((s) => s.inviteReply);
	const setReply = useCompanion((s) => s.setInviteReply);
	const busy = useCompanion((s) => s.busy);
	const focus = useCompanion((s) => s.focus ?? "izzy");
	const sprayed = useCompanion((s) => s.sprayed);
	if (!destId || sprayed) return null;
	const dest = placeOf(destId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 rounded-md border border-cream/40 bg-cream/10 px-3 py-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-fg text-pretty",
				children: [
					girlName(focus),
					" has invited you to ",
					inviteToken(dest.id),
					". Will you join her?"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] leading-relaxed text-muted text-pretty",
				children: "Accept or Decline flags your next message. The scene updates after you send — not when you tap a choice."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: reply === "accept" ? "default" : "outline",
					className: "flex-1",
					disabled: busy,
					"aria-pressed": reply === "accept",
					onClick: () => setReply(reply === "accept" ? null : "accept"),
					children: "Accept"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: reply === "decline" ? "default" : "outline",
					className: "flex-1",
					disabled: busy,
					"aria-pressed": reply === "decline",
					onClick: () => setReply(reply === "decline" ? null : "decline"),
					children: "Decline"
				})]
			}),
			reply ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("mt-2 text-[11px] uppercase tracking-[0.14em]", "text-accent"),
				children: reply === "accept" ? "Accept flagged — send when you're ready." : "Decline flagged — send when you're ready."
			}) : null
		]
	});
}
var SPLATS = [
	{
		left: "2%",
		top: "0%",
		w: 280,
		h: 200,
		clip: "polygon(48% 4%, 70% 0%, 86% 14%, 78% 28%, 98% 34%, 84% 52%, 96% 74%, 70% 68%, 62% 92%, 40% 78%, 28% 98%, 12% 76%, 0% 54%, 14% 36%, 4% 16%, 26% 12%)"
	},
	{
		left: "28%",
		top: "-4%",
		w: 340,
		h: 220,
		clip: "polygon(40% 0%, 62% 6%, 78% 2%, 92% 22%, 74% 30%, 100% 48%, 82% 58%, 90% 86%, 64% 74%, 52% 100%, 30% 80%, 22% 96%, 6% 70%, 0% 42%, 16% 28%, 8% 8%)"
	},
	{
		left: "58%",
		top: "2%",
		w: 260,
		h: 190,
		clip: "polygon(36% 8%, 58% 0%, 80% 12%, 70% 26%, 96% 32%, 78% 48%, 92% 72%, 60% 64%, 54% 94%, 28% 76%, 16% 90%, 4% 62%, 0% 38%, 18% 24%, 8% 10%)"
	},
	{
		left: "8%",
		top: "22%",
		w: 360,
		h: 240,
		clip: "polygon(44% 2%, 66% 8%, 84% 0%, 96% 24%, 78% 34%, 100% 52%, 80% 62%, 88% 90%, 58% 74%, 46% 100%, 24% 82%, 14% 96%, 0% 68%, 8% 44%, 0% 22%, 22% 16%)"
	},
	{
		left: "48%",
		top: "18%",
		w: 320,
		h: 260,
		clip: "polygon(30% 6%, 52% 0%, 74% 10%, 66% 24%, 92% 20%, 100% 46%, 78% 42%, 88% 70%, 64% 62%, 70% 96%, 42% 78%, 34% 100%, 12% 74%, 0% 48%, 16% 36%, 6% 14%)"
	},
	{
		left: "0%",
		top: "46%",
		w: 240,
		h: 180,
		clip: "polygon(42% 8%, 68% 0%, 90% 18%, 76% 32%, 98% 48%, 74% 58%, 86% 88%, 52% 72%, 40% 98%, 18% 76%, 4% 84%, 0% 52%, 14% 34%, 6% 12%)"
	},
	{
		left: "32%",
		top: "40%",
		w: 380,
		h: 250,
		clip: "polygon(38% 0%, 60% 8%, 82% 2%, 94% 26%, 76% 34%, 100% 56%, 82% 66%, 90% 94%, 62% 78%, 50% 100%, 28% 84%, 18% 96%, 2% 70%, 10% 46%, 0% 24%, 24% 14%)"
	},
	{
		left: "70%",
		top: "38%",
		w: 220,
		h: 200,
		clip: "polygon(46% 6%, 72% 0%, 94% 20%, 80% 34%, 100% 58%, 74% 52%, 86% 86%, 54% 70%, 48% 98%, 22% 78%, 8% 88%, 0% 56%, 16% 32%, 4% 14%)"
	},
	{
		left: "6%",
		top: "64%",
		w: 300,
		h: 200,
		clip: "polygon(34% 4%, 58% 0%, 80% 16%, 68% 28%, 96% 36%, 78% 54%, 90% 84%, 58% 68%, 50% 100%, 24% 80%, 10% 94%, 0% 64%, 12% 40%, 2% 18%, 22% 12%)"
	},
	{
		left: "40%",
		top: "66%",
		w: 340,
		h: 210,
		clip: "polygon(40% 2%, 64% 10%, 86% 0%, 98% 28%, 76% 36%, 100% 60%, 80% 70%, 86% 98%, 56% 80%, 44% 100%, 20% 78%, 8% 90%, 0% 58%, 14% 36%, 4% 16%)"
	}
];
var DROPS = [
	{
		left: "18%",
		top: "14%",
		s: 18
	},
	{
		left: "74%",
		top: "12%",
		s: 12
	},
	{
		left: "88%",
		top: "28%",
		s: 22
	},
	{
		left: "12%",
		top: "40%",
		s: 14
	},
	{
		left: "92%",
		top: "58%",
		s: 16
	},
	{
		left: "24%",
		top: "72%",
		s: 20
	},
	{
		left: "64%",
		top: "84%",
		s: 14
	},
	{
		left: "46%",
		top: "8%",
		s: 10
	},
	{
		left: "6%",
		top: "88%",
		s: 16
	},
	{
		left: "80%",
		top: "76%",
		s: 11
	}
];
/** Oily ink on the lens. The pose stays clear, then the spray hits the glass and drips off. */
function LensCoat() {
	const pulse = useCompanion((s) => s.fxPulse);
	const spray = pulse.kind === "spray" || pulse.otherKind === "spray";
	const [phase, setPhase] = (0, import_react.useState)("off");
	(0, import_react.useEffect)(() => {
		if (!spray) return;
		setPhase("off");
		const hit = window.setTimeout(() => setPhase("coat"), 1300);
		const drip = window.setTimeout(() => setPhase("drip"), 2300);
		const done = window.setTimeout(() => setPhase("off"), 5200);
		return () => {
			window.clearTimeout(hit);
			window.clearTimeout(drip);
			window.clearTimeout(done);
		};
	}, [pulse.key, spray]);
	if (phase === "off") return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("lens-coat", phase === "drip" && "lens-drip"),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lens-film" }),
			SPLATS.map((blob) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "lens-blob",
				style: {
					left: blob.left,
					top: blob.top,
					width: blob.w,
					height: blob.h,
					clipPath: blob.clip
				}
			}, `${blob.left}-${blob.top}`)),
			DROPS.map((drop) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "lens-drop",
				style: {
					left: drop.left,
					top: drop.top,
					width: drop.s,
					height: drop.s
				}
			}, `${drop.left}-${drop.top}`)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lens-streak lens-streak-a" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lens-streak lens-streak-b" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lens-streak lens-streak-c" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "lens-streak lens-streak-d" })
		]
	});
}
function LocationSheet() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [choice, setChoice] = (0, import_react.useState)(null);
	const current = useCompanion((s) => s.location);
	const insertDraft = useCompanion((s) => s.insertDraft);
	const goAlone = useCompanion((s) => s.goAlone);
	const depart = useCompanion((s) => s.depart);
	const present = useCompanion((s) => s.present);
	const izzyHere = useCompanion((s) => s.izzyHere);
	const game = useCompanion();
	const timeOfDay = useCompanion((s) => s.timeOfDay);
	const showPlaces = useCompanion((s) => s.showPlaces);
	const dismissPlaces = useCompanion((s) => s.dismissPlaces);
	const locations = Object.values(LOCATIONS);
	const alone = playerAlone({
		izzyHere,
		present
	});
	const night = timeOfDay === "Night";
	(0, import_react.useEffect)(() => {
		if (showPlaces) setOpen(true);
	}, [showPlaces]);
	const sheet = open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 w-full max-w-lg overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between px-5 py-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-lg text-fg",
						children: "Places"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: night ? "Night. Closed places stay shut. Open ones are marked." : "Where they are. Invite fills the box. Travel goes there yourself."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						onClick: () => {
							setOpen(false);
							dismissPlaces();
						},
						"aria-label": "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-h-[min(70dvh,600px)] space-y-5 overflow-y-auto px-5 pb-5",
					children: LOCATION_GROUPS.map((group) => {
						const items = locations.filter((l) => l.group === group.id);
						if (!items.length) return null;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-[11px] uppercase tracking-[0.16em] text-subtle",
							children: group.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: items.map((loc) => {
								const active = loc.id === current;
								const openNow = openTonight(loc.id, timeOfDay);
								const found = GIRLS.filter((girl) => girlAt(game, girl) === loc.id);
								const whoLine = found.length ? `${found.map(girlName).join(" and ")} ${found.length > 1 ? "are" : "is"} here.` : "";
								const hint = whoLine || (active ? "You're here." : loc.what);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setChoice(loc.id),
									className: cn("rounded-[var(--radius-md)] border border-border px-3 py-3 text-left hover:bg-elevated", active && "bg-elevated", night && !openNow && "opacity-60"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "flex items-center justify-between gap-2 text-sm text-fg",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: loc.name }), night ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("text-[11px] uppercase tracking-[0.12em]", openNow ? "text-fg" : "text-muted"),
												children: openNow ? "Open" : "Closed"
											}) : null]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-muted",
											children: hint
										}),
										whoLine && !active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-0.5 text-xs text-subtle",
											children: loc.what
										}) : null
									]
								}, loc.id);
							})
						})] }, group.id);
					})
				}),
				choice ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t border-border px-5 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-fg",
							children: LOCATIONS[choice].name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: night && !openTonight(choice, timeOfDay) ? "Closed for the night." : "Invite fills the box. Nothing sends yet. Travel goes there yourself."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									disabled: night && !openTonight(choice, timeOfDay),
									onClick: () => {
										insertDraft(inviteToken(choice));
										setChoice(null);
										setOpen(false);
										dismissPlaces();
									},
									children: "Invite"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									disabled: night && !openTonight(choice, timeOfDay),
									onClick: () => {
										if (alone) goAlone(choice);
										else depart(choice);
										setChoice(null);
										setOpen(false);
										dismissPlaces();
									},
									children: "Travel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: () => setChoice(null),
									children: "Back"
								})
							]
						})
					]
				}) : null
			]
		})
	}) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
		variant: "outline",
		size: "sm",
		onClick: () => setOpen(true),
		"aria-label": "Places",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "hidden sm:inline",
			children: "Places"
		})]
	}), typeof document !== "undefined" && sheet ? (0, import_react_dom.createPortal)(sheet, document.body) : null] });
}
function copyFor(prompt) {
	const name = girlName(prompt.girl);
	const vicky = prompt.girl === "victoria";
	if (prompt.kind === "dominant") return {
		title: `${name}'s got you.`,
		compact: `${name}. Dominant spray. Submit or resist.`,
		body: vicky ? `${name} has her skirt up in both hands and her tail aimed, and the look on her face is not a question. The spray is a leash. She wants to know if you'll take it.` : `${name} has her bottoms down and her tail up, and the look on her face is not a question. The spray is a leash. She wants to know if you'll take it.`
	};
	if (prompt.kind === "consensual") return {
		title: `${name} marked you.`,
		compact: `${name} sprayed you. On purpose. Together.`,
		body: vicky ? `${name} turned, skirt lifted, tail high, and let it go because you asked for the real her. The musk is chemical, sweet, and intimate. This is not a fight. How do you meet it?` : `${name} turned, tail high, and let it go because you asked for the real her. The musk is chemical, sweet, and intimate. This is not a fight. How do you meet it?`
	};
	if (prompt.kind === "defensive") return {
		title: `${name} sprayed you. Scared.`,
		compact: `${name}. Defensive spray. She thought you were a threat.`,
		body: `${name} warned you, or she didn't have time. The spray was fear, not a game. You can give in to it, or you can find out you wanted it.`
	};
	return {
		title: `${name} sprayed you.`,
		compact: `${name} sprayed you.`,
		body: vicky ? `${name} turned, skirt up, tail aimed, and emptied the magazine. The musk is chemical, sweet, and absolutely personal. You can wait it out and try to make this right — or walk away for good.` : `${name} turned, tail up, and emptied the magazine. The musk is chemical, sweet, and absolutely personal. You can wait it out and try to make this right — or walk away for good.`
	};
}
function choicesFor(kind) {
	if (kind === "dominant") return [["submit", "Submit"], ["resist", "Resist"]];
	if (kind === "consensual") return [["embrace", "Embrace it"], ["overwhelm", "Become overwhelmed"]];
	if (kind === "defensive") return [["surrender", "Surrender"], ["aroused", "Be aroused"]];
	return [["apologize", "Stay and apologize"], ["reset", "Start over"]];
}
function SprayCard({ prompt, stacked }) {
	const dismiss = useCompanion((s) => s.dismissSpray);
	const [compact, setCompact] = (0, import_react.useState)(stacked);
	const text = copyFor(prompt);
	const choices = choicesFor(prompt.kind);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("pointer-events-auto w-full rounded-xl border border-border bg-surface/92 shadow-[0_16px_50px_rgba(0,0,0,0.4)]", compact ? "px-3 py-2" : "p-5 sm:p-6"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-w-0 flex-1",
				children: compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "line-clamp-2 text-sm text-fg",
					children: text.compact
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl tracking-tight text-fg text-balance",
					children: text.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-relaxed text-muted text-pretty",
					children: text.body
				})] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "ghost",
				size: "sm",
				className: "h-9 shrink-0 gap-1 px-2 text-xs text-muted",
				onClick: () => setCompact((v) => !v),
				"aria-label": compact ? `Expand ${girlName(prompt.girl)}'s spray reaction` : `Minimize ${girlName(prompt.girl)}'s spray reaction`,
				"aria-pressed": compact,
				children: [compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsDownUp, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: compact ? "Expand" : "Minimize" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: cn("flex gap-2", compact ? "mt-2" : "mt-5 flex-col sm:flex-row"),
			children: choices.map(([mode, label], index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: index === 0 ? "default" : "outline",
				className: compact ? "h-9 flex-1 text-xs" : "flex-1",
				onClick: () => dismiss(mode, prompt.girl),
				children: label
			}, mode))
		})]
	});
}
function SprayOverlay() {
	const sprayed = useCompanion((s) => s.sprayed);
	const spotlight = useCompanion((s) => s.spraySpotlight);
	const kind = useCompanion((s) => s.sprayKind);
	const focus = useCompanion((s) => s.focus ?? "izzy");
	const stored = useCompanion((s) => s.sprayPrompts);
	const resolved = useCompanion((s) => s.flags.intimateSprayResolved);
	if (spotlight) return null;
	const prompts = stored?.length ? stored : sprayed && kind !== "none" && !(kind === "consensual" && resolved) ? [{
		girl: focus,
		kind
	}] : [];
	if (!prompts.length) return null;
	const stacked = prompts.length > 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-30 flex items-end overflow-y-auto p-3 pb-4 sm:p-5 lg:max-w-[54%]",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex w-full flex-col gap-2",
			children: [
				stacked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pointer-events-none text-xs text-cream/80",
					children: "Answer each of them. You can't talk until both are chosen."
				}) : null,
				prompts.map((prompt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SprayCard, {
					prompt,
					stacked
				}, prompt.girl)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TurnControls, {})
				})
			]
		})
	});
}
function when(at) {
	try {
		return new Date(at).toLocaleString(void 0, {
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit"
		});
	} catch {
		return "";
	}
}
function ChatLogLibrary() {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [logs, setLogs] = (0, import_react.useState)([]);
	const [reading, setReading] = (0, import_react.useState)(null);
	function refresh() {
		setLogs(listChatLogs());
	}
	if (!open) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "text-xs text-muted underline-offset-2 hover:underline",
		onClick: () => {
			refresh();
			setReading(null);
			setOpen(true);
		},
		children: "Chat logs"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-bg/75 p-3 pt-12 sm:items-center sm:pt-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 flex max-h-[min(80dvh,720px)] w-full max-w-lg flex-col rounded-[var(--radius-xl)] border border-border bg-surface shadow-[0_24px_60px_rgba(0,0,0,0.4)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg text-fg",
					children: reading ? reading.playerName : "Chat logs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "icon",
					"aria-label": "Close",
					onClick: () => {
						setOpen(false);
						setReading(null);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				})]
			}), reading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 space-y-3 overflow-y-auto px-5 pb-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							reading.gameMode === "slow" ? "Slow Romance" : "Casual",
							" · ",
							reading.weekday,
							" ",
							reading.timeOfDay,
							" ·",
							" ",
							reading.locationName,
							" · ",
							when(reading.savedAt)
						]
					}),
					reading.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatLine, { message: m }, m.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setReading(null),
						children: "All logs"
					})
				]
			}) : logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-5 pb-5 text-sm text-muted",
				children: "No saved chats yet. The floppy disk in a game saves one here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "min-h-0 flex-1 space-y-2 overflow-y-auto px-5 pb-5",
				children: logs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-lg border border-border bg-bg/40 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "w-full text-left",
						onClick: () => setReading(log),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-fg",
							children: [
								log.playerName,
								" · ",
								log.gameMode === "slow" ? "Slow Romance" : "Casual"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: [
								when(log.savedAt),
								" · ",
								log.messages.length,
								" message",
								log.messages.length === 1 ? "" : "s",
								" ·",
								" ",
								log.locationName
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-2 text-xs text-subtle underline-offset-2 hover:text-fg hover:underline",
						onClick: () => {
							deleteChatLog(log.id);
							refresh();
						},
						children: "Remove"
					})]
				}, log.id))
			})]
		})
	});
}
var MEET_HOOK = {
	library: "Even odds. Design books, or the history aisle.",
	studyHall: "Usually a student. Sometimes a woman studying for a promotion.",
	trail: "Izzy knows these woods. Victoria only comes here to stop holding it in.",
	animeStore: "Neko Shelf is Izzy's. Victoria is rarely here, and only for her daughter.",
	craftStore: "Fabric and frames. This is Victoria's store. Izzy almost never walks in."
};
function StartScreen() {
	const start = useCompanion((s) => s.start);
	const hydrated = useCompanion((s) => s.hydrated);
	const hasSave = useCompanion((s) => Boolean(s.playerName && s.messages.length));
	const resume = useCompanion((s) => s.resume);
	const [name, setName] = (0, import_react.useState)("");
	const [gender, setGender] = (0, import_react.useState)(null);
	const [fartRole, setFartRole] = (0, import_react.useState)(null);
	const [mode, setMode] = (0, import_react.useState)(null);
	const [rel, setRel] = (0, import_react.useState)(null);
	const [meet, setMeet] = (0, import_react.useState)("library");
	const ready = Boolean(name.trim()) && gender !== null && fartRole !== null && mode !== null && rel !== null && hydrated;
	const place = LOCATIONS[meet];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: place.image,
				alt: "",
				className: "absolute inset-0 size-full object-cover opacity-70"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/25" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative z-10 mx-auto flex min-h-dvh max-w-xl flex-col justify-end px-5 pb-24 pt-16 sm:justify-center sm:pb-28",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.22em] text-cream/70",
						children: "A skunkgirl dating sim"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 font-display text-6xl leading-none tracking-tight text-cream text-balance sm:text-7xl",
						children: "Skunkgirls"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-5 max-w-md text-sm leading-relaxed text-cream/80 text-pretty sm:text-base",
						children: [MEET_HOOK[meet] ?? "Someone is already here.", " You don't get to choose which of them you find first."]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mt-8 space-y-4",
						onSubmit: (e) => {
							e.preventDefault();
							if (!ready) return;
							unlockAudio();
							start(name, meet, gender ?? "male", fartRole ?? "into", mode ?? "casual", rel ?? "mono");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-[0.16em] text-subtle",
									children: "You are:"
								}), [["male", "Male"], ["female", "Female"]].map(([id, label]) => {
									const on = gender === id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setGender(id),
										"aria-pressed": on,
										className: cn("rounded-md border px-4 py-2 text-sm font-medium transition-colors", on ? "border-cream/70 bg-cream/15 text-cream" : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60"),
										children: label
									}, id);
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-[0.16em] text-subtle",
									children: "What Role Will You Play? You Are:"
								}), [["into", "Into Farts"], ["not", "Not Into Farts"]].map(([id, label]) => {
									const on = fartRole === id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setFartRole(id),
										"aria-pressed": on,
										className: cn("rounded-md border px-4 py-2 text-sm font-medium transition-colors", on ? "border-cream/70 bg-cream/15 text-cream" : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60"),
										children: label
									}, id);
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-[0.16em] text-subtle",
									children: "Gamemode:"
								}), [["slow", "Slow Romance"], ["casual", "Casual"]].map(([id, label]) => {
									const on = mode === id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setMode(id),
										"aria-pressed": on,
										className: cn("rounded-md border px-4 py-2 text-sm font-medium transition-colors", on ? "border-cream/70 bg-cream/15 text-cream" : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60"),
										children: label
									}, id);
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs uppercase tracking-[0.16em] text-subtle",
									children: "Relationship Type:"
								}), [["mono", "Monogamous"], ["harem", "Skunkgirl Harem"]].map(([id, label]) => {
									const on = rel === id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										onClick: () => setRel(id),
										"aria-pressed": on,
										className: cn("rounded-md border px-4 py-2 text-sm font-medium transition-colors", on ? "border-cream/70 bg-cream/15 text-cream" : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60"),
										children: label
									}, id);
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "block text-xs uppercase tracking-[0.16em] text-subtle",
								children: ["What should she call you?", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									className: "mt-2 bg-bg/50",
									value: name,
									onChange: (e) => setName(e.target.value),
									placeholder: "Name",
									autoComplete: "off",
									autoFocus: true,
									name: "player-name",
									maxLength: 40,
									disabled: !hydrated
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
								className: "text-xs uppercase tracking-[0.16em] text-subtle",
								children: "Where do you start?"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 grid grid-cols-2 gap-2",
								children: FIRST_MEETS.map((id) => {
									const loc = LOCATIONS[id];
									const on = meet === id;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setMeet(id),
										"aria-pressed": on,
										className: cn("rounded-md border px-3 py-2 text-left transition-colors", on ? "border-cream/70 bg-cream/15 text-cream" : "border-border bg-bg/45 text-cream/80 hover:bg-bg/60"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block text-sm font-medium",
											children: loc.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-0.5 block text-[11px] leading-snug text-cream/65",
											children: loc.blurb
										})]
									}, id);
								})
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-2 sm:flex-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									variant: "cream",
									className: "flex-1",
									disabled: !ready,
									children: "Meet her"
								}), hasSave ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									className: "flex-1",
									onClick: () => {
										unlockAudio();
										resume();
									},
									children: "Continue"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowToPlay, { tone: "title" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatLogLibrary, {})]
							})
						]
					})
				]
			})
		]
	});
}
function Bar({ label, value, max, min = 0, tone }) {
	const pct = Math.max(0, Math.min(100, (value - min) / (max - min) * 100));
	const low = value < 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-0.5 flex items-baseline justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] uppercase tracking-[0.14em] text-subtle",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] tabular-nums text-muted",
				children: Math.round(value)
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative h-1.5 overflow-hidden rounded-full bg-elevated",
			role: "meter",
			"aria-valuemin": min,
			"aria-valuemax": max,
			"aria-valuenow": Math.round(value),
			"aria-label": label,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("absolute inset-y-0 left-0 rounded-full transition-[width] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]", low ? "bg-danger" : tone === "bond" ? "bg-accent" : value >= 100 ? "bg-accent" : "bg-trust"),
				style: { width: `${low ? 8 : pct}%` }
			})
		})]
	});
}
function Block({ name, trust, bonding, bond, dates, slow }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-w-0 space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "font-display text-sm tracking-tight text-fg",
				children: [name, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-2 text-[10px] uppercase tracking-[0.14em] text-subtle",
					children: bondLabel(bond)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
				label: "Trust",
				value: trust,
				min: 0,
				max: 100,
				tone: "trust"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
				label: "Bonding",
				value: bonding,
				min: 0,
				max: 100,
				tone: "bond"
			}),
			slow ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-[10px] uppercase tracking-[0.14em] text-subtle",
				children: [
					"Dates: ",
					Math.min(3, dates),
					"/3"
				]
			}) : null
		]
	});
}
function TrustMeter() {
	const trust = useCompanion((s) => s.trust);
	const bonding = useCompanion((s) => s.bonding);
	const bond = useCompanion((s) => s.bond);
	const mode = useCompanion((s) => s.gameMode);
	const dates = useCompanion((s) => s.dates);
	const focus = useCompanion((s) => s.focus ?? "izzy");
	const present = useCompanion((s) => s.present);
	const roster = useCompanion((s) => s.roster);
	const both = (present ?? []).includes("izzy") && (present ?? []).includes("victoria");
	const slow = mode === "slow";
	if (!both) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
		name: girlShort(focus),
		trust,
		bonding,
		bond,
		dates: dates ?? 0,
		slow
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid grid-cols-2 gap-3",
		children: ["izzy", "victoria"].map((id) => {
			const card = roster?.[id];
			const live = id === focus;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
				name: girlShort(id),
				trust: live ? trust : card?.trust ?? 0,
				bonding: live ? bonding : card?.bonding ?? 0,
				bond: live ? bond : card?.bond ?? "stranger",
				dates: live ? dates ?? 0 : card?.dates ?? 0,
				slow
			}, id);
		})
	});
}
function CompanionApp() {
	const hydrate = useCompanion((s) => s.hydrate);
	const hydrated = useCompanion((s) => s.hydrated);
	const started = useCompanion((s) => s.started);
	const location = useCompanion((s) => s.location);
	const outfit = useCompanion((s) => s.outfit);
	const reset = useCompanion((s) => s.reset);
	const flags = useCompanion((s) => s.flags);
	const acceptRomance = useCompanion((s) => s.acceptRomance);
	const bond = useCompanion((s) => s.bond);
	const trust = useCompanion((s) => s.trust);
	const bonding = useCompanion((s) => s.bonding);
	const debug = useCompanion((s) => s.debug);
	const weekday = useCompanion((s) => s.weekday);
	const timeOfDay = useCompanion((s) => s.timeOfDay);
	const izzyHere = useCompanion((s) => s.izzyHere);
	const dayPhase = useCompanion((s) => s.dayPhase);
	const fading = useCompanion((s) => s.fading);
	const fadeMs = useCompanion((s) => s.fadeMs ?? 700);
	const spotlight = useCompanion((s) => s.spraySpotlight);
	const endSpotlight = useCompanion((s) => s.endSpotlight);
	const mode = useCompanion((s) => s.gameMode);
	const focus = useCompanion((s) => s.focus);
	const present = useCompanion((s) => s.present);
	const relationshipType = useCompanion((s) => s.relationshipType);
	const roster = useCompanion((s) => s.roster);
	const dates = useCompanion((s) => s.dates);
	const dateSpots = useCompanion((s) => s.dateSpots);
	const dateDraft = useCompanion((s) => s.dateDraft);
	const dateReview = useCompanion((s) => s.dateReview);
	const due = useCompanion(dateIsDue);
	const tipOff = useCompanion((s) => s.dateTipOff);
	const dismissDateTip = useCompanion((s) => s.dismissDateTip);
	const [shop, setShop] = (0, import_react.useState)(false);
	const [bag, setBag] = (0, import_react.useState)(false);
	const [shower, setShower] = (0, import_react.useState)(false);
	const [compact, setCompact] = (0, import_react.useState)(false);
	const cardRef = (0, import_react.useRef)(null);
	const dragRef = (0, import_react.useRef)(null);
	const [spot, setSpot] = (0, import_react.useState)(null);
	function startDrag(e) {
		if (e.target.closest("button, a, input, textarea, select")) return;
		const el = cardRef.current;
		if (!el) return;
		const r = el.getBoundingClientRect();
		dragRef.current = {
			dx: e.clientX - r.left,
			dy: e.clientY - r.top,
			w: r.width
		};
		setSpot({
			x: r.left,
			y: r.top,
			w: r.width
		});
		e.currentTarget.setPointerCapture(e.pointerId);
	}
	function moveDrag(e) {
		const drag = dragRef.current;
		if (!drag) return;
		const x = Math.min(window.innerWidth - 64, Math.max(64 - drag.w, e.clientX - drag.dx));
		const y = Math.min(window.innerHeight - 48, Math.max(8, e.clientY - drag.dy));
		setSpot({
			x,
			y,
			w: drag.w
		});
	}
	function endDrag() {
		dragRef.current = null;
	}
	const [muted, setMutedUi] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	(0, import_react.useEffect)(() => {
		setMutedUi(isMuted());
		const unlock = () => unlockAudio();
		window.addEventListener("pointerdown", unlock);
		window.addEventListener("keydown", unlock);
		const onVis = () => {
			if (document.visibilityState === "visible") unlockAudio();
		};
		document.addEventListener("visibilitychange", onVis);
		return () => {
			window.removeEventListener("pointerdown", unlock);
			window.removeEventListener("keydown", unlock);
			document.removeEventListener("visibilitychange", onVis);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const flush = () => {
			const s = useCompanion.getState();
			if (s.started) writeSave(s);
		};
		const onHide = () => {
			if (document.visibilityState === "hidden") flush();
		};
		document.addEventListener("visibilitychange", onHide);
		window.addEventListener("pagehide", flush);
		return () => {
			document.removeEventListener("visibilitychange", onHide);
			window.removeEventListener("pagehide", flush);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!spotlight) return;
		const t = window.setTimeout(() => endSpotlight(), 5400);
		return () => window.clearTimeout(t);
	}, [spotlight, endSpotlight]);
	if (!hydrated || !started) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StartScreen, {});
	const place = placeOf(location);
	const outfitLabel = (present ?? []).includes("izzy") && (present ?? []).includes("victoria") ? "Izzy and Victoria" : (focus ?? "izzy") === "victoria" ? victoriaLingerieOn(location, Boolean(flags.intimateScene)) ? "Black blazer set" : "Office blouse" : OUTFIT_LABEL[asOutfitId(outfit) ?? "casual"];
	const gate = romanceGate(mode, dates ?? 0, dateSpots ?? []);
	const blocked = romanceBlocked({
		focus: focus ?? "izzy",
		relationshipType: relationshipType ?? "mono",
		roster,
		gameMode: mode
	}, trust, bonding, dates ?? 0);
	const showRomance = flags.romanceOffered && !flags.romanceAccepted && !blocked && (mode === "slow" ? (dates ?? 0) >= 3 && trust >= gate.trust && bonding >= gate.bonding : trust >= 90 && bonding >= 60);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-x-hidden bg-bg text-fg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: place.image,
				alt: "",
				className: "absolute inset-0 size-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-bg/35" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FxLayer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GasVeil, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StinkMeter, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("pointer-events-none absolute inset-x-0 bottom-0 top-16 flex items-end justify-center lg:justify-end lg:pr-8", spotlight ? "z-50" : "z-10"),
				children: izzyHere ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CharacterPortrait, {}) : null
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative z-20 flex flex-wrap items-center gap-2 px-3 py-3 sm:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-bg/55 px-3 py-2 backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
							children: weekday
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none text-fg",
							children: timeOfDay
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-bg/55 px-3 py-2 backdrop-blur-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
							children: place.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: outfitLabel
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-w-[12rem] flex-1 rounded-lg border border-border bg-bg/55 px-3 py-2 backdrop-blur-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustMeter, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocationSheet, {}),
							isStore(location) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setShop(true),
								"aria-label": "Buy A Gift",
								title: "Buy A Gift",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, {})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setBag(true),
								"aria-label": "Inventory",
								title: "Inventory",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backpack, {})
							}),
							SHOWER_PLACES.has(location) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: () => setShower(true),
								"aria-label": "Shower",
								title: "Shower",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowerHead, {})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowToPlay, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SleepButton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PassTime, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SaveChatButton, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								"aria-label": muted ? "Unmute" : "Mute",
								onClick: () => {
									const next = !muted;
									setMuted(next);
									setMutedUi(next);
									unlockAudio();
								},
								children: muted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								onClick: reset,
								"aria-label": "Reset",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("relative z-20 flex min-h-[calc(100dvh-4.75rem)] items-end p-3 sm:p-5 lg:max-w-[54%]", compact ? "pb-16 sm:pb-20" : "pb-20 sm:pb-24"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: cardRef,
					style: spot ? {
						left: spot.x,
						top: spot.y,
						width: spot.w
					} : void 0,
					className: cn("w-full rounded-xl border border-border bg-bg/78 shadow-[0_16px_50px_rgba(0,0,0,0.35)] backdrop-blur-md", "transition-[padding] duration-[var(--motion-fast)] ease-[var(--ease-smooth-out)]", compact ? "px-3 py-2" : "p-4 sm:p-5", spot && "fixed z-30"),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex cursor-grab touch-none items-center gap-2 active:cursor-grabbing",
							onPointerDown: startDrag,
							onPointerMove: moveDrag,
							onPointerUp: endDrag,
							onPointerCancel: endDrag,
							"aria-label": "Drag chat",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GripHorizontal, { className: "size-4 shrink-0 text-muted" }),
								compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialoguePanel, { compact: true }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "min-w-0 flex-1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									size: "sm",
									className: "h-9 shrink-0 gap-1 px-2 text-xs text-muted",
									onClick: () => setCompact((v) => !v),
									"aria-label": compact ? "Expand dialogue" : "Minimize dialogue",
									"aria-pressed": compact,
									children: [compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsUpDown, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronsDownUp, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: compact ? "Expand" : "Minimize" })]
								})
							]
						}),
						compact ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							showRomance ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-3 rounded-md border border-accent/40 bg-accent/10 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-fg",
									children: [girlName(focus ?? "izzy"), " asked. This is the door."]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "mt-2",
									onClick: acceptRomance,
									children: ["Be with ", girlName(focus ?? "izzy")]
								})]
							}) : null,
							bond === "romantic" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-[11px] uppercase tracking-[0.16em] text-accent",
								children: "Together"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialoguePanel, {}),
							present.includes(focus ?? "izzy") && trust >= 20 && bonding >= 20 && (dates ?? 0) < 3 && !tipOff?.[focus ?? "izzy"] && !dateDraft && !dateReview && !due ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-start justify-between gap-3 rounded-md border border-accent/40 bg-accent/10 px-3 py-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-fg",
									children: [
										"You could ask ",
										girlName(focus ?? "izzy"),
										" on a date."
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "text-xs text-muted",
									onClick: dismissDateTip,
									children: "Hide"
								})]
							}) : null
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InviteDecision, {}),
						debug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mb-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DebugBar, {})
						}) : null,
						(dayPhase === "playing" || dayPhase === "planning") && !dateDraft && !dateReview && !due ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatComposer, { compact }) : null
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SprayOverlay, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DayFlow, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePlanner, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateDue, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateReviewCard, {}),
			shop && isStore(location) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GiftShop, {
				place: location,
				onClose: () => setShop(false)
			}) : null,
			bag ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventorySheet, { onClose: () => setBag(false) }) : null,
			shower ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShowerSheet, { onClose: () => setShower(false) }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LensCoat, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"data-fade": true,
				"aria-hidden": true,
				className: cn("fixed inset-0 z-[90] bg-black transition-opacity", fading ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"),
				style: { transitionDuration: `${fadeMs}ms` }
			})
		]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompanionApp, {});
}
//#endregion
export { Home as component };
