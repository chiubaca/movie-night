import { Component } from "vue";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/movies",
  },
  {
    path: "/movies",
    name: "Movies",
    component: (): Component => import("../views/Movies.vue"),
  },
  {
    path: "/tv",
    name: "TV",
    component: (): Component => import("../views/TV.vue"),
  },
  {
    path: "/movie-recommendations",
    name: "MovieRecommendations",
    component: (): Component => import("../views/MovieRecommendations.vue"),
  },
  {
    path: "/tv-recommendations",
    name: "TVRecommendations",
    component: (): Component => import("../views/TVRecommendations.vue"),
  },
  {
    path: "/watchlist",
    name: "WatchList",
    component: (): Component => import("../views/WatchList.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
