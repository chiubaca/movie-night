import { ref } from "vue";
import { Movie } from "../types";

const movieWatchList = ref<Movie[]>([]);

export { movieWatchList };
