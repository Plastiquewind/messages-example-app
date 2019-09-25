import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { AppState, selectAuthState } from '../app.state';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  public constructor(private router: Router, private store: Store<AppState>) {}

  public canActivate(
    // tslint:disable-next-line: variable-name
    _route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let isAuthenticated: boolean;

    this.store
      .select(selectAuthState)
      .pipe(take(1))
      .subscribe(authState => (isAuthenticated = !!authState.user));

    if (isAuthenticated) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

    return false;
  }
}
