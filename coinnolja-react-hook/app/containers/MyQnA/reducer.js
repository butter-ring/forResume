/*
 *
 * MyQnA reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  MYQNA_LIST,
  MYQNA_LIST_SUCCESS,
  MYQNA_LIST_ERROR,
  MYQNA_NOTICE,
  MYQNA_NOTICE_SUCCESS,
  MYQNA_NOTICE_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  myQnA: false,
  tops: false,
};

/* eslint-disable default-case, no-param-reassign */
const myQnAReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case MYQNA_LIST:
        draft.loading = true;
        draft.error = false;
        break;
      case MYQNA_LIST_SUCCESS:
        draft.loading = false;
        draft.myQnA = action.myQnA;
        break;
      case MYQNA_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case MYQNA_NOTICE:
        draft.loading = true;
        draft.error = false;
        break;
      case MYQNA_NOTICE_SUCCESS:
        draft.loading = false;
        draft.tops = action.tops;
        break;
      case MYQNA_NOTICE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default myQnAReducer;
