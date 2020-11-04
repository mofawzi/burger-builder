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
  // Clear the local storage
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
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
      // Calculate the expiration date of the token in seconds
      const expirationDate = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      // Store the token, userId and the expiration date to the local storage of the browser
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", res.data.localId);

      dispatch(authSuccess(res.data.idToken, res.data.localId));
      dispatch(checkAuthTimeout(res.data.expiresIn));
    })
    .catch((error) => {
      dispatch(authFail(error.res.data.error));
    });
};

// Set the redirect path for authentication
export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      // Need to Login
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
      } else {
        // Automatically login the user if the token is still valid
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        // expiring date = the difference of Future date and the current date
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
