import React, { useRef } from "react";
import gsap from "gsap";
import { UserRound, Quote, Leaf, Baby, Sparkles, Star, MapPin } from "lucide-react";
import { MaskedHeading, StaggerReveal, useInView } from "./Reveal";
import { oNas, hero } from "../data/clinicData";
import doctorImg from "../assets/img/gal-12.jpg";

const ikonyCech = [Sparkles, Baby, Leaf];

export default function AboutSection() {
  const quoteRef = useRef(null);
  const quoteIconRef = useRef(null);
  const quoteTextRef = useRef(null);

  useInView(quoteRef, () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      quoteRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, clearProps: "transform" }
    );

    if (quoteIconRef.current) {
      tl.fromTo(
        quoteIconRef.current,
        { y: 16, opacity: 0, scale: 0.85, rotate: -6 },
        { y: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.9, clearProps: "transform" },
        "-=0.9"
      );
    }

    if (quoteTextRef.current) {
      tl.fromTo(
        quoteTextRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0, clearProps: "transform" },
        "-=0.75"
      );
    }
  });

  return (
    <section
      id="o-nas"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF8F8] border-t border-[#842126]/[0.14]"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#842126]/20 text-xs font-semibold uppercase tracking-widest text-[#842126] shadow-sm">
            <UserRound className="w-3.5 h-3.5" />
            {oNas.lekarz}
          </div>
          <MaskedHeading className="text-3xl sm:text-5xl font-serif font-medium text-[#221316] tracking-tight leading-[1.2] sm:leading-[1.2]">
            {oNas.tytul}
          </MaskedHeading>
        </div>

        <StaggerReveal className="grid sm:grid-cols-3 gap-3.5 mb-3.5">
          {hero.akapity.map((a, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-[#842126]/[0.14] p-6 hover:border-[#842126]/50 transition-colors shadow-sm"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#842126]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-2.5 text-sm text-[#221316]/70 leading-relaxed">{a}</p>
            </div>
          ))}
        </StaggerReveal>

        <div
          ref={quoteRef}
          className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#221316] via-[#2E151A] to-[#1C0F12] text-[#FAF8F8] p-7 sm:p-11 border border-[#842126]/40 shadow-xl transition-all duration-500 hover:border-[#842126]/70 hover:shadow-2xl"
        >
          {/* Delikatne tło świetlne z subtelnym hoverem */}
          <div className="pointer-events-none absolute -right-20 -top-20 w-72 h-72 rounded-full bg-[#842126]/25 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-60" />
          <div className="pointer-events-none absolute -left-20 -bottom-20 w-72 h-72 rounded-full bg-[#E08D93]/15 blur-3xl transition-opacity duration-700 group-hover:opacity-100 opacity-40" />

          <div
            ref={quoteIconRef}
            className="relative z-10 inline-block mb-5 transition-transform duration-500 group-hover:scale-105"
          >
            <Quote
              className="w-10 h-10 text-[#E08D93]/70 transition-colors duration-500 group-hover:text-[#E08D93]"
              strokeWidth={1.3}
            />
          </div>
          <p
            ref={quoteTextRef}
            className="relative z-10 font-serif text-lg sm:text-2xl leading-[1.5] text-[#FAF8F8] tracking-wide"
          >
            {oNas.wstep}
          </p>
        </div>

        <StaggerReveal className="grid sm:grid-cols-3 gap-3.5 mt-3.5">
          {oNas.cechy.map((c, i) => {
            const Ikona = ikonyCech[i] || Sparkles;
            return (
              <div
                key={c.tytul}
                className="rounded-3xl bg-white border border-[#842126]/20 p-6 hover:border-[#842126] transition-colors shadow-sm"
              >
                <div className="w-11 h-11 rounded-2xl bg-[#EDE4E6] text-[#842126] flex items-center justify-center">
                  <Ikona className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg text-[#221316] mt-4 leading-snug pb-0.5">{c.tytul}</h3>
                <p className="text-xs text-[#221316]/65 leading-relaxed mt-2">{c.opis}</p>
              </div>
            );
          })}
        </StaggerReveal>

        <StaggerReveal className="grid sm:grid-cols-2 gap-3.5 mt-3.5">
          {oNas.lokalizacja.map((l, i) => (
            <div key={i} className="rounded-3xl bg-[#EDE4E6] border border-[#842126]/[0.14] p-6 flex gap-4">
              <MapPin className="w-5 h-5 text-[#842126] shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-sm text-[#221316]/75 leading-relaxed">{l}</p>
            </div>
          ))}
        </StaggerReveal>

        <p className="mt-3.5 rounded-3xl bg-white border border-[#842126]/[0.14] p-6 text-sm text-[#221316]/75 leading-relaxed shadow-sm">
          {oNas.kavo.przed} <strong className="text-[#842126]">{oNas.kavo.marka}</strong>{" "}
          {oNas.kavo.po}
        </p>

        <div className="mt-12">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#842126]/20 text-xs font-semibold uppercase tracking-widest text-[#842126] shadow-sm">
              <Star className="w-3.5 h-3.5" />
              {oNas.wyrozniaTytul}
            </div>
          </div>
          <StaggerReveal className="grid sm:grid-cols-2 gap-3.5">
            {oNas.wartosci.map((w, i) => (
              <div
                key={w.tytul}
                className="rounded-3xl bg-[#221316] text-[#FAF8F8] p-6 sm:p-7 border border-[#842126]/30 shadow-md"
              >
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#E08D93]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-xl text-[#FAF8F8] mt-1.5">{w.tytul}</h3>
                <p className="text-xs text-[#FAF8F8]/75 leading-relaxed mt-3">{w.opis}</p>
              </div>
            ))}
          </StaggerReveal>
        </div>

        <div className="mt-12 rounded-3xl bg-white border border-[#842126]/25 p-7 sm:p-10 grid md:grid-cols-2 gap-8 items-center shadow-sm">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#221316] leading-snug">
              {oNas.podpis}
            </h3>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#842126] mt-1 mb-4">
              {oNas.omnieTytul}
            </p>
            <StaggerReveal className="grid gap-3">
              {oNas.omnie.map((o, i) => (
                <p key={i} className="text-sm text-[#221316]/75 leading-relaxed">
                  {o}
                </p>
              ))}
            </StaggerReveal>
          </div>
          <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-[#842126]/15">
            <img
              src={doctorImg}
              alt={oNas.lekarz}
              className="w-full h-full object-cover max-h-[420px]"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
