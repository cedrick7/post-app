import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { switchMap, tap } from "rxjs";

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
}
