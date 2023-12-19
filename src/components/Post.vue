<template>
  <div class="flex py-3 px-5 border-solid border-b border-[#2F3336]">
    <router-link :to="'/profile/' + post.userId">
      <img
        v-if="post?.userPicturePath"
        class="object-cover w-9 h-9 me-2 rounded-full mt-1"
        alt="profile"
        :src="prefixImg + post?.userPicturePath"
      />
      <img
        v-else
        class="object-cover w-9 h-9 me-2 rounded-full mt-1"
        alt="profile"
        :src="profilePicture"
      />
    </router-link>
    <div class="flex-1">
      <div class="flex mx-2 items-center justify-between">
        <div class="flex gap-2">
          <router-link :to="'/profile/' + post.userId">
            <div class="font-semibold">
              {{ post?.firstName + " " + post?.lastName }}
            </div>
          </router-link>
          <div class="text-[#71767C] sm:block hidden">{{ createDate }}</div>
        </div>
        <div class="relative">
          <div
            class="rounded-full text-[#71767C] hover:cursor-pointer hover:text-[#1A8CD8]"
            @click="toggleDropdown"
            ref="dotsContainer"
          >
            <i class="bi bi-three-dots"></i>
          </div>
          <div
            class="absolute z-10 right-0 hover:cursor-pointer draopDownShadow bg-white divide-y divide-gray-100 rounded-lg shadow w-32 dark:bg-[#16181C]"
            :class="{ hidden: !isDropdownOpen }"
            ref="dropdownContainer"
          >
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
              <li
                v-if="!isFriend && !isYourPost"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="addFriend(post.userId), toggleDropdown()"
              >
                Follow
              </li>
              <li
                v-if="isFriend && !isYourPost"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="removeFriend(post.userId), toggleDropdown()"
              >
                Unfollow
              </li>
              <li
                v-if="isYourPost"
                class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                @click="deletePost(post._id)"
              >
                Delete Post
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="ms-2">{{ post?.description }}</div>
      <img
        class="mt-2 mb-2 rounded-3xl border-solid border border-[#2F3336]"
        v-if="post?.picturePath"
        :src="prefixImg + post.picturePath"
      />
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
            :class="{ 'text-[#DE1673]': isLike }"
            @click="likePost(post._id)"
          >
            <i class="bi bi-heart" v-if="!isLike"></i>
            <i class="bi bi-heart-fill" v-else></i>
            <span class="ms-2" v-if="post?.likes && post?.likes.length > 0">{{
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
import {
  computed,
  defineComponent,
  onMounted,
  onUnmounted,
  PropType,
  ref,
  watch,
} from "vue";
import { PostType, UserType } from "../type";

export default defineComponent({
  name: "PostComponent",
  props: {
    post: {
      type: Object as PropType<PostType>,
      required: true,
    },
    user: {
      type: Object as PropType<UserType>,
      required: true,
    },
    deletePost: {
      type: Function,
      required: true,
    },
    likePost: {
      type: Function,
      required: true,
    },
    addFriend: {
      type: Function,
      required: true,
    },
    removeFriend: {
      type: Function,
      required: true,
    },
  },
  setup(props) {
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;
    const prefixImg = process.env.VUE_APP_PREFIX_URL_IMG;
    const createDate = ref("");
    const isDropdownOpen = ref(false);
    const isLike = ref(false);
    const isFriend = ref(false);
    const isYourPost = computed(() => props.user._id === props.post.userId);
    const dotsContainer = ref<HTMLDivElement | null>(null);
    const dropdownContainer = ref<HTMLDivElement | null>(null);

    const toggleDropdown = () => {
      isDropdownOpen.value = !isDropdownOpen.value;
    };

    const closeDropdownOnOutsideClick = (event: MouseEvent) => {
      if (
        dotsContainer.value &&
        dropdownContainer.value &&
        !dotsContainer.value.contains(event.target as Node) &&
        !dropdownContainer.value.contains(event.target as Node)
      ) {
        isDropdownOpen.value = false;
      }
    };

    onMounted(() => {
      window.addEventListener("click", closeDropdownOnOutsideClick);
    });

    onUnmounted(() => {
      window.removeEventListener("click", closeDropdownOnOutsideClick);
    });

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

    watch(
      () => props.post?.likes,
      (newVal) => {
        if (newVal && props.user._id) {
          isLike.value = newVal.includes(props.user._id);
        }
      },
      { immediate: true }
    );

    watch(
      () => props.user?.friends,
      (newVal) => {
        if (newVal && props.post.userId) {
          isFriend.value = newVal.includes(props.post.userId);
        }
      },
      { immediate: true }
    );

    return {
      profilePicture,
      props,
      createDate,
      prefixImg,
      isDropdownOpen,
      toggleDropdown,
      dotsContainer,
      dropdownContainer,
      isLike,
      isFriend,
      isYourPost,
    };
  },
});
</script>

<style scoped>
.draopDownShadow {
  box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px,
    rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;
}
</style>
