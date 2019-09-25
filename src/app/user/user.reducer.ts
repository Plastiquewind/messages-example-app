import { AllUserActions, UserActionTypes } from './user.actions';
import { UserProfile } from '../shared/models/user-profile';
import { Message } from '../shared/models/message';
import { UserMessagesFilter } from './user-messages-filter';

export interface UserState {
  profile: UserProfile;
  errorMessage: string;
  profileLoading: boolean;
  messages: Message[];
  messagesFilter: UserMessagesFilter;
  messagesLoading: boolean;
}

const initialState: UserState = {
  profile: null,
  errorMessage: null,
  profileLoading: false,
  messages: null,
  messagesLoading: false,
  messagesFilter: {
    count: 5,
    offset: 0,
    author: null
  }
};

export function reducer(
  state = initialState,
  action: AllUserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.GetUser:
      return {
        ...state,
        errorMessage: null,
        profileLoading: true,
        profile: null
      };
    case UserActionTypes.GetUserSuccess:
      return {
        ...state,
        errorMessage: null,
        profileLoading: false,
        profile: action.payload
      };
    case UserActionTypes.GetUserFailure:
      return {
        ...state,
        errorMessage: 'Failed to get user profile',
        profileLoading: false
      };
    case UserActionTypes.GetMessages:
      return {
        ...state,
        errorMessage: null,
        messagesLoading: true,
        messages: null,
        messagesFilter: action.payload
      };
    case UserActionTypes.GetMessagesSuccess:
      return {
        ...state,
        errorMessage: null,
        messagesLoading: false,
        messages: action.payload
      };
    case UserActionTypes.GetMessagesFailure:
      return {
        ...state,
        errorMessage: 'Failed to get user messages',
        messagesLoading: false
      };
    case UserActionTypes.ClearMessages:
      return initialState;
    default:
      return state;
  }
}
