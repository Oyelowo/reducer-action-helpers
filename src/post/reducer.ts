import reduxApiCallHelper from "../redux-helper/redux-helper";
import { PostData } from "./Post";

export const postsStoreApiHelper = reduxApiCallHelper("POSTS_FETCH");
const postReducer = postsStoreApiHelper.createReducer<PostData[]>();

export default postReducer;
