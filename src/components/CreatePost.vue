<template>
  <div class="flex py-3 px-5 border-solid border-b border-[#2F3336]">
    <img
      class="objectFit w-9 h-9 me-2 rounded-full mt-1"
      alt="profile"
      :src="profilePicture"
    />
    <div class="flex-1">
      <input
        type="text"
        placeholder="What is happening?!"
        class="w-full mb-3 leading-none bg-inherit border-none focus:ring-0"
      />
      <div class="flex items-center justify-between">
        <div class="flex gap-1 text-[#1A8CD8]">
          <div
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer"
          >
            <i class="bi bi-image"></i>
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer"
          >
            <i class="bi bi-filetype-gif"></i>
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer"
          >
            <i class="bi bi-list-ul"></i>
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer"
          >
            <i class="bi bi-emoji-smile"></i>
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer"
          >
            <i class="bi bi-calendar-week"></i>
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer"
          >
            <i class="bi bi-geo-alt"></i>
          </div>
        </div>
        <button
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref<number>(0);
const profilePicture = process.env.VUE_APP_PROFILE_IMG;
</script>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CreatePost",
});
</script>

<style scoped></style>
