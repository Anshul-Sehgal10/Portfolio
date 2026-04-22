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
  icon: LucideIcon | string;
};
  export const technologies = [
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
  },
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
  },
  {
    name: "MongoDB",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
  },
  {
    name: "PostgreSQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  {
    name: "Tailwind",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "AWS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    name: "TensorFlow",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
  },
  {
    name: "Spring Boot",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
  },
  {
    name: "Redis",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
  },
  {
    name: "Numpy",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
  },
  {
    name: "Postman",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
  },
  {
    name: "Pandas",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg",
  },
  {
    name: "Selenium",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/selenium/selenium-original.svg",
  },
];

const skills: Skill[] = [
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg' },
  { name: 'REST APIs', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/djangorest/djangorest-plain-wordmark.svg' },
  { name: 'Authentication (JWT)', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-plain.svg' },
  { name: 'Middleware Architecture', icon: Layers },
  { name: 'Error Handling', icon: AlertCircle },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg' },
  { name: 'Database Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg' },
  { name: 'Mongoose', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', icon: Github },
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-plain.svg' },
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original-wordmark.svg' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg' },
  { name: 'Data Structures', icon: Boxes },
  { name: 'Algorithms', icon: Cpu },
  { name: 'Object-Oriented Programming', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg' },
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
            const isIconUrl = typeof skill.icon === 'string';
            const IconComponent = isIconUrl ? null : skill.icon;
            return (
              <div
                key={index}
                className={`shrink-0 px-6 py-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${darkMode ? 'hover:bg-[#838ce5]/10' : 'hover:bg-[#d6b9fc]/15'}`}
              >
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    {darkMode && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 h-8 w-8 rounded-full bg-white/55 blur-lg"
                      />
                    )}
                    {isIconUrl ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="relative z-10 h-12 w-12 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <IconComponent className={`relative z-10 w-12 h-12 ${darkMode ? 'text-white' : 'text-black'}`} />
                    )}
                  </div>
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