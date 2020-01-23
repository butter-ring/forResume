/*
 *
 * Wallet reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FIND_MYACCOUNT,
  FIND_MYACCOUNT_SUCCESS,
  FIND_MYACCOUNT_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  account: false,
};

/* eslint-disable default-case, no-param-reassign */
const walletReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FIND_MYACCOUNT:
        draft.loading = true;
        draft.error = false;
        break;
      case FIND_MYACCOUNT_SUCCESS:
        draft.loading = false;
        draft.account = action.account;
        break;
      case FIND_MYACCOUNT_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default walletReducer;
