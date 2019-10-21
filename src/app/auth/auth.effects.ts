import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, exhaustMap, catchError, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import {
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Logout,
  SignUp,
  SignUpSuccess,
  SignUpFailure
} from './auth.actions';
import { Router } from '@angular/router';
import { localStorageTokenKey } from './local-storage-token-key';
import { Action } from '@ngrx/store';

@Injectable()
export class AuthEffects {
  @Effect()
  public readonly login$: Observable<Action> = this.actions$.pipe(
    ofType<Login>(AuthActionTypes.Login),
    exhaustMap(action =>
      this.authService.login(action.payload).pipe(
        map(user => new LoginSuccess(user)),
        catchError(error => of(new LoginFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public readonly loginSuccess$: Observable<LoginSuccess> = this.actions$.pipe(
    ofType<LoginSuccess>(AuthActionTypes.LoginSuccess),
    tap(action => {
      localStorage.setItem(
        localStorageTokenKey,
        JSON.stringify(action.payload)
      );
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  public readonly logout$: Observable<Action> = this.actions$.pipe(
    ofType<Logout>(AuthActionTypes.Logout),
    tap(() => {
      localStorage.removeItem(localStorageTokenKey);
      this.router.navigate(['/auth/login']);
    })
  );

  @Effect()
  public readonly signUp$: Observable<Action> = this.actions$.pipe(
    ofType<SignUp>(AuthActionTypes.SignUp),
    exhaustMap(action =>
      this.authService.signUp(action.payload).pipe(
        map(() => new SignUpSuccess()),
        catchError(error => of(new SignUpFailure(error)))
      )
    )
  );

  @Effect({ dispatch: false })
  public readonly signUpSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<SignUpSuccess>(AuthActionTypes.SignUpSuccess),
    tap(() => this.router.navigateByUrl('auth/login'))
  );

  public constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}
}
