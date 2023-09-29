import { Component, OnDestroy, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-friends-list",
  templateUrl: "./friends-list.component.html",
  styleUrls: ["./friends-list.component.scss"],
})
export class FriendsListComponent implements OnInit, OnDestroy {
  heading = "Friends List";
  usersList: User[] = [];
  usersSubscription!: Subscription;
  _myUserId: number = 1; // still hardcoded!!!

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.usersSubscription = this.usersService.getUsers().subscribe(
      (data) => {
        data = data.filter((user) => user.id !== this._myUserId);
        this.usersList = data;
      },
      (err) => console.error(err),
      () => console.log("loading complete (C4: getUserByUserId)")
    );
  }

  ngOnDestroy(): void {
    this.usersSubscription && this.usersSubscription.unsubscribe();
  }
}
