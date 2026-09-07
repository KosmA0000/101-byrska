import React from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { clinic, hero, godziny } from "../data/clinicData";
import heroImg from "../assets/img/gal-01.jpg";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-start md:justify-center overflow-x-clip bg-[#221316]"
    >
      <img
        src={heroImg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-75 sm:opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#221316]/95 via-[#221316]/55 to-[#221316]/20" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-28 sm:pb-20 max-w-6xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#E08D93]/40 text-xs font-semibold uppercase tracking-widest text-[#E08D93]">
          {clinic.lekarz} · {clinic.miasto}
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl md:text-[5.5vw] lg:text-[4.2vw] leading-[1.18] sm:leading-[1.15] text-[#FAF8F8] mt-4 sm:mt-5 max-w-4xl pb-1">
          {hero.tytul}
        </h1>

        <div className="mt-6 sm:mt-7 grid sm:grid-cols-[auto_1fr] gap-3 max-w-3xl">
          <div className="flex flex-col gap-3">
            <a
              href={clinic.telefonHref}
              data-cursor-hover
              className="group rounded-3xl bg-[#842126] hover:bg-[#9E2930] text-white transition-all duration-300 p-5 sm:p-6 flex flex-col justify-center items-start gap-2 min-w-0 shadow-lg hover:shadow-xl hover:scale-[1.01]"
            >
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#E08D93]">
                <Phone className="w-3.5 h-3.5" strokeWidth={2} />
                <span>Rejestracja telefoniczna</span>
              </div>
              <span className="font-serif text-xl sm:text-2xl text-white leading-tight tabular-nums font-medium">
                {clinic.telefon}
              </span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={"mailto:" + clinic.email}
                data-cursor-hover
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#E08D93] transition-colors p-3.5 flex items-center gap-2 min-w-0"
              >
                <Mail className="w-4 h-4 text-[#E08D93] shrink-0" strokeWidth={1.6} />
                <span className="text-xs text-[#FAF8F8]/90 truncate">
                  {clinic.email}
                </span>
              </a>

              <a
                href="#kontakt"
                data-cursor-hover
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#E08D93] transition-colors p-3.5 flex items-center gap-2 min-w-0"
              >
                <MapPin className="w-4 h-4 text-[#E08D93] shrink-0" strokeWidth={1.6} />
                <span className="text-xs text-[#FAF8F8]/90 truncate">
                  Magnolia Park
                </span>
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 p-5 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-2xl bg-[#E08D93]/20 text-[#E08D93] flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" strokeWidth={1.6} />
              </div>
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#E08D93] font-semibold">Godziny przyjęć</p>
            </div>
            <div className="grid gap-2">
              {godziny.map((g) => (
                <div
                  key={g.dni}
                  className="rounded-2xl bg-[#221316]/50 border border-white/10 px-3.5 py-2.5 flex flex-wrap items-baseline justify-between gap-2"
                >
                  <span className="text-[13px] text-[#FAF8F8]/90">{g.dni}</span>
                  <span className="font-serif text-[#E08D93] tabular-nums font-medium">{g.zakres}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
