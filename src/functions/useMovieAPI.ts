import { ref } from "vue";
import axios from "axios";
import { TrendingMovies, Movie } from "../types";

const movieList = ref<Movie[]>([]);
const API_KEY = process.env.VUE_APP_API_KEY;

async function getMovies(): Promise<TrendingMovies> {
  const trendingMovies = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );

  console.log("got movies", trendingMovies.data);
  (trendingMovies.data as TrendingMovies).results.forEach((movie) => {
    movieList.value.push(movie);
  });
  return trendingMovies.data;
}

export { movieList, getMovies };
