# Z ověřených profilů zemí (scratchpad/procurement/*.json) postaví kurz obsah/kurz-procurement.js
# a sdílená čistá data (procurement/_cista.json) pro PDF (one-pagery, e-book, checklisty).
import json, re, pathlib, sys
BASE = pathlib.Path(__file__).resolve().parent
P = pathlib.Path(sys.argv[2]) if len(sys.argv) > 2 else BASE / "data"  # ověřené profily zemí (mimo veřejné repo)
OUT_JS = pathlib.Path(sys.argv[1]) if len(sys.argv) > 1 else BASE / "verify/obsah/kurz-procurement.js"

# pořadí a seskupení (kód, vlajka); regiony jen pro e-book
REGIONY = [
    ("Rámec EU a společné základy", [("eu", "🇪🇺")]),
    ("Česko a sousedé", [("cz", "🇨🇿"), ("sk", "🇸🇰"), ("pl", "🇵🇱"), ("de", "🇩🇪"), ("at", "🇦🇹")]),
    ("Západní Evropa", [("fr", "🇫🇷"), ("nl", "🇳🇱"), ("be", "🇧🇪"), ("lu", "🇱🇺"), ("gb", "🇬🇧"), ("ie", "🇮🇪")]),
    ("Sever", [("dk", "🇩🇰"), ("se", "🇸🇪"), ("fi", "🇫🇮"), ("no", "🇳🇴"), ("is", "🇮🇸")]),
    ("Pobaltí", [("ee", "🇪🇪"), ("lv", "🇱🇻"), ("lt", "🇱🇹")]),
    ("Střední a jihovýchodní Evropa", [("hu", "🇭🇺"), ("si", "🇸🇮"), ("hr", "🇭🇷"), ("ro", "🇷🇴"), ("bg", "🇧🇬")]),
    ("Jižní Evropa a Turecko", [("it", "🇮🇹"), ("es", "🇪🇸"), ("pt", "🇵🇹"), ("gr", "🇬🇷"), ("cy", "🇨🇾"), ("mt", "🇲🇹"), ("tr", "🇹🇷")]),
    ("Západní Balkán", [("al", "🇦🇱"), ("me", "🇲🇪"), ("mk", "🇲🇰")]),
    ("Mimo EU", [("ch", "🇨🇭"), ("ua", "🇺🇦"), ("us", "🇺🇸")]),
]
# české tvary názvů zemí („Kdo v Německu nakupuje“)
V_ZEMI = {"cz": "v Česku", "sk": "na Slovensku", "pl": "v Polsku", "de": "v Německu", "at": "v Rakousku", "fr": "ve Francii", "nl": "v Nizozemsku",
          "be": "v Belgii", "lu": "v Lucembursku", "gb": "ve Spojeném království", "ie": "v Irsku", "dk": "v Dánsku", "se": "ve Švédsku", "fi": "ve Finsku",
          "no": "v Norsku", "is": "na Islandu", "ee": "v Estonsku", "lv": "v Lotyšsku", "lt": "v Litvě", "hu": "v Maďarsku", "si": "ve Slovinsku",
          "hr": "v Chorvatsku", "ro": "v Rumunsku", "bg": "v Bulharsku", "it": "v Itálii", "es": "ve Španělsku", "pt": "v Portugalsku", "gr": "v Řecku",
          "cy": "na Kypru", "mt": "na Maltě", "tr": "v Turecku", "al": "v Albánii", "me": "v Černé Hoře", "mk": "v Severní Makedonii", "ch": "ve Švýcarsku",
          "ua": "na Ukrajině", "us": "v USA", "eu": "na úrovni EU"}

ZKRATKY = ["např", "tzv", "resp", "tj", "mj", "č", "čl", "odst", "písm", "Sb", "mil", "mld", "tis", "Kč", "zák", "Nr", "Dz", "U", "Bd", "a.s", "s.r.o", "ust", "pozn", "příp", "vč", "max", "min", "cca", "St", "No", "Art", "Ing", "Mgr", "Dr", "Jr", "Inc", "Ltd", "Co", "BGBl", "Sl", "NN", "ca", "kap", "Nov", "Sept", "Oct", "Dec", "Jan", "Feb", "Mar", "Apr", "Jun", "Jul", "Aug"]
META = re.compile(r"\bjsem\b|\bjsme\b|neověřil|nepodařilo|nenašl|nenašel|\[DOPLNIT\]|nemám podklady|nešl[ao] (?:načíst|otevřít)|strojov|blokuj|nedostupn[ýá] pro|robots|nelze ověřit|neověřen|ověřit u |doporučuji|doporučujeme ověřit|zatím neověř", re.I)

