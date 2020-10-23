import { ref } from "vue";
import { Movie } from "../types";

const recommendedMovies = ref<Movie[]>([]);
const watchList = ref<Movie[]>([]);

const populateRecommendedMovies = function (movies: Movie[]): void {
  movies.forEach((movie) => {
    recommendedMovies.value.push(movie);
  });
};

const addToWatchList = function (): void {
  const movieToAdd = recommendedMovies.value.shift();
  console.log(movieToAdd);
  console.log(watchList);
};

export { recommendedMovies, populateRecommendedMovies, addToWatchList };
