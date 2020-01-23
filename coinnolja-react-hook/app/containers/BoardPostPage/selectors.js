import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the boardPostPage state domain
 */

const selectBoardPostPageDomain = state => state.boardPostPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BoardPostPage
 */

const makeSelectBoardPostPage = () =>
  createSelector(
    selectBoardPostPageDomain,
    substate => substate,
  );

export default makeSelectBoardPostPage;
export { selectBoardPostPageDomain };
