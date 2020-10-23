<template>
  <SwipeablePosterCard
    v-for="(show, index) in shows"
    :key="index"
    :movie="show"
    :is-current="index === lastShowIndex"
    @add-movie="$emit('add-movie', movie)"
    @reject-movie="$emit('reject-movie', movie)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import SwipeablePosterCard from "@/components/SwipeablePosterCard.vue";
import { Movie } from "@/types";

export default defineComponent({
  name: "MovieCardStack",
  components: {
    SwipeablePosterCard,
  },
  props: {
    shows: {
      type: Array as PropType<Movie[]>,
      required: true,
    },
  },
  emits: ["add-movie", "reject-movie"],
  setup(props) {
    const lastShowIndex = computed(() => props.shows.length - 1);

    return { lastShowIndex };
  },
});
</script>
