import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../admin/shared/services/auth.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuthenticated$: Observable<boolean> | undefined;
  isAuthenticated: boolean = false;
  userInfo$: Observable<string | null> | undefined;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.userInfo$ = this.authService.getUserInfo()

    this.isAuthenticated$ = this.authService.getIsAuthenticated().asObservable().pipe(
      tap((value) => {
        setTimeout(() => {
          this.isAuthenticated = value;
        }, 0)
      })
    );
  }



  logout(event: Event) {
    event.preventDefault();
    this.authService.logout();
    this.router.navigate(['/admin', 'login']);
  }
}
