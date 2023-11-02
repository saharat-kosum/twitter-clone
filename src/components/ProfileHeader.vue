<template>
  <div class="mb-3">
    <img
      :src="coverImg"
      class="h-[200px] overflow-hidden w-full object-cover"
    />
    <div class="flex justify-between items-center mt-3 mx-3.5 relative mb-12">
      <img
        v-if="friendData?.picturePath"
        class="objectFit w-[135px] h-[135px] me-2 rounded-full mt-1 absolute -top-20"
        alt="profile"
        :src="friendData.picturePath"
      />
      <img
        v-else
        class="objectFit w-[135px] h-[135px] me-2 rounded-full mt-1 absolute -top-20"
        alt="profile"
        :src="profilePicture"
      />
      <div></div>
      <button
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3.5 py-2 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:bg-white/[0.1] dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Edit Profile
      </button>
    </div>
    <div class="mx-3.5">
      <p>username</p>
      <p>date</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { UserType } from "../type";

export default defineComponent({
  name: "ProfileHeader",
  props: {
    friendData: Object as PropType<UserType>,
  },
  setup() {
    const coverImg = process.env.VUE_APP_COVER_IMG;
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;

    return { coverImg, profilePicture };
  },
});
</script>

<style scoped></style>
