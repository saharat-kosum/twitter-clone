<template>
  <div class="flex gap-7">
    <LoadingComponent :isOpen="isLoadingOpen" />
    <div
      style="max-width: 600px"
      class="border-solid border-x border-[#2F3336] w-[600px]"
    >
      <div class="flex gap-3 items-center ms-3 mt-1">
        <router-link
          to="/home"
          class="p-2 rounded-full hover:bg-[#1D9BF0]/[0.13] hover:cursor-pointer"
        >
          <i class="bi bi-arrow-left"></i>
        </router-link>
        <div>Username</div>
      </div>
      <ProfileHeader />
      <div class="border-b border-gray-200 dark:border-gray-700">
        <ul class="flex -mb-px text-sm font-medium text-center text-[#71767C]">
          <li class="w-1/2">
            <button
              class="inline-block p-4 w-full hover:bg-white/[0.1]"
              :class="{
                'text-white font-semibold border-[#1A8CD8] border-b-2':
                  activeTab === 1,
              }"
              @click="activateTab(1)"
            >
              Posts
            </button>
          </li>
          <li class="w-1/2">
            <button
              class="inline-block hover:bg-white/[0.1] w-full p-4 border-b-2"
              :class="{
                'text-white font-semibold border-[#1A8CD8]': activeTab === 2,
                'border-transparent': activeTab === 1,
              }"
            >
              Replies
            </button>
          </li>
          <li class="w-1/2">
            <button
              class="inline-block hover:bg-white/[0.1] w-full p-4 border-b-2"
              :class="{
                'text-white font-semibold border-[#1A8CD8]': activeTab === 2,
                'border-transparent': activeTab === 1,
              }"
            >
              Highlights
            </button>
          </li>
          <li class="w-1/2">
            <button
              class="inline-block hover:bg-white/[0.1] w-full p-4 border-b-2"
              :class="{
                'text-white font-semibold border-[#1A8CD8]': activeTab === 2,
                'border-transparent': activeTab === 1,
              }"
            >
              Media
            </button>
          </li>
          <li class="w-1/2">
            <button
              class="inline-block hover:bg-white/[0.1] w-full p-4 border-b-2"
              :class="{
                'text-white font-semibold border-[#1A8CD8]': activeTab === 2,
                'border-transparent': activeTab === 1,
              }"
            >
              Likes
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div v-show="activeTab === 1">
          <PostComponent />
        </div>
      </div>
    </div>
    <RightBarComponent />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import RightBarComponent from "../components/RightBar.vue";
import PostComponent from "../components/Post.vue";
import ProfileHeader from "../components/ProfileHeader.vue";
import LoadingComponent from "../components/Loading.vue";

export default defineComponent({
  name: "ProfilePage",
  components: {
    RightBarComponent,
    PostComponent,
    ProfileHeader,
    LoadingComponent,
  },
  setup() {
    const isLoadingOpen = ref(false);
    const activeTab = ref(1);
    function activateTab(tabNumber: number) {
      activeTab.value = tabNumber;
    }
    return { activeTab, activateTab, isLoadingOpen };
  },
});
</script>

<style scoped></style>
