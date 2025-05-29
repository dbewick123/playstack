import GameCard from "../ui/GameCard";
import "../ui/gameCard.css";
import { Game } from "../../types/game";

import av1 from "../../assets/temp/av1.jpg";
import av2 from "../../assets/temp/av2.jpg";
import av3 from "../../assets/temp/av3.jpg";
import av4 from "../../assets/temp/av4.jpg";

//Redux
import { useSelector } from "react-redux";

interface GameCardWrapperProps {
  loading: boolean;
  game: Game;
}

// TODO: Handle nulls when calling the actual API here
function GameCardWrapper({game, loading }: GameCardWrapperProps) {
  //TOD): Test when getting games that all fields and combos are correct. For example all different platform icons have been tested, including ones that are not found in my helper
  return (
    <GameCard
      loading={loading}
      game={{
        id: 123,
        name: "Avowed (Game of the Year Edition)",
        metacritic: 85,
        released: "2023-01-01",
        backgroundImage: av1,
        platforms: [186, 7, 187, 4, 18, 25],
        genres: ["Action", "Adventure", "role-playing-games-rpg"],
        screenshots: [av1, av2],
        esrbRating: "Mature",
        tags: [],
      }}
    />
  );
}

export default GameCardWrapper;
