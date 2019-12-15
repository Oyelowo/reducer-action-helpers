import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./global-store/rootReducer";
import { useGetPosts } from "./post/action";
import Post from "./post/Post";
import axios from 'axios'

//axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";

const App: React.FC = () => {
  //const [posts, setPosts] = useState<PostData[]>([]);
  const { data: posts, apiCallState } = useSelector(
    (state: RootState) => state.post
  );
  //const dispatch = useDispatch()
  //const {posts} = useSelector((state: RootState) => state.post);
  const getPosts = useGetPosts();

  useEffect(() => {
    //dispatch(getPostAction());
    getPosts();
  }, []);

  if (apiCallState === "attempt") {
    return <div>Loading...</div>;
  }
  
  if (apiCallState === 'failure') {
    return <div>Something Went Wrong...</div>;
  }


  return (
    <div className="App">
      <ul>
        {posts &&
          posts.map(({ userId, title }) => (
            <Post key={userId} title={title} userId={userId} />
          ))}
      </ul>
    </div>
  );
};

export default App;
