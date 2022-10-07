import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {PostService} from "../shared/post.service";
import {Observable} from "rxjs";
import {PostInterface} from "../admin/shared/interfaces/post.interface";
import {switchMap} from "rxjs/operators";

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
