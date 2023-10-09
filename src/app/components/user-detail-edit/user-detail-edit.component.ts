import { Component, OnDestroy, OnInit } from "@angular/core";
import { UsersService } from "src/app/services/users.service";
import { Subscription, switchMap } from "rxjs";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { User } from "src/app/models/user.model";
import { Store } from "@ngrx/store";
import {
  getSelectedUser,
  getSelectedUserId,
  getUsers,
} from "src/app/store/selectors/users.selectors";
import { loadUsers, updateUser } from "src/app/store/actions/users.actions";

@Component({
  selector: "app-user-detail-edit",
  templateUrl: "./user-detail-edit.component.html",
  styleUrls: ["./user-detail-edit.component.scss"],
})
export class UserDetailEditComponent implements OnInit, OnDestroy {
  constructor(
    private usersService: UsersService,
    private readonly activatedRoute: ActivatedRoute,
    private store: Store<{}>
  ) {}

  ngOnInit(): void {
    // get data from usersList$
    this.userSubscription = this.store.select(getSelectedUser).subscribe((user) => {
      this.userIdInput = user?.id;
      this.userNameInput = user?.name;
      this.userUsernameInput = user?.username;
      this.userEmailInput = user?.email;
      this.userStreetInput = user?.address?.street;
      this.userSuiteInput = user?.address?.suite;
      this.userCityInput = user?.address?.city;
      this.userZipInput = user?.address?.zipcode;
      this.userLatInput = user?.address?.geo?.lat;
      this.userLngInput = user?.address?.geo?.lng;
      this.userPhoneInput = user?.phone;
      this.userWebsiteInput = user?.website;
      this.userCompanyNameInput = user?.company?.name;
      this.userCompanyCatchPhraseInput = user?.company?.catchPhrase;
      this.userCompanyBsInput = user?.company?.bs;
    });
  }

  ngOnDestroy(): void {
    this.userSubscription && this.userSubscription.unsubscribe();
  }

  // variables
  heading = "User Detail";
  _myUserId: number = 1; // still hardcoded!!!
  myUserId$ = this.store.select(getSelectedUserId);
  userSubscription!: Subscription;
  userIdInput: number | undefined = undefined;
  userNameInput: string | undefined = undefined;
  userUsernameInput: string | undefined = undefined;
  userEmailInput: string | undefined = undefined;
  userStreetInput: string | undefined = undefined;
  userSuiteInput: string | undefined = undefined;
  userCityInput: string | undefined = undefined;
  userZipInput: string | undefined = undefined;
  userLatInput: string | undefined = undefined;
  userLngInput: string | undefined = undefined;
  userPhoneInput: string | undefined = undefined;
  userWebsiteInput: string | undefined = undefined;
  userCompanyNameInput: string | undefined = undefined;
  userCompanyCatchPhraseInput: string | undefined = undefined;
  userCompanyBsInput: string | undefined = undefined;

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

  // UPDATE
  submitUserDetailForm(userForm: NgForm) {
    const USER: User = {
      id: userForm.form.value.userIdInput,
      name: userForm.form.value.userNameInput,
      username: userForm.form.value.userUsernameInput,
      email: userForm.form.value.userEmailInput,
      address: {
        street: userForm.form.value.userStreetInput,
        suite: userForm.form.value.userSuiteInput,
        city: userForm.form.value.userCityInput,
        zipcode: userForm.form.value.userZipInput,
        geo: {
          lat: userForm.form.value.userLatInput,
          lng: userForm.form.value.userLngInput,
        },
      },
      phone: userForm.form.value.userPhoneInput,
      website: userForm.form.value.userWebsiteInput,
      company: {
        name: userForm.form.value.userCompanyNameInput,
        catchPhrase: userForm.form.value.userCompanyCatchPhraseInput,
        bs: userForm.form.value.userCompanyBsInput,
      },
    };

    this.store.dispatch(updateUser({ updateUser: USER }));
  }
}
