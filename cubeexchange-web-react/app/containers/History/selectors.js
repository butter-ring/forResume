import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the history state domain
 */

const selectHistoryDomain = state => state.history || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by History
 */

const makeSelectHistory = () =>
  createSelector(
    selectHistoryDomain,
    substate => substate,
  );

export default makeSelectHistory;
export { selectHistoryDomain };
