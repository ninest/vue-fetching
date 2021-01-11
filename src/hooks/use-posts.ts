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
