import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { User } from "src/app/models/user";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private userApiUrl = environment.webApiBaseUrl + "/users";
  private currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;

  constructor(
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(undefined);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get(): Observable<User[]> {
    return this.http.get<User[]>(this.userApiUrl)
      .pipe(catchError(this.handleError("get", [])))
      .pipe(map((res) => res["_embedded"].userResources));
  }

  public getById(userId: string): Observable<User> {
    return this.http.get<User>(this.userApiUrl + "/" + userId)
      .pipe(catchError(this.handleError("getById", undefined)))
      .pipe(map((res) => res));
  }

  public async getCurrentUser(): Promise<User> {
    return new Promise((resolve, reject) => {
      if (!this.currentUserSubject.value) {
        this.http.get<User>(this.userApiUrl + "/getcurrentuser")
          .pipe(map((res) => res))
          .subscribe((res) => {
            this.currentUserSubject.next(res as User);
            resolve(this.currentUserSubject.value);
          });
      } else {
        resolve(this.currentUserSubject.value);
      }
    });
  }


  // public getCurrentUser(): User {
  //   if (!this.currentUserSubject.value) {
  //     this.http.get<User>(this.userApiUrl + "/getcurrentuser")
  //       .pipe(map((res) => {
  //         this.currentUserSubject.next(res as User);
  //         console.log(this.currentUserSubject);
  //         return this.currentUserSubject.value;
  //       }));
  //   } else {
  //     return this.currentUserSubject.value;
  //   }
  // }
  // public getCurrentUser(): Observable<User> {
  //   console.log("kek");
  //   if (!this.currentUserSubject.value) {
  //     console.log("getcurrenuser");
  //     this.http.get<User>(this.userApiUrl + "/getcurrentuser")
  //       .pipe(catchError(this.handleError("getCurrentUser", undefined)))
  //       .pipe(map((res) => {
  //         this.currentUserSubject.next(res as User);
  //         console.log(this.currentUserSubject);
  //         return this.currentUserSubject.value;
  //       }));
  //       // .subscribe((res) => {
  //       //   this.currentUserSubject.next(res as User);
  //       //   return this.currentUserSubject.value;
  //       // });
  //   } else {
  //     return this.currentUserSubject.value;
  //   }
  // }

//   .pipe(map((response: any) => {
//     // login successful if there's a jwt token in the response header
//     if (response.headers.get('Authorization')) {
//       let user = response.body;
//       if (user) {
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         user.token = response.headers.get('Authorization');
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         this.currentUserSubject.next(user);
//       }
//     }

//     return response;
//   }
// ));

  public followUser(userIdFollower: string, userIdToFollow: string): Observable < boolean > {
  return this.http.put<boolean>(this.userApiUrl + "/" + userIdFollower + "/follow/" + userIdToFollow, "")
    .pipe(catchError(this.handleError("follow", undefined)))
    .pipe(map((res) => res));
}

  public unFollowUser(userIdThatsFollowing: string, userIdToStopFollowing: string): Observable < boolean > {
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
  public handleError<T>(operation = "operation", result ?: T) {
  return (error: any): Observable<T> => {
    const response = error as HttpErrorResponse;
    console.error(error);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
