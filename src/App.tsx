import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { commentStoreApiHelper } from "./comment/redux";
import { RootState } from "./global-store/rootReducer";
import { axiosClientInstance, useGetPosts } from "./post/action";

//axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

const App: React.FC = () => {
  //const [posts, setPosts] = useState<PostData[]>([]);
  const getComments = commentStoreApiHelper.useResource(
    axiosClientInstance({
      url: "/comments?postId=1"
    })
  );
  const { data: posts } = useSelector((state: RootState) => state.post);
  const { data: comments, apiCallState } = useSelector(
    (state: RootState) => state.comments
  );
  //const dispatch = useDispatch()
  //const {posts} = useSelector((state: RootState) => state.post);
  const getPosts = useGetPosts();

  useEffect(() => {
    //dispatch(getPostAction());
    getComments();
    getPosts();
  }, []);

  if (apiCallState === "attempt") {
    return <div>Loading...</div>;
  }

  if (apiCallState === "failure") {
    return <div>Something Went Wrong...</div>;
  }

  return (
    <div className="App">
      <ul>
        {/*  {posts &&
          posts.map(({ userId, title }) => (
            <Post key={userId} title={title} userId={userId} />
          ))} */}
        {comments?.map(({ id, name, email, body }) => (
          <div key={id}>
            <h1>{name}</h1>
            <p>{email}</p>
            <p>{body}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default App;
