import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { FIND_MYINFO } from './constants';

import { findMyInfoSuccess, findMyInfoError } from './actions';

// Individual exports for testing
export function* findMyInfo() {
  const requestURL = '/api/account';
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    yield put(findMyInfoSuccess(response.data));
  } catch (err) {
    yield put(findMyInfoError(err));
  }
}

export default function* accountSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FIND_MYINFO, findMyInfo);
}
