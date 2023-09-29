import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, mergeMap } from "rxjs";
import { PostsService } from "./posts.service";
import { UsersService } from "./users.service";
import { Comment } from "../models/comment.model";
import { User } from "../models/user.model";
import { PostComment } from "../models/postComment.model";

@Injectable({
  providedIn: "root",
})
export class CommentsService {
  constructor(private http: HttpClient, private usersService: UsersService) {}

  //------------------------------------------------------------------------------------------------
  // GET
  getCommentsByPostId(postId: number) {
    const URLv1: string = "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments/";
    const URLv2: string = "https://jsonplaceholder.typicode.com/comments?postId=" + postId;
    return this.http.get<Comment[]>(URLv1);
  }

  //------------------------------------------------------------------------------------------------
  // POST
  postComment(postId: number, comment: PostComment) {
    const URL: string = "https://jsonplaceholder.typicode.com/posts/" + postId + "/comments/";
    const BODY: PostComment = comment;
    const HEADERS = new HttpHeaders({
      contentType: "application/json; charset=UTF-8",
    });

    return this.http.post<Comment>(URL, BODY, { headers: HEADERS });
  }

  //------------------------------------------------------------------------------------------------
  // UPDATE

  //------------------------------------------------------------------------------------------------
  // DELETE
}
