import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the boardPage state domain
 */

const selectBoardPageDomain = state => state.boardPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectBoardList = () =>
  createSelector(
    selectBoardPageDomain,
    substate => substate.boardList,
  );
const makeSelectError = () =>
  createSelector(
    selectBoardPageDomain,
    subState => subState.error,
  );

const makeSelectLoading = () =>
  createSelector(
    selectBoardPageDomain,
    subState => subState.loading,
  );

const makeSelectTops = () =>
  createSelector(
    selectBoardPageDomain,
    substate => substate.tops,
  );
/**
 * Default selector used by BoardPage
 */
const makeSelectBoardPage = () =>
  createSelector(
    selectBoardPageDomain,
    substate => substate,
  );

export default makeSelectBoardPage;
export {
  selectBoardPageDomain,
  makeSelectBoardPage,
  makeSelectBoardList,
  makeSelectError,
  makeSelectLoading,
  makeSelectTops,
};
