import React, { useState, useEffect } from "react";
import { Phone, Mail, MapPin, Clock, CalendarCheck, CheckCircle2, MapPinned } from "lucide-react";
import { MaskedHeading, StaggerReveal } from "./Reveal";
import { clinic, godziny, umowWizyte } from "../data/clinicData";

export default function ContactSection() {
  const mapQuery = encodeURIComponent(clinic.ulica + " " + clinic.kod);

  // Mapa Google to usluga trzeciej strony i zapisuje wlasne cookies - laduje
  // sie tylko po zgodzie na "wszystkie" cookies (z bannera lub ponizszego przycisku).
  const [mapConsent, setMapConsent] = useState(false);

  useEffect(() => {
    const readConsent = () => {
      try {
        setMapConsent(localStorage.getItem("byrska_cookie_consent") === "all");
      } catch {
        setMapConsent(false);
      }
    };
    readConsent();
    window.addEventListener("byrska-cookie-consent", readConsent);
    return () => window.removeEventListener("byrska-cookie-consent", readConsent);
  }, []);

  const acceptMapCookies = () => {
    try {
      localStorage.setItem("byrska_cookie_consent", "all");
    } catch {
      // ignore
    }
    setMapConsent(true);
    window.dispatchEvent(new CustomEvent("byrska-cookie-consent"));
  };

  return (
    <section id="kontakt" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F8]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#842126]/20 text-xs font-semibold uppercase tracking-widest text-[#842126] shadow-sm">
            <CalendarCheck className="w-3.5 h-3.5" />
            {umowWizyte.tytul}
          </div>
          <MaskedHeading className="text-3xl sm:text-5xl font-serif font-medium text-[#221316] tracking-tight leading-[1.2] sm:leading-[1.2]">
            Rejestracja i dane kontaktowe
          </MaskedHeading>
          <p className="text-sm sm:text-base text-[#221316]/75 max-w-2xl mx-auto">
            {umowWizyte.podtytul}
          </p>
        </div>

        {/* Siatka kart informacyjnych ramki Umów Wizytę */}
        <StaggerReveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Karta 1: Rejestracja Telefoniczna (wyróżniona) */}
          <div className="rounded-3xl bg-[#221316] text-[#FAF8F8] p-7 border border-[#842126]/40 shadow-lg flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#E08D93]/20 text-[#E08D93] flex items-center justify-center">
                <Phone className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#E08D93] mt-5">
                {umowWizyte.rejestracjaTelefoniczna}
              </h3>
              <p className="text-xs text-[#FAF8F8]/70 mt-1 mb-4">
                Zadzwoń do nas, aby ustalić dogodny termin wizyty:
              </p>

              <div className="space-y-2.5">
                <a
                  href={clinic.telefonHref}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.08] border border-white/10 hover:border-[#E08D93] hover:bg-white/[0.14] transition-all group"
                >
                  <span className="text-xs text-[#FAF8F8]/80">Telefon stacjonarny:</span>
                  <span className="font-serif text-lg font-medium text-[#FAF8F8] group-hover:text-[#E08D93] transition-colors tabular-nums">
                    {clinic.telefon}
                  </span>
                </a>

                <a
                  href={clinic.komorkaHref}
                  className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/[0.08] border border-white/10 hover:border-[#E08D93] hover:bg-white/[0.14] transition-all group"
                >
                  <span className="text-xs text-[#FAF8F8]/80">Telefon komórkowy:</span>
                  <span className="font-serif text-lg font-medium text-[#FAF8F8] group-hover:text-[#E08D93] transition-colors tabular-nums">
                    {clinic.komorka}
                  </span>
                </a>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-[#FAF8F8]/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#E08D93] shrink-0" />
              <span>Szybka rezerwacja telefoniczna</span>
            </div>
          </div>

          {/* Karta 2: Godziny przyjęć */}
          <div className="rounded-3xl bg-[#EDE4E6] border border-[#842126]/25 p-7 flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-white text-[#842126] flex items-center justify-center shadow-sm">
                <Clock className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#842126] mt-5">
                {umowWizyte.godzinyTytul}
              </h3>
              <div className="grid gap-2 mt-3.5">
                {godziny.map((g) => (
                  <div
                    key={g.dni}
                    className="rounded-2xl bg-white border border-[#842126]/[0.12] px-3.5 py-2.5 shadow-sm"
                  >
                    <p className="text-xs text-[#221316]/70">{g.dni}</p>
                    <p className="font-serif text-base text-[#221316] font-medium tabular-nums mt-0.5">
                      {g.zakres}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Karta 3: E-mail (kontakt 24h) */}
          <div className="rounded-3xl bg-white border border-[#842126]/[0.14] p-7 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-[#EDE4E6] text-[#842126] flex items-center justify-center">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#842126] mt-5">
                {umowWizyte.emailTytul}
              </h3>
              <p className="text-xs sm:text-sm text-[#221316]/80 mt-2 leading-relaxed">
                {clinic.emailOpis}
              </p>

              <div className="mt-4 space-y-2">
                <a
                  href={"mailto:" + clinic.email}
                  className="block p-3 rounded-2xl bg-[#FAF8F8] border border-[#221316]/10 hover:border-[#842126] transition-colors"
                >
                  <span className="block text-[10px] uppercase font-bold text-[#842126]">
                    Główny adres:
                  </span>
                  <span className="font-serif text-sm sm:text-base text-[#221316] break-all">
                    {clinic.email}
                  </span>
                </a>

                {clinic.emailGabinet && (
                  <a
                    href={"mailto:" + clinic.emailGabinet}
                    className="block p-3 rounded-2xl bg-[#FAF8F8] border border-[#221316]/10 hover:border-[#842126] transition-colors"
                  >
                    <span className="block text-[10px] uppercase font-bold text-[#842126]">
                      Gabinet:
                    </span>
                    <span className="font-serif text-sm sm:text-base text-[#221316] break-all">
                      {clinic.emailGabinet}
                    </span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </StaggerReveal>

        {/* Dodatkowy pasek z adresem i udogodnieniami */}
        <div className="mt-4 rounded-3xl bg-white border border-[#842126]/[0.14] p-6 sm:p-7 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#EDE4E6] text-[#842126] flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#842126]">
                Adres gabinetu:
              </p>
              <address className="not-italic font-serif text-base sm:text-lg text-[#221316] mt-0.5 leading-snug">
                {clinic.osiedle}, {clinic.ulica} {clinic.kod}
              </address>
              <p className="text-xs text-[#221316]/65 mt-1">
                Lokalizacja na niskim parterze · Gabinet przystosowany dla osób niepełnosprawnych · Parking dla pacjentów
              </p>
            </div>
          </div>

          <a
            href={"https://www.google.com/maps?q=" + mapQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#842126] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#9E2930] transition-colors shrink-0 shadow-sm"
          >
            Nawiguj w Google Maps
          </a>
        </div>

        {/* Interaktywna mapa dojazdu - laduje sie dopiero po zgodzie na cookies */}
        <div className="mt-4 rounded-3xl overflow-hidden border border-[#842126]/[0.14] bg-[#EDE4E6] shadow-sm">
          {mapConsent ? (
            <iframe
              title="Mapa dojazdu ByrskaDentic Szczecin"
              src={"https://www.google.com/maps?q=" + mapQuery + "&output=embed"}
              className="w-full h-[360px] sm:h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-[280px] sm:h-[420px] flex flex-col items-center justify-center gap-3 text-center px-6">
              <div className="w-11 h-11 rounded-2xl bg-white text-[#842126] flex items-center justify-center shadow-sm">
                <MapPinned className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <p className="text-xs sm:text-sm text-[#221316]/70 max-w-sm">
                Mapa Google zapisuje własne pliki cookie, dlatego ładuje się dopiero po Twojej zgodzie.
              </p>
              <button
                type="button"
                onClick={acceptMapCookies}
                className="px-5 py-2.5 rounded-full bg-[#842126] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#9E2930] transition-colors shadow-sm cursor-pointer"
              >
                Pokaż mapę
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
