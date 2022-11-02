import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {AuthService} from "../admin/shared/services/auth.service";
import {ResponseForIdentificatedEmailInterface} from "../admin/shared/interfaces/responseForIdentificatedEmail.interface";

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

}
