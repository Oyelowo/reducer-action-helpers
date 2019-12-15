import { combineReducers } from "redux";
import postReducer from "../post/reducer";

export const rootReducer = combineReducers({
  post: postReducer
});


export type RootState = ReturnType<typeof rootReducer>
