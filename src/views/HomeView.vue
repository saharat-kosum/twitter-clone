<template>
  <div v-if="isLogin" class="flex lg:gap-7 md:mb-0 mb-[64px]">
    <LoadingComponent :isOpen="isLoadingOpen" />
    <div
      class="border-solid border-x border-[#2F3336] md:w-[600px] md:max-w-[600px]"
    >
      <div class="border-b border-gray-200 dark:border-gray-700">
        <ul class="flex -mb-px text-sm font-medium text-center text-[#71767C]">
          <li class="w-1/2">
            <button
              class="inline-block p-4 rounded-t-lg w-full hover:bg-white/[0.1]"
              :class="{
                'text-white font-semibold border-[#1A8CD8] border-b-2':
                  activeTab === 1,
              }"
              @click="activateTab(1)"
            >
              For you
            </button>
          </li>
          <li class="w-1/2">
            <button
              class="inline-block hover:bg-white/[0.1] w-full p-4 border-b-2 rounded-t-lg"
              :class="{
                'text-white font-semibold border-[#1A8CD8]': activeTab === 2,
                'border-transparent': activeTab === 1,
              }"
              @click="activateTab(2)"
            >
              Following
            </button>
          </li>
        </ul>
      </div>
      <div>
        <div v-show="activeTab === 1">
          <CreatePost
            :userData="user"
            :loading="setLoading"
            :posts="posts"
            :setPosts="setPost"
            :sort="sortPost"
            :token="getUserToken()"
          />
          <div v-if="user">
            <PostComponent
              v-for="post in posts"
              :key="post._id"
              :post="post"
              :deletePost="deletePost"
              :likePost="likePost"
              :user="user"
              :addFriend="addFriend"
              :removeFriend="removeFriend"
            />
          </div>
          <div
            class="w-full text-center mt-36 text-[#71767C]"
            v-if="posts?.length == 0"
          >
            No post yet
          </div>
        </div>
        <div v-show="activeTab === 2">
          <CreatePost
            :userData="user"
            :loading="setLoading"
            :posts="posts"
            :setPosts="setPost"
            :sort="sortPost"
            :token="getUserToken()"
          />
          <div v-if="user">
            <PostComponent
              v-for="post in posts"
              :key="post._id"
              :post="post"
              :deletePost="deletePost"
              :likePost="likePost"
              :user="user"
              :addFriend="addFriend"
              :removeFriend="removeFriend"
            />
          </div>
          <div
            class="w-full text-center mt-36 text-[#71767C]"
            v-if="posts?.length == 0"
          >
            No post yet
          </div>
        </div>
      </div>
    </div>
    <RightBarComponent class="hidden lg:block" :loading="setLoading" />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import RightBarComponent from "../components/RightBar.vue";
import CreatePost from "../components/CreatePost.vue";
import PostComponent from "../components/Post.vue";
import LoadingComponent from "../components/Loading.vue";
import { PostType, UserType } from "../type";
import axios from "axios";

export default defineComponent({
  name: "HomePage",
  components: {
    RightBarComponent,
    CreatePost,
    PostComponent,
    LoadingComponent,
  },
  setup() {
    const isLoadingOpen = ref(false);
    const activeTab = ref(1);
    const isLogin = ref(false);
    const posts = ref<PostType[] | undefined>(undefined);
    const user = ref<UserType | undefined>(undefined);
    const prefixURL = process.env.VUE_APP_PREFIX_URL;

    const activateTab = (tabNumber: number) => {
      activeTab.value = tabNumber;
    };

    const setLoading = (newValue: boolean) => {
      isLoadingOpen.value = newValue;
    };

    const setPost = (newValue: PostType[] | undefined) => {
      posts.value = newValue;
    };

    onMounted(() => {
      const token = getUserToken();
      if (token) {
        isLogin.value = true;
        getFeedPosts(token);
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

    const getFeedPosts = async (token: string) => {
      isLoadingOpen.value = true;
      try {
        const response = await axios.get(`${prefixURL}/posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        const sortData = sortPost(data);
        posts.value = sortData;
      } catch (err) {
        console.error(err);
      } finally {
        isLoadingOpen.value = false;
      }
    };

    const getUserDetail = async (token: string) => {
      isLoadingOpen.value = true;
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
        isLoadingOpen.value = false;
      }
    };

    const deletePost = async (id: string) => {
      const result = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (result) {
        const token = getUserToken();
        isLoadingOpen.value = true;
        try {
          const response = await axios.delete(
            `${prefixURL}/posts/delete/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (response.status === 200) {
            const filter = posts.value?.filter((post) => post._id !== id);
            if (filter) {
              const sortData = sortPost(filter);
              posts.value = sortData;
            }
          } else if (response.status === 404) {
            alert("Post not found");
          } else {
            alert("Delete post failed");
          }
        } catch (error) {
          console.error(error);
        } finally {
          isLoadingOpen.value = false;
        }
      }
    };

    const likePost = async (id: string) => {
      const token = getUserToken();
      isLoadingOpen.value = true;
      try {
        const response = await axios.put(
          `${prefixURL}/posts/${id}/like`,
          { userId: user.value?._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data: PostType = response.data;
        const updatedPosts = posts.value?.map((post) => {
          if (post._id === data._id) {
            return data;
          }
          return post;
        });
        posts.value = updatedPosts;
      } catch (error) {
        console.error(error);
      } finally {
        isLoadingOpen.value = false;
      }
    };

    const sortPost = (posts: PostType[]): PostType[] => {
      return posts.slice().sort((a, b) => {
        if (a.createdAt === undefined && b.createdAt === undefined) {
          return 0;
        }
        if (a.createdAt === undefined) {
          return 1;
        }
        if (b.createdAt === undefined) {
          return -1;
        }
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    };

    const addFriend = async (friendId: string) => {
      isLoadingOpen.value = true;
      const token = getUserToken();
      try {
        const response = await axios.put(
          `${prefixURL}/users/${user.value?._id}/${friendId}`,
          { userId: user.value?._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        isLoadingOpen.value = false;
      }
    };

    const removeFriend = async (friendId: string) => {
      isLoadingOpen.value = true;
      const token = getUserToken();
      try {
        const response = await axios.put(
          `${prefixURL}/users/${user.value?._id}/${friendId}`,
          { userId: user.value?._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error(error);
      } finally {
        isLoadingOpen.value = false;
      }
    };

    return {
      activeTab,
      activateTab,
      isLoadingOpen,
      isLogin,
      posts,
      user,
      setLoading,
      sortPost,
      setPost,
      getUserToken,
      deletePost,
      likePost,
      removeFriend,
      addFriend,
    };
  },
});
</script>
