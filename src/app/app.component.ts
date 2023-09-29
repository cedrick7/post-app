import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { loadUsers, selectUser, selectUserId } from "./store/actions/users.actions";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  heading = "Dashboad";

  constructor(private http: HttpClient, private store: Store<{}>) {
    this.store.dispatch(selectUserId({ userId: 1 }));
    // this.store.dispatch(
    //   selectUser({
    //     user: {
    //       id: 1,
    //       name: "Leanne Graham",
    //       username: "Bret",
    //       email: "Sincere@april.biz",
    //       address: {
    //         street: "Kulas Light",
    //         suite: "Apt. 556",
    //         city: "Gwenborough",
    //         zipcode: "92998-3874",
    //         geo: {
    //           lat: "-37.3159",
    //           lng: "81.1496",
    //         },
    //       },
    //       phone: "1-770-736-8031 x56442",
    //       website: "hildegard.org",
    //       company: {
    //         name: "Romaguera-Crona",
    //         catchPhrase: "Multi-layered client-server neural-net",
    //         bs: "harness real-time e-markets",
    //       },
    //     },
    //   })
    // );
  }
}
