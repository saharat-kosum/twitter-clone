<template>
  <div class="w-screen lg:h-screen min-h-screen relative">
    <LoadingComponent :isOpen="isLoadingOpen" />
    <div class="container mx-auto flex flex-col lg:flex-row w-full h-full">
      <div class="flex-1 flex justify-center items-center my-12">
        <img
          class="h-1/2 object-contain lg:max-h-96 max-h-20"
          src="../assets/logo-white.png"
        />
      </div>
      <div class="flex-1 flex justify-center items-center font-bold mb-14">
        <div>
          <div class="md:text-6xl text-4xl">Happening now</div>
          <div class="md:text-3xl text-2xl md:mt-16 md:mb-10 my-5">
            Join today.
          </div>
          <div
            class="rounded-full font-normal text-black bg-white p-2 hover:bg-white/75 cursor-pointer text-center"
            :style="{ width: '300px' }"
          >
            <i class="bi bi-google me-2 text-xl"></i>Sign up with Google
          </div>
          <div
            class="rounded-full font-normal text-black bg-white p-2 hover:bg-white/75 cursor-pointer text-center mt-3"
            :style="{ width: '300px' }"
          >
            <i class="bi bi-apple me-2 text-xl"></i>Sign up with Apple
          </div>
          <div class="text-center" :style="{ width: '300px' }">
            <p class="my-2 mx-auto font-normal">or</p>
          </div>
          <div
            class="rounded-full bg-sky-500 p-3 hover:bg-sky-500/75 cursor-pointer text-center"
            :style="{ width: '300px' }"
            @click="openCreateModal"
          >
            Create account
          </div>
          <div class="mt-16">Already have an account?</div>
          <div
            class="rounded-full border-2 border-white text-white p-2 hover:bg-gray-800 cursor-pointer text-center mt-5"
            :style="{ width: '300px' }"
            @click="openSignInModal"
          >
            Sign in
          </div>
        </div>
        <SignInComponent
          :modalToggle="openSignInModal"
          :isOpen="isSingInOpen"
        />
        <CreateAccountComponent
          :modalToggle="openCreateModal"
          :isOpen="isCreateOpen"
          :alertToggle="onAlert"
          :successToggle="setIsSuccess"
        />
      </div>
    </div>
    <AlertComponent :isAlert="isAlert" :isSuccess="isSuccess" />
  </div>
</template>

<script lang="ts">
import CreateAccountComponent from "../components/CreateAccountComponent.vue";
import SignInComponent from "../components/SignInComponent.vue";
import LoadingComponent from "../components/Loading.vue";
import AlertComponent from "../components/Alert.vue";
import { defineComponent, onBeforeUnmount, ref, watch } from "vue";

export default defineComponent({
  name: "IndexPage",
  components: {
    SignInComponent,
    CreateAccountComponent,
    LoadingComponent,
    AlertComponent,
  },
  setup() {
    const isSingInOpen = ref(false);
    const isCreateOpen = ref(false);
    const isLoadingOpen = ref(false);
    const isSuccess = ref(false);
    const isAlert = ref(false);

    const openSignInModal = () => {
      isSingInOpen.value = !isSingInOpen.value;
    };

    const openCreateModal = () => {
      isCreateOpen.value = !isCreateOpen.value;
    };

    const onAlert = () => {
      isAlert.value = true;
    };

    const setIsSuccess = (prop: boolean) => {
      isSuccess.value = prop;
    };

    // eslint-disable-next-line
    let timer = ref<any>(null);
    watch(isAlert, (newVal) => {
      if (newVal) {
        timer = setTimeout(() => {
          isAlert.value = false;
        }, 2000);
      } else {
        clearTimeout(timer.value);
      }
    });
    onBeforeUnmount(() => {
      clearTimeout(timer.value);
    });

    return {
      openSignInModal,
      isSingInOpen,
      isCreateOpen,
      openCreateModal,
      isLoadingOpen,
      isAlert,
      isSuccess,
      setIsSuccess,
      onAlert,
    };
  },
});
</script>

<style scoped></style>
