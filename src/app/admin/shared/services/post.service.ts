import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import {PostInterface} from "../interfaces/post.interface";
import {environment} from "../../../../environments/environment";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: "root"
})
export class PostService {
  constructor(private http: HttpClient, private authService: AuthService) {
  }

  create(post: PostInterface): Observable<PostInterface> {
    let params = new HttpParams();

    params = params.append('auth', this.authService.token);

    return this.http.post<PostInterface>(`${environment.fbDbUrl}/posts.json`, post, {
      params
    })
      .pipe(
        map((response: PostInterface | any) => {
            return {
              ...post,
              id: response.name,
              date: new Date(post.date),
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
          }
        )
      )
  }

  getAllPosts(): Observable<PostInterface[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
      .pipe(
        map((response: {[key: string]: any }) => {
            return Object
              .keys(response)
              .map(key => ({
                    ...response[key],
                    id: key,
                    date: new Date(response[key].date)
                  }
                )
              )
          }
        )
      )
  }

  updatePost(post: PostInterface): Observable<PostInterface> {
    let params = new HttpParams();

    params = params.append('auth', this.authService.token);
    return this.http.patch<PostInterface>(`${environment.fbDbUrl}/posts/${post.id}.json`, post, {
      params
    });
  }

  remove(id: string | undefined): Observable<void> {
    let params = new HttpParams();

    params = params.append('auth', this.authService.token);
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${id}.json`, {
        params
    })
  }
}
