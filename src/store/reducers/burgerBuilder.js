import * as actionsTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
};

// Price Set
const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 2.0,
  cheese: 0.7,
  bacon: 1.3,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          // Get a copy from the state
          ...state.ingredients,
          // Increment the ingredient value
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
        },
        // Update Price
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
      };
    case actionsTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          // Get a copy from the state
          ...state.ingredients,
          // Decrement the ingredient value
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
        },
        // Update Price
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
      };
    case actionsTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
      };
    case actionsTypes.FETCH_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};

export default reducer;
