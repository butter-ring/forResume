/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentUser = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentUser,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectOtpActive = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.otpActive,
  );
const makeSelectSignin = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isSignin,
  );
const makeSelectUserData = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData,
  );

const makeSelectUserDataOtp = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userDataOtp,
  );

const makeSelectRepos = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.userData.repositories,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

const makeSelectIsPc = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.isPc,
  );

export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
  makeSelectError,
  makeSelectSignin,
  makeSelectOtpActive,
  makeSelectRepos,
  makeSelectLocation,
  makeSelectUserData,
  makeSelectUserDataOtp,
  makeSelectIsPc,
};
