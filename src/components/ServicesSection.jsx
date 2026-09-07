import React, { useState, useRef } from "react";
import {
  Stethoscope, Sparkles, Microscope, Baby, Scissors, ShieldCheck, Layers, ScanLine,
  ChevronDown, Cpu, Check,
} from "lucide-react";
import { MaskedHeading } from "./Reveal";
import { uslugi, sprzet, menuBoczne } from "../data/clinicData";
import sprzetBg from "../assets/img/gal-11.jpg";
import leczenieBg from "../assets/img/gal-04.jpg";

import sprzetKavo from "../assets/img/sprzet/sprzet-kavo.jpg";
import sprzetRtg from "../assets/img/sprzet/sprzet-rtg.jpg";
import sprzetKamera from "../assets/img/sprzet/sprzet-kamera.jpg";
import sprzetEndometr from "../assets/img/sprzet/sprzet-endometr.jpg";
import sprzetWand from "../assets/img/sprzet/sprzet-wand.jpg";
import sprzetOris from "../assets/img/sprzet/sprzet-oris.jpg";

const sprzetZdjecia = {
  unity_stomatologiczne_kavo: {
    src: sprzetKavo,
    alt: "Unity stomatologiczne KaVo ESTETICA Comfort 1065 w gabinecie ByrskaDentic",
    nazwa: "KaVo ESTETICA Comfort 1065",
    opisKrotki: "Niemiecka precyzja, wygoda i higiena",
    producent: "KaVo Dental (Niemcy)",
  },
  unity: {
    src: sprzetKavo,
    alt: "Unity stomatologiczne KaVo ESTETICA Comfort 1065 w gabinecie ByrskaDentic",
    nazwa: "KaVo ESTETICA Comfort 1065",
    opisKrotki: "Niemiecka precyzja, wygoda i higiena",
    producent: "KaVo Dental (Niemcy)",
  },
  rtg_radiowizjografia: {
    src: sprzetRtg,
    alt: "Aparat RTG Expert DC i radiowizjografia Gendex",
    nazwa: "Gendex Expert DC & Visualix eHD",
    opisKrotki: "Radiowizjografia o dawce zredukowanej do 90%",
    producent: "Gendex Dental Systems",
  },
  rtg: {
    src: sprzetRtg,
    alt: "Aparat RTG Expert DC i radiowizjografia Gendex",
    nazwa: "Gendex Expert DC & Visualix eHD",
    opisKrotki: "Radiowizjografia o dawce zredukowanej do 90%",
    producent: "Gendex Dental Systems",
  },
  kamera_wewnatrzustna_: {
    src: sprzetKamera,
    alt: "Kamera wewnątrzustna Gendex GXC-300",
    nazwa: "Kamera Gendex GXC-300",
    opisKrotki: "Wysoka rozdzielczość i bieżący podgląd na ekranie",
    producent: "Gendex Dental Systems",
  },
  kamera_wewnatrzustna: {
    src: sprzetKamera,
    alt: "Kamera wewnątrzustna Gendex GXC-300",
    nazwa: "Kamera Gendex GXC-300",
    opisKrotki: "Wysoka rozdzielczość i bieżący podgląd na ekranie",
    producent: "Gendex Dental Systems",
  },
  endometr_: {
    src: sprzetEndometr,
    alt: "Endometr ENDY6000 firmy IONYX",
    nazwa: "Endometr ENDY6000",
    opisKrotki: "Precyzyjny elektroniczny pomiar kanału korzeniowego",
    producent: "IONYX",
  },
  endometr: {
    src: sprzetEndometr,
    alt: "Endometr ENDY6000 firmy IONYX",
    nazwa: "Endometr ENDY6000",
    opisKrotki: "Precyzyjny elektroniczny pomiar kanału korzeniowego",
    producent: "IONYX",
  },
  the_wand_plus_: {
    src: sprzetWand,
    alt: "System znieczulenia komputerowego The Wand Plus",
    nazwa: "The Wand Plus",
    opisKrotki: "Komputerowo sterowane bezbolesne znieczulenie",
    producent: "Milestone Scientific",
  },
  the_wand_plus: {
    src: sprzetWand,
    alt: "System znieczulenia komputerowego The Wand Plus",
    nazwa: "The Wand Plus",
    opisKrotki: "Komputerowo sterowane bezbolesne znieczulenie",
    producent: "Milestone Scientific",
  },
  oriseduco: {
    src: sprzetOris,
    alt: "Multimedialny program edukacyjny OrisEduco",
    nazwa: "System OrisEduco",
    opisKrotki: "Interaktywna edukacja i wizualizacja leczenia dla Pacjenta",
    producent: "OrisLine Group",
  },
};

