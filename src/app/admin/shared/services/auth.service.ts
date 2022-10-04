import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";

import {FireBaseAuthResponse} from "../interfaces/fireBaseAuthResponse";
import {environment} from "../../../../environments/environment";
import {UserInterface} from "../interfaces/user.interface";

@Injectable()
export class AuthService {

  public errors$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  get token(): string | null {
    const fbExpToken: undefined | string | null = localStorage.getItem('fb-exp-token');

    if (!!fbExpToken && Date.now() > +fbExpToken) {
      this.logout();
      return null;
    }

    return localStorage.getItem('fb-token');
  }

  login(user: UserInterface): Observable<FireBaseAuthResponse | null> {
    user.returnSecureToken = true;
    return this.http.post<FireBaseAuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
      .pipe(
        tap(AuthService.setToken),
        catchError(this.handleError.bind(this))
      )
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    const {message} = error.error.error;

    switch (message) {
      case 'INVALID_EMAIL':
        this.errors$.next('Неверный email');
        break;
      case 'INVALID_PASSWORD':
        this.errors$.next('Неверный пароль');
        break;
      case 'EMAIL_NOT_FOUND':
        this.errors$.next('Email не найден');
        break;
    }
    return throwError(error);
  }

  isAuthenticated(): boolean {
    return !!this.token;
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

  logout() {
    AuthService.setToken(null);
  }
}
