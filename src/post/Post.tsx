import React, { FC } from "react";

export interface PostProps {
  userId: number;
  id?: number;
  title: string;
  completed?: boolean;
}

const Post: FC<PostProps> = ({ userId, title }) => {
  return (
    <li>
      {userId} : {title}
    </li>
  );
};

export default Post;
