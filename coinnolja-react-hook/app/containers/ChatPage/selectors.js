import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the chatPage state domain
 */

const selectChatPageDomain = state => state.chatPage || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ChatPage
 */

const makeSelectChatPage = () =>
  createSelector(
    selectChatPageDomain,
    substate => substate,
  );

export default makeSelectChatPage;
export { selectChatPageDomain };
