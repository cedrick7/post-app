import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Store } from "@ngrx/store";
import { of, switchMap } from "rxjs";
import { PostPost } from "src/app/models/postPost.model";
import { PostsService } from "src/app/services/posts.service";
import { UsersService } from "src/app/services/users.service";
import { createPost } from "src/app/store/actions/posts.actions";
import { loadUsers } from "src/app/store/actions/users.actions";
import { getSelectedUserId, getUsers } from "src/app/store/selectors/users.selectors";

@Component({
  selector: "app-write-post",
  templateUrl: "./write-post.component.html",
  styleUrls: ["./write-post.component.scss"],
})
export class WritePostComponent {
  constructor(
    private usersService: UsersService,
    private postService: PostsService,
    private store: Store<{}>
  ) {}

  // variables
  myUserId$ = this.store.select(getSelectedUserId);
  writePostTitle!: string;
  writePostBody!: string;

  // GET
  //public usersList$ = this.usersService.getUserByUserIdAsArray(this._myUserId);
  public usersList$ = this.myUserId$.pipe(
    switchMap((myUserId) =>
      // !!myUserId ? this.usersService.getUserByUserIdAsArray(myUserId) : of([]))
      !!myUserId ? this.getUserByUserId$(myUserId) : of([])
    )
  );

  private getUserByUserId$(myUserId: number) {
    this.store.dispatch(loadUsers({ userId: myUserId }));
    return this.store.select(getUsers);
  }

  // POST
  public submitPostForm(postForm: NgForm, myUserId: number) {
    const POST: PostPost = {
      title: postForm.form.value.writePostTitle,
      body: postForm.form.value.writePostBody,
      userId: myUserId,
    };

    console.log(POST);
    postForm.reset();

    // this.postService.postPost(POST);
    this.store.dispatch(createPost({ post: POST }));
  }
}
