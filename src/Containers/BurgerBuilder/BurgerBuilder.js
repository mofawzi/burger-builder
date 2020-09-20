import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actionTypes from "../../store/actions";

// Price Set
const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 2.0,
  cheese: 0.7,
  bacon: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  // Get ingredients from backend (Database)
  componentDidMount() {
    axios
      .get("https://my-burger-0128.firebaseio.com/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((err) => {
        this.setState({ error: true });
      });
  }

  // Purchasable if sum of ingredients > 0
  updatePurchaseState(ingredients) {
    // Map ingredients into an array of ingredient, quantity
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        // Return a quantity of an ingredient
        return ingredients[ingKey];
      })
      // Reduce to return sum of all ingredients
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // Update State
    this.setState({ purchasable: sum > 0 });
  }

  // Add Burger Ingredient
  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    // Increase number of specific ingredient (type)
    const updatedCounted = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCounted;
    const PriceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    // Update Price
    const newPrice = oldPrice + PriceAddition;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    // Update purchasing state
    this.updatePurchaseState(updatedIngredients);
  };

  // Remove Burger Ingredient
  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    // Check if no ingredients added yet
    if (oldCount <= 0) {
      return;
    }
    // Decrease number of specific ingredient (type)
    const updatedCounted = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updatedCounted;
    const PriceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    // Update Price
    const newPrice = oldPrice - PriceDeduction;
    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    // Update purchasing state
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // Deal with routing
    const queryParams = [];
    // Push ingredients to the queryParams array (property => value)
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    // Push price to the contact data
    queryParams.push("price=" + this.state.totalPrice);
    // Convert the ingredients array to be a query
    const queryString = queryParams.join("&");
    // Send selected ingredients in the query
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    // Disable the less button for an ingredient type if it isn't added yet
    const disabledInfo = {
      // Ingredients from redux
      ...this.props.ings,
    };
    // Check the added types
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // Initialize orderSummary
    let orderSummary = null;

    // Show error if ingredients can't be fetched from db
    let burger = this.state.error ? (
      <h1>Ingredients can't be loaded!</h1>
    ) : (
      <Spinner />
    );

    // Show Spinner while the burger ingredients is being fetched from db yet
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    // Showing Spinner if loading
    if (this.state.loading) {
      orderSummary = <Spinner />;
    }
    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

// Handling Redux
const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
  };
};

const mapDispachToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch({
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: ingName,
      }),
    onIngredientRemoved: (ingName) =>
      dispatch({
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: ingName,
      }),
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(withErrorHandler(BurgerBuilder, axios));
