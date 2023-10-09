import { createAction, props } from "@ngrx/store";
import { Comment } from "src/app/models/comment.model";
import { PostComment } from "src/app/models/postComment.model";

// GET
export const loadComments = createAction("[Comments] load comments", props<{ postId: number }>());
export const commentsLoaded = createAction(
  "[Comments] comments loaded",
  props<{ comments: Comment[] }>()
);

// POST
export const createComment = createAction(
  "[Comments] create comment",
  props<{ postId: number; comment: PostComment }>()
);
export const commentCreated = createAction(
  "[Comments] comment created",
  props<{ comment: Comment }>()
);
