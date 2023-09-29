import { Component, OnDestroy, OnInit } from "@angular/core";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/posts.service";
import { Subscription, map, switchMap } from "rxjs";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UpdatePost } from "src/app/models/updatePost.model";
import { Store } from "@ngrx/store";
import { getSelectedUserId } from "src/app/store/selectors/users.selectors";
import { deletePost, loadPost, updatePost } from "src/app/store/actions/posts.actions";
import { getSelectedPost } from "src/app/store/selectors/posts.selectors";

@Component({
  selector: "app-post-detail-edit",
  templateUrl: "./post-detail-edit.component.html",
  styleUrls: ["./post-detail-edit.component.scss"],
})
export class PostDetailEditComponent implements OnInit, OnDestroy {
  constructor(
    private postsService: PostsService,
    private readonly activatedRoute: ActivatedRoute,
    private store: Store<{}>
  ) {}

  ngOnInit(): void {
    this.postSubscription = this.store.select(getSelectedPost).subscribe((post) => {
      this.editPostTitle = post?.title;
      this.editPostBody = post?.body;
    });
    console.log(this.editPostTitle);
    console.log(this.editPostBody);
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
      // return this.postsService.getPostByPostIdWithUsername(postId);
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
    console.log(POST);

    // this.postsService.updatePost(POST);
    this.store.dispatch(updatePost({ updatePost: POST }));

    // editPostForm.reset();
  }

  // DELETE
  deletePost(postId: number) {
    // this.postsService.deletePostByPostId(postId);
    this.store.dispatch(deletePost({ postId: postId }));
  }
}
