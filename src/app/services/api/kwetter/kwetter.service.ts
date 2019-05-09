import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Kwetter } from "src/app/models/kwetter";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class KwetterService {
  private kwetterApiUrl = environment.webApiBaseUrl + "/kwetters";

  constructor(
    private http: HttpClient,
  ) { }

  public get(): Observable<Kwetter[]> {
    return this.http.get<Kwetter[]>(this.kwetterApiUrl)
      .pipe(catchError(this.handleError("get", [])))
      .pipe(map((res) => res));
  }

  public getTimeline(userId: string): Observable<Kwetter[]> {
    return this.http.get<Kwetter[]>(this.kwetterApiUrl + "/timeline/" + userId)
      .pipe(catchError(this.handleError("getTimeline", [])))
      .pipe(map((res) => res));
  }

  public searchByMessage(message: string): Observable<Kwetter[]> {
    return this.http.get<Kwetter[]>(this.kwetterApiUrl + "/searchbymessage?message=" + message)
      .pipe(catchError(this.handleError("searchByMessage", [])))
      .pipe(map((res) => res));
  }

  public createKwetter(message: string, authorId: string): Observable<Kwetter> {
    return this.http.post<Kwetter>(this.kwetterApiUrl + "/" + authorId, message)
      .pipe(catchError(this.handleError("createKwetter", undefined)))
      .pipe(map((res) => res));
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      const response = error as HttpErrorResponse;
      console.error(error);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}

