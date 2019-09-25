import { UserToken } from 'src/app/auth/user-token';
import { AuthActionTypes, AllAuthActions } from './auth.actions';
import { localStorageTokenKey } from './local-storage-token-key';

export interface AuthState {
  isAuthenticating: boolean;
  isSigningUp: boolean;
  user: UserToken;
  errorMessage: string;
}

const initialState: AuthState = {
  isAuthenticating: false,
  isSigningUp: false,
  user: JSON.parse(localStorage.getItem(localStorageTokenKey)),
  errorMessage: null
};

export function reducer(
  state = initialState,
  action: AllAuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.Login:
      return {
        ...state,
        isAuthenticating: true,
        errorMessage: null
      };
    case AuthActionTypes.LoginSuccess:
      return {
        ...state,
        isAuthenticating: false,
        user: action.payload,
        errorMessage: null
      };
    case AuthActionTypes.LoginFailure:
      return {
        ...state,
        isAuthenticating: false,
        user: null,
        errorMessage:
          action.payload.status === 401
            ? 'Username or password are incorrect'
            : 'Failed to authenticate user'
      };
    case AuthActionTypes.Logout:
      return {
        ...state,
        user: null
      };
    case AuthActionTypes.SignUp:
      return {
        ...state,
        isSigningUp: true
      };
    case AuthActionTypes.SignUpSuccess:
      return {
        ...state,
        isSigningUp: false
      };
    case AuthActionTypes.SignUpFailure:
      return {
        ...state,
        isSigningUp: false,
        errorMessage:
          action.payload.status === 400
            ? 'Username already exists'
            : 'Failed to register a new account'
      };
    case AuthActionTypes.OpenAuthPage:
      return {
        ...state,
        errorMessage: null
      };
    default:
      return state;
  }
}
