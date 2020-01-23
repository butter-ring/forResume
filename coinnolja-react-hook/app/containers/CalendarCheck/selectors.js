import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the calendarCheck state domain
 */

const selectCalendarCheckDomain = state => state.calendarCheck || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by CalendarCheck
 */

const makeSelectCalendarCheck = () =>
  createSelector(
    selectCalendarCheckDomain,
    substate => substate,
  );

export default makeSelectCalendarCheck;
export { selectCalendarCheckDomain };
