import { Component } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";
import { Subscription, of, switchMap } from "rxjs";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getSelectedUserId } from "src/app/store/selectors/users.selectors";

@Component({
  selector: "app-my-information",
  templateUrl: "./my-information.component.html",
  styleUrls: ["./my-information.component.scss"],
})
export class MyInformationComponent {
  constructor(
    private usersService: UsersService,
    private route: Router,
    private store: Store<{}>
  ) {}

  // variables
  myUserId$ = this.store.select(getSelectedUserId);

  // GET
  //public usersList$ = this.usersService.getUserByUserIdAsArray(this._myUserId);
  public usersList$ = this.myUserId$.pipe(
    switchMap((myUserId) =>
      !!myUserId ? this.usersService.getUserByUserIdAsArray(myUserId) : of([])
    )
  );

  // button actions
  onSelectUser(user: User) {
    this.route.navigateByUrl(`user/${user?.id}`);
    console.log(user);
  }
}
