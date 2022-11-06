import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../shared/services/user.service";
import {ResponseEditProfileInterface} from "../../shared/interfaces/responseEditProfile.interface";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  displayName$: Observable<string | null> | undefined;
  userProfile$: Observable<ResponseEditProfileInterface> | undefined;
  form: FormGroup | any;
  isDisabled: boolean = false;

  constructor(private userService: UserService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    this.form = new FormGroup({
      fullName: new FormControl('', Validators.required),
      userPhoto: new FormControl(),
      avatarFile: new FormControl()
    })
  }

  editPhoto() {
    const fileUpload = this.fileUpload?.nativeElement;

    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      const reader = new FileReader();
      console.log(fileUpload.files)

      if (file) {
        reader.readAsDataURL(file);
      }

      reader.onload = () => {
        const img = new Image();

        img.src = reader.result as string;

        img.onload = () => {
          this.form.patchValue({
            userPhoto: reader.result,
            avatarFile: file
          })
        }
      };
    }
  }

  modalClose() {
    this.dialog.closeAll();
  }

  submit() {
    if (this.form.invalid) {
      this.isDisabled = true;
    }
    const userInfo = {
      userPhoto: this.form.value.userPhoto,
      fullName: this.form.value.fullName
    }

    this.userProfile$ = this.userService.updateProfile(userInfo.userPhoto, userInfo.fullName)
      .pipe(
        tap(() => this.modalClose())
      );
  }

}
