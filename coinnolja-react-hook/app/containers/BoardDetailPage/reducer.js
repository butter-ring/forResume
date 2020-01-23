/*
 *
 * BoardDetailPage reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  LOAD_BOARD,
  LOAD_BOARD_SUCCESS,
  LOAD_BOARD_ERROR,
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  boardDetail: false,
  comments: false,
};

/* eslint-disable default-case, no-param-reassign */
const boardDetailPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case LOAD_BOARD:
        draft.loading = true;
        draft.error = false;
        draft.boardDetail = false;
        break;
      case LOAD_BOARD_SUCCESS:
        draft.boardDetail = action.board;
        draft.loading = false;
        break;
      case LOAD_BOARD_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case LOAD_COMMENTS:
        draft.loading = true;
        draft.error = false;
        break;
      case LOAD_COMMENTS_SUCCESS:
        draft.comments = action.comments;
        draft.loading = false;
        break;
      case LOAD_COMMENTS_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default boardDetailPageReducer;
