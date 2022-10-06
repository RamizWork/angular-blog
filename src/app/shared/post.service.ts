import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostInterface} from "../admin/shared/interfaces/post.interface";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {FbCreateResponseInterface} from "../admin/shared/interfaces/fbCreateResponse.interface";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private http: HttpClient) {
  }

  create(post: PostInterface): Observable<PostInterface> {
    return this.http.post(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(map((response: PostInterface | any) => {
        return {
          ...post,
          id: response.name,
          data: new Date(post.date),
        }
      }))
  }

  getAllPosts(): Observable<PostInterface[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(map((response: { [key: string]: any }) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }
}
