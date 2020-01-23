import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_SEARCH } from './constants';
import { searchLoadSuccess, searchLoadError } from './actions';

export function* searchLoad(reqData) {
  // console.log(reqData);
  const { page, searchVal } = reqData;
  const requestURL = `/api/search?page=${page}&searchVal=${searchVal}`;
  try {
    const options = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, options);
    console.log(response.data);
    yield put(searchLoadSuccess(response.data));
  } catch (err) {
    yield put(searchLoadError(err));
  }
}
// Individual exports for testing
export default function* searchPageSaga() {
  yield takeLatest(LOAD_SEARCH, searchLoad);
}
