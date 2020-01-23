/*
 *
 * MyPage actions
 *
 */

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

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function findMypageById() {
  return {
    type: MYPAGE_FINDBYID,
  };
}

export function findMypageByIdSuccess(myPage) {
  // console.log('call action success!!');
  // console.log(myPage);
  return {
    type: MYPAGE_FINDBYID_SUCCESS,
    myPage,
  };
}

export function findMypageByIdError(error) {
  // console.log('call action error');
  return {
    type: MYPAGE_FINDBYID_ERROR,
    error,
  };
}

export function myBoardList() {
  // console.log('call cation myBoardList');
  return {
    type: MYPAGE_MYBOARDLIST,
  };
}

export function myBoardListSuccess(myBoard) {
  return {
    type: MYPAGE_MYBOARDLIST_SUCCESS,
    myBoard,
  };
}

export function myBoardListError(error) {
  return {
    type: MYPAGE_MYBOARDLIST_ERROR,
    error,
  };
}
export function myReplyList() {
  // console.log('call cation myBoardList');
  return {
    type: MYPAGE_MYREPLYLIST,
  };
}

export function myReplyListSuccess(myReply) {
  return {
    type: MYPAGE_MYREPLYLIST_SUCCESS,
    myReply,
  };
}

export function myReplyListError(error) {
  return {
    type: MYPAGE_MYREPLYLIST_ERROR,
    error,
  };
}

export function noteList(page) {
  // console.log('call cation myBoardList');
  return {
    type: MYPAGE_NOTELIST,
    page,
  };
}

export function noteListSuccess(notelist) {
  return {
    type: MYPAGE_NOTELIST_SUCCESS,
    notelist,
  };
}

export function noteListError(error) {
  return {
    type: MYPAGE_NOTELIST_ERROR,
    error,
  };
}

export function followList(page) {
  // console.log('call cation myBoardList');
  return {
    type: MYPAGE_FOLLOWLIST,
    page,
  };
}

export function followListSuccess(followlist) {
  return {
    type: MYPAGE_FOLLOWLIST_SUCCESS,
    followlist,
  };
}

export function followListError(error) {
  return {
    type: MYPAGE_FOLLOWLIST_ERROR,
    error,
  };
}

export function findProfileImage() {
  // console.log('action.js image');
  return {
    type: FIND_PROFILE_IMAGE,
  };
}

export function findProfileImageSuccess(profileImageUrl) {
  // console.log('action success');
  // console.log(profileImageUrl);
  return {
    type: FIND_PROFILE_IMAGE_SUCCESS,
    profileImageUrl,
  };
}

export function findProfileImageError(error) {
  return {
    type: FIND_PROFILE_IMAGE_ERROR,
    error,
  };
}
