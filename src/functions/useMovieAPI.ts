import { ref } from "vue";
import axios from "axios";
import { TrendingMovies, Movie } from "../types";

const movieList = ref<Movie[]>([]);
let baseURL: string;

if (process.env.NODE_ENV === "development") {
  console.log("Dev API", process.env.NODE_ENV);
  baseURL = process.env.VUE_APP_DEV_API_BASE_URL;
}
if (process.env.NODE_ENV === "production") {
  console.log("Prod API", process.env.NODE_ENV);
  baseURL = `https://${document.location.hostname}/.netlify/functions`;
}

async function getMovies(): Promise<TrendingMovies> {
  console.log({ baseURL });
  const trendingMovies = await axios.get(`${baseURL}/movies`);

  console.log("got movies", trendingMovies);
  (trendingMovies.data as TrendingMovies).results.forEach((movie) => {
    movieList.value.push(movie);
  });
  return trendingMovies.data;
}

export { movieList, getMovies };
