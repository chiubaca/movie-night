<template>
  <main class="text-center">
    <h3 class="text-xl p-5">Want to watch any of these?</h3>
    <div id="deck" class="flex justify-around items-baseline h-64">
      <div id="yes" class="">
        <span class="bg-green-400 p-5 rounded-lg">Yeah!😀</span>
      </div>
      <div id="recommended-movies-container" class="w-1/4">
        <MovieCardsStack :movies="recomendedMovies" />
      </div>
      <div id="no" class="">
        <span class="bg-red-400 p-5 rounded-lg">Nah🥱</span>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import MovieCardsStack from "@/components/MovieCardsStack.vue";
import { getMovieRecomendation } from "../functions/useMovieAPI";
import { Movie } from "../types";

export default {
  components: {
    MovieCardsStack,
  },
  setup() {
    const route = useRoute();
    const recomendedMovies = ref<Movie[]>([]);

    onMounted(() => {
      const movieId = route.query.id;
      getMovieRecomendation(movieId).then((resp) => {
        console.log("GOT MOVIES", resp);
        resp.forEach((movie) => {
          recomendedMovies.value.push(movie);
        });
      });
    });

    return { recomendedMovies };
  },
};
</script>

<style lang="scss" scoped></style>
