import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../../shared/user.service";
import {Observable} from "rxjs";
import {ResponseForIdentificatedEmailInterface} from "../shared/interfaces/responseForIdentificatedEmail.interface";
import {MatDialog} from "@angular/material/dialog";
import {UserProfileModalComponent} from "./user-profile-modal/user-profile-modal.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit {

  @ViewChild('imgProfile') img!: ElementRef;
  userDataProfile$: Observable<ResponseForIdentificatedEmailInterface> | undefined;
  displayName$: Observable<string | null> | undefined;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.userDataProfile$ = this.userService.getUserData();
    this.displayName$ = this.authService.getDisplayName();
  }

  editProfile() {
    this.dialog.open(UserProfileModalComponent);
  }
}
