"use client";

import Image from 'next/image';
import { useState } from 'react';

type AboutSectionProps = {
  darkMode: boolean;
  scrollY: number;
};

export default function AboutSection({ darkMode, scrollY }: AboutSectionProps) {
  const [aboutCardFlipped, setAboutCardFlipped] = useState(false);
  const sectionParallax = Math.min(Math.max((scrollY - 260) * 0.02, 0), 18);
  const aboutText =
    'I am a Computer Science Engineering student at Chitkara University with a deep passion for web development and creating impactful digital solutions. My journey in tech has led me to master both front-end and back-end technologies, allowing me to build complete, scalable applications from the ground up. I thrive on solving complex problems, learning new technologies, and turning ideas into functional, user-friendly products. Whether it is crafting responsive interfaces or architecting robust server-side logic, I am committed to writing clean, maintainable code that makes a difference.';

  return (
    <section
      id="about"
      className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{
        background: darkMode
          ? 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(131, 140, 229, 0.16) 0%, rgba(80, 32, 122, 0.16) 38%, rgba(0, 0, 0, 0) 94%)'
          : 'radial-gradient(ellipse 70% 55% at 50% 50%, rgba(214, 185, 252, 0.38) 0%, rgba(131, 140, 229, 0.16) 38%, rgba(255, 255, 255, 0) 94%)',
      }}
    >
      <div className="max-w-6xl mx-auto" style={{ transform: `translateY(${sectionParallax}px)` }}>
        <div className="mb-8 text-center">
          <div className="inline-flex flex-col items-center">
            <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>
              About Me
            </h2>
            <div className={`mt-3 h-1 w-[72%] rounded-full ${darkMode ? 'bg-gradient-to-r from-[#838ce5] to-[#d6b9fc]' : 'bg-gradient-to-r from-[#50207A] to-[#838ce5]'}`} />
          </div>
        </div>

        <div className="md:hidden mb-6">
          <button
            type="button"
            onClick={() => setAboutCardFlipped((prev) => !prev)}
            className="w-full text-left"
            aria-label="Flip about card"
          >
            <div className="relative w-full max-w-md mx-auto aspect-3/4" style={{ perspective: '1200px' }}>
              <div
                className="relative h-full w-full transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: aboutCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                <div
                  className={`absolute inset-0 p-6 rounded-2xl ${darkMode ? 'bg-black/50 border border-[#838ce5]/20' : 'bg-white border border-[#838ce5]/35'} shadow-xl`}
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <p className={`text-base leading-relaxed ${darkMode ? 'text-white/90' : 'text-black/90'}`}>
                    {aboutText}
                  </p>
                </div>

                <div
                  className="absolute inset-0"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                  }}
                >
                  <Image
                    src="/Real_pfp2.png"
                    alt="Anshul real profile photo"
                    fill
                    sizes="(max-width: 768px) 90vw, 420px"
                    className="rounded-2xl object-cover border border-[#838ce5]/40 shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </button>
        </div>

        <div className="hidden md:grid md:grid-cols-[auto_1fr] items-center gap-10 md:gap-14">
          <div className={`p-8 rounded-2xl transition-all duration-300 hover:scale-[1.02] md:order-2 md:text-right ${darkMode ? 'bg-black/50 border border-[#838ce5]/20 hover:border-[#838ce5]/40' : 'bg-white border border-[#838ce5]/35 hover:border-[#838ce5]'} shadow-xl hover:shadow-2xl`}>
            <p className={`text-lg leading-relaxed ${darkMode ? 'text-white/90' : 'text-black/90'}`}>
              {aboutText}
            </p>
          </div>

          <div className="justify-self-center md:justify-self-start md:order-1">
            <button
              type="button"
              onClick={() => setAboutCardFlipped((prev) => !prev)}
              className="group text-left"
              aria-label="Flip profile card"
            >
              <div className="relative w-64 sm:w-72 md:w-80 aspect-3/4" style={{ perspective: '1200px' }}>
                <div
                  className="relative h-full w-full transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: aboutCardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden' }}>
                    <Image
                      src="/Anime_Profile_Pic2.png"
                      alt="Anshul anime profile card"
                      fill
                      sizes="(max-width: 768px) 70vw, 320px"
                      className="rounded-2xl object-cover border border-[#838ce5]/40 shadow-2xl"
                    />
                  </div>

                  <div
                    className="absolute inset-0"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <Image
                      src="/Real_pfp2.png"
                      alt="Anshul real profile card"
                      fill
                      sizes="(max-width: 768px) 70vw, 320px"
                      className="rounded-2xl object-cover border border-[#838ce5]/40 shadow-2xl"
                    />
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}