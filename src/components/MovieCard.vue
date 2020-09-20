<template>
  <div id="movie-card" class="">
    <span>{{ movie.title }}</span>
    <img
      :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
      :alt="movie.title"
      class="w-40"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Movie } from "../types";

export default defineComponent({
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style scoped></style>
