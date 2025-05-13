const checkApiStatusTest = require("../../src/services/checkApiStatus");

describe("Check external API is up", () => {
  test("Should get a 200 status code", async () => {
    const response = await checkApiStatusTest();
    expect(response).toBe(200);
  });
});
