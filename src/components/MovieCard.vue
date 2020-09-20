<template>
  <div id="movie-card" class="w-1/2 md:w-1/4 lg:w-1/5">
    <span v-if="selectedMovie" class="absolute bg-gray-900 text-white">
      {{ movie.title }}
    </span>
    <label>
      <input
        id="scales"
        v-model="selectedMovie"
        type="checkbox"
        name="scales"
        class="absolute"
        :value="movie.name"
      />

      <img
        loading="lazy"
        :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
        :alt="movie.title"
        class=""
      />
    </label>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType } from "vue";
import { Movie } from "../types";

export default defineComponent({
  props: {
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
  setup() {
    const selectedMovie = ref();
    return { selectedMovie };
  },
});
</script>

<style scoped></style>
