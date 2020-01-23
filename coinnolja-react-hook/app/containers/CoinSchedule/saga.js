import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { COINSCHEDULEGET_ALL } from './constants';
import { coinScheduleGetSuccess, coinScheduleGetError } from './actions';

// Individual exports for testing
export default function* coinScheduleSaga() {
  yield takeLatest(COINSCHEDULEGET_ALL, coinScheduleGet);
  // See example in containers/HomePage/saga.js
}

// 코인일정 데이터 가져오기
export function* coinScheduleGet() {
  const requestURL = `/api/coinschedule`;

  try {
    const options = {
      method: 'GET',
    };

    const response = yield call(request, requestURL, options);

    // console.log('//////// coinScheduleGet response 성공 ///////');
    // console.log(response.data);

    yield put(coinScheduleGetSuccess(response.data));
  } catch (err) {
    yield put(coinScheduleGetError(err));
  }
}
