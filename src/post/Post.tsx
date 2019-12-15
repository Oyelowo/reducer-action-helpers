import React, { FC } from "react";

export interface PostData {
  userId: number;
  id?: number;
  title: string;
  completed?: boolean;
}

const Post: FC<PostData> = ({ userId, title }) => {
  return (
    <li>
      {userId} : {title}
    </li>
  );
};

export default Post;
