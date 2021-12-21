import axios from "axios";
import { PostWithComments, Comment, Post } from "./types";

export const fetchPostsWithComments = async (): Promise<PostWithComments[]> => {
  const responseData = await axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then(async ({ data: postData }: { data: Post[] }) => {
      const commentsResponse: Comment[] = await axios
        .get("https://jsonplaceholder.typicode.com/comments")
        .then((response) => response.data);

      const result = postData.map((post) => {
        const postComments = commentsResponse.filter(
          (comment) => comment.postId === post.id
        );
        return { ...post, comments: postComments };
      });
      return result;
    });
  return responseData;
};
