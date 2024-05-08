<template>
  <div class="bg-gray-50 shadow sm:rounded-lg my-5" @click="selectPost">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-base font-semibold leading-6 text-gray-900">{{ post.title }}</h3>
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>{{ post.selftext }}</p>
      </div>
      <div class="mt-3 text-sm leading-6">
        <router-link :to="`/author/${post.author}`" class="font-semibold text-indigo-600 hover:text-indigo-500">
          {{ post.author }}
          <span aria-hidden="true"> &rarr;</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {PostData} from "../interfaces/redditTypes.ts";

export default defineComponent({
  name: "Post",
  props: {
    post: {
      type: Object as () => PostData,
      required: true
    }
  },
  methods: {
    selectPost() {
      this.$emit("selectPost", this.$props.post);
    },
  }
})
</script>