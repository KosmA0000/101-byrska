import React, { useState } from "react";
import { Plus, ReceiptText } from "lucide-react";
import { MaskedHeading } from "./Reveal";
import { cennik } from "../data/clinicData";

export default function PricingSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (e, index) => {
    e.preventDefault();
    setOpenIndex(openIndex !== index ? index : null);
  };

  return (
    <section
      id="cennik"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#221316] border-t border-[#842126]/30"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#E08D93]/40 text-xs font-semibold uppercase tracking-widest text-[#E08D93]">
            <ReceiptText className="w-3.5 h-3.5" />
            Cennik
          </div>
          <MaskedHeading className="text-3xl sm:text-5xl font-serif font-medium text-[#FAF8F8] tracking-tight leading-[1.2] sm:leading-[1.2]">
            Cennik i finansowanie
          </MaskedHeading>
        </div>

        <div className="border-t border-[#842126]/35">
          {cennik.map((g, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={g.tytul + i}
                className="border-b border-[#842126]/35"
              >
                <button
                  type="button"
                  data-cursor-hover
                  onClick={(e) => toggleItem(e, i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group cursor-pointer"
                >
                  <span className="flex items-baseline gap-3 min-w-0">
                    <span className="font-serif text-xl sm:text-3xl text-[#FAF8F8] group-hover:text-[#E08D93] transition-colors leading-snug pb-1">
                      {g.tytul}
                    </span>
                    {g.wiersze.length > 0 && (
                      <span className="text-[11px] uppercase tracking-wider text-[#E08D93]/75 shrink-0">
                        {g.wiersze.length} poz.
                      </span>
                    )}
                  </span>
                  <Plus
                    className={
                      "w-6 h-6 shrink-0 text-[#E08D93] transition-transform duration-350 " +
                      (isOpen ? "rotate-45" : "")
                    }
                    strokeWidth={1.4}
                  />
                </button>

                <div
                  className={
                    "grid transition-[grid-template-rows] duration-350 ease-out " +
                    (isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")
                  }
                  style={{ willChange: "grid-template-rows" }}
                >
                  <div className="overflow-hidden min-h-0">
                    <div className="pb-8 grid gap-2">
                      {g.wiersze.map((w, r) => (
                        <div
                          key={w.nazwa + r}
                          className="rounded-2xl bg-white/[0.05] border border-[#842126]/30 px-4 py-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 hover:border-[#842126]/60 transition-colors"
                        >
                          <span className="flex-1 text-sm text-[#FAF8F8]/85 leading-relaxed">
                            {w.nazwa}
                          </span>
                          <span className="font-serif text-lg text-[#E08D93] shrink-0 sm:text-right sm:min-w-[9rem] font-medium">
                            {w.cena}
                          </span>
                        </div>
                      ))}
                      {g.uwagi.map((u, k) => (
                        <p key={k} className="px-1 pt-2 text-xs text-[#FAF8F8]/60 leading-relaxed">
                          {u}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
