<template>
  <h1>Recomendation page</h1>
  <div v-for="(movie, key) in recomendedMovies" :key="key">
    {{ movie.original_title }}
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getMovieRecomendation } from "../functions/useMovieAPI";
import { Movie } from "../types";

export default {
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
