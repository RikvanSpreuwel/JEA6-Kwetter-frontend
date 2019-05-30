import { Injectable } from "@angular/core";
import { Headers, Http, Response } from "@angular/http";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { ToastrService } from "ngx-toastr";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private readonly LOGIN_URL = "/oauth/token";
  private readonly TOKEN_AUTH_CLIENTID = "test";
  private readonly TOKEN_AUTH_CLIENTSECRET = "test";
  private readonly TOKEN_NAME = "access_token";
  private accessToken: string;

  constructor(
    private http: Http,
    private jwt: JwtHelperService,
    private toastrService: ToastrService,
    private router: Router,
  ) { }

  public login(userName: string, password: string) {
    this.requestToken(userName, password).subscribe((tokenResponse) => {
      if (tokenResponse) {
        this.saveToken(tokenResponse);
        this.toastrService.success("", "Succesfully logged in!");
        this.router.navigate(["/"]);
      } else {
        this.toastrService.error("", "Incorrect login credentials!");
      }
    });
  }


  public requestToken(userName: string, password: string): Observable<any> {
    const body = `username=${encodeURIComponent(userName)}` +
      `&password=${encodeURIComponent(password)}&grant_type=password`;

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + btoa(this.TOKEN_AUTH_CLIENTID + ":" + this.TOKEN_AUTH_CLIENTSECRET));

    return this.http.post(environment.webApiBaseUrl + this.LOGIN_URL, body, { headers })
      .pipe(map((res) => res.json()))
      .pipe(catchError(this.handleError("login", [])))
      .pipe(map((res: any) => {
        if (res.access_token) {
          return res.access_token;
        }
        return null;
      }));
  }

  public logout() {
    localStorage.removeItem(this.TOKEN_NAME);
    this.router.navigate(["/login"]);
  }

  public isLoggedIn() {
    return localStorage.getItem(this.TOKEN_NAME) === null ? false
     : !this.isTokenExpired(localStorage.getItem(this.TOKEN_NAME));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation  name of the operation that failed
  * @param result     optional value to return as the observable result
  */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // Let the app keep running by returning an empty result.
      return of(result);
    };
  }

  private saveToken(accessToken: string) {
    this.accessToken = accessToken;
    localStorage.setItem(this.TOKEN_NAME, accessToken);
  }

  /**
   * Returns whether the given oauth token has expired.
   * @param token The token to perform the expiration check on.
   */
  private isTokenExpired(token) {
    if (this.jwt.isTokenExpired(token)) {
      this.logout();
      return true;
    } else {
      return false;
    }
  }
}
