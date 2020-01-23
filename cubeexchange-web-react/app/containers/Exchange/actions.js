/*
 *
 * Exchange actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_ORDERBOOK,
  LOAD_ORDERBOOK_SUCCESS,
  LOAD_ORDERBOOK_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function orderbookLoad(symbol) {
  return {
    type: LOAD_ORDERBOOK,
    symbol,
  };
}
export function orderbookLoadSuccess(orderbook) {
  return {
    type: LOAD_ORDERBOOK_SUCCESS,
    orderbook,
  };
}

export function orderbookLoadError(error) {
  return {
    type: LOAD_ORDERBOOK_ERROR,
    error,
  };
}
