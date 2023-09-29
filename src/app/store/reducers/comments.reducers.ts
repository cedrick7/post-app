import { createReducer, on } from "@ngrx/store";
import * as CommentsActions from "../actions/comments.actions";
import { Comment } from "src/app/models/comment.model";

export const commentsKey = "comments";

export interface CommentsState {
  comments: Comment[];
  // selectedComment: Comment | undefined;
  // selectedCommentId: number | undefined;
  // createdComment: Comment | undefined;
  // updatedComment: Comment | undefined;
  // deletedComment: Comment | undefined;
}

export const initialState: CommentsState = {
  comments: [],
  // selectedComment: undefined,
  // selectedCommentId: undefined,
  // createdComment: undefined,
  // updatedComment: undefined,
  // deletedComment: undefined,
};

export const CommentsReducer = createReducer(
  initialState,

  // GET
  on(CommentsActions.commentsLoaded, (state, { comments }) => ({
    ...state,
    comments: comments,
  })),

  // FOR CACHING IN STORE
  // on(CommentsActions.commentSelected, (state, { comment }) => ({
  //   ...state,
  //   comment: comment,
  // })),
  // on(CommentsActions.commentIdSelected, (state, { commentId }) => ({
  //   ...state,
  //   commentId: commentId,
  // })),

  // POST
  on(CommentsActions.commentCreated, (state, { comment }) => {
    return {
      ...state,
      comments: (state?.comments ?? []).concat([comment]),
    };
  })

  // UPDATE
  // on(CommentsActions.commentUpdated, (state, { comment }) => ({
  //   ...state,
  //   comment: comment,
  // })),

  // DELETE
  // on(CommentsActions.commentDeleted, (state, { comment }) => ({
  //   ...state,
  //   comment: comment,
  // }))
);
