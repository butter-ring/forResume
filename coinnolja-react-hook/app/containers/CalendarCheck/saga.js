import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { ATTENDDAYGET_ALL, ATTEND_LIST_ALL } from './constants';
// import { ATTENDDAYGET_ALL, ATTEND_SAVE, ATTEND_LIST_ALL } from './constants';
import {
  attendDayGetSuccess,
  attendDayGetError,
  // attendSaveSuccess,
  // attendSaveError,
  attendListSuccess,
  attendListError,
} from './actions';

// Individual exports for testing
export default function* calendarCheckSaga() {
  yield takeLatest(ATTENDDAYGET_ALL, attendDayGet);
  yield takeLatest(ATTEND_LIST_ALL, attendListAll);
  // yield takeLatest(ATTEND_SAVE, attendSave);
}

// 출석체크 데이터 가져오기
export function* attendDayGet() {
  const requestURL = `/api/attend/dayget`;

  try {
    const options = {
      method: 'GET',
      auth: true,
    };

    const response = yield call(request, requestURL, options);

    // console.log('//////// attendDayGet response 성공 ///////');
    // console.log(response.data);

    yield put(attendDayGetSuccess(response.data));
  } catch (err) {
    yield put(attendDayGetError(err));
  }
}

// 출석체크 목록 리스트 가져오기
export function* attendListAll() {
  const requestURL = `/api/attend/list`;

  try {
    const options = {
      method: 'GET',
      auth: true,
    };

    const response = yield call(request, requestURL, options);
    yield put(attendListSuccess(response.data));
  } catch (err) {
    yield put(attendListError(err));
  }
}

// 출첵 저장 - index.js 에서 처리
// export function* attendSave(memo) {
//   const requestURL = `/api/attend`;

//   const options = {
//     method: 'POST',
//     auth: true,
//     data: {
//       memo,
//     },
//   };
//   try {
//     // const response = request(`/api/attend`, options);
//     const response = yield call(request, requestURL, options);

//     yield put(attendSaveSuccess(response));
//   } catch (err) {
//     yield put(attendSaveError(err));
//     console.log(err.response);
//   }

// }