def vety(t):
    t = re.sub(r"\s+", " ", (t or "").strip())
    if not t: return []
    kusy, akt = [], ""
    for cast in re.split(r"(?<=[.!?])\s+(?=[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ„(\"])", t):
        akt = (akt + " " + cast).strip() if akt else cast
        posl = re.search(r"(\S+)\.$", akt)
        if posl and (posl.group(1).split(".")[-1] in ZKRATKY or re.fullmatch(r"\d{1,2}", posl.group(1))):
            continue  # zkratka nebo datum: věta pokračuje
        kusy.append(akt); akt = ""
    if akt: kusy.append(akt)
    return kusy

def cisty(t):
    return " ".join(v for v in vety(t) if not META.search(v)).strip()

def kousky(t, maxd=520):
    out, akt = [], ""
    for v in vety(t):
        if akt and len(akt) + 1 + len(v) > maxd:
            out.append(akt); akt = v
        else:
            akt = (akt + " " + v).strip()
    if akt:
        if out and len(akt) < 160: out[-1] = out[-1] + " " + akt  # krátký zbytek nepatří na samostatnou kartu
        else: out.append(akt)
    return out

def sekce(d, k):
    v = d.get(k)
    if isinstance(v, dict): return v
    if isinstance(v, str): return {"text": v}
    return {}

def kratke(n, z=""):
    n = (z or n or "").strip()
    return n if len(n) <= 46 else n[:44].rstrip(" ,(") + "…"

def odkazy_z(seznam, maxn=3):
    out, videne = [], set()
    for x in seznam or []:
        u = (x.get("url") or "").strip()
        if not u.startswith("http") or u in videne: continue
        videne.add(u); out.append({"nazev": kratke(x.get("nazev", ""), x.get("zkratka", "")), "url": u})
        if len(out) >= maxn: break
    return out

KLIC = {
    "prumyslova_spoluprace": re.compile(r"offset|industrial|spoluprác|kompenz|participation|gegengesch|ICA\b|offsetow|endüstriyel|sanayi|cooperation", re.I),
    "bezpecnost": re.compile(r"security|bezpečn|utaj|classified|FSC|clearance|NSA|NBÚ|smlouv|dohod|treat|geheim|sicher|säkerhet|turvall|ABW|ANS|UCSe|NSM|ORNISS|DKSI|UVTP|UVNS", re.I),
    "inovace": re.compile(r"innovat|inova|DIANA|startup|hub|accelerat|akceler|challenge|DIU|AFWERX|DASA|UKDI|AID\b|Brave1|CIHBw", re.I),
    "registrace": re.compile(r"regist|NCAGE|\\bSAM\\b|supplier|dodavatel|e-?procure|portal|portál|platform", re.I),
}
def odkazy_klic(d, k, maxn=3):
    r = KLIC.get(k)
    if not r: return []
    return odkazy_z([z for z in d.get("zdroje", []) if r.search(z.get("nazev") or "")], maxn)

def nacti(kod):
    f = P / (kod + ".json")
    return json.load(open(f, encoding="utf-8")) if f.exists() else None

def prvni_instituce(d):
    for i in sekce(d, "kdo_nakupuje").get("instituce", []) or []:
        z = (i.get("zkratka") or "").strip()
        if len(re.findall(r"[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]", z)) >= 2 and len(z) <= 24: return z
        n = (i.get("nazev") or "").split("(")[0].split(":")[0].strip()
        if 3 <= len(n) <= 60 and not re.match(r"(?i)ministerstvo|ministry|minist", n): return n
    return None

def prvni_portal(d):
    for p in sekce(d, "kde_tendry").get("portaly", []) or []:
        n = p.get("nazev", "")
        if n and not re.search(r"\bTED\b|Tenders Electronic", n):
            n = n.split("(")[0].strip().rstrip(",:")
            return n if len(n) <= 50 else n[:48].rstrip() + "…"
    return None

KUPEC = {"cz": "Sekce vyzbrojování a akvizic", "pl": "Agencja Uzbrojenia", "de": "BAAINBw", "fr": "DGA (Direction générale de l'armement)", "nl": "COMMIT",
         "be": "DGMR", "gb": "DE&S", "dk": "FMI", "se": "FMV (Försvarets materielverk)", "no": "Forsvarsmateriell", "ee": "RKIK (ECDI)", "lv": "VALIC",
         "es": "DGAM (Dirección General de Armamento y Material)", "it": "Direzione Nazionale degli Armamenti", "tr": "SSB", "ch": "armasuisse",
         "ua": "Defence Procurement Agency", "ro": "DGArm", "at": "Armaments and Defence Technology Agency"}
