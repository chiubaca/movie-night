<template>
  <img
    ref="interactElement"
    loading="lazy"
    :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
    :alt="movie.title"
    class="absolute h-64"
  />
</template>

<script lang="ts">
import {
  reactive,
  ref,
  computed,
  defineComponent,
  PropType,
  onMounted,
} from "vue";
import interact from "interactjs";
import { Movie } from "../types";

export default defineComponent({
  name: "SwipeableMovieCard",
  props: {
    index: {
      type: Number,
      required: true,
    },
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
  setup() {
    const interactElement = ref();
    const position = reactive({
      x: 0,
      y: 0,
    });

    const transformString = computed(() => {
      // try destructuring later
      return `translate3D(${position.x}px, ${position.y}px, 0)`;
    });

    onMounted(() => {
      const element = interactElement.value;
      interact(element).draggable({
        listeners: {
          start(event) {
            console.log("interact event", event.type, event.target);
          },
          move(event) {
            position.x += event.dx;
            position.y += event.dy;

            event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
          },
        },
      });
    });
    return { transformString, interactElement };
  },
});
</script>
