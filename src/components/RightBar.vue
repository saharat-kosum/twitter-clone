<template>
  <div class="mt-2 max-w-[350px] rightBarWidth">
    <form class="h-14">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          type="submit"
          class="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          class="leading-none block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#16181C] dark:border-[#16181C] dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search ..."
          v-model="search"
          @input="searchHandle"
          @blur="clearUsers"
          required
        />
        <div
          class="absolute w-full dark:bg-[#16181C] shadow draopDownShadow rounded-lg p-3"
          v-if="users && users.length !== 0"
          @mousedown="
            (event) => {
              event.preventDefault();
            }
          "
        >
          <div class="mt-3" v-for="user in users" :key="user._id">
            <router-link :to="'/profile/' + user._id" @click="clearUsers">
              <div
                class="capitalize hover:cursor-pointer hover:text-gray-300/[0.85] flex items-center"
              >
                <img
                  v-if="user.picturePath"
                  class="object-cover w-9 h-9 me-2 rounded-full"
                  alt="profile"
                  :src="prefixImg + user.picturePath"
                />
                <img
                  v-else
                  class="object-cover w-9 h-9 me-2 rounded-full"
                  alt="profile"
                  :src="profilePicture"
                />
                {{ user.firstName + " " + user.lastName }}
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </form>
    <SuggestionFreinds :loading="loading" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, ref, watch } from "vue";
import SuggestionFreinds from "../components/SuggestionFriends.vue";
import { UserType } from "../type";

export default defineComponent({
  name: "RightBarComponent",
  props: {
    loading: {
      type: Function,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  components: { SuggestionFreinds },
  setup(props) {
    const search = ref("");
    const users = ref<UserType[] | undefined>(undefined);
    const prefixURL = process.env.VUE_APP_PREFIX_URL;
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;
    const prefixImg = process.env.VUE_APP_PREFIX_URL_IMG;

    const searchHandle = async () => {
      if (search.value) {
        try {
          const response = await axios.get(
            `${prefixURL}/users/search?search=${search.value}`,
            {
              headers: {
                Authorization: `Bearer ${props.token}`,
              },
            }
          );
          const data = response.data;
          users.value = data.users;
        } catch (err) {
          console.error(err);
        }
      } else {
        users.value = undefined;
      }
    };

    const clearUsers = () => {
      users.value = undefined;
    };

    return {
      props,
      searchHandle,
      search,
      users,
      profilePicture,
      prefixImg,
      clearUsers,
    };
  },
});
</script>

<style scoped>
.rightBarWidth {
  width: -webkit-fill-available;
}
.draopDownShadow {
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px,
    rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
}
</style>
