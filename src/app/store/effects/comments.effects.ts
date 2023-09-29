import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";

import * as CommentsActions from "../actions/comments.actions";
import { CommentsService } from "src/app/services/comments.service";

// postId is hardcoded!!!
const postId = 1;

@Injectable()
export class CommentsEffects {
  constructor(private commentsActions$: Actions, private commentsService: CommentsService) {}

  // GET
  loadComments$ = createEffect(() =>
    this.commentsActions$.pipe(
      ofType(CommentsActions.loadComments),
      switchMap((action) => {
        return this.commentsService.getCommentsByPostId(action.postId).pipe(
          switchMap((comments) => [
            CommentsActions.commentsLoaded({
              comments: comments,
            }),
          ])
        );
      })
    )
  );

  // // not needed:
  // selectComment$ = createEffect(() =>
  //   this.commentsActions$.pipe(
  //     ofType(CommentsActions.selectComment),
  //     map((action) => {
  //       return CommentsActions.commentSelected({
  //         comment: action.comment,
  //       });
  //     })
  //   )
  // );

  // // not needed:
  // selectCommentId$ = createEffect(() =>
  //   this.commentsActions$.pipe(
  //     ofType(CommentsActions.selectCommentId),
  //     map((action) => {
  //       return CommentsActions.commentIdSelected({
  //         commentId: action.commentId,
  //       });
  //     })
  //   )
  // );

  // POST
  createComment$ = createEffect(() =>
    this.commentsActions$.pipe(
      ofType(CommentsActions.createComment),
      switchMap((action) => {
        return this.commentsService.postComment(action.postId, action.comment).pipe(
          tap((data) => console.warn(data)),
          switchMap((comment) => [
            CommentsActions.commentCreated({
              comment: comment,
            }),
          ])
        );
      })
    )
  );

  // // not needed:
  // updateComment$ = createEffect(() =>
  //   this.commentsActions$.pipe(
  //     ofType(CommentsActions.updateComment),
  //     map((action) => {
  //       return CommentsActions.commentUpdated({
  //         comment: action.comment,
  //       });
  //     })
  //   )
  // );

  // not needed:
  // deleteComment$ = createEffect(() =>
  //   this.commentsActions$.pipe(
  //     ofType(CommentsActions.deleteComment),
  //     map((action) => {
  //       return CommentsActions.commentDeleted({
  //         comment: action.comment,
  //       });
  //     })
  //   )
  // );
}
