import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {UserInterface} from "../shared/interfaces/user.interface";
import {AuthService} from "../shared/services/auth.service";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit, OnDestroy {

  @ViewChild('passwordInput') passwordInput: ElementRef | undefined;
  form: UntypedFormGroup | any;
  singUpSub$: Subscription | undefined;
  isDisabled: boolean = true;


  constructor(private authService: AuthService, private route: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();

  }

  initializeForm(): void {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  submit() {
    if (this.form.valid) {
      const user: UserInterface = {
        email: this.form.value.email,
        password: this.form.value.password
      }

      this.singUpSub$ = this.authService.singUp(user)
        .subscribe(
          () => {
            this.route.navigate(['/admin', 'dashboard']);
            this.form.reset();
          }
        );

    }
  }

  changeShowPassword(event: MatCheckboxChange) {
    if (event.checked) {
      this.passwordInput?.nativeElement.setAttribute('type','text');
    } else {
      this.passwordInput?.nativeElement.setAttribute('type','password');
    }
  }

  ngOnDestroy(): void {
    this.singUpSub$?.unsubscribe();
  }
}
