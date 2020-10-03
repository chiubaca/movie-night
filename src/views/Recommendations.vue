<template>
  <main class="text-center">
    <h3 class="text-xl p-5">Want to watch any of these?</h3>
    <div id="deck" class="flex justify-around items-baseline h-64">
      <button class="bg-green-400 p-5 rounded-lg" @click="addToWatchList">
        Yeah!😀
      </button>

      <div id="recommended-movies-container" class="w-1/4">
        <MovieCardsStack :movies="recommendedMovies" />
      </div>

      <button class="bg-red-400 p-5 rounded-lg">Nah🥱</button>
    </div>
  </main>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MovieCardsStack from "@/components/MovieCardsStack.vue";
import { getMovieRecomendation } from "@/functions/useMovieAPI";
import { Movie } from "@/types";

export default {
  components: {
    MovieCardsStack,
  },
  setup() {
    const route = useRoute();
    const recommendedMovies = ref<Movie[]>([]);
    // const watchList = ref<Movie[]>([]);

    const populateRecommendedMovies = function (movies: Movie[]): void {
      movies.forEach((movie) => {
        recommendedMovies.value.push(movie);
      });
    };

    const addToWatchList = function () {
      console.log("shifting movie");
      recommendedMovies.value.pop();
    };

    onMounted(() => {
      const movieId = route.query.id;
      getMovieRecomendation(movieId).then((resp) => {
        console.log("GOT MOVIES", resp);
        populateRecommendedMovies(resp);
      });
    });

    return { recommendedMovies, addToWatchList };
  },
};
</script>

<style lang="scss" scoped></style>
