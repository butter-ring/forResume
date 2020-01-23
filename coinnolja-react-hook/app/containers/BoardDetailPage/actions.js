/*
 *
 * BoardDetailPage actions
 *
 */

import {
  DEFAULT_ACTION,
  LOAD_BOARD,
  LOAD_BOARD_SUCCESS,
  LOAD_BOARD_ERROR,
  LOAD_COMMENTS,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function boradLoad(boardId) {
  return {
    type: LOAD_BOARD,
    boardId,
  };
}

export function boradLoadSuccess(board) {
  return {
    type: LOAD_BOARD_SUCCESS,
    board,
  };
}

export function boradLoadError(error) {
  return {
    type: LOAD_BOARD_ERROR,
    error,
  };
}

export function commentsLoad(boardId, page, parentId) {
  return {
    type: LOAD_COMMENTS,
    boardId,
    page,
    parentId,
  };
}

export function commentsLoadSuccess(comments) {
  return {
    type: LOAD_COMMENTS_SUCCESS,
    comments,
  };
}

export function commentsLoadError(error) {
  return {
    type: LOAD_COMMENTS_ERROR,
    error,
  };
}
