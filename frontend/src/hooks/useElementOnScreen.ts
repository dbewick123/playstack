import { useRef, useState, useEffect } from "react";

const useElementOnScreen = (options: IntersectionObserverInit): [React.Ref<HTMLDivElement>, boolean]  => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const callbackFunction = (entries: unknown) => {
    if (Array.isArray(entries)) {
      const [entry] = entries;
      if (!entry) {
        return;
      }
      setIsVisible(entry.isIntersecting);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [containerRef, options]);

  return [containerRef, isVisible];
};

export default useElementOnScreen;
