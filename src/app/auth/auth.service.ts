import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserToken } from './user-token';
import { Credentials } from './credentials';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public constructor(private http: HttpClient) {}

  public login(credentials: Credentials): Observable<UserToken> {
    return this.http.post<UserToken>('login', credentials).pipe(
      map(user => ({
        ...user,
        expires: moment()
          .add(user.expires, 'second')
          .valueOf()
      }))
    );
  }

  public signUp(credentials: Credentials): Observable<void> {
    return this.http.post<void>('sign-up', credentials);
  }
}