PORTAL = {"cz": "NEN", "de": "e-Vergabe", "fr": "PLACE", "nl": "TenderNed", "be": "BOSA eProcurement", "gb": "Defence Sourcing Portal", "ie": "eTenders",
          "dk": "udbud.dk", "se": "e-Avrop", "fi": "Hilma", "no": "Doffin", "ee": "Riigihangete register", "lv": "EIS", "lt": "CVP IS", "si": "e-JN",
          "hr": "EOJN RH", "sk": "EPVO", "it": "Acquisti in Rete PA", "mt": "etenders.gov.mt", "mk": "e-nabavki", "us": "SAM.gov", "al": "APP (Agjencia e Prokurimit Publik)"}

data = {}
for _, zeme in REGIONY:
    for kod, vl in zeme:
        d = nacti(kod)
        if d: data[kod] = (d, vl)

STAV = "stav 11/2026"
temata, cista = [], {}

def fakt(id_, titulek, text, odkazy, zdroj=STAV):
    c = {"id": id_, "typ": "fakt", "titulek": titulek, "text": text, "zdroj": zdroj}
    if odkazy: c["odkazy"] = odkazy
    return c

SEKCE = [("kdo_nakupuje", "Kdo nakupuje", "instituce"), ("pravni_ramec", "Pravidla hry", "predpisy"), ("kde_tendry", "Kde jsou tendry", "portaly"),
         ("registrace", "Jak se zaregistrovat", None), ("prumyslova_spoluprace", "Offsety a průmyslová spolupráce", None),
         ("bezpecnost", "Bezpečnost a prověrky", None), ("inovace", "Vstup pro inovativní firmy", "programy")]

