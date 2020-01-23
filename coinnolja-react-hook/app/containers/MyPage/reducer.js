/*
 *
 * MyPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  MYPAGE_FINDBYID,
  MYPAGE_FINDBYID_SUCCESS,
  MYPAGE_FINDBYID_ERROR,
  MYPAGE_MYBOARDLIST,
  MYPAGE_MYBOARDLIST_SUCCESS,
  MYPAGE_MYBOARDLIST_ERROR,
  MYPAGE_MYREPLYLIST,
  MYPAGE_MYREPLYLIST_SUCCESS,
  MYPAGE_MYREPLYLIST_ERROR,
  MYPAGE_NOTELIST,
  MYPAGE_NOTELIST_SUCCESS,
  MYPAGE_NOTELIST_ERROR,
  MYPAGE_FOLLOWLIST,
  MYPAGE_FOLLOWLIST_SUCCESS,
  MYPAGE_FOLLOWLIST_ERROR,
  FIND_PROFILE_IMAGE,
  FIND_PROFILE_IMAGE_SUCCESS,
  FIND_PROFILE_IMAGE_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  myPage: false,
  myBoard: false,
  profileImageUrl: '',
};

/* eslint-disable default-case, no-param-reassign */
const myPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case MYPAGE_FINDBYID:
        draft.loading = true;
        draft.error = false;
        break;
      case MYPAGE_FINDBYID_SUCCESS:
        draft.loading = false;
        draft.myPage = action.myPage;
        draft.myPage.profileImageUrl = action.myPage.profileImageUrl;
        break;
      case MYPAGE_FINDBYID_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case MYPAGE_MYBOARDLIST:
        draft.loading = true;
        draft.error = false;
        break;
      case MYPAGE_MYBOARDLIST_SUCCESS:
        draft.loading = false;
        draft.myBoard = action.myBoard;
        break;
      case MYPAGE_MYBOARDLIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case MYPAGE_MYREPLYLIST:
        draft.loading = true;
        draft.error = false;
        break;
      case MYPAGE_MYREPLYLIST_SUCCESS:
        draft.loading = false;
        draft.myReply = action.myReply;
        break;
      case MYPAGE_MYREPLYLIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case MYPAGE_NOTELIST:
        draft.loading = true;
        draft.error = false;
        draft.notelist = false;
        break;
      case MYPAGE_NOTELIST_SUCCESS:
        draft.loading = false;
        draft.notelist = action.notelist;
        break;
      case MYPAGE_NOTELIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case MYPAGE_FOLLOWLIST:
        draft.loading = true;
        draft.error = false;
        draft.followlist = false;
        break;
      case MYPAGE_FOLLOWLIST_SUCCESS:
        draft.loading = false;
        draft.followlist = action.followlist;
        break;
      case MYPAGE_FOLLOWLIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case FIND_PROFILE_IMAGE:
        draft.loading = true;
        draft.error = false;
        break;
      case FIND_PROFILE_IMAGE_SUCCESS:
        draft.loading = false;
        draft.profileImageUrl = action.profileImageUrl;
        break;
      case FIND_PROFILE_IMAGE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default myPageReducer;
