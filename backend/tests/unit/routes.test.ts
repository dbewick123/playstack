import { describe, test, expect } from "@jest/globals";
import testRoutesApp from "../../src/app.js";
import supertestRoutes from "supertest";

describe("Rawg API Routes (Thirdparty Contract Test)", () => {
  //Count Route Test
  test("Should return the total number of games", async () => {
    const response = await supertestRoutes(testRoutesApp).get("/games/count");
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThan(0);
  });

  //Get Game Route Tests
  test("Should return the game by ID, with all appropriate fields", async () => {
    const response = await supertestRoutes(testRoutesApp).get("/games/3328");

    expect(response.body.id).toBe(3328);
    expect(response.body.slug).toBe("the-witcher-3-wild-hunt");
    expect(response.body.name).toBe("The Witcher 3: Wild Hunt");
    expect(response.body.description).toBe(
      "<p>The third game in a series, it holds nothing back from the player. Open world adventures of the renowned monster slayer Geralt of Rivia are now even on a larger scale. Following the source material more accurately, this time Geralt is trying to find the child of the prophecy, Ciri while making a quick coin from various contracts on the side. Great attention to the world building above all creates an immersive story, where your decisions will shape the world around you.</p>\n<p>CD Project Red are infamous for the amount of work they put into their games, and it shows, because aside from classic third-person action RPG base game they provided 2 massive DLCs with unique questlines and 16 smaller DLCs, containing extra quests and items.</p>\n<p>Players praise the game for its atmosphere and a wide open world that finds the balance between fantasy elements and realistic and believable mechanics, and the game deserved numerous awards for every aspect of the game, from music to direction.</p>"
    );
    expect(response.body.metacritic).toBe(92);
    expect(response.body.metacritic_url).toBe(
      "https://www.metacritic.com/game/playstation-4/the-witcher-3-wild-hunt"
    );
    expect(response.body.released).toBe("2015-05-18");
    expect(response.body.background_image).toBe(
      "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg"
    );
    expect(response.body.website).toBe("https://thewitcher.com/en/witcher3");
    expect(response.body.rating).toBe(4.64);
    expect(response.body.ratings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 5, title: "exceptional" }),
        expect.objectContaining({ id: 4, title: "recommended" }),
        expect.objectContaining({ id: 3, title: "meh" }),
        expect.objectContaining({ id: 1, title: "skip" }),
      ])
    );
    expect(response.body.added).toBeGreaterThan(0);
    expect(response.body.added_by_status).toEqual(
      expect.objectContaining({
        yet: expect.anything(),
        owned: expect.anything(),
        beaten: expect.anything(),
        toplay: expect.anything(),
        dropped: expect.anything(),
        playing: expect.anything(),
      })
    );
    expect(response.body.playtime).toBeGreaterThan(30);
    expect(response.body.screenshots_count).toBe(6);
    expect(response.body.screenshots).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 30336,
          image:
            "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500.jpg",
        }),
        expect.objectContaining({
          id: 30337,
          image:
            "https://media.rawg.io/media/screenshots/6a0/6a08afca95261a2fe221ea9e01d28762.jpg",
        }),
      ])
    );
    expect(response.body.reddit_url).toBe(
      "https://www.reddit.com/r/thewitcher3/"
    );
    expect(response.body.platforms).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          platform: {
            id: 186,
            name: "Xbox Series S/X",
            slug: "xbox-series-x",
          },
        }),
        expect.objectContaining({
          platform: {
            id: 187,
            name: "PlayStation 5",
            slug: "playstation5",
          },
        }),
        expect.objectContaining({
          platform: {
            id: 18,
            name: "PlayStation 4",
            slug: "playstation4",
          },
        }),
        expect.objectContaining({
          platform: {
            id: 7,
            name: "Nintendo Switch",
            slug: "nintendo-switch",
          },
        }),
        expect.objectContaining({
          platform: {
            id: 4,
            name: "PC",
            slug: "pc",
          },
        }),
      ])
    );
    expect(response.body.genres).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 4,
          name: "Action",
          slug: "action",
        }),
        expect.objectContaining({
          id: 5,
          name: "RPG",
          slug: "role-playing-games-rpg",
        }),
      ])
    );
  });

  test("Should return placeholder values when invalid game id passed", async () => {
    const response = await supertestRoutes(testRoutesApp).get(
      "/games/332878787878"
    );

    expect(response.status).toBe(500);
    expect(response.body.message).toBe("Error caught in catch block of getGame: RAWG API game/id req failed with status 404");
  });
  test("Should fail with missing param error", async () => {
    const response = await supertestRoutes(testRoutesApp).get("/games/");
    expect(response.status).toBe(404);
  });

  //Search Route Tests
  test("Should return multiple results for null query", async () => {
    const response = await supertestRoutes(testRoutesApp).get(
      "/games/query?search=''"
    );
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThan(1);
    expect(response.body.games.length).toBeGreaterThan(1);
  });

  test("Should return multiple results for precise query", async () => {
    const response = await supertestRoutes(testRoutesApp).get(
      "/games/query?search=blue%prince&search_precise=true"
    );
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThan(1);
    expect(response.body.games.length).toBeGreaterThan(1);
  });

  test("Should return the exact game that match the query, with all appropriate fields", async () => {
    const response = await supertestRoutes(testRoutesApp).get(
      "/games/query?search=blue%prince&search_exact=true"
    );

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(response.body.next).toBeNull();
    expect(response.body.previous).toBeNull();
    expect(response.body.games[0].id).toBe(1001007);
    expect(response.body.games[0].name).toBe("Blue Prince");
    expect(response.body.games[0].slug).toBe("blue-prince");
    expect(response.body.games[0].released).toBe("2025-04-10");
    expect(response.body.games[0].backgroundImage).toBeTruthy();
    expect(response.body.games[0].metacritic).toBeTruthy();

    expect(response.body.games[0].platforms).toEqual(
      expect.arrayContaining([4, 187, 186])
    );
    expect(response.body.games[0].genres).toEqual(
      expect.arrayContaining([51, 10, 3, 7])
    );
    expect(response.body.games[0].screenshots.length).toBeGreaterThan(0);
  });

  test("Should return no games, and appropriate metadata", async () => {
    const response = await supertestRoutes(testRoutesApp).get(
      "/games/query?search=thiswontreturnanyresults&search_exact=true"
    );
    expect(response.body).toStrictEqual({
      count: 0,
      next: null,
      previous: null,
      games: [],
    });
  });

  //Search Next Page Test, as well as other data that is sent with it (outside game)
  test("Should return a list of 20 games", async () => {
    const encodedUrl = encodeURIComponent(
      "https://api.rawg.io/api/games?dates=1960-01-01%2C2025-07-04&key=c8bec4463460469fb24570ed1fff43b7&page=2&page_size=20&search_precise=true"
    );

    const response = await supertestRoutes(testRoutesApp).get(
      `/games/proxy?targetUrl=${encodedUrl}`
    );

    expect(response.body.games).toHaveLength(20);
    expect(response.body.count).toBeGreaterThan(100000);
    expect(response.body).toEqual(
      expect.objectContaining({
        next: "https://api.rawg.io/api/games?dates=1960-01-01%2C2025-07-04&key=c8bec4463460469fb24570ed1fff43b7&page=3&page_size=20&search_precise=true",
        previous:
          "https://api.rawg.io/api/games?dates=1960-01-01%2C2025-07-04&key=c8bec4463460469fb24570ed1fff43b7&page_size=20&search_precise=true",
      })
    );
  });
});
