import "./gameBanner.css";
import { SingleGame } from "../../types/game";
import GetGenreIcons from "../utilities/GetGenreIcons";
import GetPlatformIcons from "../utilities/GetPlatformIcons";
import Separator from "../../assets/icons/separator.svg?react";

//External 
import DOMPurify from 'dompurify';

//React Library

//Local Component Types
interface GameBannerProps {
  singleGame: SingleGame | null;
}

function GameBanner({ singleGame }: GameBannerProps) {
  //Process Parameters

  // Manage React state here

  //Functions here

  //Handle all TypeErrors/safe variable setup here. Maybe checkl all fields and overwrite with stock value if null or -1
  //INC null singleGame
  // Render JSX here
  return (
    <div
      className="game-banner-background"
      style={{ backgroundImage: `url(${singleGame?.background_image})` }}
    >
      <div className="game-banner">
        <div className="game-banner-art">
          <img
            src={`${singleGame?.background_image}`}
            alt={`${singleGame?.name} game cover art`}
          />
        </div>
        <div className="game-banner-info">
          <h3>{singleGame?.name}</h3>
          <div className="game-banner-info-info1">
            <div className="game-banner-info-platforms">
              {Array.isArray(singleGame?.platforms) ? (
                <GetPlatformIcons
                  platforms={singleGame.platforms.map(
                    (platform) => platform.platform.id
                  )}
                />
              ) : (
                <></>
              )}
            </div>
            <div className="game-banner-info-genres">
              {Array.isArray(singleGame?.genres) ? (
                <GetGenreIcons
                  genres={singleGame.genres.map((genre) => genre.id)}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="game-banner-info-info2">
            <h4>Released: {singleGame?.released}</h4>
            <div className="separator">
              <Separator />
            </div>
            <h4>Time to Beat: {singleGame?.playtime}h</h4>
            <div className="separator">
              <Separator />
            </div>
            <h4>Metacritic: {singleGame?.metacritic}</h4>
          </div>

          <div
          //TODO: Improve this, allow or hide overflow and perhaps a 'more info' modal
            className="game-banner-info-info3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(singleGame?.description || ""),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default GameBanner;
