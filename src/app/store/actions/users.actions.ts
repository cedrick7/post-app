import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.model";

// GET
export const loadUsers = createAction(
  "[Users] load users",
  props<{ userId?: number | undefined }>()
);
export const usersLoaded = createAction("[Users] users loaded", props<{ users: User[] }>());

// export const loadUsersByUserId = createAction(
//   "[Users] load users by userId",
//   props<{ userId: number }>()
// );
// export const usersByUserIdLoaded = createAction(
//   "[Users] users by userId loaded",
//   props<{ users: User[] }>()
// );

// FOR CACHING IN STORE
export const selectUser = createAction("[Users] select user", props<{ user: User }>());
export const userSelected = createAction("[Users] user selected", props<{ user: User }>());

export const selectUserId = createAction("[Users] select userId", props<{ userId: number }>());
export const userIdSelected = createAction("[Users] userId selected", props<{ userId: number }>());

// UPDATE
export const updateUser = createAction("[Users] update user", props<{ updateUser: User }>());
export const userUpdated = createAction("[Users] user updated", props<{ user: User }>());
