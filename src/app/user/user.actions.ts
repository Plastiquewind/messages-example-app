import { Action } from '@ngrx/store';
import { UserProfile } from '../shared/models/user-profile';
import { Message } from '../shared/models/message';
import { UserMessagesFilter } from './user-messages-filter';

export enum UserActionTypes {
  GetUser = '[User] Get User',
  GetUserSuccess = '[User] Get User Success',
  GetUserFailure = '[User] Get User Failure',
  GetMessages = '[User] Get Messages',
  GetMessagesSuccess = '[User] Get Messages Success',
  GetMessagesFailure = '[User] Get Messages Failure',
  ClearMessages = '[User] Clear Messages'
}

export class GetUser implements Action {
  public readonly type = UserActionTypes.GetUser;

  public constructor(public payload: string) {}
}

export class GetUserSuccess implements Action {
  public readonly type = UserActionTypes.GetUserSuccess;

  public constructor(public payload: UserProfile) {}
}

export class GetUserFailure implements Action {
  public readonly type = UserActionTypes.GetUserFailure;

  public constructor() {}
}

export class GetMessages implements Action {
  public readonly type = UserActionTypes.GetMessages;

  public constructor(public payload: UserMessagesFilter) {}
}

export class GetMessagesSuccess implements Action {
  public readonly type = UserActionTypes.GetMessagesSuccess;

  public constructor(public payload: Message[]) {}
}

export class GetMessagesFailure implements Action {
  public readonly type = UserActionTypes.GetMessagesFailure;

  public constructor() {}
}

export class ClearMessages implements Action {
  public readonly type = UserActionTypes.ClearMessages;

  public constructor() {}
}

export type AllUserActions =
  | GetUser
  | GetUserSuccess
  | GetUserFailure
  | GetMessages
  | GetMessagesSuccess
  | GetMessagesFailure
  | ClearMessages;
