import React from "react";
import { nav, clinic } from "../data/clinicData";

export default function Footer() {
  return (
    <footer className="px-4 sm:px-6 lg:px-8 pb-12 pt-6">
      <div className="max-w-5xl mx-auto">
        <nav className="flex flex-wrap gap-x-7 gap-y-3 pb-8 border-b border-[#842126]/20">
          {nav.map((item) => (
            <a key={item.href} href={item.href} data-cursor-hover
               className="text-xs uppercase tracking-[0.15em] text-[#221316]/65 hover:text-[#842126] transition-colors">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="pt-8 grid gap-2">
          <p className="font-serif text-2xl text-[#221316] font-medium">{clinic.stopkaDomena}</p>
          <p className="text-[11px] text-[#221316]/55 leading-relaxed">{clinic.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
