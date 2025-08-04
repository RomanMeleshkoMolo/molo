// src/redux/actions.js
export const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = ( user ) => ({
  type: SET_USER_DATA,
  payload: user,
});
