import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError} from "rxjs/operators";
import {Observable, throwError} from "rxjs";

import {AuthService} from "./services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
            console.log(['interceptor error']);
            if (error.status === 401) {
              this.authService.logout();
              this.router.navigate(['/admin', 'login'], {
                queryParams: {
                  authFailed: true
                }
              })
            }
            return throwError(error);
          }
        )
      )
  }
}
