import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { of, Observable, throwError, timer } from 'rxjs';
import { UserToken } from '../auth/user-token';
import { Credentials } from '../auth/credentials';
import { FakeUserTokens } from './fake-user-tokens';
import { delay, mergeMap } from 'rxjs/operators';

@Injectable()
export class FakeAuthorizationInterceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('/login')) {
      return this.logIn(req);
    }

    if (req.url.includes('/sign-up')) {
      return this.signUp(req);
    }

    return next.handle(req);
  }

  private logIn(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const credentials = req.body as Credentials;
    const token = FakeUserTokens.getToken(
      credentials.username,
      credentials.password
    );

    if (token) {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            username: credentials.username,
            value: token,
            expires: 60 * 60 * 24
          } as UserToken
        })
      ).pipe(delay(1000));
    } else {
      return timer(1000).pipe(
        mergeMap(() =>
          throwError(
            new HttpErrorResponse({
              status: 401,
              statusText: 'Unauthorized',
              url: req.url
            })
          )
        )
      );
    }
  }

  private signUp(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    // TODO: Implement fake signing up
    return timer(1000).pipe(
      mergeMap(() =>
        throwError(
          new HttpErrorResponse({
            status: 500,
            statusText: 'Internal Server Error',
            url: req.url
          })
        )
      )
    );
  }
}
