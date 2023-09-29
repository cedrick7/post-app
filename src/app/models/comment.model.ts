export interface Comment {
  id: number;
  postId: number;
  userId?: number;
  username?: string;
  postTitle?: string;
  postBody?: string;
  name: string;
  body: string;
  email: string;
}
