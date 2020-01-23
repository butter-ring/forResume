/*
 *
 * Wallet actions
 *
 */

import {
  DEFAULT_ACTION,
  FIND_MYACCOUNT,
  FIND_MYACCOUNT_SUCCESS,
  FIND_MYACCOUNT_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function findMyAccount() {
  return {
    type: FIND_MYACCOUNT,
  };
}

export function findMyAccountSuccess(account) {
  return {
    type: FIND_MYACCOUNT_SUCCESS,
    account,
  };
}

export function findMyAccountError(error) {
  return {
    type: FIND_MYACCOUNT_ERROR,
    error,
  };
}
