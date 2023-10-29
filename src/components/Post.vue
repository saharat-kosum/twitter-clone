<template>
  <div class="flex py-3 px-5 border-solid border-b border-[#2F3336]">
    <img
      class="objectFit w-9 h-9 me-2 rounded-full mt-1"
      alt="profile"
      :src="profilePicture"
    />
    <div class="flex-1">
      <div class="flex mx-2 items-center justify-between">
        <div class="flex gap-2">
          <div class="font-semibold">name</div>
          <div class="text-[#71767C]">time</div>
        </div>
        <div
          class="rounded-full text-[#71767C] hover:cursor-pointer hover:text-[#1A8CD8]"
        >
          <i class="bi bi-three-dots"></i>
        </div>
      </div>
      <div class="ms-2">capture</div>
      <!-- <img /> -->
      <div class="flex items-center">
        <div class="flex w-full text-[#71767C] justify-between">
          <div
            class="p-2 rounded-full hover:bg-[#1D9BF0]/[0.13] hover:cursor-pointer hover:text-[#1D9BF0]"
          >
            <i class="bi bi-chat"></i>
            12
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#00BA7C]/[0.13] hover:cursor-pointer hover:text-[#00BA7C]"
          >
            <i class="bi bi-arrow-down-up"></i>
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#DE1673]/[0.13] hover:cursor-pointer hover:text-[#DE1673]"
          >
            <i class="bi bi-heart"></i>
            12
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#1D9BF0]/[0.13] hover:cursor-pointer hover:text-[#1D9BF0]"
          >
            <i class="bi bi-bar-chart-line-fill"></i>
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#1D9BF0]/[0.13] hover:cursor-pointer hover:text-[#1D9BF0]"
          >
            <i class="bi bi-upload"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "PostComponent",
  setup() {
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;
    return { profilePicture };
  },
});
</script>

<style scoped></style>
