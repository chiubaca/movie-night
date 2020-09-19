import { ref } from "vue";
import axios from "axios";

const movieList = ref([]);
const API_KEY = process.env.VUE_APP_API_KEY;

async function getMovies() {
  const trendingMovies = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  );

  console.log("got movies", trendingMovies.data);
  return trendingMovies.data;
}

export { movieList, getMovies };
