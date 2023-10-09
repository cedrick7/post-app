import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { of, switchMap } from "rxjs";
import { PostPost } from "src/app/models/postPost.model";
import { User } from "src/app/models/user.model";
import { createPost } from "src/app/store/actions/posts.actions";
import { loadUsers, selectUser } from "src/app/store/actions/users.actions";
import { getSelectedUserId, getUsers } from "src/app/store/selectors/users.selectors";

@Component({
  selector: "app-write-post",
  templateUrl: "./write-post.component.html",
  styleUrls: ["./write-post.component.scss"],
})
export class WritePostComponent {
  constructor(private route: Router, private store: Store<{}>) {}

  // variables
  myUserId$ = this.store.select(getSelectedUserId);
  writePostTitle!: string;
  writePostBody!: string;

  // GET
  public usersList$ = this.myUserId$.pipe(
    switchMap((myUserId) => (!!myUserId ? this.getUserByUserId$(myUserId) : of([])))
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

    this.store.dispatch(createPost({ post: POST }));

    postForm.reset();
  }

  // button actions
  onSelectUser(user: User) {
    this.store.dispatch(selectUser({ user: user }));
    this.route.navigateByUrl(`user/${user?.id}`);
  }
}
