<template>
  <div class="flex py-3 px-5 border-solid border-b border-[#2F3336]">
    <img
      v-if="post?.userPicturePath"
      class="objectFit w-9 h-9 me-2 rounded-full mt-1"
      alt="profile"
      :src="post?.userPicturePath"
    />
    <img
      v-else
      class="objectFit w-9 h-9 me-2 rounded-full mt-1"
      alt="profile"
      :src="profilePicture"
    />
    <div class="flex-1">
      <div class="flex mx-2 items-center justify-between">
        <div class="flex gap-2">
          <div class="font-semibold">
            {{ post?.firstName }} {{ post?.lastName }}
          </div>
          <div class="text-[#71767C]">{{ createDate }}</div>
        </div>
        <div
          class="rounded-full text-[#71767C] hover:cursor-pointer hover:text-[#1A8CD8]"
        >
          <i class="bi bi-three-dots"></i>
        </div>
      </div>
      <div class="ms-2">{{ post?.description }}</div>
      <img v-if="post?.picturePath" :src="post.picturePath" />
      <div class="flex items-center">
        <div class="flex w-full text-[#71767C] justify-between">
          <div
            class="p-2 rounded-full hover:bg-[#1D9BF0]/[0.13] hover:cursor-pointer hover:text-[#1D9BF0]"
          >
            <i class="bi bi-chat"></i>
            <span v-if="post?.comments && post?.comments?.length > 0">{{
              post?.comments?.length
            }}</span>
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
            <span v-if="post?.likes && post?.likes.length > 0">{{
              post.likes.length
            }}</span>
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
import { defineComponent, PropType, ref, watch } from "vue";
import { PostType } from "../type";

export default defineComponent({
  name: "PostComponent",
  props: {
    post: Object as PropType<PostType>,
  },
  setup(props) {
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;
    const createDate = ref("");

    const formatDate = (date: Date) => {
      return new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(date);
    };

    watch(
      () => props.post?.createdAt,
      (newVal) => {
        if (newVal) {
          createDate.value = formatDate(new Date(newVal));
        }
      },
      { immediate: true }
    );

    return { profilePicture, props, createDate };
  },
});
</script>

<style scoped></style>
