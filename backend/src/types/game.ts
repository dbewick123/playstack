export interface Game {
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