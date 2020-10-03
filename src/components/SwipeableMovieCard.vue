<template>
  <img
    v-show="isCurrent"
    ref="interactElement"
    loading="lazy"
    :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`"
    :alt="movie.title"
    :style="{ transform: transformString }"
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
  onBeforeUnmount,
} from "vue";
import interact from "interactjs";
import { Movie } from "../types";

export default defineComponent({
  name: "SwipeableMovieCard",
  props: {
    isCurrent: {
      type: Boolean,
      required: true,
    },
    movie: {
      type: Object as PropType<Movie>,
      required: true,
    },
  },
  setup() {
    const staticVals = {
      interactMaxRotation: 15,
      interactOutOfSightXCoordinate: 500,
      interactOutOfSightYCoordinate: 600,
      interactYThreshold: 150,
      interactXThreshold: 100,
    };

    const interactElement = ref();
    const position = reactive({
      x: 0,
      y: 0,
      rotation: 0,
    });

    const transformString = computed(() => {
      // try destructuring later
      return `translate3D(${position.x}px, ${position.y}px, 0) rotate(${position.rotation}deg)`;
    });

    function interactSetPosition(coordinates: {
      x: number;
      y: number;
      rotation: number;
    }): void {
      position.x = coordinates.x;
      position.y = coordinates.y;
      position.rotation = coordinates.rotation;
    }

    onMounted(() => {
      console.log("Mounted!");

      interact(interactElement.value).draggable({
        listeners: {
          start() {
            // console.log("interact event", event.type, event.target);
          },
          move(event: Interact.InteractEvent) {
            const { interactMaxRotation, interactXThreshold } = staticVals;

            const x = (position.x += event.dx);
            const y = (position.y += event.dy);
            const rotation = interactMaxRotation * (x / interactXThreshold);

            // event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
            interactSetPosition({ x, y, rotation });
          },
        },
      });
    });

    onBeforeUnmount(() => {
      interact(interactElement.value).unset();
    });

    return { position, interactElement, transformString };
  },
});
</script>
