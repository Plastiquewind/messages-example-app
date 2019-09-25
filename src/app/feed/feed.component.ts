import {
  Component,
  OnDestroy,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MessagesFilter } from '../messages/messages-filter';
import { AppState, selectFeedState, selectFeedError } from '../app.state';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { GetMessages, ClearMessages, AddMessage } from './feed.actions';
import { tap, filter, take } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { FeedState } from './feed.reducer';
import { MatDialog } from '@angular/material';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeedComponent implements OnInit, OnDestroy {
  public feedState$: Observable<FeedState>;

  private filter$ = new BehaviorSubject<MessagesFilter>(null);

  public constructor(
    private store: Store<AppState>,
    private toastrService: ToastrService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.feedState$ = this.store
      .select(selectFeedState)
      .pipe(untilDestroyed(this));

    this.store
      .select(selectFeedError)
      .pipe(
        filter(err => !!err),
        take(1),
        untilDestroyed(this)
      )
      .subscribe(err => this.toastrService.error(err));

    this.feedState$.subscribe(feedState => this.filter$.next(feedState.filter));

    this.store.dispatch(new GetMessages(this.filter$.getValue()));
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new ClearMessages());
  }

  public onFilterClick(): void {
    this.dialog
      .open(FilterDialogComponent, {
        data: this.filter$.getValue()
      })
      .afterClosed()
      .subscribe(
        (filter: MessagesFilter) =>
          filter && this.store.dispatch(new GetMessages(filter))
      );
  }

  public onMessagesBottomReach(messagesCount: number): void {
    this.store.dispatch(
      new GetMessages({
        ...this.filter$.getValue(),
        offset: messagesCount
      })
    );
  }

  public onMessageSend(text: string): void {
    this.store.dispatch(new AddMessage(text));
  }
}
