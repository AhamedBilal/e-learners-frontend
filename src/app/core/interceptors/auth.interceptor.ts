import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor, HttpErrorResponse, HttpEvent
} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from "../../../environments/environment.prod";
import {catchError} from "rxjs/operators";
import {AuthService} from "../services/auth.service";
import {StorageService} from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private AUTH_HEADER = "Authorization";
  private token = "";

  constructor(private auth: AuthService , private storage: StorageService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.token = this.auth.getToken();
    console.log(this.token);

    if (!req.headers.has('Content-Type')) {
      req = req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
      });
    }

    req = this.addAuthenticationToken(req);

    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          localStorage.clear();
        }
        return throwError(error);
      })
    );
  }

  private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    if (!this.token) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    if (!request.url.match(environment.baseURI)) {
      return request;
    }
    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.token)
    });
  }
}
