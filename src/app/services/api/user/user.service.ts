import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { User } from "src/app/models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userApiUrl = environment.webApiBaseUrl + "/users";

  constructor(
    private http: HttpClient,
  ) { }

  public get(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl)
      .pipe(catchError(this.handleError("get", [])))
      .pipe(map((res) => res));
  }

  public getById(userId: string): Observable<User> {
    return this.http.get<User>(this.userApiUrl + "/" + userId)
      .pipe(catchError(this.handleError("getById", undefined)))
      .pipe(map((res) => res));
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(this.userApiUrl + "/getcurrentuser")
      .pipe(catchError(this.handleError("getCurrentUser", undefined)))
      .pipe(map((res) => res));
  }

  public followUser(userIdFollower: string, userIdToFollow: string): Observable<boolean> {
    return this.http.put<boolean>(this.userApiUrl + "/" + userIdFollower + "/follow/" + userIdToFollow, "")
      .pipe(catchError(this.handleError("follow", undefined)))
      .pipe(map((res) => res));
  }

  public unFollowUser(userIdThatsFollowing: string, userIdToStopFollowing: string): Observable<boolean> {
    return this.http.delete<boolean>(this.userApiUrl + "/" + userIdThatsFollowing
    + "/unfollow/" + userIdToStopFollowing)
      .pipe(catchError(this.handleError("unfollow", undefined)))
      .pipe(map((res) => res));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  public handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      const response = error as HttpErrorResponse;
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
