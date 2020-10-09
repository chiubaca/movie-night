<template>
  <div
    id="show-card"
    class="w-1/2 md:w-1/4 lg:w-1/5"
    @click="selected = !selected"
  >
    <div id="mask" class="bg-red-700 relative m-4">
      <label>
        <h2
          class="hover:text-white text-center absolute hover:bg-orange-600 hover:bg-opacity-50 w-full h-full text-transparent cursor-pointer"
        >
          {{ show.title }}
        </h2>

        <img
          loading="lazy"
          :src="`https://image.tmdb.org/t/p/w500/${show.poster_path}`"
          :alt="show.title"
          class=""
        />
      </label>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, PropType, watch } from "vue";
import { Show } from "../types";

export default defineComponent({
  props: {
    index: {
      type: Number,
      required: true,
    },
    show: {
      type: Object as PropType<Show>,
      required: true,
    },
  },
  emits: ["select-show", "deselect-show"],
  setup(props, { emit }) {
    const selected = ref(false);

    watch(selected, (selected) => {
      if (selected) {
        emit("select-show", [props.index, props.show]);
        return;
      }
      emit("deselect-show", [props.index, props.show]);
    });

    return { selected };
  },
});
</script>
