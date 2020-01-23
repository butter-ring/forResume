import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the emailVaildPage state domain
 */

const selectEmailVaildPageDomain = state =>
  state.emailVaildPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EmailVaildPage
 */

const makeSelectEmailVaildPage = () =>
  createSelector(
    selectEmailVaildPageDomain,
    substate => substate,
  );

export default makeSelectEmailVaildPage;
export { selectEmailVaildPageDomain };
