import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardPageComponent } from "./pages/dashboard/dashboard-page/dashboard-page.component";

import { PostPageComponent } from "./pages/post/post-page/post-page.component";
import { PostEditPageComponent } from "./pages/post-edit/post-edit-page/post-edit-page.component";
import { UserPageComponent } from "./pages/user/user-page/user-page.component";
import { UserEditPageComponent } from "./pages/user-edit/user-edit-page/user-edit-page.component";
import { FriendsListPageComponent } from "./pages/friends-list/friends-list-page/friends-list-page.component";

const routes: Routes = [
  // dashboard (see all users, all posts)
  { path: "", component: DashboardPageComponent },
  // post (see the post, all comments for this post)
  { path: "post/:id", component: PostPageComponent },
  // post edit (edit the post data)
  { path: "post/:id/edit", component: PostEditPageComponent },
  // user (see the user, all posts for this user)
  { path: "user/:id", component: UserPageComponent },
  // user edit (edit the user data)
  { path: "user/:id/edit", component: UserEditPageComponent },
  // friends-list (see all users but not the first user)
  { path: "friends-list", component: FriendsListPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
