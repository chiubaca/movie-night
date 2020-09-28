import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Movies from "../views/Movies.vue";
import Recommendation from "../views/Recommendations.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/movies",
  },
  {
    path: "/movies",
    name: "Movies",
    component: Movies,
  },
  {
    path: "/movies/recommendations",
    name: "Recommendations",
    component: Recommendation,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
