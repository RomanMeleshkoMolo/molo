// Type action
export const SET_USER_DATA = 'SET_USER_DATA';
export const SET_REG_TOKEN = 'SET_REG_TOKEN';
export const SET_USER = 'SET_USER';

// Action creators
export const setUserData = ( user ) => ({ type: SET_USER_DATA, payload: user, });
export const setRegTokenAction = ( token ) => ({ type: SET_REG_TOKEN, payload: token });
export const setUserAction = ( user ) => ({ type: SET_USER, payload: user });
