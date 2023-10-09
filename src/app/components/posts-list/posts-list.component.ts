import { Component } from "@angular/core";
import { Post } from "src/app/models/post.model";
import { PostsService } from "src/app/services/posts.service";
import { switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getSelectedUserId, getUsers } from "src/app/store/selectors/users.selectors";
import { deletePost, loadPosts } from "src/app/store/actions/posts.actions";
import { getPosts } from "src/app/store/selectors/posts.selectors";
import { selectUserByUserId } from "src/app/store/actions/users.actions";

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
      } else {
        const userId = params["id"] as number;
        // used for user
        return this.getPostsByUserIdWithUsername$(userId);
      }
    })
  );

  private getPostsByUserIdWithUsername$(myUserId: number | undefined = undefined) {
    this.store.dispatch(loadPosts({ userId: myUserId }));
    return this.store.select(getPosts);
  }

  // button actions
  onSelectUser(userId: number) {
    this.store.dispatch(selectUserByUserId({ userId: userId }));
    this.route.navigateByUrl(`user/${userId}`);
  }

  onSelectPost(post: Post) {
    this.route.navigateByUrl(`post/${post?.id}`);
  }

  onEditPost(post: Post) {
    this.route.navigateByUrl(`post/${post?.id}/edit`);
  }

  onDeletePost(post: Post) {
    this.store.dispatch(deletePost({ postId: post.id }));
  }
}
