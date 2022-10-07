import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {PostInterface} from "../shared/interfaces/post.interface";
import {Subscription} from "rxjs";
import {AlertService} from "../shared/services/alert.service";

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

  constructor(private postService: PostService, private alertService: AlertService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (posts) => {
        this.posts = posts
      }
    )
  }

  remove(id: string | undefined) {
    this.deleteSub$ = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.danger('Пост успешно уален');
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
