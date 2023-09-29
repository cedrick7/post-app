import { Component, OnInit, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-profile-picture-placeholder",
  templateUrl: "./profile-picture-placeholder.component.html",
  styleUrls: ["./profile-picture-placeholder.component.scss"],
})
export class ProfilePicturePlaceholderComponent implements OnInit {
  private PROFILE_PICTURE_PLACEHOLDER: string = "assets/img/profilePicturePlaceholder.svg";

  @Input()
  public set profilePicturePlaceholder(filepath: string) {
    this.PROFILE_PICTURE_PLACEHOLDER;
  }

  ngOnInit(): void {}
}
