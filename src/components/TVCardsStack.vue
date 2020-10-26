<template>
  <SwipeableTVPosterCard
    v-for="(tv, index) in tvShows"
    :key="index"
    :tv="tv"
    :is-current="index === lastTvIndex"
    @add-tv="$emit('add-tv', tv)"
    @reject-tv="$emit('reject-tv', tv)"
  />
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import SwipeableTVPosterCard from "@/components/SwipeableTVPosterCard.vue";
import { TV } from "@/types";

export default defineComponent({
  name: "TVCardsStack",
  components: {
    SwipeableTVPosterCard,
  },
  props: {
    tvShows: {
      type: Array as PropType<TV[]>,
      required: true,
    },
  },
  emits: ["add-tv", "reject-tv"],
  setup(props) {
    const lastTvIndex = computed(() => props.tvShows.length - 1);

    return { lastTvIndex };
  },
});
</script>
