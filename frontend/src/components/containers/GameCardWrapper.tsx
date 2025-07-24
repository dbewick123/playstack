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
  return (
    <GameCard
      loading={loading}
      game={game}
      location={location}
    />
  );
}

export default GameCardWrapper;
