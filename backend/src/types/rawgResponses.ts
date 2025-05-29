export interface RawgGamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: RawgGame[];
}

export interface RawgGame {
  id: number;
  slug: string;
  name: string;
  released: string | null;
  tba: boolean;
  background_image: string;
  metacritic: number | null;
  playtime: number;
  updated: string;
  esrb_rating: EsrbRating | null;
  platforms: PlatformWrapper[];
  stores: StoreWrapper[] | null;
  tags: Tag[];
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
