import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';

export enum FilterDialogActionTypes {
  FindAuthors = '[FilterDialog] Find Authors',
  FindAuthorsSuccess = '[FilterDialog] Find Authors Success',
  FindAuthorsFailure = '[FilterDialog] Find Authors Failure',
  SelectAuthor = '[FilterDialog] Select Author',
  Reset = '[FilterDialog] Reset'
}

export class FindAuthors implements Action {
  public readonly type = FilterDialogActionTypes.FindAuthors;

  public constructor(public payload: string) {}
}

export class FindAuthorsSuccess implements Action {
  public readonly type = FilterDialogActionTypes.FindAuthorsSuccess;

  public constructor(public payload: User[]) {}
}

export class FindAuthorsFailure implements Action {
  public readonly type = FilterDialogActionTypes.FindAuthorsFailure;
}

export class SelectAuthor implements Action {
  public readonly type = FilterDialogActionTypes.SelectAuthor;

  public constructor(public payload: User) {}
}

export class Reset implements Action {
  public readonly type = FilterDialogActionTypes.Reset;
}

export type AllFilterDialogActions =
  | FindAuthors
  | FindAuthorsSuccess
  | FindAuthorsFailure
  | SelectAuthor
  | Reset;
