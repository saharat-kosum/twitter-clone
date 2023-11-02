import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomePage from "../views/HomeView.vue";
import IndexPage from "../views/IndexView.vue";
import ProfilePage from "../views/ProfileView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "index",
    component: IndexPage,
  },
  {
    path: "/home",
    name: "homepage",
    component: HomePage,
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: ProfilePage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
