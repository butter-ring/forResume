import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the searchPage state domain
 */

const selectSearchPageDomain = state => state.searchPage || initialState;

/**
 * Other specific selectors
 */
const makeSelectSearchResult = () =>
  createSelector(
    selectSearchPageDomain,
    substate => substate.searchResult,
  );
const makeSelectError = () =>
  createSelector(
    selectSearchPageDomain,
    subState => subState.error,
  );

const makeSelectLoading = () =>
  createSelector(
    selectSearchPageDomain,
    subState => subState.loading,
  );
/**
 * Default selector used by SearchPage
 */

const makeSelectSearchPage = () =>
  createSelector(
    selectSearchPageDomain,
    substate => substate,
  );

export default makeSelectSearchPage;
export {
  selectSearchPageDomain,
  makeSelectSearchPage,
  makeSelectSearchResult,
  makeSelectError,
  makeSelectLoading,
};
