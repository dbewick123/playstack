import "./gamePage.css";

import { SingleGame } from "../types/game";
import getGame from "../utilities/getGame";
import buildPlayerRatings from "../components/utilities/buildPlayerRatings";
import { Slider } from "../components/utilities/slider/Slider";
import {
  buildPlayerStatuses,
  playerStatusStandardised,
  buildPlayerStatusProps,
} from "../components/utilities/buildPlayerStatuses";
import GameBannerWrapper from "../components/containers/GameBannerWrapper";
import AnimatedCounter from "../components/utilities/animated_counter/AnimatedCounter";
import ErrorIcon from "../assets/icons/error.svg?react";

//External Components
import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";

//React Library
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@mui/material";

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

  //Setup gallary images
  let sliderImages: string[] | null = null;
  if (!singleGame?.screenshots || singleGame?.screenshots.length < 1) {
    sliderImages = null;
  } else {
    sliderImages = singleGame.screenshots.map((screenshot) => screenshot.image);
  }

  const playerRatings =
    !singleGame?.ratings || singleGame?.ratings.length < 1
      ? "n/a"
      : buildPlayerRatings(singleGame.ratings);

  //Setup status data
  let statusPlaceholder: boolean = false;
  let statuses: playerStatusStandardised[] | undefined = [];
  if (!singleGame?.added_by_status) {
    statusPlaceholder = true;
  } else {
    statuses = buildPlayerStatuses(
      singleGame.added_by_status as buildPlayerStatusProps
    );
  }

  //TEST: need to check for when loading is false but each subsection returns no data
  // Render JSX here
  return (
    isError ? 
    <div className="game-page-error">
      <div className="error-results-home">
                <div className="error-results-home-message">
                  <h2>Uh oh, we&apos;re having a connection issue</h2>
                  <p>Please try reloading the page</p>
                </div>
                <div className="error-results-home-img">
                  <ErrorIcon />
                </div>
              </div>
    </div>
    :
    <main className="game-container">
      <div className="game-primary-tile" style={isLoading ? {height:'500px'} : {}}>
        {isLoading ? (
          <div className="loading-tile-wrapper">
            <Skeleton
              variant="rounded"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
              width="100%"
              height="100%"
            />
          </div>
        ) : (
          <GameBannerWrapper singleGame={singleGame} />
        )}
      </div>
      <div className="game-page-title" style={
          !sliderImages && !isLoading
            ? { borderBottom: "1px solid var(--color-separator)" }
            : {}
        }
      >
        <h4>Gallary</h4>

        {!sliderImages && !isLoading ? (
          
          <p>Sorry, this game currently has no screenshots available</p>
        ) : (
          <p>Check out the latest screenshots</p>
        )}
      </div>
      <div className="game-media-tile" style={!sliderImages && !isLoading ? { display: "none" } : {}}>
        {isLoading ? (
          <div className="loading-tile-wrapper">
            <div className="media-load-one">
            <Skeleton
              variant="rounded"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
              width="100%"
              height="420px"
            />
            </div>
            <div className="media-load-two">
            <Skeleton
              variant="rounded"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
              width="100%"
              height="420px"
            />
            </div>
            <div className="media-load-three">
            <Skeleton
              variant="rounded"
              sx={{ bgcolor: "rgba(255, 255, 255, 0.07)"}}
              width="100%"
              height="420px"
            />
            </div>
          </div>
        ) : !sliderImages ? (
          <></>
        ) : (
          <Slider slides={sliderImages} />
        )}
      </div>

      <div className="game-additional-info-tile">
        <div className="game-additional-info-sentiment sentiment-bar">
          {isLoading ? (
            <div className="loading-tile">
              <Skeleton
                variant="text"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
                width="40%"
                height="15%"
              />
              <Skeleton
                variant="rounded"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <>
              <div className="sentiment-title">
              <h1>Player Ratings</h1>
              </div>
              {!playerRatings || playerRatings === "n/a" ? (
                <div className="no-data-tile">
                  <p>We don&apos;t have this</p>
                  <ErrorIcon />
                </div>
              ) : (
                <div className="bar-mux">
                <BarChart
                  margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
                  xAxis={[
                    {
                      data: playerRatings.map((rating) => {
                        return rating.title;
                      }),
                      colorMap: {
                        type: "ordinal",
                        colors: ["#17af68", "#8bd7b3", "#a1a38c", "#cf7673"],
                      },
                      tickLabelStyle: { fill: "#cccccc" },
                      disableLine: true,
                      disableTicks: true,
                    },
                  ]}
                  yAxis={[
                    {
                      tickLabelStyle: { fill: "#cccccc" },
                      tickLabelPlacement: "middle",
                      disableLine: true,
                      disableTicks: true,
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
                  height={250}
                  width={400}
                />
                </div>
              )}
            </>
          )}
        </div>

        <div className="game-additional-info-sentiment sentiment-pie">
          {isLoading ? (
            <div className="loading-tile">
              <Skeleton
                variant="text"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
                width="40%"
                height="15%"
              />
              <Skeleton
                variant="rounded"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <>
              <div className="sentiment-title">
              <h1>Player Activity</h1>
              </div>
              {statusPlaceholder === true || !statuses ? (
                <div className="no-data-tile">
                  <p>We don&apos;t have this</p>
                  <ErrorIcon />
                </div>
              ) : (
                <div className="pie-mux">
                <PieChart
                  series={[
                    {
                      data: statuses,
                      innerRadius: 30,
                      outerRadius: 100,
                      paddingAngle: 5,
                      cornerRadius: 5,
                      startAngle: -45,
                      endAngle: 225,
                    },
                  ]}
                  height={250}
                  width={300}
                  colors={[
                    "#a1a38c",
                    "#8bd7b3",
                    "#17af68",
                    "#8bd7b3",
                    "#cf7673",
                    "#17af68",
                  ]}
                  sx={{
                    "& .MuiChartsLegend-series": {
                      color: "var(--color-text-base) !important",
                      height: 6
                    },
                  }}
                />
                </div>
              )}
            </>
          )}
        </div>

        <div className="game-additional-info-playtime-counter">
          {isLoading ? (
            <div className="loading-tile">
              <Skeleton
                variant="text"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
                width="40%"
                height="15%"
              />
              <Skeleton
                variant="rounded"
                sx={{ bgcolor: "rgba(255, 255, 255, 0.07)" }}
                width="100%"
                height="100%"
              />
            </div>
          ) : (
            <>
              <h1>Time to Beat</h1>
              <div className={!singleGame?.playtime || singleGame?.playtime === 0 || singleGame?.playtime === -1 ? "counter-no-data" : "counter"}>
                {!singleGame?.playtime || singleGame?.playtime === 0 || singleGame?.playtime === -1 ? (
                  "-"
                ) : (
                  <AnimatedCounter
                    finalCount={
                      !singleGame?.playtime ? -1 : singleGame.playtime
                    }
                    milisecondDelay={50}
                  />
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
export default GamePage;
