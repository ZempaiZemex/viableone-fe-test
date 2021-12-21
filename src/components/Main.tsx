import { AppBar, Box, Container, Pagination, Typography } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { fetchPostsWithComments } from "../data/posts";
import { PostWithComments } from "../data/types";
import Post from "./Post";

const PAGE_SIZE = 10;

const Main = () => {
  const [posts, setPosts] = useState<PostWithComments[] | undefined>([]);
  const [page, setPage] = useState(1);
  useQuery("posts-with-comments", fetchPostsWithComments, {
    onSuccess: (data) => {
      setPosts(data);
    },
  });
  return (
    <div>
      <AppBar position="static">
        <Box p={3}>
          <Typography variant="h5">Viable One - FE test</Typography>
        </Box>
      </AppBar>
      <Box mt={4}>
        <Container maxWidth="sm">
          {posts
            ?.filter(
              (_, index) =>
                index >= PAGE_SIZE * (page - 1) && index < PAGE_SIZE * page
            )
            .map((post) => (
              <Post setPosts={setPosts} key={`post-${post.id}`} data={post} />
            ))}
          <Box display="flex" justifyContent="center" mb={5}>
            <Pagination
              onChange={(_, page) => setPage(page)}
              page={page}
              count={(posts?.length || PAGE_SIZE) / PAGE_SIZE}
            />
          </Box>
        </Container>
      </Box>
    </div>
  );
};

export default Main;
