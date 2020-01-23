/*
 *
 * CalendarCheck reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  ATTENDDAYGET_ALL,
  ATTENDDAYGET_SUCCESS,
  ATTENDDAYGET_ERROR,
  ATTEND_SAVE,
  ATTEND_SAVE_SUCCESS,
  ATTEND_SAVE_ERROR,
  ATTEND_LIST_ALL,
  ATTEND_LIST_SUCCESS,
  ATTEND_LIST_ERROR,
} from './constants';

export const initialState = {
  attendDayData: false,
  attendList: false,
};

/* eslint-disable default-case, no-param-reassign */
const calendarCheckReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case ATTENDDAYGET_ALL:
        draft.loading = true;
        draft.error = false;
        break;
      case ATTENDDAYGET_SUCCESS:
        draft.loading = false;
        draft.attendDayData = action.attend;
        break;
      case ATTENDDAYGET_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case ATTEND_SAVE:
        draft.loading = true;
        draft.error = false;
        break;
      case ATTEND_SAVE_SUCCESS:
        draft.loading = false;
        draft.attend = action.attend;
        break;
      case ATTEND_SAVE_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
      case ATTEND_LIST_ALL:
        draft.loading = true;
        draft.error = false;
        draft.attendList = false;
        break;
      case ATTEND_LIST_SUCCESS:
        draft.loading = false;
        draft.attendList = action.attend;
        break;
      case ATTEND_LIST_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default calendarCheckReducer;
