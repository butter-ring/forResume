import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the orderBookPage state domain
 */

const selectOrderBookPageDomain = state => state.orderBookPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by OrderBookPage
 */

const makeSelectOrderBookPage = () =>
  createSelector(
    selectOrderBookPageDomain,
    substate => substate,
  );

export default makeSelectOrderBookPage;
export { selectOrderBookPageDomain };
