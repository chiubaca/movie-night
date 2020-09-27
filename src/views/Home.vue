<template>
  <div class="movies">
    <span v-for="(movie, key) in selectedMovies" :key="key">
      {{ movie.original_title }}
    </span>
    <div id="movies-container" class="flex flex-wrap flex-1 justify-evenly">
      <MovieCard
        v-for="(movie, key) in movieList"
        :key="key"
        :index="key"
        :movie="movie"
        @select-movie="handleSelectedMovie"
        @deselect-movie="handleDeselectedMovie"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
        @click="recomendMovies"
      >
        Recomend Me Some Movies!
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MovieCard from "../components/MovieCard.vue";
import {
  getMovies,
  movieList,
  getMovieRecomendation,
} from "../functions/useMovieAPI";
import { Movie } from "../types";

export default defineComponent({
  name: "Films",
  components: {
    MovieCard,
  },
  setup() {
    const selectedMovies = ref<{ [key: number]: Movie }>({});

    function handleSelectedMovie(payload: [number, Movie]): void {
      console.log("checked movie", payload);
      selectedMovies.value[payload[0]] = payload[1];
    }

    function handleDeselectedMovie(payload: [number, Movie]): void {
      console.log("unchecked movie", payload);
      delete selectedMovies.value[payload[0]];
    }

    function recomendMovies(): void {
      const movieIds: number[] = [];
      for (const key in selectedMovies.value) {
        movieIds.push(selectedMovies.value[key].id);
      }
      getMovieRecomendation(movieIds);
    }

    onMounted(() => {
      getMovies();
    });

    return {
      movieList,
      handleSelectedMovie,
      handleDeselectedMovie,
      selectedMovies,
      recomendMovies,
    };
  },
});
</script>
