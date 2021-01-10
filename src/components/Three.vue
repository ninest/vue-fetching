<script setup lang="ts">
import { Post } from "@/post-interface";
import { onMounted } from "vue";
/*
This is same as two, but in usePosts, data (state) is preserved
*/

/* Define fetch hook */
async function useFetch<T>(url: string): Promise<{ data: T; error: any }> {
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

let postsCache: Post[];
async function usePosts() {
  if (postsCache == null) {
    const { data: posts, error } = await useFetch<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    postsCache = posts;
    return { posts, error };
  } else {
    console.log("Using posts cache");
    return { posts: postsCache, error: null };
  }
}

/* Use hook */
const retreivePosts = async () => {
  console.log("mount");
  const { posts, error } = await usePosts();

  if (error) alert(error);
  else console.log("Fetched successfully");
};
</script>

<template>
  <button @click="retreivePosts()">Get posts</button>
</template>
