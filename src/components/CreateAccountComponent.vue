<template>
  <div>
    <transition name="fade">
      <div v-if="isModalVisible">
        <div
          @click="onToggle"
          class="fixed inset-0 bg-gray-500 opacity-50 z-10"
        ></div>
        <div
          class="absolute z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-lg p-3 mx-auto rounded-xl shadow-lg bg-black"
        >
          <button
            @click="onToggle"
            class="absolute top-3 left-3 text-white hover:text-white/50"
          >
            <i class="bi bi-x-lg"></i>
          </button>
          <div>
            <div class="p-5">
              <h1 class="text-3xl my-3">Create your account</h1>
              <form>
                <div class="relative z-0 w-full mb-6 group">
                  <input
                    type="email"
                    name="floating_email"
                    id="floating_email"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    v-model="userData.email"
                  />
                  <label
                    for="floating_email"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Email address</label
                  >
                </div>
                <div class="relative z-0 w-full mb-6 group">
                  <input
                    type="password"
                    name="floating_password"
                    id="floating_password"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    v-model="userData.password"
                  />
                  <label
                    for="floating_password"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Password</label
                  >
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_first_name"
                      id="floating_first_name"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="userData.firstName"
                    />
                    <label
                      for="floating_first_name"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >First name</label
                    >
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="floating_last_name"
                      id="floating_last_name"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="userData.lastName"
                    />
                    <label
                      for="floating_last_name"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Last name</label
                    >
                  </div>
                </div>
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="location"
                      id="location"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="userData.location"
                    />
                    <label
                      for="location"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Location</label
                    >
                  </div>
                  <div class="relative z-0 w-full mb-6 group">
                    <input
                      type="text"
                      name="occupation"
                      id="occupation"
                      class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                      placeholder=" "
                      required
                      v-model="userData.occupation"
                    />
                    <label
                      for="occupation"
                      class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                      >Occupation</label
                    >
                  </div>
                </div>
                <div class="relative z-0 w-full mb-6 group">
                  <input
                    type="date"
                    name="dateOfBirth"
                    id="dateOfBirth"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    required
                    :style="{ colorScheme: 'dark' }"
                    v-model="dateOfBirth"
                  />
                  <label
                    for="dateOfBirth"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >Date of birth</label
                  >
                </div>
                <div v-if="imageFile" class="relative">
                  <i
                    class="bi bi-x-lg hover-cursor absolute rounded-full p-2"
                    style="
                      background-color: rgba(255, 255, 255, 0.5);
                      top: 25px;
                      right: 10px;
                    "
                    @click="clearImage"
                  ></i>
                  <img
                    :src="imageUrl"
                    alt="upload"
                    class="w-full mt-3 rounded"
                  />
                </div>
                <div v-else class="upload">
                  <FileDropzone @fileAdded="handleFileAdded" />
                </div>

                <button
                  type="submit"
                  class="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { UserType } from "../type";
import { defineComponent, computed, ref, watch } from "vue";
import { parseISO, format } from "date-fns";
import axios from "axios";
import FileDropzone from "../components/DropZone.vue";

const defaultUserData: UserType = {
  dateOfBirth: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
};

export default defineComponent({
  name: "SignInComponent",
  components: { FileDropzone },
  props: {
    modalToggle: Function,
    isOpen: Boolean,
  },
  setup(props) {
    const isModalVisible = computed(() => props.isOpen);
    const onToggle = () => {
      if (props.modalToggle) {
        props.modalToggle();
      }
    };

    const prefixURL = process.env.VUE_APP_PREFIX_URL;
    const imageFile = ref<File | null>(null);
    const imageUrl = ref("");
    const dateOfBirth = ref("");
    const userData = ref<UserType>(defaultUserData);
    watch(dateOfBirth, (newDateOfBirth) => {
      if (newDateOfBirth) {
        const parsedDate = parseISO(newDateOfBirth);
        const formattedDate = format(parsedDate, "dd MMM yyyy");
        userData.value.dateOfBirth = formattedDate;
      }
    });

    watch(imageFile, (newImageFile) => {
      if (newImageFile) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imageUrl.value = e.target?.result as string;
        };
        reader.readAsDataURL(newImageFile);
      }
    });

    const handleFileAdded = (files: File[]) => {
      imageFile.value = files[0];
    };

    const handleReset = () => {
      imageFile.value = null;
      imageUrl.value = "";
      userData.value = defaultUserData;
      dateOfBirth.value = "";
    };

    const clearImage = () => {
      imageFile.value = null;
      imageUrl.value = "";
    };

    const signUpHandle = async () => {
      const formData = new FormData();
      if (imageFile.value) {
        formData.append("file", imageFile.value);
      }
      formData.append("userData", JSON.stringify(userData.value));
      try {
        const response = await axios.post(
          `${prefixURL}/auth/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.status === 200) {
          handleReset();
        }
      } catch (error) {
        console.error(error);
      }
    };

    return {
      isModalVisible,
      onToggle,
      dateOfBirth,
      userData,
      prefixURL,
      handleFileAdded,
      handleReset,
      signUpHandle,
      imageFile,
      imageUrl,
      clearImage,
    };
  },
});
</script>

<style scoped>
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 500ms ease-out;
}
.fade-leave-active {
  transition: opacity 500ms ease-out;
}

.upload .active {
  background-color: whitesmoke;
  -webkit-transition: background-color 100ms linear;
  -ms-transition: background-color 100ms linear;
  transition: background-color 100ms linear;
}
</style>
