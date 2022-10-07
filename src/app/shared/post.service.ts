import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostInterface} from "../admin/shared/interfaces/post.interface";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private http: HttpClient) {
  }

  create(post: PostInterface): Observable<PostInterface> {
    return this.http.post<PostInterface>(`${environment.fbDbUrl}/posts.json`, post)
      .pipe(
        map((response: PostInterface | any) => {
            return {
              ...post,
              id: response.name,
              data: new Date(post.date),
            }
          }
        )
      );
  }

  getPostId(id: string | any): Observable<PostInterface> {
    return this.http.get<PostInterface>(`${environment.fbDbUrl}/posts/${id}.json`)
      .pipe(
        map((post: PostInterface) => {
          return {
            ...post,
            id,
            date: new Date(),
          }
        })
      )
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

  updatePost(post: PostInterface): Observable<PostInterface> {
    return this.http.patch<PostInterface>(`${environment.fbDbUrl}/posts/${post.id}.json`, post);
  }

  remove(id: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`)
  }
}
