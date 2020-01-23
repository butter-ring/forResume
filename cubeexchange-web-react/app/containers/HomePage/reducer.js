/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  CHANGE_USERNAME,
  FINDALL_COINMARKETS,
  FINDALL_COINMARKETS_SUCCESS,
  FINDALL_COINMARKETS_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  username: '',
  home: false,
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const homeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CHANGE_USERNAME:
        // Delete prefixed '@' from the github username
        draft.username = action.username.replace(/@/gi, '');
        break;
      case FINDALL_COINMARKETS:
        draft.loading = true;
        draft.error = false;
        break;
      case FINDALL_COINMARKETS_SUCCESS:
        draft.loading = false;
        draft.home = action.home;
        break;
      case FINDALL_COINMARKETS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default homeReducer;
