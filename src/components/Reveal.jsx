import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const reduced = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Odpalanie animacji przez IntersectionObserver, nie ScrollTrigger.
 * Powod: sekcje siedza w przypietych (pin) wrapperach z transformami - ScrollTrigger
 * liczy tam pozycje wzgledem dokumentu i czesc triggerow nigdy sie nie odpala,
 * zostawiajac kafelki na opacity 0. IO patrzy na viewport, wiec pin mu nie przeszkadza.
 */
export function useInView(ref, play, deps = []) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced()) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          // Odpalamy takze gdy element zdazyl juz wyjechac NAD viewport - przy
          // gwaltownym scrollu (albo skoku po kotwicy) potrafi nigdy nie zlapac
          // stanu "intersecting" i zostalby na opacity 0.
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            play(el);
            io.disconnect();
            return;
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/** Naglowek wjezdzajacy zza maski. */
export function MaskedHeading({ children, className = "", as: Tag = "h2" }) {
  const ref = useRef(null);
  // Stan startowy ustawiony synchronicznie przed pierwszym malowaniem, zeby przy
  // wjezdzie w viewport nie bylo klatki z pelna widocznoscia przed ukryciem przez IO.
  useLayoutEffect(() => {
    if (reduced() || !ref.current) return;
    gsap.set(ref.current.querySelectorAll(".reveal-line"), { yPercent: 120, opacity: 0, rotateZ: 2 });
  }, []);
  useInView(ref, (el) =>
    gsap.fromTo(
      el.querySelectorAll(".reveal-line"),
      { yPercent: 120, opacity: 0, rotateZ: 2 },
      { yPercent: 0, opacity: 1, rotateZ: 0, duration: 1.1, stagger: 0.12, ease: "power4.out", clearProps: "transform" }
    )
  );
  return (
    <Tag ref={ref} className={`overflow-hidden py-2.5 -my-2.5 px-2 -mx-2 leading-[1.2] ${className}`}>
      <span className="block reveal-line pb-2 pt-1 leading-[1.2] will-change-transform">{children}</span>
    </Tag>
  );
}

/** Kafelki wstaja kolejno. */
export function StaggerReveal({ children, className = "", y = 34, stagger = 0.07 }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reduced() || !ref.current) return;
    gsap.set(ref.current.children, { y, opacity: 0 });
  }, [y]);
  useInView(
    ref,
    (el) =>
      gsap.fromTo(
        el.children,
        { y, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          // Kaskada nie moze ciagnac sie w nieskonczonosc: przy 24 kafelkach
          // 0.07s odstepu to prawie 2s zanim ostatni sie pokaze.
          stagger: Math.min(stagger, 0.85 / Math.max(1, el.children.length)),
          ease: "power3.out",
          clearProps: "transform",
        }
      ),
    [y, stagger]
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/** Zdjecie odslaniane kurtyna od dolu + dojazd skali. */
export function CurtainImageReveal({ src, alt = "", className = "", imgClassName = "" }) {
  const box = useRef(null);
  const img = useRef(null);
  useLayoutEffect(() => {
    if (reduced() || !box.current) return;
    gsap.set(box.current, { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" });
    if (img.current) gsap.set(img.current, { scale: 1.25 });
  }, []);
  useInView(box, (el) => {
    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)", duration: 1.2, ease: "power3.inOut" }
    );
    if (img.current)
      gsap.fromTo(img.current, { scale: 1.25 }, { scale: 1, duration: 1.4, ease: "power3.out" });
  });
  return (
    <div ref={box} className={`relative overflow-hidden ${className}`}>
      <img ref={img} src={src} alt={alt} className={`w-full h-full object-cover ${imgClassName}`} />
    </div>
  );
}

/** Miekkie wejscie pojedynczego bloku. */
export function FadeUp({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    if (reduced() || !ref.current) return;
    gsap.set(ref.current, { y: 26, opacity: 0 });
  }, []);
  useInView(
    ref,
    (el) =>
      gsap.fromTo(
        el,
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, delay, ease: "power3.out", clearProps: "transform" }
      ),
    [delay]
  );
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
