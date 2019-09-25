import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import {
  AppState,
  selectUserState,
  selectUserMessagesFilter,
  selectUserError
} from '../app.state';
import { GetUser, GetMessages, ClearMessages } from './user.actions';
import { Observable } from 'rxjs';
import { UserState } from './user.reducer';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { take, filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit, OnDestroy {
  public userState$: Observable<UserState>;

  public constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private location: Location,
    private toastrService: ToastrService
  ) {}

  public ngOnInit(): void {
    this.userState$ = this.store
      .select(selectUserState)
      .pipe(untilDestroyed(this));

    this.store
      .select(selectUserError)
      .pipe(
        filter(errorMessage => !!errorMessage),
        untilDestroyed(this)
      )
      .subscribe(errorMessage => this.toastrService.error(errorMessage));

    this.userState$
      .pipe(
        filter(userState => !!userState.profile),
        take(1)
      )
      .subscribe(userState =>
        this.store.dispatch(
          new GetMessages({
            ...userState.messagesFilter,
            author: userState.profile.id
          })
        )
      );

    const username = this.route.snapshot.paramMap.get('name');

    this.store.dispatch(new GetUser(username));
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new ClearMessages());
  }

  public goBack(): void {
    this.location.back();
  }

  public onMessagesBottomReach(messagesCount: number): void {
    this.store
      .select(selectUserMessagesFilter)
      .pipe(take(1))
      .subscribe(messagesFilter =>
        this.store.dispatch(
          new GetMessages({
            ...messagesFilter,
            offset: messagesCount
          })
        )
      );
  }
}
