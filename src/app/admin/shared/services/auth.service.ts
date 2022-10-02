import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {UserInterface} from "../interfaces/user.interface";
import {Observable} from "rxjs";

@Injectable()

export class AuthService {
  constructor(private http: HttpClient) {
  }

  get token(): string {
    return '';
  }

  login(user: UserInterface): Observable<any> {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.apiKey}`, user)
  }

  logout() {

  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  private setToken() {

  }
}
