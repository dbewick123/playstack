//Types for returning details on a specific game
export interface RawgGameResponse {
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

export interface AddedByStatus {
  yet: number | null;
  owned: number | null;
  beaten: number | null;
  toplay: number | null;
  dropped: number | null;
  playing: number | null;
}


//Types for response from the base games request, returning a list of results
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
