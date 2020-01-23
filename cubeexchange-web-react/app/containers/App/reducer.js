import produce from 'immer';
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_SUCCESS2FA,
  SIGNIN_SUCCESSOTP,
  SIGNIN_ERROR,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  VALID_SUCCESS,
  TO_PC,
  TO_MOBILE,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    nickName: sessionStorage.getItem('nickName'),
    username: sessionStorage.getItem('username'),
    userId: sessionStorage.getItem('userId'),
    roles: sessionStorage.getItem('roles'),
    refresh: false,
  },
  userDataOtp: {
    username: '',
    userId: '',
    roles: '',
    accessToken: '',
    refresh: false,
    // nickName: '',
  },
  isSignin: sessionStorage.getItem('accessToken') && true,
  isPc: sessionStorage.getItem('isPc'),
  otpActive: false,
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNIN:
        console.log('::::::::::reducer.js SIGNIN:::::::::');
        draft.loading = true;
        draft.error = false;
        draft.currentUser = false;
        draft.userData.nickName = false;
        draft.userData.username = false;
        draft.userData.userId = false;
        draft.userData.roles = false;
        draft.isSignin = false;
        draft.otpActive = false;
        break;
      case SIGNIN_SUCCESSOTP:
        console.log('::::::::::reducer.js SIGNIN_SUCCESSOTP:::::::::');
        draft.isSignin = true;
        draft.otpActive = false;
        draft.error = false;
        draft.loading = true;
        break;
      case SIGNIN_SUCCESS:
        draft.isSignin = true;
        draft.otpActive = false;
        draft.userData.username = action.data.username;
        draft.userData.roles = action.roles;
        draft.userData.userId = action.data.id;
        draft.userData.nickName = action.data.nickName;
        draft.error = false;
        draft.loading = false;
        break;
      case SIGNIN_SUCCESS2FA:
        console.log(':::::SIGNIN_SUCCESS2FA:::::');
        draft.isSignin = false;
        draft.otpActive = true;
        draft.userDataOtp.username = action.data.username;
        draft.userDataOtp.userId = action.data.id;
        draft.userDataOtp.roles = action.roles;
        draft.userDataOtp.accessToken = action.accessToken;
        draft.error = false;
        draft.loading = false;
        break;
      case SIGNIN_ERROR:
        draft.isSignin = false;
        draft.otpActive = false;
        draft.userData.nickName = false;
        draft.userData.username = false;
        draft.userData.userId = false;
        draft.userData.roles = false;
        draft.error = action.error;
        draft.loading = false;
        // window.location.href = '/signin';
        break;
      case SIGNOUT:
        console.log('signout call reducer ㅠㅠ');
        draft.error = false;
        draft.loading = true;
        // window.location.href = '/';
        break;
      case SIGNOUT_SUCCESS:
        console.log('SIGNOUT_SUCCESS call reducer');
        draft.userData.nickName = false;
        draft.userData.username = false;
        draft.userData.userId = false;
        draft.userData.roles = false;
        draft.isSignin = false;
        draft.otpActive = false;
        draft.error = false;
        draft.loading = false;
        window.location.href = '/';
        break;
      case SIGNOUT_ERROR:
        console.log('signout err call reducer');
        draft.error = false;
        draft.isSignin = false;
        // draft.otpActive = false;
        break;
      case VALID_SUCCESS:
        console.log('VALID_SUCCESS call reducer');
        // draft.isSignin = false;
        draft.userData.roles = action.roles;
        draft.error = false;
        draft.loading = false;
        break;
      case TO_PC:
        console.log('::::::::::::::::isPc:::::::::::::::::::');
        sessionStorage.setItem('isPc', true);
        draft.isPc = true;
        window.location.href = '/';
        break;
      case TO_MOBILE:
        sessionStorage.removeItem('isPc');
        draft.isPc = false;
        break;
    }
  });

export default appReducer;
