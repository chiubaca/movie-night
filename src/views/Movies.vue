<template>
  <div class="movies">
    <h3 class="text-center text-sm">
      Select a movie you have previously enjoyed.
    </h3>
    <div id="movies-container" class="flex flex-wrap flex-1 justify-evenly">
      <MoviePosterCard
        v-for="(movie, key) in movieList"
        :key="key"
        :index="key"
        :movie="movie"
        @select-movie="handleSelectedMovie"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MoviePosterCard from "../components/MoviePosterCard.vue";
import router from "../router";
import { getMovies, movieList } from "../functions/useMovieAPI";
import { Movie } from "../types";

export default defineComponent({
  name: "Movies",
  components: {
    MoviePosterCard,
  },
  setup() {
    const selectedMovies = ref<{ [key: number]: Movie }>({});

    function handleSelectedMovie(payload: [number, Movie]): void {
      console.log("checked movie", payload[1].id);
      selectedMovies.value[payload[0]] = payload[1];
      router.push({
        path: "/recommendations",
        query: { id: String(payload[1].id), type: "movie" },
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
