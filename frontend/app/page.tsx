"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import FooterSection from './components/FooterSection';
import BackToTopButton from './components/BackToTopButton';

export default function Portfolio() {
  const BOTTOM_THRESHOLD_PX = 140;

  const prefersDark = useSyncExternalStore(
    (onStoreChange) => {
      if (typeof window === 'undefined') {
        return () => {};
      }

      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', onStoreChange);
      return () => mediaQuery.removeEventListener('change', onStoreChange);
    },
    () => {
      if (typeof window === 'undefined') {
        return false;
      }

      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    () => false,
  );

  const [themeOverride, setThemeOverride] = useState<boolean | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [showBottomTopButton, setShowBottomTopButton] = useState(false);
  const scrollAnimationRef = useRef<number | null>(null);
  const orbRefs = useRef<Array<HTMLDivElement | null>>([]);
  const darkMode = themeOverride ?? prefersDark;

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);

          const distanceFromBottom =
            document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
          setShowBottomTopButton(distanceFromBottom <= BOTTOM_THRESHOLD_PX);

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      if (scrollAnimationRef.current !== null) {
        window.cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const orbs = orbRefs.current.filter((orb): orb is HTMLDivElement => orb !== null);
    if (orbs.length === 0) {
      return;
    }

    const randomSpeed = () => (Math.random() * 0.35 + 0.18) * (Math.random() < 0.5 ? -1 : 1);

    const states = orbs.map((orb) => {
      const orbWidth = orb.offsetWidth;
      const orbHeight = orb.offsetHeight;
      const maxX = Math.max(window.innerWidth - orbWidth, 0);
      const maxY = Math.max(window.innerHeight - orbHeight, 0);

      return {
        orb,
        x: Math.random() * maxX,
        y: Math.random() * maxY,
        vx: randomSpeed(),
        vy: randomSpeed(),
      };
    });

    const positionOrbs = () => {
      states.forEach((state) => {
        state.orb.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      });
    };

    positionOrbs();

    let animationFrameId: number;

    const step = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      states.forEach((state) => {
        const orbWidth = state.orb.offsetWidth;
        const orbHeight = state.orb.offsetHeight;
        const maxX = Math.max(viewportWidth - orbWidth, 0);
        const maxY = Math.max(viewportHeight - orbHeight, 0);

        state.x += state.vx;
        state.y += state.vy;

        if (state.x <= 0 || state.x >= maxX) {
          state.vx = -state.vx * (0.95 + Math.random() * 0.1);
          state.x = Math.min(Math.max(state.x, 0), maxX);
        }

        if (state.y <= 0 || state.y >= maxY) {
          state.vy = -state.vy * (0.95 + Math.random() * 0.1);
          state.y = Math.min(Math.max(state.y, 0), maxY);
        }

        state.orb.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
      });

      animationFrameId = window.requestAnimationFrame(step);
    };

    const handleResize = () => {
      states.forEach((state) => {
        const maxX = Math.max(window.innerWidth - state.orb.offsetWidth, 0);
        const maxY = Math.max(window.innerHeight - state.orb.offsetHeight, 0);
        state.x = Math.min(state.x, maxX);
        state.y = Math.min(state.y, maxY);
      });
      positionOrbs();
    };

    window.addEventListener('resize', handleResize);
    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const smoothScrollTo = (targetY: number) => {
    if (scrollAnimationRef.current !== null) {
      window.cancelAnimationFrame(scrollAnimationRef.current);
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    const distanceAbs = Math.abs(distance);
    const duration = Math.min(1300, Math.max(550, distanceAbs * 0.8));
    const startTime = performance.now();

    const easeInOutCubic = (t: number) => {
      if (t < 0.5) {
        return 4 * t * t * t;
      }

      return 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        scrollAnimationRef.current = window.requestAnimationFrame(step);
      } else {
        scrollAnimationRef.current = null;
      }
    };

    scrollAnimationRef.current = window.requestAnimationFrame(step);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) {
      return;
    }

    const navOffset = 40; // Navbar height
    const targetY = Math.max(section.getBoundingClientRect().top + window.scrollY - navOffset, 0);
    smoothScrollTo(targetY);
  };

  const scrollToTop = () => {
    smoothScrollTo(0);
  };

  return (
    <div className={`relative min-h-screen transition-colors duration-500 ${darkMode ? 'bg-black' : 'bg-white'}`}>
      <style>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes skillsMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .skills-track {
          animation: skillsMarquee 60s linear infinite;
          will-change: transform;
        }
        .skills-track:hover {
          animation-play-state: paused;
        }
        @keyframes fadeInOpacity {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .fade-in-soft {
          animation: fadeInOpacity 0.65s ease-out both;
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(131, 140, 229, 0.5); }
          50% { box-shadow: 0 0 40px rgba(80, 32, 122, 0.8), 0 0 60px rgba(131, 140, 229, 0.4); }
        }
        .glow-animation {
          animation: glow 3s ease-in-out infinite;
        }
        .orb {
          position: absolute;
          top: 0;
          left: 0;
          border-radius: 9999px;
          filter: blur(68px);
          opacity: 0.24;
          will-change: transform;
        }
        .orb-a {
          width: 20rem;
          height: 20rem;
        }
        .orb-b {
          width: 22rem;
          height: 22rem;
        }
        .orb-c {
          width: 18rem;
          height: 18rem;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
        <div ref={(el) => { orbRefs.current[0] = el; }} className={`orb orb-a ${darkMode ? 'bg-[#838ce5]' : 'bg-[#d6b9fc]'}`} />
        <div ref={(el) => { orbRefs.current[1] = el; }} className={`orb orb-b ${darkMode ? 'bg-[#50207A]' : 'bg-[#838ce5]'}`} />
        <div ref={(el) => { orbRefs.current[2] = el; }} className={`orb orb-c ${darkMode ? 'bg-[#d6b9fc]' : 'bg-[#50207A]'}`} />
      </div>

      <div className="relative z-10">

      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => {
          setThemeOverride((prev) => {
            if (prev === null) {
              return !prefersDark;
            }

            return !prev;
          });
        }}
        scrollToSection={scrollToSection}
        scrollToTop={scrollToTop}
      />
      <HeroSection darkMode={darkMode} scrollToSection={scrollToSection} scrollY={scrollY} />
      <AboutSection darkMode={darkMode} scrollY={scrollY} />
      <SkillsSection darkMode={darkMode} />
      <ProjectsSection darkMode={darkMode} />
      <EducationSection darkMode={darkMode} />
      <ContactSection darkMode={darkMode} />
      <FooterSection darkMode={darkMode} />

      <BackToTopButton darkMode={darkMode} visible={showBottomTopButton} onClick={scrollToTop} />
      </div>
    </div>
  );
}


