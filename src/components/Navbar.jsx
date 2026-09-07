import React, { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { nav, clinic } from "../data/clinicData";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-nowrap items-center justify-between gap-3 xl:gap-6 px-5 sm:px-10 py-4 bg-[#221316]/92 backdrop-blur-md border-b border-[#842126]/30">
        <a href="#hero" className="min-w-0 flex items-center gap-2 shrink-0 mr-1">
          <span className="font-serif text-xl sm:text-2xl tracking-wide text-[#FAF8F8] leading-normal pb-0.5">
            Byrska<span className="text-[#E08D93]">Dentic</span>
          </span>
        </a>

        <nav className="hidden lg:flex flex-nowrap items-center gap-3 xl:gap-6 min-w-0">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[10px] xl:text-xs uppercase tracking-[0.04em] xl:tracking-[0.12em] text-[#FAF8F8]/80 hover:text-[#E08D93] transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href={clinic.telefonHref}
          className="hidden lg:flex flex-nowrap whitespace-nowrap items-center gap-2 border border-[#842126] bg-[#842126]/20 text-[#FAF8F8] text-[10px] xl:text-xs uppercase tracking-[0.04em] xl:tracking-[0.12em] px-3.5 xl:px-4 py-2 rounded-full hover:bg-[#842126] hover:text-white transition-colors shrink-0 shadow-sm"
        >
          <Phone size={14} className="text-[#E08D93]" /> {clinic.telefon}
        </a>

        <button
          onClick={() => setOpen(true)}
          className="lg:hidden shrink-0 text-[#FAF8F8]"
          aria-label="Otwórz menu"
        >
          <Menu size={26} />
        </button>
      </div>

      {open && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-[#221316] flex flex-col">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#842126]/25">
            <span className="font-serif text-xl text-[#FAF8F8]">
              Byrska<span className="text-[#E08D93]">Dentic</span>
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[#FAF8F8] shrink-0"
              aria-label="Zamknij menu"
            >
              <X size={26} />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-5 py-8 overflow-y-auto">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 border-b border-[#842126]/15 text-[#FAF8F8] font-serif text-2xl"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto mx-5 mb-8 flex flex-col gap-2.5">
            <a
              href={clinic.telefonHref}
              className="text-center border border-[#842126] bg-[#842126] text-white uppercase tracking-[0.12em] px-4 py-3.5 rounded-full shadow-md font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Phone size={16} /> Zadzwoń: {clinic.telefon}
            </a>
            <a
              href={`mailto:${clinic.email}`}
              className="text-center border border-white/20 bg-white/10 text-[#FAF8F8] uppercase tracking-[0.12em] px-4 py-3 rounded-full font-medium text-xs flex items-center justify-center gap-2"
            >
              {clinic.email}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
