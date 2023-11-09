<template>
  <div
    class="flex justify-center bg-black text-white min-h-screen"
    :class="{ 'w-screen': !showNavbar }"
  >
    <div :class="{ 'md:relative xl:w-64 w-20 fixed bottom-0': showNavbar }">
      <nav
        v-if="showNavbar && isLogin"
        class="flex flex-col justify-between md:py-2 xl:w-64 md:fixed md:h-screen items-center"
      >
        <div
          class="flex w-screen justify-around bg-black border-solid border-t border-[#2F3336] md:block md:border-none md:bg-inherit md:w-auto"
        >
          <router-link to="/home" class="hidden md:inline">
            <div class="hover:bg-white/[0.13] w-fit p-3 rounded-full">
              <img class="w-7" src="../src/assets/logo-white.png" />
            </div>
          </router-link>
          <router-link to="/home">
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-house"></i>
              <span class="mx-4 hidden xl:inline">Home</span>
            </div>
          </router-link>
          <router-link to="#">
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-search"></i>
              <span class="mx-4 hidden xl:inline">Explore</span>
            </div>
          </router-link>
          <router-link to="#">
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-bell"></i>
              <span class="mx-4 hidden xl:inline">Notifications</span>
            </div>
          </router-link>
          <router-link to="#">
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-envelope"></i>
              <span class="mx-4 hidden xl:inline">Messages</span>
            </div>
          </router-link>
          <router-link to="#" class="hidden md:inline">
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-filter-square"></i>
              <span class="mx-4 hidden xl:inline">Lists</span>
            </div>
          </router-link>
          <router-link to="#" class="hidden md:inline">
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-bookmark"></i>
              <span class="mx-4 hidden xl:inline">Bookmarks</span>
            </div>
          </router-link>
          <router-link to="#" class="hidden md:inline">
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-people"></i>
              <span class="mx-4 hidden xl:inline">Communities</span>
            </div>
          </router-link>
          <router-link to="#" class="hidden md:inline">
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-twitter-x"></i>
              <span class="mx-4 hidden xl:inline">Premium</span>
            </div>
          </router-link>
          <router-link
            :to="'/profile/' + userData?._id"
            class="hidden md:inline"
          >
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-person"></i>
              <span class="mx-4 hidden xl:inline">Profile</span>
            </div>
          </router-link>
          <router-link to="#" class="hidden md:inline">
            <div
              class="hover:bg-white/[0.13] w-fit p-3 rounded-full xl:text-xl text-[26px]"
            >
              <i class="bi bi-three-dots"></i>
              <span class="mx-4 hidden xl:inline">More</span>
            </div>
          </router-link>
        </div>
        <div
          class="rightBarWidth hidden md:flex relative justify-between hover:bg-white/[0.13] hover:cursor-pointer p-3 rounded-full text-xl items-center"
          @click="toggleDropdown"
          ref="dotsContainer"
        >
          <div class="capitalize hover:cursor-pointer flex items-center">
            <img
              v-if="userData?.picturePath"
              class="object-cover w-9 h-9 xl:me-3 rounded-full"
              alt="profile"
              :src="prefixImg + userData?.picturePath"
            />
            <img
              v-else
              class="object-cover w-9 h-9 xl:me-3 rounded-full"
              alt="profile"
              :src="profilePicture"
            />
            <span class="hidden xl:inline">
              {{ userData?.firstName + " " + userData?.lastName }}
            </span>
          </div>
          <div
            class="absolute right-0 -top-20"
            :class="{ hidden: !isDropdownOpen }"
            ref="dropdownContainer"
          >
            <ul>
              <li>item1</li>
              <li>item2</li>
            </ul>
          </div>
          <div
            class="rounded-full hidden xl:inline text-[#71767C] hover:cursor-pointer hover:text-[#1A8CD8]"
          >
            <i class="bi bi-three-dots"></i>
          </div>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import "flowbite/dist/flowbite.min.js";
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import "bootstrap-icons/font/bootstrap-icons.css";
import { UserType } from "./type";
import axios from "axios";

export default defineComponent({
  name: "App",
  setup() {
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;
    const prefixURL = process.env.VUE_APP_PREFIX_URL;
    const prefixImg = process.env.VUE_APP_PREFIX_URL_IMG;
    const userData = ref<UserType | undefined>(undefined);
    const isLogin = ref(false);
    const isLoadingOpen = ref(false);
    const isDropdownOpen = ref(false);
    const dotsContainer = ref<HTMLDivElement | null>(null);
    const dropdownContainer = ref<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const closeDropdownOnOutsideClick = (event: MouseEvent) => {
      if (
        dotsContainer.value &&
        dropdownContainer.value &&
        !dotsContainer.value.contains(event.target as Node) &&
        !dropdownContainer.value.contains(event.target as Node)
      ) {
        isDropdownOpen.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener("click", closeDropdownOnOutsideClick);
    });

    onUnmounted(() => {
      window.removeEventListener("click", closeDropdownOnOutsideClick);
    });

    onMounted(() => {
      const token = getUserToken();
      if (token) {
        isLogin.value = true;
        getUserDetail(token);
      }
    });

    const getUserToken = () => {
      const token = sessionStorage.getItem("userToken");
      if (token && token.length > 0) {
        return token;
      }
    };

    const getUserDetail = async (token: string) => {
      isLoadingOpen.value = true;
      try {
        const response = await axios.get(`${prefixURL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        userData.value = data;
      } catch (err) {
        console.error(err);
      } finally {
        isLoadingOpen.value = false;
      }
    };

    return {
      profilePicture,
      isLogin,
      userData,
      isLoadingOpen,
      prefixImg,
      toggleDropdown,
      isDropdownOpen,
      dropdownContainer,
      dotsContainer,
    };
  },
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

.rightBarWidth {
  width: -webkit-fill-available;
}
</style>
