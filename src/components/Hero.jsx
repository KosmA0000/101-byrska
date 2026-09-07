import React, { useRef, useEffect } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import gsap from "gsap";
import { clinic, hero, godziny } from "../data/clinicData";
import { useInView, MaskedHeading, FadeUp } from "./Reveal";
import heroImg from "../assets/img/gal-01.jpg";

export default function Hero() {
  const sectionRef = useRef(null);
  const imgWrapRef = useRef(null);
  const imgRef = useRef(null);
  const glowARef = useRef(null);
  const glowBRef = useRef(null);

  // Kinowe wejscie: kurtyna odslaniajaca zdjecie + powolny dojazd skali (kamera cofa sie).
  useInView(imgWrapRef, () => {
    gsap.fromTo(
      imgWrapRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power3.inOut" }
    );
    gsap.fromTo(
      imgRef.current,
      { scale: 1.35 },
      { scale: 1.12, duration: 1.8, ease: "power3.out" }
    );
  });

  // Ruch kamery: tlo i blaski podazaja za kursorem z rozna glebia (parallax), dajac wrazenie 3D.
  useEffect(() => {
    const section = sectionRef.current;
    const img = imgRef.current;
    if (!section || !img) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reducedMotion || !finePointer) return;

    const xImg = gsap.quickTo(img, "x", { duration: 1, ease: "power3.out" });
    const yImg = gsap.quickTo(img, "y", { duration: 1, ease: "power3.out" });
    const xGlowA = gsap.quickTo(glowARef.current, "x", { duration: 1.3, ease: "power3.out" });
    const yGlowA = gsap.quickTo(glowARef.current, "y", { duration: 1.3, ease: "power3.out" });
    const xGlowB = gsap.quickTo(glowBRef.current, "x", { duration: 1.5, ease: "power3.out" });
    const yGlowB = gsap.quickTo(glowBRef.current, "y", { duration: 1.5, ease: "power3.out" });

    const handleMove = (e) => {
      const rect = section.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;
      xImg(relX * -24);
      yImg(relY * -16);
      xGlowA(relX * 50);
      yGlowA(relY * 34);
      xGlowB(relX * -36);
      yGlowB(relY * -24);
    };

    section.addEventListener("mousemove", handleMove);
    return () => section.removeEventListener("mousemove", handleMove);
  }, []);

  // Kamera cofa sie przy scrollu: delikatny unzoom tla, jak w referencji
  // dental-park (tam scale spada z ~1.08 do ~1.06 na dlugosci sekcji hero).
  useEffect(() => {
    const img = imgRef.current;
    const section = sectionRef.current;
    if (!img || !section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const scaleImg = gsap.quickTo(img, "scale", { duration: 0.6, ease: "power2.out" });
    const baseScale = 1.12;
    const endScale = 1;

    function update(scrollY) {
      const h = section.offsetHeight || 1;
      const progress = Math.min(Math.max(scrollY / h, 0), 1);
      scaleImg(baseScale - progress * (baseScale - endScale));
    }

    const lenis = window.__lenis;
    if (lenis && typeof lenis.on === "function") {
      const onScroll = ({ scroll }) => update(scroll);
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    }

    const onScroll = () => update(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] flex flex-col justify-start md:justify-center overflow-hidden bg-[#221316]"
    >
      <div ref={imgWrapRef} className="absolute inset-0 w-full h-full overflow-hidden">
        <img
          ref={imgRef}
          src={heroImg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-75 sm:opacity-80"
          style={{ willChange: "transform" }}
        />
      </div>

      <div
        ref={glowARef}
        className="absolute -top-24 -right-24 w-[34rem] h-[34rem] rounded-full bg-[#842126]/25 blur-[100px] pointer-events-none"
        style={{ willChange: "transform" }}
      />
      <div
        ref={glowBRef}
        className="absolute -bottom-32 -left-20 w-[28rem] h-[28rem] rounded-full bg-[#E08D93]/15 blur-[110px] pointer-events-none"
        style={{ willChange: "transform" }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#221316]/95 via-[#221316]/55 to-[#221316]/20" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-24 pb-14 sm:pt-28 sm:pb-20 max-w-6xl mx-auto">
        <FadeUp>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#E08D93]/40 text-xs font-semibold uppercase tracking-widest text-[#E08D93]">
            {clinic.lekarz} · {clinic.miasto}
          </div>
        </FadeUp>

        <MaskedHeading
          as="h1"
          className="font-serif text-3xl sm:text-5xl md:text-[5.5vw] lg:text-[4.2vw] leading-[1.18] sm:leading-[1.15] text-[#FAF8F8] mt-4 sm:mt-5 max-w-4xl pb-1"
        >
          {hero.tytul}
        </MaskedHeading>

        <FadeUp delay={0.15} className="mt-6 sm:mt-7 grid sm:grid-cols-[auto_1fr] gap-3 max-w-3xl">
          <div className="flex flex-col gap-3">
            <a
              href={clinic.telefonHref}
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
                className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#E08D93] transition-colors p-3.5 flex items-center gap-2 min-w-0"
              >
                <Mail className="w-4 h-4 text-[#E08D93] shrink-0" strokeWidth={1.6} />
                <span className="text-xs text-[#FAF8F8]/90 truncate">
                  {clinic.email}
                </span>
              </a>

              <a
                href="#kontakt"
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
        </FadeUp>
      </div>
    </section>
  );
}
