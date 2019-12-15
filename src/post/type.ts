import { PostProps } from "./Post";

type ApiCallState = "idle" | "attempt" | "success" | "failure";

export interface PostState {
  posts: PostProps[] | null;
  apiCallState: ApiCallState;
}

interface PostFetchRequest {
  type: "POST_FETCH_REQUEST";
}

interface PostFetchSuccess {
  type: "POST_FETCH_SUCCESS";
  payload: {
    data: PostProps[];
  };
}

interface PostFetchFailure {
  type: "POST_FETCH_FAILURE";
}

export type PostActions =
  | PostFetchRequest
  | PostFetchSuccess
  | PostFetchFailure;
