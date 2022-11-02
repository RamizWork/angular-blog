import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-user-profile-modal',
  templateUrl: './user-profile-modal.component.html',
  styleUrls: ['./user-profile-modal.component.scss']
})
export class UserProfileModalComponent implements OnInit {
  @ViewChild('fileUpload') fileUpload: ElementRef | undefined;
  displayName$: Observable<string | null> | undefined;
  form: FormGroup | any;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.displayName$ = this.authService.getDisplayName();
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

  submit() {
    console.log(this.form)
  }
}
