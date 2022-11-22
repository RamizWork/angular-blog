import {Component, OnInit} from '@angular/core';
import {AuthService} from "./admin/shared/services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

import {ResponseForIdentificatedEmailInterface} from "./admin/shared/interfaces/responseForIdentificatedEmail.interface";
import {UserService} from "./admin/shared/services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  userData$: Observable<ResponseForIdentificatedEmailInterface | null> | undefined;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit() {
    this.isAuthenticated();
    this.userData$ = this.userService.getUserData();
  }

  isAuthenticated() {
    let fbExpToken: string | null | undefined | Date = localStorage.getItem('fb-exp-token');
    if (fbExpToken) {
      fbExpToken = new Date(fbExpToken);
      let second = (((((fbExpToken.getTime())) - Date.now()) / 1000) / 60);

      if (Date.now() > +fbExpToken) {
        localStorage.clear();
        this.authService.logout();
        this.router.navigate(['']);
        this.authService.setIsAuthenticatedStatus(false);
      } else {
        this.authService.setIsAuthenticatedStatus(true);
      }
    }
  }


}
