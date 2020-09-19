<template>
  <div class="home">
    <h1 class="text-center p-5">Movie Night</h1>
    <h1 class="text-center p-5">What Do You Want to Watch Tonight?</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { getMovies } from "../functions/useMovieAPI";
export default defineComponent({
  setup() {
    onMounted(() => {
      getMovies();
    });
  },
});
</script>
