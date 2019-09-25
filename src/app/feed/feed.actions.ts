import { Action } from '@ngrx/store';
import { MessagesFilter } from '../messages/messages-filter';
import { Message } from '../shared/models/message';

export enum FeedActionTypes {
  GetMessages = '[Feed] Get Messages',
  GetMessagesSuccess = '[Feed] Get Messages Success',
  GetMessagesFailure = '[Feed] Get Messages Failure',
  ClearMessages = '[Feed] Clear Messages',
  AddMessage = '[Feed] Add Message',
  AddMessageSuccess = '[Feed] Add Message Success',
  AddMessageFailure = '[Feed] Add Message Failure'
}

export class GetMessages implements Action {
  public readonly type = FeedActionTypes.GetMessages;

  public constructor(public payload: MessagesFilter) {}
}

export class GetMessagesSuccess implements Action {
  public readonly type = FeedActionTypes.GetMessagesSuccess;

  public constructor(public payload: Message[]) {}
}

export class GetMessagesFailure implements Action {
  public readonly type = FeedActionTypes.GetMessagesFailure;

  public constructor() {}
}

export class ClearMessages implements Action {
  public readonly type = FeedActionTypes.ClearMessages;

  public constructor() {}
}

export class AddMessage implements Action {
  public readonly type = FeedActionTypes.AddMessage;

  public constructor(public payload: string) {}
}

export class AddMessageSuccess implements Action {
  public readonly type = FeedActionTypes.AddMessageSuccess;

  public constructor() {}
}

export class AddMessageFailure implements Action {
  public readonly type = FeedActionTypes.AddMessageFailure;

  public constructor() {}
}

export type AllFeedActions =
  | GetMessages
  | GetMessagesSuccess
  | GetMessagesFailure
  | ClearMessages
  | AddMessage
  | AddMessageSuccess
  | AddMessageFailure;
