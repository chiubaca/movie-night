export interface Movie {
  id: number;
  video: boolean;
  vote_count: number;
  vote_average: number;
  title: string;
  release_date: string;
  original_language: string;
  original_title: string;
  genre_ids: number[];
  backdrop_path: string;
  adult: boolean;
  overview: string;
  poster_path: string;
  popularity: number;
}

export interface Logo {
  path: string;
  aspect_ratio: number;
}

export interface Network {
  id: number;
  logo: Logo;
  name: string;
  origin_country: string;
}

export interface TV {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  networks: Network[];
  popularity: number;
}

export interface TrendingTV {
  page: number;
  results: TV[];
  total_pages: number;
  total_results: number;
}

export interface TrendingMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
