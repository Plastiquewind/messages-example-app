import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Store } from '@ngrx/store';
import { AppState, selectAuthUser } from './app.state';
import { Logout } from './auth/auth.actions';
import { Observable } from 'rxjs';
import { UserToken } from './auth/user-token';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('showHide', [
      state(
        'shown',
        style({
          opacity: 1
        })
      ),
      state(
        'hidden',
        style({
          opacity: 0
        })
      ),
      transition('shown => hidden', [animate('0.2s')]),
      transition('hidden => shown', [animate('0.5s')])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  public authenticatedUser$: Observable<UserToken>;
  public scrollTopIsVisible: boolean;

  public constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.authenticatedUser$ = this.store
      .select(selectAuthUser)
      .pipe(untilDestroyed(this));
  }

  public ngOnDestroy(): void {}

  public logout(): void {
    this.store.dispatch(new Logout());
  }

  public scrollToTop(): void {
    window.scrollTo(0, 0);
  }

  @HostListener('window:scroll')
  public onScroll(): void {
    this.scrollTopIsVisible = window.scrollY > 200;
  }
}
