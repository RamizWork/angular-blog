import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {ResponseForIdentificatedEmailInterface} from "../interfaces/responseForIdentificatedEmail.interface";
import {AuthService} from "./auth.service";
import {environment} from "../../../../environments/environment";
import {ProfileDataInterface} from "../interfaces/profileData.intarface";
import {ResponseEditProfileInterface} from "../interfaces/responseEditProfile.interface";

@Injectable()
export class UserService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  public getUserData(): Observable<ResponseForIdentificatedEmailInterface> {
    const idToken: string | null = localStorage.getItem('id-token');

    return this.http.post<ResponseForIdentificatedEmailInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${environment.apiKey}`, {idToken})
      .pipe(
        tap(value => {
          const userData: ProfileDataInterface = {
            displayName: value.users[0].displayName,
            photoUrl: value.users[0].photoUrl,
            userEmail: value.users[0].email
          }
          this.authService.setProfileData(userData);
        })
      )
  }

  public updateProfile(userPhotoUrl: string, fullName: string): Observable<ResponseEditProfileInterface> {
    const idToken: string | null = localStorage.getItem('id-token');
    const data = {
      photoUrl: userPhotoUrl,
      displayName: fullName,
      returnSecureToken: true,
      idToken: idToken
    }

    return this.http.post<ResponseEditProfileInterface>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, data)
      .pipe(
        tap((value) => {
          const profileData: ProfileDataInterface = {
            displayName: value.displayName,
            photoUrl: value.photoUrl,
            userEmail: value.email
          }
          this.authService.setProfileData(profileData);
        })
      );
  }

  public changePassword(newPassword: string): Observable<any> {
    const idToken: string | null = localStorage.getItem('id-token');
    const data = {
      idToken: idToken,
      returnSecureToken: true,
      password: newPassword
    }

    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=${environment.apiKey}`, data);
  }
}
