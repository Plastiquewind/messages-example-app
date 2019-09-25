import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { UserService } from './user.service';
import {
  GetUser,
  UserActionTypes,
  GetUserSuccess,
  GetUserFailure,
  GetMessages,
  GetMessagesSuccess,
  GetMessagesFailure
} from './user.actions';
import { switchMap, map, catchError, exhaustMap, take } from 'rxjs/operators';
import { MessagesService } from '../messages/messages.service';
import { selectUserState, AppState } from '../app.state';

@Injectable()
export class UserEffects {
  @Effect()
  public readonly getUser$: Observable<Action> = this.actions$.pipe(
    ofType<GetUser>(UserActionTypes.GetUser),
    switchMap(action =>
      this.userService.getUserProfile(action.payload).pipe(
        map(user => new GetUserSuccess(user)),
        catchError(() => of(new GetUserFailure()))
      )
    )
  );

  @Effect()
  public readonly getMessages$: Observable<Action> = this.actions$.pipe(
    ofType<GetMessages>(UserActionTypes.GetMessages),
    switchMap(action =>
      this.messagesService.get(action.payload).pipe(
        map(messages => new GetMessagesSuccess(messages)),
        catchError(() => of(new GetMessagesFailure()))
      )
    )
  );

  public constructor(
    private actions$: Actions,
    private userService: UserService,
    private messagesService: MessagesService,
    private store: Store<AppState>
  ) {}
}
