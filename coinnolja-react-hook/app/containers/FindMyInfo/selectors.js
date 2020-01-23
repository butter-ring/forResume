import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the findMyInfo state domain
 */

const selectFindMyInfoDomain = state => state.findMyInfo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FindMyInfo
 */

const makeSelectFindMyInfo = () =>
  createSelector(
    selectFindMyInfoDomain,
    substate => substate,
  );

export default makeSelectFindMyInfo;
export { selectFindMyInfoDomain };
