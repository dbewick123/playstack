import dotenv from "dotenv";
dotenv.config();

import type { Game } from "../types/game.js";
import type { RawgGame, RawgGamesResponse } from "../types/rawgResponses.js";

const mapRawgToGame = (raw: RawgGame): Game => ({
  id: raw.id,
  name: raw.name ?? "unknown-title",
  slug: raw.slug ?? "unknown-slug",
  released: raw.released ?? "unknown-tba",
  backgroundImage: raw.background_image ?? "unknown-background_image",
  metacritic: raw.metacritic ?? -1,
  platforms: raw.platforms?.map((p) => p.platform.name) ?? [],
  genres: raw.genres?.map((g) => g.name) ?? [],
  tags: raw.tags?.map((t) => t.name) ?? [],
  screenshots: raw.short_screenshots?.map((s) => s.image) ?? [],
  esrbRating: raw.esrb_rating?.name ?? null,
});

const API_URL = process.env.THIRD_PARTY_GAME_API_URL;
const API_KEY = process.env.THIRD_PARTY_GAME_API_KEY;

const getGameCount = async () => {
  const response = await fetch(`${API_URL}/games?key=${API_KEY}`);
  const data = (await response.json()) as RawgGamesResponse;
  return data.count;
};

const getGamesTextSearch = async (query: string, exact: boolean = false) => {
  let exactStub: string;

  if (!exact) {
    exactStub = "search_precise=true";
  } else {
    exactStub = "search_exact=true";
  }
  const response = await fetch(
    `${API_URL}/games?search=${query}&ordering=released&${exactStub}&key=${API_KEY}`
  );
  const data = (await response.json()) as RawgGamesResponse;
  return {
    count: data.count,
    next: data.next,
    previous: data.previous,
    games: data.results.map(mapRawgToGame),
  };
};

export { getGameCount, getGamesTextSearch };
