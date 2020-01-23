/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
  SIGNIN,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNOUT,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  VALID_SUCCESS,
  TO_PC,
  TO_MOBILE,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  error: false,
  currentUser: false,
  userData: {
    nickName: localStorage.getItem('nickName'),
    username: localStorage.getItem('username'),
    userId: localStorage.getItem('userId'),
    memberLevel: parseInt(localStorage.getItem('memberLevel'), 0),
    roles: localStorage.getItem('roles'),
    profileImageUrl: localStorage.getItem('profileImageUrl'),
    nextExperience: parseInt(localStorage.getItem('nextExperience'), 0),

    memberExperience: parseInt(localStorage.getItem('memberExperience'), 0),
    experienceRate: localStorage.getItem('experienceRate'),
    refresh: false,
  },
  isSignin: localStorage.getItem('accessToken') && true,
  isPc: localStorage.getItem('isPc'),
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case SIGNIN:
        draft.loading = true;
        draft.error = false;
        draft.currentUser = false;
        draft.userData.nickName = false;
        draft.userData.username = false;
        draft.userData.userId = false;
        draft.userData.memberLevel = false;
        draft.userData.roles = false;
        draft.isSignin = false;
        break;
      case SIGNIN_SUCCESS:
        // console.log(action.data);
        // console.log(action.data.id);
        console.log(action.data);
        draft.isSignin = true;
        draft.userData.username = action.data.username;
        draft.userData.roles = action.roles;
        draft.userData.userId = action.data.id;
        draft.userData.nickName = action.data.nickName;
        draft.userData.memberLevel = action.data.level.memberLevel;
        draft.userData.profileImageUrl = action.data.profileImageUrl;
        draft.userData.nextExperience = action.data.level.nextExperience;
        draft.userData.memberExperience = action.data.level.memberExperience;
        draft.userData.experienceRate = action.data.level.experienceRate;

        draft.error = false;
        draft.loading = false;

        break;
      case SIGNIN_ERROR:
        draft.userData.nickName = false;
        draft.userData.username = false;
        draft.userData.userId = false;
        draft.userData.memberLevel = false;
        draft.userData.roles = false;
        draft.error = action.error;
        draft.loading = false;
        break;
      case SIGNOUT:
        // signout
        // console.log('signout call reducer');
        draft.error = false;
        draft.loading = true;
        break;
      case SIGNOUT_SUCCESS:
        draft.userData.nickName = false;
        draft.userData.username = false;
        draft.userData.userId = false;
        draft.userData.memberLevel = false;
        draft.userData.roles = false;
        draft.error = false;
        draft.isSignin = false;
        draft.loading = false;

        break;
      case SIGNOUT_ERROR:
        draft.error = false;
        draft.isSignin = false;
        break;
      case VALID_SUCCESS:
        // console.log(action.data);
        // console.log(action);
        // console.log(action.roles);
        // console.log(action.userId);
        // draft.isSignin = true;
        draft.userData.roles = action.roles;
        draft.error = false;
        draft.loading = false;
        break;
      case TO_PC:
        localStorage.setItem('isPc', true);
        draft.isPc = true;
        window.location.href = '/';
        break;
      case TO_MOBILE:
        localStorage.removeItem('isPc');
        draft.isPc = false;
        break;
    }
  });

export default appReducer;
