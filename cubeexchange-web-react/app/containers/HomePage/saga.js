/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
// import { LOAD_REPOS } from 'containers/App/constants';
// import { reposLoaded, repoLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { FINDALL_COINMARKETS } from './constants';
import { findAllCoinMarketsSuccess, findAllCoinMarketsError } from './actions';
// import { makeSelectUsername } from 'containers/HomePage/selectors';

export function* findAllCoinMarkets(reqData) {
  // console.log('reqData@@@@@@@@@@@@@@@@@@@@@@@@@@@22', reqData);
  let currency = '';
  if (reqData.value === 0) {
    currency = 'krw';
  } else if (reqData.value === 1) {
    currency = 'usd';
  } else {
    currency = 'btc';
  }
  const requestURL = `/api/coinmarket/${currency}`;
  try {
    const options = {
      method: 'GET',
    };
    const response = yield call(request, requestURL, options);
    // console.log('check response.data============', response.data);
    yield put(findAllCoinMarketsSuccess(response.data));
  } catch (err) {
    yield put(findAllCoinMarketsError(err));
  }
}

export default function* homePageSaga() {
  yield takeLatest(FINDALL_COINMARKETS, findAllCoinMarkets);
}
