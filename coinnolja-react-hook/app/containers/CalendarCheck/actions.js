/*
 *
 * CalendarCheck actions
 *
 */

import {
  DEFAULT_ACTION,
  ATTENDDAYGET_ALL,
  ATTENDDAYGET_SUCCESS,
  ATTENDDAYGET_ERROR,
  ATTEND_SAVE,
  ATTEND_SAVE_SUCCESS,
  ATTEND_SAVE_ERROR,
  ATTEND_LIST_ALL,
  ATTEND_LIST_SUCCESS,
  ATTEND_LIST_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function attendDayGet() {
  return {
    type: ATTENDDAYGET_ALL,
  };
}

export function attendDayGetSuccess(attend) {
  return {
    type: ATTENDDAYGET_SUCCESS,
    attend,
  };
}

export function attendDayGetError(error) {
  return {
    type: ATTENDDAYGET_ERROR,
    error,
  };
}

export function attendSave() {
  return {
    type: ATTEND_SAVE,
  };
}

export function attendSaveSuccess(memo) {
  return {
    type: ATTEND_SAVE_SUCCESS,
    memo,
  };
}

export function attendSaveError(error) {
  return {
    type: ATTEND_SAVE_ERROR,
    error,
  };
}

export function attendListAll() {
  return {
    type: ATTEND_LIST_ALL,
  };
}

export function attendListSuccess(attend) {
  return {
    type: ATTEND_LIST_SUCCESS,
    attend,
  };
}

export function attendListError(error) {
  return {
    type: ATTEND_LIST_ERROR,
    error,
  };
}
