import axios from "axios";
import { postsStoreApiHelper } from "./reducer";

axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

export const axiosClientInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com"
});

export const useGetPosts = () =>
  postsStoreApiHelper.useResource(axiosClientInstance({ url: "/todos" }));
