import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";

// Price Set
const INGREDIENT_PRICES = {
  salad: 0.5,
  meat: 2.0,
  cheese: 0.7,
  bacon: 1.3,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
  };

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

  render() {
    // Disable the less button for an ingredient type if it isn't added yet
    const disabledInfo = {
      ...this.state.ingredients,
    };
    // Check the added types
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
