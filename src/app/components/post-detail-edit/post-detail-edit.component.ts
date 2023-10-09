import { Component, OnDestroy, OnInit } from "@angular/core";
import { PostsService } from "src/app/services/posts.service";
import { Subscription, map, switchMap } from "rxjs";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { UpdatePost } from "src/app/models/updatePost.model";
import { Store } from "@ngrx/store";
import { getSelectedUserId } from "src/app/store/selectors/users.selectors";
import { deletePost, loadPost, updatePost } from "src/app/store/actions/posts.actions";
import { getSelectedPost } from "src/app/store/selectors/posts.selectors";
import { selectUserByUserId } from "src/app/store/actions/users.actions";

@Component({
  selector: "app-post-detail-edit",
  templateUrl: "./post-detail-edit.component.html",
  styleUrls: ["./post-detail-edit.component.scss"],
})
export class PostDetailEditComponent implements OnInit, OnDestroy {
  constructor(
    private postsService: PostsService,
    private route: Router,
    private readonly activatedRoute: ActivatedRoute,
    private store: Store<{}>
  ) {}

  ngOnInit(): void {
    this.postSubscription = this.store.select(getSelectedPost).subscribe((post) => {
      this.editPostTitle = post?.title;
      this.editPostBody = post?.body;
    });
  }

  ngOnDestroy(): void {
    this.postSubscription && this.postSubscription.unsubscribe();
  }

  // variables
  heading = "Edit Post";
  myUserId$ = this.store.select(getSelectedUserId);
  postSubscription!: Subscription;
  editPostTitle: string | undefined = undefined;
  editPostBody: string | undefined = undefined;

  // GET
  public postList$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      const postId = params["id"] as number;
      this.store.dispatch(loadPost({ postId: postId }));
      return this.store.select(getSelectedPost).pipe(map((s) => [s]));
    })
  );

  // UPDATE
  submitPostForm(editPostForm: NgForm, myUserId: number, postId: number) {
    const POST: UpdatePost = {
      id: postId,
      title: editPostForm.form.value.editPostTitle,
      body: editPostForm.form.value.editPostBody,
      userId: myUserId,
    };

    this.store.dispatch(updatePost({ updatePost: POST }));
  }

  // DELETE
  deletePost(postId: number) {
    this.store.dispatch(deletePost({ postId: postId }));
    // redirect to ?
  }

  // button actions
  onSelectUserByUserId(userId: number) {
    if (userId == 0) {
      console.error("data cannot be read. select user failed, redirect to user failed.");
    } else {
      this.store.dispatch(selectUserByUserId({ userId: userId }));
      this.route.navigateByUrl(`user/${userId}`);
    }
  }
}
