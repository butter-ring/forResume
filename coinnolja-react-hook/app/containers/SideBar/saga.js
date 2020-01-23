import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { SIGNIN, SIGNOUT } from 'containers/App/constants';
import {
  signinSuccess,
  signinError,
  signoutSuccess,
  signoutError,
} from 'containers/App/actions';

export function* signin(reqData) {
  // console.log(reqData);

  const requestURL = `/auth/signin`;
  try {
    const options = {
      method: 'GET',
      basicAuth: `Basic ${reqData.signToken}`,
      auth: false,
    };
    const response = yield call(request, requestURL, options);
    console.log(response.data);
    // console.log(response.headers.authorization);
    const { nickName, profileImageUrl, level } = response.data;
    localStorage.setItem('accessToken', response.headers.authorization);
    const base64Url = response.headers.authorization.split('.')[1];
    const decodedValue = JSON.parse(window.atob(base64Url));
    localStorage.setItem('username', decodedValue.sub);
    localStorage.setItem('roles', decodedValue.roles);
    localStorage.setItem('userId', decodedValue.userId);
    localStorage.setItem('nickName', nickName);
    localStorage.setItem('profileImageUrl', profileImageUrl);
    localStorage.setItem('memberLevel', level.memberLevel);
    localStorage.setItem('nextExperience', level.nextExperience);
    localStorage.setItem('memberExperience', level.memberExperience);
    // console.log(level.memberLevel);
    yield put(
      signinSuccess(
        response.data,
        response.headers.authorization,
        decodedValue.roles,
      ),
    );
  } catch (err) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImageUrl');
    localStorage.removeItem('memberLevel');
    localStorage.removeItem('nextExperience');
    localStorage.removeItem('memberExperience');
    yield put(signinError(err));
  }
}

export function* signout() {
  // console.log('signout call saga');
  try {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    localStorage.removeItem('userId');
    localStorage.removeItem('profileImageUrl');
    localStorage.removeItem('memberLevel');
    localStorage.removeItem('nextExperience');
    localStorage.removeItem('memberExperience');
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
}
