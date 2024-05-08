<template>
  <div class="bg-gray-50 shadow sm:rounded-lg my-5" @click="selectComment">
    <div class="px-4 py-5 sm:p-6">
      <div class="mt-2 max-w-xl text-sm text-gray-500">
        <p>{{ comment.body }}</p>
      </div>
      <div class="mt-3 text-sm leading-6">
        <span class="font-semibold text-indigo-600 hover:text-indigo-500">
          {{ comment.author }}
        </span>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import {CommentData} from "../interfaces/redditTypes.ts";

export default defineComponent({
  name: "Comment",
  props: {
    comment: {
      type: Object as () => CommentData,
      required: true
    }
  },
  methods: {
    selectComment() {
      this.$emit("selectComment", this.$props.comment);
    }
  }
})
</script>