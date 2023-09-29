import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState, postsKey } from "../reducers/posts.reducers";

export const postsState = createFeatureSelector<PostsState>(postsKey);

export const getPosts = createSelector(postsState, (state: PostsState) => state?.posts);

export const getSelectedPost = createSelector(
  postsState,
  (state: PostsState) => state?.selectedPost
);

// export const getSelectedPostId = createSelector(
//   postsState,
//   (state: PostsState) => state?.selectedPostId
// );

// export const getCreatedPost = createSelector(postsState, (state: PostsState) => state?.createdPost);

// export const getUpdatedPost = createSelector(postsState, (state: PostsState) => state?.updatedPost);

// export const getDeletedPost = createSelector(postsState, (state: PostsState) => state?.deletedPost);
