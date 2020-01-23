/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  SIGNIN_CHECK,
  VALID_SUCCESS,
  TO_PC,
  TO_MOBILE,
} from './constants';
export function signin(signToken) {
  return {
    type: SIGNIN,
    signToken,
  };
}

export function signinSuccess(data, accessToken, roles) {
  return {
    type: SIGNIN_SUCCESS,
    data,
    accessToken,
    roles,
  };
}
export function signinError(error) {
  return {
    type: SIGNIN_ERROR,
    error,
  };
}
export function signout() {
  // console.log('signout call action');
  return {
    type: SIGNOUT,
  };
}
export function signoutSuccess() {
  return {
    type: SIGNOUT_SUCCESS,
  };
}
export function signoutError() {
  return {
    type: SIGNOUT_ERROR,
  };
}
export function signinCheck() {
  return {
    type: SIGNIN_CHECK,
  };
}
export function validSuccess(roles) {
  return {
    type: VALID_SUCCESS,
    roles,
  };
}

export function loadPc() {
  return {
    type: TO_PC,
  };
}

export function loadMobile() {
  return {
    type: TO_MOBILE,
  };
}
