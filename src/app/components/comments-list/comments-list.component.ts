import { Component, OnInit } from "@angular/core";
import { CommentsService } from "src/app/services/comments.service";
import { mergeMap, switchMap, tap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { loadComments } from "src/app/store/actions/comments.actions";
import { getComments } from "src/app/store/selectors/comments.selectors";

@Component({
  selector: "app-comments-list",
  templateUrl: "./comments-list.component.html",
  styleUrls: ["./comments-list.component.scss"],
})
export class CommentsListComponent implements OnInit {
  constructor(
    private commentsService: CommentsService,
    private readonly activatedRoute: ActivatedRoute,
    private store: Store<{}>
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap((params) => {
          const postId = params["id"] as number;
          console.log(postId);
          this.store.dispatch(loadComments({ postId: postId }));
        })
      )
      .subscribe();
  }

  // GET
  // public commentsList$ = this.activatedRoute.params.pipe(
  //   switchMap((params) => {
  //     const postId = params["id"] as number;
  //     return this.commentsService.getCommentsByPostId(postId);
  //   })
  // );

  public commentsList$ = this.getCommentsByPostId$().pipe(tap((s) => console.error(s)));

  private getCommentsByPostId$() {
    // this.store.dispatch(loadComments({ postId: postId }));
    return this.store.select(getComments).pipe(tap((s) => console.warn(s)));
  }
}
