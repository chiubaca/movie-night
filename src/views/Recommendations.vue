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
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import MovieCardsStack from "@/components/MovieCardsStack.vue";
import { getMovieRecomendation } from "@/functions/useMovieAPI";
import {
  recommendedMovies,
  populateRecommendedMovies,
  addToWatchList,
} from "@/functions/useCardDeck";

export default {
  components: {
    MovieCardsStack,
  },
  setup() {
    const route = useRoute();

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
