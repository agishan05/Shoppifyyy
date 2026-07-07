import { useEffect, useState } from 'react';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => setVisible(window.scrollY > 400);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 rounded-full bg-yellow-400 p-3 text-xl text-black shadow-lg transition hover:scale-105"
    >
      ↑
    </button>
  );
}

export default ScrollToTop;
