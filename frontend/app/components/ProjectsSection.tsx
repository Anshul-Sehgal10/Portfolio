"use client";

import { Github, Bot, Plus, ShoppingCart, FileText, type LucideIcon } from 'lucide-react';
import { useState } from 'react';

type ProjectsSectionProps = {
  darkMode: boolean;
};

type Project = {
  title: string;
  description: string;
  tech: string[];
  github: string;
  image: string;
  icon: LucideIcon;
};

const projects: Project[] = [
  {
    title: 'LocalAI',
    description: 'Privacy-first AI platform enabling users to run local LLMs via Ollama with zero data leakage. Supports hybrid mode with online APIs (Gemini) for complex tasks, integrated RAG pipeline for contextual retrieval, and document-based querying for offline intelligence.',
    tech: ['Next.js', 'Ollama', 'SQLite', 'MySQL', 'RAG', 'LLMs'],
    github: 'https://github.com/Anshul-Sehgal10/localai',
    image: '/Projects/LocalAi.png',
    icon: Bot,
  },
  {
    title: 'MedNexus',
    description: 'Healthcare platform combining ML-based disease prediction (Random Forest) with real-time patient-doctor interaction. Features AI chat (Gemini), emergency alert system using geolocation, verified medical professionals, and live communication via WebSockets.',
    tech: ['Next.js', 'MongoDB', 'WebSockets', 'Machine Learning', 'Gemini API'],
    github: 'https://github.com/Anshul-Sehgal10/mednexus',
    image: '/Projects/MedNexus.png',
    icon: Plus,
  },
  {
    title: 'NeoShop',
    description: 'Full-stack e-commerce platform implementing SSR, CSR, and Server Components. Includes product catalog with filtering, ISR-based product pages, real-time inventory dashboard, admin panel, recommendations system, and secure API-based authentication.',
    tech: ['Next.js', 'PostgreSQL', 'Tailwind CSS', 'Node.js'],
    github: 'https://github.com/eyesee11/neoshop',
    image: '/Projects/NeoShop.png',
    icon: ShoppingCart,
  },
  {
    title: 'Portfolio Website',
    description: 'Modern developer portfolio showcasing projects and skills with responsive design, optimized performance, and clean UI/UX built using Next.js and Tailwind CSS.',
    tech: ['Next.js', 'React', 'Tailwind CSS'],
    github: 'https://github.com/Anshul-Sehgal10/portfolio',
    image: '/Projects/Portfolio.png',
    icon: FileText,
  }
];

export default function ProjectsSection({ darkMode }: ProjectsSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(event.touches[0]?.clientX ?? null);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) {
      return;
    }

    const endX = event.changedTouches[0]?.clientX ?? touchStartX;
    const deltaX = endX - touchStartX;
    const swipeThreshold = 45;

    if (deltaX > swipeThreshold) {
      goToPrev();
    } else if (deltaX < -swipeThreshold) {
      goToNext();
    }

    setTouchStartX(null);
  };

  const renderCard = (project: Project, index: number) => {
    const ProjectIcon = project.icon;

    return (
      <div
        key={index}
        className={`group w-full h-full min-h-[38rem] md:min-h-0 rounded-2xl overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 ${darkMode ? 'bg-black/50 border border-[#838ce5]/20 hover:border-[#838ce5]/30 shadow-xl shadow-[#50207A]/5 hover:shadow-xl hover:shadow-[#50207A]/15' : 'bg-white border border-[#838ce5]/35 hover:border-[#838ce5]/80 shadow-lg hover:shadow-xl hover:shadow-[#50207A]/10'}`}
      >
        <div className="relative overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-black via-black/50 to-transparent opacity-60 group-hover:opacity-50' : 'from-white/70 via-white/20 to-transparent opacity-35 group-hover:opacity-25'} transition-opacity duration-300`} />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
              {project.title}
            </h3>
            <ProjectIcon className={`w-8 h-8 shrink-0 transition-transform duration-300 group-hover:scale-105 ${darkMode ? 'text-white' : 'text-black'}`} />
          </div>

          <div className="flex-1">
            <p className={`mb-4 leading-relaxed ${darkMode ? 'text-white/90' : 'text-black/80'}`}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-5">
              {project.tech.map((tech, i) => (
                <span
                  key={i}
                  className={`px-3 py-1.5 text-sm rounded-lg font-medium border transition-colors duration-300 ${darkMode ? 'bg-black/70 text-white border-white/25 group-hover:bg-[#50207A]/90 group-hover:border-[#d6b9fc]/60' : 'bg-white text-black border-[#838ce5]/45 group-hover:bg-[#50207A]/90 group-hover:text-white group-hover:border-[#50207A]/90'}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-end mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${project.title} code on GitHub`}
              className={`inline-flex items-center justify-center rounded-lg p-3 transition-colors duration-300 ${darkMode ? 'bg-black/70 hover:bg-[#838ce5]/35 text-white' : 'bg-white hover:bg-[#838ce5]/25 text-black'}`}
            >
              <Github className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex flex-col items-center">
            <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>
              Featured Projects
            </h2>
            <div className={`mt-3 h-1 w-[72%] rounded-full ${darkMode ? 'bg-gradient-to-r from-[#838ce5] to-[#d6b9fc]' : 'bg-gradient-to-r from-[#50207A] to-[#838ce5]'}`} />
          </div>
        </div>

        <div className="md:hidden overflow-hidden" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {projects.map((project, index) => (
              <div key={index} className="w-full shrink-0 px-1 flex">
                {renderCard(project, index)}
              </div>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to project ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? darkMode
                      ? 'w-6 bg-[#838ce5]'
                      : 'w-6 bg-[#50207A]'
                    : darkMode
                      ? 'w-2.5 bg-white/35'
                      : 'w-2.5 bg-black/25'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => renderCard(project, index))}
        </div>
      </div>
    </section>
  );
}