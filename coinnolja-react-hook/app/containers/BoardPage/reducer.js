/*
 *
 * BoardPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_BOARDS,
  LOAD_BOARDS_SUCCESS,
  LOAD_BOARDS_ERROR,
  LOAD_TOPS,
  LOAD_TOPS_SUCCESS,
  LOAD_TOPS_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  boardList: false,
  tops: false,
};

/* eslint-disable default-case, no-param-reassign */
const boardPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_BOARDS:
        draft.loading = true;
        draft.error = false;
        draft.boardList = false;
        break;
      case LOAD_BOARDS_SUCCESS:
        draft.boardList = action.boards;
        draft.loading = false;
        break;
      case LOAD_BOARDS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOAD_TOPS:
        draft.loading = true;
        draft.error = false;
        draft.tops = false;
        break;
      case LOAD_TOPS_SUCCESS:
        draft.tops = action.tops;
        draft.loading = false;
        break;
      case LOAD_TOPS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default boardPageReducer;
