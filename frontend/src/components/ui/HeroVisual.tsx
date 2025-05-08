import { useEffect, useRef, useState } from "react";
import GamepadIcon from "../../assets/icons/gamepad.svg?react";
import "./HeroVisual.css";

export default function HeroVisual() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const gamepadRef = useRef<SVGSVGElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(false);
  const [isInView, setIsInView] = useState(false);
  //Setup wheel event listener. Note wheel events trigger before scroll events

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      console.log("Wheel event fired, progress is: ", progress);
      if (scrollLocked) {
        console.log("Wheel event blocked by preventDefault()");
        event.preventDefault();
      }
      if (isInView) {
        setProgress((prev) => {
          const next = prev + event.deltaY * 0.005;

          // Clamp within [0, 1]
          let clamped = Math.max(0, Math.min(next, 1));

          // Snap values very close to 0 or 1, but only if they are above 0.05 or below 0.95
          // TODO: This could be a problem bcus its only looking at 1 previous value. I think thebelow issue is stemming from this
          if (prev > 0 && clamped < 0.05) clamped = 0;
          if (prev < 1 && clamped > 0.95) clamped = 1;
          console.log("setting progress to clamped value", clamped);

          return clamped;
        });
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => window.removeEventListener("wheel", handleWheel);
  }, [scrollLocked, isInView]);

  // Setup scroll event listener. Note scroll events trigger after wheel events
  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll event fired");
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const elementCenterY = rect.top + rect.height / 2;
      const screenCenterY = window.innerHeight / 2;
      const distanceFromCenter = Math.abs(screenCenterY - elementCenterY);
      const threshold = 100;

      setIsInView(distanceFromCenter < threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const scale = 1 + 0.3 * Math.sin(progress * Math.PI);
    if (gamepadRef.current) {
      gamepadRef.current.style.transform = `scale(${scale})`;
    }

    if (progress === 0 || progress === 1) {
      console.log("removing scroll lock, progress at", progress);
      document.body.classList.remove("scroll-locked");
      setScrollLocked(false);
    }
    // Problem is here, the progress is like 0.995 so this triggers, but then also the e(preventDefault) and this lock doesnt ever satisfy the above criteria (as progress never changes)
    // the behavious can be replecated by scrolling just past and then back up
    // also happens when you scroll into the element and then back up
    //Play around with it to see where it breaks (and maybe watch a youtube video)
    if (progress < 1 && progress > 0) {
      console.log("Adding scroll lock, progress at", progress);
      document.body.classList.add("scroll-locked");
      setScrollLocked(true);
    }
  }, [progress]);

  return (
    <div className="scroll-gamepad-wrapper" ref={wrapperRef}>
      <GamepadIcon className="scroll-gamepad" ref={gamepadRef} />
    </div>
  );
}
