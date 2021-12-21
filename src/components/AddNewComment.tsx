import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { PostWithComments } from "../data/types";

interface Props {
  postId: number;
  setPosts: React.Dispatch<
    React.SetStateAction<PostWithComments[] | undefined>
  >;
}

const defaultValues = {
  name: "",
  email: "",
  text: "",
};

const AddNewComment = ({ postId, setPosts }: Props) => {
  const [formValues, setFormValues] = useState(defaultValues);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const addCommentHandler = (e: any) => {
    e.preventDefault();
    setPosts((prevState) => {
      if (prevState) {
        const postIndex = prevState.findIndex((post) => post.id === postId);
        if (postIndex != null) {
          prevState[postIndex].comments.push({
            postId,
            id: prevState[postIndex].comments.length + 1,
            name: formValues.name,
            email: formValues.email,
            body: formValues.text,
          });
        }
        return [...prevState];
      }
    });
  };

  return (
    <Box onSubmit={addCommentHandler} component="form">
      <TextField
        fullWidth
        name="name"
        margin="normal"
        label="Name"
        value={formValues.name}
        onChange={handleInputChange}
      />
      <TextField
        fullWidth
        name="email"
        margin="normal"
        label="Email"
        value={formValues.email}
        onChange={handleInputChange}
      />
      <TextField
        onChange={handleInputChange}
        value={formValues.text}
        fullWidth
        margin="normal"
        label="Text"
        name="text"
        id="text"
        multiline
        rows={4}
      />
      <Box display="flex" justifyContent="center">
        <Button variant="contained" type="submit">
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default AddNewComment;
