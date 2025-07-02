import { SingleGame } from "../../types/game";
import GameBanner from "../ui/GameBanner";


//Local Component Types
interface GameBannerWrapperProps {
  singleGame: SingleGame | null
}

function GameBannerWrapper({singleGame}: GameBannerWrapperProps) {
  // Render JSX here
  return (
      <GameBanner singleGame={singleGame}/>
  );
}
export default GameBannerWrapper;
