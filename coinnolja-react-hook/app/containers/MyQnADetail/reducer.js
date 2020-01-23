/*
 *
 * MyQnADetail reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  MYQNA_DETAIL,
  MYQNA_DETAIL_SUCCESS,
  MYQNA_DETAIL_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  myQnADetail: false,
};

/* eslint-disable default-case, no-param-reassign */
const myQnADetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case MYQNA_DETAIL:
        console.log('reducer!!!!!!!!!!!!!!!!!!!!!!!!');
        draft.loading = true;
        draft.error = false;
        draft.myQnADetail = false;
        break;
      case MYQNA_DETAIL_SUCCESS:
        draft.myQnADetail = action.myQnADetail;
        draft.loading = false;
        break;
      case MYQNA_DETAIL_ERROR:
        draft.error = action.error;
        draft.loading = false;
    }
  });

export default myQnADetailReducer;
