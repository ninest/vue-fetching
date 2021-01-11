<script lang="ts">
import { defineComponent, ref } from "vue";
import { usePosts } from "./hooks/posts";

import Another from "@/components/Another.vue";

export default defineComponent({
  components: { Another },
  setup() {
    const { posts, error, isLoading, rerequest } = usePosts();

    const showAnotherComponent = ref(false);
    const toggleShowAnotherComponent = () => {
      console.log("toggle");
      showAnotherComponent.value = !showAnotherComponent.value;
    };

    return {
      posts,
      error,
      isLoading,
      rerequest,

      showAnotherComponent,
      toggleShowAnotherComponent
    };
  }
});
</script>

<template>
  <div>
    <div>Loading: {{ isLoading }}</div>

    <div>
      <button @click="toggleShowAnotherComponent()">
        Fetch data from another component
      </button>

      <Another v-if="showAnotherComponent"></Another>
    </div>

    <h1>Posts</h1>
    <pre>{{ posts }}</pre>

    <div v-if="error">
      <h2>Error</h2>
      <pre>{{ error }}</pre>
    </div>

    <button @click="rerequest()">Rerequest data</button>
  </div>
</template>
