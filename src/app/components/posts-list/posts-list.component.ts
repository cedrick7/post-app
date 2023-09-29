import { Component } from "@angular/core";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/posts.service";
import { switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getSelectedUserId } from "src/app/store/selectors/users.selectors";
import { deletePost, loadPosts } from "src/app/store/actions/posts.actions";
import { getPosts } from "src/app/store/selectors/posts.selectors";

@Component({
  selector: "app-posts-list",
  templateUrl: "./posts-list.component.html",
  styleUrls: ["./posts-list.component.scss"],
})
export class PostsListComponent {
  constructor(
    private postsService: PostsService,
    private route: Router,
    private readonly activatedRoute: ActivatedRoute,
    private store: Store<{}>
  ) {}

  // variables
  heading = "Posts List";
  myUserId$ = this.store.select(getSelectedUserId);

  // GET
  public postsList$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      // warning: postList is used in several components
      if (params["id"] == undefined) {
        // used for dashboard
        return this.getPostsByUserIdWithUsername$();
        // return this.postsService.getPostsWithUsername();
      } else {
        const userId = params["id"] as number;
        // used for user
        return this.getPostsByUserIdWithUsername$(userId);
        //  return this.postsService.getPostsByUserIdWithUsername(userId);
      }
    })
  );

  private getPostsByUserIdWithUsername$(myUserId: number | undefined = undefined) {
    this.store.dispatch(loadPosts({ userId: myUserId }));
    return this.store.select(getPosts);
  }

  // button actions
  onSelectPost(post: Post) {
    this.route.navigateByUrl(`post/${post?.id}`);
    console.log(post);
  }

  onEditPost(post: Post) {
    this.route.navigateByUrl(`post/${post?.id}/edit`);
    console.log(post);
  }

  onDeletePost(post: Post) {
    this.store.dispatch(deletePost({ postId: post.id }));
    // this.route.navigateByUrl(``);
    // console.log(post);
  }
}
