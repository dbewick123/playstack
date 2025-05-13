const testRoutesApp = require("../../src/app");
const supertestRoutes = require("supertest");

describe("Rawg API Routes", () => {
  test("Should return the total number of games", async () => {
    const response = await supertestRoutes(testRoutesApp).get("/games/count");
    console.log(response.body.count);
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThan(0);
  });

  test("Should return the exact game that match the query", async () => {
    const response = await supertestRoutes(testRoutesApp).get(
      "/games/search/blue%20prince/true"
    );
    expect(response.status).toBe(200);
    expect(response.body.games[0].name).toBe("Blue Prince");
    expect(response.body.games[0].slug).toBe("blue-prince");
    expect(response.body.games[0].released).toBe("2025-04-10");
  });

  test("Should return multiple results for precise query", async () => {
    const response = await supertestRoutes(testRoutesApp).get(
      "/games/search/blue%20prince/false"
    );
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThan(1);
    expect(response.body.games.length).toBeGreaterThan(1);
  });
});
