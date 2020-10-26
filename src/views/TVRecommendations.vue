<template>
  <main id="tv-recomendations-container" class="text-center">
    <h3 class="text-xl p-5">Want to watch any of these TV shows?</h3>
    <h4></h4>
    <div
      id="swipe-deck"
      class="flex justify-around justify-items-center items-center"
    >
      <div
        class="bg-green-300 w-1/6 m-1 rounded-full p-1"
        @click="addToTvWatchList"
      >
        👈
      </div>

      <div id="recommended-movies-container" class="max-w-xs">
        <TVCardsStack
          :tvShows="recommendedTv"
          @add-tv="addToTvWatchList"
          @reject-tv="dropTv"
        />
      </div>

      <div class="bg-red-300 w-1/6 m-1 rounded-full p-1" @click="dropTv">
        👉
      </div>
    </div>
    <div id="buttons-container" class="flex justify-around m-5">
      <button
        class="bg-green-400 hover:bg-green-500 rounded-full h-16 w-16"
        @click="addToTvWatchList"
      >
        ✅
      </button>
      <button
        class="bg-red-400 hover:bg-red-500 rounded-full h-16 w-16"
        @click="dropTv"
      >
        ❌
      </button>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import TVCardsStack from "@/components/TVCardsStack.vue";
import { getTvRecomendations } from "@/functions/useMovieAPI";
import { tvWatchList } from "@/functions/useWatchList";
import { TV } from "@/types";

export default defineComponent({
  name: "TVRecommendations",
  components: {
    TVCardsStack,
  },
  setup() {
    const route = useRoute();
    const recommendedTv = ref<TV[]>([]);

    function addToTvWatchList(): void {
      console.log("add to watch list");
      const tv = recommendedTv.value.pop();
      if (tv === undefined) {
        console.warn("nothing to add to watch list");
        return;
      }
      tvWatchList.value.push(tv);
    }

    function dropTv(): void {
      console.log("dropped show");
      recommendedTv.value.pop();
    }

    // TODO - I dont think this is necessary
    function populateRecommendedTv(movies: TV[]): void {
      movies.forEach((movie) => {
        recommendedTv.value.push(movie);
      });
    }

    onMounted(() => {
      const tvId = route.query.id;

      if (typeof tvId === "string") {
        getTvRecomendations(tvId)
          .then((resp) => {
            console.log("Got recomendations", resp);
            // TODO - once we got the array - just mutate it?
            // also try dropping this for vue suspense
            populateRecommendedTv(resp);
          })
          .catch((err) => {
            alert("Problem getting movies");
            console.error("Problem getting movies", err);
          });
        return;
      }
      console.warn("Not a valid query");
    });

    return {
      recommendedTv,
      addToTvWatchList,
      dropTv,
      tvWatchList,
    };
  },
});
</script>
