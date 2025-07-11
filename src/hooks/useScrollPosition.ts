import { useState, useEffect } from 'react';

export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollPosition = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirection(direction);
      }
      
      setScrollPosition(scrollY);
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    const throttledUpdateScrollPosition = throttle(updateScrollPosition, 100);

    window.addEventListener('scroll', throttledUpdateScrollPosition);

    return () => window.removeEventListener('scroll', throttledUpdateScrollPosition);
  }, [scrollDirection]);

  return { scrollPosition, scrollDirection };
};

// Throttle function to limit how often the scroll handler runs
function throttle(func: Function, limit: number) {
  let inThrottle: boolean;
  return function(this: any) {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}