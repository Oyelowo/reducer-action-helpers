import { combineReducers } from "redux";
import commentReducer from "../comment/redux";
import postReducer from "../post/reducer";

export const rootReducer = combineReducers({
  post: postReducer,
  comments: commentReducer
});

export type RootState = ReturnType<typeof rootReducer>;
