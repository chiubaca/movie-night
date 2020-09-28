<template>
  <div class="movies">
    <div id="movies-container" class="flex flex-wrap flex-1 justify-evenly">
      <MovieCard
        v-for="(movie, key) in movieList"
        :key="key"
        :index="key"
        :movie="movie"
        @select-movie="handleSelectedMovie"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4"
      >
        Recomend Me Some Movies!
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MovieCard from "../components/MovieCard.vue";
import router from "../router";
import {
  getMovies,
  movieList,
  // getMovieRecomendation,
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
      console.log("checked movie", payload[1].id);
      selectedMovies.value[payload[0]] = payload[1];
      router.push({
        path: "/movies/recommendations",
        query: { id: String(payload[1].id) },
      });
    }

    onMounted(() => {
      getMovies();
    });

    return {
      movieList,
      handleSelectedMovie,
    };
  },
});
</script>
