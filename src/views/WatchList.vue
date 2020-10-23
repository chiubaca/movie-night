<template>
  <h1 class="text-center">Your watch list</h1>
  <div v-for="(movie, index) in movieWatchList" :key="index">
    {{ movie.title }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { movieWatchList } from "@/functions/useWatchList";

export default defineComponent({
  setup() {
    return { movieWatchList };
  },
});
</script>
