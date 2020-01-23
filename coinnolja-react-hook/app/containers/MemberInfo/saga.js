import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import {
  FIND_MEMBERINFO,
  FIND_MEMBERBOARDLIST,
  FIND_MEMBERREPLYLIST,
} from './constants';

import {
  findMemberInfoSuccess,
  findMemberInfoError,
  findMemberBoardListSuccess,
  findMemberBoardListError,
  findMemberReplyListSuccess,
  findMemberReplyListError,
} from './actions';
// Individual exports for testing

export function* findMemberInfo(reqData) {
  // console.log('check reqData');
  // console.log(reqData);
  const { memberId } = reqData;

  const requestURL = `/api/memberinfo/detail/${memberId}`;
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log('saga.js response check');
    // console.log(response);
    yield put(findMemberInfoSuccess(response.data));
  } catch (err) {
    yield put(findMemberInfoError(err));
  }
}

export function* findMemberBoardList(reqData) {
  // console.log('check reqData');
  // console.log(reqData);
  const { memberId, pageIndex } = reqData;

  const requestURL = `/api/memberinfo/board/${memberId}?page=${pageIndex}`;
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log('saga.js response check');
    // console.log(response);
    yield put(findMemberBoardListSuccess(response.data));
  } catch (err) {
    yield put(findMemberBoardListError(err));
  }
}

export function* findMemberReplyList(reqData) {
  // console.log('check reqData');
  // console.log(reqData);
  const { memberId, pageIndex } = reqData;
  console.log(`pageIndex====${pageIndex}`);

  const requestURL = `/api/memberinfo/reply/${memberId}?page=${pageIndex}`;
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log('saga.js response check');
    // console.log(response);
    yield put(findMemberReplyListSuccess(response.data));
  } catch (err) {
    yield put(findMemberReplyListError(err));
  }
}

export default function* memberInfoSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FIND_MEMBERINFO, findMemberInfo);
  yield takeLatest(FIND_MEMBERBOARDLIST, findMemberBoardList);
  yield takeLatest(FIND_MEMBERREPLYLIST, findMemberReplyList);
}
