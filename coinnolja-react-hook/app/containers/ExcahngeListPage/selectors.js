import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the excahngeListPage state domain
 */

const selectExcahngeListPageDomain = state =>
  state.excahngeListPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ExcahngeListPage
 */

const makeSelectExcahngeListPage = () =>
  createSelector(
    selectExcahngeListPageDomain,
    substate => substate,
  );

export default makeSelectExcahngeListPage;
export { selectExcahngeListPageDomain };
