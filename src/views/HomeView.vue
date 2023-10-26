<template>
  <div class="flex gap-7">
    <div
      style="max-width: 600px"
      class="border-solid border-x border-[#2F3336] w-[600px]"
    >
      <div class="border-b border-gray-200 dark:border-gray-700">
        <ul class="flex -mb-px text-sm font-medium text-center text-[#71767C]">
          <li class="w-1/2">
            <button
              class="inline-block p-4 rounded-t-lg w-full hover:bg-white/[0.1]"
              :class="{
                'text-white font-semibold border-[#1A8CD8] border-b-2':
                  activeTab === 1,
              }"
              @click="activateTab(1)"
            >
              For you
            </button>
          </li>
          <li class="w-1/2">
            <button
              class="inline-block hover:bg-white/[0.1] w-full p-4 border-b-2 border-transparent rounded-t-lg"
              :class="{
                'text-white font-semibold border-[#1A8CD8]': activeTab === 2,
              }"
              @click="activateTab(2)"
            >
              Following
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div v-show="activeTab === 1">
          <CreatePost />
          <PostComponent />
        </div>
        <div v-show="activeTab === 2">
          <CreatePost />
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
import CreatePost from "../components/CreatePost.vue";
import PostComponent from "../components/Post.vue";

export default defineComponent({
  name: "HomePage",
  components: { RightBarComponent, CreatePost, PostComponent },
  setup() {
    const activeTab = ref(1);
    function activateTab(tabNumber: number) {
      activeTab.value = tabNumber;
    }
    return { activeTab, activateTab };
  },
});
</script>
