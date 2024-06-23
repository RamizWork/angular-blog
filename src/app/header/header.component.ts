import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";

import {ChangePasswordComponent} from "../admin/change-password/change-password.component";
import {AuthService} from "../admin/shared/services/auth.service";
import {ProfileDataInterface} from "../admin/shared/interfaces/profileData.intarface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  profileInfo$: Observable<ProfileDataInterface | null> | undefined
  isAuthenticated$: Observable<boolean> | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.profileInfo$ = this.authService.getProfileData();
    this.isAuthenticated$ = this.authService.getIsAuthenticated().asObservable();
  }

  openChangePasswordModal() {
    this.dialog.open(ChangePasswordComponent);
  }

  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
