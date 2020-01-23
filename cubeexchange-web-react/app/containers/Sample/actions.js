/*
 *
 * Sample actions
 *
 */

import {
  DEFAULT_ACTION,
  SAMPLE_FINDALL,
  SAMPLE_FINDALL_SUCCESS,
  SAMPLE_FINDALL_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function sampleFindAll() {
  return {
    type: SAMPLE_FINDALL,
  };
}

export function sampleFindAllSuccess(sample) {
  return {
    type: SAMPLE_FINDALL_SUCCESS,
    sample,
  };
}

export function sampleFindAllError(error) {
  return {
    type: SAMPLE_FINDALL_ERROR,
    error,
  };
}
