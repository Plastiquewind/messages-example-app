import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './app.state';
import { Logout } from './auth/auth.actions';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  public constructor(private store: Store<AppState>) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.store.dispatch(new Logout());
          location.reload();
        }

        const error: string = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
