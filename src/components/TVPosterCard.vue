<template>
  <div
    id="tv-poster-card"
    class="w-1/2 md:w-1/4 lg:w-1/5"
    @click="selected = !selected"
  >
    <div id="mask" class="bg-red-700 relative m-4">
      <label>
        <h2
          class="hover:text-white text-center absolute hover:bg-orange-600 hover:bg-opacity-50 w-full h-full text-transparent cursor-pointer"
        >
          {{ tv.name }}
        </h2>

        <img
          loading="lazy"
          :src="`https://image.tmdb.org/t/p/w500/${tv.poster_path}`"
          :alt="tv.name"
          class=""
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, watch } from "vue";
import { TV } from "../types";

export default defineComponent({
  name: "TVPosterCard",
  props: {
    index: {
      type: Number,
      required: true,
    },
    tv: {
      type: Object as PropType<TV>,
      required: true,
    },
  },
  emits: ["select-tv", "deselect-tv"],
  setup(props, { emit }) {
    const selected = ref(false);

    watch(selected, (selected) => {
      if (selected) {
        emit("select-tv", [props.index, props.tv]);
        return;
      }
      emit("deselect-tv", [props.index, props.tv]);
    });

    return { selected };
  },
});
</script>
