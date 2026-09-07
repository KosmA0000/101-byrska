import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    function onOver(e) {
      const hoverable = e.target.closest("a,button,[data-cursor-hover]");
      ring.style.width = hoverable ? "56px" : "32px";
      ring.style.height = hoverable ? "56px" : "32px";
      ring.style.opacity = hoverable ? "0.9" : "0.5";
    }

    let raf;
    function loop() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(loop);
    }
    loop();

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="hidden md:block pointer-events-none fixed inset-0 z-[999]">
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#842126] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#842126]/70 -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-200 ease-out"
      />
    </div>
  );
}
