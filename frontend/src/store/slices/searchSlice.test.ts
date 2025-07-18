jest.mock("../../config", () => ({
  BACKEND_API_URL: "https://mocked.api.url",
}));

import { fetchSearchResults } from "./searchSlice";
import searchReducer from "./searchSlice";
import { SearchState } from "../../types/game";

describe("fetchSearchResults thunk", () => {
  const originalFetch = global.fetch;

  //clear the global fetch obj & mocks each time we complete a test
  afterEach(() => {
    global.fetch = originalFetch;
    jest.clearAllMocks();
  });

  it("dispatches fulfilled action with data", async () => {
    // Create mock return data, for use in mock fetch and to compare to final payload of fulfilled action
    const mockResponseData = {
      results: {
        count: 2,
        next: "testnexturl.url.com",
        previous: "testpreviousurl.url.com",
        games: [
          {
            id: 3327,
            name: "The Witcher 2",
            slug: "the-witcher-2",
            released: "2010-05-18",
            backgroundImage:
              "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbcw2.jpg",
            metacritic: 92,
            platforms: [4, 187],
            genres: [4],
            tags: ["singleplayerw2", "multiplayerw2"],
            screenshots: [
              "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266adeb500w2.jpg",
              "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbcw2.jpg",
            ],
            esrbRating: "Adult",
          },
          {
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
          },
        ],
      },
    };

    //Mock a successful fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
      })
    ) as jest.Mock;

    // Initial state for the action to use to build the search url
    const preloadedState: SearchState = {
      query: "zelda",
      filters: { genres: ["3", "2"], platforms: ["187", "18"] },
      results: {
        games: [],
        next: "",
        previous: "",
        count: 0,
        status: "ok",
      },
      pageSize: 20,
      pageNumber: 1,
      loading: false,
      error: null,
    };

    // Create mock dispatch to mimic what RTK does with useDispatch, then set the initial mock state
    const mockDispatch = jest.fn();

    const mockGetState = () => ({
      search: preloadedState,
    });

    // extract the actual thunk function into 'thunk' so we can run while controlling arguments
    const thunk = fetchSearchResults();
    const result = await thunk(mockDispatch, mockGetState, undefined);

    // Check that the URL used is correctly built
    const urlCalled = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    const parsedURL = new URL(urlCalled);

    expect(parsedURL.pathname).toContain("/games/query");
    expect(decodeURIComponent(parsedURL.searchParams.get("genres")!)).toBe(
      "3,2"
    );
    expect(decodeURIComponent(parsedURL.searchParams.get("platforms")!)).toBe(
      "187,18"
    );
    expect(parsedURL.searchParams.get("search")).toBe("zelda");
    expect(parsedURL.searchParams.get("page_size")).toBe("20");
    expect(parsedURL.searchParams.get("page")).toBe("1");
    expect(parsedURL.searchParams.get("search_exact")).toBe("true");
    expect(parsedURL.searchParams.get("dates")).toMatch(
      /^1995-01-01,\d{4}-\d{2}-\d{2}$/
    );

    //Check that the payload matches the expected response results
    expect(result.type).toBe("search/fetchSearchResults/fulfilled");
    expect(result.payload).toEqual(mockResponseData);
  });

  it("should set loading to true when fetchSearchResults is pending", () => {
    const initialState = {
      query: "zelda",
      filters: { genres: [], platforms: [] },
      results: { games: [], count: 0, next: "", previous: "", status: "ok" },
      pageSize: 10,
      pageNumber: 1,
      loading: false,
      error: null,
    };

    const newState = searchReducer(
      initialState,
      fetchSearchResults.pending("", undefined)
    );

    expect(newState.loading).toBe(true);
    expect(newState.error).toBeNull();
  });
});
