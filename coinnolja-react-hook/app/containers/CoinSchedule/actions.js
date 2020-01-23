/*
 *
 * CoinSchedule actions
 *
 */

import {
  DEFAULT_ACTION,
  COINSCHEDULEGET_ALL,
  COINSCHEDULEGET_SUCCESS,
  COINSCHEDULEGET_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function coinScheduleGet() {
  return {
    type: COINSCHEDULEGET_ALL,
  };
}

export function coinScheduleGetSuccess(coinschedule) {
  return {
    type: COINSCHEDULEGET_SUCCESS,
    coinschedule,
  };
}

export function coinScheduleGetError(error) {
  return {
    type: COINSCHEDULEGET_ERROR,
    error,
  };
}
