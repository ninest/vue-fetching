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

## One