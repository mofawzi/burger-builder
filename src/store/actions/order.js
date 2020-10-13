import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData: orderData,
  };
};

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error: error,
  };
};

// Async
export const purchaceBurgerStart = (orderData) => (dispatch) => {
  // Send a post request to save the order in DB
  axios
    .post("/orders.json", orderData)
    .then((response) => {
      dispatch(purchaseBurgerSuccess(response.data, orderData));
    })
    .catch((err) => {
      dispatch(purchaseBurgerFail(err));
    });
};
