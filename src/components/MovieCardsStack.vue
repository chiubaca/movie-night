// GameCardsStack.vue
<template>
  <div v-for="(movie, index) in movies" :key="index" class="">
    <SwipeableMovieCard :movie="movie" :is-current="index === 0" />
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import SwipeableMovieCard from "@/components/SwipeableMovieCard.vue";
import { Movie } from "@/types";

export default {
  components: {
    SwipeableMovieCard,
  },
  props: {
    movies: {
      type: Array as PropType<Movie[]>,
      required: true,
    },
  },
};
</script>
