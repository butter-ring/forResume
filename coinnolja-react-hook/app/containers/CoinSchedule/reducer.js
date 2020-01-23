/*
 *
 * CoinSchedule reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  COINSCHEDULEGET_ALL,
  COINSCHEDULEGET_SUCCESS,
  COINSCHEDULEGET_ERROR,
} from './constants';

export const initialState = {
  coinschedule: false,
};

/* eslint-disable default-case, no-param-reassign */
const coinScheduleReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case COINSCHEDULEGET_ALL:
        console.log('********COINSCHEDULEGET_ALL reducer.js********');
        draft.loading = true;
        draft.error = false;
        break;
      case COINSCHEDULEGET_SUCCESS:
        console.log('********COINSCHEDULEGET_SUCCESS reducer.js********');
        draft.loading = false;
        draft.coinschedule = action.coinschedule;
        break;
      case COINSCHEDULEGET_ERROR:
        console.log('********COINSCHEDULEGET_ERROR reducer.js********');
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default coinScheduleReducer;
