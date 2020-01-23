import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { SAMPLE_FINDALL } from './constants';

import { sampleFindAllSuccess, sampleFindAllError } from './actions';

// Individual exports for testing
export function* sampleFindAll() {
  const requestURL = '/api/sample';
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    console.log('response check!!!!!');
    console.log(response.data);
    yield put(sampleFindAllSuccess(response.data));
  } catch (err) {
    yield put(sampleFindAllError(err));
  }
}

export default function* sampleSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SAMPLE_FINDALL, sampleFindAll);
}
