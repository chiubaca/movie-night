<template>
  <div class="home">
    <h1 class="text-center p-5">What 2 Watch</h1>
    <h2 class="text-center p-5">
      Find a movie to watch based on something you enjoyed recently
    </h2>
    <span v-for="(movie, key) in selectedMovie" :key="key">
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
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import MovieCard from "../components/MovieCard.vue";
import { getMovies, movieList } from "../functions/useMovieAPI";
export default defineComponent({
  name: "Films",
  components: {
    MovieCard,
  },
  setup() {
    const selectedMovie = ref<any>({});

    function handleSelectedMovie(payload: any): void {
      console.log("checked movie", payload);
      selectedMovie.value[payload[0]] = payload[1];
    }

    function handleDeselectedMovie(payload: any): void {
      console.log("unchecked movie", payload);
      delete selectedMovie.value[payload[0]];
    }

    onMounted(() => {
      getMovies();
    });

    return {
      movieList,
      handleSelectedMovie,
      handleDeselectedMovie,
      selectedMovie,
    };
  },
});
</script>
