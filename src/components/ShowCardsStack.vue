<template>
  <SwipeablePosterCard
    v-for="(show, index) in shows"
    :key="index"
    :show="show"
    :is-current="index === lastShowIndex"
    @add-show="$emit('add-show', movie)"
    @reject-show="$emit('reject-show', movie)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import SwipeablePosterCard from "@/components/SwipeablePosterCard.vue";
import { Show } from "@/types";

export default defineComponent({
  name: "MovieCardStack",
  components: {
    SwipeablePosterCard,
  },
  props: {
    shows: {
      type: Array as PropType<Show[]>,
      required: true,
    },
  },
  emits: ["add-show", "reject-show"],
  setup(props) {
    const lastShowIndex = computed(() => props.shows.length - 1);

    return { lastShowIndex };
  },
});
</script>
