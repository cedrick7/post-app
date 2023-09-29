import { Component } from "@angular/core";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/posts.service";
import { map, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getSelectedUserId } from "src/app/store/selectors/users.selectors";
import { loadPost } from "src/app/store/actions/posts.actions";
import { getSelectedPost } from "src/app/store/selectors/posts.selectors";

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
      // return this.postsService.getPostByPostIdWithUsername(postId);
      this.store.dispatch(loadPost({ postId: postId }));
      return this.store.select(getSelectedPost).pipe(map((s) => [s]));
    })
  );

  // button actions
  onEditThisPost(postId: number | undefined) {
    this.route.navigateByUrl(`post/${postId}/edit`);
  }

  onDeleteThisPost(postId: number | undefined) {
    this.postsService.deletePostByPostId(postId);
    this.route.navigateByUrl(``);
  }
}
