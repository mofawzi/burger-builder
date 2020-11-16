import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../Components/UI/Button/Button";
import Input from "../../../Components/UI/Input/Input";
import classes from "./ContactData.css";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import axios from "../../../axios-orders";
import withErrorrHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject } from "../../../shared/utility";
import { checkValidity } from "../../../shared/validation";

class ContactData extends Component {
  state = {
    // Make a dynamic form
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "City",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    // To stop re-rendring
    event.preventDefault();
    // Deal with firebase
    // Extract form data from the state
    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    // Creating an object to be stored in DB
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      // Submit order (contact) data for the form submission
      orderData: formData,
      // Add user ID to specify his orders
      userId: this.props.userId,
    };
    // Pass token to be able to make an order
    const token = this.props.token;
    // Dispatch the order
    this.props.onOrderBurger(order, token);
  };

  // Update the input field (onchange method)
  inputChangedHandler = (event, inputIdentifier) => {
    // Get a copy from element values
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        // Update the values of the selected input
        value: event.target.value,
        // Check validation (Not empty)
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        // update if the element is touched by the user
        touched: true,
      }
    );
    // Get a copy from the state
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    // Check if the form is valid to be submitted
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    // Update the state
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    // Make array of the form elements
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    // Showing spinner while loading
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    token: state.auth.token,
    loading: state.order.loading,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorrHandler(ContactData, axios));
