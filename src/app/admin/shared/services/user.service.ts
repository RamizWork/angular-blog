import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {ResponseForIdentificatedEmailInterface} from "../interfaces/responseForIdentificatedEmail.interface";
import {AuthService} from "./auth.service";
import {environment} from "../../../../environments/environment";
import {ResponseEditProfileInterface} from "../interfaces/responseEditProfile.interface";


@Injectable()
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUserData(): Observable<ResponseForIdentificatedEmailInterface> {
    const idToken: string | null = localStorage.getItem('id-token');
    const userInfo$ = this.authService.getUserInfo();

    return this.http.post<ResponseForIdentificatedEmailInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`, {idToken})
      .pipe(
        tap(value => {
          const email: string = value.users[0].email;
          userInfo$.next(email);
        })
      )
  }

  updateProfile(userPhoto: any, fullName: string): Observable<ResponseEditProfileInterface> {
    const formData = new FormData();
    const idToken: string | null = localStorage.getItem('id-token');
    formData.append('photoUrl', userPhoto);
    formData.append('displayName', fullName);
    formData.append('returnSecureToken', JSON.stringify(true));
    formData.append('idToken', JSON.stringify(idToken));
    return this.http.post<ResponseEditProfileInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, formData,
      {

      });
  }

  changePassword(newPassword: any): Observable<any> {
    const formData = new FormData();
    const idToken: string | null = localStorage.getItem('id-token');

    formData.append('returnSecureToken', JSON.stringify(true));
    formData.append('idToken', JSON.stringify(idToken));
    formData.append('password', JSON.stringify(newPassword));
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, formData);
  }

}
