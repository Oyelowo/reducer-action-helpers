import reduxApiCallHelper from "redux-steroid";

export const commentStoreApiHelper = reduxApiCallHelper("FETCH_COMMENTS");

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const commentReducer = commentStoreApiHelper.createReducer<Comment[]>();

export default commentReducer;
