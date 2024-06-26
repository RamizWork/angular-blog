import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

import {UserInterface} from "../shared/interfaces/user.interface";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";
import {ResponseForIdentificatedEmailInterface} from "../shared/interfaces/responseForIdentificatedEmail.interface";
import { MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;
  form: UntypedFormGroup | any;
  isSubmitted: boolean = false;
  login$: Observable<ResponseForIdentificatedEmailInterface | null> | undefined;


  constructor(private authService: AuthService, private router: Router, private userService: UserService) {
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)]),
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

  changeShowPassword(event: MatCheckboxChange) {
    if (event.checked) {
      this.passwordInput?.nativeElement.setAttribute('type','text');
    } else {
      this.passwordInput?.nativeElement.setAttribute('type','password');
    }
  }
}
