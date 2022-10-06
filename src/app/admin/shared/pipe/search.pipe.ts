import {Pipe, PipeTransform} from "@angular/core";
import {PostInterface} from "../interfaces/post.interface";

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {
  transform(posts: PostInterface[], searchPost = ''): PostInterface[] | undefined {
    if (!searchPost.trim()) {
      return posts;
    }
    return posts!.filter((post: PostInterface) => {
      return post.title.toLowerCase().includes(searchPost.toLowerCase());
    })
  }
}
