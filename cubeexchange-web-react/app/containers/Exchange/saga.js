import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_ORDERBOOK } from './constants';
import { orderbookLoadSuccess, orderbookLoadError } from './actions';

export function* orderbookLoad(reqData) {
  // console.log(reqData);
  const { symbol } = reqData;
  const requestURL = `/api/orderbook/${symbol}`;
  try {
    const options = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, options);
    // console.log(response.data);
    yield put(orderbookLoadSuccess(response.data));
  } catch (err) {
    yield put(orderbookLoadError(err));
  }
}

export default function* exchangeSaga() {
  yield takeLatest(LOAD_ORDERBOOK, orderbookLoad);
}
