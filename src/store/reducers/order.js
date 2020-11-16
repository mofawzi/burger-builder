import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

// Purchase Burger Initialzation Handler
const purchaseBurgerInit = (state) => {
  return updateObject(state, { purchased: false });
};

// Purchase Burger Start Handler
const purchaseBurgerStart = (state) => {
  return updateObject(state, { loading: true });
};

// Purchase Burger Success Handler
const purchaseBurgerSuccess = (state, action) => {
  // Merge orderId with the orderData
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder),
  });
};

// Purchase Burger Fail Handler
const purchaseBurgerFail = (state) => {
  return updateObject(state, { loading: false });
};

// Fetch Orders Start Handler
const fetchOrdersStart = (state) => {
  return updateObject(state, { loading: true });
};

// Fetch Orders Success Handler
const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

// Fetch Orders Fail Handler
const fetchOrdersFail = (state) => {
  updateObject(state, { loading: false });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseBurgerInit(state);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);
    default:
      return state;
  }
};

export default reducer;
