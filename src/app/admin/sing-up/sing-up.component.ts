import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

import {UserInterface} from "../shared/interfaces/user.interface";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  form: FormGroup | any;
  singUpSub$: Subscription = new Subscription();
  isDisabled: boolean = true;


  constructor(private authService: AuthService, private route: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();

  }

  initializeForm(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
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

}
