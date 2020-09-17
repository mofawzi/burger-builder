import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 1,
      cheese: 1,
      bacon: 1,
    },
  };

  componentDidMount() {
    // Fetch the ingredients from the search query
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      // ['salad', '1']
      ingredients[param[0]] = +param[1];
    }
    this.setState({ ingredients });
  }

  // Handling order cancellation
  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  // Handling order checking out
  checkoutContinuedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
}

export default Checkout;
