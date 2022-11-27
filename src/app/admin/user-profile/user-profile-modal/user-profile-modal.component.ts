import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {switchMap, tap} from "rxjs/operators";

import {UserService} from "../../shared/services/user.service";
import {ResponseEditProfileInterface} from "../../shared/interfaces/responseEditProfile.interface";
import {FireBaseService} from "../../shared/services/fireBase.service";

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  userProfile$: Observable<ResponseEditProfileInterface> | undefined;
  form: FormGroup | any;
  isDisabled: boolean = false;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private fireBaseService: FireBaseService,
    @Inject(MAT_DIALOG_DATA) public data: { userEmail: string, displayName: string, photoUrl: string }
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    const photoUrl = this.data.photoUrl ? this.data.photoUrl : 'assets/user_icon.png';

    this.form = new FormGroup({
      fullName: new FormControl(this.data.displayName, Validators.required),
      userPhoto: new FormControl(''),
      avatarFile: new FormControl()
    })
    this.form.patchValue({userPhoto: photoUrl});
  }

  editPhoto() {
    const fileUpload = this.fileUpload?.nativeElement;

    fileUpload.onchange = () => {
      const file = fileUpload.files[0];
      const reader = new FileReader();

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
      userPhoto: this.form.value.avatarFile,
      fullName: this.form.value.fullName,
      photoUrl: this.form.value.photoUrl
    }

    if (userInfo.userPhoto) {
      this.userProfile$ = this.fireBaseService.upLoadFileToStorage(userInfo.userPhoto).pipe(
        switchMap((photoUrl) => {
          return this.userService.updateProfile(photoUrl, this.form.value.fullName);
        }),
        tap(() => this.modalClose())
      );
    } else {
      this.userProfile$ = this.userService.updateProfile(userInfo.photoUrl, this.form.value.fullName)
        .pipe(
          tap(() => this.modalClose())
        );
    }
  }

}
