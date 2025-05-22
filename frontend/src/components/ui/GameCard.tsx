import { useState } from "react";
import { Game } from "../../types/game";
import "./gameCard.css";
import CircleSelector from "../utilities/CircleSelector";
import GetPlatformIcons from "../utilities/GetPlatformIcons";
import metacriticIcon from "../../assets/logos/third-party/metacritic.png";
import GetGenreIcons from "../utilities/GetGenreIcons";
import { Chip, Stack, Tooltip } from "@mui/material";

import WishlistAddIcon from '@mui/icons-material/AddCard';
import WishlistRemoveIcon from '@mui/icons-material/CreditScore';

import LibraryRemoveIcon from '@mui/icons-material/PlaylistAddCheck';
import LibraryAddIcon from '@mui/icons-material/PlaylistAdd';
import GetEsrbRating from "../utilities/GetEsrbRating";

interface GameCardProps {
  game: Game;
}

function GameCard({ game }: GameCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWishlist, setSelectedWishlist] = useState(false);
  const [selectedLibrary, setSelectedLibrary] = useState(false);

  const handleGallaryClick = (newIndex: number) => {
    setCurrentIndex(newIndex);
  };

  const handleWishlistClick = () => {
    setSelectedWishlist(!selectedWishlist);
    //TODO: add Redux logic to add to wishlist (in parent component probs)
  };

  const handleLibraryClick = () => {
    setSelectedLibrary(!selectedLibrary);
    //TODO: add Redux logic to add to library (in parent component probs)
  };

  return (
    <div className="game-card">
      <div
        className="game-card-gallary-image"
        style={{
          backgroundImage: `url(${game.screenshots[currentIndex]})`,
        }}
      >
        <div className="game-gallary-selector-container">
          {game.screenshots.map((_image, index) => (
            //TODO: update this to be dynamic for mobile vs desktop
            <CircleSelector
              key={index}
              selected={currentIndex === index}
              onClick={() => handleGallaryClick(index)}
            />
          ))}
        </div>
      </div>
      <div className="game-card-info-container">
        <div className="game-card-info-top">
          <div className="game-card-info-title">
            <Tooltip title={game.name}>
              <h2>{game.name}</h2>
            </Tooltip>
          </div>
          <div className="game-card-info-platforms">
            <GetPlatformIcons platforms={game.platforms} />
          </div>
        </div>
        <div className="game-card-info-middle">
          <div className="genre-icon-container">
            <GetGenreIcons genres={game.genres} />
          </div>
          <h6>Release: {game.released ? game.released : "Tba"}</h6>
        </div>
        <div className="game-card-info-bottom">
          <div className="game-card-info-bottom-ratings">
            <Tooltip title="Metacritic">
              <div className="game-card-info-bottom-ratings-metacritic">
                <img src={metacriticIcon} alt="Metacritic Logo" />
                <h6>{game.metacritic || "n/a"}</h6>
              </div>
            </Tooltip>
            {/* <div className="game-card-info-bottom-ratings-esrb">
              <GetEsrbRating esrb={game.esrbRating || "pending"} />
            </div> */}
          </div>
          <div className="game-card-info-bottom-buttons">
            <Stack direction="row" spacing={0.5}>
              <Chip
                size="small"
                label="Wishlist"
                color="playstackPrimaryChip"
                sx={
                  selectedWishlist
                    ? { border: "1px solid #ffffff1f" }
                    : { bgcolor: "#1e1e1e", border: "1px solid #ffffff1f" }
                  }
                onClick={() => handleWishlistClick()}
                icon={selectedWishlist ? <WishlistRemoveIcon /> : <WishlistAddIcon />}
              />
              <Chip
                size="small"
                color="playstackPrimaryChip"
                label="Library"
                sx={
                  selectedLibrary
                    ? { border: "1px solid #ffffff1f" }
                    : { bgcolor: "#1e1e1e", border: "1px solid #ffffff1f" }
                  }
                onClick={() => handleLibraryClick()}
                icon={selectedLibrary ? <LibraryRemoveIcon /> : <LibraryAddIcon />}
              />
            </Stack>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
