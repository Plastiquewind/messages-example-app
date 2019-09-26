import { Action } from '@ngrx/store';
import { Credentials } from './credentials';
import { UserToken } from '../../app/auth/user-token';
import { HttpErrorResponse } from '@angular/common/http';

export enum AuthActionTypes {
  Login = '[Auth] Login',
  LoginSuccess = '[Auth] Login Success',
  LoginFailure = '[Auth] Login Failure',
  Logout = '[Auth] Logout',
  SignUp = '[Auth] Sign Up',
  SignUpSuccess = '[Auth] Sign Up Success',
  SignUpFailure = '[Auth] Sign Up Failure',
  OpenAuthPage = '[Auth] Open Auth Page'
}

export class Login implements Action {
  public readonly type = AuthActionTypes.Login;

  public constructor(public payload: Credentials) {}
}

export class LoginSuccess implements Action {
  public readonly type = AuthActionTypes.LoginSuccess;

  public constructor(public payload: UserToken) {}
}

export class LoginFailure implements Action {
  public readonly type = AuthActionTypes.LoginFailure;

  public constructor(public payload: HttpErrorResponse) {}
}

export class Logout implements Action {
  public readonly type = AuthActionTypes.Logout;
}

export class SignUp implements Action {
  public readonly type = AuthActionTypes.SignUp;

  public constructor(public payload: Credentials) {}
}

export class SignUpSuccess implements Action {
  public readonly type = AuthActionTypes.SignUpSuccess;
}

export class SignUpFailure implements Action {
  public readonly type = AuthActionTypes.SignUpFailure;

  public constructor(public payload: HttpErrorResponse) {}
}

export class OpenAuthPage implements Action {
  public readonly type = AuthActionTypes.OpenAuthPage;
}

export type AllAuthActions =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | OpenAuthPage;
