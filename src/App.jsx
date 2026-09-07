import React from 'react';
import SmoothScroll from './components/SmoothScroll';
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

export default function App() {
  return (
    <SmoothScroll>
      <CookieConsent />
      <CinematicCameraCanvas />

      <div className="text-[#221316] font-sans antialiased selection:bg-[#842126] selection:text-white flex flex-col relative z-10 overflow-x-clip">
        <Navbar />

        <main className="flex-grow">
          {/* Hero */}
          <div className="relative z-10 w-full bg-[#FAF8F8]">
            <Hero />
          </div>

          {/* Glowna tresc gabinetu: O nas, Uslugi, Sprzet, Cennik, Galeria */}
          <div className="relative z-20 w-full bg-[#FAF8F8] rounded-t-[36px] sm:rounded-t-[56px] shadow-[0_-30px_70px_rgba(34,19,22,0.12)] border-t border-[#842126]/[0.14]">
            <AboutSection />
            <ServicesSection />
            <PricingSection />
            <GallerySection />
          </div>

          {/* Kontakt, Rejestracja i Stopka */}
          <div className="relative z-30 bg-[#EDE4E6] rounded-t-[36px] sm:rounded-t-[52px] shadow-[0_-10px_30px_rgba(34,19,22,0.06)] border-t border-[#842126]/[0.14]">
            <ContactSection />
            <Footer />
          </div>
        </main>
      </div>
    </SmoothScroll>
  );
}
