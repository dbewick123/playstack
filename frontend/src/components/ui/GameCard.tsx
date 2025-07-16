import { useState } from "react";
import { Link } from "react-router-dom";
import { Game } from "../../types/game";
import "./gameCard.css";
import CircleSelector from "../utilities/circleSelector/CircleSelector";
import GetPlatformIcons from "../utilities/GetPlatformIcons";
import localDateFormatter from "../utilities/dateFormatter";
import metacriticIcon from "../../assets/logos/third-party/metacritic.png";
import placeholderImage from "../../assets/game-background-placeholder.jpg";

//External Components
import { Skeleton, Stack } from "@mui/material";
import WishlistAddIcon from "@mui/icons-material/AddCard";
import WishlistRemoveIcon from "@mui/icons-material/CreditScore";
import { Chip, Tooltip } from "@mui/material";
import LibraryRemoveIcon from "@mui/icons-material/PlaylistAddCheck";
import LibraryAddIcon from "@mui/icons-material/PlaylistAdd";

interface GameCardProps {
  loading: boolean;
  game: Game;
}

function GameCard({ loading, game }: GameCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWishlist, setSelectedWishlist] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState(false);

  const formattedDate = game?.released
    ? localDateFormatter(game?.released)
    : "tbc";

  const handleGalleryClick = (clickSource: string, newIndex?: number) => {
    const imageCount = game.screenshots?.length;

    if (!imageCount) {
      return;
    }

    if (clickSource === "back") {
      setCurrentIndex((prev) => {
        const nextIndex = prev - 1;
        return nextIndex < 0 ? imageCount - 1 : nextIndex;
      });
      return;
    }

    if (clickSource === "forward") {
      setCurrentIndex((prev) => {
        const nextIndex = prev + 1;
        return nextIndex >= imageCount ? 0 : nextIndex;
      });
      return;
    }

    if (newIndex !== undefined && clickSource === "circles") {
      setCurrentIndex(newIndex);
      return;
    }
  };

  const handleWishlistClick = () => {
    setSelectedWishlist(!selectedWishlist);
    //TODO: add Redux logic to add to wishlist (in parent component probs)
  };

  const handleLibraryClick = () => {
    setSelectedLibrary(!selectedLibrary);
    //TODO: add Redux logic to add to library (in parent component probs)
  };

  return !loading ? (
    <div className="game-card">
      <div
        data-testid="game-card-gallery-images-test"
        className="game-card-gallery-image"
        style={{
          backgroundImage:
            game.screenshots?.length > 0
              ? `url(${game.screenshots[currentIndex]})`
              : `url(${placeholderImage})`,
        }}
      >
        <div
          className="game-card-gallery-back"
          onClick={() => handleGalleryClick("back")}
        ></div>
        <div
          className="game-card-gallery-forward"
          onClick={() => handleGalleryClick("forward")}
        ></div>

        <div className="game-gallery-selector-container">
          {game.screenshots?.length > 0 ? (
            game.screenshots.map((_image, index) => (
              <CircleSelector
                key={index}
                selected={currentIndex === index}
                onClick={() => handleGalleryClick("circles", index)}
              />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="game-card-info-container">
        <div className="game-card-info-top">
          <div className="game-card-info-title">
            <Link
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              to={`/game/${game.id}`}
            >
              <h2 className="links">{game.name}</h2>
            </Link>
          </div>
        </div>
        <div className="game-card-info-sub">
          <h6>Release: {formattedDate}</h6>
        </div>
        <div className="game-card-info-sub2">
          <div className="game-card-info-platforms">
            <GetPlatformIcons platforms={game.platforms} />
          </div>
        </div>

        <div className="game-card-info-bottom">
          <div className="game-card-info-bottom-ratings">
            <Tooltip title="Metacritic">
              <div className="game-card-info-bottom-ratings-metacritic">
                {metacriticIcon ? (
                  <img src={metacriticIcon} alt="Metacritic Logo" />
                ) : null}{" "}
                <h6>{game.metacritic === -1 ? "n/a" : game.metacritic}</h6>
              </div>
            </Tooltip>
          </div>

          <div className="game-card-info-bottom-buttons">
            <Stack direction="row" spacing={0.5}>
              <Chip
                size="small"
                label="Wishlist"
                // @ts-expect-error valid as using custom color scheme
                color="playstackPrimaryChip"
                sx={
                  selectedWishlist
                    ? { border: "1px solid #ffffff1f" }
                    : { bgcolor: "#1e1e1e", border: "1px solid #ffffff1f" }
                }
                onClick={() => handleWishlistClick()}
                icon={
                  selectedWishlist ? (
                    <WishlistRemoveIcon />
                  ) : (
                    <WishlistAddIcon />
                  )
                }
              />
              <Chip
                size="small"
                // @ts-expect-error valid as using custom color scheme
                color="playstackPrimaryChip"
                label="Library"
                sx={
                  selectedLibrary
                    ? { border: "1px solid #ffffff1f" }
                    : { bgcolor: "#1e1e1e", border: "1px solid #ffffff1f" }
                }
                onClick={() => handleLibraryClick()}
                icon={
                  selectedLibrary ? <LibraryRemoveIcon /> : <LibraryAddIcon />
                }
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="game-card">
      <div className="game-card-gallery-image">
        <Skeleton
          title="skeleton"
          variant="rounded"
          sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
          width="100%"
          height="100%"
        />
      </div>

      <div className="game-card-info-container">
        <div className="game-card-info-sub">
          <Skeleton
            title="skeleton"
            variant="text"
            sx={{ bgcolor: "rgba(255, 255, 255, 0.07)", fontSize: "1rem" }}
            width="60%"
            height={24}
          />
        </div>
        <div className="game-card-info-sub">
          <Skeleton
            title="skeleton"
            variant="text"
            sx={{ bgcolor: "rgba(255, 255, 255, 0.07)", fontSize: "0.75rem" }}
            width="30%"
            height={18}
          />
        </div>
        <div className="game-card-info-bottom">
          <Skeleton
            title="skeleton"
            variant="rounded"
            sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
            width="100%"
            height={32}
          />
        </div>
      </div>
    </div>
  );
}

export default GameCard;
