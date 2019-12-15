import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootState } from "./global-store/rootReducer";
import { getPostAction } from "./post/action";
import Post from "./post/Post";

const App: React.FC = () => {
  //const [posts, setPosts] = useState<PostProps[]>([]);
  const { posts } = useSelector((state: RootState) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostAction());
  }, []);

  return (
    <div className="App">
      <ul>
        {posts &&
          posts.map(({ completed, userId, id, title }) => (
            <Post key={id} title={title} userId={userId} />
          ))}
      </ul>
    </div>
  );
};

export default App;
