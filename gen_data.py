"""Sklada src/data/clinicData.js dla gabinetu ByrskaDentic w Szczecinie."""
import json, io, os, re, glob

L = [l.rstrip('\n') for l in io.open('tresc.txt', encoding='utf-8')]
def line(n):
    return L[n - 1].strip()

def const(name, value):
    return "\nexport const %s = %s;\n" % (name, json.dumps(value, ensure_ascii=False, indent=2))

def sekcja(nazwa):
    """Zwraca linie danej podstrony (bez naglowka ===== )."""
    start = next(i for i, l in enumerate(L) if l.strip().startswith('===== %s ' % nazwa))
    end = next((i for i in range(start + 1, len(L)) if L[i].strip().startswith('=====')), len(L))
    return [l.strip() for l in L[start + 1:end] if l.strip()]

clinic = {
    "nazwa": "BYRSKA-DENTIC",
    "lekarz": line(94),
    "miasto": "Szczecin",
    "osiedle": line(95),
    "ulica": line(96),
    "kod": line(97),
    "email": line(103),
    "emailLabel": line(102),
    "tytulKontakt": line(93),
    "copyright": line(9),
    "cookies": line(3),
    "cookiesZamknij": line(4),
    "stopkaDomena": line(60),
}

hero = {
    "tytul": line(5),
    "akapity": [line(6), line(7), line(8)],
}

godziny = [
    {"dni": line(98), "zakres": line(99)},
    {"dni": line(100), "zakres": line(101)},
]

# --- o nas ---
on = sekcja('o_nas')
oNas = {
    "lekarz": on[0],
    "tytul": on[1],
    "wstep": on[2],
    "cechy": [
        {"tytul": on[3], "opis": on[4]},
        {"tytul": on[5], "opis": on[6]},
        {"tytul": on[7], "opis": on[8] + " " + on[9]},
    ],
    "lokalizacja": [on[10], on[11]],
    "kavo": {"przed": on[12], "marka": on[13], "po": on[14]},
    "wyrozniaTytul": on[15],
    "wartosci": [
        {"tytul": on[16], "opis": on[17]},
        {"tytul": on[18], "opis": on[19]},
        {"tytul": on[20], "opis": on[21]},
        {"tytul": on[22], "opis": on[23]},
    ],
    "omnieTytul": on[24],
    "omnie": [on[25], on[26]],
    "podpis": on[27] + " " + on[28],
}

# --- uslugi: kazda podstrona ma na poczatku 3 linie menu bocznego, potem tresc ---
USLUGI = [
    ("stomatologia_zachowawcza", "Stomatologia zachowawcza"),
    ("stomatologia_estetyczna", "Stomatologia estetyczna"),
    ("endodoncja", "Endodoncja"),
    ("stomatologia_dziecieca", "Stomatologia dziecięca"),
    ("chirurgia_stomatologiczna", "Chirurgia stomatologiczna"),
    ("profilaktyka", "Profilaktyka"),
    ("protetyka", "Protetyka"),
    ("radiowizjografia", "Radiowizjografia"),
]
uslugi = []
for klucz, tytul in USLUGI:
    linie = [l for l in sekcja(klucz)
             if l not in ("Chirurgia Stomatologiczna", "Stomatologia Estetyczna", "Radiowizjografia (RTG)")]
    uslugi.append({"klucz": klucz, "tytul": tytul, "linie": linie})

# --- sprzet ---
SPRZET = [
    ("unity_stomatologiczne_kavo", "Unity stomatologiczne KaVo"),
    ("rtg_radiowizjografia", "RTG / radiowizjografia"),
    ("kamera_wewnatrzustna_", "Kamera wewnątrzustna"),
    ("endometr_", "Endometr ENDY6000"),
    ("the_wand_plus_", "The Wand Plus"),
    ("oriseduco", "OrisEduco"),
]
sprzet = []
for klucz, tytul in SPRZET:
    linie = [l for l in sekcja(klucz) if l != "Kamera Wewnątrzustna"]
    sprzet.append({"klucz": klucz, "tytul": tytul, "linie": linie})

# --- cennik: naglowki grup nie maja ceny, pozycje koncza sie kwota ---
cen = sekcja('cennik')
cen = [l for l in cen if l not in ("Cennik", clinic["stopkaDomena"])]
kwota = re.compile(r'(\d[\d\s-]*\s*zł)$')
cennik = []
grupa = {"tytul": "Cennik", "wiersze": [], "uwagi": []}
cennik.append(grupa)
i = 0
while i < len(cen):
    t = cen[i]
    m = kwota.search(t)
    if m:
        grupa["wiersze"].append({"nazwa": t[:m.start()].strip(), "cena": m.group(1).strip()})
        i += 1; continue
    # nazwa w jednej linii, cena w nastepnej
    if i + 1 < len(cen) and kwota.fullmatch(cen[i + 1]):
        grupa["wiersze"].append({"nazwa": t, "cena": cen[i + 1]})
        i += 2; continue
    # Naglowkiem grupy jest tylko linia, po ktorej NAPRAWDE zaczynaja sie ceny.
    # Reszta (dopiski "Cena dodatkowo zawiera :", pozycje z myslnikiem, hasla
    # promocyjne) to uwagi doklejane do biezacej grupy.
    nastepna_z_cena = (i + 1 < len(cen) and (kwota.search(cen[i + 1]) or
                       (i + 2 < len(cen) and kwota.fullmatch(cen[i + 2]))))
    if nastepna_z_cena and not t.startswith('-') and not t.endswith(':'):
        grupa = {"tytul": t, "wiersze": [], "uwagi": []}
        cennik.append(grupa)
    else:
        grupa["uwagi"].append(t)
    i += 1
cennik = [g for g in cennik if g["wiersze"] or g["uwagi"]]

menuBoczne = {
    "uslugi": ["Chirurgia Stomatologiczna", "Stomatologia Estetyczna", "Radiowizjografia (RTG)"],
    "sprzet": ["Kamera Wewnątrzustna"],
}

nav = [
    {"label": "Start", "href": "#hero"},
    {"label": "O nas", "href": "#o-nas"},
    {"label": "Usługi", "href": "#uslugi"},
    {"label": "Sprzęt", "href": "#sprzet"},
    {"label": "Galeria", "href": "#galeria"},
    {"label": "Cennik", "href": "#cennik"},
    {"label": "Kontakt", "href": "#kontakt"},
]

out = io.open('src/data/clinicData.js', 'w', encoding='utf-8')
out.write("// Cala tresc przepisana 1:1 ze scrape'u https://www.byrskadentic.pl (i podstron)\n")
out.write(const('clinic', clinic))
out.write(const('nav', nav))
out.write(const('hero', hero))
out.write(const('godziny', godziny))
out.write(const('oNas', oNas))
out.write(const('menuBoczne', menuBoczne))
out.write(const('uslugi', uslugi))
out.write(const('sprzet', sprzet))
out.write(const('cennik', cennik))
out.close()

print('clinicData.js:', os.path.getsize('src/data/clinicData.js'), 'B')
print('uslug:', len(uslugi), '| sprzetu:', len(sprzet),
      '| grup cennika:', len(cennik), '| pozycji:', sum(len(g['wiersze']) for g in cennik),
      '| zdjec:', len(glob.glob('src/assets/img/gal-*.jpg')))
