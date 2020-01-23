import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the notice state domain
 */

const selectNoticeDomain = state => state.notice || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Notice
 */

const makeSelectNotice = () =>
  createSelector(
    selectNoticeDomain,
    substate => substate,
  );

export default makeSelectNotice;
export { selectNoticeDomain };