kody = list(data)
for idx, kod in enumerate(kody):
    d, vl = data[kod]
    zeme = d.get("zeme") or kod.upper()
    karty, cz = [], {"kod": kod, "zeme": zeme, "vlajka": vl, "clenstvi": d.get("clenstvi", ""), "sekce": {}, "tipy": [], "prirucky": [], "zdroje": []}
    for k, nazev, pole in SEKCE:
        s = sekce(d, k)
        text = cisty(s.get("text", ""))
        ods = odkazy_z(s.get(pole) or []) if pole else []
        if k == "registrace": ods = odkazy_z(sekce(d, "kde_tendry").get("portaly"))
        if not ods: ods = odkazy_klic(d, k)
        kroky = [cisty(x) for x in (s.get("kroky") or [])]; kroky = [x for x in kroky if x]
        cz["sekce"][k] = {"nazev": nazev, "text": text, "odkazy": ods, "kroky": kroky}
        if not text: continue
        dily = kousky(text)
        for i, dil in enumerate(dily):
            titul = f"{nazev} {V_ZEMI.get(kod, '')}".strip() if i == 0 else f"{nazev} {V_ZEMI.get(kod, '')} (pokračování)".strip()
            if k == "kdo_nakupuje" and i == 0: titul = f"Kdo {V_ZEMI.get(kod, '')} nakupuje" if kod != "eu" else "Kdo v EU nakupuje"
            karty.append(fakt(f"{k[:4]}{i+1}", titul, dil, ods))
        if k == "registrace" and len(kroky) >= 2:
            karty.append({"id": "l1", "typ": "lekce", "titulek": f"Registrace {V_ZEMI.get(kod, '')} krok za krokem", "kroky": [f"{i+1}. {x}" for i, x in enumerate(kroky)]})
    # USA: kontext a cesty pro zahraniční firmy
    if kod == "us":
        for i, dil in enumerate(kousky(cisty(d.get("kontext", "")))):
            karty.insert(i, fakt(f"kont{i+1}", "Jak funguje americký obranný trh" + (" (pokračování)" if i else ""), dil, []))
        for i, c in enumerate(d.get("cesty_pro_zahranicni") or []):
            t = cisty(c.get("text", ""))
            if t: karty.append(fakt(f"cest{i+1}", "Cesta pro českou firmu: " + c.get("nazev", ""), t, odkazy_z([{"nazev": c.get("nazev", ""), "url": c.get("url", "")}])))
        cz["cesty"] = [{"nazev": c.get("nazev", ""), "text": cisty(c.get("text", "")), "url": c.get("url", "")} for c in d.get("cesty_pro_zahranicni") or []]
        cz["kontext"] = cisty(d.get("kontext", ""))
    # EU: společná výbava a nástroje
    if kod == "eu":
        for i, it in enumerate((d.get("spolecne") or {}).get("polozky", [])):
            t = cisty(it.get("text", ""))
            if t: karty.append(fakt(f"spol{i+1}", it.get("tema", ""), t, odkazy_z(it.get("zdroje"))))
        cz["spolecne"] = [{"tema": it.get("tema", ""), "text": cisty(it.get("text", "")), "odkazy": odkazy_z(it.get("zdroje"))} for it in (d.get("spolecne") or {}).get("polozky", [])]
        cz["nastroje"] = {k: cisty(v) for k, v in (d.get("spolecne_nastroje_eu") or {}).items() if isinstance(v, str)}
        for i, (k, v) in enumerate(cz["nastroje"].items()):
            if v: karty.append(fakt(f"nast{i+1}", k.replace("_", " "), v, []))
    tipy = [cisty(t) for t in d.get("tipy_pro_cz_firmy") or []]; tipy = [t for t in tipy if t]
    cz["tipy"] = tipy
    if tipy: karty.append({"id": "l2", "typ": "lekce", "titulek": "Na co si dát pozor jako česká firma", "kroky": tipy})
    # kvízy: ručně vybrané jednoznačné názvy (každý musí být doslova v profilu země), distraktory z ostatních zemí
    ostatni = [x for x in kody if x not in (kod, "eu")]
    surovy = json.dumps(d, ensure_ascii=False)
    for typ, slovnik, otazka, vysv in (("k1", KUPEC, f"Kdo {V_ZEMI.get(kod, '')} nakupuje vojenský materiál?", "Ostatní možnosti jsou nákupčí z jiných evropských zemí."),
                                        ("k2", PORTAL, f"Kde {V_ZEMI.get(kod, '')} hledat obranné zakázky (kromě TED)?", "Ostatní možnosti jsou portály jiných zemí. Zakázky nad unijními prahy jsou navíc na TED (ted.europa.eu).")):
        sp = slovnik.get(kod)
        if not sp: continue
        assert sp.split(" (")[0] in surovy, (kod, sp)
        pool = [slovnik[o] for o in ostatni if slovnik.get(o) and slovnik[o] != sp]
        if len(pool) < 2: continue
        dis = [pool[(idx * 7 + 3) % len(pool)], pool[(idx * 11 + 5) % len(pool)]]
        if dis[0] == dis[1]: dis[1] = pool[(idx * 11 + 6) % len(pool)]
        pos = (idx + (typ == "k2")) % 3; mo = dis[:]; mo.insert(pos, sp)
        karty.append({"id": typ, "typ": "kviz", "otazka": otazka, "moznosti": mo, "spravne": pos, "vysvetleni": f"{sp}. {vysv}"})
    cz["prirucky"] = [p for p in d.get("prirucky") or [] if (p.get("url") or "").startswith("http")]
    cz["zdroje"] = [z for z in d.get("zdroje") or [] if (z.get("url") or "").startswith("http")]
    cista[kod] = cz
    if karty:
        temata.append({"id": kod, "nazev": f"{vl} {zeme}" if kod != "eu" else "🇪🇺 EU: společný rámec a základní výbava", "karty": karty})

kurz = {"id": "procurement", "nazev": "Obranné zakázky v Evropě a USA", "emoji": "🏛️", "barva": "#6d28d9", "mimoMix": True,
        "popis": "Kdo nakupuje, kde jsou tendry, jak se registrovat a na co si dát pozor: 37 zemí a EU. Z oficiálních zdrojů, stav 11/2026. Projdi zemi přes Témata.",
        "temata": temata}
hlava = ("// DEFLEARN HUB – kurz „Obranné zakázky v Evropě a USA“ (Defence Hub CzechInvest, 11/2026).\n"
         "// Generováno z ověřených profilů zemí (rámec DH „7 otázek pro vstup na trh“), jen primární a oficiální zdroje.\n"
         "// Neupravovat ručně: změny dělat v profilech a přegenerovat (build_procurement.py).\n")
OUT_JS.write_text(hlava + "(window.JEZTOK_KURZY = window.JEZTOK_KURZY || []).push(" + json.dumps(kurz, ensure_ascii=False, indent=1) + ");\n", encoding="utf-8")
json.dump({"regiony": [[r, [k for k, _ in z if k in cista]] for r, z in REGIONY], "zeme": cista}, open(P / "_cista.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
n = sum(len(t["karty"]) for t in temata)
print("témat", len(temata), "karet", n, "kvízů", sum(1 for t in temata for c in t["karty"] if c["typ"] == "kviz"))
