<template>
  <div>
    <div
      class="block mt-4 max-w-sm p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-[#16181C] dark:border-[#16181C]"
    >
      <h5
        class="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        Who to follow
      </h5>
      <div>
        <div class="flex justify-between items-center">
          <div
            class="capitalize hover:cursor-pointer hover:text-gray-300/[0.85] flex items-center"
          >
            <img
              class="objectFit w-9 h-9 me-2 rounded-full"
              alt="profile"
              :src="profilePicture"
            />
            username lastname
          </div>
          <button
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { UserType } from "../type";

export default defineComponent({
  name: "SuggestionFreinds",
  setup() {
    const prefixURL = process.env.VUE_APP_PREFIX_URL;
    const prefix_img_url = process.env.VUE_APP_PREFIX_URL_IMG;
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;
    const suggestUser = ref<UserType[] | undefined>(undefined);
    return { prefixURL, prefix_img_url, profilePicture, suggestUser };
  },
});
</script>

<style scoped></style>
