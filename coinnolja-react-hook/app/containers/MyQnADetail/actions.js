/*
 *
 * MyQnADetail actions
 *
 */

import {
  DEFAULT_ACTION,
  MYQNA_DETAIL,
  MYQNA_DETAIL_SUCCESS,
  MYQNA_DETAIL_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function GetmyQnADetail(qnaId) {
  return {
    type: MYQNA_DETAIL,
    qnaId,
  };
}

export function myQnADetailSuccess(myQnADetail) {
  return {
    type: MYQNA_DETAIL_SUCCESS,
    myQnADetail,
  };
}

export function myQnADetailError(error) {
  return {
    type: MYQNA_DETAIL_ERROR,
    error,
  };
}
