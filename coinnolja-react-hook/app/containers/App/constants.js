/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const SIGNIN = 'boilerplate/App/SIGNIN';
export const SIGNIN_SUCCESS = 'boilerplate/App/SIGNIN_SUCCESS';
export const SIGNIN_ERROR = 'boilerplate/App/SIGNIN_ERROR';
export const SIGNOUT = 'boilerplate/App/SIGNOUT';
export const SIGNOUT_SUCCESS = 'boilerplate/App/SIGNOUT_SUCCESS';
export const SIGNOUT_ERROR = 'boilerplate/App/SIGNOUT_ERROR';
export const SIGNIN_CHECK = 'boilerplate/App/SIGNIN_CHECK';
export const VALID_SUCCESS = 'boilerplate/App/VALID_SUCCESS';
export const TO_PC = 'boilerplate/App/TO_PC';
export const TO_MOBILE = 'boilerplate/App/TO_MOBILE';
