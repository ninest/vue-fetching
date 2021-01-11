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
    console.log("Fetching from server");
    request().then(() => (postsCache.value = data.value));
  } else {
    // Use posts cache
    console.log("Using cache");
    data.value = postsCache.value;
  }

  return {
    posts: data,
    error,
    isLoading,
    rerequest
  };
}
