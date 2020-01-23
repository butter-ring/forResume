import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the boardDetailPage state domain
 */

const selectBoardDetailPageDomain = state =>
  state.boardDetailPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectBoardDetail = () =>
  createSelector(
    selectBoardDetailPageDomain,
    substate => substate.boardDetail,
  );
const makeSelectBoardDetailError = () =>
  createSelector(
    selectBoardDetailPageDomain,
    subState => subState.error,
  );

const makeSelectBoardDetailLoading = () =>
  createSelector(
    selectBoardDetailPageDomain,
    subState => subState.loading,
  );

const makeSelectComments = () =>
  createSelector(
    selectBoardDetailPageDomain,
    substate => substate.comments,
  );
/**
 * Default selector used by BoardDetailPage
 */

const makeSelectBoardDetailPage = () =>
  createSelector(
    selectBoardDetailPageDomain,
    substate => substate,
  );

export default makeSelectBoardDetailPage;
export {
  selectBoardDetailPageDomain,
  makeSelectBoardDetailPage,
  makeSelectBoardDetail,
  makeSelectBoardDetailError,
  makeSelectBoardDetailLoading,
  makeSelectComments,
};
