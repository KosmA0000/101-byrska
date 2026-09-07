import React, { useState, useRef, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Karuzela coverflow 3D - dla duzych zbiorow kart (prace pacjentow, artykuly),
 * ktore ulozone pionowo zapychaja scroll strony.
 *
 * Geometria odwzorowana z referencji: karta aktywna na wprost, kolejne odsuwane
 * w bok o `step`, cofane w glab i odchylane w osi Y z tlumieniem |d|^0.55,
 * przez co odleglejsze karty zageszczaja sie zamiast uciekac w nieskonczonosc.
 */
export default function Coverflow({
  count,
  renderCard,
  cardClass = "",
  height = "h-[300px] sm:h-[360px]",
  label = "kart",
}) {
  // Start od srodka: karty rozkladaja sie symetrycznie w obie strony,
  // a uzytkownik od razu widzi, ze moze isc w lewo i w prawo.
  const [active, setActive] = useState(() => Math.floor((count - 1) / 2));
  const [cardW, setCardW] = useState(280);
  const scene = useRef(null);
  const drag = useRef(null);

  useEffect(() => {
    const measure = () => {
      const w = scene.current?.clientWidth || 900;
      setCardW(Math.round(Math.min(340, Math.max(190, w * (w < 640 ? 0.66 : 0.28)))));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const go = useCallback(
    (dir) => setActive((a) => Math.min(count - 1, Math.max(0, a + dir))),
    [count]
  );

  // swipe na dotyku + przeciaganie myszka
  const onDown = (e) => {
    drag.current = { x: e.clientX ?? e.touches?.[0]?.clientX, moved: false };
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    if (Math.abs(x - d.x) > 45 && !d.moved) {
      d.moved = true;
      go(x < d.x ? 1 : -1);
    }
  };
  const onUp = () => {
    drag.current = null;
  };

  const step = cardW * 1.05;

  return (
    <div>
      <div
        ref={scene}
        className={`relative w-full ${height} select-none touch-pan-y`}
        style={{ perspective: `${Math.round(cardW * 3)}px` }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        tabIndex={0}
        role="group"
        aria-label={`Karuzela: ${count} ${label}`}
      >
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
          {Array.from({ length: count }, (_, i) => {
            const d = i - active;
            const ad = Math.abs(d);
            if (ad > 4) return null; // dalsze karty i tak sa niewidoczne
            const damp = Math.pow(ad, 0.55);
            const rot = Math.min(82, 44 * damp) * (d > 0 ? -1 : d < 0 ? 1 : 0);
            return (
              <figure
                key={i}
                onClick={() => d !== 0 && setActive(i)}
                data-cursor-hover
                className={`absolute left-1/2 top-0 h-full overflow-hidden transition-all duration-500 ease-out ${
                  d === 0 ? "" : "cursor-pointer"
                } ${cardClass}`}
                style={{
                  width: `${cardW}px`,
                  transform: `translateX(calc(-50% + ${d * step}px)) translateZ(${
                    -124.8 * damp
                  }px) rotateY(${rot}deg)`,
                  opacity: Math.max(0, 1 - ad * 0.1),
                  zIndex: 100 - ad,
                }}
                aria-hidden={d !== 0}
              >
                {renderCard(i, d === 0)}
              </figure>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => go(-1)}
          disabled={active === 0}
          data-cursor-hover
          aria-label="Poprzednie"
          className="w-11 h-11 rounded-full bg-white border border-[#842126]/45 text-[#842126] flex items-center justify-center hover:bg-[#842126] hover:text-white transition-colors disabled:opacity-35 disabled:pointer-events-none"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-xs tabular-nums text-[#221316]/55 min-w-[4.5rem] text-center">
          {active + 1} / {count}
        </span>
        <button
          onClick={() => go(1)}
          disabled={active === count - 1}
          data-cursor-hover
          aria-label="Następne"
          className="w-11 h-11 rounded-full bg-white border border-[#842126]/45 text-[#842126] flex items-center justify-center hover:bg-[#842126] hover:text-white transition-colors disabled:opacity-35 disabled:pointer-events-none"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
