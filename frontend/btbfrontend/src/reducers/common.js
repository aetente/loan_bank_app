import {
  LOGIN,
  UPDATE_USER,
  UPDATE_BANKS,
  POST_LOAN,
  LOGIN_ERROR,
} from "../types";

const INITIAL_STATE = { userData: null, loginError: false };

const common = (state = INITIAL_STATE, action) => {
  let { userData } = state;
  switch (action.type) {
    case LOGIN:
      return { ...state, userData: action.payload, loginError: false };
    case UPDATE_USER:
      userData.user = action.payload;
      return { ...state, userData };
    case UPDATE_BANKS:
      userData.banks = action.payload;
      return { ...state, userData };
    case POST_LOAN:
      userData.loans = action.payload;
      return { ...state, userData };
    case LOGIN_ERROR:
      return { ...state, loginError: true };
    default:
      return state;
  }
};

export default common;
