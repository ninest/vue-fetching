import { ref } from "vue";

export function useFetch<T>(url: RequestInfo) {
  const data = ref<T | undefined>();
  const error = ref<any>();
  const isLoading = ref<boolean>(false);

  const request = async (): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await fetch(
        url + `&userId=${Math.floor(Math.random() * 6) + 1}`
      );
      data.value = await response.json();
    } catch (e) {
      error.value = e;
    } finally {
      isLoading.value = false;
    }
  };

  return { data, error, isLoading, request };
}
