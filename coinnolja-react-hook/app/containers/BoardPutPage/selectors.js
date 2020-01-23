import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the boardPutPage state domain
 */

const selectBoardPutPageDomain = state => state.boardPutPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BoardPutPage
 */

const makeSelectBoardPutPage = () =>
  createSelector(
    selectBoardPutPageDomain,
    substate => substate,
  );

export default makeSelectBoardPutPage;
export { selectBoardPutPageDomain };
