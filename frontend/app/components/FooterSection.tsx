type FooterSectionProps = {
  darkMode: boolean;
};

export default function FooterSection({ darkMode }: FooterSectionProps) {
  return (
    <footer className="py-8 px-4 bg-transparent">
      <div className="max-w-7xl mx-auto text-center">
        <p className={`${darkMode ? 'text-white/70' : 'text-black/80'}`}>
          © 2026 Anshul Sehgal. All rights reserved.
        </p>
      </div>
    </footer>
  );
}