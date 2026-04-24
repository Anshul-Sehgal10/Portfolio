import {
  Layers,
  Boxes,
  Cpu,
  Brain,
  Network,
  AlertCircle,
  Users,
  Layout,
  Github,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

type SkillsSectionProps = {
  darkMode: boolean;
};

type Skill = {
  name: string;
  icon: LucideIcon | string;
};

const skills: Skill[] = [
  {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  },
  {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original-wordmark.svg",
  },
  {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg",
  },
  {
    name: "TypeScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-plain.svg",
  },
  {
    name: "React",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Node.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
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
    name: "MySQL",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg",
  },
  {
    name: "Docker",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
  },
  {
    name: "Tailwind CSS",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "HTML5",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-plain-wordmark.svg",
  },
  {
    name: "CSS3",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-plain-wordmark.svg",
  },
  {
    name: "Git",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
  },
  { name: "GitHub", icon: Github },
  {
    name: "Postman",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-plain.svg",
  },
  {
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original-wordmark.svg",
  },
  {
    name: "Express.js",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  },
  {
    name: "REST APIs",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/djangorest/djangorest-plain-wordmark.svg",
  },
  {
    name: "Authentication (JWT)",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oauth/oauth-plain.svg",
  },
  { name: "Middleware Architecture", icon: Layers },
  { name: "Error Handling", icon: AlertCircle },
  {
    name: "Database Design",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuresqldatabase/azuresqldatabase-original.svg",
  },
  {
    name: "Mongoose",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongoose/mongoose-original-wordmark.svg",
  },
  { name: "Data Structures", icon: Boxes },
  { name: "Algorithms", icon: Cpu },
  {
    name: "Object-Oriented Programming",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/json/json-original.svg",
  },
  { name: "Problem Solving", icon: Brain },
  { name: "API Design", icon: Network },
  { name: "Agile Development", icon: Users },
  { name: "System Design Basics", icon: Layout },
];

const loopingSkills = [...skills, ...skills, ...skills];
const AUTO_SCROLL_SPEED = 42;

export default function SkillsSection({ darkMode }: SkillsSectionProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const momentumFrameRef = useRef<number | null>(null);
  const isInteractingRef = useRef(false);
  const dragStateRef = useRef({
    isDragging: false,
    pointerId: -1,
    lastX: 0,
    lastTimestamp: 0,
    velocity: 0,
  });
  const [isInteracting, setIsInteracting] = useState(false);

  const setInteractionState = (value: boolean) => {
    isInteractingRef.current = value;
    setIsInteracting(value);
  };

  const normalizeScrollPosition = (scroller: HTMLDivElement) => {
    const segmentWidth = scroller.scrollWidth / 3;
    if (!segmentWidth || !Number.isFinite(segmentWidth)) {
      return;
    }

    if (scroller.scrollLeft < segmentWidth * 0.5) {
      scroller.scrollLeft += segmentWidth;
    } else if (scroller.scrollLeft > segmentWidth * 1.5) {
      scroller.scrollLeft -= segmentWidth;
    }
  };

  const centerScroll = () => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    scroller.scrollLeft = scroller.scrollWidth / 3;
  };

  const stopMomentum = () => {
    if (momentumFrameRef.current !== null) {
      window.cancelAnimationFrame(momentumFrameRef.current);
      momentumFrameRef.current = null;
    }
  };

  const startMomentum = (initialVelocity: number) => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      setInteractionState(false);
      return;
    }

    let velocity = initialVelocity;
    let previousTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - previousTime;
      previousTime = now;

      scroller.scrollLeft -= velocity * elapsed;
      normalizeScrollPosition(scroller);
      velocity *= Math.pow(0.94, elapsed / 16);

      if (Math.abs(velocity) > 0.015) {
        momentumFrameRef.current = window.requestAnimationFrame(step);
        return;
      }

      momentumFrameRef.current = null;
      setInteractionState(false);
    };

    momentumFrameRef.current = window.requestAnimationFrame(step);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) {
      return;
    }

    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    stopMomentum();
    const state = dragStateRef.current;
    state.isDragging = true;
    state.pointerId = event.pointerId;
    state.lastX = event.clientX;
    state.lastTimestamp = performance.now();
    state.velocity = 0;

    scroller.setPointerCapture(event.pointerId);
    setInteractionState(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    const state = dragStateRef.current;
    if (!scroller || !state.isDragging || state.pointerId !== event.pointerId) {
      return;
    }

    const now = performance.now();
    const deltaTime = now - state.lastTimestamp;
    const deltaX = event.clientX - state.lastX;

    scroller.scrollLeft -= deltaX;
    normalizeScrollPosition(scroller);

    if (deltaTime > 0) {
      state.velocity = deltaX / deltaTime;
    }

    state.lastX = event.clientX;
    state.lastTimestamp = now;
    event.preventDefault();
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    const state = dragStateRef.current;
    if (!scroller || !state.isDragging || state.pointerId !== event.pointerId) {
      return;
    }

    state.isDragging = false;
    try {
      scroller.releasePointerCapture(event.pointerId);
    } catch {
      // Ignore when capture has already been released.
    }

    if (Math.abs(state.velocity) < 0.01) {
      setInteractionState(false);
      return;
    }

    startMomentum(state.velocity);
  };

  useEffect(() => {
    centerScroll();

    // Re-center once after layout settles so autoplay starts from the middle strip.
    const settleFrame = window.requestAnimationFrame(centerScroll);

    let previousTime = performance.now();
    const tick = () => {
      const scroller = scrollerRef.current;
      const now = performance.now();
      const elapsed = now - previousTime;
      previousTime = now;

      if (
        scroller &&
        !isInteractingRef.current &&
        !dragStateRef.current.isDragging
      ) {
        scroller.scrollLeft += (AUTO_SCROLL_SPEED * elapsed) / 1000;
        normalizeScrollPosition(scroller);
      }
    };

    const autoInterval = window.setInterval(tick, 16);
    window.addEventListener("resize", centerScroll);

    return () => {
      stopMomentum();
      window.clearInterval(autoInterval);
      window.cancelAnimationFrame(settleFrame);
      window.removeEventListener("resize", centerScroll);
    };
  }, []);

  return (
    <section id="skills" className="relative -mt-2 py-20 overflow-hidden">
      <div className="mb-12">
        <div className="text-center">
          <div className="inline-flex flex-col items-center">
            <h2
              className={`text-4xl sm:text-5xl font-extrabold tracking-wide ${darkMode ? "text-white" : "text-black"}`}
            >
              Skills & Technologies
            </h2>
            <div
              className={`mt-3 h-1 w-[72%] rounded-full ${darkMode ? "bg-gradient-to-r from-[#838ce5] to-[#d6b9fc]" : "bg-gradient-to-r from-[#50207A] to-[#838ce5]"}`}
            />
          </div>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className={`relative overflow-x-auto overflow-y-hidden px-1 hide-scrollbar select-none touch-pan-y ${isInteracting ? "cursor-grabbing" : "cursor-grab"}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div className="flex w-max gap-4 pb-2">
          {loopingSkills.map((skill, index) => {
            return (
              <div
                key={index}
                className={`shrink-0 px-6 py-4 transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-pointer ${darkMode ? "hover:bg-[#838ce5]/10" : "hover:bg-[#d6b9fc]/15"}`}
              >
                <div className="flex flex-col items-center gap-3 min-w-[120px]">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    {darkMode && (
                      <span
                        aria-hidden="true"
                        className="absolute bottom-0 h-8 w-8 rounded-full bg-white/55 blur-lg"
                      />
                    )}
                    {typeof skill.icon === "string" ? (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="relative z-10 h-12 w-12 object-contain"
                        loading="lazy"
                      />
                    ) : (
                      <skill.icon
                        className={`relative z-10 w-12 h-12 ${darkMode ? "text-white" : "text-black"}`}
                      />
                    )}
                  </div>
                  <span
                    className={`font-semibold text-lg whitespace-nowrap ${darkMode ? "text-white" : "text-black"}`}
                  >
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
