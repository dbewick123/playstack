const testMiddlewareApp = require("../../src/app");
const supertestMiddleware = require("supertest");

describe("Error Handler Middleware", () => {
  test("Should return 500 with generic error message", async () => {
    const response = await supertestMiddleware(testMiddlewareApp).get("/errorblank");
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
