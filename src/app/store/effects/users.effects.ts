import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, tap } from "rxjs";

import * as UsersActions from "../actions/users.actions";
import { UsersService } from "src/app/services/users.service";

@Injectable()
export class UsersEffects {
  constructor(private userActions$: Actions, private usersService: UsersService) {}

  // GET
  loadUsers$ = createEffect(() =>
    this.userActions$.pipe(
      ofType(UsersActions.loadUsers),
      switchMap((action) => {
        if (!!action.userId || !(action.userId == undefined)) {
          return this.usersService.getUserByUserIdAsArray(action.userId).pipe(
            switchMap((users) => [
              UsersActions.usersLoaded({
                users: users,
              }),
            ])
          );
        }
        return this.usersService.getUsers().pipe(
          switchMap((users) => [
            UsersActions.usersLoaded({
              users: users,
            }),
          ])
        );
      })
    )
  );

  // loadUsersById$ = createEffect(() =>
  //   this.userActions$.pipe(
  //     ofType(UsersActions.loadUsersByUserId),
  //     switchMap((_action) => {
  //       return this.usersService.getUserByUserIdAsArray(_action.userId).pipe(
  //         tap((data) => console.warn(data)),
  //         switchMap((users) => [
  //           UsersActions.usersByUserIdLoaded({
  //             users: users,
  //           }),
  //         ])
  //       );
  //     })
  //   )
  // );

  // FOR CACHING IN STORE
  selectUser$ = createEffect(() =>
    this.userActions$.pipe(
      ofType(UsersActions.selectUser),
      map((action) => {
        return UsersActions.userSelected({
          user: action.user,
        });
      })
    )
  );

  selectUserId$ = createEffect(() =>
    this.userActions$.pipe(
      ofType(UsersActions.selectUserId),
      map((action) => {
        return UsersActions.userIdSelected({
          userId: action.userId,
        });
      })
    )
  );

  // UPDATE
  updateUser$ = createEffect(() =>
    this.userActions$.pipe(
      ofType(UsersActions.updateUser),
      switchMap((action) => {
        return this.usersService.updateUser(action.updateUser).pipe(
          tap((data) => console.warn(data)),
          switchMap((user) => [
            UsersActions.userUpdated({
              user: user,
            }),
          ])
        );
      })
    )
  );
}
