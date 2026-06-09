import { describe, test, expect, afterAll } from "@jest/globals";
import testMiddlewareApp from "../../src/app.js";
import supertestMiddleware from "supertest";
import pool from "../../src/db/pool.js";

afterAll(() => pool.end());

describe("Error Handler Middleware", () => {
  test("Should return 500 with generic error message", async () => {
    const response =
      await supertestMiddleware(testMiddlewareApp).get("/errorblank");
    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("Internal Server Error");
  });
  test("Should return 500 with specific error message", async () => {
    const response = await supertestMiddleware(testMiddlewareApp).get("/error");
    expect(response.status).toBe(500);
    expect(response.body.status).toBe("error");
    expect(response.body.message).toBe("This is a test error");
  });
});
