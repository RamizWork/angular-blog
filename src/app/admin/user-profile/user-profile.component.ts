import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";

import {ResponseForIdentificatedEmailInterface} from "../shared/interfaces/responseForIdentificatedEmail.interface";
import {UserProfileModalComponent} from "./user-profile-modal/user-profile-modal.component";
import {UserService} from "../shared/services/user.service";
import {AuthService} from "../shared/services/auth.service";
import {ProfileDataInterface} from "../shared/interfaces/profileData.intarface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [UserService]
})
export class UserProfileComponent implements OnInit {

  @ViewChild('imgProfile') img!: ElementRef;
  loadProfileData$: Observable<ResponseForIdentificatedEmailInterface | null> | undefined;
  profileData$: Observable<ProfileDataInterface | null> | undefined;
  localId: any;
  displayName: any;


  constructor(
    private authService: AuthService,
    private userService: UserService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {

    this.loadProfileData$ = this.userService.getUserData()
      .pipe(
        tap(value => {
            this.localId = value?.users[0].localId;
            this.displayName = value?.users[0].displayName;
          }
        )
      );
    this.profileData$ = this.authService.getProfileData();
  }

  editProfile() {
    this.dialog.open(UserProfileModalComponent, {
      data: {
        localId: this.localId,
        displayName: this.displayName
      },
      panelClass: 'user__profile_container'
    });
  }
}
