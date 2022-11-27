import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UserService} from "../../shared/services/user.service";
import {ResponseEditProfileInterface} from "../../shared/interfaces/responseEditProfile.interface";
import {switchMap, tap} from "rxjs/operators";
import {FireBaseService} from "../../shared/services/fireBase.service";
import {ResponseForIdentificatedEmailInterface} from "../../shared/interfaces/responseForIdentificatedEmail.interface";
import {File} from "@angular/compiler-cli/src/ngtsc/file_system/testing/src/mock_file_system";

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
    @Inject(MAT_DIALOG_DATA) public data: { localId: string, displayName: string, photoUrl: string }
  ) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    const photoUrl = this.data.photoUrl ? this.data.photoUrl : 'assets/user_icon.png';

    this.form = new FormGroup({
      fullName: new FormControl(this.data.displayName, Validators.required),
      userPhoto: new FormControl(photoUrl),
      avatarFile: new FormControl()
    })
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

    this.userProfile$ = this.fireBaseService.upLoadFileToStorage(userInfo.userPhoto).pipe(
      switchMap((photoUrl) => {
        return this.userService.updateProfile(photoUrl, this.form.value.fullName);
      }),
      tap(() =>
        this.modalClose()
      )
    );

  }


}
