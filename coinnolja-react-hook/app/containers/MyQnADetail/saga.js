import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { MYQNA_DETAIL } from './constants';
import { myQnADetailSuccess, myQnADetailError } from './actions';

// Individual exports for testing
export function* GetmyQnADetail(reqData) {
  console.log('check reqData!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(reqData);
  const { qnaId } = reqData;
  console.log(qnaId);
  const requestURL = `/api/myqna/detail/${qnaId}`;
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    console.log('saga.js response check');
    console.log(response);
    yield put(myQnADetailSuccess(response.data));
  } catch (err) {
    yield put(myQnADetailError(err));
  }
}
export default function* myQnADetailSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(MYQNA_DETAIL, GetmyQnADetail);
}
