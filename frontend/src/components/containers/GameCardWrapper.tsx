import GameCard from "../ui/GameCard";
import "../ui/gameCard.css";
import { Game } from "../../types/game";
//Redux
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
      game={game}
    />
  );
}

export default GameCardWrapper;
