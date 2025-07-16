import { useState, useEffect } from "react";
import useElementOnScreen from "../../../hooks/useElementOnScreen";

interface AnimatedCounterProps {
  finalCount: number;
  milisecondDelay: number;
}

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px",
  threshold: 1,
};

const AnimatedCounter = ({
  finalCount,
  milisecondDelay,
}: AnimatedCounterProps) => {
  const [currentCount, setCurrentCount] = useState(0);
  const [initialiseCounter, setInitialiseCounter] = useState(false);
  const [containerRef, isVisable] = useElementOnScreen(options);

  useEffect(() => {
    if (!isVisable) {
      return;
    }
    if (!finalCount || finalCount < 1) {
      return;
    } else {
      setInitialiseCounter(true);
    }
  }, [isVisable]);

  useEffect(() => {
    if (currentCount >= finalCount || !initialiseCounter) {
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentCount((prev) => prev + 1);
    }, milisecondDelay);

    return () => clearTimeout(timeout);
  }, [currentCount, initialiseCounter]);

  return (
    <div ref={containerRef} className="animated-counter" role="counter" aria-label='animated-counter'>
      {currentCount}<span className="counter-hours">hrs</span>
    </div>
  );
};

export default AnimatedCounter;
