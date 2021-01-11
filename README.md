# Fetching in Vue 3

> Data fetching composable/hook function for Vue 3

All examples are fetching a list of Posts from [JSON placeholder](https://jsonplaceholder.typicode.com/posts). Here's an interface for a post object:

```ts
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
```

## `useFetch`

```ts
import { ref } from "vue";

export function useFetch<T>(url: RequestInfo) {
  const data = ref<T | undefined>();
  const error = ref<any>();
  const isLoading = ref<boolean>(false);

  const request = async (): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await fetch(url);
      data.value = await response.json();
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, request };
}
```

## `usePosts`

This composable is a wrapper around `useFetch`

```ts
import { Post } from "@/post-interface";
import { ref } from "vue";
import { useFetch } from "./fetch";

const postsCache = ref<Post[] | undefined>(undefined);

export function usePosts() {
  const { data, error, isLoading, request } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts?_limit=2"
  );

  const rerequest = () => {
    // Required to properly update the cache on rerequest
    request().then(() => (postsCache.value = data.value));
  };

  if (!postsCache.value) {
    // Fetch from server
    request().then(() => (postsCache.value = data.value));
  } else {
    // Use posts cache
    data.value = postsCache.value;
  }

  return {
    posts: data,
    error,
    isLoading,
    rerequest
  };
}
```

Whenever data is fetched, it is dumped into `postsCache`. So whe the same request is made again, it doesn not fetch it from the API. It only returns what was previous fetched.

To fetch from the server again

### Usage

```ts
<script lang="ts">
import { defineComponent, ref } from "vue";
import { usePosts } from "./hooks/posts";

export default defineComponent({
  components: { Another },
  setup() {
    const { posts, error, isLoading } = usePosts();

    return {
      posts,
      error,
      isLoading,
    };
  }
});
</script>

<template>
  <div>
    <div>Loading: {{ isLoading }}</div>

    <h1>Posts</h1>
    <pre>{{ posts }}</pre>

    <div v-if="error">
      <h2>Error</h2>
      <pre>{{ error }}</pre>
    </div>
  </div>
</template>
```

Also see `src/App.vue`.

## Explanation / Issues
- Calling `rerequest()` from `usePosts()` updates the data in the current component and the posts cache
- When `rerequest()` is called, the data in the current component is updated, but exisitng data in other components does not get updated