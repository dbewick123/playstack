import dotenv from "dotenv";
dotenv.config();

import { ParsedQs } from "qs";
import type { Game } from "../types/game.js";
import type {
  RawgGame,
  RawgGameResponse,
  RawgScreenshots,
  RawgScreenshotsResponse,
  RawgGamesResponse,
  Genre,
  PlatformWrapper,
} from "../types/rawgResponses.js";

const mapRawgToGame = (raw: RawgGame): Game => {
  return {
    id: raw.id,
    name: raw.name ?? "-1",
    slug: raw.slug ?? "-1",
    released: raw.released ?? "-1",
    backgroundImage: raw.background_image ?? "-1",
    metacritic: raw.metacritic ?? -1,
    platforms: Array.isArray(raw.platforms)
      ? raw.platforms?.map((p) => p.platform.id)
      : [],
    genres: Array.isArray(raw.genres) ? raw.genres?.map((g) => g.id) : [],
    tags: Array.isArray(raw.tags) ? raw.tags?.map((t) => t.name) : [],
    //TODO: Consider sorting so the 'first' screenshot is correct
    screenshots: raw.short_screenshots?.map((s) => s.image) ?? [],
    esrbRating: raw.esrb_rating?.name ?? null,
  };
};

//TODO: Unit test this - this test will alert me if the structure changes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapRawgGenres = (raw: any): Genre => {
  return {
    id: raw?.id ?? null,
    name: raw?.name ?? "",
    slug: raw?.slug ?? "",
  };
};

//TODO: Unit test this - this test will alert me if the structure changes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapRawgPlatforms = (raw: any): PlatformWrapper => {
  return {
    platform: {
      id: raw?.platform?.id ?? null,
      name: raw?.platform?.name ?? "",
      slug: raw?.platform?.slug ?? "",
    },
  };
};

//TODO: Unit test this - this test will alert me if the structure changes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapRawgScreenshots = (raw: any): RawgScreenshots => {
  return {
    id: raw?.id ?? null,
    image: raw?.image ?? "",
    width: raw?.width ?? -1,
    height: raw?.height ?? -1,
  };
};

const API_URL = process.env.THIRD_PARTY_GAME_API_URL!;
const API_KEY = process.env.THIRD_PARTY_GAME_API_KEY!;

const getGameCount = async () => {
  const response = await fetch(`${API_URL}/games?key=${API_KEY}`);
  const data = (await response.json()) as RawgGamesResponse;
  return data.count;
};

//TODO: Test this + its calling route (check all data is present appropriately... consider whats the best way to do this in an automated way??)
const getGame = async (id: number) => {
  try {
    const params = new URLSearchParams();
    params.append("key", API_KEY);
    const url = `${API_URL}/games/${id}?${params.toString()}`;
    const screenshotUrl = `${API_URL}/games/${id}/screenshots?${params.toString()}`;

    const response = await fetch(url);
    const screenshotsResponse = await fetch(screenshotUrl);

    if (!response.ok) {
      throw new Error(
        `RAWG API game/id req failed with status ${response.status}`
      );
    }

    const data = (await response.json()) as RawgGameResponse;
    const screenshotsData =
      (await screenshotsResponse.json()) as RawgScreenshotsResponse;

    if (!data) {
      throw new Error(`RAWG API game data is null`);
    } else {
      return {
        id: data.id ?? -1,
        slug: data.slug ?? "-1",
        name: data.name ?? "-1",
        description: data.description ?? "-1",
        metacritic: data.metacritic ?? -1,
        metacritic_url: data.metacritic_url ?? "-1",
        released: data.released ?? "-1",
        background_image: data.background_image ?? "-1",
        website: data.website ?? "-1",
        rating: data.rating ?? -1,
        ratings: data.ratings ?? [],
        added: data.added ?? -1,
        added_by_status: data.added_by_status ?? {},
        playtime: data.playtime ?? -1,
        screenshots_count: screenshotsData?.count ?? -1,
        screenshots: Array.isArray(screenshotsData.results)
          ? screenshotsData.results?.map(mapRawgScreenshots)
          : [],
        reddit_url: data.reddit_url ?? "-1",
        platforms: Array.isArray(data.platforms)
          ? data.platforms?.map(mapRawgPlatforms)
          : [],
        genres: Array.isArray(data.genres)
          ? data.genres?.map(mapRawgGenres)
          : [],
      };
    }
  } catch (error) {
    throw new Error(
      `Error caught in catch block of getGame: ${(error as Error).message}`
    );
  }
};

// TODO: test subconditions thoroughly, such as double spaces, tabs, special characters etc. When building this and the screen hung it seemed to not respond, why??
const getGamesSearch = async (query: ParsedQs) => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (typeof value !== "string" || value.trim() === "") continue;

    let finalValue = value;

    // Replace spaces in search query with '+'
    if (key === "query") {
      finalValue = finalValue.replace(/\s+/g, "%");
    }

    params.append(key, finalValue);
  }

  // Always append the API key last
  params.append("key", API_KEY);

  const url = `${API_URL}/games?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`RAWG API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as RawgGamesResponse;

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    games: data.results.map(mapRawgToGame),
  };
};

const getNextGamesPage = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`RAWG API request failed with status ${response.status}`);
  }

  const data = (await response.json()) as RawgGamesResponse;

  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    games: data.results.map(mapRawgToGame),
  };
};

export { getGameCount, getGame, getGamesSearch, getNextGamesPage };
