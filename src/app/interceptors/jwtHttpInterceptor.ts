import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

/**
 * Json Webtoken Http Interceptor
 * This class will take care of injecting the -- if present -- acces_token, which has been generated by the login function.
 * 
 * @author this class was taken from our Band Member Finder project during semester 4
 */
@Injectable()
export class JwtHttpInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem("access_token");
    let clone: HttpRequest<any>;

    if (token) {
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      clone = request.clone({
        setHeaders: {
          Accept: `application/json`,
          "Content-Type": `application/json`,
        },
      });
    }
    return next.handle(clone);
  }
}
