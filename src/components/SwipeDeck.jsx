import React from "react";

/**
 * Duze zbiory kart (prace pacjentow, artykuly) - na mobile poziomy swipe ze snapem,
 * od `sm` w gore normalna siatka. Pionowa lista 20+ kart na telefonie to kilometr
 * scrolla; w poprzek uzytkownik przegląda je kciukiem i nic nie gubi.
 *
 * Bez JS - samo CSS, wiec dziala tez przy prefers-reduced-motion.
 */
export default function SwipeDeck({ children, cols = "sm:grid-cols-2 lg:grid-cols-3", className = "" }) {
  return (
    <div
      className={`flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:grid ${cols} sm:gap-3.5 sm:overflow-visible sm:mx-0 sm:px-0 sm:pb-0 [&>*]:shrink-0 [&>*]:w-[80vw] [&>*]:snap-center sm:[&>*]:w-auto ${className}`}
    >
      {children}
    </div>
  );
}
