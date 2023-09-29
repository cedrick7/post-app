import { Component } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getSelectedUserId } from "src/app/store/selectors/users.selectors";
import { of, switchMap } from "rxjs";

@Component({
  selector: "app-me-information",
  templateUrl: "./me-information.component.html",
  styleUrls: ["./me-information.component.scss"],
})
export class MeInformationComponent {
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
