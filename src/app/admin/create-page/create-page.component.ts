import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";

import {AuthService} from "../shared/services/auth.service";
import {PostService} from "../shared/services/post.service";
import {PostInterface} from "../shared/interfaces/post.interface";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {

  form: FormGroup | any;
  createPost$: Observable<any> | undefined;

  constructor(
    private postsService: PostService,
    private toastrService: ToastrService,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.initialize();
  }

  initialize() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    const userData = this.authService.getProfileData().getValue();
    const post: PostInterface = {
      title: this.form.value.title,
      text: this.form.value.text,
      author: this.form.value.author,
      date: new Date(),
      emailOwner: userData?.userEmail ? userData.userEmail : ''
    }
    this.createPost$ = this.postsService.create(post).pipe(
      tap(() => {
        this.form.reset();
        this.router.navigate(['/admin/dashboard']);
        this.toastrService.success('Post created');
      })
    )
  }

}
