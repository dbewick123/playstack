interface Game {
  id: number;
  name: string;
  released: string | null;
  backgroundImage: string;
  metacritic: number | null;
  platforms: string[];
  genres: string[];
  tags: string[];
  screenshots: string[];
  esrbRating: string | null;
}

export type { Game };
