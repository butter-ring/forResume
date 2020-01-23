/*
 *
 * SideBar actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_MY_INFO,
  LOAD_MY_INFO_SUCCESS,
  LOAD_MY_INFO_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function myinfoLoad() {
  return {
    type: LOAD_MY_INFO,
  };
}

export function myinfoLoadSuccess() {
  return {
    type: LOAD_MY_INFO_SUCCESS,
  };
}

export function myinfoLoadError() {
  return {
    type: LOAD_MY_INFO_ERROR,
  };
}
