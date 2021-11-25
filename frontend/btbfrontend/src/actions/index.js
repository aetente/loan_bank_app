import {
  LOGIN,
  UPDATE_USER,
  UPDATE_BANKS,
  POST_LOAN,
  LOGIN_ERROR,
} from "../types";

export function login(payload) {
  return {
    type: LOGIN,
    payload,
  };
}

export function updateUser(payload) {
  return {
    type: UPDATE_USER,
    payload,
  };
}

export function updateBanks(payload) {
  return {
    type: UPDATE_BANKS,
    payload,
  };
}

export function postLoan(payload) {
  return {
    type: POST_LOAN,
    payload,
  };
}

export function loginError() {
  return {
    type: LOGIN_ERROR,
  };
}
