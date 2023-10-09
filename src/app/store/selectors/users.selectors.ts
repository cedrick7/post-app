import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState, usersKey } from "../reducers/users.reducers";

export const usersState = createFeatureSelector<UsersState>(usersKey);

export const getUsers = createSelector(usersState, (state: UsersState) => state?.users);

export const getSelectedUser = createSelector(
  usersState,
  (state: UsersState) => state?.selectedUser
);

export const getSelectedUserId = createSelector(
  usersState,
  (state: UsersState) => state?.selectedUserId
);

export const getUpdatedUser = createSelector(usersState, (state: UsersState) => state?.updatedUser);
