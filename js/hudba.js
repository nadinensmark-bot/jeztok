// =====================================================================
// DEFLEARN HUB – hudba. Procedurální lo-fi generátor na Web Audio API.
// Žádné soubory, žádná autorská práva, žádné stahování – hraje offline.
// API: HUDBA.start(vibeId) / stop() / toggle() / setVibe(id) /
//      setVolume(0..1) / hraje() / VIBY / onZmena(fn)
// =====================================================================
(function () {
  "use strict";

  const VIBY = [
    { id: "lofi",  nazev: "Lo-fi klid",   emoji: "☕", bpm: 76,  swing: 0.6,  popis: "Vinyl, klavír, pomalé bicí" },
    { id: "focus", nazev: "Soustředění", emoji: "🌧️", bpm: 68,  swing: 0.55, popis: "Jemné plochy, déšť, skoro bez bicích" },
    { id: "hype",  nazev: "Nakopnout",   emoji: "⚡", bpm: 112, swing: 0.52, popis: "Rychlejší beat, jasnější akordy" }
  ];

  // Akordové postupy (MIDI čísla). Každý akord = 1 takt.
  const POSTUPY = {
    lofi:  [[62,65,69,72],[67,71,74,77],[60,64,67,71],[57,60,64,67]],      // Dm7 G7 Cmaj7 Am7
    focus: [[57,60,64,67],[53,57,60,64],[60,64,67,71],[55,59,62,65]],      // Am7 Fmaj7 Cmaj7 G7(ish)
    hype:  [[65,69,72,76],[67,71,74,77],[64,67,71,74],[57,60,64,67]]       // Fmaj7 G7 Em7 Am7
  };
  const PENTA = [60,62,64,67,69,72,74,76,79,81]; // C dur pentatonika pro melodii

  let ctx = null, master = null, komp = null, lofiFilter = null, crackle = null;
  let hraje = false, vibe = VIBY[0], volume = 0.7;
  let step = 0, dalsiCas = 0, timer = null;
  const posluchaci = [];
  const LOOKAHEAD = 0.12, TICK = 25;

  function midi(n) { return 440 * Math.pow(2, (n - 69) / 12); }

  function zajistiCtx() {
    if (ctx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    komp = ctx.createDynamicsCompressor();
    komp.threshold.value = -18; komp.ratio.value = 4; komp.attack.value = 0.01; komp.release.value = 0.2;
    lofiFilter = ctx.createBiquadFilter(); lofiFilter.type = "lowpass"; lofiFilter.frequency.value = 3800;
    master = ctx.createGain(); master.gain.value = volume;
    lofiFilter.connect(komp); komp.connect(master); master.connect(ctx.destination);
  }

  function noiseBuffer(sek) {
    const b = ctx.createBuffer(1, Math.floor(ctx.sampleRate * sek), ctx.sampleRate);
    const d = b.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    return b;
  }
  let _noise = null;
  function noise() { if (!_noise) _noise = noiseBuffer(2); return _noise; }

  // ---- nástroje ----
  function kick(t, sila) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.14);
    g.gain.setValueAtTime(sila, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.32);
    o.connect(g); g.connect(lofiFilter); o.start(t); o.stop(t + 0.35);
  }
  function snare(t, sila) {
    const s = ctx.createBufferSource(); s.buffer = noise();
    const f = ctx.createBiquadFilter(); f.type = "bandpass"; f.frequency.value = 1900; f.Q.value = 0.8;
    const g = ctx.createGain(); g.gain.setValueAtTime(sila, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    s.connect(f); f.connect(g); g.connect(lofiFilter); s.start(t); s.stop(t + 0.2);
    const o = ctx.createOscillator(), g2 = ctx.createGain();
    o.frequency.setValueAtTime(190, t); o.frequency.exponentialRampToValueAtTime(120, t + 0.08);
    g2.gain.setValueAtTime(sila * 0.6, t); g2.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    o.connect(g2); g2.connect(lofiFilter); o.start(t); o.stop(t + 0.12);
  }
  function hat(t, sila, dlouhy) {
    const s = ctx.createBufferSource(); s.buffer = noise();
    const f = ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 7000;
    const g = ctx.createGain(); g.gain.setValueAtTime(sila, t); g.gain.exponentialRampToValueAtTime(0.001, t + (dlouhy ? 0.18 : 0.05));
    s.connect(f); f.connect(g); g.connect(lofiFilter); s.start(t); s.stop(t + 0.2);
  }
  function bass(t, n, delka, saw) {
    const o = ctx.createOscillator(); o.type = saw ? "sawtooth" : "sine"; o.frequency.value = midi(n - 24);
    const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.setValueAtTime(saw ? 900 : 400, t); f.frequency.exponentialRampToValueAtTime(200, t + delka);
    const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.32, t + 0.02); g.gain.exponentialRampToValueAtTime(0.001, t + delka);
    o.connect(f); f.connect(g); g.connect(lofiFilter); o.start(t); o.stop(t + delka + 0.05);
  }
  function akord(t, noty, delka, jasny) {
    noty.forEach((n, i) => {
      [0, 5].forEach(det => {
        const o = ctx.createOscillator(); o.type = jasny ? "sawtooth" : "triangle"; o.frequency.value = midi(n); o.detune.value = det - 2 + (i % 2) * 3;
        const f = ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = jasny ? 2200 : 1300;
        const g = ctx.createGain(); const v = (jasny ? 0.045 : 0.07);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.08); g.gain.setValueAtTime(v, t + delka * 0.6); g.gain.exponentialRampToValueAtTime(0.001, t + delka);
        o.connect(f); f.connect(g); g.connect(lofiFilter); o.start(t); o.stop(t + delka + 0.05);
      });
    });
  }
  function klavir(t, n, delka) { // "e-piano" melodie: sinus + oktáva, rychlý decay
    [[0, 0.16], [12, 0.05]].forEach(([oct, v]) => {
      const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = midi(n + oct);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.01); g.gain.exponentialRampToValueAtTime(0.001, t + delka);
      o.connect(g); g.connect(lofiFilter); o.start(t); o.stop(t + delka + 0.05);
    });
  }
  function startCrackle() {
    if (crackle) return;
    const s = ctx.createBufferSource(); s.buffer = noise(); s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = vibe.id === "focus" ? "lowpass" : "highpass"; f.frequency.value = vibe.id === "focus" ? 1200 : 4500;
    const g = ctx.createGain(); g.gain.value = vibe.id === "focus" ? 0.035 : 0.012;
    s.connect(f); f.connect(g); g.connect(master); s.start();
    crackle = { s, g, f };
  }
  function stopCrackle() { if (crackle) { try { crackle.s.stop(); } catch (e) {} crackle = null; } }
  function pop(t) { // náhodné lupnutí vinylu
    const s = ctx.createBufferSource(); s.buffer = noise();
    const g = ctx.createGain(); g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.012);
    s.connect(g); g.connect(master); s.start(t); s.stop(t + 0.02);
  }

  // ---- sekvencer (16 kroků = 1 takt, 4 takty = 1 kolo) ----
  let melodieN = 67;
  function naplanuj(krok, t) {
    const v = vibe.id, krokVTaktu = krok % 16, takt = Math.floor(krok / 16) % 4;
    const beat = 60 / vibe.bpm, sestnactina = beat / 4;
    const noty = POSTUPY[v][takt];

    if (krokVTaktu === 0) { akord(t, noty, beat * 4, v === "hype"); }
    if (v === "focus") {
      if (krokVTaktu === 0 || krokVTaktu === 10) kick(t, 0.5);
      if (krokVTaktu === 8) hat(t, 0.08, true);
      if (krokVTaktu === 0) bass(t, noty[0], beat * 3.5, false);
    } else if (v === "lofi") {
      if (krokVTaktu === 0 || krokVTaktu === 10) kick(t, 0.8);
      if (krokVTaktu === 7 && Math.random() < 0.4) kick(t, 0.5);
      if (krokVTaktu === 4 || krokVTaktu === 12) snare(t, 0.45);
      if (krokVTaktu % 2 === 0) hat(t, krokVTaktu % 4 === 0 ? 0.14 : 0.08, false);
      if (krokVTaktu === 0) bass(t, noty[0], beat * 1.6, false);
      if (krokVTaktu === 8) bass(t, noty[0] + (Math.random() < 0.5 ? 0 : 7), beat * 1.6, false);
      if (krokVTaktu === 14 && Math.random() < 0.5) bass(t, noty[0] - 2, beat * 0.5, false);
    } else { // hype
      if (krokVTaktu === 0 || krokVTaktu === 6 || krokVTaktu === 10) kick(t, 0.9);
      if (krokVTaktu === 4 || krokVTaktu === 12) snare(t, 0.55);
      hat(t, krokVTaktu % 4 === 0 ? 0.16 : 0.07, krokVTaktu === 14);
      if (krokVTaktu % 4 === 0) bass(t, noty[0], beat * 0.9, true);
      if (krokVTaktu === 14) bass(t, noty[0] + 7, beat * 0.4, true);
    }

    // melodie: náhodná procházka po pentatonice, řidší u focus
    const sance = v === "focus" ? 0.12 : v === "hype" ? 0.3 : 0.22;
    if (krokVTaktu % 2 === 0 && Math.random() < sance) {
      const idx = Math.max(0, Math.min(PENTA.length - 1, PENTA.indexOf(melodieN) + (Math.floor(Math.random() * 5) - 2)));
      melodieN = PENTA[idx];
      klavir(t, melodieN, sestnactina * (2 + Math.floor(Math.random() * 4)));
    }
    if (v !== "focus" && Math.random() < 0.06) pop(t + Math.random() * sestnactina);
  }

  function smycka() {
    const beat = 60 / vibe.bpm, s16 = beat / 4;
    while (dalsiCas < ctx.currentTime + LOOKAHEAD) {
      naplanuj(step, dalsiCas);
      // swing: liché šestnáctiny se zpozdí
      const sw = step % 2 === 0 ? vibe.swing * 2 : (1 - vibe.swing) * 2;
      dalsiCas += s16 * sw;
      step++;
    }
  }

  function oznam() { posluchaci.forEach(f => { try { f(stav()); } catch (e) {} }); }
  function stav() { return { hraje, vibe, volume }; }

  async function start(vibeId) {
    zajistiCtx();
    if (vibeId) vibe = VIBY.find(v => v.id === vibeId) || vibe;
    if (ctx.state === "suspended") ctx.resume().catch(() => {}); // neblokovat: v některých prohlížečích resume čeká
    if (hraje) { oznam(); return; }
    hraje = true; step = 0; dalsiCas = ctx.currentTime + 0.05;
    startCrackle();
    timer = setInterval(smycka, TICK);
    oznam();
  }
  function stop() {
    if (!hraje) return;
    hraje = false; clearInterval(timer); timer = null; stopCrackle();
    if (ctx && ctx.state === "running") ctx.suspend().catch(() => {});
    oznam();
  }
  function toggle() { hraje ? stop() : start(); }
  function setVibe(id) {
    const v = VIBY.find(x => x.id === id); if (!v) return;
    vibe = v; step = 0;
    if (hraje) { stopCrackle(); startCrackle(); dalsiCas = ctx.currentTime + 0.05; }
    oznam();
  }
  function setVolume(v) { volume = Math.max(0, Math.min(1, v)); if (master) master.gain.value = volume; oznam(); }

  // iOS/Android: po návratu do aplikace kontext obnovit
  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) { if (hraje && ctx.state === "running") ctx.suspend().catch(() => {}); }
    else if (hraje && ctx.state === "suspended") { ctx.resume().catch(() => {}); dalsiCas = ctx.currentTime + 0.05; }
  });

  window.HUDBA = { VIBY, start, stop, toggle, setVibe, setVolume, hraje: () => hraje, stav, onZmena: f => posluchaci.push(f) };
})();
