<template>
  <main class="text-center">
    <h3 class="text-xl p-5">Want to watch any of these?</h3>
    <div id="deck" class="flex justify-around items-baseline h-64">
      <button class="bg-green-400 p-5 rounded-lg" @click="addToWatchList">
        Yeah!😀
      </button>

      <div id="recommended-movies-container" class="w-1/4">
        <MovieCardsStack
          :movies="recommendedMovies"
          @add-movie="addToWatchList"
          @reject-movie="dropMovie"
        />
      </div>

      <button class="bg-red-400 p-5 rounded-lg" @click="dropMovie">
        Nah🥱
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
    const watchList = ref<any[]>([]);

    function populateRecommendedMovies(movies: Movie[]): void {
      movies.forEach((movie) => {
        recommendedMovies.value.push(movie);
      });
    }

    function addToWatchList(): void {
      console.log("add to watch list");
      const movie = recommendedMovies.value.pop();
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
