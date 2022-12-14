import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";

import {PostInterface} from "../admin/shared/interfaces/post.interface";
import {PostService} from "../admin/shared/services/post.service";

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  post$: Observable<PostInterface> | undefined

  constructor(private route: ActivatedRoute, private postService: PostService) {
  }

  ngOnInit(): void {
    this.post$ = this.route.params
      .pipe(
        switchMap((params: Params): Observable<PostInterface> => {
            return this.postService.getPostId(params['id']);
          }
        )
      )
  }

}
