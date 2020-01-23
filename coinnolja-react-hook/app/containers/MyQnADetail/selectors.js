import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myQnADetail state domain
 */

const selectMyQnADetailDomain = state => state.myQnADetail || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyQnADetail
 */

const makeSelectMyQnADetail = () =>
  createSelector(
    selectMyQnADetailDomain,
    substate => substate,
  );

export default makeSelectMyQnADetail;
export { selectMyQnADetailDomain };
