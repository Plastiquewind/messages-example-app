import * as auth from './auth/auth.reducer';
import * as feed from './feed/feed.reducer';
import * as user from './user/user.reducer';
import * as filterDialog from './feed/filter-dialog/filter-dialog.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AppState {
  auth: auth.AuthState;
  feed: feed.FeedState;
  user: user.UserState;
  filterDialog: filterDialog.FilterDialogState;
}

export const reducers = {
  auth: auth.reducer,
  feed: feed.reducer,
  user: user.reducer,
  filterDialog: filterDialog.reducer
};

export const selectAuthState = createFeatureSelector<auth.AuthState>('auth');
export const selectFeedState = createFeatureSelector<feed.FeedState>('feed');
export const selectUserState = createFeatureSelector<user.UserState>('user');
export const selectFilterDialogState = createFeatureSelector<
  filterDialog.FilterDialogState
>('filterDialog');
export const selectFilterDialogAuthors = createSelector(
  selectFilterDialogState,
  s => s.authors
);
export const selectFilterDialogSelectedAuthor = createSelector(
  selectFilterDialogState,
  s => s.selectedAuthor
);
export const selectFeedFilterMinDate = createSelector(
  selectFeedState,
  s => s.filter.from
);
export const selectUserMessagesFilter = createSelector(
  selectUserState,
  s => s.messagesFilter
);
export const selectUserError = createSelector(
  selectUserState,
  s => s.errorMessage
);
export const selectAuthUser = createSelector(
  selectAuthState,
  s => s.user
);
export const selectFeedError = createSelector(
  selectFeedState,
  s => s.errorMessage
);
