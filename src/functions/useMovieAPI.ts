import { ref } from "vue";
import axios from "axios";
import { TrendingMovies, Movie } from "../types";

const movieList = ref<Movie[]>([]);
let baseURL: string;

/**
 * Setup dev & prod base urls so that it works both locally and in Netlify
 */
if (process.env.NODE_ENV === "development") {
  console.log("Dev API", process.env.NODE_ENV);
  baseURL = process.env.VUE_APP_DEV_API_BASE_URL;
}
if (process.env.NODE_ENV === "production") {
  console.log("Prod API", process.env.NODE_ENV);
  baseURL = `https://${document.location.hostname}/.netlify/functions`;
}

/**
 * Get top 20 trending movies from MovieDB API
 */
async function getMovies(): Promise<TrendingMovies> {
  const trendingMovies = await axios.get(`${baseURL}/movies`);

  (trendingMovies.data as TrendingMovies).results.forEach((movie) => {
    movieList.value.push(movie);
  });
  return trendingMovies.data;
}

/**
 * Get movie recomendations
 * TODO: make type safe
 */
async function getMovieRecomendation(movieId: any): Promise<any> {
  const recomendations = axios.get(
    `${baseURL}/movie-recomendations?id=${movieId}`
  );
  return recomendations;
}

export { movieList, getMovies, getMovieRecomendation };
