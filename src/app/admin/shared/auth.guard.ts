import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./services/auth.service";
import {ToastrService} from "ngx-toastr";

@Injectable()
export class AuthGuard implements CanActivate {

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
