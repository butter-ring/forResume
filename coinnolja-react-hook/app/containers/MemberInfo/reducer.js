/*
 *
 * MemberInfo reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  FIND_MEMBERINFO,
  FIND_MEMBERINFO_SUCCESS,
  FIND_MEMBERINFO_ERROR,
  FIND_MEMBERBOARDLIST,
  FIND_MEMBERBOARDLIST_SUCCESS,
  FIND_MEMBERBOARDLIST_ERROR,
  FIND_MEMBERREPLYLIST,
  FIND_MEMBERREPLYLIST_SUCCESS,
  FIND_MEMBERREPLYLIST_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  memberInfo: false,
  memberBoard: false,
  memberReply: false,
};

/* eslint-disable default-case, no-param-reassign */
const memberInfoReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case FIND_MEMBERINFO:
        draft.loading = true;
        draft.error = false;
        break;
      case FIND_MEMBERINFO_SUCCESS:
        draft.loading = false;
        draft.memberInfo = action.memberInfo;
        break;
      case FIND_MEMBERINFO_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case FIND_MEMBERBOARDLIST:
        draft.loading = true;
        draft.error = false;
        break;
      case FIND_MEMBERBOARDLIST_SUCCESS:
        draft.loading = false;
        draft.memberBoard = action.memberBoard;
        break;
      case FIND_MEMBERBOARDLIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case FIND_MEMBERREPLYLIST:
        draft.loading = true;
        draft.error = false;
        break;
      case FIND_MEMBERREPLYLIST_SUCCESS:
        draft.loading = false;
        draft.memberReply = action.memberReply;
        break;
      case FIND_MEMBERREPLYLIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default memberInfoReducer;
