import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  MYPAGE_FINDBYID,
  MYPAGE_MYBOARDLIST,
  MYPAGE_MYREPLYLIST,
  MYPAGE_NOTELIST,
  MYPAGE_FOLLOWLIST,
  FIND_PROFILE_IMAGE,
} from './constants';

import {
  findMypageByIdSuccess,
  findMypageByIdError,
  myBoardListSuccess,
  myBoardListError,
  myReplyListSuccess,
  myReplyListError,
  noteListSuccess,
  noteListError,
  followListSuccess,
  followListError,
  findProfileImageSuccess,
  findProfileImageError,
} from './actions';
// Individual exports for testing

export function* findMypageById() {
  const requestURL = '/api/mypage';
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log(response.data);
    yield put(findMypageByIdSuccess(response.data));
  } catch (err) {
    yield put(findMypageByIdError(err));
  }
}

export function* myBoardList() {
  const requestURL = '/api/myboard';

  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log('response.data Check!!!!!');
    // console.log(response.data);
    yield put(myBoardListSuccess(response.data));
  } catch (err) {
    yield put(myBoardListError(err));
  }
}

export function* myReplyList() {
  const requestURL = '/api/myreply';
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log(response.data);
    yield put(myReplyListSuccess(response.data));
  } catch (err) {
    // console.log(err);
    yield put(myReplyListError(err));
  }
}

// 내가 받은 쪽지함 리스트
export function* noteList(page) {
  const requestURL = `/api/notelist?page=${page.page}`;

  try {
    const options = {
      method: 'GET',
      auth: true,
      // data: page,
    };
    const response = yield call(request, requestURL, options);
    // console.log(response);
    yield put(noteListSuccess(response.data));
  } catch (err) {
    console.log('err');
    yield put(noteListError(err));
  }
}

// 친구 목록 리스트
export function* followList(page) {
  const requestURL = `/api/followlist?page=${page.page}`;

  try {
    const options = {
      method: 'GET',
      auth: true,
    };

    const response = yield call(request, requestURL, options);
    // console.log(response);
    yield put(followListSuccess(response.data));
  } catch (err) {
    console.log('err');
    yield put(followListError(err));
  }
}

export function* findProfileImage() {
  const requestURL = '/api/profileimg';

  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log('response.data Check!!!!!');
    // console.log(response.data);
    localStorage.setItem('profileImageUrl', response.data);
    yield put(findProfileImageSuccess(response.data));
  } catch (err) {
    yield put(findProfileImageError(err));
  }
}

export default function* myPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(MYPAGE_FINDBYID, findMypageById);
  yield takeLatest(MYPAGE_MYBOARDLIST, myBoardList);
  yield takeLatest(MYPAGE_MYREPLYLIST, myReplyList);
  yield takeLatest(MYPAGE_NOTELIST, noteList);
  yield takeLatest(MYPAGE_FOLLOWLIST, followList);
  yield takeLatest(FIND_PROFILE_IMAGE, findProfileImage);
}
