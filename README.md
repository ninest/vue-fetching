# Fetching in Vue 3
> Different composables for fetching and caching data in Vue 3

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
import { reactive, readonly, toRefs } from "vue";

export function useFetch<T>(url: string) {
  const state = reactive<{ data: T | null; error: any; isLoading: boolean }>({
    data: null,
    error: null,
    isLoading: true
  });

  fetch(url)
    .then(response => response.json())
    .then(data => {
      state.data = data;
      state.isLoading = false;
    })
    .catch(error => (state.error = error));

  return { ...toRefs(readonly(state)) };
}
```
### Usage

```ts
<script setup lang="ts">
import { useFetch } from "@/hooks/use-fetch";
import { Post } from "@/post-interface";

const { data: posts, error, isLoading } = useFetch<Post[]>(
  "https://jsonplaceholder.typicode.com/posts"
);
</script>

<template>
  <div>
    <h2 v-if="isLoading">Loading ...</h2>
    <h1>Data</h1>
    <pre>{{ posts }}</pre>
    <h1>Error</h1>
    <pre>{{ error }}</pre>
  </div>
</template>

```

## `usePosts`

This composable is a wrapper around `useFetch`

```ts
import { Post } from "@/post-interface";
import { useFetch } from "./use-fetch";

export function usePosts() {
  const { data: posts, error, isLoading } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  return {
    posts,
    error,
    isLoading
  };
}
```

### Usage
```ts
<script setup lang="ts">
import { usePosts } from "./hooks/use-posts";
import { Post } from "@/post-interface";

const { posts, error, isLoading } = usePosts();
</script>

<template>
  <div>
    <h2 v-if="isLoading">Loading ...</h2>
    <h1>Data</h1>
    <pre>{{ posts }}</pre>
    <h1>Error</h1>
    <pre>{{ error }}</pre>
  </div>
</template>
```