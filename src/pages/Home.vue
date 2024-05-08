<template>
  <div class="min-h-full">
    <div class="bg-gray-800 pb-32">
      <header class="py-10">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div class="md:flex md:items-center md:justify-between">
            <div class="min-w-0 flex-1">
              <h1 class="text-3xl font-bold tracking-tight text-white">Top 25 Posts from Reddit Community</h1>
            </div>
            <div class="mt-4 flex md:ml-4 md:mt-0">
              <button class="ml-3 inline-flex items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400" @click="downloadPostsAsCSV()">
                Download
              </button>
            </div>
          </div>

          <div class="md:flex md:items-center md:justify-between mt-5">
            <div class="min-w-0 flex-1">
              <div class="relative mt-2 flex items-center">
                <input type="text" placeholder="search" v-model="search" class="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6">
              </div>
            </div>
            <div class="mt-4 flex md:ml-4 md:mt-0">
              <select v-model="sortby" @change="fetchPosts()" class="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                <option v-for="sortType in sortTypes" :key="sortType">{{ sortType }}</option>
              </select>
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
          <template v-for="(post) in filteredPosts" :key="index" v-else>
            <template v-if="'title' in post.data">
              <Post :post="post.data" @selectPost="console.log('Post Selected:', $event)"/>
            </template>
          </template>

          <div class="flex items-center justify-center w-full">
            <button
                class="items-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 margin-x-auto"
                @click="fetchPosts(true)">
              Load More
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Post as PostType} from "../interfaces/redditTypes.ts";
import Post from "../components/Post.vue";
import Comment from "../components/Comment.vue";
import store from "../includes/store.ts";
import {mapGetters} from "vuex";

const CommunityName = "computerscience";

export default defineComponent({
  name: "Home",
  components: {Comment, Post},
  data() {
    return {
      sortby: "hot",
      sortTypes: ["hot", "new", "top", "rising"],
      search: "",
      loading: true,
    }
  },
  mounted() {
    this.fetchPosts();
  },
  computed: {
    ...mapGetters(['posts']),
    filteredPosts(): PostType[] {
      if (this.search === "") {
        return (this.posts as PostType[]);
      }

      return (this.posts as PostType[]).filter((post: PostType) => {

        const title = 'title' in post.data ? post.data.title : '';
        const selftext = 'selftext' in post.data ? post.data.selftext : '';

        return title.toLowerCase().includes(this.search.toLowerCase()) || selftext.toLowerCase().includes(this.search.toLowerCase());
      });
    }
  },
  methods: {
    async fetchPosts(loadMore = false) {
      this.loading = true;

      await store.dispatch('fetchPosts', {
        communityName: CommunityName,
        sortby: this.sortby,
        concatResults: loadMore,
      });

      this.search = "";
      this.loading = false;
    },

    // If we want to allow downloads in Author page for example, we could move this method to a helper file and use the same method in Author.vue
    // Method would need to be a bit different tho: we would need to pass the posts as a parameter
    downloadPostsAsCSV() {
      let csv = '';

      (this.filteredPosts as PostType[]).forEach((row) => {
        if (row.kind === 't3' && 'title' in row.data) {
          csv += `${row.data.title},${row.data.author},${row.data.selftext}\n`;
        }
      });

      const anchor = document.createElement('a');
      anchor.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
      anchor.target = '_blank';
      anchor.download = `posts-${CommunityName}.csv`;
      anchor.click();
    }
  }
})
</script>