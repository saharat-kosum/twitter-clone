<template>
  <div class="mb-3">
    <img
      :src="coverImg"
      class="h-[200px] overflow-hidden w-full object-cover"
    />
    <div class="flex justify-between items-center mt-3 mx-3.5 relative mb-12">
      <img
        v-if="friendData?.picturePath"
        class="object-cover w-[135px] h-[135px] me-2 rounded-full mt-1 absolute -top-20"
        alt="profile"
        :src="prefixImg + friendData.picturePath"
      />
      <img
        v-else
        class="object-cover w-[135px] h-[135px] me-2 rounded-full mt-1 absolute -top-20"
        alt="profile"
        :src="profilePicture"
      />
      <div></div>
      <button
        v-if="isSameUser"
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3.5 py-2 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:bg-white/[0.1] dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Edit Profile
      </button>
      <button
        v-else-if="isFollow"
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3.5 py-2 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:bg-white/[0.1] dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Following
      </button>
      <button
        v-else
        type="button"
        class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-3.5 py-2 dark:bg-black dark:text-white dark:border-gray-600 dark:hover:bg-white/[0.1] dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Follow
      </button>
    </div>
    <div class="mx-3.5">
      <p class="text-[26px] font-bold capitalize mb-3">
        {{ friendData?.firstName + " " + friendData?.lastName }}
      </p>
      <p class="mb-1" v-if="friendData.createdAt">
        <i class="bi bi-calendar3 me-1.5"></i>
        {{ parseDate(friendData.createdAt) }}
      </p>
      <p class="mb-1">
        <i className="bi bi-geo-alt me-1.5 "></i>
        {{ friendData.location }}
      </p>
      <span class="me-4">{{ friendData.friends?.length }} Following</span>
      <span>{{ friendData.friends?.length }} Followers</span>
    </div>
    <button
      id="dropdownDefaultButton"
      data-dropdown-toggle="dropdown"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      type="button"
    >
      Dropdown button
      <svg
        class="w-2.5 h-2.5 ml-2.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      id="dropdown"
      class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
    >
      <ul
        class="py-2 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefaultButton"
      >
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Dashboard</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Settings</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Earnings</a
          >
        </li>
        <li>
          <a
            href="#"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Sign out</a
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { format } from "date-fns";
import { defineComponent, PropType } from "vue";
import { UserType } from "../type";

export default defineComponent({
  name: "ProfileHeader",
  props: {
    friendData: {
      type: Object as PropType<UserType>,
      required: true,
    },
    isSameUser: Boolean,
    isFollow: Boolean,
  },
  setup() {
    const coverImg = process.env.VUE_APP_COVER_IMG;
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;
    const prefixImg = process.env.VUE_APP_PREFIX_URL_IMG;

    const parseDate = (date: Date) => {
      const formattedDate = format(new Date(date), "dd MMM yyyy");
      return formattedDate;
    };

    return { coverImg, profilePicture, prefixImg, parseDate };
  },
});
</script>

<style scoped></style>
