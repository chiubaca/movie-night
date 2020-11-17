<template>
  <h2 class="text-center text-lg">Movies Watch List</h2>
  <div v-if="movieWatchList.length === 0" class="text-center">
    You have nothing in your TV watch list yet...
  </div>
  <div
    v-else
    id="movies-container"
    class="flex flex-wrap flex-1 justify-evenly"
  >
    <div
      v-for="(movie, key) in movieWatchList"
      id="movie-card"
      :key="key"
      class="w-1/2 md:w-1/4 lg:w-1/5"
    >
      <div id="mask" class="bg-red-700 relative m-4">
        <label>
          <h2
            class="hover:text-white text-center absolute hover:bg-orange-600 hover:bg-opacity-50 w-full h-full text-transparent cursor-pointer"
          >
            {{ movie.title }}
          </h2>

          <img
            loading="lazy"
            :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
            :alt="movie.title"
            class=""
          />
        </label>
      </div>
    </div>
  </div>

  <h2 class="text-center text-lg">TV Watch List</h2>
  <div v-if="movieWatchList.length === 0" class="text-center">
    You have nothing in your movie watch list yet...
  </div>
  <div v-for="(tv, key) in tvWatchList" v-else :key="key" class="text-center">
    <TVPosterCard :key="key" :index="key" :tv="tv" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { movieWatchList, tvWatchList } from "@/functions/useWatchList";
import TVPosterCard from "@/components/TVPosterCard.vue";

export default defineComponent({
  components: {
    TVPosterCard,
  },
  setup() {
    return { movieWatchList, tvWatchList };
  },
});
</script>
