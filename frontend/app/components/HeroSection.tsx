import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MessageCircleMore, X } from 'lucide-react';

type HeroSectionProps = {
  darkMode: boolean;
  scrollToSection: (id: string) => void;
  scrollY: number;
};

export default function HeroSection({ darkMode, scrollToSection, scrollY }: HeroSectionProps) {
  const [isMobile, setIsMobile] = useState(false);
  const imageParallax = isMobile ? 0 : Math.min(scrollY * 0.12, 80);
  const ambientParallax = Math.min(scrollY * 0.24, 180);
  const [ctaOpen, setCtaOpen] = useState(false);

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  return (
    <section
      className="min-h-svh pt-14 sm:pt-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: darkMode
          ? 'radial-gradient(ellipse 82% 62% at 50% 100%, rgba(131, 140, 229, 0.5) 0%, rgba(80, 32, 122, 0.45) 38%, rgba(0, 0, 0, 1) 76%)'
          : 'radial-gradient(ellipse 82% 62% at 50% 100%, rgba(214, 185, 252, 0.92) 0%, rgba(131, 140, 229, 0.5) 36%, rgba(255, 255, 255, 1) 78%)',
      }}
    >
      <div className="w-full">
        <div className="relative flex flex-col justify-end min-h-[calc(100svh-3rem)] sm:min-h-[calc(100svh-6rem)] fade-in-soft">
          <div
            aria-hidden="true"
            className={`absolute top-[12%] -left-24 h-72 w-72 rounded-full blur-3xl ${darkMode ? 'bg-[#838ce5]/25' : 'bg-[#d6b9fc]/45'}`}
            style={{ transform: `translateY(${ambientParallax}px)` }}
          />
          <div
            aria-hidden="true"
            className={`absolute top-[20%] -right-20 h-64 w-64 rounded-full blur-3xl ${darkMode ? 'bg-[#50207A]/30' : 'bg-[#838ce5]/35'}`}
            style={{ transform: `translateY(${ambientParallax * 0.7}px)` }}
          />

          <h1
            aria-hidden="true"
            className={`absolute inset-0 flex items-center justify-center -translate-y-[16%] sm:-translate-y-[8%] text-center font-semibold tracking-tight leading-[0.92] pointer-events-none select-none ${darkMode ? 'text-white/25' : 'text-black/25'} text-[clamp(4.6rem,20vw,7.4rem)] sm:text-[clamp(3.2rem,11vw,10.8rem)]`}
          >
            <span className="px-1">
              <span className="block sm:inline">Hi, I am</span>
              <span className="block sm:inline"> Anshul</span>
            </span>
          </h1>

          <div className="relative z-10 w-full flex justify-center mt-auto" style={{ transform: `translateY(${imageParallax}px)` }}>
            <Image
              src="/Anime_Profile_Pic2.png"
              alt="Anshul profile picture"
              width={900}
              height={1200}
              sizes="(max-width: 640px) 104vw, (max-width: 768px) 90vw, 36rem"
              className="w-[min(104vw,30rem)] sm:w-[min(90vw,36rem)] h-auto"
              priority
            />
          </div>

          <div className="hidden sm:flex absolute left-4 lg:left-6 bottom-4 z-20 gap-4">
            <button
              onClick={() => scrollToSection('contact')}
              className={`px-6 py-3 text-base rounded-xl border-2 bg-transparent font-semibold transition-all duration-300 hover:scale-105 ${darkMode ? 'text-white border-[#838ce5] hover:bg-[#838ce5]/20' : 'text-black border-[#838ce5] hover:bg-[#838ce5]/10'}`}
            >
              Contact Me
            </button>
            <a
              href="/Resume/Anshul_Resume.pdf"
              download="Anshul_Resume.pdf"
              className={`px-6 py-3 text-base rounded-xl border-2 bg-transparent font-semibold transition-all duration-300 hover:scale-105 ${darkMode ? 'text-white border-[#d6b9fc] hover:bg-[#d6b9fc]/20' : 'text-black border-[#50207A] hover:bg-[#d6b9fc]/45'}`}
            >
              Resume
            </a>
          </div>

          <div className="absolute right-3 bottom-3 z-30 flex sm:hidden flex-col items-end gap-3">
            <div
              className={`origin-bottom-right transition-all duration-300 ${
                ctaOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
              }`}
            >
              <div className={`p-2 rounded-2xl border backdrop-blur-md ${darkMode ? 'bg-black/45 border-[#838ce5]/35' : 'bg-white/75 border-[#838ce5]/45'}`}>
                <div className="flex flex-col gap-2 min-w-42">
                  <button
                    onClick={() => {
                      setCtaOpen(false);
                      scrollToSection('contact');
                    }}
                    className={`w-full px-4 py-2.5 text-sm rounded-xl border-2 bg-transparent font-semibold transition-all duration-300 hover:scale-[1.02] ${darkMode ? 'text-white border-[#838ce5] hover:bg-[#838ce5]/20' : 'text-black border-[#838ce5] hover:bg-[#838ce5]/10'}`}
                  >
                    Contact Me
                  </button>
                  <a
                    href="/Resume/Anshul_Resume.pdf"
                    download="Anshul_Resume.pdf"
                    onClick={() => setCtaOpen(false)}
                    className={`w-full text-center px-4 py-2.5 text-sm rounded-xl border-2 bg-transparent font-semibold transition-all duration-300 hover:scale-[1.02] ${darkMode ? 'text-white border-[#d6b9fc] hover:bg-[#d6b9fc]/20' : 'text-black border-[#50207A] hover:bg-[#d6b9fc]/45'}`}
                  >
                    Resume
                  </a>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCtaOpen((prev) => !prev)}
              aria-label={ctaOpen ? 'Close quick actions' : 'Open quick actions'}
              className={`h-12 w-12 sm:h-14 sm:w-14 rounded-full border-2 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-105 ${darkMode ? 'bg-black/75 border-[#838ce5] text-white' : 'bg-white/90 border-[#50207A] text-black'}`}
            >
              {ctaOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageCircleMore className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}