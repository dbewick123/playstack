import "./gamePage.css";

import { SingleGame } from "../types/game";
import getGame from "../utilities/getGame";
import buildPlayerRatings from "../components/utilities/buildPlayerRatings";
import GameBannerWrapper from "../components/containers/GameBannerWrapper";
import { Slider } from "../components/utilities/Slider";
import {buildPlayerStatuses, playerStatusStandardised} from "../components/utilities/buildPlayerStatuses";

//External Components
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from '@mui/x-charts/PieChart';


//React Library
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GamePage() {
  //Get Parameters from URL
  const { id } = useParams();
  const gameId: number = Number(id);

  // Manage React state here
  const [singleGame, setSingleGame] = useState<SingleGame | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  //Functions here
  useEffect(() => {
    const fetchGame = async () => {
      try {
        const game = await getGame(gameId);
        setSingleGame(game);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGame();
  }, []);

  //TODO: Handle all TypeErrors/safe variable setup here
  const playerRatings = !singleGame?.ratings
    ? "n/a"
    : buildPlayerRatings(singleGame.ratings);

  //Setup gallary images
  let gallaryPlaceholder: boolean = true;
  let sliderImages: string[] = [];
  if (!singleGame?.screenshots) {
    gallaryPlaceholder = true;
  } else {
    sliderImages = singleGame.screenshots.map((screenshot) => screenshot.image);
  }

  //Setup status data
  let statusPlaceholder: boolean = true;
  let statuses: playerStatusStandardised[] = [];
  if (!singleGame?.added_by_status) {
    statusPlaceholder = true;
  } else {
    statuses = buildPlayerStatuses(singleGame.added_by_status)
  }

  // Render JSX here
  //TODO: Handle error on the UI
  return (
    <main className="game-container">
      <div className="game-primary-tile">
        <GameBannerWrapper singleGame={singleGame} />
      </div>
      <div className="game-page-title" style={{borderBottom: '1px solid var(--color-separator)'}}>
        <h4>Gallary</h4>
        {gallaryPlaceholder === true ? (
          <p>Sorry, this game currently has no media available</p>
        ) : (
          <></>
        )}
      </div>
      {gallaryPlaceholder === true ? (
        <></>
      ) : (
        <div className="game-media-tile">
          <Slider slides={sliderImages} />
        </div>
      )}

      <div className="game-page-title">
        <h4>What the Players Think</h4>
        Our data looks at xyz...
      </div>
      <div className="game-additional-info-tile">
        <div className="game-additional-info-sentiment">
          {/*TODO: Add placeholder if no data */}
          {!playerRatings || playerRatings === "n/a" ? (
            <>NO DATA YEAHHHHH</>
          ) : (
            <BarChart
              xAxis={[
                {
                  data: playerRatings.map((rating) => {
                    return rating.title;
                  }),
                  colorMap: {
                    type: "ordinal",
                    colors: ["#2fa98c", "#a8ddb5", "#ff6e6199", "#ff6e61cc"],
                  },
                },
              ]}
              series={[
                {
                  data: playerRatings.map((rating) => {
                    return Number(rating.count);
                  }),
                  color: "#2fa98c",
                },
              ]}
              height={300}
              width={400}
            />
          )}
        </div>
        <div className="game-additional-info-status">
          {/*TODO: Add placeholder if no data */}
          <PieChart
            series={[
              {
                data: statuses,
              },
            ]}
            height={250}
            width={300}
    />
        </div>
      </div>
    </main>
  );
}
export default GamePage;
