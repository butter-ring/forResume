import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_BOARDS, LOAD_TOPS } from './constants';
import {
  boradsLoadSuccess,
  boradsLoadError,
  topsLoadSuccess,
  topsLoadError,
} from './actions';

export function* boardLoad(reqData) {
  // console.log(reqData);
  const { boardMasterId, page, searchKey, searchVal } = reqData;
  const requestURL = `/api/board?boardMasterId=${boardMasterId}&page=${page}&searchKey=${searchKey}&searchVal=${searchVal}`;
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log(response.data);
    yield put(boradsLoadSuccess(response.data));
  } catch (err) {
    yield put(boradsLoadError(err));
  }
}
export function* topsLoad(reqData) {
  // console.log(reqData);
  const { boardMasterId } = reqData;
  const requestURL = `/api/top/${boardMasterId}`;
  try {
    const options = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, options);
    // console.log(response.data);
    yield put(topsLoadSuccess(response.data));
  } catch (err) {
    yield put(topsLoadError(err));
  }
}

export default function* boardPageSaga() {
  yield takeLatest(LOAD_BOARDS, boardLoad);
  yield takeLatest(LOAD_TOPS, topsLoad);
}
