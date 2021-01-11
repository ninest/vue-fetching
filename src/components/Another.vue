<script lang="ts">
import { defineComponent } from "vue";
import { usePosts } from "@/hooks/posts";

export default defineComponent({
  setup() {
    console.log("This is from Another.vue");
    const { posts, error, isLoading } = usePosts();

    return {
      isLoading,
      error
    };
  }
});
</script>

<template>
  <div>
    <div v-if="isLoading">Fetching posts from another component</div>
    <div v-else>Fetched posts from another component!</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>
