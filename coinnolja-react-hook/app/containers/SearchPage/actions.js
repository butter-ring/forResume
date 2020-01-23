/*
 *
 * SearchPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_SEARCH,
  LOAD_SEARCH_SUCCESS,
  LOAD_SEARCH_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function searchLoad(page, searchVal) {
  return {
    type: LOAD_SEARCH,
    page,
    searchVal,
  };
}

export function searchLoadSuccess(searchResult) {
  return {
    type: LOAD_SEARCH_SUCCESS,
    searchResult,
  };
}

export function searchLoadError(error) {
  return {
    type: LOAD_SEARCH_ERROR,
    error,
  };
}
