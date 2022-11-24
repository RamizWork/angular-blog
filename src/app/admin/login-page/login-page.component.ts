import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {UserInterface} from "../shared/interfaces/user.interface";
import {AuthService} from "../shared/services/auth.service";
import {switchMap, tap} from "rxjs/operators";
import {UserService} from "../shared/services/user.service";
import {ResponseForIdentificatedEmailInterface} from "../shared/interfaces/responseForIdentificatedEmail.interface";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup | any;
  isSubmitted: boolean = false;
  login$: Observable<ResponseForIdentificatedEmailInterface | null> | undefined;

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.form.invalid) {
      this.isSubmitted = true;
    } else {
      const user: UserInterface = {
        email: this.form.value.email,
        password: this.form.value.password,
      };

      this.login$ = this.authService.login(user).pipe(
        switchMap(() => {
          return this.userService.getUserData();
        }),
        tap(() => {
            this.form.reset();
            this.router.navigate(['/admin', 'dashboard']);
            this.isSubmitted = false;
          }
        )
      )
    }
  }
}
