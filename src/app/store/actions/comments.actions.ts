import { createAction, props } from "@ngrx/store";
import { Comment } from "src/app/models/comment.model";
import { PostComment } from "src/app/models/postComment.model";

// GET
export const loadComments = createAction("[Comments] load comments", props<{ postId: number }>());
export const commentsLoaded = createAction(
  "[Comments] comments loaded",
  props<{ comments: Comment[] }>()
);

// // not needed:
// export const selectComment = createAction(
//   "[Comments] select comment",
//   props<{ comment: Comment }>()
// );
// export const commentSelected = createAction(
//   "[Comments] comment selected",
//   props<{ comment: Comment }>()
// );

// // not needed:
// export const selectCommentId = createAction(
//   "[Comments] select commentId",
//   props<{ commentId: number }>()
// );
// export const commentIdSelected = createAction(
//   "[Comments] commentId selected",
//   props<{ commentId: number }>()
// );

// POST
export const createComment = createAction(
  "[Comments] create comment",
  props<{ postId: number; comment: PostComment }>()
);
export const commentCreated = createAction(
  "[Comments] comment created",
  props<{ comment: Comment }>()
);

// // not needed:
// export const updateComment = createAction(
//   "[Comments] update comment",
//   props<{ comment: Comment }>()
// );
// export const commentUpdated = createAction(
//   "[Comments] comment updated",
//   props<{ comment: Comment }>()
// );

// // not needed:
// export const deleteComment = createAction(
//   "[Comments] delete comment",
//   props<{ commentId: number }>()
// );
// export const commentDeleted = createAction(
//   "[Comments] comment deleted",
//   props<{ comment: Comment }>()
// );
