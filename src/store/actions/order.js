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

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

export const purchaseBurger = (orderData, token) => (dispatch) => {
  dispatch(purchaseBurgerStart());
  // Send a post request to save the order in DB
  axios
    .post("/orders.json?auth=" + token, orderData)
    .then((response) => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch((err) => {
      dispatch(purchaseBurgerFail(err));
    });
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  };
};

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error: error,
  };
};

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

export const fetchOrders = (token, userId) => (dispatch) => {
  dispatch(fetchOrdersStart());
  // Add the user Id to specify his orders
  const queryParams =
    "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';

  // Get orders from database
  axios
    .get("/orders.json" + queryParams)
    .then((res) => {
      const fetchedOrders = [];
      // set the fetched objects to an array
      for (let key in res.data) {
        fetchedOrders.push({
          ...res.data[key],
          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(fetchedOrders));
    })
    .catch((error) => dispatch(fetchOrdersFail(error)));
};
