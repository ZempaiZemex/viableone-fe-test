export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Post {
  body: string;
  id: number;
  title: string;
  userId: number;
}

export interface PostWithComments extends Post {
  comments: Comment[];
}
