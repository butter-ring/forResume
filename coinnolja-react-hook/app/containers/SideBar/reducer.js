/*
 *
 * SideBar reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_MY_INFO,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
};

/* eslint-disable default-case, no-param-reassign */
const sideBarReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_MY_INFO:
        draft.loading = true;
        draft.error = false;
        draft.currentUser = false;
        draft.userData = false;
        draft.isSignin = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.isSignin = true;
        draft.error = false;
        draft.loading = false;
        break;
      case LOAD_MY_INFO_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default sideBarReducer;
