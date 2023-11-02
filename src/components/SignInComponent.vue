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
              <h1 class="text-3xl my-3">Sign In</h1>
              <form @submit.prevent="logInHandle">
                <div class="mb-6">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Your email</label
                  >
                  <input
                    type="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@gmail.com"
                    required
                    v-model="user.email"
                  />
                </div>
                <div class="mb-6">
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Your password</label
                  >
                  <input
                    type="password"
                    id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    v-model="user.password"
                  />
                </div>
                <div class="flex items-start mb-6">
                  <div class="flex items-center h-5">
                    <input
                      id="remember"
                      type="checkbox"
                      value=""
                      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    for="remember"
                    class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >Remember me</label
                  >
                </div>
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign In
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
import axios, { AxiosError } from "axios";
import { defineComponent, computed, ref } from "vue";

export default defineComponent({
  name: "SignInComponent",
  props: {
    modalToggle: Function,
    isOpen: Boolean,
  },
  setup(props) {
    const isModalVisible = computed(() => props.isOpen);
    const prefixURL = process.env.VUE_APP_PREFIX_URL;
    const isLoginFailed = ref(false);
    const user = ref({
      email: "",
      password: "",
    });

    const onToggle = () => {
      if (props.modalToggle) {
        props.modalToggle();
      }
      resetHandle();
    };

    const saveToken = (value: string) => {
      sessionStorage.setItem("userToken", value);
      window.location.replace("/home");
    };

    const logInHandle = async () => {
      try {
        const response = await axios.post(
          `${prefixURL}/auth/login`,
          user.value
        );
        const data = await response.data;
        console.log(response);
        saveToken(data.token);
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status) {
            isLoginFailed.value = true;
          }
        }
      }
    };

    const resetHandle = () => {
      user.value.email = "";
      user.value.password = "";
    };

    return {
      isModalVisible,
      onToggle,
      isLoginFailed,
      user,
      logInHandle,
      resetHandle,
    };
  },
});
</script>

<style scoped>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}
.fade-enter {
  opacity: 0;
}
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 200ms ease-out;
}
.fade-leave-active {
  transition: opacity 200ms ease-out;
}
</style>
