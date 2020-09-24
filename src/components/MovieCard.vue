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
          type="checkbox"
          :name="movie.title"
          class="absolute bottom-0"
          @click="handleClick"
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Movie } from "../types";

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
  emits: ["select-movie", "deselect-movie"],
  setup(props, { emit }) {
    function handleClick(event: any): void {
      if (event.target.checked) {
        console.log("movie selected");
        emit("select-movie", [props.index, props.movie]);
        return;
      }
      console.log("movie deselected");
      emit("deselect-movie", [props.index, props.movie]);
    }
    return { handleClick };
  },
});
</script>

<style scoped></style>
