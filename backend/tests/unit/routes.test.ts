import { describe, test, expect } from "@jest/globals";
import testRoutesApp from "../../src/app.js";
import supertestRoutes from "supertest";

describe("Rawg API Routes", () => {
  test("Should return the total number of games", async () => {
    const response = await supertestRoutes(testRoutesApp).get("/games/count");
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThan(0);
  });

  test("Should return the exact game that match the query", async () => {
    const response = await supertestRoutes(testRoutesApp).get(
      "/games/query?search=blue%prince&search_exact=true"
    );

    expect(response.status).toBe(200);
    expect(response.body.games[0].name).toBe("Blue Prince");
    expect(response.body.games[0].slug).toBe("blue-prince");
    expect(response.body.games[0].released).toBe("2025-04-10");
    expect(response.body.games[0].backgroundImage).toBeTruthy();
    expect(response.body.games[0].platforms).toEqual(
      expect.arrayContaining([4, 187, 186])
    );
    expect(response.body.games[0].genres).toEqual(
      expect.arrayContaining([51, 10, 3, 7])
    );
    expect(response.body.games[0].screenshots[0]).toBeTruthy();
  });

  test("Should return multiple results for precise query", async () => {
    const response = await supertestRoutes(testRoutesApp).get(
      "/games/query?search=blue%prince&search_precise=true"
    );
    expect(response.status).toBe(200);
    expect(response.body.count).toBeGreaterThan(1);
    expect(response.body.games.length).toBeGreaterThan(1);
  });
});
