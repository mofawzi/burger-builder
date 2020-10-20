import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

// Logout Handler
export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

// Check the token expiration
// Logging out the user after 1h
export const checkAuthTimeout = (expirationTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expirationTime * 1000);
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
  // Sign up URL
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsa_GDixxAVuafp4XRE2074QjqxPiDLUk";

  if (!isSignup) {
    // Sign in URL
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCsa_GDixxAVuafp4XRE2074QjqxPiDLUk";
  }
  // Send Sign up request to backend
  axios
    .post(url, authData)
    .then((res) => {
      console.log(res);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    })
    .catch((error) => {
      dispatch(authFail(error.response.data.error));
    });
};
