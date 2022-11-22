import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {UserService} from "../shared/services/user.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup | any;
  changePassword$: Observable<any> | undefined;

  constructor(
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
    private dialog: MatDialog,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.formInitialize();
  }

  formInitialize() {
    this.form = new FormGroup({
        newPassword: new FormControl('', Validators.required)
      }
    )
  }

  modalClose() {
    this.dialog.closeAll();
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    const newPassword = this.form.value.newPassword;

    this.changePassword$ = this.userService.changePassword(newPassword).pipe(
      tap(() => {
          this.form.reset();
          this.modalClose();
          this.toastrService.success('Password changed');
          this.toastrService.error('Login again');
          this.router.navigate(['/admin/login']);
          this.authService.logout();
        }
      )
    );

  }
}
