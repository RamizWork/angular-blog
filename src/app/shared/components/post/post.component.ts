import {Component, Input, OnInit} from '@angular/core';
import {PostInterface} from "../../../admin/shared/interfaces/post.interface";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() post: PostInterface | any;

  constructor() { }

  ngOnInit(): void {
  }

}
