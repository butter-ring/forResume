import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the coinSchedule state domain
 */

const selectCoinScheduleDomain = state => state.coinSchedule || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CoinSchedule
 */

const makeSelectCoinSchedule = () =>
  createSelector(
    selectCoinScheduleDomain,
    substate => substate,
  );

export default makeSelectCoinSchedule;
export { selectCoinScheduleDomain };
