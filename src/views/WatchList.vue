<template>
  <h2 class="text-center">Movies Watch List</h2>
  <div v-for="(movie, key) in movieWatchList" :key="key" class="text-center">
    <MoviePosterCard :key="key" :index="key" :movie="movie" />
  </div>

  <h2 class="text-center">TV Watch List</h2>
  <div v-for="(tv, key) in tvWatchList" :key="key" class="text-center">
    <TVPosterCard :key="key" :index="key" :tv="tv" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { movieWatchList, tvWatchList } from "@/functions/useWatchList";
import TVPosterCard from "@/components/TVPosterCard.vue";
import MoviePosterCard from "@/components/MoviePosterCard.vue";

export default defineComponent({
  components: {
    TVPosterCard,
    MoviePosterCard,
  },
  setup() {
    return { movieWatchList, tvWatchList };
  },
});
</script>
