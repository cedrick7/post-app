import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { map, switchMap } from "rxjs";
import { PostComment } from "src/app/models/postComment.model";
import { CommentsService } from "src/app/services/comments.service";
import { UsersService } from "src/app/services/users.service";
import { createComment } from "src/app/store/actions/comments.actions";
import { getSelectedUserId } from "src/app/store/selectors/users.selectors";

@Component({
  selector: "app-write-comment",
  templateUrl: "./write-comment.component.html",
  styleUrls: ["./write-comment.component.scss"],
})
export class WriteCommentComponent {
  constructor(
    private usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
    private commentsService: CommentsService,
    private store: Store<{}>
  ) {}

  // variables
  writeCommentTitle!: string;
  writeCommentBody!: string;

  // GET
  public loggedInUserEmail$ = this.getLoggedInUserId$().pipe(
    switchMap((userId) => {
      return this.usersService.getUserByUserId(userId);
    }),
    map((user) => {
      return user.email;
    })
  );

  private getLoggedInUserId$() {
    return this.store.select(getSelectedUserId);
  }

  public currentPostId$ = this.activatedRoute.params.pipe(
    map((params) => {
      return params["id"] as number;
    })
  );

  // POST
  submitComment(writeCommentForm: NgForm, loggedInUserEmail: string, currentPostId: number) {
    const COMMENT: PostComment = {
      postId: currentPostId,
      name: writeCommentForm.form.value.writeCommentTitle,
      email: loggedInUserEmail,
      body: writeCommentForm.form.value.writeCommentBody,
    };

    this.store.dispatch(createComment({ postId: currentPostId, comment: COMMENT }));

    writeCommentForm.reset();
  }
}
