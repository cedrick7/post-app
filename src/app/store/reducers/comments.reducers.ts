import { createReducer, on } from "@ngrx/store";
import * as CommentsActions from "../actions/comments.actions";
import { Comment } from "src/app/models/comment.model";

export const commentsKey = "comments";

export interface CommentsState {
  comments: Comment[];
}

export const initialState: CommentsState = {
  comments: [],
};

export const CommentsReducer = createReducer(
  initialState,

  // GET
  on(CommentsActions.commentsLoaded, (state, { comments }) => ({
    ...state,
    comments: comments,
  })),

  // POST
  on(CommentsActions.commentCreated, (state, { comment }) => {
    return {
      ...state,
      comments: (state?.comments ?? []).concat([comment]),
    };
  })
);
