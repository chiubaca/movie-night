<template>
  <main id="recomendations-container" class="text-center">
    <h3 class="text-xl p-5">Want to watch any of these?</h3>
    <h4></h4>
    <div
      id="swipe-deck"
      class="flex justify-around justify-items-center items-center"
    >
      <div
        class="bg-green-300 w-1/6 m-1 rounded-full p-1"
        @click="addToWatchList"
      >
        👈
      </div>

      <div
        id="recommended-movies-container"
        class="w-4/6 flex-grow flex justify-center"
      >
        <ShowCardsStack
          :shows="recommendedShows"
          @add-show="addToWatchList"
          @reject-show="dropMovie"
        />
      </div>

      <div class="bg-red-300 w-1/6 m-1 rounded-full p-1" @click="dropMovie">
        👉
      </div>
    </div>
    <div id="buttons-container" class="flex justify-around m-5">
      <button
        class="bg-green-400 hover:bg-green-500 rounded-full h-16 w-16"
        @click="addToWatchList"
      >
        ✅
      </button>
      <button
        class="bg-red-400 hover:bg-red-500 rounded-full h-16 w-16"
        @click="dropMovie"
      >
        ❌
      </button>
    </div>
    <div id="watchlist-container">
      <h3>Watch List</h3>
      <div v-for="(movie, index) in watchList" :key="index">
        <p>{{ movie.title }}</p>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ShowCardsStack from "@/components/ShowCardsStack.vue";
import { getRecomendations } from "@/functions/useMovieAPI";
import { Show } from "@/types";

export default defineComponent({
  components: {
    ShowCardsStack,
  },
  setup() {
    const route = useRoute();
    const recommendedShows = ref<Show[]>([]);
    const watchList = ref<Show[]>([]);

    function populateRecommendedMovies(movies: Show[]): void {
      movies.forEach((movie) => {
        recommendedShows.value.push(movie);
      });
    }

    function addToWatchList(): void {
      console.log("add to watch list");
      const movie = recommendedShows.value.pop();
      if (movie === undefined) {
        console.warn("nothing to add to watch list");
        return;
      }
      watchList.value.push(movie);
    }

    function dropMovie(): void {
      console.log("dropped show");
      recommendedShows.value.pop();
    }

    onMounted(() => {
      const showId = route.query.id;
      const showType = route.query.type;

      if (typeof showId === "string" && typeof showType === "string") {
        getRecomendations(showId, showType)
          .then((resp) => {
            console.log("Got recomendations", resp);
            populateRecommendedMovies(resp);
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
      recommendedShows,
      addToWatchList,
      dropMovie,
      watchList,
    };
  },
});
</script>

<style lang="scss" scoped></style>
