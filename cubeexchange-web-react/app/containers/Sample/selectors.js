import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the sample state domain
 */

const selectSampleDomain = state => state.sample || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Sample
 */

const makeSelectSample = () =>
  createSelector(
    selectSampleDomain,
    substate => substate,
  );

export default makeSelectSample;
export { selectSampleDomain };
