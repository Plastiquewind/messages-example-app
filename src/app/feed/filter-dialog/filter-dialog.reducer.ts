import { User } from 'src/app/shared/models/user';
import {
  FilterDialogActionTypes,
  AllFilterDialogActions
} from './filter-dialog.actions';

export interface FilterDialogState {
  errorMessage: string;
  selectedAuthor: User;
  authors: User[];
}

const initialState: FilterDialogState = {
  errorMessage: null,
  selectedAuthor: null,
  authors: null
};

export function reducer(
  state = initialState,
  action: AllFilterDialogActions
): FilterDialogState {
  switch (action.type) {
    case FilterDialogActionTypes.FindAuthors:
      return {
        ...state,
        errorMessage: null
      };
    case FilterDialogActionTypes.FindAuthorsSuccess:
      return {
        ...state,
        authors: action.payload
      };
    case FilterDialogActionTypes.FindAuthorsFailure:
      return {
        ...state,
        errorMessage: 'Failed to find users.'
      };
    case FilterDialogActionTypes.SelectAuthor:
      return {
        ...state,
        selectedAuthor: action.payload
      };
    case FilterDialogActionTypes.Reset:
      return {
        ...state,
        selectedAuthor: null
      };
    default:
      return state;
  }
}
