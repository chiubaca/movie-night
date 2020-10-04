<template>
  <SwipeableMovieCard
    v-for="(movie, index) in movies"
    :key="index"
    :movie="movie"
    :is-current="index === lastMovieIndex"
    @add-movie="$emit('add-movie', movie)"
    @reject-movie="$emit('reject-movie', movie)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import SwipeableMovieCard from "@/components/SwipeableMovieCard.vue";
import { Movie } from "@/types";

export default defineComponent({
  name: "MovieCardStack",
  components: {
    SwipeableMovieCard,
  },
  props: {
    movies: {
      type: Array as PropType<Movie[]>,
      required: true,
    },
  },
  emits: ["add-movie", "reject-movie"],
  setup(props) {
    const lastMovieIndex = computed(() => props.movies.length - 1);

    return { lastMovieIndex };
  },
});
</script>
