import { Component } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { getUsers } from "src/app/store/selectors/users.selectors";
import { loadUsers, selectUser } from "src/app/store/actions/users.actions";
import { switchMap } from "rxjs";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.scss"],
})
export class UsersListComponent {
  constructor(
    private usersService: UsersService,
    private route: Router,
    private readonly activatedRoute: ActivatedRoute,
    private store: Store<{}>
  ) {}

  // GET
  public usersList$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      if (params["id"] == undefined) {
        // used for dashboard
        return this.usersService.getUsers();
      } else {
        const userId = params["id"] as number;
        return this.getUsersByUserId$(userId);
      }
    })
  );

  private getUsersByUserId$(userId: number | undefined = undefined) {
    this.store.dispatch(loadUsers({ userId: userId }));
    console.log(userId);
    return this.store.select(getUsers);
  }

  // button actions
  onSelectUser(user: User) {
    this.store.dispatch(selectUser({ user: user }));
    this.route.navigateByUrl(`user/${user?.id}`);
    console.log(user);
  }
}
