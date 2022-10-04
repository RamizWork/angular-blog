import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserInterface} from "../shared/interfaces/user.interface";
import {AuthService} from "../shared/services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subject} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup | any;
  isSubmitted: boolean = false;
  errors$: Subject<string> = new Subject<string>();
  message: string | undefined;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      if (params['loginAgain']) {
        this.message = 'Пожалуйста авторизируйтесь.';
      }
    })
    this.initialize();
    this.errors$ = this.authService.errors$;
  }

  get f() {
    return this.form;
  }

  initialize() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    } else {
      this.isSubmitted = true;

      const user: UserInterface = {
        email: this.form.value.email,
        password: this.form.value.password,
      }

      this.authService.login(user).subscribe(() => {
        this.form.reset();
        this.router.navigate(['/admin', 'dashboard']);
        this.isSubmitted = false;
      }, error => {
        this.isSubmitted = false;
      })
    }
  }

}
