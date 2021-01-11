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
