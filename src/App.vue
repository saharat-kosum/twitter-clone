<template>
  <div
    class="flex justify-center bg-black text-white w-screen lg:h-screen min-h-screen"
  >
    <nav v-if="showNavbar" class="flex flex-col justify-between py-2">
      <div>
        <router-link to="/home">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full">
            <img class="w-7" src="../src/assets/logo-white.png" />
          </div>
        </router-link>
        <router-link to="/home">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-house"></i>
            <span class="mx-4">Home</span>
          </div>
        </router-link>
        <router-link to="#">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-search"></i>
            <span class="mx-4">Explore</span>
          </div>
        </router-link>
        <router-link to="#">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-bell"></i>
            <span class="mx-4">Notifications</span>
          </div>
        </router-link>
        <router-link to="#">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-envelope"></i>
            <span class="mx-4">Messages</span>
          </div>
        </router-link>
        <router-link to="#">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-filter-square"></i>
            <span class="mx-4">Lists</span>
          </div>
        </router-link>
        <router-link to="#">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-bookmark"></i>
            <span class="mx-4">Bookmarks</span>
          </div>
        </router-link>
        <router-link to="#">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-people"></i>
            <span class="mx-4">Communities</span>
          </div>
        </router-link>
        <router-link to="#">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-twitter-x"></i>
            <span class="mx-4">Premium</span>
          </div>
        </router-link>
        <router-link to="/profile/:id">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-person"></i>
            <span class="mx-4">Profile</span>
          </div>
        </router-link>
        <router-link to="#">
          <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full text-xl">
            <i class="bi bi-three-dots"></i>
            <span class="mx-4">More</span>
          </div>
        </router-link>
      </div>
      <div
        class="flex justify-between hover:bg-white/[0.13] hover:cursor-pointer p-3 rounded-full text-xl"
      >
        <div>Profile</div>
        <i class="bi bi-three-dots"></i>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script lang="ts">
import "flowbite/dist/flowbite.min.js";
import { defineComponent } from "vue";
import "bootstrap-icons/font/bootstrap-icons.css";

export default defineComponent({
  name: "App",
  computed: {
    showNavbar() {
      return this.$route.path !== "/";
    },
  },
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
  list-style-type: none;
  text-decoration: none !important;
}
</style>
