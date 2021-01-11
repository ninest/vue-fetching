<script setup lang="ts">
import { usePosts } from "./hooks/use-posts";
// import { useFetch } from "@/hooks/use-fetch";
import { Post } from "@/post-interface";

const { posts, error, isLoading } = usePosts();

// const { data: posts, error, isLoading } = useFetch<Post[]>(
//   "https://jsonplaceholder.typicode.com/posts"
// );
</script>

<template>
  <div>
    <h2 v-if="isLoading">Loading ...</h2>

    <div v-if="posts">
      <h1>Posts</h1>
      <pre>{{ posts }}</pre>
    </div>

    <div v-if="error">
      <h1>Error</h1>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>
