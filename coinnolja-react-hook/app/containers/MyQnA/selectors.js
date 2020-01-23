import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myQnA state domain
 */

const selectMyQnADomain = state => state.myQnA || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyQnA
 */

const makeSelectMyQnA = () =>
  createSelector(
    selectMyQnADomain,
    substate => substate,
  );

export default makeSelectMyQnA;
export { selectMyQnADomain };
