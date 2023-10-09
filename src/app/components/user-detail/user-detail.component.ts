import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { User } from "src/app/models/user.model";
import { UsersService } from "src/app/services/users.service";
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import {
  getSelectedUser,
  getSelectedUserId,
  getUsers,
} from "src/app/store/selectors/users.selectors";
import { loadUsers } from "src/app/store/actions/users.actions";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  constructor(
    private usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
    private route: Router,
    private store: Store<{}>,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // get data from usersList$
    this.userSubscription = this.store.select(getSelectedUser).subscribe((user) => {
      this.userUsernameInput = user?.username;
      this.userNameInput = user?.name;
      this.userEmailInput = user?.email;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }

  // variables
  heading = "User Information Detail";
  myUserId$ = this.store.select(getSelectedUserId);
  userSubscription!: Subscription;
  userUsernameInput: string | undefined = undefined;
  userNameInput: string | undefined = undefined;
  userEmailInput: string | undefined = undefined;

  // GET
  public userList$ = this.activatedRoute.params.pipe(
    switchMap((params) => {
      const userId = params["id"] as number;
      return this.getUserByUserId$(userId);
    })
  );

  private getUserByUserId$(myUserId: number) {
    this.store.dispatch(loadUsers({ userId: myUserId }));
    return this.store.select(getUsers);
  }

  // button actions
  onEditMyUserInformation(user: User) {
    this.route.navigateByUrl(`user/${user?.id}/edit`);
  }
}
