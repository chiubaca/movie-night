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
        @click="addToMovieWatchList"
      >
        👈
      </div>

      <div id="recommended-movies-container" class="max-w-xs">
        <ShowCardsStack
          :shows="recommendedMovies"
          @add-movie="addToMovieWatchList"
          @reject-movie="dropMovie"
        />
      </div>

      <div class="bg-red-300 w-1/6 m-1 rounded-full p-1" @click="dropMovie">
        👉
      </div>
    </div>
    <div id="buttons-container" class="flex justify-around m-5">
      <button
        class="bg-green-400 hover:bg-green-500 rounded-full h-16 w-16"
        @click="addToMovieWatchList"
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
  </main>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import ShowCardsStack from "@/components/ShowCardsStack.vue";
import { getMovieRecomendations } from "@/functions/useMovieAPI";
import { movieWatchList } from "@/functions/useWatchList";
import { Movie } from "@/types";

export default defineComponent({
  components: {
    ShowCardsStack,
  },
  setup() {
    const route = useRoute();
    const recommendedMovies = ref<Movie[]>([]);

    function populateRecommendedMovies(movies: Movie[]): void {
      movies.forEach((movie) => {
        recommendedMovies.value.push(movie);
      });
    }

    function addToMovieWatchList(): void {
      console.log("add to watch list");
      const movie = recommendedMovies.value.pop();
      if (movie === undefined) {
        console.warn("nothing to add to watch list");
        return;
      }
      movieWatchList.value.push(movie);
    }

    function dropMovie(): void {
      console.log("dropped show");
      recommendedMovies.value.pop();
    }

    onMounted(() => {
      const movieId = route.query.id;
      const showType = route.query.type;

      if (typeof movieId === "string" && typeof showType === "string") {
        getMovieRecomendations(movieId)
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
      recommendedMovies,
      addToMovieWatchList,
      dropMovie,
      movieWatchList,
    };
  },
});
</script>

<style lang="scss" scoped></style>
