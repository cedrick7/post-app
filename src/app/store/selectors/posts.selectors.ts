import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState, postsKey } from "../reducers/posts.reducers";

export const postsState = createFeatureSelector<PostsState>(postsKey);

export const getPosts = createSelector(postsState, (state: PostsState) => state?.posts);

export const getSelectedPost = createSelector(
  postsState,
  (state: PostsState) => state?.selectedPost
);
