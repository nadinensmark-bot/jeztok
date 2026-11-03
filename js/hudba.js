// =====================================================================
// DEFLEARN HUB – hudba. Procedurální generátor na Web Audio API.
// Devět stylů, náhodná tónina a akordový postup pro každou kartu,
// přepínání stylu podle typu karty, zvukové "stingy" u odpovědí.
// Žádné soubory, žádná autorská práva, hraje offline.
// API: HUDBA.start(id) / stop() / toggle() / setVibe(id) / setVolume(v) /
//      proKartu(typKarty) / sting("ok"|"ne"|"levelup") / hraje() / stav() /
//      setAuto(bool) / VIBY / onZmena(fn)
// =====================================================================
(function () {
  "use strict";

  // ---- akordy (intervaly od základu) a stupnice pro melodii ----
  const AK = { maj: [0, 4, 7], min: [0, 3, 7], maj7: [0, 4, 7, 11], min7: [0, 3, 7, 10], dom7: [0, 4, 7, 10], sus: [0, 5, 7], min9: [0, 3, 7, 10, 14], add9: [0, 4, 7, 14] };
  const ST = { durPenta: [0, 2, 4, 7, 9, 12, 14, 16, 19], mollPenta: [0, 3, 5, 7, 10, 12, 15, 17, 19], dorsky: [0, 2, 3, 5, 7, 9, 10, 12, 14, 15] };

  // Každý styl: tempo, swing, lowpass celé stopy, postupy ([posun půltónů, typ akordu] na takt), stupnice, a funkce hraj()
  const STYLY = {
    lofi: { nazev: "Lo-fi klid", emoji: "☕", popis: "Vinyl, e-piano, pomalé bicí", bpm: 76, swing: 0.6, filtr: 3800, stupnice: "durPenta", pro: ["fakt", "lekce"],
      postupy: [[[2, "min7"], [7, "dom7"], [0, "maj7"], [9, "min7"]], [[0, "maj7"], [5, "maj7"], [4, "min7"], [9, "min7"]], [[0, "maj7"], [9, "min7"], [2, "min7"], [7, "dom7"]]],
      hraj(s, bar, t, i) {
        if (s === 0) pad(t, i.akord, i.beat * 4, { typ: "triangle", cutoff: 1300, vol: 0.07 });
        if (s === 0 || s === 10) kick(t, 0.8, { decay: 0.32 });
        if (s === 7 && nahoda(0.4)) kick(t, 0.5);
        if (s === 4 || s === 12) snare(t, 0.45);
        if (s % 2 === 0) hat(t, s % 4 === 0 ? 0.14 : 0.08);
        if (s === 0) bass(t, i.root, i.beat * 1.6, { typ: "sine" });
        if (s === 8) bass(t, i.root + (nahoda(0.5) ? 0 : 7), i.beat * 1.6, { typ: "sine" });
        if (s === 14 && nahoda(0.5)) bass(t, i.root - 2, i.beat * 0.5, { typ: "sine" });
        if (s % 2 === 0 && nahoda(0.22)) pluck(t, melodie(i, 2), i.s16 * (2 + cele(4)), 0.16);
        if (nahoda(0.06)) pop(t + Math.random() * i.s16);
      }, sum: { typ: "highpass", f: 4500, g: 0.012 } },

    focus: { nazev: "Soustředění", emoji: "🌧️", popis: "Plochy, déšť, skoro bez bicích", bpm: 64, swing: 0.55, filtr: 3200, stupnice: "durPenta", pro: ["lekce", "fakt"],
      postupy: [[[0, "maj7"], [5, "maj7"], [0, "add9"], [7, "sus"]], [[9, "min9"], [5, "maj7"], [0, "maj7"], [7, "sus"]]],
      hraj(s, bar, t, i) {
        if (s === 0) pad(t, i.akord, i.beat * 4.2, { typ: "triangle", cutoff: 1100, vol: 0.075, attack: 0.6 });
        if (s === 0 || s === 10) kick(t, 0.45, { decay: 0.4, pitch: 110 });
        if (s === 8) hat(t, 0.07, true);
        if (s === 0) bass(t, i.root, i.beat * 3.6, { typ: "sine" });
        if (s % 4 === 0 && nahoda(0.14)) pluck(t, melodie(i, 1), i.s16 * 6, 0.12);
      }, sum: { typ: "lowpass", f: 1200, g: 0.035 } },

    house: { nazev: "House", emoji: "🪩", popis: "Čtyři na podlahu, klavírní staby", bpm: 124, swing: 0.5, filtr: 12000, stupnice: "mollPenta", pro: ["kviz", "anone", "doplnit"],
      postupy: [[[0, "min7"], [8, "maj7"], [10, "maj7"], [0, "min7"]], [[0, "min7"], [5, "min7"], [8, "maj7"], [10, "maj7"]]],
      hraj(s, bar, t, i) {
        if (s % 4 === 0) kick(t, 1.0, { decay: 0.25, pitch: 160 });
        if (s === 4 || s === 12) clap(t, 0.5);
        if (s % 4 === 2) hat(t, 0.22, true); else if (s % 2 === 0) hat(t, 0.06);
        if (s % 4 === 2) bass(t, i.root + (s === 10 ? 12 : 0), i.beat * 0.45, { typ: "sawtooth", cutoff: 700 });
        if (s === 2 || s === 7 || s === 10 || (s === 13 && nahoda(0.5))) stab(t, i.akord, i.beat * 0.4, { cutoff: 3200, vol: 0.05 });
        if (bar % 8 === 6 && s === 0) sweep(t, i.beat * 8);
        if (s % 2 === 1 && nahoda(0.18)) pluck(t, melodie(i, 2) + 12, i.s16 * 3, 0.1);
      } },

    synthwave: { nazev: "Synthwave", emoji: "🌆", popis: "Osmdesátky, arpeggia, velký snare", bpm: 108, swing: 0.5, filtr: 9000, stupnice: "mollPenta", pro: ["fakt", "kviz"],
      postupy: [[[0, "min"], [8, "maj"], [3, "maj"], [10, "maj"]], [[0, "min"], [5, "min"], [8, "maj"], [10, "maj"]]],
      hraj(s, bar, t, i) {
        if (s === 0) pad(t, i.akord.map(n => n + 12), i.beat * 4, { typ: "sawtooth", cutoff: 1800, vol: 0.03, attack: 0.3 });
        if (s % 2 === 0) bass(t, i.root + (s % 8 === 6 ? 12 : 0), i.beat * 0.45, { typ: "sawtooth", cutoff: 650 });
        if (s === 0 || s === 8 || (s === 6 && nahoda(0.3))) kick(t, 0.9, { decay: 0.28 });
        if (s === 4 || s === 12) snare(t, 0.6, { decay: 0.32, tone: 1500 });
        if (s % 2 === 0) hat(t, 0.07);
        lead(t, i.akord[s % i.akord.length] + 12, i.s16 * 0.9, { typ: "square", cutoff: 2600, vol: 0.035 });
        if (s % 4 === 2 && nahoda(0.22)) lead(t, melodie(i, 2) + 12, i.s16 * (3 + cele(5)), { typ: "sawtooth", cutoff: 2200, vol: 0.05, vibrato: true });
      } },

    chiptune: { nazev: "8-bit", emoji: "👾", popis: "Herní konzole, rychlé arpeggio", bpm: 150, swing: 0.5, filtr: 14000, stupnice: "durPenta", pro: ["kviz", "anone", "doplnit"],
      postupy: [[[0, "maj"], [7, "maj"], [9, "min"], [5, "maj"]], [[0, "maj"], [9, "min"], [5, "maj"], [7, "maj"]], [[5, "maj"], [7, "maj"], [0, "maj"], [9, "min"]]],
      hraj(s, bar, t, i) {
        lead(t, i.akord[s % i.akord.length] + 12, i.s16 * 0.8, { typ: "square", cutoff: 6000, vol: 0.04 });
        if (s % 2 === 0) bass(t, i.root + (s % 4 === 2 ? 7 : 0), i.s16 * 1.6, { typ: "triangle", cutoff: 2000, vol: 0.3 });
        if (s === 0 || s === 8 || s === 10) kick(t, 0.6, { decay: 0.12, pitch: 220 });
        if (s === 4 || s === 12) snare(t, 0.35, { decay: 0.09, tone: 3000 });
        if (s % 2 === 1) hat(t, 0.05);
        if (s % 2 === 0 && nahoda(0.45)) lead(t, melodie(i, 3) + 24, i.s16 * (1 + cele(3)), { typ: "square", cutoff: 8000, vol: 0.06, vibrato: true });
      } },

    funk: { nazev: "Funk", emoji: "🕺", popis: "Synkopovaná basa, clavinet", bpm: 104, swing: 0.56, filtr: 11000, stupnice: "dorsky", pro: ["fakt", "kviz", "doplnit"],
      postupy: [[[0, "min7"], [5, "dom7"], [0, "min7"], [5, "dom7"]], [[0, "min7"], [2, "min7"], [0, "min7"], [7, "dom7"]]],
      hraj(s, bar, t, i) {
        if (s === 0 || s === 7 || s === 10) kick(t, 0.9, { decay: 0.22 });
        if (s === 4 || s === 12) snare(t, 0.5, { decay: 0.14 });
        if ((s === 7 || s === 15) && nahoda(0.5)) snare(t, 0.15, { decay: 0.08 });
        hat(t, s % 2 === 0 ? 0.11 : 0.05);
        const vzor = { 0: 0, 3: 12, 6: 10, 8: 0, 11: 7, 14: 10 };
        if (vzor[s] !== undefined && (s === 0 || nahoda(0.85))) bass(t, i.root + vzor[s], i.s16 * 1.4, { typ: "sawtooth", cutoff: 900, env: true });
        if ((s === 2 || s === 6 || s === 9 || s === 13) && nahoda(0.6)) stab(t, i.akord, i.s16 * 1.1, { cutoff: 5000, vol: 0.04, hp: 400 });
        if (s % 2 === 1 && nahoda(0.2)) pluck(t, melodie(i, 2) + 12, i.s16 * 2, 0.11);
      } },

    dnb: { nazev: "Drum & bass", emoji: "⚡", popis: "Rychlé bicí, hluboký sub", bpm: 172, swing: 0.5, filtr: 12000, stupnice: "mollPenta", pro: ["kviz", "anone", "doplnit"],
      postupy: [[[0, "min7"], [8, "maj7"], [10, "maj7"], [7, "min7"]], [[0, "min9"], [5, "min7"], [8, "maj7"], [10, "maj7"]]],
      hraj(s, bar, t, i) {
        if (s === 0 || s === 10) kick(t, 0.95, { decay: 0.2, pitch: 170 });
        if (s === 4 || s === 12) snare(t, 0.6, { decay: 0.16, tone: 2200 });
        if ((s === 7 || s === 15) && nahoda(0.4)) snare(t, 0.15, { decay: 0.06 });
        if (s % 2 === 0 || bar % 4 === 3) hat(t, s % 4 === 2 ? 0.14 : 0.06);
        if (s === 0) bass(t, i.root - 12, i.beat * 2, { typ: "sine", vol: 0.5 });
        if (s === 8) bass(t, i.root - 12 + (nahoda(0.5) ? 0 : (nahoda(0.5) ? 10 : 7)), i.beat * 2, { typ: "sine", vol: 0.5 });
        if (s === 0 && bar % 2 === 0) pad(t, [i.root, i.root + 7], i.beat * 8, { typ: "sawtooth", cutoff: 420, vol: 0.06, attack: 0.2 });
        if (s === 0) pad(t, i.akord.map(n => n + 12), i.beat * 4, { typ: "triangle", cutoff: 2200, vol: 0.035, attack: 0.3 });
        if (s % 4 === 1 && nahoda(0.2)) pluck(t, melodie(i, 2) + 12, i.s16 * 4, 0.1);
      } },

    latin: { nazev: "Latino", emoji: "🌴", popis: "Dembow, marimba, tresillo", bpm: 96, swing: 0.5, filtr: 11000, stupnice: "mollPenta", pro: ["fakt", "anone"],
      postupy: [[[0, "min"], [8, "maj"], [10, "maj"], [0, "min"]], [[0, "min"], [5, "min"], [7, "maj"], [0, "min"]]],
      hraj(s, bar, t, i) {
        if (s % 4 === 0) kick(t, 0.9, { decay: 0.26 });
        if (s === 3 || s === 6 || s === 11 || s === 14) snare(t, 0.4, { decay: 0.1, tone: 2600 });
        if (s % 2 === 1) hat(t, 0.06);
        if (s === 0 || s === 3 || s === 6 || s === 8 || s === 11 || s === 14) bass(t, i.root + (s === 11 ? 7 : s === 6 ? 3 : 0), i.s16 * 2, { typ: "triangle", cutoff: 1200, vol: 0.4 });
        if (s === 0) pad(t, i.akord, i.beat * 4, { typ: "triangle", cutoff: 1500, vol: 0.04 });
        if (s % 2 === 0 && nahoda(0.4)) pluck(t, melodie(i, 2) + 12, i.s16 * 1.5, 0.14, true);
      } },

    trap: { nazev: "Trap", emoji: "🔥", popis: "808, hi-hat rolly, half-time", bpm: 140, swing: 0.5, filtr: 10000, stupnice: "mollPenta", pro: ["kviz", "anone", "doplnit"],
      postupy: [[[0, "min"], [8, "maj"], [5, "min"], [10, "maj"]], [[0, "min7"], [10, "maj"], [8, "maj7"], [7, "min"]]],
      hraj(s, bar, t, i) {
        if (s === 0 || s === 7 || (s === 10 && nahoda(0.6))) kick(t, 0.6, { decay: 0.2, pitch: 140 });
        if (s === 8) clap(t, 0.6);
        if (s % 2 === 0) hat(t, 0.1);
        if ((s === 14 || (s === 6 && nahoda(0.4)))) for (let k = 0; k < 4; k++) hat(t + k * i.s16 / 4, 0.09);
        if (s === 15 && nahoda(0.4)) hat(t, 0.14, true);
        if (s === 0) sub808(t, i.root - 12, i.beat * 1.7);
        if (s === 7) sub808(t, i.root - 12 + (nahoda(0.5) ? 7 : 10), i.beat * 1.2);
        if (s === 0) pad(t, i.akord.map(n => n + 12), i.beat * 4, { typ: "triangle", cutoff: 1600, vol: 0.045, attack: 0.4 });
        if (s % 4 === 2 && nahoda(0.3)) bell(t, melodie(i, 2) + 24, i.s16 * 4, 0.08);
      } }
  };
  const VIBY = Object.keys(STYLY).map(id => Object.assign({ id }, STYLY[id]));

  // ---- stav ----
  let ctx = null, master = null, komp = null, filtr = null, sum = null;
  let hraje = false, vibe = STYLY.lofi, vibeId = "lofi", volume = 0.7, auto = true;
  let step = 0, dalsiCas = 0, timer = null, root = 60, postup = null, cekajiciVibe = null, melodieN = 0;
  const posluchaci = [];
  const LOOKAHEAD = 0.14, TICK = 25;

  const midi = n => 440 * Math.pow(2, ((Number.isFinite(n) ? n : 60) - 69) / 12);
  const nahoda = p => Math.random() < p;
  const cele = n => Math.floor(Math.random() * n);

  function zajistiCtx() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    komp = ctx.createDynamicsCompressor(); komp.threshold.value = -16; komp.ratio.value = 4; komp.attack.value = 0.005; komp.release.value = 0.2;
    filtr = ctx.createBiquadFilter(); filtr.type = "lowpass"; filtr.frequency.value = vibe.filtr;
    master = ctx.createGain(); master.gain.value = volume;
    filtr.connect(komp); komp.connect(master); master.connect(ctx.destination);
  }
  let _noise = null;
  function noise() { if (_noise) return _noise; const b = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate); const d = b.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1; return (_noise = b); }
  function env(g, t, vol, attack, dur) { g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(Math.max(vol, 0.0002), t + attack); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); }

  // ---- nástroje ----
  function kick(t, vol, o) { o = o || {}; const osc = ctx.createOscillator(), g = ctx.createGain(); osc.frequency.setValueAtTime(o.pitch || 150, t); osc.frequency.exponentialRampToValueAtTime(40, t + 0.12); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + (o.decay || 0.3)); osc.connect(g); g.connect(filtr); osc.start(t); osc.stop(t + (o.decay || 0.3) + 0.05); }
  function snare(t, vol, o) { o = o || {}; const s = ctx.createBufferSource(); s.buffer = noise(); const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = o.tone || 1900; f.Q.value = 0.7; const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + (o.decay || 0.18)); s.connect(f); f.connect(g); g.connect(filtr); s.start(t); s.stop(t + (o.decay || 0.18) + 0.05); const osc = ctx.createOscillator(), g2 = ctx.createGain(); osc.frequency.setValueAtTime(190, t); osc.frequency.exponentialRampToValueAtTime(120, t + 0.08); g2.gain.setValueAtTime(vol * 0.5, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.1); osc.connect(g2); g2.connect(filtr); osc.start(t); osc.stop(t + 0.12); }
  function clap(t, vol) { for (let k = 0; k < 3; k++) { const s = ctx.createBufferSource(); s.buffer = noise(); const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1300; f.Q.value = 1.2; const g = ctx.createGain(); const tt = t + k * 0.011; g.gain.setValueAtTime(vol * (k === 2 ? 1 : 0.6), tt); g.gain.exponentialRampToValueAtTime(0.001, tt + (k === 2 ? 0.2 : 0.03)); s.connect(f); f.connect(g); g.connect(filtr); s.start(tt); s.stop(tt + 0.25); } }
  function hat(t, vol, open) { const s = ctx.createBufferSource(); s.buffer = noise(); const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 7500; const g = ctx.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + (open ? 0.22 : 0.045)); s.connect(f); f.connect(g); g.connect(filtr); s.start(t); s.stop(t + 0.3); }
  function bass(t, n, dur, o) { o = o || {}; const osc = ctx.createOscillator(); osc.type = o.typ || "sine"; osc.frequency.value = midi(n - 24); const f = ctx.createBiquadFilter(); f.type = "lowpass"; const c = o.cutoff || 400; f.frequency.setValueAtTime(o.env ? c * 2.5 : c, t); f.frequency.exponentialRampToValueAtTime(Math.max(120, c * 0.4), t + dur); const g = ctx.createGain(); env(g, t, o.vol || 0.32, 0.015, dur); osc.connect(f); f.connect(g); g.connect(filtr); osc.start(t); osc.stop(t + dur + 0.05); }
  function sub808(t, n, dur) { const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.setValueAtTime(midi(n - 24 + 12), t); osc.frequency.exponentialRampToValueAtTime(midi(n - 24), t + 0.07); const sh = ctx.createWaveShaper(); const k = new Float32Array(256); for (let i = 0; i < 256; i++) { const x = i / 128 - 1; k[i] = Math.tanh(x * 2.2); } sh.curve = k; const g = ctx.createGain(); env(g, t, 0.5, 0.01, dur); osc.connect(sh); sh.connect(g); g.connect(filtr); osc.start(t); osc.stop(t + dur + 0.05); }
  function pad(t, noty, dur, o) { o = o || {}; noty.forEach((n, idx) => [0, 6].forEach(det => { const osc = ctx.createOscillator(); osc.type = o.typ || "triangle"; osc.frequency.value = midi(n); osc.detune.value = det - 3 + (idx % 2) * 3; const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = o.cutoff || 1300; const g = ctx.createGain(); const v = o.vol || 0.06; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + (o.attack || 0.08)); g.gain.setValueAtTime(v, t + dur * 0.6); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); osc.connect(f); f.connect(g); g.connect(filtr); osc.start(t); osc.stop(t + dur + 0.05); })); }
  function stab(t, noty, dur, o) { o = o || {}; noty.forEach(n => { const osc = ctx.createOscillator(); osc.type = "sawtooth"; osc.frequency.value = midi(n + 12); const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.setValueAtTime(o.cutoff || 3000, t); f.frequency.exponentialRampToValueAtTime(600, t + dur); const g = ctx.createGain(); env(g, t, o.vol || 0.05, 0.005, dur); osc.connect(f); if (o.hp) { const h = ctx.createBiquadFilter(); h.type = "highpass"; h.frequency.value = o.hp; f.connect(h); h.connect(g); } else f.connect(g); g.connect(filtr); osc.start(t); osc.stop(t + dur + 0.05); }); }
  function pluck(t, n, dur, vol, marimba) { [[0, vol], [12, vol * 0.3], [marimba ? 24 : 19, vol * 0.08]].forEach(([oct, v]) => { const osc = ctx.createOscillator(); osc.type = "sine"; osc.frequency.value = midi(n + oct); const g = ctx.createGain(); env(g, t, v, 0.008, dur); osc.connect(g); g.connect(filtr); osc.start(t); osc.stop(t + dur + 0.05); }); }
  function bell(t, n, dur, vol) { [[0, vol], [19, vol * 0.4], [28, vol * 0.15]].forEach(([oct, v]) => { const osc = ctx.createOscillator(); osc.type = "triangle"; osc.frequency.value = midi(n + oct); const g = ctx.createGain(); env(g, t, v, 0.005, dur); osc.connect(g); g.connect(filtr); osc.start(t); osc.stop(t + dur + 0.05); }); }
  function lead(t, n, dur, o) { o = o || {}; const osc = ctx.createOscillator(); osc.type = o.typ || "square"; osc.frequency.value = midi(n); if (o.vibrato) { const lfo = ctx.createOscillator(), lg = ctx.createGain(); lfo.frequency.value = 6; lg.gain.value = 6; lfo.connect(lg); lg.connect(osc.detune); lfo.start(t + 0.08); lfo.stop(t + dur + 0.05); } const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = o.cutoff || 3000; const g = ctx.createGain(); env(g, t, o.vol || 0.04, 0.01, dur); osc.connect(f); f.connect(g); g.connect(filtr); osc.start(t); osc.stop(t + dur + 0.05); }
  function sweep(t, dur) { const s = ctx.createBufferSource(); s.buffer = noise(); s.loop = true; const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.Q.value = 2; f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(9000, t + dur); const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.12, t + dur * 0.9); g.gain.exponentialRampToValueAtTime(0.0001, t + dur); s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.05); }
  function pop(t) { const s = ctx.createBufferSource(); s.buffer = noise(); const g = ctx.createGain(); g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.012); s.connect(g); g.connect(master); s.start(t); s.stop(t + 0.02); }
  function startSum() { stopSum(); if (!vibe.sum) return; const s = ctx.createBufferSource(); s.buffer = noise(); s.loop = true; const f = ctx.createBiquadFilter(); f.type = vibe.sum.typ; f.frequency.value = vibe.sum.f; const g = ctx.createGain(); g.gain.value = vibe.sum.g; s.connect(f); f.connect(g); g.connect(master); s.start(); sum = { s }; }
  function stopSum() { if (sum) { try { sum.s.stop(); } catch (e) {} sum = null; } }

  // melodie: náhodná procházka po stupnici kolem aktuálního akordu
  function melodie(i, krok) {
    const st = ST[vibe.stupnice]; melodieN = Math.max(0, Math.min(st.length - 1, melodieN + cele(2 * krok + 1) - krok));
    return i.root + st[melodieN];
  }

  // ---- sekvencer ----
  function novyTakt(bar) {
    if (cekajiciVibe && cekajiciVibe !== vibeId) { aplikujVibe(cekajiciVibe); cekajiciVibe = null; }
    if (bar % postup.length === 0 && bar > 0 && nahoda(0.25)) postup = vibe.postupy[cele(vibe.postupy.length)];
    const [posun, typ] = postup[bar % postup.length];
    return AK[typ].map(x => root + posun + x);
  }
  function aplikujVibe(id) {
    vibe = STYLY[id]; vibeId = id;
    root = 55 + cele(10); // G3–E4: náhodná tónina pro každý nový styl / kartu
    postup = vibe.postupy[cele(vibe.postupy.length)]; melodieN = cele(4);
    if (filtr) filtr.frequency.setTargetAtTime(vibe.filtr, ctx.currentTime, 0.1);
    if (hraje) startSum();
    oznam();
  }
  let akordAkt = null;
  function smycka() {
    const beat = 60 / vibe.bpm, s16 = beat / 4;
    if (dalsiCas < ctx.currentTime - 0.25) { dalsiCas = ctx.currentTime + 0.05; step -= step % 16; }
    while (dalsiCas < ctx.currentTime + LOOKAHEAD) {
      const s = step % 16, bar = Math.floor(step / 16);
      if (s === 0) akordAkt = novyTakt(bar);
      try { vibe.hraj(s, bar, dalsiCas, { akord: akordAkt, root, beat, s16, bar }); } catch (e) {}
      const sw = s % 2 === 0 ? vibe.swing * 2 : (1 - vibe.swing) * 2;
      dalsiCas += (60 / vibe.bpm / 4) * sw; step++;
    }
  }

  function oznam() { posluchaci.forEach(f => { try { f(stav()); } catch (e) {} }); }
  function stav() { return { hraje, vibe: Object.assign({ id: vibeId }, vibe), volume, auto }; }

  function start(id) {
    zajistiCtx();
    if (id && STYLY[id]) aplikujVibe(id); else if (!postup) aplikujVibe(vibeId);
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    if (hraje) { oznam(); return; }
    hraje = true; step = 0; dalsiCas = ctx.currentTime + 0.05; startSum();
    timer = setInterval(smycka, TICK); oznam();
  }
  function stop() { if (!hraje) return; hraje = false; clearInterval(timer); timer = null; stopSum(); if (ctx && ctx.state === "running") ctx.suspend().catch(() => {}); oznam(); }
  function toggle() { hraje ? stop() : start(); }
  function setVibe(id) { if (!STYLY[id]) return; if (hraje) { cekajiciVibe = id; } else { zajistiCtx(); aplikujVibe(id); } oznam(); }
  function setVolume(v) { volume = Math.max(0, Math.min(1, v)); if (master) master.gain.value = volume; oznam(); }
  function setAuto(a) { auto = !!a; oznam(); }

  // Pro kartu daného typu vyber styl (jiný než aktuální) a přepni na začátku dalšího taktu.
  function proKartu(typ, vynutit) {
    if (!auto && !vynutit) return vibeId;
    const kandidati = VIBY.filter(v => v.id !== vibeId && (!typ || (v.pro || []).includes(typ)));
    const pool = kandidati.length ? kandidati : VIBY.filter(v => v.id !== vibeId);
    const v = pool[cele(pool.length)];
    if (hraje) { cekajiciVibe = v.id; } else { zajistiCtx(); aplikujVibe(v.id); }
    return v.id;
  }
  // Krátký zvukový efekt k odpovědi (jen když hudba hraje, ať neruší v tichu).
  function sting(druh) {
    if (!ctx || !hraje) return;
    const t = ctx.currentTime + 0.02, st = ST[vibe.stupnice];
    if (druh === "ok") [0, 2, 4].forEach((k, i) => pluck(t + i * 0.07, root + 12 + st[k], 0.35, 0.16));
    else if (druh === "ne") { const osc = ctx.createOscillator(); osc.type = "sawtooth"; osc.frequency.setValueAtTime(midi(root - 12), t); osc.frequency.exponentialRampToValueAtTime(midi(root - 19), t + 0.35); const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = 500; const g = ctx.createGain(); env(g, t, 0.18, 0.01, 0.4); osc.connect(f); f.connect(g); g.connect(master); osc.start(t); osc.stop(t + 0.45); }
    else if (druh === "levelup") [0, 2, 4, 5, 7].forEach((k, i) => bell(t + i * 0.09, root + 12 + st[k], 0.6, 0.12));
  }

  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) { if (hraje && ctx.state === "running") ctx.suspend().catch(() => {}); }
    else if (hraje && ctx.state === "suspended") { ctx.resume().catch(() => {}); dalsiCas = ctx.currentTime + 0.05; }
  });

  window.HUDBA = { VIBY, start, stop, toggle, setVibe, setVolume, setAuto, proKartu, sting, hraje: () => hraje, stav, onZmena: f => posluchaci.push(f) };
})();
