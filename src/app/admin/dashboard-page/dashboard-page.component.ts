import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {PostInterface} from "../shared/interfaces/post.interface";
import {Observable, Subscription} from "rxjs";

import {ToastrService} from "ngx-toastr";
import {UserService} from "../../shared/user.service";
import {ResponseForIdentificatedEmailInterface} from "../shared/interfaces/responseForIdentificatedEmail.interface";
import {AuthService} from "../shared/services/auth.service";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: PostInterface[] = []
  pSub$: Subscription | undefined;
  deleteSub$: Subscription | undefined;
  searchPost: string = '';
  userEmail$: Observable<string | null> | undefined;

  constructor(private postService: PostService, private toastrService: ToastrService, private userService: UserService, private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail$ = this.authService.getUserInfo();
    this.postService.getAllPosts().subscribe(
      (posts) => {
        this.posts = posts
      }
    )
  }

  remove(id: string | undefined) {
    this.deleteSub$ = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.toastrService.success('Post delete');
    })

  }

  ngOnDestroy(): void {
    if (this.pSub$) {
      this.pSub$
    }
    if (this.deleteSub$) {
      this.pSub$
    }
  }

}
