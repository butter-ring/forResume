import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
// import history from 'utils/history';
import { SIGNIN, SIGNIN_SUCCESSOTP, SIGNOUT } from './constants';
import {
  signinSuccess,
  signinSuccess2fa,
  signinError,
  signoutSuccess,
  signoutError,
} from './actions';

export function* signin(reqData) {
  const requestURL = `/auth/signin`;
  try {
    const options = {
      method: 'GET',
      basicAuth: `Basic ${reqData.signToken}`,
      auth: false,
    };
    const response = yield call(request, requestURL, options);

    // OTP 인증 안했을경우 로그인
    if (response.data.authKeyactive === false) {
      console.log('OTP 설정 안했음 그냥 로그인 절차');
      sessionStorage.setItem('accessToken', response.headers.authorization);
      const base64Url = response.headers.authorization.split('.')[1];
      const decodedValue = JSON.parse(window.atob(base64Url));
      sessionStorage.setItem('username', decodedValue.sub);
      sessionStorage.setItem('roles', decodedValue.roles);
      sessionStorage.setItem('userId', decodedValue.userId);
      // const { nickName } = response.data;
      // localStorage.setItem('nickName', nickName);
      yield put(
        signinSuccess(
          response.data,
          response.headers.authorization,
          decodedValue.roles,
        ),
      );
    } else if (response.data.authKeyactive === true) {
      // OTP 인증 했을경우 2단계 로그인
      console.log('OTP 인증 로그인 절차');
      const base64Url = response.headers.authorization.split('.')[1];
      const decodedValue = JSON.parse(window.atob(base64Url));
      yield put(
        signinSuccess2fa(
          response.data,
          response.headers.authorization,
          decodedValue.roles,
        ),
      );
    }
  } catch (err) {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('nickName');
    // console.log(err);
    yield put(signinError(err));
  }
}

export function* signinotp(reqData) {
  console.log('signinotpsigninotpsigninotp!!! SAGA');
  const requestURL = `/auth/signin`;
  try {
    const options = {
      method: 'GET',
      basicAuth: `Basic ${reqData.signToken}`,
      auth: false,
    };
    const response = yield call(request, requestURL, options);
    console.log('OTP 로그인 성공!!! SAGA');
    sessionStorage.setItem('accessToken', response.headers.authorization);
    const base64Url = response.headers.authorization.split('.')[1];
    const decodedValue = JSON.parse(window.atob(base64Url));
    sessionStorage.setItem('username', decodedValue.sub);
    sessionStorage.setItem('roles', decodedValue.roles);
    sessionStorage.setItem('userId', decodedValue.userId);
    // const { nickName } = response.data;
    // localStorage.setItem('nickName', nickName);
    yield put(
      signinSuccess(
        response.data,
        response.headers.authorization,
        decodedValue.roles,
      ),
    );
  } catch (err) {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('nickName');
    // console.log(err);
    yield put(signinError(err));
  }
}

export function* signout() {
  // console.log('signout call saga ㅜㅜ ');
  try {
    console.log('::: 로그아웃 SAGA 에서 삭제 :::::');
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('roles');
    sessionStorage.removeItem('userId');
    // localStorage.removeItem('nickName');
    yield put(signoutSuccess());
  } catch (err) {
    yield put(signoutError(err));
  }
}

// Individual exports for testing
export default function* sideBarSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(SIGNIN, signin);
  yield takeLatest(SIGNOUT, signout);
  yield takeLatest(SIGNIN_SUCCESSOTP, signinotp);
}
