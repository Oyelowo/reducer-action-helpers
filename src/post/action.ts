import axios from 'axios'

export const getPostAction = () => async (dispatch: any) => {
  dispatch({ type: "POST_FETCH_REQUEST" });
  try {
   const resp = await axios.get("https://jsonplaceholder.typicode.com/todos");
   const data = await resp.data;
    dispatch({
      type: "POST_FETCH_SUCCESS",
      payload: {
        data
      }
    });
  } catch (error) {
    dispatch({ type: "POST_FETCH_FAILURE" });
  }
};
