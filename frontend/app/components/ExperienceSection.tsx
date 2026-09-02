"use client";

import { Briefcase, Calendar, MapPin } from "lucide-react";
import Image from "next/image";

type ExperienceSectionProps = {
  darkMode: boolean;
};

type Experience = {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  skills: string[];
};

const experiences: Experience[] = [
  {
    role: "Software Engineer Intern",
    company: "Lifelong Online",
    location: "Gurugram, Haryana, India",
    period: "May 2026 – Aug 2026",
    description: [
      "Built AI-powered applications including an AI hiring platform and AI-based ERP system using FastAPI, Next.js, PostgreSQL, pgvector, and LangGraph during technical ramp-up.",
      "Contributed to a production dock management system deployed across 10+ warehouses and 250+ docks, supporting and optimizing daily shipment operations.",
      "Built shipment workflows covering gate entry, dock allocation, and departure for Gate Desk, Operations Manager, and Dock Supervisor roles.",
      "Implemented RBAC and authentication, restricting user actions and data access based on assigned role and warehouse.",
      "Contributed to API development, QA testing, debugging, code reviews, and production workflows.",
    ],
    skills: [
      "FastAPI",
      "Next.js",
      "PostgreSQL",
      "pgvector",
      "LangChain",
      "LangGraph",
      "RBAC",
      "WebSockets",
      "Docker",
    ],
  },
];

export default function ExperienceSection({
  darkMode,
}: ExperienceSectionProps) {
  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent"
    >
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex flex-col items-center">
            <h2
              className={`text-4xl sm:text-5xl font-extrabold tracking-wide ${darkMode ? "text-white" : "text-black"}`}
            >
              Experience
            </h2>
            <div
              className={`mt-3 h-1 w-[72%] rounded-full ${darkMode ? "bg-gradient-to-r from-[#838ce5] to-[#d6b9fc]" : "bg-gradient-to-r from-[#50207A] to-[#838ce5]"}`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:scale-[1.01] ${
                darkMode
                  ? "bg-black/50 border border-[#838ce5]/20 hover:border-[#838ce5]/40 shadow-xl hover:shadow-2xl shadow-[#50207A]/5"
                  : "bg-white border border-[#838ce5]/35 hover:border-[#838ce5] shadow-lg hover:shadow-2xl hover:shadow-[#50207A]/10"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <a
                      href="https://www.linkedin.com/company/lifelongonline/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Lifelong Online LinkedIn"
                    >
                      <Image
                        src="/LifelongLogo.png"
                        alt="Lifelong Online logo"
                        width={48}
                        height={48}
                        className="w-10 h-10 object-contain rounded-md transition-transform duration-300 hover:scale-[1.1]"
                      />
                    </a>
                    <h3
                      className={`text-2xl font-bold ${darkMode ? "text-white" : "text-black"}`}
                    >
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm sm:text-base">
                    <a
                      className="font-semibold bg-gradient-to-r from-[#50207A] to-[#838ce5] bg-clip-text text-transparent"
                      href={`https://www.linkedin.com/company/lifelongonline/`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {exp.company}
                    </a>
                    <span
                      className={`inline-flex items-center gap-1 ${darkMode ? "text-white/60" : "text-black/60"}`}
                    >
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className="self-start md:self-auto">
                  <span
                    className={`inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-1.5 rounded-full border ${
                      darkMode
                        ? "bg-[#838ce5]/10 border-[#838ce5]/30 text-white/80"
                        : "bg-[#d6b9fc]/20 border-[#838ce5]/30 text-black/75"
                    }`}
                  >
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    {exp.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-2.5 mb-6">
                {exp.description.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                        darkMode ? "bg-[#838ce5]" : "bg-[#50207A]"
                      }`}
                    />
                    <p
                      className={`text-sm sm:text-base leading-relaxed ${darkMode ? "text-white/90" : "text-black/80"}`}
                    >
                      {item}
                    </p>
                  </li>
                ))}
              </ul>

              <div
                className={`flex flex-wrap gap-2 pt-4 border-t border-dashed ${darkMode ? "border-white/10" : "border-black/10"}`}
              >
                {exp.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className={`px-3 py-1 text-xs sm:text-sm rounded-lg font-medium border transition-colors duration-300 ${
                      darkMode
                        ? "bg-black/70 text-white border-white/20 hover:border-[#838ce5]/60"
                        : "bg-white text-black border-[#838ce5]/40 hover:border-[#50207A]/60"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
