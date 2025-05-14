import { describe, test, expect } from "@jest/globals";
import checkApiStatusTest from "../../src/services/checkApiStatus.js";

describe("Check external API is up", () => {
  test("Should get a 200 status code", async () => {
    const response = await checkApiStatusTest();
    expect(response).toBe(200);
  });
});
