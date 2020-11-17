<template>
  <div id="tv-shows">
    <h3 class="text-center text-sm">
      Select a TV show you have previously enjoyed.
    </h3>
    <div id="tvshow-container" class="flex flex-wrap flex-1 justify-evenly">
      <TVPosterCard
        v-for="(tv, key) in tvList"
        :key="key"
        :index="key"
        :tv="tv"
        @select-tv="handleSelectedTV"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import TVPosterCard from "../components/TVPosterCard.vue";
import router from "../router";
import { getTvShows, tvList } from "../functions/useMovieAPI";
import { TV } from "../types";

export default defineComponent({
  name: "TVShows",
  components: {
    TVPosterCard,
  },
  setup() {
    const selectedTV = ref<{ [key: number]: TV }>({});

    function handleSelectedTV(payload: [number, TV]): void {
      console.log("checked tv", payload[1].id);
      selectedTV.value[payload[0]] = payload[1];
      router.push({
        path: "/tv-recommendations",
        query: { id: String(payload[1].id), type: "tv" },
      });
    }

    onMounted(() => {
      getTvShows();
    });

    return {
      tvList,
      handleSelectedTV,
    };
  },
});
</script>
