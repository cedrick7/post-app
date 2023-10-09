import { createReducer, on } from "@ngrx/store";
import * as PostsActions from "../actions/posts.actions";
import { Post } from "src/app/models/post.model";

export const postsKey = "posts";

export interface PostsState {
  posts: Post[];
  selectedPost: Post | undefined;
  selectedPostId: number | undefined;
}

export const initialState: PostsState = {
  posts: [],
  selectedPost: undefined,
  selectedPostId: undefined,
};

export const PostsReducer = createReducer(
  initialState,

  // GET
  on(PostsActions.postsLoaded, (state, { posts }) => ({
    ...state,
    posts: posts,
  })),
  on(PostsActions.postLoaded, (state, { post }) => ({
    ...state,
    selectedPost: post,
  })),

  // POST
  on(PostsActions.postCreated, (state, { post }) => ({
    ...state,
    posts: state?.posts.concat(post),
  })),

  // UPDATE
  on(PostsActions.postUpdated, (state, action) => ({
    ...state,
    posts: state?.posts.map((eachPost) => {
      if (eachPost.id == action.post.id) {
        return action.post;
      }
      return eachPost;
    }),
  })),

  // DELETE
  on(PostsActions.postDeleted, (state, { postId }) => ({
    ...state,
    posts: state?.posts.filter((post) => post.id !== postId),
  }))
);
