<template>
  <div class="home">
    <h1 class="text-center p-5">What 2 Watch</h1>
    <h2 class="text-center p-5">
      Find a movie to watch based on something you enjoyed recently
    </h2>
    <div id="movies-container" class="flex flex-wrap flex-1 justify-evenly">
      <MovieCard v-for="(movie, key) in movieList" :key="key" :movie="movie" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import MovieCard from "../components/MovieCard.vue";
import { getMovies, movieList } from "../functions/useMovieAPI";
export default defineComponent({
  components: {
    MovieCard,
  },
  setup() {
    onMounted(() => {
      getMovies();
    });

    return { movieList };
  },
});
</script>
