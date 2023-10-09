import { Component } from "@angular/core";
import { PostsService } from "src/app/services/posts.service";
import { map, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getSelectedUserId } from "src/app/store/selectors/users.selectors";
import { loadPost } from "src/app/store/actions/posts.actions";
import { getSelectedPost } from "src/app/store/selectors/posts.selectors";
import { selectUserByUserId } from "src/app/store/actions/users.actions";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.scss"],
})
export class PostDetailComponent {
  constructor(
    private postsService: PostsService,
    private readonly activatedRoute: ActivatedRoute,
    private route: Router,
    private store: Store<{}>
  ) {}

  // variables
  heading = "Post + Comments";
  myUserId$ = this.store.select(getSelectedUserId);

  // GET
  public postList$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      const postId = params["id"] as number;
      this.store.dispatch(loadPost({ postId: postId }));
      return this.store.select(getSelectedPost).pipe(map((s) => [s]));
    })
  );

  // button actions
  onSelectUserByUserId(userId: number) {
    if (userId == 0) {
      console.error("data cannot be read. select user failed, redirect to user failed.");
    } else {
      this.store.dispatch(selectUserByUserId({ userId: userId }));
      this.route.navigateByUrl(`user/${userId}`);
    }
  }

  onEditThisPost(postId: number | undefined) {
    this.route.navigateByUrl(`post/${postId}/edit`);
  }

  onDeleteThisPost(postId: number | undefined) {
    this.postsService.deletePostByPostId(postId);
    this.route.navigateByUrl(``);
  }
}
