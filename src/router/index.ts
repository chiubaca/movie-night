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
    path: "/recommendations",
    name: "Recommendations",
    component: (): Component => import("../views/Recommendations.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
