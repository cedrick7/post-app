import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommentsState, commentsKey } from "../reducers/comments.reducers";

export const commentsState = createFeatureSelector<CommentsState>(commentsKey);

export const getComments = createSelector(commentsState, (state: CommentsState) => state?.comments);

// export const getSelectedComment = createSelector(
//   commentsState,
//   (state: CommentsState) => state?.selectedComment
// );

// export const getSelectedCommentId = createSelector(
//   commentsState,
//   (state: CommentsState) => state?.selectedCommentId
// );

// export const getCreatedComment = createSelector(
//   commentsState,
//   (state: CommentsState) => state?.createdComment
// );

// export const getUpdatedComment = createSelector(
//   commentsState,
//   (state: CommentsState) => state?.updatedComment
// );

// export const getDeletedComment = createSelector(
//   commentsState,
//   (state: CommentsState) => state?.deletedComment
// );
