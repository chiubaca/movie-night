import { ref } from "vue";
import { Movie, TV } from "../types";

const movieWatchList = ref<Movie[]>([]);
const tvWatchList = ref<TV[]>([]);

export { movieWatchList, tvWatchList };
