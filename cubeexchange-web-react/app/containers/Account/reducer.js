/*
 *
 * Account reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FIND_MYINFO,
  FIND_MYINFO_SUCCESS,
  FIND_MYINFO_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  account: false,
};

/* eslint-disable default-case, no-param-reassign */
const accountReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FIND_MYINFO:
        draft.loading = true;
        draft.error = false;
        break;
      case FIND_MYINFO_SUCCESS:
        draft.loading = false;
        draft.account = action.account;
        break;
      case FIND_MYINFO_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default accountReducer;
