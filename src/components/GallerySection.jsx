import React, { useRef, useEffect, useState, useLayoutEffect, useCallback } from "react";
import { Images, ArrowLeft, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { MaskedHeading } from "./Reveal";

// Bezpośredni import 12 zdjęć gabinetu – 100% niezawodny na każdym urządzeniu i środowisku
import gal01 from "../assets/img/gal-01.jpg";
import gal02 from "../assets/img/gal-02.jpg";
import gal03 from "../assets/img/gal-03.jpg";
import gal04 from "../assets/img/gal-04.jpg";
import gal05 from "../assets/img/gal-05.jpg";
import gal06 from "../assets/img/gal-06.jpg";
import gal07 from "../assets/img/gal-07.jpg";
import gal08 from "../assets/img/gal-08.jpg";
import gal09 from "../assets/img/gal-09.jpg";
import gal10 from "../assets/img/gal-10.jpg";
import gal11 from "../assets/img/gal-11.jpg";
import gal12 from "../assets/img/gal-12.jpg";

const imgs = [gal01, gal02, gal03, gal04, gal05, gal06, gal07, gal08, gal09, gal10, gal11, gal12];

// Preładowanie zdjęć w przeglądarce
if (typeof window !== "undefined") {
  imgs.forEach((src) => {
    const img = new Image();
    img.src = src;
    if (img.decode) {
      img.decode().catch(() => {});
    }
  });
}

// 3 zestawy po 12 zdjęć dla niekończącego się obrotu koła (Circular Wheel)
const displayImgs = [...imgs, ...imgs, ...imgs];

export default function GallerySection() {
  const viewport = useRef(null);
  const track = useRef(null);

  // Wymiary i indeksy
  const cardOffsetsRef = useRef([]);
  const currentIndexRef = useRef(12); // Start od środkowego zestawu (indeks 12)
  const isAnimatingRef = useRef(false);

  const [activePhotoNum, setActivePhotoNum] = useState(1);

  // Obsługa gestów dotykowych (swipe) na mobile
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Pomiar pozycji kart
  const measure = useCallback(() => {
    const t = track.current;
    if (!t || !t.children || t.children.length < 36) return;

    const offs = [];
    const baseLeft = t.children[0].offsetLeft;
    for (let i = 0; i < t.children.length; i++) {
      offs.push(t.children[i].offsetLeft - baseLeft);
    }
    cardOffsetsRef.current = offs;

    const curr = currentIndexRef.current;
    if (offs[curr] !== undefined) {
      gsap.set(t, { x: -offs[curr] });
    }
  }, []);

  useLayoutEffect(() => {
    measure();
    const raf = requestAnimationFrame(measure);
    const handleResize = () => measure();

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    const els = track.current ? [...track.current.querySelectorAll("img")] : [];
    els.forEach((i) => i.addEventListener("load", measure));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      els.forEach((i) => i.removeEventListener("load", measure));
    };
  }, [measure]);

  // Nudge: obrót koła w przód (+1) lub w tył (-1) bez cofania wstecz
  const nudge = useCallback((dir) => {
    const t = track.current;
    const offs = cardOffsetsRef.current;
    if (!t || !offs.length || isAnimatingRef.current) return;

    gsap.killTweensOf(t);

    let curr = currentIndexRef.current;
    if (curr >= 24) {
      curr -= 12;
      gsap.set(t, { x: -offs[curr] });
    } else if (curr < 12) {
      curr += 12;
      gsap.set(t, { x: -offs[curr] });
    }

    const nextTarget = curr + dir;
    currentIndexRef.current = nextTarget;
    isAnimatingRef.current = true;

    // Aktualizacja numeru aktywnego zdjęcia (1..12)
    const normalizedIdx = ((nextTarget % 12) + 12) % 12;
    setActivePhotoNum(normalizedIdx + 1);

    gsap.to(t, {
      x: -offs[nextTarget],
      duration: 0.45,
      ease: "power2.out",
      onComplete: () => {
        // Cichy skok modulo 12 do środkowego zestawu
        if (nextTarget >= 24) {
          const resetIdx = nextTarget - 12;
          currentIndexRef.current = resetIdx;
          gsap.set(t, { x: -offs[resetIdx] });
        } else if (nextTarget < 12) {
          const resetIdx = nextTarget + 12;
          currentIndexRef.current = resetIdx;
          gsap.set(t, { x: -offs[resetIdx] });
        }
        isAnimatingRef.current = false;
      },
    });
  }, []);

  // Obsługa Swipe na urządzeniach mobilnych
  const onTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchEndXRef.current = e.touches[0].clientX;
  };

  const onTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const onTouchEnd = () => {
    const diff = touchStartXRef.current - touchEndXRef.current;
    const threshold = 40;
    if (diff > threshold) {
      nudge(1); // swipe w lewo -> następne zdjęcie
    } else if (diff < -threshold) {
      nudge(-1); // swipe w prawo -> poprzednie zdjęcie
    }
  };

  return (
    <section
      id="galeria"
      data-lenis-prevent="true"
      className="relative py-14 sm:py-20 md:py-24 bg-[#FAF8F8] border-t border-[#842126]/[0.14] overflow-hidden select-none"
    >
      <div className="w-full">
        {/* Nagłówek i kontrolki nawigacyjne */}
        <div className="px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto mb-6 sm:mb-10 w-full">
          <div className="text-center space-y-2.5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#842126]/20 text-xs font-semibold uppercase tracking-widest text-[#842126] shadow-sm">
              <Images className="w-3.5 h-3.5" />
              Galeria
            </div>
            <MaskedHeading className="text-3xl sm:text-5xl font-serif font-medium text-[#221316] tracking-tight leading-[1.2] sm:leading-[1.2]">
              Gabinet
            </MaskedHeading>
            <p className="text-xs sm:text-sm text-[#221316]/65 max-w-md mx-auto">
              Nawiguj strzałkami lub przesuwaj palcem w nieskończonej pętli kołowej 360°, aby obejrzeć gabinet.
            </p>
          </div>

          {/* Przyciski nawigacji kołowej dostępne na desktopie i mobile */}
          <div className="flex justify-center items-center gap-3 sm:gap-4 mt-5 sm:mt-6">
            <button
              type="button"
              onClick={() => nudge(-1)}
              data-cursor-hover
              aria-label="Poprzednie zdjęcie"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#842126]/35 text-[#842126] flex items-center justify-center hover:bg-[#842126] hover:text-white shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="text-[11px] font-mono uppercase tracking-wider text-[#842126] font-semibold px-3.5 py-1.5 bg-white rounded-full border border-[#842126]/20 shadow-sm flex items-center gap-1.5">
              <span>{String(activePhotoNum).padStart(2, "0")}</span>
              <span className="text-[#842126]/40">/</span>
              <span>12</span>
            </div>

            <button
              type="button"
              onClick={() => nudge(1)}
              data-cursor-hover
              aria-label="Następne zdjęcie"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-[#842126]/35 text-[#842126] flex items-center justify-center hover:bg-[#842126] hover:text-white shadow-sm hover:shadow-md transition-all duration-200 active:scale-95 cursor-pointer shrink-0"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Płynna taśma 36 zdjęć (Circular Infinite Loop) dla mobile i desktop */}
        <div
          ref={viewport}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          className="w-full overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        >
          <div
            ref={track}
            className="flex gap-4 sm:gap-6 md:gap-7 px-4 sm:px-10 w-max will-change-transform transform-gpu"
          >
            {displayImgs.map((src, i) => (
              <figure
                key={`${src}-${i}`}
                className="shrink-0 overflow-hidden rounded-2xl sm:rounded-3xl bg-[#EDE4E6] border border-[#842126]/[0.14] shadow-sm w-[78vw] sm:w-[34vw] md:w-[27vw] max-w-[460px]"
              >
                <img
                  src={src}
                  alt={`Gabinet ByrskaDentic ${(i % 12) + 1}`}
                  loading="eager"
                  decoding="sync"
                  className="w-full h-[52vw] sm:h-[24vw] md:h-[19vw] max-h-[340px] min-h-[190px] object-cover filter brightness-[0.98] hover:scale-[1.03] transition-transform duration-500 ease-out pointer-events-none"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* Wskaźniki kropkowe na dole dla szybkiego podglądu */}
        <div className="flex justify-center items-center gap-1.5 mt-5 px-4">
          {imgs.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                const currentNorm = activePhotoNum - 1;
                const diff = idx - currentNorm;
                if (diff !== 0) nudge(diff);
              }}
              aria-label={`Przejdź do zdjęcia ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activePhotoNum - 1
                  ? "w-6 bg-[#842126]"
                  : "w-1.5 bg-[#842126]/25 hover:bg-[#842126]/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
