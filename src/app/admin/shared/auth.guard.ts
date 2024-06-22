import {Injectable} from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import {Observable} from "rxjs";
import {ToastrService} from "ngx-toastr";

import {AuthService} from "./services/auth.service";

@Injectable()
export class AuthGuard  {

  constructor(private authService: AuthService, private router: Router, private toaster: ToastrService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = this.authService.getIsAuthenticated().getValue();

    if (isAuthenticated) {
      return true;
    } else {
      this.authService.logout();
      this.toaster.error('You need to log in');
      this.router.navigate(['/admin', 'login'], {
        queryParams: {
          loginAgain: true
        }
      });
      return false;
    }
  }
}
