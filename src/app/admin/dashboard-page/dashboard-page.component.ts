import {Component, OnDestroy, OnInit} from '@angular/core';
import {PostService} from "../../shared/post.service";
import {PostInterface} from "../shared/interfaces/post.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: PostInterface[] = []
  pSub$: Subscription | undefined;
  searchPost: string = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (posts) => {
        this.posts = posts
      }
    )
  }

  remove(id: string | undefined) {

  }

  ngOnDestroy(): void {
    if (this.pSub$) {
      this.pSub$
    }
  }

}
