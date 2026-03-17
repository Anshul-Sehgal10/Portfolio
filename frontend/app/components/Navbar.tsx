"use client";

import { Playfair_Display } from 'next/font/google';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['600', '700'],
});

type NavbarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  scrollToSection: (id: string) => void;
  scrollToTop: () => void;
};

export default function Navbar({ darkMode, onToggleDarkMode, scrollToSection, scrollToTop }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavigate = (id: string) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled
          ? darkMode
            ? 'bg-black/55 shadow-lg shadow-[#50207A]/10 border-b border-[#838ce5]/30'
            : 'bg-white/55 shadow-lg border-b border-[#838ce5]/35'
          : 'bg-transparent'
      } backdrop-blur-xl`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <button
            onClick={scrollToTop}
            className={`${playfair.className} text-3xl font-semibold tracking-wide lowercase transition-all duration-300 hover:scale-105 ${
              darkMode ? 'text-white hover:text-white' : 'text-black hover:text-black'
            }`}
          >
            anshul
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => handleNavigate('about')} className={`font-medium transition-all duration-300 hover:scale-110 ${darkMode ? 'text-white/90 hover:text-white' : 'text-black/90 hover:text-black'}`}>About</button>
            <button onClick={() => handleNavigate('skills')} className={`font-medium transition-all duration-300 hover:scale-110 ${darkMode ? 'text-white/90 hover:text-white' : 'text-black/90 hover:text-black'}`}>Skills</button>
            <button onClick={() => handleNavigate('projects')} className={`font-medium transition-all duration-300 hover:scale-110 ${darkMode ? 'text-white/90 hover:text-white' : 'text-black/90 hover:text-black'}`}>Projects</button>
            <button onClick={() => handleNavigate('education')} className={`font-medium transition-all duration-300 hover:scale-110 ${darkMode ? 'text-white/90 hover:text-white' : 'text-black/90 hover:text-black'}`}>Education</button>
            <button onClick={() => handleNavigate('contact')} className={`font-medium transition-all duration-300 hover:scale-110 ${darkMode ? 'text-white/90 hover:text-white' : 'text-black/90 hover:text-black'}`}>Contact</button>
            <a
              href="/Resume/Anshul_Resume.pdf"
              download="Anshul_Resume.pdf"
              className={`font-medium transition-all duration-300 hover:scale-110 ${darkMode ? 'text-white/90 hover:text-white' : 'text-black/90 hover:text-black'}`}
            >
              Resume
            </a>

            <button
              onClick={onToggleDarkMode}
              className={`p-2.5 rounded-xl transition-all duration-300 hover:scale-110 ${darkMode ? 'bg-black/70 text-white hover:bg-[#50207A] hover:text-white' : 'bg-white text-black/90 hover:bg-[#50207A] hover:text-white'}`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={onToggleDarkMode} className={`p-2.5 rounded-xl transition-all duration-300 ${darkMode ? 'bg-black/70 text-white' : 'bg-white text-black/90'}`}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setMobileMenuOpen((prev) => !prev)} className={`p-2 transition-all duration-300 hover:scale-110 ${darkMode ? 'text-white/90' : 'text-black/90'}`}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className={`rounded-2xl border p-3 shadow-2xl backdrop-blur-lg ${darkMode ? 'bg-black/80 border-[#838ce5]/30 shadow-[#50207A]/20' : 'bg-white/85 border-[#838ce5]/35 shadow-[#50207A]/10'}`}>
              <div className="flex flex-col gap-2">
              <button onClick={() => handleNavigate('about')} className={`text-left px-3 py-2.5 rounded-xl transition-all duration-300 hover:translate-x-1 ${darkMode ? 'text-white/90 hover:text-white hover:bg-[#50207A]/40' : 'text-black/90 hover:text-black hover:bg-[#d6b9fc]/35'}`}>About</button>
              <button onClick={() => handleNavigate('skills')} className={`text-left px-3 py-2.5 rounded-xl transition-all duration-300 hover:translate-x-1 ${darkMode ? 'text-white/90 hover:text-white hover:bg-[#50207A]/40' : 'text-black/90 hover:text-black hover:bg-[#d6b9fc]/35'}`}>Skills</button>
              <button onClick={() => handleNavigate('projects')} className={`text-left px-3 py-2.5 rounded-xl transition-all duration-300 hover:translate-x-1 ${darkMode ? 'text-white/90 hover:text-white hover:bg-[#50207A]/40' : 'text-black/90 hover:text-black hover:bg-[#d6b9fc]/35'}`}>Projects</button>
              <button onClick={() => handleNavigate('education')} className={`text-left px-3 py-2.5 rounded-xl transition-all duration-300 hover:translate-x-1 ${darkMode ? 'text-white/90 hover:text-white hover:bg-[#50207A]/40' : 'text-black/90 hover:text-black hover:bg-[#d6b9fc]/35'}`}>Education</button>
              <button onClick={() => handleNavigate('contact')} className={`text-left px-3 py-2.5 rounded-xl transition-all duration-300 hover:translate-x-1 ${darkMode ? 'text-white/90 hover:text-white hover:bg-[#50207A]/40' : 'text-black/90 hover:text-black hover:bg-[#d6b9fc]/35'}`}>Contact</button>
              <a
                href="/Resume/Anshul_Resume.pdf"
                download="Anshul_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className={`text-left px-3 py-2.5 rounded-xl transition-all duration-300 hover:translate-x-1 ${darkMode ? 'text-white/90 hover:text-white hover:bg-[#50207A]/40' : 'text-black/90 hover:text-black hover:bg-[#d6b9fc]/35'}`}
              >
                Resume
              </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}