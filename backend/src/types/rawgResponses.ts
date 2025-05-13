export interface RawgGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgGame[];
  user_platforms: boolean;
}

export interface RawgGame {
  slug: string;
  name: string;
  playtime: number;
  platforms: PlatformWrapper[];
  stores: StoreWrapper[] | null;
  released: string | null;
  tba: boolean;
  background_image: string;
  rating: number;
  rating_top: number;
  ratings: Rating[];
  ratings_count: number;
  reviews_text_count: number;
  added: number;
  added_by_status: AddedByStatus | null;
  metacritic: number | null;
  suggestions_count: number;
  updated: string;
  id: number;
  score: number | null;
  clip: any; // Could be null or a specific object, depending on data
  tags: Tag[];
  esrb_rating: EsrbRating | null;
  user_game: any; // Appears to be null, can be typed more specifically if needed
  reviews_count: number;
  community_rating: number;
  saturated_color: string;
  dominant_color: string;
  short_screenshots: Screenshot[];
  parent_platforms: PlatformWrapper[];
  genres: Genre[];
}

export interface PlatformWrapper {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface StoreWrapper {
  store: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Rating {
  id: number;
  title: string;
  count: number;
  percent: number;
}

export interface AddedByStatus {
  owned?: number;
  beaten?: number;
  toplay?: number;
  dropped?: number;
  // There may be other status keys as well
  [key: string]: number | undefined;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  language: string;
  games_count: number;
  image_background: string;
}

export interface EsrbRating {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  id: number;
  image: string;
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}
