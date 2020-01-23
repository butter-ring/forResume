import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_BOARD, LOAD_COMMENTS } from './constants';
import {
  boradLoadSuccess,
  boradLoadError,
  commentsLoadSuccess,
  commentsLoadError,
} from './actions';

export function* boardDetailLoad(reqData) {
  const { boardId } = reqData;
  const requestURL = `/api/board/${boardId}`;
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    // console.log(response.data);
    yield put(boradLoadSuccess(response.data));
  } catch (err) {
    yield put(boradLoadError(err));
  }
}

export function* commentsLoad(reqData) {
  const { boardId, page } = reqData;
  const requestURL = `/api/reply/${boardId}?page=${page}`;
  try {
    const options = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, options);
    // console.log(response.data);
    yield put(commentsLoadSuccess(response.data));
  } catch (err) {
    yield put(commentsLoadError(err));
  }
}
// Individual exports for testing
export default function* boardDetailPageSaga() {
  yield takeLatest(LOAD_BOARD, boardDetailLoad);
  yield takeLatest(LOAD_COMMENTS, commentsLoad);
}
