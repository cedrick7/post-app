import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient) {}

  //------------------------------------------------------------------------------------------------
  // GET
  getUsers() {
    return this.http.get<User[]>("https://jsonplaceholder.typicode.com/users/");
  }

  getUserByUserId(userId: number | undefined) {
    const URL: string = "https://jsonplaceholder.typicode.com/users/" + userId;
    return this.http.get<User>(URL);
  }

  getUserByUserIdAsArray(userId: number) {
    return this.getUserByUserId(userId).pipe(
      map((users) => {
        var usersList: User[] = [];
        usersList.push(users);
        return usersList;
      })
    );
  }

  //------------------------------------------------------------------------------------------------
  // UPDATE
  updateUser(user: User) {
    const URL: string = "https://jsonplaceholder.typicode.com/posts/" + user.id;
    const BODY: User = user;
    const HEADERS = new HttpHeaders({
      contentType: "application/json; charset=UTF-8",
    });

    return this.http.put<User>(URL, BODY, { headers: HEADERS });
  }
}
