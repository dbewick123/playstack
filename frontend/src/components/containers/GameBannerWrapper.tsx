import { SingleGame } from "../../types/game";
import GameBanner from "../ui/GameBanner";

//External Components
//React Library

//Local Component Types
interface GameBannerWrapperProps {
  singleGame: SingleGame | null
}

function GameBannerWrapper({singleGame}: GameBannerWrapperProps) {
  //Process Parameters
  // Manage React state here
  //Functions here
  //Handle all TypeErrors/safe variable setup here 
    //INC null singleGame

  // Render JSX here
  return (
      <GameBanner singleGame={singleGame}/>
  );
}
export default GameBannerWrapper;
