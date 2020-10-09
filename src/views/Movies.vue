<template>
  <div class="movies">
    <h3 class="text-center text-sm">
      Select a movie you have previously enjoyed.
    </h3>
    <div id="movies-container" class="flex flex-wrap flex-1 justify-evenly">
      <PosterCard
        v-for="(movie, key) in movieList"
        :key="key"
        :index="key"
        :show="movie"
        @select-show="handleSelectedMovie"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PosterCard from "../components/PosterCard.vue";
import router from "../router";
import {
  getMovies,
  movieList,
  // getMovieRecomendation,
} from "../functions/useMovieAPI";
import { Show } from "../types";

export default defineComponent({
  name: "Films",
  components: {
    PosterCard,
  },
  setup() {
    const selectedMovies = ref<{ [key: number]: Show }>({});

    function handleSelectedMovie(payload: [number, Show]): void {
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
