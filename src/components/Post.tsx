import { Box, Card, CardContent, Typography } from "@mui/material";
import { PostWithComments } from "../data/types";
import AddNewComment from "./AddNewComment";
import Comment from "./Comment";

interface Props {
  data: PostWithComments;
  setPosts: React.Dispatch<
    React.SetStateAction<PostWithComments[] | undefined>
  >;
}

const Post = ({ data, setPosts }: Props) => {
  return (
    <Box mb={3}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5">{data.title}</Typography>
          <p>{data.body}</p>
          <Typography variant="h6">Comments</Typography>
          {data.comments.map((comment) => (
            <Comment
              setPosts={setPosts}
              key={`post-${data.id}-comment-${comment.id}`}
              data={comment}
            />
          ))}
          <AddNewComment postId={data.id} setPosts={setPosts} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default Post;
