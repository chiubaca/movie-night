<template>
  <div class="tv-shows">
    <h3 class="text-center text-sm">
      Select a tv show you have previously enjoyed.
    </h3>
    <div id="movies-container" class="flex flex-wrap flex-1 justify-evenly">
      <PosterCard
        v-for="(tv, key) in tvList"
        :key="key"
        :index="key"
        :show="tv"
        @select-movie="handleSelectedTvShow"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import PosterCard from "../components/PosterCard.vue";
import router from "../router";
import { getTvShows, tvList } from "../functions/useMovieAPI";
import { Show } from "../types";

export default defineComponent({
  name: "TVShows",
  components: {
    PosterCard,
  },
  setup() {
    const selectedMovies = ref<{ [key: number]: Show }>({});

    function handleSelectedTvShow(payload: [number, Show]): void {
      console.log("checked movie", payload[1].id);
      selectedMovies.value[payload[0]] = payload[1];
      router.push({
        path: "/tv/recommendations",
        query: { id: String(payload[1].id) },
      });
    }

    onMounted(() => {
      getTvShows();
    });

    return {
      tvList,
      handleSelectedTvShow,
    };
  },
});
</script>
