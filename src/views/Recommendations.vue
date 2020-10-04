<template>
  <main id="recomendations-container" class="text-center">
    <h3 class="text-xl p-5">Want to watch any of these?</h3>
    <h4></h4>
    <div
      id="swipe-deck"
      class="flex justify-around justify-items-center items-center"
    >
      <div
        class="bg-green-300 w-1/6 m-1 rounded-full p-1"
        @click="addToWatchList"
      >
        👈
      </div>

      <div
        id="recommended-movies-container"
        class="w-4/6 flex-grow flex justify-center"
      >
        <MovieCardsStack
          :movies="recommendedMovies"
          @add-movie="addToWatchList"
          @reject-movie="dropMovie"
        />
      </div>

      <div class="bg-red-300 w-1/6 m-1 rounded-full p-1" @click="dropMovie">
        👉
      </div>
    </div>
    <div id="buttons-container" class="flex justify-around m-5">
      <button
        class="bg-green-400 hover:bg-green-500 rounded-full h-16 w-16"
        @click="addToWatchList"
      >
        ✅
      </button>
      <button
        class="bg-red-400 hover:bg-red-500 rounded-full h-16 w-16"
        @click="dropMovie"
      >
        ❌
      </button>
    </div>
    <div id="watchlist-container">
      <h3>Watch List</h3>
      <div v-for="(movie, index) in watchList" :key="index">
        <p>{{ movie.title }}</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MovieCardsStack from "@/components/MovieCardsStack.vue";
import { getMovieRecomendation } from "@/functions/useMovieAPI";
import { Movie } from "@/types";

export default defineComponent({
  components: {
    MovieCardsStack,
  },
  setup() {
    const route = useRoute();
    const recommendedMovies = ref<Movie[]>([]);
    const watchList = ref<Movie[]>([]);

    function populateRecommendedMovies(movies: Movie[]): void {
      movies.forEach((movie) => {
        recommendedMovies.value.push(movie);
      });
    }

    function addToWatchList(): void {
      console.log("add to watch list");
      const movie = recommendedMovies.value.pop();
      if (movie === undefined) {
        console.warn("nothing to add to watch list");
        return;
      }
      watchList.value.push(movie);
    }

    function dropMovie(): void {
      console.log("dropped movie");
      recommendedMovies.value.pop();
    }

    onMounted(() => {
      const movieId = route.query.id;
      getMovieRecomendation(movieId).then((resp) => {
        console.log("GOT MOVIES", resp);
        populateRecommendedMovies(resp);
      });
    });

    return { recommendedMovies, addToWatchList, dropMovie, watchList };
  },
});
</script>

<style lang="scss" scoped></style>
