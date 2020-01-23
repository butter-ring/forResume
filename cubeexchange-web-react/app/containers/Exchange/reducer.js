/*
 *
 * Exchange reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_ORDERBOOK,
  LOAD_ORDERBOOK_SUCCESS,
  LOAD_ORDERBOOK_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  orderbook: false,
};

/* eslint-disable default-case, no-param-reassign */
const exchangeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_ORDERBOOK:
        draft.loading = true;
        draft.error = false;
        draft.orderbook = false;
        break;
      case LOAD_ORDERBOOK_SUCCESS:
        draft.orderbook = action.orderbook;
        draft.loading = false;
        break;
      case LOAD_ORDERBOOK_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default exchangeReducer;
