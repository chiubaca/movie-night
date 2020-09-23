<template>
  <div id="movie-card" class="w-1/2 md:w-1/4 lg:w-1/5">
    <div id="mask" class="bg-red-700 relative m-4">
      <label>
        <h2
          class="hover:text-white text-center absolute hover:bg-orange-600 hover:bg-opacity-50 w-full h-full text-transparent"
        >
          {{ movie.title }}
        </h2>

        <img
          loading="lazy"
          :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
          :alt="movie.title"
          class=""
        />
        <input
          id="scales"
          v-model="selectedMovie"
          type="checkbox"
          name="scales"
          class="absolute bottom-0"
          :value="movie.name"
        />
      </label>
    </div>
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
