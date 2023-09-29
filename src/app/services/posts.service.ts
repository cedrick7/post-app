import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  Observable,
  concatMap,
  mergeMap,
  map,
  switchMap,
  Subject,
  combineLatest,
  catchError,
} from "rxjs";
import { UsersService } from "./users.service";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
import { PostPost } from "../models/postPost.model";
import { UpdatePost } from "../models/updatePost.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  constructor(private http: HttpClient, private usersService: UsersService) {}

  //------------------------------------------------------------------------------------------------
  // RESPONSE HANDLING
  handleSuccess(response: HttpResponse<any>) {
    console.log(response);
    // show alert with success message
  }

  handleError(error: HttpErrorResponse) {
    console.error("error: ", error);
    console.error("error message: ", error.message);
  }

  //------------------------------------------------------------------------------------------------
  // GET
  getPosts() {
    return this.http.get<Post[]>("https://jsonplaceholder.typicode.com/posts/");
  }
  // important (all post irrespective of user)
  getPostsWithUsername() {
    return this.getPosts().pipe(
      mergeMap((posts) => {
        return this.usersService.getUsers().pipe(
          map((users) => {
            return posts.map((post) => {
              return {
                ...post,
                userName: users.find((user: User) => user.id == post.userId)?.username,
              };
            });
          })
        );
      })
    );
  }

  getPostByPostId(postId: number) {
    const URL: string = "https://jsonplaceholder.typicode.com/posts/" + postId;
    return this.http.get<Post>(URL);
  }

  getPostByPostIdWithUsername(postId: number) {
    return this.getPostByPostId(postId).pipe(
      mergeMap((post) => {
        var postList: Post[] = [];
        postList.push(post);
        return this.usersService.getUsers().pipe(
          map((users) => {
            return postList.map((postList) => {
              return {
                ...postList,
                userName: users.find((user: User) => user.id == postList.userId)?.username,
              };
            })[0];
          })
        );
      })
    );
  }

  private getPostsByUserId(userId: number) {
    const URL: string = "https://jsonplaceholder.typicode.com/posts?userId=" + userId;
    return this.http.get<Post[]>(URL);
  }

  // important()get post for a particular user
  getPostsByUserIdWithUsername(userId: number) {
    return this.getPostsByUserId(userId).pipe(
      mergeMap((posts) => {
        var postList: Post[] = [];
        postList = posts;
        return this.usersService.getUsers().pipe(
          map((users) => {
            return postList.map((postList) => {
              return {
                ...postList,
                userName: users.find((user: User) => user.id == postList.userId)?.username,
              };
            });
          })
        );
      })
    );
  }

  //------------------------------------------------------------------------------------------------
  // POST
  postPost(post: PostPost) {
    const URL: string = "https://jsonplaceholder.typicode.com/posts";
    const BODY: PostPost = post;
    const HEADERS = new HttpHeaders({
      contentType: "application/json; charset=UTF-8",
    });

    return this.http.post<Post>(URL, BODY, { headers: HEADERS }).pipe(
      switchMap((post) => {
        return this.usersService.getUserByUserId(post.userId).pipe(
          map((user) => ({
            ...post,
            userName: user.username,
          }))
        );
      })
    );
  }

  //------------------------------------------------------------------------------------------------
  // UPDATE
  updatePost(post: UpdatePost) {
    const URL: string = "https://jsonplaceholder.typicode.com/posts/" + post.id;
    const BODY: UpdatePost = post;
    const HEADERS = new HttpHeaders({
      contentType: "application/json; charset=UTF-8",
    });

    return this.http.put<Post>(URL, BODY, { headers: HEADERS });
  }

  //------------------------------------------------------------------------------------------------
  // DELETE
  deletePostByPostId(postId: number | undefined) {
    const URL: string = "https://jsonplaceholder.typicode.com/posts/" + postId;

    return this.http.delete(URL);
  }
}
