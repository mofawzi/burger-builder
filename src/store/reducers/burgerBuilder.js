import * as actionsTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

// Initial Price Set
const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 2.0,
  cheese: 0.7,
  bacon: 1.3,
};

// Global vars
let updatedIng,
  updatedIngs,
  updatedState = {};

// Adding Ingredient Handler
const addIngredient = (state, action) => {
  // Increment an ingredient type with 1
  updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] + 1,
  };
  updatedIngs = updateObject(state.ingredients, updatedIng);
  updatedState = {
    ingredients: updatedIngs,
    // Update Price
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

// Removing Ingredient Handler
const removeIngredient = (state, action) => {
  // Decrement an ingredient type with 1
  updatedIng = {
    [action.ingredientName]: state.ingredients[action.ingredientName] - 1,
  };
  updatedIngs = updateObject(state.ingredients, updatedIng);
  updatedState = {
    ingredients: updatedIngs,
    // Update Price
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
    building: true,
  };
  return updateObject(state, updatedState);
};

// Setting Ingredients Handler
const setIngredients = (state, action) => {
  return updateObject(state, {
    // Handling Burger structure manually
    ingredients: {
      salad: action.ingredients.salad,
      bacon: action.ingredients.bacon,
      cheese: action.ingredients.cheese,
      meat: action.ingredients.meat,
    },
    // Reset the price after a successful order is done
    totalPrice: 4,
    error: false,
    // Set building to false => Reloading the page or resetting
    building: false,
  });
};

// Fetching Ingredients Fail Handler
const fetchIngredientsFailed = (state) => {
  return updateObject(state, { error: true });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionsTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionsTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionsTypes.FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);
    default:
      return state;
  }
};

export default reducer;
