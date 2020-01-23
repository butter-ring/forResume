import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_HISTORY } from './constants';
import { historyLoadSuccess, historyLoadError } from './actions';

export function* historyLoad(reqData) {
  // console.log(reqData);
  const { page } = reqData;
  const requestURL = `/api/experience?page=${page}&pagesize=5`;
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log(response.data);
    yield put(historyLoadSuccess(response.data));
  } catch (err) {
    yield put(historyLoadError(err));
  }
}
// Individual exports for testing
export default function* expHistoryPageSaga() {
  yield takeLatest(LOAD_HISTORY, historyLoad);
}
