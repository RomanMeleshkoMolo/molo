import { SET_USER_DATA, SET_REG_TOKEN, SET_USER } from './actions';

const initialState = {
  userData: null,
  regToken: null,
  userName: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      console.log("----from reducer!!!!!!-------");
      return {
        ...state,
        userData: action.payload,
      };

      case SET_REG_TOKEN:
      return {
        ...state,
        regToken: action.payload,
      };

      case SET_USER:
      // payload — объект пользователя
      return {
        ...state,
        userData: action.payload,
        userName: action.payload?.name ?? state.userName,
      };

    default:
      return state;
  }
};

export default userReducer;
