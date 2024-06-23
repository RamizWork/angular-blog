import {Component, Input} from '@angular/core';
import {PostInterface} from "../../../admin/shared/interfaces/post.interface";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: PostInterface | any;
}
