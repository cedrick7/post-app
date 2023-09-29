import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";

import * as PostsActions from "../actions/posts.actions";
import { PostsService } from "src/app/services/posts.service";

@Injectable()
export class PostsEffects {
  constructor(private postActions$: Actions, private postsService: PostsService) {}

  // GET
  loadPosts$ = createEffect(() =>
    this.postActions$.pipe(
      ofType(PostsActions.loadPosts),
      switchMap((action) => {
        if (!!action.userId) {
          return this.postsService.getPostsByUserIdWithUsername(action.userId).pipe(
            switchMap((posts) => [
              PostsActions.postsLoaded({
                posts: posts,
              }),
            ])
          );
        }
        return this.postsService.getPostsWithUsername().pipe(
          switchMap((posts) => [
            PostsActions.postsLoaded({
              posts: posts,
            }),
          ])
        );
      })
    )
  );

  loadPost$ = createEffect(() =>
    this.postActions$.pipe(
      ofType(PostsActions.loadPost),
      switchMap((action) => {
        return this.postsService.getPostByPostIdWithUsername(action.postId).pipe(
          switchMap((post) => [
            PostsActions.postLoaded({
              post: post,
            }),
          ])
        );
      })
    )
  );

  // FOR CACHING IN STORE
  // selectPost$ = createEffect(() =>
  //   this.postActions$.pipe(
  //     ofType(PostsActions.selectPost),
  //     map((action) => {
  //       return PostsActions.postSelected({
  //         post: action.post,
  //       });
  //     })
  //   )
  // );

  // selectPostId$ = createEffect(() =>
  //   this.postActions$.pipe(
  //     ofType(PostsActions.selectPostId),
  //     map((action) => {
  //       return PostsActions.postIdSelected({
  //         postId: action.postId,
  //       });
  //     })
  //   )
  // );

  // dipatch action -> listen to action in effect -> call api ->  on success: dipsatch action and dispacth success notification  -> Listen sto success notification in another effect and titrigger snackbar

  // POST
  createPost$ = createEffect(() =>
    this.postActions$.pipe(
      ofType(PostsActions.createPost),
      switchMap((action) => {
        return this.postsService.postPost(action.post).pipe(
          tap((data) => console.warn(data)),
          // tap((data) => {
          //   this._snackBar.open("post created", "post");
          // }),
          switchMap((post) => [
            PostsActions.postCreated({
              post: post,
            }),
          ])
        );
      })
    )
  );

  // UPDATE
  updatePost$ = createEffect(() =>
    this.postActions$.pipe(
      ofType(PostsActions.updatePost),
      switchMap((action) => {
        return this.postsService.updatePost(action.updatePost).pipe(
          tap((data) => console.warn(data)),
          switchMap((post) => [
            PostsActions.postUpdated({
              post: post,
            }),
          ])
        );
      })
    )
  );

  // DELETE
  deletePost$ = createEffect(() =>
    this.postActions$.pipe(
      ofType(PostsActions.deletePost),
      switchMap((action) => {
        return this.postsService.deletePostByPostId(action.postId).pipe(
          tap((data) => console.warn(data)),
          switchMap((_) => [
            PostsActions.postDeleted({
              postId: action.postId,
            }),
          ])
        );
      })
    )
  );
}
