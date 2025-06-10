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

export type { Game, SearchState };
