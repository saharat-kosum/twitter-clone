<template>
  <div class="flex py-3 px-5 border-solid border-b border-[#2F3336]">
    <router-link :to="'/profile/' + userData?._id">
      <img
        v-if="userData?.picturePath"
        class="objectFit w-9 h-9 me-2 rounded-full mt-1"
        alt="profile"
        :src="prefixImg + userData?.picturePath"
      />
      <img
        v-else
        class="objectFit w-9 h-9 me-2 rounded-full mt-1"
        alt="profile"
        :src="profilePicture"
      />
    </router-link>
    <div class="flex-1">
      <input
        type="text"
        placeholder="What is happening?!"
        class="w-full mb-3 leading-none bg-inherit border-none focus:ring-0"
        v-model="description"
      />
      <div v-if="imageFile" class="relative">
        <i
          class="bi bi-x-lg absolute rounded-full px-3 py-2 top-[25px] right-[10px] hover:cursor-pointer bg-black/[0.1]"
          @click="clearImage"
        ></i>
        <img :src="imageUrl" alt="upload" class="w-full mb-3 rounded" />
      </div>
      <div class="flex items-center justify-between">
        <div class="flex gap-1 text-[#1A8CD8]">
          <div
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer"
          >
            <label class="hover:cursor-pointer" for="file-input-create">
              <i class="bi bi-image"></i>
            </label>
            <input
              id="file-input-create"
              type="file"
              ref="fileInput"
              style="display: none"
              @change="handleFileInputChange"
            />
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer sm:block hidden"
          >
            <i class="bi bi-filetype-gif"></i>
          </div>
          <div
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer sm:block hidden"
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
            class="p-2 rounded-full hover:bg-[#1A8CD8]/[0.13] hover:cursor-pointer sm:block hidden"
          >
            <i class="bi bi-geo-alt"></i>
          </div>
        </div>
        <button
          @click="handlePost"
          type="button"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent, PropType, ref, watch } from "vue";
import { PostPayload, PostType, UserType } from "../type";
export default defineComponent({
  name: "CreatePost",
  props: {
    userData: Object as PropType<UserType>,
    loading: {
      type: Function,
      required: true,
    },
    sort: {
      type: Function,
      required: true,
    },
    token: String,
    setPosts: {
      type: Function,
      required: true,
    },
    posts: Array,
  },
  setup(props) {
    const count = ref<number>(0);
    const profilePicture = process.env.VUE_APP_PROFILE_IMG;
    const prefixURL = process.env.VUE_APP_PREFIX_URL;
    const prefixImg = process.env.VUE_APP_PREFIX_URL_IMG;
    const imageFile = ref<File | null>(null);
    const imageUrl = ref("");
    const description = ref("");

    watch(imageFile, (newImageFile) => {
      if (newImageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrl.value = e.target?.result as string;
        };
        reader.readAsDataURL(newImageFile);
      }
    });

    const clearImage = () => {
      imageFile.value = null;
      imageUrl.value = "";
    };

    const handleFileInputChange = (event: Event) => {
      const inputElement = event.target as HTMLInputElement;
      if (inputElement.files) {
        const fileArray = Array.from(inputElement.files);
        imageFile.value = fileArray[0];
      }
    };

    const handlePost = async () => {
      props.loading(true);
      try {
        const payload: PostPayload = {
          userId: props.userData?._id,
          description: description.value,
        };
        const formData = new FormData();
        if (imageFile.value) {
          formData.append("file", imageFile.value);
        }
        formData.append("postData", JSON.stringify(payload));

        const response = await axios.post(`${prefixURL}/posts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${props.token}`,
          },
        });
        const data: PostType = response.data;
        if (props.posts) {
          const newPost = props.posts.concat(data);
          const sortData = props.sort(newPost);
          props.setPosts(sortData);
        }
      } catch (error) {
        console.error("Error create post", error);
      } finally {
        props.loading(false);
        clearImage();
        description.value = "";
      }
    };

    return {
      count,
      profilePicture,
      imageUrl,
      clearImage,
      handleFileInputChange,
      handlePost,
      imageFile,
      prefixImg,
      description,
    };
  },
});
</script>

<style scoped></style>
