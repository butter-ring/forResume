/*
 *
 * BoardPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_BOARDS,
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_ERROR,
  LOAD_TOPS,
  LOAD_TOPS_SUCCESS,
  LOAD_TOPS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function boradsLoad(boardMasterId, page, searchKey, searchVal) {
  return {
    type: LOAD_BOARDS,
    boardMasterId,
    page,
    searchKey,
    searchVal,
  };
}

export function boradsLoadSuccess(boards) {
  return {
    type: LOAD_BOARDS_SUCCESS,
    boards,
  };
}

export function boradsLoadError(error) {
  return {
    type: LOAD_BOARDS_ERROR,
    error,
  };
}

export function topsLoad(boardMasterId) {
  return {
    type: LOAD_TOPS,
    boardMasterId,
  };
}

export function topsLoadSuccess(tops) {
  return {
    type: LOAD_TOPS_SUCCESS,
    tops,
  };
}

export function topsLoadError(error) {
  return {
    type: LOAD_TOPS_ERROR,
    error,
  };
}
