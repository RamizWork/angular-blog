import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {Observable, Subscription} from "rxjs";

import {PostInterface} from "../shared/interfaces/post.interface";
import {AuthService} from "../shared/services/auth.service";
import {UserService} from "../shared/services/user.service";
import {PostService} from "../shared/services/post.service";
import {UserDataInterface} from "../shared/interfaces/userDataInterface";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: PostInterface[] = []
  deleteSub$: Subscription | undefined;
  searchPost: string = '';
  userEmail$: Observable<UserDataInterface | null> | undefined;
  getAllPosts$: Subscription | undefined;


  constructor(private postService: PostService, private toastrService: ToastrService, private userService: UserService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.initializeFireBaseCloud();
    this.userEmail$ = this.authService.getProfileData();
    this.getAllPosts$ = this.postService.getAllPosts().subscribe(
      (posts) => {
        this.posts = posts
      }
    )
  }

  initializeFireBaseCloud() {

  }

  remove(id: string | undefined) {
    this.deleteSub$ = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.toastrService.success('Post delete');
    })

  }

  ngOnDestroy(): void {
    this.deleteSub$?.unsubscribe();
    this.getAllPosts$?.unsubscribe();
  }

}
