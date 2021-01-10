<script setup lang="ts">
import { Post } from "@/post-interface";

/* Define fetch hook */
async function useFetch(url: string) {
  let data, error;
  try {
    const response = await fetch(url);
    data = await response.json();
  } catch (e) {
    error = e;
  }
  return { data, error };
}

/* Define posts hook */
async function usePosts() {
  const { data, error }: { data: Post[]; error: any } = await useFetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return {
    posts: data,
    error
  };
}

/* Use hook */
const { posts, error } = await usePosts();

if (error) alert(error);
else console.log("Fetched successfully");
</script>

<template>
  <pre>{{ posts }}</pre>
</template>
