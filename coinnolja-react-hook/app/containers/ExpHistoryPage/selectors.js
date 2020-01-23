import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the expHistoryPage state domain
 */

const selectExpHistoryPageDomain = state =>
  state.expHistoryPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectHistory = () =>
  createSelector(
    selectExpHistoryPageDomain,
    substate => substate.history,
  );
const makeSelectError = () =>
  createSelector(
    selectExpHistoryPageDomain,
    subState => subState.error,
  );

const makeSelectLoading = () =>
  createSelector(
    selectExpHistoryPageDomain,
    subState => subState.loading,
  );
/**
 * Default selector used by ExpHistoryPage
 */

const makeSelectExpHistoryPage = () =>
  createSelector(
    selectExpHistoryPageDomain,
    substate => substate,
  );

export default makeSelectExpHistoryPage;
export {
  selectExpHistoryPageDomain,
  makeSelectExpHistoryPage,
  makeSelectHistory,
  makeSelectError,
  makeSelectLoading,
};
