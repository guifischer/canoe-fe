<template>

  <div class="min-h-full">
    <div class="bg-gray-800 pb-32">
      <header class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="md:flex md:items-center md:justify-between">
            <div class="min-w-0 flex-1">
              <h1 class="text-3xl font-bold tracking-tight text-white">{{ author }}</h1>
            </div>
            <div class="mt-4 flex md:ml-4 md:mt-0">
              <button class="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400" @click="goHome()">
                Go back home
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>

    <main class="-mt-32">
      <div class="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div class="rounded-lg bg-white px-5 py-6 shadow sm:px-6">

          <template v-if="loading">
            <p>Loading...</p>
          </template>

          <!--   Show only posts and not comments   -->
          <template v-for="post in allPosts" :key="index" v-else>
            <template v-if="post.kind === 't3' && 'title' in post.data">
              <Post :post="post.data" @selectPost="console.log('Post Selected:', $event)"/>
            </template>

            <template v-else-if="'body' in post.data">
              <Comment :comment="post.data"/>
            </template>
          </template>

        </div>
      </div>
    </main>
  </div>
</template>

<!-- This example don't use Vuex. It's simpler but exemplify another way of showing the results -->
<script lang="ts">
import {defineComponent} from "vue";
import {Post as PostType, RedditApiResponse} from "../interfaces/redditTypes.ts";
import redditApi from "../api/redditApi.ts";
import Post from "../components/Post.vue";
import Comment from "../components/Comment.vue";

export default defineComponent({
  name: "Author",
  components: {Comment, Post},
  data() {
    return {
      loading: true,
      author: this.$route.params.author as string,
      allPosts: [] as PostType[],
    }
  },
  mounted() {
    this.loadAuthor();
  },
  methods: {
    async loadAuthor() {
      this.loading = true;
      const response: RedditApiResponse = await redditApi.getAuthor(this.author)
      this.allPosts = response.data.children;
      this.loading = false;
    },
    goHome() {
      this.$router.push({name: "home"});
    }
  }
})
</script>