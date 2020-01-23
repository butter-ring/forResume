import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the indexSettingPage state domain
 */

const selectIndexSettingPageDomain = state =>
  state.indexSettingPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by IndexSettingPage
 */

const makeSelectIndexSettingPage = () =>
  createSelector(
    selectIndexSettingPageDomain,
    substate => substate,
  );

export default makeSelectIndexSettingPage;
export { selectIndexSettingPageDomain };
