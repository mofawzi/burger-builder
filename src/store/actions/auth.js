import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    authData: authData,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const auth = (email, password, isSignup) => (dispatch) => {
  dispatch(authStart());
  // Data obeject to sign up
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  // URL to firebase API
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsa_GDixxAVuafp4XRE2074QjqxPiDLUk";

  if (!isSignup) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsa_GDixxAVuafp4XRE2074QjqxPiDLUk";
  }
  // Send Sign up request to backend
  axios
    .post(url, authData)
    .then((res) => {
      console.log(res);
      dispatch(authSuccess(res.data));
    })
    .catch((error) => {
      console.log(error);
      dispatch(authFail(error));
    });
};