const ikony = [Stethoscope, Sparkles, Microscope, Baby, Scissors, ShieldCheck, Layers, ScanLine];

function Akordeon({ pozycje, ikonaDomyslna: Domyslna, ikony: lista, zdjeciaMap }) {
  const [openIndex, setOpenIndex] = useState(0);
  const itemRefs = useRef([]);

  const toggle = (idx) => {
    const willOpen = openIndex !== idx;
    setOpenIndex(willOpen ? idx : null);

    if (willOpen) {
      // Wycentrowanie / zakotwiczenie ekranu na nagłówku:
      // harmonijka rozwija się w dół, a ekran pozostaje stabilnie przy jej nagłówku
      requestAnimationFrame(() => {
        const el = itemRefs.current[idx];
        if (el) {
          const navbarHeight = 84;
          const rect = el.getBoundingClientRect();
          const targetY = window.pageYOffset + rect.top - navbarHeight;

          if (window.__lenis) {
            window.__lenis.scrollTo(targetY, { duration: 0.45 });
          } else {
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
        }
      });
    }
  };

  return (
    <div className="space-y-3.5">
      {pozycje.map((p, idx) => {
        const Ikona = (lista && lista[idx]) || Domyslna;
        const isOpen = openIndex === idx;
        const foto = zdjeciaMap && (zdjeciaMap[p.klucz] || zdjeciaMap[p.klucz?.replace(/_+$/, "")]);
        return (
          <div
            key={p.klucz}
            ref={(el) => (itemRefs.current[idx] = el)}
            className={
              "rounded-3xl border transition-all duration-300 overflow-hidden bg-white " +
              (isOpen
                ? "border-[#842126] shadow-lg ring-1 ring-[#842126]/20"
                : "border-[#221316]/[0.12] shadow-sm hover:border-[#842126]/50")
            }
          >
            <button
              data-cursor-hover
              onClick={() => toggle(idx)}
              aria-expanded={isOpen}
              className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
                <div
                  className={
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors " +
                    (isOpen ? "bg-[#221316] text-[#E08D93]" : "bg-[#EDE4E6] text-[#842126]")
                  }
                >
                  <Ikona className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#842126]">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif font-bold text-base sm:text-xl text-[#221316] mt-0.5 leading-snug pb-0.5">
                    {p.tytul}
                  </h3>
                </div>
              </div>
              <div
                className={
                  "w-8 h-8 rounded-full flex items-center justify-center border shrink-0 transition-transform duration-350 " +
                  (isOpen
                    ? "bg-[#221316] text-[#FAF8F8] border-[#221316] rotate-180"
                    : "bg-[#FAF8F8] text-[#221316]/60 border-[#221316]/15")
                }
              >
                <ChevronDown className="w-4 h-4" />
              </div>
            </button>

            <div
              className={
                "grid transition-[grid-template-rows] duration-350 ease-out " +
                (isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
              }
              style={{ willChange: "grid-template-rows" }}
            >
              <div className="overflow-hidden min-h-0">
                <div className="px-4 pb-6 sm:px-6 sm:pb-8 pt-4 border-t border-[#221316]/[0.10] bg-[#FAF8F8]">
                  {foto ? (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                      {/* Kolumna lewa: Treść i opis */}
                      <div className="lg:col-span-7 space-y-3.5 order-2 lg:order-1">
                        {p.opis && p.opis.length > 0 && (
                          <div className="space-y-3">
                            {p.opis.map((akapit, i) => (
                              <p
                                key={i}
                                className="text-[#221316]/80 text-xs sm:text-sm leading-relaxed"
                              >
                                {akapit}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Fallback dla obiektów bez struktury opis/elementy */}
                        {!p.opis && p.linie && (
                          <div className="space-y-2">
                            {p.linie.map((l, i) => (
                              <p key={i} className="text-[#221316]/80 text-xs sm:text-sm leading-relaxed">
                                {l}
                              </p>
                            ))}
                          </div>
                        )}

                        {/* Pigułki atrybutów sprzętu */}
                        <div className="pt-2 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EDE4E6] text-[#842126] text-[11px] font-semibold">
                            <Check className="w-3.5 h-3.5" strokeWidth={2.5} />
                            Certyfikowane wyposażenie
                          </span>
                          {foto.producent && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-[#221316]/10 text-[#221316]/70 text-[11px] font-medium shadow-xs">
                              Producent: {foto.producent}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Kolumna prawa: Elegancka ramka ze zdjęciem sprzętu */}
                      <div className="lg:col-span-5 order-1 lg:order-2">
                        <div className="group/card relative rounded-2xl bg-white border border-[#842126]/20 p-3 shadow-md hover:shadow-xl hover:border-[#842126]/50 transition-all duration-300">
                          {/* Kontener zdjęcia */}
                          <div className="relative w-full h-48 sm:h-56 md:h-60 rounded-xl bg-gradient-to-br from-[#FAF8F8] via-white to-[#EDE4E6] border border-[#842126]/10 flex items-center justify-center p-3 sm:p-4 overflow-hidden">
                            <div className="absolute inset-0 bg-[radial-gradient(#842126_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.08] pointer-events-none" />
                            <img
                              src={foto.src}
                              alt={foto.alt}
                              className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 ease-out group-hover/card:scale-105"
                              loading="lazy"
                            />
                            <div className="absolute top-2.5 right-2.5 z-20 px-2 py-1 rounded-md bg-white border border-[#842126]/20 shadow-xs text-[10px] font-bold tracking-wider uppercase text-[#842126] flex items-center gap-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#842126] animate-pulse" />
                              Sprzęt
                            </div>
                          </div>
                          {/* Podpis pod zdjęciem */}
                          <div className="pt-2.5 px-1.5 pb-0.5 flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-xs sm:text-sm font-semibold text-[#221316] truncate leading-tight">
                                {foto.nazwa || p.tytul}
                              </p>
                              {foto.opisKrotki && (
                                <p className="text-[11px] text-[#842126] font-medium truncate mt-0.5">
                                  {foto.opisKrotki}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Akapity opisowe */}
                      {p.opis && p.opis.length > 0 && (
                        <div className="space-y-3 mb-4">
                          {p.opis.map((akapit, i) => (
                            <p
                              key={i}
                              className="text-[#221316]/75 text-xs sm:text-sm leading-relaxed"
                            >
                              {akapit}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Nagłówek listy / wyliczenia */}
                      {p.listaTytul && (
                        <h4 className="text-xs sm:text-sm font-semibold text-[#221316] mb-2.5 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#842126] shrink-0" />
                          <span>{p.listaTytul}</span>
                        </h4>
                      )}

                      {/* Kafelki dla elementów do wyliczenia */}
                      {p.elementy && p.elementy.length > 0 && (
                        <div className="grid sm:grid-cols-2 gap-2.5 mb-3">
                          {p.elementy.map((item, i) => (
                            <div
                              key={i}
                              className="rounded-2xl bg-white border border-[#221316]/[0.10] p-3 sm:p-3.5 flex items-start gap-2.5 shadow-sm hover:border-[#842126]/40 hover:shadow-md transition-all"
                            >
                              <div className="w-5 h-5 rounded-full bg-[#EDE4E6] text-[#842126] flex items-center justify-center shrink-0 mt-0.5">
                                <Check className="w-3 h-3" strokeWidth={2.5} />
                              </div>
                              <span className="text-xs sm:text-sm text-[#221316]/85 font-medium leading-snug">
                                {item}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Podsumowanie po wyliczeniu */}
                      {p.podsumowanie && p.podsumowanie.length > 0 && (
                        <div className="space-y-3 mt-3 pt-1">
                          {p.podsumowanie.map((akapit, i) => (
                            <p
                              key={i}
                              className="text-[#221316]/75 text-xs sm:text-sm leading-relaxed"
                            >
                              {akapit}
                            </p>
                          ))}
                        </div>
                      )}

                      {/* Fallback dla obiektów bez struktury opis/elementy */}
                      {!p.opis && p.linie && (
                        <div className="space-y-2">
                          {p.linie.map((l, i) => {
                            const isListItem = l.startsWith("•") || l.startsWith("-");
                            return isListItem ? (
                              <div
                                key={i}
                                className="rounded-2xl bg-white border border-[#221316]/[0.10] p-3 sm:p-3.5 flex items-start gap-2.5 shadow-sm"
                              >
                                <div className="w-5 h-5 rounded-full bg-[#EDE4E6] text-[#842126] flex items-center justify-center shrink-0 mt-0.5">
                                  <Check className="w-3 h-3" strokeWidth={2.5} />
                                </div>
                                <span className="text-xs sm:text-sm text-[#221316]/85 font-medium leading-snug">
                                  {l.replace(/^[•\-]\s*/, "")}
                                </span>
                              </div>
                            ) : (
                              <p
                                key={i}
                                className="text-[#221316]/75 text-xs sm:text-sm leading-relaxed"
                              >
                                {l}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ServicesSection() {
  return (
    <>
      <section
        id="uslugi"
        className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#EDE4E6] border-t border-[#842126]/[0.14]"
      >
        <div
          className="absolute inset-x-0 top-0 h-[620px] sm:h-[680px] lg:h-[760px] pointer-events-none select-none overflow-hidden"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
            contain: "paint",
          }}
        >
          <img
            src={leczenieBg}
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-35 sm:opacity-45 object-center pointer-events-none"
            style={{ transform: "translateZ(0)" }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#EDE4E6]/85 via-[#EDE4E6]/70 to-[#EDE4E6]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#842126]/20 text-xs font-semibold uppercase tracking-widest text-[#842126] shadow-sm">
              <Stethoscope className="w-3.5 h-3.5" />
              Usługi
            </div>
            <MaskedHeading className="text-3xl sm:text-5xl font-serif font-medium text-[#221316] tracking-tight leading-[1.2] sm:leading-[1.2]">
              Zakres leczenia
            </MaskedHeading>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {menuBoczne.uslugi.map((m) => (
              <span
                key={m}
                className="rounded-full bg-white border border-[#842126]/25 px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-[#221316]/80 shadow-sm"
              >
                {m}
              </span>
            ))}
          </div>
          <Akordeon pozycje={uslugi} ikonaDomyslna={Stethoscope} ikony={ikony} />
        </div>
      </section>

      <section
        id="sprzet"
        className="relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F8] border-t border-[#842126]/[0.14]"
      >
        <div
          className="absolute inset-x-0 top-0 h-[620px] sm:h-[680px] lg:h-[760px] pointer-events-none select-none overflow-hidden"
          style={{
            transform: "translateZ(0)",
            willChange: "transform",
            contain: "paint",
          }}
        >
          <img
            src={sprzetBg}
            alt="Nowoczesny sprzęt medyczny gabinetu stomatologicznego"
            className="absolute inset-0 w-full h-full object-cover opacity-60 sm:opacity-75 object-center pointer-events-none"
            style={{ transform: "translateZ(0)" }}
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#FAF8F8]/75 via-[#FAF8F8]/45 to-[#FAF8F8]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#842126]/20 text-xs font-semibold uppercase tracking-widest text-[#842126] shadow-sm">
              <Cpu className="w-3.5 h-3.5" />
              Sprzęt
            </div>
            <MaskedHeading className="text-3xl sm:text-5xl font-serif font-medium text-[#221316] tracking-tight leading-[1.2] sm:leading-[1.2]">
              Czym pracujemy
            </MaskedHeading>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {menuBoczne.sprzet.map((m) => (
              <span
                key={m}
                className="rounded-full bg-white border border-[#842126]/25 px-4 py-2 text-[11px] uppercase tracking-[0.1em] text-[#221316]/80 shadow-sm"
              >
                {m}
              </span>
            ))}
          </div>
          <Akordeon pozycje={sprzet} ikonaDomyslna={Cpu} zdjeciaMap={sprzetZdjecia} />
        </div>
      </section>
    </>
  );
}
