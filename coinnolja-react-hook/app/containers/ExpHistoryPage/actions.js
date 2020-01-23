/*
 *
 * ExpHistoryPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_HISTORY,
  LOAD_HISTORY_SUCCESS,
  LOAD_HISTORY_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function historyLoad(page) {
  return {
    type: LOAD_HISTORY,
    page,
  };
}

export function historyLoadSuccess(history) {
  return {
    type: LOAD_HISTORY_SUCCESS,
    history,
  };
}

export function historyLoadError(error) {
  return {
    type: LOAD_HISTORY_ERROR,
    error,
  };
}
