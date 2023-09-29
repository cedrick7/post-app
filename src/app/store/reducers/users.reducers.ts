import { createReducer, on } from "@ngrx/store";
import * as UsersActions from "../actions/users.actions";
import { User } from "src/app/models/user.model";

export const usersKey = "users";

export interface UsersState {
  users: User[];
  selectedUser: User | undefined;
  selectedUserId: number | undefined;
  updatedUser: User | undefined;
}

export const initialState: UsersState = {
  users: [],
  // selectedUser: {
  //   id: 1,
  //   name: "initial name",
  //   username: "initial username",
  //   email: "initial email",
  //   address: {
  //     street: "initial street",
  //     suite: "initial suite",
  //     city: "initial city",
  //     zipcode: "initial zipcode",
  //     geo: {
  //       lat: "initial lat",
  //       lng: "initial lng",
  //     },
  //   },
  //   phone: "initial phone",
  //   website: "initial website",
  //   company: {
  //     name: "initial name",
  //     catchPhrase: "initial catchPhrase",
  //     bs: "initial bs",
  //   },
  // },
  selectedUser: undefined,
  selectedUserId: undefined,
  updatedUser: undefined,
};

export const UsersReducer = createReducer(
  initialState,

  // GET
  on(UsersActions.usersLoaded, (state, { users }) => ({
    ...state,
    users: users,
  })),

  // FOR CACHING IN STORE
  on(UsersActions.userSelected, (state, { user }) => ({
    ...state,
    selectedUser: user,
  })),
  on(UsersActions.userIdSelected, (state, { userId }) => ({
    ...state,
    selectedUserId: userId,
  })),

  // UPDATE
  on(UsersActions.userUpdated, (state, action) => ({
    ...state,
    users: state?.users.map((eachUser) => {
      if (eachUser.id == action.user.id) {
        return action.user;
      }
      return eachUser;
    }),
  }))
);
