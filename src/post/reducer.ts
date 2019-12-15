import { Reducer } from "redux";
import { PostActions, PostState } from "./type";

const initialState: PostState = {
  posts: [],
  apiCallState: "idle"
};

const postReducer: Reducer<PostState, PostActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case "POST_FETCH_REQUEST":
      return { ...state, apiCallState: "attempt" };

    case "POST_FETCH_SUCCESS":
      return { ...state, apiCallState: "success", posts: action.payload.data };

    case "POST_FETCH_FAILURE":
      return { ...state, apiCallState: "failure", posts: null };

    default:
      return state;
  }
};

export default postReducer;
