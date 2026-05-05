import { useState, useEffect, useRef } from "react";

export const useScrollReveal = (options = { threshold: 0.1, once: true }) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);

        if (options.once && elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      } else if (!options.once) {
        setIsVisible(false);
      }
    }, options);

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [options]);

  return [elementRef, isVisible];
};
