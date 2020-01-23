import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the myPage state domain
 */

const selectMyPageDomain = state => state.myPage || initialState;

/**
 * Other specific selectors
 */

const makeSelectMyPageBoardList = () =>
  createSelector(
    selectMyPageDomain,
    substate => substate.myBoard,
  );
const makeSelectMyPageReplyList = () =>
  createSelector(
    selectMyPageDomain,
    substate => substate.myReply,
  );

const makeSelectNoteList = () =>
  createSelector(
    selectMyPageDomain,
    substate => substate.noteList,
  );

const makeSelectFollowList = () =>
  createSelector(
    selectMyPageDomain,
    substate => substate.followList,
  );

const makeSelectMyProfileImage = () =>
  createSelector(
    selectMyPageDomain,
    substate => substate.profileImageUrl,
  );

/**
 * Default selector used by MyPage
 */

const makeSelectMyPage = () =>
  createSelector(
    selectMyPageDomain,
    substate => substate,
  );
export default makeSelectMyPage;
export {
  selectMyPageDomain,
  makeSelectMyPage,
  makeSelectMyPageBoardList,
  makeSelectMyPageReplyList,
  makeSelectNoteList,
  makeSelectFollowList,
  makeSelectMyProfileImage,
};
