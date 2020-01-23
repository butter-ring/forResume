/*
 *
 * Account actions
 *
 */

import {
  DEFAULT_ACTION,
  FIND_MYINFO,
  FIND_MYINFO_SUCCESS,
  FIND_MYINFO_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function findMyInfo() {
  return {
    type: FIND_MYINFO,
  };
}

export function findMyInfoSuccess(account) {
  return {
    type: FIND_MYINFO_SUCCESS,
    account,
  };
}

export function findMyInfoError(error) {
  return {
    type: FIND_MYINFO_ERROR,
    error,
  };
}
