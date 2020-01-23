import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the memberInfo state domain
 */

const selectMemberInfoDomain = state => state.memberInfo || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MemberInfo
 */

const makeSelectMemberInfo = () =>
  createSelector(
    selectMemberInfoDomain,
    substate => substate,
  );

export default makeSelectMemberInfo;
export { selectMemberInfoDomain };
