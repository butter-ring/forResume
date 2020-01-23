/*
 *
 * SearchPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_SEARCH,
  LOAD_SEARCH_SUCCESS,
  LOAD_SEARCH_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  searchResult: false,
};

/* eslint-disable default-case, no-param-reassign */
const searchPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_SEARCH:
        draft.loading = true;
        draft.error = false;
        draft.boardList = false;
        break;
      case LOAD_SEARCH_SUCCESS:
        draft.searchResult = action.searchResult;
        draft.loading = false;
        break;
      case LOAD_SEARCH_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default searchPageReducer;
