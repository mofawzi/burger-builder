import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0,
  };

  componentWillMount() {
    // Fetch the ingredients from the search query
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    // Mapping ingredients ['salad', '1']
    for (let param of query.entries()) {
      // Get price => fetched from burger builder
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients, totalPrice: price });
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
          // Send ingredients property with the component
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
