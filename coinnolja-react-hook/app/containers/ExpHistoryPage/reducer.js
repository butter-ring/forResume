/*
 *
 * ExpHistoryPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_HISTORY,
  LOAD_HISTORY_SUCCESS,
  LOAD_HISTORY_ERROR,
} from './constants';

export const initialState = { loading: false, error: false, history: false };

/* eslint-disable default-case, no-param-reassign */
const expHistoryPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_HISTORY:
        draft.loading = true;
        draft.error = false;
        draft.history = false;
        break;
      case LOAD_HISTORY_SUCCESS:
        draft.history = action.history;
        draft.loading = false;
        break;
      case LOAD_HISTORY_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default expHistoryPageReducer;
