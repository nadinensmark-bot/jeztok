// DefLearn Hub · Startupy – varianta appky pro firmy z databáze Defence Hubu.
// Stejná aplikace, jiný výběr obsahu, oddělené úložiště postupu. Registrace je otevřená jen e-mailům
// ze seznamu na serveru (REGISTRACE_POVOLENE), kurzy podle KURZY_UZIVATELU ("*" → startupy + slovnicek).
window.JEZTOK_CONFIG = {
  backendUrl: "https://jeztok-backend.onrender.com",
  prefix: "dhstart_",
  nazev: "Defence Hub · Startupy",
  logoPata: ["img/logo-dh-ci-white.png"],
  zakladCesty: "../",
  barvyKurzu: { startupy: "#0058A8", eu: "#1d4ed8", nato: "#002860", slovnicek: "#709870" },
  filtrKurzu: { defence: false, anglictina: false, programy: false, startupy: true, eu: true, nato: true, procurement: true, slovnicek: true },
  // bez importu JSON a generování z poznámek v záložce Kurzy (startupy jen vybírají z připravených kurzů)
  bezVlastnichKurzu: true,
  // pole „Pozvánkový kód“ v registraci (server: REGISTRACE_KODY)
  registraceKod: true,
  // bez tlačítka Sdílet na kartách (méně prvků na obrazovce)
  bezSdileni: true,
  // texty zámku pro nepřihlášené: startupy se registrují samy
  textZamceno: "Obsah je pro firmy z databáze Defence Hubu. Zaregistruj se firemním e-mailem, nebo se přihlas.",
  tlacitkoZamceno: "Přihlásit se / registrovat"
};
