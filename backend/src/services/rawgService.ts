import dotenv from "dotenv";
dotenv.config();

import { ParsedQs } from "qs";
import type { Game } from "../types/game.js";
import type { RawgGame, RawgGamesResponse } from "../types/rawgResponses.js";

const mapRawgToGame = (raw: RawgGame): Game => ({
  id: raw.id,
  name: raw.name ?? "unknown-title",
  slug: raw.slug ?? "unknown-slug",
  released: raw.released ?? "unknown-tba",
  backgroundImage: raw.background_image ?? "unknown-background_image",
  metacritic: raw.metacritic ?? -1,
  platforms: raw.platforms?.map((p) => p.platform.id) ?? [],
  genres: raw.genres?.map((g) => g.id) ?? [],
  tags: raw.tags?.map((t) => t.name) ?? [],
  //TODO: Consider sorting so the 'first' screenshot is correct
  screenshots: raw.short_screenshots?.map((s) => s.image) ?? [],
  esrbRating: raw.esrb_rating?.name ?? null,
});

const API_URL = process.env.THIRD_PARTY_GAME_API_URL!;
const API_KEY = process.env.THIRD_PARTY_GAME_API_KEY!;

const getGameCount = async () => {
  const response = await fetch(`${API_URL}/games?key=${API_KEY}`);
  const data = (await response.json()) as RawgGamesResponse;
  return data.count;
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

export { getGameCount, getGamesSearch };
