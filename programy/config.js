// DefLearn Hub · Programy – varianta appky pro onboarding konzultanta EU a NATO programů.
// Stejná aplikace, jen jiný výběr obsahu a oddělené úložiště postupu.
window.JEZTOK_CONFIG = {
  backendUrl: "",
  prefix: "dhprog_",
  nazev: "Defence Hub · Programy",
  logoPata: ["img/logo-dh-ci-white.png"],
  zakladCesty: "../",
  // barvy kurzů v paletě Defence Hubu (blue / steel)
  barvyKurzu: { programy: "#0058A8", slovnicek: "#709870" },
  filtrKurzu: {
    defence: false,
    anglictina: false,
    programy: { temata: ["dh", "nato", "eic", "granty", "staty", "vyber"], bez: ["vyber:k2"] },
    slovnicek: true
  }
};
