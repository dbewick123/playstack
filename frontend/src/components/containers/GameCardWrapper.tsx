import GameCard from "../ui/GameCard";
import "../ui/gameCard.css";

import av1 from "../../assets/temp/av1.jpg";
import av2 from "../../assets/temp/av2.jpg";
import av3 from "../../assets/temp/av3.jpg";
import av4 from "../../assets/temp/av4.jpg";

function GameCardWrapper() {
  return (
    <>
    <GameCard
      game={{
        id: 123,
        name: "Avowed & the stinking witchet adfjkadf",
        metacritic: 85,
        released: "2023-01-01",
        backgroundImage: av1,
        platforms: ["PC", "Xbox Series X/s", "Nintendo Switch", "playstation"],
        genres: ["Action", "Adventure", "role-playing-games-rpg"],
        screenshots: [av1, av2],
        esrbRating: "Mature",
        tags: [],
      }}
    />
    <GameCard
      game={{
        id: 123,
        name: "Pokemon",
        metacritic: 85,
        released: "2023-01-01",
        backgroundImage: av1,
        platforms: ["PC", "Xbox Series X/s", "Nintendo Switch", "playstation"],
        genres: ["Action", "Adventure", "role-playing-games-rpg"],
        screenshots: [av3, av4],
        esrbRating: "Mature",
        tags: [],
      }}
    />
    </>
  );
}

export default GameCardWrapper;
