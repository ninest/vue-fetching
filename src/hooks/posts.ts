import { Post } from "@/post-interface";
import { ref } from "vue";
import { useFetch } from "./fetch";

const postsCache = ref<Post[] | undefined>(undefined);

export function usePosts() {
  const { data, error, isLoading, request } = useFetch<Post[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (!postsCache.value) {
    request().then(() => (postsCache.value = data.value));
  } else {
    // Use posts cache
    data.value = postsCache.value;
  }

  return {
    posts: data,
    error,
    isLoading,
    rerequest: request
  };
}
