<script setup lang="ts">
import { reactive } from "vue";
import { Post } from "@/post-interface";

/* Define hook */
function useFetch() {
  const exec = async <T>(url: string): Promise<{ data: T; error: any }> => {
    let data, error;
    try {
      const response = await fetch(url);
      data = await response.json();
    } catch (e) {
      error = e;
    }
    return { data, error };
  };
  return { exec };
}

/* Use hook */
const { exec } = useFetch();

const { data: posts, error } = await exec<Post[]>(
  "https://jsonplaceholder.typicode.com/posts"
);

if (error) alert(error);
else console.log("Fetched successfully");
</script>

<template>
  <div>
    <pre>{{ posts }}</pre>
  </div>
</template>
