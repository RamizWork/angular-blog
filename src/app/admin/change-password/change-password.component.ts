import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {UserService} from "../shared/services/user.service";

class DialogAnimationsExampleDialog {
}

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  form: FormGroup | any;
  changePassword$: Observable<any> | undefined;

  constructor(private userService: UserService) {
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

  submit() {
    const newPassword = this.form.value.newPassword;

    this.changePassword$ = this.userService.changePassword(newPassword);
  }
}
