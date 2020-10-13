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
import * as burgerBuilderActios from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    // Get ingredients from backend (Database)
    this.props.onInitIngredients();
  }

  // Purchasable if sum of ingredients > 0
  updatePurchaseState(ingredients) {
    // Map ingredients into an array of [ingredient, quantity]
    const sum = Object.keys(ingredients)
      .map((ingKey) => {
        // Return a quantity of an ingredient
        return ingredients[ingKey];
      })
      // Reduce to return sum of all ingredients
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    // For fisabling the less button for an ingredient type if it isn't added yet
    const disabledInfo = {
      // Ingredients from redux store
      ...this.props.ings,
    };
    // Check the added types
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    // Initialize orderSummary
    let orderSummary = null;

    // Show error if ingredients can't be fetched from db
    let burger = this.props.error ? (
      <h1>Ingredients can't be loaded!</h1>
    ) : (
      <Spinner />
    );

    // Show Spinner while the burger ingredients is being fetched from db
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            price={this.props.price}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.price}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
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
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
  };
};

const mapDispachToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) =>
      dispatch(burgerBuilderActios.addIngredient(ingName)),
    onIngredientRemoved: (ingName) =>
      dispatch(burgerBuilderActios.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActios.initIngredients()),
  };
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(withErrorHandler(BurgerBuilder, axios));
