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

export const authFail = (err) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: err,
  };
};

export const auth = (email, password) => (dispatch) => {
  dispatch(authStart());
  // Data obeject to sign up
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  // Send Sign up request to firebase
  axios
    .post(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCsa_GDixxAVuafp4XRE2074QjqxPiDLUk",
      authData
    )
    .then((res) => {
      console.log(res);
      dispatch(authSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(authFail(err));
    });
};
