import { Box, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Comment as CommentType, PostWithComments } from "../data/types";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  data: CommentType;
  setPosts: React.Dispatch<
    React.SetStateAction<PostWithComments[] | undefined>
  >;
}

const Comment = ({ data, setPosts }: Props) => {
  const deleteCommentHandler = () => {
    setPosts((prevState) => {
      if (prevState) {
        const postIndex = prevState.findIndex(
          (post) => post.id === data.postId
        );
        if (postIndex != null) {
          const newPostComments = prevState[postIndex].comments.filter(
            (comment) => comment.id !== data.id
          );
          prevState[postIndex].comments = newPostComments;
        }
        return [...prevState];
      }
    });
  };

  return (
    <Box mb={1}>
      <Card sx={{ minWidth: 275 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {data.email[0]}
            </Avatar>
          }
          action={
            <IconButton onClick={deleteCommentHandler} aria-label="delete">
              <CloseIcon />
            </IconButton>
          }
          title={data.name}
          subheader={data.email}
        />
        <CardContent>
          <p>{data.body}</p>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Comment;
