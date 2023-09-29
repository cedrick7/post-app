import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UsersListComponent } from "./components/users-list/users-list.component";
import { PostsListComponent } from "./components/posts-list/posts-list.component";
import { WriteCommentComponent } from "./components/write-comment/write-comment.component";
import { CommentsListComponent } from "./components/comments-list/comments-list.component";
import { ProfilePicturePlaceholderComponent } from "./components/profile-picture-placeholder/profile-picture-placeholder.component";
import { PostDetailComponent } from "./components/post-detail/post-detail.component";
import { PostDetailEditComponent } from "./components/post-detail-edit/post-detail-edit.component";
import { MyInformationComponent } from "./components/my-information/my-information.component";
import { HeaderComponent } from "./components/header/header.component";
import { MeInformationComponent } from "./components/me-information/me-information.component";
import { DashboardPageComponent } from "./pages/dashboard/dashboard-page/dashboard-page.component";
import { PostPageComponent } from "./pages/post/post-page/post-page.component";
import { PostEditPageComponent } from "./pages/post-edit/post-edit-page/post-edit-page.component";
import { UserPageComponent } from "./pages/user/user-page/user-page.component";
import { UserEditPageComponent } from "./pages/user-edit/user-edit-page/user-edit-page.component";
import { WritePostComponent } from "./components/write-post/write-post.component";
import { UserDetailEditComponent } from "./components/user-detail-edit/user-detail-edit.component";
import { FriendsListPageComponent } from "./pages/friends-list/friends-list-page/friends-list-page.component";
import { FriendsListComponent } from "./components/friends-list/friends-list.component";

import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { UserDetailComponent } from "./components/user-detail/user-detail.component";
import { UsersReducer, usersKey } from "./store/reducers/users.reducers";
import { UsersEffects } from "./store/effects/users.effects";
import { EffectsModule } from "@ngrx/effects";
import { PostsEffects } from "./store/effects/posts.effects";
import { CommentsEffects } from "./store/effects/comments.effects";
import { PostsReducer, postsKey } from "./store/reducers/posts.reducers";
import { CommentsReducer, commentsKey } from "./store/reducers/comments.reducers";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    PostsListComponent,
    WriteCommentComponent,
    CommentsListComponent,
    ProfilePicturePlaceholderComponent,
    PostDetailComponent,
    PostDetailEditComponent,
    MyInformationComponent,
    HeaderComponent,
    MeInformationComponent,
    DashboardPageComponent,
    PostPageComponent,
    PostEditPageComponent,
    UserPageComponent,
    UserEditPageComponent,
    WritePostComponent,
    UserDetailEditComponent,
    FriendsListPageComponent,
    FriendsListComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({
      [usersKey]: UsersReducer,
      [postsKey]: PostsReducer,
      [commentsKey]: CommentsReducer,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 50, logOnly: false }),
    EffectsModule.forRoot([UsersEffects, PostsEffects, CommentsEffects]),
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
