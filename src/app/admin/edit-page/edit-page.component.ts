import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {switchMap} from "rxjs/operators";

import {PostInterface} from "../shared/interfaces/post.interface";
import {PostService} from "../shared/services/post.service";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

  form: FormGroup | any;
  post: PostInterface | undefined;
  updateSubscription$: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params: Params) => {
        return this.postService.getPostId([params['id']])
      })
    ).subscribe((post: PostInterface) => {
      this.post = post;
      this.form = new FormGroup({
        title: new FormControl(post.title, Validators.required),
        text: new FormControl(post.text, Validators.required)
      });
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.updateSubscription$ = this.postService.updatePost({
      id: this.post?.id,
      text: this.form.value.text,
      title: this.form.value.title,
      date: new Date()
    }).subscribe(() => {
      this.toastrService.success('Post changed');
      this.router.navigate(['/admin/dashboard']);
    })
  }

  ngOnDestroy(): void {
    if (this.updateSubscription$) {
      this.updateSubscription$?.unsubscribe();
    }
  }

}
