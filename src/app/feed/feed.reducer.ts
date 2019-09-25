import { AllFeedActions, FeedActionTypes } from './feed.actions';
import { Message } from '../shared/models/message';
import { MessagesFilter } from '../messages/messages-filter';

export interface FeedState {
  messages: Message[];
  errorMessage: string;
  isLoading: boolean;
  isPosting: boolean;
  filter: MessagesFilter;
}

const initialState: FeedState = {
  messages: null,
  errorMessage: null,
  isLoading: false,
  isPosting: false,
  filter: {
    offset: 0,
    count: 5
  }
};

export function reducer(
  state = initialState,
  action: AllFeedActions
): FeedState {
  switch (action.type) {
    case FeedActionTypes.GetMessages:
      return {
        ...state,
        errorMessage: null,
        messages: null,
        isLoading: true,
        filter: action.payload
      };
    case FeedActionTypes.GetMessagesSuccess:
      return {
        ...state,
        errorMessage: null,
        messages: action.payload,
        isLoading: false
      };
    case FeedActionTypes.GetMessagesFailure:
      return {
        ...state,
        errorMessage: 'Failed to get messages',
        isLoading: false
      };
    case FeedActionTypes.ClearMessages:
      return {
        ...initialState,
        filter: {
          ...state.filter,
          offset: 0
        }
      };
    case FeedActionTypes.AddMessage:
      return {
        ...state,
        isPosting: true
      };
    case FeedActionTypes.AddMessageSuccess:
      return {
        ...state,
        isPosting: false
      };
    case FeedActionTypes.AddMessageFailure:
      return {
        ...state,
        isPosting: false,
        errorMessage: 'Failed to post message'
      };
    default:
      return state;
  }
}
