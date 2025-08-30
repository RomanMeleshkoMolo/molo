// Type action
export const SET_USER_DATA = 'SET_USER_DATA';

// Action creators
export const setUserData = ( user ) => ({
  type: SET_USER_DATA,
  payload: user,
});
