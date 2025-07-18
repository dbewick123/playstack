import "./landing.css";
import {
  useIsMobile,
  useIsLargeMobile,
  useIsTablet,
  useIsDesktop,
} from "../hooks/useBreakpoints";
import car1 from "../assets/icons/carousel/car1.png";
import car2 from "../assets/icons/carousel/car2.png";
import car3 from "../assets/icons/carousel/car3.png";
import car4 from "../assets/icons/carousel/car4.png";
import car5 from "../assets/icons/carousel/car5.png";
import car6 from "../assets/icons/carousel/car6.png";
import GameCardWrapper from "../components/containers/GameCardWrapper";
import {
  gameDataFull,
  gameDataDesktop,
  gameDataMobile,
  gameDataTablet,
} from "../utilities/landingPageData";
import { Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

function Landing() {
  const isMobile = useIsMobile();
  const isLargeMobile = useIsLargeMobile();
  const IsTablet = useIsTablet();
  const isDesktop = useIsDesktop();

  const [hasLoaded, setHasLoaded] = useState(false);
  const [gameCount, setGameCount] = useState(0);

  useEffect(() => {
    const fetchGameCount = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/games/count`
        );
        const data = await response.json();
        setGameCount(data.count);
      } catch (error) {
        setGameCount(-1);
        console.error("Error fetching game count", error);
      } finally {
        setHasLoaded(true);
      }
    };
    fetchGameCount();
  }, []);


  const landingPageData = useMemo(() => {
    if (isLargeMobile || isMobile) return gameDataMobile;
    if (IsTablet) return gameDataTablet;
    if (isDesktop) return gameDataDesktop;
    return gameDataFull;
  }, [isLargeMobile, IsTablet, isDesktop]);
  

  const images: { src: string; alt: string; ariaHidden: boolean }[] = [
    { src: car1, alt: "spaceship", ariaHidden: false },
    { src: car2, alt: "gems", ariaHidden: false },
    { src: car3, alt: "mining", ariaHidden: false },
    { src: car4, alt: "more gems", ariaHidden: false },
    { src: car5, alt: "crossed swords", ariaHidden: false },
    { src: car6, alt: "pacman ghost", ariaHidden: false },
  ];

  const duplicatedImages = useMemo(() => {
    return [...images, ...images.map((img) => ({ ...img, ariaHidden: true }))];
  }, [images]);

  if (!hasLoaded) {
    return <div></div>;
  }
  return (
    <div className="landing-container">
      <div className="landing-heading">
        <h1>Your One Stop Game Collection Companion</h1>
        <div className="landing-heading-button">
          <Button
            variant="contained"
            color="playstackPrimary"
            size={isMobile ? "small" : "medium"}
            href="/home"
          >
            LETS GET GOING
          </Button>
        </div>
        {/* <GamepadIcon /> */}
        <p>
          With our extensive game library, Playstack allow you to track,
          wishlist and rate all your games from one, central place. With{" "}
          {gameCount === -1 ? "thousands of" : gameCount} games and counting,
          you&apos;ll never again need to check 5+ different storefronts for the
          games you want to play next. Hit the button and start playing more
          now.
        </p>
      </div>
      <div className="landing-product-example">
        <div className="game-card-wrapper">
          {landingPageData.map((game, i) => (
            <GameCardWrapper
              key={i}
              game={game}
              loading={false}
              location="landing"
            />
          ))}
        </div>
      </div>
      <div className="landing-logos-carousel">
        <div className="landing-logos">
          {duplicatedImages.map((image, index) => (
            <img
              src={image.src}
              alt={image.alt}
              key={index}
              aria-hidden={image.ariaHidden}
            />
          ))}
        </div>
      </div>
      <div className="feature-info-container">
        <div className="feature-summary">
          <h3>
            <span className="text-highemp-h-span">
              No more game collection anxiety, ever.
            </span>{" "}
            Say goodbye to searching around for your next game, battling with
            multiple platforms. Spend your time playing games, not searching
            endlessly for your next adventure.
          </h3>
        </div>
        <div className="feature-info">
          <p>
            <span className="text-highemp-p-span">
              Manage current & future collections.
            </span>{" "}
            Use our massive games library alongside our collection features
            (coming soon). Build out your personal library, or pull together a
            wishlist with everything in it.
          </p>
          <br />
          <p>
            <span className="feature-info-additional-text">
              Building your own local game, or have such a niche its not yet in
              our database? Add it with our &apos;add indie game&apos; feature
              (coming soon).
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Landing;
