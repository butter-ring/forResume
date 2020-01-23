/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectUsername = () =>
  createSelector(
    selectHome,
    homeState => homeState.username,
  );

const makeSelectHome = () =>
  createSelector(
    selectHome,
    substate => substate,
  );

export default makeSelectHome;

export { selectHome, makeSelectUsername, makeSelectHome };
