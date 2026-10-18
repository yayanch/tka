import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 p-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-blue-400/40 group animate-fade-in focus:outline-none focus:ring-4 focus:ring-blue-500/30"
      title="Kembali ke bagian awal"
      aria-label="Kembali ke bagian awal"
    >
      <ArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5 stroke-[2.5]" />
    </button>
  );
};
