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
  name: "SwipeablePosterCard",
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
  emits: ["add-movie", "reject-movie"],
  setup(props, { emit }) {
    const staticVals = {
      interactMaxRotation: 15,
      interactOutOfSightXCoordinate: 1000,
      interactOutOfSightYCoordinate: 600,
      interactYThreshold: 150,
      interactXThreshold: 100,
    };

    // reference of movie card element for interact.js
    const interactElement = ref();

    // Movie card position
    const position = reactive({
      x: 0,
      y: 0,
      rotation: 0,
    });

    /**
     * Styling property
     */
    const transformString = computed(() => {
      const { x, y, rotation } = position;
      return `translate3D(${x}px, ${y}px, 0) rotate(${rotation}deg)`;
    });

    /**
     * Helper to quickly set the translated postion of movie card works in tandem with transformString
     */
    function interactSetPosition(coordinates: {
      x: number;
      y: number;
      rotation: number;
    }): void {
      position.x = coordinates.x;
      position.y = coordinates.y;
      position.rotation = coordinates.rotation;
    }

    /**
     * Reset position of movie card
     */
    function resetCardPosition(): void {
      interactSetPosition({ x: 0, y: 0, rotation: 0 });
    }

    /**
     * Remove interact.js properties  and events from reference element
     */
    function interactUnsetElement(): void {
      interact(interactElement.value).unset();
    }

    /**
     * Handle conditions when cards have been moved into specfic position
     */
    function handleMoviePlacement(interaction: string): void {
      interactUnsetElement();
      switch (interaction) {
        case "ACCEPT_CARD":
          console.log("YES");
          emit("add-movie");
          break;
        case "REJECT_CARD":
          console.log("NO");
          emit("reject-movie");
          break;
      }
    }

    onMounted(() => {
      interact(interactElement.value).draggable({
        inertia: true,
        listeners: {
          move(event: Interact.InteractEvent): void {
            const { interactMaxRotation, interactXThreshold } = staticVals;

            // Bind the cursor event position to vue state
            const x = (position.x += event.dx);
            const y = (position.y += event.dy);

            // Fun maths to make the card tilt depending which it's being dragged
            const rotation = interactMaxRotation * (x / interactXThreshold);
            interactSetPosition({ x, y, rotation });
          },
        },
        onend() {
          // Swipe to the right to reject the movie
          if (position.x > staticVals.interactXThreshold)
            handleMoviePlacement("REJECT_CARD");
          // Swipe to the left to accept the movie
          else if (position.x < -staticVals.interactXThreshold)
            handleMoviePlacement("ACCEPT_CARD");
          else resetCardPosition();
        },
      });
    });

    onBeforeUnmount(() => {
      interactUnsetElement();
    });

    return { position, interactElement, transformString };
  },
});
</script>
