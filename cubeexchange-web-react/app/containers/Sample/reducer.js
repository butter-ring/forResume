/*
 *
 * Sample reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SAMPLE_FINDALL,
  SAMPLE_FINDALL_SUCCESS,
  SAMPLE_FINDALL_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  error: false,
  sample: false,
};

/* eslint-disable default-case, no-param-reassign */
const sampleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SAMPLE_FINDALL:
        draft.loading = true;
        draft.error = false;
        break;
      case SAMPLE_FINDALL_SUCCESS:
        draft.loading = false;
        draft.sample = action.sample;
        break;
      case SAMPLE_FINDALL_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default sampleReducer;
