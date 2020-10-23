<template>
  <h1 class="text-center">Your watch list</h1>
  <div v-for="(show, index) in watchList" :key="index">
    {{ show.original_name }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { watchList } from "@/functions/useWatchList";

export default defineComponent({
  setup() {
    return { watchList };
  },
});
</script>

<style scoped></style>
