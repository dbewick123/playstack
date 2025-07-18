import GameCard from "../ui/GameCard";
import "../ui/gameCard.css";
import { Game } from "../../types/game";
//Redux
interface GameCardWrapperProps {
  loading: boolean;
  game: Game;
  location?: string;
}

function GameCardWrapper({game, loading, location }: GameCardWrapperProps) {
  //TODO): Test when getting games that all fields and combos are correct. For example all different platform icons have been tested, including ones that are not found in my helper
  return (
    <GameCard
      loading={loading}
      game={game}
      location={location}
    />
  );
}

export default GameCardWrapper;
