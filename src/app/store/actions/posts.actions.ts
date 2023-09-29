import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post.model";
import { PostPost } from "src/app/models/postPost.model";
import { UpdatePost } from "src/app/models/updatePost.model";

// GET
export const loadPosts = createAction(
  "[Posts] load posts",
  props<{ userId?: number | undefined }>()
);
export const postsLoaded = createAction("[Posts] posts loaded", props<{ posts: Post[] }>());

// FOR CACHING IN STORE
export const loadPost = createAction("[Posts] load post", props<{ postId: number }>());
export const postLoaded = createAction("[Posts] post loaded", props<{ post: Post }>());

// export const selectPost = createAction("[Posts] select post", props<{ post: Post }>());
// export const postSelected = createAction("[Posts] post selected", props<{ post: Post }>());

// export const selectPostId = createAction("[Posts] select postId", props<{ postId: number }>());
// export const postIdSelected = createAction("[Posts] postId selected", props<{ postId: number }>());

// POST
export const createPost = createAction("[Posts] create post", props<{ post: PostPost }>());
export const postCreated = createAction("[Posts] post created", props<{ post: Post }>());

// UPDATE
export const updatePost = createAction("[Posts] update post", props<{ updatePost: UpdatePost }>());
export const postUpdated = createAction("[Posts] post updated", props<{ post: Post }>());

// DELETE
export const deletePost = createAction("[Posts] delete post", props<{ postId: number }>());
export const postDeleted = createAction("[Posts] post deleted", props<{ postId: number }>());
