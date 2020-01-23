import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { FIND_MYACCOUNT } from './constants';
import { findMyAccountSuccess, findMyAccountError } from './actions';

// Individual exports for testing
// export function* findMyAccount() {
//   console.log(':::findMyAccount():::');
//   const requestURL = '/api/account/asset';
//   try {
//     const options = {
//       method: 'POST',
//       auth: true,
//     };
//     const response = yield call(request, requestURL, options);
//     yield put(findMyAccountSuccess(response.data));
//   } catch (err) {
//     yield put(findMyAccountError(err));
//   }
// }

export function* findMyAccount() {
  console.log(':::findMyAccount():::');
  const requestURL = '/api/wallet/asset';
  try {
    const options = {
      method: 'GET',
      auth: true,
    };
    const response = yield call(request, requestURL, options);
    yield put(findMyAccountSuccess(response.data));
  } catch (err) {
    yield put(findMyAccountError(err));
  }
}

export default function* walletSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(FIND_MYACCOUNT, findMyAccount);
}
