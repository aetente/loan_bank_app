import {
  login,
  updateUser,
  updateBanks,
  postLoan,
  loginError,
} from "../actions";
import requests from "../utils/requests";

export function loginOperation(username, password) {
  return async (dispatch, getState) => {
    try {
      let chunk = await requests.users.login(username, password);
      let userData = chunk.data;
      await dispatch(login(userData));
    } catch (e) {
      console.log("ERROR", e);
      await dispatch(loginError());
    }
  };
}

export function updateUserOperation(userUpdateData, id) {
  return async (dispatch, getState) => {
    try {
      let chunk = await requests.users.updateUser(userUpdateData, id);
      let userData = chunk.data;
      await dispatch(updateUser(userData));
    } catch (e) {
      console.log("ERROR", e);
    }
  };
}

export function updateBanksOperation(banksData) {
  return async (dispatch, getState) => {
    try {
      let chunk = await requests.users.updateBanks(banksData.toChange);
      await dispatch(updateBanks(banksData.banks));
    } catch (e) {
      console.log("ERROR", e);
    }
  };
}

export function postLoanOperation(loanData) {
  return async (dispatch, getState) => {
    try {
      let chunk = await requests.users.postLoan(loanData);
      let loanDataUpdated = chunk.data;
      await dispatch(postLoan(loanDataUpdated));
    } catch (e) {
      console.log("ERROR", e);
    }
  };
}
