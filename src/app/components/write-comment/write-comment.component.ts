import { Component, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable, map, of, switchMap } from "rxjs";
import { PostComment } from "src/app/models/postComment.model";
import { CommentsService } from "src/app/services/comments.service";
import { UsersService } from "src/app/services/users.service";
import { createComment } from "src/app/store/actions/comments.actions";
import { loadUsers } from "src/app/store/actions/users.actions";
import {
  getSelectedUser,
  getSelectedUserId,
  getUsers,
} from "src/app/store/selectors/users.selectors";

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
  // myUserId$ = this.store.select(getSelectedUserId);
  // user$ = this.store.select(getSelectedUser);
  writeCommentTitle!: string;
  writeCommentBody!: string;

  // GET
  // public userList$ = this.myUserId$.pipe(
  //   switchMap((myUserId) =>
  //     // !!myUserId ? this.usersService.getUserByUserIdAsArray(myUserId) : of([])
  //     !!myUserId ? this.getLoggedInUserId$(myUserId) : of([])
  //   )
  // );

  // private getUserByUserIdAsArray$(myUserId: number) {
  //   this.store.dispatch(loadUsersByUserId({ userId: myUserId }));
  //   return this.store.select(getUsersByUserId);
  // }

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
    console.error("submitComment");

    const COMMENT: PostComment = {
      postId: currentPostId,
      name: writeCommentForm.form.value.writeCommentTitle,
      email: loggedInUserEmail, // get email from usersList$
      body: writeCommentForm.form.value.writeCommentBody,
    };
    console.log(COMMENT);

    // this.commentsService.postComment(POST_ID, COMMENT);
    this.store.dispatch(createComment({ postId: currentPostId, comment: COMMENT }));

    writeCommentForm.reset();
  }
}
