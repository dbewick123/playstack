interface Game {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  backgroundImage: string;
  metacritic: number | null;
  platforms: number[];
  genres: number[];
  tags: string[];
  screenshots: string[];
  esrbRating: string | null;
}

interface SearchState {
  query: string;
  filters: { platforms: string[]; genres: string[] };
  results: { games: Game[]; next: string; previous: string, count: number, status: string; };
  pageSize: number;
  pageNumber: number;
  loading: boolean;
  error: string | null;
}

export interface SingleGame {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  metacritic: number | null;
  metacritic_url: string | null;
  released: string | null;
  background_image: string | null;
  website: string | null;
  rating: number | null;
  ratings: Ratings[] | null;
  added: number | null;
  added_by_status: AddedByStatus | null;
  playtime: number | null;
  screenshots_count: number | null;
  screenshots: gameScreenshots[] | null;
  reddit_url: string | null;
  platforms: PlatformWrapper[] | null;
  genres: Genre[] | null;
}

export interface Ratings {
  id: number;
  title: string;
  count: number;
  percent: number;
}

interface AddedByStatus {
  yet: number | null;
  owned: number | null;
  beaten: number | null;
  toplay: number | null;
  dropped: number | null;
  playing: number | null;
}

interface gameScreenshots {
  id: number;
  image: string;
  width: number | null;
  height: number | null;
}

export type { Game, SearchState, SingleGame };
