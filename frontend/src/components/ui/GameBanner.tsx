import "./gameBanner.css";
import { SingleGame } from "../../types/game";
import GetGenreIcons from "../utilities/GetGenreIcons";
import GetPlatformIcons from "../utilities/GetPlatformIcons";
import localDateFormatter from "../utilities/dateFormatter";
import Separator from "../../assets/icons/separator.svg?react";
import backgroundImage from "../../assets/game-background-placeholder.jpg";
import DialogModal from "../utilities/DialogModal";

//External
import DOMPurify from "dompurify";

//Local Component Types
interface GameBannerProps {
  singleGame: SingleGame | null;
}

function GameBanner({ singleGame }: GameBannerProps) {
  
  const formattedDate = singleGame?.released
    ? localDateFormatter(singleGame?.released)
    : singleGame?.released;

  // Render JSX here
  return (
    <div
      className="game-banner-background"
      style={
        singleGame?.background_image === "-1"
          ? { backgroundImage: `url(${backgroundImage})` }
          : { backgroundImage: `url(${singleGame?.background_image})` }
      }
    >
      <div className="game-banner">
        {singleGame?.background_image === "-1" ? (
          <></>
        ) : (
          <div className="game-banner-art">
            <img
              src={`${singleGame?.background_image}`}
              alt={`${singleGame?.name} game cover art`}
            />
          </div>
        )}

        <div className="game-banner-info">
          <h3>{singleGame?.name}</h3>
          <div className="game-banner-info-info1">
            <div className="game-banner-info-platforms">
              {Array.isArray(singleGame?.platforms) ? (
                <GetPlatformIcons
                  platforms={singleGame.platforms.map(
                    (platform) => platform.platform.id
                  )}
                  iconClass="platform-icon-game"
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
            <h4>
              Released: {singleGame?.released === "-1" ? "n/a" : formattedDate}
            </h4>
            <div className="separator">
              <Separator />
            </div>
            <h4>
              Time to Beat:{" "}
              {singleGame?.playtime === -1 || singleGame?.playtime === 0
                ? "n/a"
                : `${singleGame?.playtime}h`}
            </h4>
            <div className="separator">
              <Separator />
            </div>
            <h4>
              Metacritic:{" "}
              {singleGame?.metacritic === -1 ? "n/a" : singleGame?.metacritic}
            </h4>
          </div>

          <div
            className="game-banner-info-info3"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                !singleGame?.description ||
                  typeof singleGame?.description !== "string"
                  ? ""
                  : singleGame?.description
              ).replaceAll("<br>", "<span></span>"),
            }}
          ></div>
          <div className="dialog-game-description">
            <DialogModal
              dialogText={
                !singleGame?.description || typeof singleGame.description !== "string"
                  ? "No description available"
                  : DOMPurify.sanitize(singleGame.description).replaceAll("<br>", "<span></span>")
              }
              dialogTitle={!singleGame?.name ? 'Game Summary' : singleGame?.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default GameBanner;
