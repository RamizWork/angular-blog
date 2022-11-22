import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";

import {FireBaseAuthResponse} from "../interfaces/fireBaseAuthResponse";
import {environment} from "../../../../environments/environment";
import {UserInterface} from "../interfaces/user.interface";
import {FireBaseSingUpResponseInterface} from "../interfaces/fireBaseSingUpResponse.interface";
import {ProfileDataInterface} from "../interfaces/profileData.intarface";
import {UserDataInterface} from "../interfaces/userDataInterface";
import {UserService} from "./user.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  private isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private profileData$: BehaviorSubject<ProfileDataInterface | null> = new BehaviorSubject<ProfileDataInterface | null>(null);

  constructor(private http: HttpClient, private toastrService: ToastrService) {
  }

  get token(): any {
    const fbExpToken: undefined | string | null = localStorage.getItem('fb-exp-token');

    if (!!fbExpToken && Date.now() > +fbExpToken) {
      this.logout();
      this.isAuthenticated$.next(false);
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  singUp(user: UserInterface): Observable<FireBaseAuthResponse | unknown> {
    user.returnSecureToken = true;
    return this.http.post<FireBaseAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
      .pipe(
        tap(value => {
          const userData: UserDataInterface = {
            userEmail: value.email,
            displayName: value.displayName,
            photoUrl: value.photoUrl
          }
          AuthService.setSingUpToken(value);
          this.isAuthenticated$.next(true);
          this.profileData$.next(userData);
          localStorage.setItem('id-token', <string>value.idToken);
        }),
        catchError(this.handleErrorForSingUp.bind(this))
      )
  }

  handleErrorForSingUp(error: HttpErrorResponse): any {
    const message = error.error.error.message;

    switch (message) {
      case "INVALID_EMAIL":
        this.toastrService.error('Invalid email');
        break;
      case "EMAIL_EXISTS":
        this.toastrService.error('Email exists');
        break;
      case "OPERATION_NOT_ALLOWED":
        this.toastrService.error('Operation not allowed');
        break;
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        this.toastrService.error('To many attempts try later ');
        break;
    }
    return throwError(message);
  }

  login(user: UserInterface): Observable<FireBaseAuthResponse | null> {
    user.returnSecureToken = true;
    return this.http.post<FireBaseAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap((value) => {
          const userData: UserDataInterface = {
            userEmail: value.email,
            displayName: value.displayName,
            photoUrl: value.photoUrl
          }
          AuthService.setToken(value);
          this.isAuthenticated$.next(true);
          this.profileData$.next(userData);
          localStorage.setItem('id-token', <string>value.idToken);
        }),
        catchError(this.loginHandleError.bind(this))
      )
  }

  loginHandleError(error: HttpErrorResponse): Observable<any> {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.toastrService.error('Invalid email');
        break;
      case 'INVALID_PASSWORD':
        this.toastrService.error('Invalid password');
        break;
      case 'EMAIL_NOT_FOUND':
        this.toastrService.error('Email not found');
        break;
    }
    return throwError(error);
  }

  setProfileData(data: ProfileDataInterface) {
    return this.profileData$.next(data)
  }

  getProfileData(): BehaviorSubject<ProfileDataInterface | null> {
    return this.profileData$;
  }

  getIsAuthenticated(): BehaviorSubject<boolean> {
    return this.isAuthenticated$;
  }

  logout() {
    AuthService.setToken(null);
    this.setIsAuthenticatedStatus(false);
  }

  setIsAuthenticatedStatus(status: boolean): void {
    this.isAuthenticated$.next(status);
  }

  private static setSingUpToken(response: FireBaseSingUpResponseInterface) {
    if (response) {
      const expTimeToken = new Date(Date.now() + +<string>response.expiresIn * 1000);

      localStorage.setItem('fb-token', <string>response.idToken);
      localStorage.setItem('fb-exp-token', expTimeToken.toString());
    } else {
      localStorage.clear();
    }
  }

  private static setToken(response: FireBaseAuthResponse | null) {
    if (response) {
      const expTimeToken = new Date(Date.now() + +<string>response.expiresIn * 1000);

      localStorage.setItem('fb-token', <string>response.idToken);
      localStorage.setItem('fb-exp-token', expTimeToken.toString());
    } else {
      localStorage.clear();
    }
  }

}
