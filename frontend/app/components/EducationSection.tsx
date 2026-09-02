import { GraduationCap } from 'lucide-react';

type EducationSectionProps = {
  darkMode: boolean;
};

export default function EducationSection({ darkMode }: EducationSectionProps) {
  return (
    <section id="education" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <div className="inline-flex flex-col items-center">
            <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>
              Education
            </h2>
            <div className={`mt-3 h-1 w-[72%] rounded-full ${darkMode ? 'bg-gradient-to-r from-[#838ce5] to-[#d6b9fc]' : 'bg-gradient-to-r from-[#50207A] to-[#838ce5]'}`} />
          </div>
        </div>

        <div className={`rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] ${darkMode ? 'bg-black/50 border border-[#838ce5]/20 hover:border-[#838ce5]/40 shadow-xl hover:shadow-2xl' : 'bg-white border border-[#838ce5]/35 hover:border-[#838ce5] shadow-lg hover:shadow-2xl'}`}>
          <div className="flex items-start gap-6">
            <a
              href="https://www.chitkara.edu.in/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Chitkara University website"
              className={`shrink-0 w-14 h-14 rounded-xl transition-transform duration-300 hover:scale-110 flex items-center justify-center overflow-hidden ${darkMode ? 'bg-black/70' : 'bg-white'}`}
            >
              <img
                src="/ChitkaraLogo2.jpeg"
                alt="Chitkara University logo"
                className="w-10 h-10 object-contain"
                loading="lazy"
              />
            </a>
            <div className="flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                  Bachelor of Engineering in Computer Science
                </h3>
                <span className={`shrink-0 text-sm font-medium px-3 py-1 rounded-full border ${darkMode ? 'bg-[#838ce5]/10 border-[#838ce5]/30 text-white/70' : 'bg-[#d6b9fc]/20 border-[#838ce5]/30 text-black/60'}`}>
                  Jul 2023 - Jul 2027
                </span>
              </div>
              <a
                href="https://www.chitkara.edu.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-xl mb-3 font-semibold bg-gradient-to-r from-[#50207A] to-[#838ce5] bg-clip-text text-transparent hover:opacity-80 transition-opacity"
              >
                Chitkara University - Rajpura, Punjab, India
              </a>
              <p className={`mb-4 ${darkMode ? 'text-white/90' : 'text-black/80'} leading-relaxed`}>
                Currently pursuing degree with focus on software engineering, data structures, algorithms, and full-stack web development.
              </p>
              {/* <div className="flex flex-wrap gap-3">
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold border ${darkMode ? 'bg-gradient-to-r from-[#838ce5]/15 to-[#d6b9fc]/15 border-[#838ce5]/35 text-white' : 'bg-gradient-to-r from-[#50207A]/8 to-[#838ce5]/12 border-[#838ce5]/45 text-black'}`}>
                  <GraduationCap className="w-4 h-4 shrink-0" />
                  CGPA: 9.02 / 10 (till date)
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}