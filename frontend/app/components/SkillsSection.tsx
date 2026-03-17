import {
  Code2,
  FileCode,
  Braces,
  Box,
  Layers,
  Server,
  Database,
  GitBranch,
  Wind,
  Send,
  Code,
  Coffee,
  Boxes,
  Cpu,
  Brain,
  Network,
  Lock,
  AlertCircle,
  Users,
  Layout,
  Github,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type SkillsSectionProps = {
  darkMode: boolean;
};

type Skill = {
  name: string;
  icon: LucideIcon;
};

const skills: Skill[] = [
  { name: 'HTML5', icon: FileCode },
  { name: 'CSS3', icon: Layers },
  { name: 'JavaScript', icon: Braces },
  { name: 'React', icon: Code2 },
  { name: 'Next.js', icon: Box },
  { name: 'Tailwind CSS', icon: Wind },
  { name: 'Node.js', icon: Server },
  { name: 'Express.js', icon: Server },
  { name: 'REST APIs', icon: Network },
  { name: 'Authentication (JWT)', icon: Lock },
  { name: 'Middleware Architecture', icon: Layers },
  { name: 'Error Handling', icon: AlertCircle },
  { name: 'MongoDB', icon: Database },
  { name: 'PostgreSQL', icon: Database },
  { name: 'MySQL', icon: Database },
  { name: 'Database Design', icon: Database },
  { name: 'Mongoose', icon: Database },
  { name: 'Git', icon: GitBranch },
  { name: 'GitHub', icon: Github },
  { name: 'Docker', icon: Box },
  { name: 'Postman', icon: Send },
  { name: 'VS Code', icon: Code },
  { name: 'Java', icon: Coffee },
  { name: 'Data Structures', icon: Boxes },
  { name: 'Algorithms', icon: Cpu },
  { name: 'Object-Oriented Programming', icon: Box },
  { name: 'Problem Solving', icon: Brain },
  { name: 'API Design', icon: Network },
  { name: 'Agile Development', icon: Users },
  { name: 'System Design Basics', icon: Layout },
];

const loopingSkills = [...skills, ...skills];

export default function SkillsSection({ darkMode }: SkillsSectionProps) {
  return (
    <section id="skills" className="relative -mt-2 py-20 overflow-hidden">
      <div className="mb-12">
        <div className="text-center">
          <div className="inline-flex flex-col items-center">
            <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-wide ${darkMode ? 'text-white' : 'text-black'}`}>
              Skills & Technologies
            </h2>
            <div className={`mt-3 h-1 w-[72%] rounded-full ${darkMode ? 'bg-gradient-to-r from-[#838ce5] to-[#d6b9fc]' : 'bg-gradient-to-r from-[#50207A] to-[#838ce5]'}`} />
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden px-1">
        <div className="flex w-max gap-4 pb-2 skills-track">
          {loopingSkills.map((skill, index) => {
            const IconComponent = skill.icon;
            return (
              <div
                key={index}
                className={`shrink-0 px-6 py-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${darkMode ? 'hover:bg-[#838ce5]/10' : 'hover:bg-[#d6b9fc]/15'}`}
              >
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <IconComponent className={`w-12 h-12 ${darkMode ? 'text-white' : 'text-black'}`} />
                  <span className={`font-semibold text-lg whitespace-nowrap ${darkMode ? 'text-white' : 'text-black'}`}>
                    {skill.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}