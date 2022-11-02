import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {UserInterface} from "../shared/interfaces/user.interface";
import {AuthService} from "../shared/services/auth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup | any;
  isSubmitted: boolean = false;
  errors$: Subject<string> = new Subject<string>();
  message: string | undefined;
  routeSub$: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) {
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

      this.authService.login(user)
        .subscribe(
          () => {
            this.form.reset();
            this.router.navigate(['/admin', 'dashboard']);
            this.isSubmitted = false;
          }
        );
    }
  }

  ngOnDestroy(): void {
    this.routeSub$?.unsubscribe();
  }
}
