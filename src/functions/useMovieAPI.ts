import { ref } from "vue";
import axios from "axios";
import { TrendingMovies, TrendingTV, Movie, TV } from "../types";

const movieList = ref<Movie[]>([]);
const tvList = ref<TV[]>([]);
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
 * Get top 20 trending TV shows from MovieDB API
 */
async function getTvShows(): Promise<TrendingTV> {
  const trendingTv = await axios.get(`${baseURL}/tv`);

  (trendingTv.data as TrendingTV).results.forEach((tvShow) => {
    tvList.value.push(tvShow);
  });
  return trendingTv.data;
}

/**
 * Get recomendations on for supplied movie id
 * @param showId movie db movie id
 */
async function getMovieRecomendations(showId: string): Promise<Movie[]> {
  try {
    const recomendations = await axios.get(
      `${baseURL}/recomendations?id=${showId}&type=movie`
    );
    if (recomendations.data.error) {
      console.log("no data for this movie ID");
      return [];
    }

    return recomendations.data.results;
  } catch (err) {
    console.error("There was problem with the API", err);
    return [];
  }
}

/**
 * Get recomendations on for supplied tv id
 * @param showId movie db show id for tv
 */
async function getTvRecomendations(showId: string): Promise<TV[]> {
  try {
    const recomendations = await axios.get(
      `${baseURL}/recomendations?id=${showId}&type=tv`
    );
    if (recomendations.data.error) {
      console.log("no data for this tv ID");
      return [];
    }

    return recomendations.data.results;
  } catch (err) {
    console.error("There was problem with the API", err);
    return [];
  }
}

export {
  movieList,
  tvList,
  getMovies,
  getTvShows,
  getMovieRecomendations,
  getTvRecomendations,
};
