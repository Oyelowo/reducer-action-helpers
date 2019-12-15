import { postsStoreApiHelper } from "./reducer";

export const useGetPosts = () =>
  postsStoreApiHelper.useResource({
    method: "get",
    url: "https://jsonplaceholder.typicode.com/todods"
  });
