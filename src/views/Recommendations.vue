<template>
  <h1>Recomendation page</h1>
  <div></div>
</template>

<script lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { getMovieRecomendation } from "../functions/useMovieAPI";

export default {
  setup() {
    const route = useRoute();

    onMounted(() => {
      console.log("movie id is:", route.query.id);
      // TODO : Make type safe via some type assertions on route.query.id
      const movieId = route.query.id;
      getMovieRecomendation(movieId);
    });

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
