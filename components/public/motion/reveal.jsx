'use client';

import { useEffect, useRef, useState } from 'react';

export function Reveal({ 
  children, 
  delay = 0, 
  direction = 'up', // 'up', 'down', 'none'
  duration = 700,
  className = '' 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  let directionClass = '';
  if (direction === 'up') directionClass = 'slide-in-from-bottom-8';
  if (direction === 'down') directionClass = 'slide-in-from-top-8';

  const delayStyle = delay ? { animationDelay: `${delay}ms` } : {};
  const durationStyle = duration !== 700 ? { animationDuration: `${duration}ms` } : {};
  
  const baseClasses = isVisible 
    ? `animate-in fade-in ${directionClass} fill-mode-both ease-out` 
    : 'opacity-0';

  return (
    <div 
      ref={ref} 
      className={`${baseClasses} ${className}`}
      style={{ ...delayStyle, ...durationStyle }}
    >
      {children}
    </div>
  );
}
