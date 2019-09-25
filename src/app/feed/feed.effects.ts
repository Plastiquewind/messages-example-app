import { Injectable } from '@angular/core';
import { MessagesService } from '../messages/messages.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  GetMessages,
  FeedActionTypes,
  GetMessagesSuccess,
  GetMessagesFailure,
  AddMessage,
  AddMessageSuccess,
  AddMessageFailure
} from './feed.actions';
import { switchMap, map, catchError, exhaustMap, take } from 'rxjs/operators';
import { Action, Store } from '@ngrx/store';
import { AppState, selectFeedState } from '../app.state';

@Injectable()
export class FeedEffects {
  @Effect()
  public readonly getMessages$: Observable<Action> = this.actions$.pipe(
    ofType<GetMessages>(FeedActionTypes.GetMessages),
    switchMap(action =>
      this.messagesService.get(action.payload).pipe(
        map(messages => new GetMessagesSuccess(messages)),
        catchError(() => of(new GetMessagesFailure()))
      )
    )
  );

  @Effect()
  public readonly addMessage$: Observable<Action> = this.actions$.pipe(
    ofType<AddMessage>(FeedActionTypes.AddMessage),
    switchMap(action =>
      this.messagesService.post(action.payload).pipe(
        map(() => new AddMessageSuccess()),
        catchError(() => of(new AddMessageFailure()))
      )
    )
  );

  @Effect()
  public readonly addMessageSuccess$: Observable<Action> = this.actions$.pipe(
    ofType<AddMessageSuccess>(FeedActionTypes.AddMessageSuccess),
    exhaustMap(() =>
      this.store.select(selectFeedState).pipe(
        take(1),
        map(
          feedState =>
            new GetMessages({
              ...feedState.filter,
              offset: 0
            })
        )
      )
    )
  );

  public constructor(
    private actions$: Actions,
    private messagesService: MessagesService,
    private store: Store<AppState>
  ) {}
}
