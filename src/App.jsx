import React, { useRef, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import CookieConsent from './components/CookieConsent';
import CinematicCameraCanvas from './components/CinematicCameraCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import PricingSection from './components/PricingSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const heroWrapperRef = useRef(null);
  const heroInnerRef = useRef(null);
  const heroOverlayRef = useRef(null);

  const mainContentRef = useRef(null);
  const mainContentInnerRef = useRef(null);
  const mainContentOverlayRef = useRef(null);

  const contactSectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const mm = gsap.matchMedia();

    // Na desktopie (>= 768px): luksusowy efekt kurtyny z przypięciem Hero
    // Na mobile: naturalne płynne przewijanie bez przycinania kart i godzin
    mm.add('(min-width: 768px)', () => {
      ScrollTrigger.create({
        trigger: heroWrapperRef.current,
        start: 'top top',
        endTrigger: mainContentRef.current,
        end: 'top top',
        pin: true,
        pinSpacing: false,
      });

      const tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: mainContentRef.current,
          start: 'top bottom',
          end: 'top top',
          scrub: true,
        },
      });
      tl1.to(heroInnerRef.current, { scale: 0.95, y: 40, ease: 'none' }, 0);
      tl1.to(heroOverlayRef.current, { opacity: 0.8, ease: 'none' }, 0);
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <CookieConsent />
      <CinematicCameraCanvas />

      <div className="text-[#221316] font-sans antialiased selection:bg-[#842126] selection:text-white flex flex-col relative z-10 overflow-x-clip">
        <Navbar />

        <main className="flex-grow">
          <div className="relative z-10 w-full bg-[#FAF8F8]" ref={heroWrapperRef}>
            <div ref={heroInnerRef} className="w-full origin-top will-change-transform transform-gpu">
              <Hero />
              <div
                ref={heroOverlayRef}
                className="absolute inset-0 bg-[#FAF8F8] opacity-0 pointer-events-none z-50"
              />
            </div>
          </div>

          <div
            ref={mainContentRef}
            className="relative z-20 w-full bg-[#FAF8F8] rounded-t-[36px] sm:rounded-t-[56px] shadow-[0_-30px_70px_rgba(34,19,22,0.12)] border-t border-[#842126]/[0.14]"
          >
            <div ref={mainContentInnerRef} className="w-full h-full origin-bottom">
              <AboutSection />
              <ServicesSection />
              <PricingSection />
              <div
                ref={mainContentOverlayRef}
                className="absolute inset-0 bg-[#FAF8F8] opacity-0 pointer-events-none z-50 rounded-t-[36px] sm:rounded-t-[56px] will-change-opacity transform-gpu"
              />
            </div>
          </div>

          {/* Galeria */}
          <div className="relative z-20 w-full bg-[#FAF8F8]">
            <GallerySection />
          </div>

          <div
            ref={contactSectionRef}
            className="relative z-30 bg-[#EDE4E6] rounded-t-[36px] sm:rounded-t-[52px] shadow-[0_-10px_30px_rgba(34,19,22,0.06)] border-t border-[#842126]/[0.14] transform-gpu will-change-transform"
          >
            <ContactSection />
            <Footer />
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}
