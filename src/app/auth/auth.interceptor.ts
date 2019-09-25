import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import moment from 'moment-es6';
import { AppState, selectAuthState } from '../app.state';
import { Store } from '@ngrx/store';
import { UserToken } from './user-token';
import { take } from 'rxjs/operators';
import { Logout } from './auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  public constructor(private store: Store<AppState>) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let token: UserToken;

    this.store
      .select(selectAuthState)
      .pipe(take(1))
      .subscribe(authState => (token = authState.user));

    if (token) {
      const expiresAt = moment(token.expires);

      if (moment().isAfter(expiresAt)) {
        this.store.dispatch(new Logout());

        return next.handle(req);
      }

      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token.value}`)
      });

      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
