import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { MYQNA_LIST, MYQNA_NOTICE } from './constants';

import {
  myQnAListSuccess,
  myQnAListError,
  myQnANoticeSuccess,
  myQnANoticeError,
} from './actions';

// Individual exports for testing
export function* getMyQnAList(reqData) {
  // console.log('reqData Check~~~~~~~~~~~~~~~~~~~');
  // console.log(reqData);
  const { page } = reqData;
  // console.log(page);
  const requestURL = `/api/myqna?page=${page}`;
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log('saga.js response check');
    // console.log(response.data);
    yield put(myQnAListSuccess(response.data));
  } catch (err) {
    yield put(myQnAListError(err));
  }
}

export function* myQnANotice() {
  // console.log('reqData Check~~~~~~~~~~~~~~~~~~~');
  // console.log(reqData);
  const boardMasterId = 62;
  const requestURL = `/api/top/${boardMasterId}`;
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    console.log('saga.js response check');
    console.log(response.data);
    yield put(myQnANoticeSuccess(response.data));
  } catch (err) {
    yield put(myQnANoticeError(err));
  }
}

export default function* myQnASaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(MYQNA_LIST, getMyQnAList);
  yield takeLatest(MYQNA_NOTICE, myQnANotice);
}
