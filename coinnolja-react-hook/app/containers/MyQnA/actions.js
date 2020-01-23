/*
 *
 * MyQnA actions
 *
 */

import {
  DEFAULT_ACTION,
  MYQNA_LIST,
  MYQNA_LIST_SUCCESS,
  MYQNA_LIST_ERROR,
  MYQNA_NOTICE,
  MYQNA_NOTICE_SUCCESS,
  MYQNA_NOTICE_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getMyQnAList(page) {
  // console.log('action.js');
  // console.log(page);
  return {
    type: MYQNA_LIST,
    page,
  };
}

export function myQnAListSuccess(myQnA) {
  // console.log('actions.js myQnA');
  // console.log(myQnA);
  return {
    type: MYQNA_LIST_SUCCESS,
    myQnA,
  };
}

export function myQnAListError(error) {
  return {
    type: MYQNA_LIST_ERROR,
    error,
  };
}

export function myQnANotice() {
  return {
    type: MYQNA_NOTICE,
  };
}

export function myQnANoticeSuccess(tops) {
  return {
    type: MYQNA_NOTICE_SUCCESS,
    tops,
  };
}

export function myQnANoticeError(error) {
  return {
    type: MYQNA_NOTICE_ERROR,
    error,
  };
}
