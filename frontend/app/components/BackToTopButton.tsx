import { ArrowUp } from 'lucide-react';

type BackToTopButtonProps = {
  darkMode: boolean;
  visible: boolean;
  onClick: () => void;
};

export default function BackToTopButton({ darkMode, visible, onClick }: BackToTopButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Scroll back to top"
      className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-40 h-12 w-12 rounded-full border-2 flex items-center justify-center shadow-xl transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      } ${
        darkMode
          ? 'bg-black/80 border-[#838ce5] text-white hover:bg-[#50207A]'
          : 'bg-white/90 border-[#50207A] text-black hover:bg-[#d6b9fc]'
      }`}
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}
