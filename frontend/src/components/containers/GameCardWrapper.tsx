import GameCard from "../ui/GameCard";
import "../ui/gameCard.css";
import { Game } from "../../types/game";
//Redux
type GameCardWrapperProps =
  | {
      loading: true;
      game?: never;
      location?: string;
    }
  | {
      loading: false;
      game: Game;
      location?: string;
    };

    function GameCardWrapper(props: GameCardWrapperProps) {
      return <GameCard {...props} />;
    }

export default GameCardWrapper;
