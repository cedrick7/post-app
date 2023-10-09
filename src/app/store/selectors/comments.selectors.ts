import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CommentsState, commentsKey } from "../reducers/comments.reducers";

export const commentsState = createFeatureSelector<CommentsState>(commentsKey);

export const getComments = createSelector(commentsState, (state: CommentsState) => state?.comments);
