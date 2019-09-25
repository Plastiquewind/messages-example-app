import { Action } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Effect, ofType, Actions } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {
  FindAuthors,
  FilterDialogActionTypes,
  FindAuthorsSuccess,
  FindAuthorsFailure
} from './filter-dialog.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { UserService } from '../../user/user.service';

@Injectable()
export class FilterDialogEffects {
  @Effect()
  public readonly findAuthors$: Observable<Action> = this.actions$.pipe(
    ofType<FindAuthors>(FilterDialogActionTypes.FindAuthors),
    switchMap(action =>
      this.userService.findUsers(action.payload).pipe(
        map(users => new FindAuthorsSuccess(users)),
        catchError(() => of(new FindAuthorsFailure()))
      )
    )
  );

  public constructor(
    private actions$: Actions,
    private userService: UserService
  ) {}
}
