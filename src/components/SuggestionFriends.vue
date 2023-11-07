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
        <div
          class="flex justify-between items-center mt-3"
          v-for="user in suggestUser"
          :key="user._id"
        >
          <router-link :to="'/profile/' + user._id">
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
          <button
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-sm px-5 py-1.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, onMounted, ref } from "vue";
import { UserType } from "../type";

export default defineComponent({
  name: "SuggestionFreinds",
  props: {
    loading: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const prefixURL = process.env.VUE_APP_PREFIX_URL;
    const prefix_img_url = process.env.VUE_APP_PREFIX_URL_IMG;
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;
    const prefixImg = process.env.VUE_APP_PREFIX_URL_IMG;
    const user = ref<UserType | undefined>(undefined);
    const suggestUser = ref<UserType[] | undefined>(undefined);

    onMounted(() => {
      const token = getUserToken();
      if (token) {
        getSuggest(token);
        getUserDetail(token);
      }
    });

    const getUserToken = () => {
      const token = sessionStorage.getItem("userToken");
      if (token && token.length > 0) {
        return token;
      } else {
        window.location.replace("/");
      }
    };

    const getSuggest = async (token: string) => {
      try {
        const response = await axios.get(`${prefixURL}/users/suggest/friends`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        suggestUser.value = data;
      } catch (error) {
        console.error(error);
      }
    };

    const getUserDetail = async (token: string) => {
      props.loading(true);
      try {
        const response = await axios.get(`${prefixURL}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        user.value = data;
      } catch (err) {
        console.error(err);
      } finally {
        props.loading(false);
      }
    };

    const addFriend = async (friendId: string) => {
      props.loading(true);
      try {
        const response = await axios.put(
          `${prefixURL}/users/${user.value?._id}/${friendId}`,
          { userId: user.value?._id },
          {
            headers: {
              Authorization: `Bearer ${getUserToken()}`,
            },
          }
        );
        if (response.status === 200) {
          const filter = suggestUser.value?.filter(
            (user) => user._id !== friendId
          );
          suggestUser.value = filter;
        }
      } catch (error) {
        console.error(error);
      } finally {
        props.loading(false);
      }
    };

    return {
      prefixURL,
      prefix_img_url,
      profilePicture,
      suggestUser,
      prefixImg,
    };
  },
});
</script>

<style scoped></style>
