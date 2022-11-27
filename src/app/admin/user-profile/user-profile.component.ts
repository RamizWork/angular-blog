import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {UserProfileModalComponent} from "./user-profile-modal/user-profile-modal.component";
import {UserService} from "../shared/services/user.service";
import {AuthService} from "../shared/services/auth.service";
import {ProfileDataInterface} from "../shared/interfaces/profileData.intarface";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit {

  @ViewChild('imgProfile') img!: ElementRef;
  profileData$: Observable<ProfileDataInterface | null> | undefined;
  userEmail: any;
  displayName: any;
  photoUrl: any;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.profileData$ = this.authService.getProfileData()
      .pipe(
        tap(value => {
            this.userEmail = value?.userEmail;
            this.displayName = value?.displayName;
            this.photoUrl = value?.photoUrl;
          }
        )
      );
  }

  editProfile() {
    this.dialog.open(UserProfileModalComponent, {
      data: {
        userEmail: this.userEmail,
        displayName: this.displayName,
        photoUrl: this.photoUrl
      },
      panelClass: 'user__profile_container'
    });
  }
}
