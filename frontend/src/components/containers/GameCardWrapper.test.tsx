import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import GameCardWrapper from "./GameCardWrapper";
import { Game } from "../../types/game";

test("renders game card with game data", () => {
  render(
    <MemoryRouter>
      <GameCardWrapper
        game={{
          id: 3328,
          name: "The Witcher 3",
          slug: "the-witcher-3",
          released: "2015-05-18",
          backgroundImage:
            "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
          metacritic: 92,
          platforms: [4, 187, 1, 18, 186, 7, 5],
          genres: [4, 5],
          tags: ["singleplayer", "multiplayer"],
          screenshots: [
            "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg",
            "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
          ],
          esrbRating: "Mature",
        }}
        loading={false}
      />
    </MemoryRouter>
  );

  const gallery = screen.getByTestId("game-card-gallery-images-test");
  expect(gallery).toHaveStyle(
    `background-image: url(https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg)`
  );

  expect(screen.getByText("The Witcher 3")).toBeInTheDocument();
  const link = screen.getByRole("link", { name: "The Witcher 3" });
  expect(link).toHaveAttribute("href", "/game/3328");

  expect(screen.getByText("92")).toBeInTheDocument();
  expect(screen.getAllByTestId("mock-platform-react-svg").length).toBe(5);
  expect(screen.getByLabelText("Action")).toBeInTheDocument();
  expect(screen.getByLabelText("RPG")).toBeInTheDocument();
  expect(screen.getByText("Release: 2015-05-18")).toBeInTheDocument();
});

test("renders game card with loading plus data", () => {
  render(
    <MemoryRouter>
      <GameCardWrapper
        game={{
          id: 3328,
          name: "The Witcher 3",
          slug: "the-witcher-3",
          released: "2015-05-18",
          backgroundImage:
            "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
          metacritic: 92,
          platforms: [4, 187, 1, 18, 186, 7, 5],
          genres: [4, 5],
          tags: ["singleplayer", "multiplayer"],
          screenshots: [
            "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg",
            "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
          ],
          esrbRating: "Mature",
        }}
        loading={true}
      />
    </MemoryRouter>
  );

  expect(screen.getAllByTitle("skeleton").length).toBe(5);
});

test("renders game card with loading and null data", () => {
  render(
    <MemoryRouter>
      <GameCardWrapper
        game={
          {
            id: null,
            name: null,
            slug: null,
            released: null,
            backgroundImage: null,
            metacritic: null,
            platforms: null,
            genres: null,
            tags: null,
            screenshots: null,
            esrbRating: null,
          } as unknown as Game
        }
        loading={true}
      />
    </MemoryRouter>
  );

  expect(screen.getAllByTitle("skeleton").length).toBe(5);
});

test("renders game card with no passed data", () => {
  render(
    <MemoryRouter>
      <GameCardWrapper
        game={
          {
            id: null,
            name: null,
            slug: null,
            released: null,
            backgroundImage: null,
            metacritic: null,
            platforms: null,
            genres: null,
            tags: null,
            screenshots: null,
            esrbRating: null,
          } as unknown as Game
        }
        loading={null as unknown as boolean}
      />
    </MemoryRouter>
  );
  expect(screen.getByText("Release: Tba")).toBeInTheDocument();
  expect(screen.getByLabelText("Metacritic")).toBeInTheDocument();
});
